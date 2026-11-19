/**
 * 데이터 검증. JSON은 사람이 직접 고치므로 빌드·테스트·에디터에서 같은 검증을 쓴다.
 * 결과는 오류 메시지 배열이며 빈 배열이면 통과.
 */
import { columnCount } from "./geometry";
import type { Auditorium, Sourced, Theater } from "./types";

const CELL_PATTERN = /^[swx.]*$/;
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ASPECT_TOLERANCE = 0.01;

export interface SourcedEntry {
  path: string;
  value: number;
  source: Sourced["source"];
  note?: string;
}

function isSourced(value: unknown): value is Sourced {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "source" in value &&
    typeof (value as Sourced).value === "number"
  );
}

/** 상영관 안의 모든 출처 표시 값을 경로와 함께 꺼낸다. 예: "screen.width" */
export function listSourcedValues(auditorium: Auditorium): SourcedEntry[] {
  const out: SourcedEntry[] = [];
  const walk = (node: unknown, path: string) => {
    if (isSourced(node)) {
      out.push({ path, value: node.value, source: node.source, note: node.note });
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, i) => walk(child, `${path}[${i}]`));
      return;
    }
    if (typeof node === "object" && node !== null) {
      for (const [key, child] of Object.entries(node)) {
        walk(child, path ? `${path}.${key}` : key);
      }
    }
  };
  walk({ room: auditorium.room, screen: auditorium.screen, layout: auditorium.layout }, "");
  return out;
}

export function validateTheater(theater: Theater): string[] {
  const errors: string[] = [];
  if (theater.schemaVersion !== 1) errors.push("schemaVersion은 1이어야 합니다.");
  if (!ID_PATTERN.test(theater.id)) errors.push(`theater id "${theater.id}"는 소문자-하이픈 형식이어야 합니다.`);
  if (!theater.chain) errors.push("chain이 비었습니다.");
  if (!theater.branch) errors.push("branch가 비었습니다.");
  if (!theater.address) errors.push("address가 비었습니다.");
  if (new Set(theater.auditoriumIds).size !== theater.auditoriumIds.length) {
    errors.push("auditoriumIds에 중복이 있습니다.");
  }
  return errors;
}

export function validateAuditorium(auditorium: Auditorium): string[] {
  const errors: string[] = [];
  const { screen, layout, rows } = auditorium;

  if (auditorium.schemaVersion !== 1) errors.push("schemaVersion은 1이어야 합니다.");
  if (!ID_PATTERN.test(auditorium.id)) errors.push(`auditorium id "${auditorium.id}"는 소문자-하이픈 형식이어야 합니다.`);
  if (!auditorium.name) errors.push("name이 비었습니다.");

  const entries = listSourcedValues(auditorium);
  for (const entry of entries) {
    if (entry.source !== "measured" && entry.source !== "estimated") {
      errors.push(`${entry.path}.source는 measured 또는 estimated여야 합니다.`);
    }
    if (!Number.isFinite(entry.value) || entry.value < 0) {
      errors.push(`${entry.path} 값이 올바르지 않습니다: ${entry.value}`);
    }
  }
  const hasEstimated = entries.some((entry) => entry.source === "estimated");
  if (hasEstimated !== auditorium.estimated) {
    errors.push(
      hasEstimated
        ? "estimated 값이 있으므로 auditorium.estimated는 true여야 합니다."
        : "estimated 값이 없으므로 auditorium.estimated는 false여야 합니다.",
    );
  }

  const mustBePositive: [string, number][] = [
    ["screen.width", screen.width.value],
    ["screen.height", screen.height.value],
    ["screen.aspectRatio", screen.aspectRatio.value],
    ["layout.firstRowDistance", layout.firstRowDistance.value],
    ["layout.rowSpacing", layout.rowSpacing.value],
    ["layout.seatWidth", layout.seatWidth.value],
  ];
  for (const [path, value] of mustBePositive) {
    if (!(value > 0)) errors.push(`${path}는 0보다 커야 합니다.`);
  }

  if (screen.width.value > 0 && screen.height.value > 0) {
    const actual = screen.width.value / screen.height.value;
    if (Math.abs(actual - screen.aspectRatio.value) / screen.aspectRatio.value > ASPECT_TOLERANCE) {
      errors.push(
        `screen.aspectRatio(${screen.aspectRatio.value})가 폭/높이(${actual.toFixed(3)})와 1% 넘게 다릅니다.`,
      );
    }
  }

  if (!Number.isInteger(layout.flatRowCount.value)) errors.push("layout.flatRowCount는 정수여야 합니다.");

  if (rows.length === 0) errors.push("rows가 비었습니다.");
  const width = columnCount(auditorium);
  const labels = new Set<string>();
  rows.forEach((row, i) => {
    if (!row.label) errors.push(`rows[${i}].label이 비었습니다.`);
    if (labels.has(row.label)) errors.push(`열 이름 "${row.label}"이 중복됩니다.`);
    labels.add(row.label);
    if (!CELL_PATTERN.test(row.cells)) errors.push(`rows[${i}](${row.label}) cells에 s, w, x, . 이외 글자가 있습니다.`);
    if (row.cells.length !== width) {
      errors.push(`rows[${i}](${row.label}) 칸 수 ${row.cells.length}가 첫 열 칸 수 ${width}와 다릅니다.`);
    }
    if (row.numbers) {
      const seatCount = [...row.cells].filter((code) => code !== ".").length;
      if (row.numbers.length !== seatCount) {
        errors.push(`rows[${i}](${row.label}) numbers 개수 ${row.numbers.length}가 좌석 수 ${seatCount}와 다릅니다.`);
      }
      if (!row.numbers.every((n) => Number.isInteger(n) && n > 0)) {
        errors.push(`rows[${i}](${row.label}) numbers는 1 이상의 정수여야 합니다.`);
      }
      if (new Set(row.numbers).size !== row.numbers.length) {
        errors.push(`rows[${i}](${row.label}) numbers에 같은 번호가 있습니다.`);
      }
    }
  });

  layout.verticalAisles.forEach((aisle, i) => {
    if (!Number.isInteger(aisle.afterColumn) || aisle.afterColumn < 0 || aisle.afterColumn >= width - 1) {
      errors.push(`layout.verticalAisles[${i}].afterColumn(${aisle.afterColumn})이 범위 밖입니다.`);
    }
  });
  layout.crossAisles.forEach((aisle, i) => {
    if (!Number.isInteger(aisle.afterRow) || aisle.afterRow < 0 || aisle.afterRow >= rows.length - 1) {
      errors.push(`layout.crossAisles[${i}].afterRow(${aisle.afterRow})가 범위 밖입니다.`);
    }
  });

  return errors;
}
