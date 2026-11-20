/**
 * 좌석 좌표 계산. 모두 순수 함수이며 결과 단위는 미터(m).
 * 좌표계는 types.ts 머리말 참고.
 */
import { seatedEyeHeightM } from "./anthropometry";
import type { Auditorium, CellCode, Seat, Vec3 } from "./types";

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
      seats.push({
        id: `${row.label}${number}`,
        rowLabel: row.label,
        number,
        rowIndex,
        columnIndex,
        left,
        span,
        kind: code as Exclude<CellCode, ".">,
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

type SeatPlace = Pick<Seat, "rowIndex" | "columnIndex"> & Partial<Pick<Seat, "left" | "span">>;

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

/** 열 바닥 높이 (m). 앞쪽 flatRowCount개 열은 0, 그 뒤로 열마다 단차만큼 올라간다. */
export function rowFloorY(auditorium: Auditorium, rowIndex: number): number {
  const { riserHeight, flatRowCount } = auditorium.layout;
  const steps = Math.max(0, rowIndex - flatRowCount.value + 1);
  return mmToM(steps * riserHeight.value);
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

/** 앉은 사람의 눈 위치 (m) */
export function eyePosition(
  auditorium: Auditorium,
  seat: SeatPlace,
  statureCm: number,
): Vec3 {
  const floor = seatFloorPosition(auditorium, seat);
  return {
    x: floor.x,
    y: floor.y + mmToM(auditorium.layout.seatHeight.value) + seatedEyeHeightM(statureCm),
    z: floor.z,
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
