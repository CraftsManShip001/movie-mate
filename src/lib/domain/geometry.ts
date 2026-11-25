/**
 * 좌석 좌표 계산. 모두 순수 함수이며 결과 단위는 미터(m).
 * 좌표계는 types.ts 머리말 참고.
 */
import { DEFAULT_STATURE_CM, seatedEyeHeightM } from "./anthropometry";
import type { Auditorium, CellCode, Seat, SeatFurniture, SeatRow, Vec3 } from "./types";

export const mmToM = (mm: number): number => mm / 1000;

export function columnCount(auditorium: Auditorium): number {
  return auditorium.rows[0]?.cells.length ?? 0;
}

/**
 * 좌석 행렬에서 좌석만 꺼낸다.
 * 번호는 열에 numbers 가 있으면 그 값, 없으면 seatNumbering 에 따라 열마다 왼쪽부터 1, 2, 3...(빈 칸 건너뜀) 또는 칸 번호 + 1.
 */
export function listSeats(auditorium: Auditorium): Seat[] {
  const byColumn = auditorium.seatNumbering === "column";
  const seats: Seat[] = [];
  auditorium.rows.forEach((row, rowIndex) => {
    let count = 0;
    [...row.cells].forEach((code, columnIndex) => {
      if (code === ".") return;
      count += 1;
      const number = row.numbers?.[count - 1] ?? (byColumn ? columnIndex + 1 : count);
      const [left, span] = row.spans?.[count - 1] ?? [columnIndex, 1];
      const furniture = row.furniture?.find(([first, n]) => count - 1 >= first && count - 1 < first + n)?.[2];
      seats.push({
        id: `${row.label}${number}`,
        rowLabel: row.label,
        number,
        rowIndex,
        columnIndex,
        left,
        span,
        kind: code as Exclude<CellCode, ".">,
        ...(furniture ? { furniture } : {}),
      });
    });
  });
  return seats;
}

export function findSeat(auditorium: Auditorium, seatId: string): Seat | undefined {
  const id = seatId.toUpperCase();
  return listSeats(auditorium).find((seat) => seat.id.toUpperCase() === id);
}

/** 좌석 행렬 전체 폭 (m): 칸 수 × 좌석 폭 + 세로 통로 폭 합 */
export function seatGridWidthM(auditorium: Auditorium): number {
  const { seatWidth, verticalAisles } = auditorium.layout;
  const aisles = verticalAisles.reduce((sum, aisle) => sum + aisle.width.value, 0);
  return mmToM(columnCount(auditorium) * seatWidth.value + aisles);
}

/**
 * 칸 단위 위치(소수 가능)의 x 좌표 (m). 좌석 행렬은 스크린 중앙에 맞춰 놓는다.
 * 통로는 그 통로 앞 칸의 오른쪽 끝(afterColumn + 1)을 지난 위치부터 더한다.
 */
export function unitX(auditorium: Auditorium, unit: number): number {
  const { seatWidth, verticalAisles } = auditorium.layout;
  const aislesBefore = verticalAisles
    .filter((aisle) => aisle.afterColumn + 1 <= unit)
    .reduce((sum, aisle) => sum + aisle.width.value, 0);
  const left = -seatGridWidthM(auditorium) / 2;
  return left + mmToM(unit * seatWidth.value + aislesBefore);
}

/** 칸 중심의 x 좌표 (m) */
export function columnCenterX(auditorium: Auditorium, columnIndex: number): number {
  return unitX(auditorium, columnIndex + 0.5);
}

type SeatPlace = Pick<Seat, "rowIndex" | "columnIndex"> & Partial<Pick<Seat, "left" | "span" | "furniture">>;

/**
 * 의자가 아닌 좌석의 눈 위치 (바닥 기준 높이, 좌석 중심에서 뒤로 간 거리, m).
 * - 침대: 등판을 올려 반쯤 누운 자세. 눈은 바닥에서 약 0.82m, 침대 가운데보다 0.3m 뒤(등판 앞, 머리 쪽).
 * - 빈백·매트·카바나: 바닥 가까이 앉는다.
 * 키에 따른 차이는 작아서 고정값으로 둔다.
 */
export const FURNITURE_EYE: Partial<Record<SeatFurniture, { height: number; back: number }>> = {
  bed: { height: 0.82, back: 0.3 },
  beanbag: { height: 0.78, back: 0.1 },
  mat: { height: 0.8, back: 0 },
  cabana: { height: 0.8, back: 0.1 },
};

/** 좌석 중심의 x 좌표 (m). 넓은 좌석은 차지한 폭의 가운데다. */
export function seatCenterX(auditorium: Auditorium, seat: SeatPlace): number {
  return unitX(auditorium, (seat.left ?? seat.columnIndex) + (seat.span ?? 1) / 2);
}

/** 좌석 폭 (m): 좌석 폭 × 차지한 칸 수 */
export function seatWidthM(auditorium: Auditorium, seat: Partial<Pick<Seat, "span">>): number {
  return mmToM(auditorium.layout.seatWidth.value) * (seat.span ?? 1);
}

/** 열 좌석 중심의 z 좌표 (m): 스크린 면에서의 수평 거리 */
export function rowCenterZ(auditorium: Auditorium, rowIndex: number): number {
  const { firstRowDistance, rowSpacing, crossAisles } = auditorium.layout;
  const crossBefore = crossAisles
    .filter((aisle) => aisle.afterRow < rowIndex)
    .reduce((sum, aisle) => sum + aisle.depth.value, 0);
  return mmToM(firstRowDistance.value + rowIndex * rowSpacing.value + crossBefore);
}

/**
 * 열 바닥 높이 (m). 앞쪽 flatRowCount개 열은 0, 그 뒤로 열마다 단차만큼 올라간다.
 * 따로 떨어진 구역(zone) 열은 본 객석 맨 뒷열 바닥에서 구역(층)마다 zoneRise 만큼 더 올라간 발코니에 있다.
 */
export function rowFloorY(auditorium: Auditorium, rowIndex: number): number {
  return mmToM(rowFloorMm(auditorium.rows, rowIndex, auditorium.layout));
}

/** rowFloorY 의 mm 계산. 상영관을 만들기 전(추정 단계)에도 쓴다. */
export function rowFloorMm(
  rows: Pick<SeatRow, "zone" | "zoneFloor">[],
  rowIndex: number,
  layout: { riserHeight: { value: number }; flatRowCount: { value: number }; zoneRise?: { value: number } },
): number {
  const steps = (i: number) => Math.max(0, i - layout.flatRowCount.value + 1) * layout.riserHeight.value;
  const upper = (row: Pick<SeatRow, "zone" | "zoneFloor"> | undefined) => row?.zone !== undefined && row.zoneFloor !== "main";
  const zone = rows[rowIndex]?.zone;
  if (!upper(rows[rowIndex]) || !layout.zoneRise) return steps(rowIndex);
  let lastMain = rowIndex;
  while (lastMain >= 0 && upper(rows[lastMain])) lastMain -= 1;
  const zones = new Set(rows.slice(lastMain + 1, rowIndex + 1).map((row) => row.zone));
  const firstOfZone = rows.findIndex((row, i) => i > lastMain && row.zone === zone);
  return steps(Math.max(0, lastMain)) + zones.size * layout.zoneRise.value + (rowIndex - firstOfZone) * layout.riserHeight.value;
}

/** 좌석 바닥 중심 위치 (m) */
export function seatFloorPosition(
  auditorium: Auditorium,
  seat: SeatPlace,
): Vec3 {
  return {
    x: seatCenterX(auditorium, seat),
    y: rowFloorY(auditorium, seat.rowIndex),
    z: rowCenterZ(auditorium, seat.rowIndex),
  };
}

/**
 * 리클라이너 자세. 상체(엉덩이 → 눈)가 수직에서 기운 각도(라디안).
 * 바로 앉으면 등받이 기본 기울기(약 15°), 끝까지 젖히면 약 50°다(극장 전동 리클라이너는 보통 45~55°, 그 가운데로 추정).
 * 젖히면 머리를 머리받침에 기대 얼굴이 위를 향한다. 상체가 35° 더 눕는 동안 목은 조금 숙이므로 얼굴은 25°쯤 든다(gazeUpDeg).
 * 그래서 스크린을 보려고 드는 고개는 gazeUpDeg 만큼 줄어든다.
 */
export const RECLINE = { uprightRad: 0.26, reclinedRad: 0.87, gazeUpDeg: 25 } as const;

/** 젖힌 정도(0 = 바로 앉음, 1 = 끝까지)에 따라 눈이 옮겨 가는 거리 (m). 엉덩이를 축으로 상체가 뒤로 눕는다. */
export function reclineEyeOffset(statureCm: number, recline: number): { dy: number; dz: number } {
  const h = seatedEyeHeightM(statureCm);
  const a = RECLINE.uprightRad + (RECLINE.reclinedRad - RECLINE.uprightRad) * recline;
  return { dy: h * (Math.cos(a) - Math.cos(RECLINE.uprightRad)), dz: h * (Math.sin(a) - Math.sin(RECLINE.uprightRad)) };
}

/** 앉은 사람의 눈 위치 (m). recline 은 리클라이너를 젖힌 정도(0~1)로, 의자가 리클라이너일 때만 넘긴다. */
export function eyePosition(
  auditorium: Auditorium,
  seat: SeatPlace,
  statureCm: number,
  recline = 0,
): Vec3 {
  const floor = seatFloorPosition(auditorium, seat);
  const low = seat.furniture ? FURNITURE_EYE[seat.furniture] : undefined;
  if (low) {
    // 눕거나 바닥에 앉아도 키가 크면 눈이 조금 높다(앉은 키 차이의 절반)
    const tall = (seatedEyeHeightM(statureCm) - seatedEyeHeightM(DEFAULT_STATURE_CM)) * 0.5;
    return { x: floor.x, y: floor.y + low.height + tall, z: floor.z + low.back };
  }
  const { dy, dz } = recline > 0 ? reclineEyeOffset(statureCm, recline) : { dy: 0, dz: 0 };
  return {
    x: floor.x,
    y: floor.y + mmToM(auditorium.layout.seatHeight.value) + seatedEyeHeightM(statureCm) + dy,
    z: floor.z + dz,
  };
}

/** 바로 앞 열에서 이 좌석 가운데 앞에 있는 좌석. 없으면 undefined. */
export function seatInFront(auditorium: Auditorium, seat: Seat): Seat | undefined {
  if (seat.rowIndex === 0) return undefined;
  const center = seat.left + seat.span / 2;
  return listSeats(auditorium).find(
    (other) => other.rowIndex === seat.rowIndex - 1 && other.left <= center && center < other.left + other.span,
  );
}

export interface ScreenRect {
  width: number;
  height: number;
  bottom: number;
  top: number;
  centerY: number;
}

/** 스크린 사각형 (m). 스크린은 z = 0 평면, 가로 중앙 x = 0. */
export function screenRect(auditorium: Auditorium): ScreenRect {
  const width = mmToM(auditorium.screen.width.value);
  const height = mmToM(auditorium.screen.height.value);
  const bottom = mmToM(auditorium.screen.bottomHeight.value);
  return { width, height, bottom, top: bottom + height, centerY: bottom + height / 2 };
}

/**
 * 박스(방) 안에 든 좌석과 박스 벽까지의 여유(칸 단위).
 * 박스는 좌석을 따라 그린다: 통로 경계에 걸친 박스는 통로 폭이 좌석 사이에 끼어 칸 위치만으로는 좌석과 어긋난다.
 */
export function boxSeats(
  seats: Seat[],
  [left, span]: [number, number],
): { first: Seat; last: Seat; padLeft: number; padRight: number } | null {
  const inside = seats.filter((seat) => {
    const center = seat.left + seat.span / 2;
    return center >= left && center <= left + span;
  });
  if (inside.length === 0) return null;
  const first = inside[0];
  const last = inside[inside.length - 1];
  return {
    first,
    last,
    padLeft: Math.max(0, first.left - left),
    padRight: Math.max(0, left + span - (last.left + last.span)),
  };
}
