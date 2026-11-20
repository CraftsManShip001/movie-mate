/**
 * 도면 없이 상영관 크기를 추정한다.
 *
 * 예매 화면 좌석표(열·칸·통로 위치)에 표준 좌석 치수를 곱해 객석 크기를 구하고,
 * 공개된 스크린 크기가 있으면 그대로 쓴다. 나머지(첫 열 거리, 단차, 실내 높이)는
 * 아래 STANDARDS 의 규칙으로 계산한다. 결과의 모든 치수는 source: "estimated" 이고
 * note 에 어떻게 구했는지 남긴다.
 */
import { seatedEyeHeightM, DEFAULT_STATURE_CM } from "./anthropometry";
import { rowFloorMm } from "./geometry";
import type { Auditorium, AuditoriumFormat, CrossAisle, SeatRow, Sourced, VerticalAisle } from "./types";

/** data/theaters/<theaterId>/auditoriums/<id>.seatmap.json 형식 */
export interface SeatMapInput {
  schemaVersion: 1;
  id: string;
  theaterId: string;
  name: string;
  format: AuditoriumFormat;
  /** 좌석표를 어디서 언제 옮겼는지. 예: "CGV 예매 화면, 2026-11-17" */
  seatMapSource: string;
  /** 예매 화면의 좌석 번호 방식. 통로를 지운 뒤 칸 번호 + 1이 화면 번호와 같으면 "column". */
  seatNumbering?: Auditorium["seatNumbering"];
  /**
   * 예매 화면 좌석표를 그대로 옮긴 행렬. 앞(스크린 쪽) 열부터.
   * 모든 열에서 빈 칸(".")인 세로줄은 통로로 본다. 연속된 빈 세로줄은 통로 하나다.
   */
  rows: SeatRow[];
  /** 가로 통로가 있는 위치: 0부터 센 열 번호. 이 열 뒤에 통로가 있다. */
  crossAisleAfterRows?: number[];
  /** 공개된 스크린 크기 (mm). 모르면 비워 두면 객석 폭에서 추정한다. */
  screen?: { width: number; height?: number; note: string };
  /** 화면비(폭/높이). screen.height 가 있으면 무시하고 width/height 로 계산한다. */
  aspectRatio: number;
  notes?: string;
}

interface FormatStandard {
  seatWidth: number;
  rowSpacing: number;
  /** 스크린 폭 대비 첫 열 거리 비율 */
  firstRowRatio: number;
  /** 단차 최솟값. 시선 계산값이 이보다 작으면 이 값을 쓴다. */
  minRiser: number;
  screenBottom: number;
}

/** 형식별 표준값 (mm). 근거는 note 문자열에 같이 남는다. */
export const STANDARDS = {
  byFormat: {
    standard: { seatWidth: 560, rowSpacing: 1050, firstRowRatio: 0.5, minRiser: 300, screenBottom: 900 },
    imax: { seatWidth: 560, rowSpacing: 1100, firstRowRatio: 0.35, minRiser: 450, screenBottom: 700 },
    "4dx": { seatWidth: 650, rowSpacing: 1300, firstRowRatio: 0.5, minRiser: 450, screenBottom: 900 },
    // 롯데시네마 수퍼 MX4D: 4DX와 같은 모션 시트라 같은 값을 쓴다
    mx4d: { seatWidth: 650, rowSpacing: 1300, firstRowRatio: 0.5, minRiser: 450, screenBottom: 900 },
    screenx: { seatWidth: 560, rowSpacing: 1050, firstRowRatio: 0.5, minRiser: 300, screenBottom: 900 },
    "dolby-cinema": { seatWidth: 700, rowSpacing: 1400, firstRowRatio: 0.45, minRiser: 450, screenBottom: 900 },
    premium: { seatWidth: 800, rowSpacing: 1600, firstRowRatio: 0.45, minRiser: 400, screenBottom: 900 },
    // 전동 리클라이너: 다리 받침을 펴도 뒷줄 통로가 남도록 열 간격을 넓게 잡는다
    recliner: { seatWidth: 800, rowSpacing: 1700, firstRowRatio: 0.5, minRiser: 400, screenBottom: 900 },
    // 누워서 보는 침대(템퍼 시네마·모션베드): 침대 하나 약 1.0m × 2.0m, 뒷줄과 칸막이 여유를 둔다
    bed: { seatWidth: 1000, rowSpacing: 2400, firstRowRatio: 0.5, minRiser: 450, screenBottom: 900 },
  } satisfies Record<string, FormatStandard>,
  /** 세로 통로 폭 */
  aisleWidth: 1100,
  /** 가로 통로 깊이 (열 간격에 더해지는 양) */
  crossAisleDepth: 1200,
  /** 따로 떨어진 구역(PRIVATE BOX·SWEETBOX 발코니)이 본 객석 맨 뒷열 바닥보다 높은 양. 한 층 높이에서 객석 단차를 뺀 값으로 잡았다 */
  zoneRise: 2400,
  /** 구역 앞 가로 통로 깊이: 본 객석 맨 뒷열 등받이와 발코니 앞벽 사이 */
  zoneCrossDepth: 1800,
  /** SCREENX 양옆 벽 영상이 스크린 면에서 뒤로 닿는 비율(실내 깊이 대비). 홍보 사진 기준 대략 객석 중간 뒤까지 */
  sideScreenRatio: 0.6,
  /** 객석 양옆 벽까지 통로 */
  sideClearance: 1100,
  /** 맨 뒷열 좌석 중심에서 뒷벽까지 */
  rearClearance: 1200,
  /** 스크린 양옆 여유 (스크린 크기를 객석 폭으로 추정할 때) */
  screenSideMargin: 1000,
  /** 첫 열 최소 거리 */
  minFirstRow: 4000,
  /** 시선 여유(C값): 뒷사람 눈에서 스크린 하단으로 그은 선이 앞사람 정수리 위로 지나는 높이 */
  cValue: 100,
  seatHeight: 430,
  seatBackHeight: 1000,
  /** 스크린 위·맨 뒷열 위 천장 여유 */
  ceilingOverScreen: 2000,
  ceilingOverLastRow: 3000,
} as const;

export function standardFor(format: AuditoriumFormat): FormatStandard {
  return (STANDARDS.byFormat as Record<string, FormatStandard>)[format] ?? STANDARDS.byFormat.standard;
}

const est = (value: number, note: string): Sourced => ({ value: Math.round(value), source: "estimated", note });

export interface CompactedGrid {
  rows: SeatRow[];
  verticalAisles: number[];
}

/** 넓은 좌석이 세로줄을 이만큼(칸) 넘게 덮으면 그 줄은 빈 줄이 아니다 */
const COVER_MIN = 0.2;

/**
 * 모든 열에서 빈 세로줄을 지우고, 그 자리를 통로 위치(afterColumn)로 바꾼다. 양 끝 빈 줄은 그냥 지운다.
 * spans 가 있는 열은 좌석이 실제로 덮은 범위로 빈 줄을 판단하고, 지운 줄만큼 위치를 당긴다.
 * 따로 떨어진 구역(zone) 열은 빈 줄 판단에서 빼서 본 객석의 통로를 그대로 둔다. 그 열의 좌석은 spans 로 놓고 cells 는 다시 채운다.
 */
export function compactSeatMap(rows: SeatRow[]): CompactedGrid {
  const width = rows[0]?.cells.length ?? 0;
  const mainRows = rows.filter((row) => row.zone === undefined);
  const covered = (row: SeatRow, c: number): boolean =>
    row.spans
      ? row.spans.some(([left, span]) => Math.min(left + span, c + 1) - Math.max(left, c) > COVER_MIN)
      : row.cells[c] !== ".";
  const empty = Array.from({ length: width }, (_, c) => mainRows.every((row) => row.cells[c] === "." && !covered(row, c)));
  // 양 끝 줄은 조금만 걸쳐도 남긴다(좌석이 좌석표 밖으로 나가지 않게)
  const ends = mainRows.flatMap((row) => row.spans ?? []);
  if (ends.length > 0) {
    const first = Math.floor(Math.min(...ends.map(([left]) => left)) + 0.01);
    const last = Math.ceil(Math.max(...ends.map(([left, span]) => left + span)) - 0.01) - 1;
    if (first >= 0 && first < width) empty[first] = false;
    if (last >= 0 && last < width) empty[last] = false;
  }
  const keep: number[] = [];
  const aisles: number[] = [];
  let pendingAisle = false;
  for (let c = 0; c < width; c += 1) {
    if (empty[c]) {
      if (keep.length > 0) pendingAisle = true;
      continue;
    }
    if (pendingAisle) {
      aisles.push(keep.length - 1);
      pendingAisle = false;
    }
    keep.push(c);
  }
  // 좌석 가운데보다 왼쪽에서 지운 줄 수만큼 왼쪽으로 당긴다
  const removedBefore = (center: number): number => empty.filter((isEmpty, c) => isEmpty && c + 0.5 < center).length;
  const newWidth = keep.length;
  return {
    rows: rows.map((row) => {
      let spans = row.spans?.map(([left, span]): [number, number] => [
        round2(Math.max(0, left - removedBefore(left + span / 2))),
        span,
      ]);
      let boxes = row.boxes;
      if (row.zone !== undefined && row.spans && spans) {
        // 구역 좌석은 본 객석 통로 위에 걸칠 수 있다. 박스는 통째로 옮겨 통로가 박스를 가르지 않게 한다
        spans = placeZoneSeats(row.spans, row.boxes, empty, aisles.map((a) => a + 1), newWidth);
        boxes = row.boxes ? remapBoxes(row.boxes, row.spans, spans, newWidth) : undefined;
      }
      const cells =
        row.zone !== undefined && spans ? zoneCells(row.cells, spans, newWidth) : keep.map((c) => row.cells[c]).join("");
      return {
        label: row.label,
        cells,
        // 빈 세로줄만 지우므로 좌석 순서는 그대로다
        ...(row.numbers ? { numbers: row.numbers } : {}),
        ...(spans ? { spans } : {}),
        ...(row.zone !== undefined ? { zone: row.zone } : {}),
        ...(row.zoneKind ? { zoneKind: row.zoneKind } : {}),
        ...(row.zoneFloor ? { zoneFloor: row.zoneFloor } : {}),
        ...(row.furniture ? { furniture: row.furniture } : {}),
        ...(boxes ? { boxes } : {}),
      };
    }),
    verticalAisles: aisles,
  };
}

const round2 = (v: number): number => Math.round(v * 100) / 100;

/**
 * 따로 떨어진 구역 열의 좌석 위치. 박스(칸막이로 둘러싼 방)는 가운데를 지운 줄만큼 당기고 안쪽 간격은 그대로 둔다.
 * 박스가 통로 경계에 걸치면 덜 움직이는 쪽으로 통째로 옮긴다. 박스 밖 좌석(SWEETBOX 등)은 붙어 있는 두 자리씩 같은 방법으로 옮긴다.
 */
function placeZoneSeats(
  spans: [number, number][],
  boxes: [number, number][] | undefined,
  empty: boolean[],
  boundaries: number[],
  width: number,
): [number, number][] {
  // 지운 줄을 이어지게 빼는 위치 변환: 지운 줄 안쪽 위치는 그 줄의 왼쪽 끝으로 모인다
  const map = (u: number): number => u - empty.reduce((sum, isEmpty, c) => sum + (isEmpty ? Math.min(1, Math.max(0, u - c)) : 0), 0);
  const groupOf = spans.map(([left, span], i) => {
    const center = left + span / 2;
    const box = boxes?.findIndex(([l, w]) => center >= l && center <= l + w) ?? -1;
    return box >= 0 ? `b${box}` : `s${i}`;
  });
  // 박스 밖 좌석은 붙어 있는 두 자리씩(SWEETBOX 같은 2인석) 묶는다
  for (let i = 1; i < spans.length; i += 1) {
    const touching = spans[i][0] - (spans[i - 1][0] + spans[i - 1][1]) < 0.05;
    const prevAlone = groupOf[i - 1] === `s${i - 1}` && (i < 2 || groupOf[i - 2] !== groupOf[i - 1]);
    if (groupOf[i] === `s${i}` && touching && prevAlone) groupOf[i] = groupOf[i - 1];
  }
  const out = spans.map(([left, span]): [number, number] => [left, span]);
  // 묶음은 왼쪽부터 놓는다. 앞 묶음의 오른쪽 끝보다 왼쪽으로는 옮기지 않는다
  let placedRight = 0;
  for (const key of new Set(groupOf)) {
    const idx = groupOf.map((g, i) => (g === key ? i : -1)).filter((i) => i >= 0);
    const oL = spans[idx[0]][0];
    const oR = spans[idx[idx.length - 1]][0] + spans[idx[idx.length - 1]][1];
    let nL = map((oL + oR) / 2) - (oR - oL) / 2;
    let nR = nL + (oR - oL);
    const cut = boundaries.find((b) => b > nL + 0.01 && b < nR - 0.01);
    if (cut !== undefined) {
      // 통로 왼쪽(끝을 경계에 맞춤)과 오른쪽(시작을 경계에 맞춤) 중 그 구간에 들어가고 덜 움직이는 쪽
      const edges = [0, ...boundaries, width];
      const before = Math.max(...edges.filter((e) => e < cut));
      const after = Math.min(...edges.filter((e) => e > cut));
      const size = nR - nL;
      const options = [
        { shift: cut - nR, fits: cut - size >= Math.max(before, placedRight) - 0.01 },
        { shift: cut - nL, fits: cut + size <= after + 0.01 },
      ].filter((o) => o.fits);
      if (options.length > 0) {
        const { shift } = options.reduce((a, b) => (Math.abs(b.shift) < Math.abs(a.shift) ? b : a));
        nL += shift;
        nR += shift;
      }
    }
    for (const i of idx) out[i][0] = nL + (spans[i][0] - oL);
    placedRight = Math.max(placedRight, nR);
  }
  return separate(out, width);
}

/** 좌석이 앞 좌석과 겹치면 오른쪽으로 밀고, 오른쪽 끝을 넘으면 뒤에서부터 왼쪽으로 당긴다 */
function separate(spans: [number, number][], width: number): [number, number][] {
  // 좌석 폭 합이 좌석표 폭보다 크면(위층 구역이 본 객석보다 넓을 때) 같은 비율로 줄인다
  const total = spans.reduce((sum, [, span]) => sum + span, 0);
  const k = total > width ? width / total : 1;
  const out = spans.map(([left, span]): [number, number] => (k < 1 ? [left * k, round2(span * k - 0.005)] : [left, span]));
  for (let i = 0; i < out.length; i += 1) {
    out[i][0] = Math.max(out[i][0], i === 0 ? 0 : out[i - 1][0] + out[i - 1][1]);
  }
  for (let i = out.length - 1; i >= 0; i -= 1) {
    const limit = i === out.length - 1 ? width : out[i + 1][0];
    out[i][0] = Math.max(0, Math.min(out[i][0], limit - out[i][1]));
  }
  return out.map(([left, span]) => [round2(left), span]);
}

/** 박스는 안에 든 좌석을 따라 옮긴다. 좌석과 박스 벽 사이 여유는 원래 값을 그대로 둔다. */
function remapBoxes(
  boxes: [number, number][],
  before: [number, number][],
  after: [number, number][],
  width: number,
): [number, number][] {
  return boxes.flatMap(([left, span]): [number, number][] => {
    const inside = before
      .map(([l, s], i) => ({ i, center: l + s / 2 }))
      .filter(({ center }) => center >= left && center <= left + span)
      .map(({ i }) => i);
    if (inside.length === 0) return [];
    const first = inside[0];
    const last = inside[inside.length - 1];
    const a = Math.max(0, after[first][0] - (before[first][0] - left));
    const b = Math.min(width, after[last][0] + after[last][1] + (left + span - (before[last][0] + before[last][1])));
    return [[round2(a), round2(b - a)]];
  });
}

/**
 * 따로 떨어진 구역 열의 cells 를 spans 로 다시 채운다. 좌석 종류는 원래 순서대로, 칸은 좌석 가운데에 가장 가까운 칸이다.
 * 좌석 위치는 spans 가 정하므로 cells 는 좌석 수·종류·순서만 맞으면 된다.
 */
function zoneCells(original: string, spans: [number, number][], width: number): string {
  const kinds = [...original].filter((code) => code !== ".");
  const cols: number[] = [];
  spans.forEach(([left, span], i) => {
    const target = Math.min(width - 1, Math.max(0, Math.floor(left + span / 2)));
    cols.push(Math.max(target, (cols[i - 1] ?? -1) + 1));
  });
  // 오른쪽 끝을 넘으면 뒤에서부터 한 칸씩 당긴다
  for (let i = cols.length - 1; i >= 0; i -= 1) cols[i] = Math.min(cols[i], width - (cols.length - i));
  const out = Array.from({ length: width }, () => ".");
  cols.forEach((c, i) => {
    out[c] = kinds[i] ?? "s";
  });
  return out.join("");
}

/**
 * 시선 계산으로 열마다 필요한 눈높이를 구하고, 평균 단차를 돌려준다 (mm).
 * 뒷사람 눈 → 스크린 하단 선이 앞사람 눈 + C값 위로 지나야 한다:
 *   E[n] ≥ (E[n-1] + C) × d[n] / d[n-1]   (E: 스크린 하단 기준 눈높이, d: 스크린까지 거리)
 */
export function sightlineRiser(distances: number[], eyeAboveScreenBottom: number, cValue: number): number {
  if (distances.length < 2) return 0;
  let eye = eyeAboveScreenBottom;
  for (let n = 1; n < distances.length; n += 1) {
    eye = Math.max(eye, ((eye + cValue) * distances[n]) / distances[n - 1]);
  }
  return (eye - eyeAboveScreenBottom) / (distances.length - 1);
}

/** 영상이 양옆 벽까지 이어지는 관: SCREENX, ULTRA 4DX(4DX with SCREENX) */
export function hasSideScreens(input: Pick<SeatMapInput, "name" | "format">): boolean {
  return input.format === "screenx" || /SCREEN\s?X|ULTRA\s?4DX/i.test(input.name);
}

export function estimateAuditorium(input: SeatMapInput): Auditorium {
  const std = standardFor(input.format);
  const { rows, verticalAisles: aisleCols } = compactSeatMap(input.rows);
  const columns = rows[0]?.cells.length ?? 0;
  const crossAfter = [...new Set(input.crossAisleAfterRows ?? [])].sort((a, b) => a - b);

  const gridWidth = columns * std.seatWidth + aisleCols.length * STANDARDS.aisleWidth;
  const seatedRoomWidth = gridWidth + 2 * STANDARDS.sideClearance;

  // 스크린
  let screenWidth: number;
  let screenHeight: number;
  let aspect: number;
  let screenNote: string;
  if (input.screen) {
    screenWidth = input.screen.width;
    screenHeight = input.screen.height ?? input.screen.width / input.aspectRatio;
    aspect = screenWidth / screenHeight;
    screenNote = input.screen.note;
  } else {
    screenWidth = seatedRoomWidth - 2 * STANDARDS.screenSideMargin;
    screenHeight = screenWidth / input.aspectRatio;
    aspect = input.aspectRatio;
    screenNote = `객석 폭 ${mm(seatedRoomWidth)}에서 양옆 ${mm(STANDARDS.screenSideMargin)}씩 뺀 값`;
  }
  const roomWidth = Math.max(seatedRoomWidth, screenWidth + 2 * STANDARDS.screenSideMargin);

  // 앞뒤 배치. 따로 떨어진 구역 앞 통로는 발코니 앞벽까지라 더 깊다
  const firstRow = Math.max(STANDARDS.minFirstRow, screenWidth * std.firstRowRatio);
  const startsZone = (after: number) =>
    rows[after + 1]?.zone !== undefined && rows[after + 1]?.zoneFloor !== "main" && rows[after + 1]?.zone !== rows[after]?.zone;
  const crossDepth = (after: number) => (startsZone(after) ? STANDARDS.zoneCrossDepth : STANDARDS.crossAisleDepth);
  const distances = rows.map((_, i) => {
    const cross = crossAfter.filter((after) => after < i).reduce((sum, after) => sum + crossDepth(after), 0);
    return firstRow + i * std.rowSpacing + cross;
  });
  const lastRowZ = distances[distances.length - 1] ?? firstRow;
  const hasZones = rows.some((row) => row.zone !== undefined && row.zoneFloor !== "main");

  // 단차: 앞 1열은 평지. 시선 계산은 본 객석 열만 본다
  const eyeAboveFloor = STANDARDS.seatHeight + seatedEyeHeightM(DEFAULT_STATURE_CM) * 1000;
  const mainDistances = distances.filter((_, i) => rows[i].zone === undefined);
  const sightRiser = sightlineRiser(mainDistances, eyeAboveFloor - std.screenBottom, STANDARDS.cValue);
  const riser = Math.max(std.minRiser, sightRiser);
  const floorLayout = {
    riserHeight: { value: riser },
    flatRowCount: { value: 1 },
    ...(hasZones ? { zoneRise: { value: STANDARDS.zoneRise } } : {}),
  };
  const lastFloor = Math.max(0, ...rows.map((_, i) => rowFloorMm(rows, i, floorLayout)));

  const roomHeight = Math.max(
    std.screenBottom + screenHeight + STANDARDS.ceilingOverScreen,
    lastFloor + STANDARDS.ceilingOverLastRow,
  );

  const stdNote = (what: string) => `${input.format} 표준값 추정 (${what})`;
  const verticalAisles: VerticalAisle[] = aisleCols.map((afterColumn) => ({
    afterColumn,
    width: est(STANDARDS.aisleWidth, "좌석표 빈 세로줄 → 표준 통로 폭"),
  }));
  const crossAisles: CrossAisle[] = crossAfter.map((afterRow) => ({
    afterRow,
    depth: startsZone(afterRow)
      ? est(STANDARDS.zoneCrossDepth, "본 객석 맨 뒷열과 위층 구역(발코니) 앞벽 사이 추정")
      : est(STANDARDS.crossAisleDepth, "표준 가로 통로 깊이"),
  }));

  return {
    schemaVersion: 1,
    id: input.id,
    theaterId: input.theaterId,
    name: input.name,
    format: input.format,
    sample: false,
    estimated: true,
    ...(input.seatNumbering ? { seatNumbering: input.seatNumbering } : {}),
    notes: [`좌석표로 추정한 상영관. 좌석표 출처: ${input.seatMapSource}.`, input.notes].filter(Boolean).join(" "),
    room: {
      width: est(roomWidth, `좌석 ${columns}칸 × ${std.seatWidth} + 통로 ${aisleCols.length}개 + 양옆 ${mm(STANDARDS.sideClearance)}`),
      depth: est(lastRowZ + STANDARDS.rearClearance, `맨 뒷열 거리 + 뒷벽 여유 ${mm(STANDARDS.rearClearance)}`),
      height: est(roomHeight, "스크린 위·맨 뒷열 위 천장 여유로 계산"),
    },
    screen: {
      width: est(screenWidth, screenNote),
      height: est(screenHeight, input.screen?.height ? screenNote : `폭 ÷ 화면비 ${input.aspectRatio}`),
      bottomHeight: est(std.screenBottom, stdNote("스크린 하단 높이")),
      aspectRatio: { value: Number(aspect.toFixed(3)), source: "estimated", note: "스크린 폭/높이" },
      ...(hasSideScreens(input)
        ? {
            sideScreens: est(
              (lastRowZ + STANDARDS.rearClearance) * STANDARDS.sideScreenRatio,
              `SCREENX 양옆 벽 영상: 실내 깊이의 ${Math.round(STANDARDS.sideScreenRatio * 100)}%까지로 추정`,
            ),
          }
        : {}),
    },
    layout: {
      firstRowDistance: est(firstRow, `스크린 폭 × ${std.firstRowRatio} (최소 ${mm(STANDARDS.minFirstRow)})`),
      rowSpacing: est(std.rowSpacing, stdNote("열 간격")),
      riserHeight: est(
        riser,
        `시선 계산(C값 ${STANDARDS.cValue}mm) ${Math.round(sightRiser)}mm, 최소 ${std.minRiser}mm 중 큰 값`,
      ),
      flatRowCount: { value: 1, source: "estimated", note: "맨 앞 1열만 평지로 가정" },
      seatWidth: est(std.seatWidth, stdNote("좌석 폭")),
      seatHeight: est(STANDARDS.seatHeight, "표준값 추정"),
      seatBackHeight: est(STANDARDS.seatBackHeight, "표준값 추정"),
      verticalAisles,
      crossAisles,
      ...(hasZones
        ? { zoneRise: est(STANDARDS.zoneRise, "위층 구역(PRIVATE BOX·SWEETBOX 발코니)이 본 객석 맨 뒷열보다 높은 양 추정, 층마다 한 번씩") }
        : {}),
    },
    rows,
  };
}

function mm(value: number): string {
  return `${(value / 1000).toFixed(1)}m`;
}
