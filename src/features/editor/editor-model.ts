/**
 * 좌석 에디터의 순수 로직. UI와 분리해 두었다.
 */
import { listSourcedValues } from "@/lib/domain/validation";
import type { Auditorium, CellCode, Sourced } from "@/lib/domain/types";

/** 클릭할 때마다 바뀌는 칸 종류 순서 */
const CELL_CYCLE: CellCode[] = [".", "s", "w", "x"];

export function nextCell(code: string): CellCode {
  const i = CELL_CYCLE.indexOf(code as CellCode);
  return CELL_CYCLE[(i + 1) % CELL_CYCLE.length];
}

/** 0 → A, 25 → Z, 26 → AA */
export function rowLabelAt(index: number): string {
  let n = index;
  let label = "";
  do {
    label = String.fromCharCode(65 + (n % 26)) + label;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return label;
}

/** 열·칸 수를 바꾼다. 기존 칸은 유지하고 늘어난 곳은 일반 좌석으로 채운다. */
export function resizeGrid(auditorium: Auditorium, rowCount: number, columnCount: number): Auditorium {
  const rows = Array.from({ length: Math.max(1, rowCount) }, (_, i) => {
    const existing = auditorium.rows[i];
    const cells = (existing?.cells ?? "").slice(0, columnCount).padEnd(Math.max(1, columnCount), "s");
    return { label: existing?.label ?? rowLabelAt(i), cells };
  });
  return { ...auditorium, rows };
}

export function toggleCell(auditorium: Auditorium, rowIndex: number, columnIndex: number): Auditorium {
  const rows = auditorium.rows.map((row, i) => {
    if (i !== rowIndex) return row;
    const cells = [...row.cells];
    cells[columnIndex] = nextCell(cells[columnIndex]);
    return { ...row, cells: cells.join("") };
  });
  return { ...auditorium, rows };
}

/** estimated 표시를 실제 값 출처와 맞춘다. 내보내기 직전에 호출. */
export function syncEstimatedFlag(auditorium: Auditorium): Auditorium {
  const estimated = listSourcedValues(auditorium).some((e) => e.source === "estimated");
  return { ...auditorium, estimated };
}

const est = (value: number, note = "표준값 추정"): Sourced => ({ value, source: "estimated", note });

/** 새 상영관 기본값. 모든 치수가 estimated 이므로 도면 값을 넣을 때 measured로 바꾼다. */
export function createBlankAuditorium(): Auditorium {
  return resizeGrid(
    {
      schemaVersion: 1,
      id: "new-auditorium",
      theaterId: "cgv-yongsan-ipark-mall",
      name: "새 상영관",
      format: "standard",
      sample: true,
      estimated: true,
      room: { width: est(16000), depth: est(18000), height: est(9000) },
      screen: {
        width: est(12000),
        height: est(5020),
        bottomHeight: est(1200),
        aspectRatio: est(2.39, "시네마스코프 2.39:1"),
      },
      layout: {
        firstRowDistance: est(4500),
        rowSpacing: est(1050),
        riserHeight: est(300),
        flatRowCount: est(2),
        seatWidth: est(530),
        seatHeight: est(430),
        seatBackHeight: est(1000),
        verticalAisles: [],
        crossAisles: [],
      },
      rows: [],
    },
    10,
    20,
  );
}

/** 에디터에서 숫자 입력칸으로 보여 줄 고정 치수 경로 */
export const DIMENSION_FIELDS: { group: "room" | "screen" | "layout"; key: string; label: string; unit: string }[] = [
  { group: "room", key: "width", label: "실내 폭", unit: "mm" },
  { group: "room", key: "depth", label: "실내 깊이(스크린~뒷벽)", unit: "mm" },
  { group: "room", key: "height", label: "실내 높이", unit: "mm" },
  { group: "screen", key: "width", label: "스크린 폭", unit: "mm" },
  { group: "screen", key: "height", label: "스크린 높이", unit: "mm" },
  { group: "screen", key: "bottomHeight", label: "스크린 하단 높이", unit: "mm" },
  { group: "screen", key: "aspectRatio", label: "스크린 비율(폭/높이)", unit: ":1" },
  { group: "layout", key: "firstRowDistance", label: "스크린~첫 열 거리", unit: "mm" },
  { group: "layout", key: "rowSpacing", label: "열 간격", unit: "mm" },
  { group: "layout", key: "riserHeight", label: "단차", unit: "mm" },
  { group: "layout", key: "flatRowCount", label: "평지 열 수", unit: "열" },
  { group: "layout", key: "seatWidth", label: "좌석 폭", unit: "mm" },
  { group: "layout", key: "seatHeight", label: "방석 높이", unit: "mm" },
  { group: "layout", key: "seatBackHeight", label: "등받이 높이", unit: "mm" },
];

export function getDimension(auditorium: Auditorium, group: string, key: string): Sourced | undefined {
  return (auditorium as unknown as Record<string, Record<string, Sourced> | undefined>)[group]?.[key];
}

export function setDimension(auditorium: Auditorium, group: string, key: string, value: Sourced): Auditorium {
  const groupValue = (auditorium as unknown as Record<string, Record<string, unknown>>)[group];
  return { ...auditorium, [group]: { ...groupValue, [key]: value } } as Auditorium;
}
