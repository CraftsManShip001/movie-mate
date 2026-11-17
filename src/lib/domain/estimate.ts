/**
 * 도면 없이 상영관 크기를 추정한다.
 *
 * 예매 화면 좌석표(열·칸·통로 위치)에 표준 좌석 치수를 곱해 객석 크기를 구하고,
 * 공개된 스크린 크기가 있으면 그대로 쓴다. 나머지(첫 열 거리, 단차, 실내 높이)는
 * 아래 STANDARDS 의 규칙으로 계산한다. 결과의 모든 치수는 source: "estimated" 이고
 * note 에 어떻게 구했는지 남긴다.
 */
import { seatedEyeHeightM, DEFAULT_STATURE_CM } from "./anthropometry";
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
    screenx: { seatWidth: 560, rowSpacing: 1050, firstRowRatio: 0.5, minRiser: 300, screenBottom: 900 },
    "dolby-cinema": { seatWidth: 700, rowSpacing: 1400, firstRowRatio: 0.45, minRiser: 450, screenBottom: 900 },
    premium: { seatWidth: 800, rowSpacing: 1600, firstRowRatio: 0.45, minRiser: 400, screenBottom: 900 },
  } satisfies Record<string, FormatStandard>,
  /** 세로 통로 폭 */
  aisleWidth: 1100,
  /** 가로 통로 깊이 (열 간격에 더해지는 양) */
  crossAisleDepth: 1200,
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

/** 모든 열에서 빈 세로줄을 지우고, 그 자리를 통로 위치(afterColumn)로 바꾼다. 양 끝 빈 줄은 그냥 지운다. */
export function compactSeatMap(rows: SeatRow[]): CompactedGrid {
  const width = rows[0]?.cells.length ?? 0;
  const empty = Array.from({ length: width }, (_, c) => rows.every((row) => row.cells[c] === "."));
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
  return {
    rows: rows.map((row) => ({ label: row.label, cells: keep.map((c) => row.cells[c]).join("") })),
    verticalAisles: aisles,
  };
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

  // 앞뒤 배치
  const firstRow = Math.max(STANDARDS.minFirstRow, screenWidth * std.firstRowRatio);
  const distances = rows.map((_, i) => {
    const cross = crossAfter.filter((after) => after < i).length * STANDARDS.crossAisleDepth;
    return firstRow + i * std.rowSpacing + cross;
  });
  const lastRowZ = distances[distances.length - 1] ?? firstRow;

  // 단차: 앞 1열은 평지
  const eyeAboveFloor = STANDARDS.seatHeight + seatedEyeHeightM(DEFAULT_STATURE_CM) * 1000;
  const sightRiser = sightlineRiser(distances, eyeAboveFloor - std.screenBottom, STANDARDS.cValue);
  const riser = Math.max(std.minRiser, sightRiser);
  const lastFloor = Math.max(0, rows.length - 1) * riser;

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
    depth: est(STANDARDS.crossAisleDepth, "표준 가로 통로 깊이"),
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
    },
    rows,
  };
}

function mm(value: number): string {
  return `${(value / 1000).toFixed(1)}m`;
}
