/**
 * 3D 장면에 놓을 상자들의 위치·크기 계산 (순수 함수, 미터 단위).
 * three.js에 의존하지 않아 단위 테스트할 수 있다.
 */
import { DEFAULT_STATURE_CM } from "@/lib/domain/anthropometry";
import { eyePosition, listSeats, mmToM, rowCenterZ, rowFloorY, seatFloorPosition } from "@/lib/domain/geometry";
import type { Auditorium, Seat } from "@/lib/domain/types";

export type Tuple3 = [number, number, number];

/** 3D 뷰어의 가로 시야각. 세로 화면(모바일)에서도 옆이 너무 좁지 않게 가로 기준으로 맞춘다. 3번 화면 작은 시야도 같은 값을 쓴다. */
export const HORIZONTAL_FOV_DEG = 90;

export interface Box {
  position: Tuple3;
  scale: Tuple3;
}

/** 실내 상자. 스크린 뒤로 FRONT_GAP 만큼 여유를 둔다. */
export const FRONT_GAP_M = 0.5;

export function roomBox(auditorium: Auditorium): Box {
  const width = mmToM(auditorium.room.width.value);
  const height = mmToM(auditorium.room.height.value);
  const depth = mmToM(auditorium.room.depth.value) + FRONT_GAP_M;
  return { position: [0, height / 2, depth / 2 - FRONT_GAP_M], scale: [width, height, depth] };
}

/** 단차 바닥. 바닥이 0보다 높은 열마다 그 열 앞쪽 경계에서 다음 열 앞쪽 경계(마지막 열은 뒷벽)까지 */
export function riserBoxes(auditorium: Auditorium): Box[] {
  const width = mmToM(auditorium.room.width.value);
  const backWall = mmToM(auditorium.room.depth.value);
  const halfSpacing = mmToM(auditorium.layout.rowSpacing.value) / 2;
  const boxes: Box[] = [];
  auditorium.rows.forEach((_, rowIndex) => {
    const y = rowFloorY(auditorium, rowIndex);
    if (y <= 0) return;
    const start = rowCenterZ(auditorium, rowIndex) - halfSpacing;
    const isLast = rowIndex === auditorium.rows.length - 1;
    const end = isLast ? backWall : rowCenterZ(auditorium, rowIndex + 1) - halfSpacing;
    const depth = Math.max(0.01, end - start);
    boxes.push({ position: [0, y / 2, start + depth / 2], scale: [width, y, depth] });
  });
  return boxes;
}

/** 좌석 하나 = 방석 상자 + 등받이 상자 */
export function seatBoxes(auditorium: Auditorium): { cushions: Box[]; backs: Box[] } {
  const { seatWidth, seatHeight, seatBackHeight } = auditorium.layout;
  const w = mmToM(seatWidth.value) * 0.9;
  const cushionTop = mmToM(seatHeight.value);
  const backTop = mmToM(seatBackHeight.value);
  const cushions: Box[] = [];
  const backs: Box[] = [];
  for (const seat of listSeats(auditorium)) {
    const { x, y, z } = seatFloorPosition(auditorium, seat);
    cushions.push({ position: [x, y + cushionTop - 0.06, z], scale: [w, 0.12, 0.5] });
    const backHeight = Math.max(0.05, backTop - cushionTop);
    backs.push({ position: [x, y + cushionTop + backHeight / 2, z + 0.28], scale: [w, backHeight, 0.08] });
  }
  return { cushions, backs };
}

/** 앞사람 머리: 선택한 좌석보다 앞 열의 모든 좌석에 평균 키의 관객이 앉았다고 본다 */
export function frontHeadBoxes(auditorium: Auditorium, selected: Seat): Box[] {
  return listSeats(auditorium)
    .filter((seat) => seat.rowIndex < selected.rowIndex && seat.kind !== "x")
    .map((seat) => {
      const eye = eyePosition(auditorium, seat, DEFAULT_STATURE_CM);
      // 머리 중심은 눈보다 약간 위, 약간 뒤
      return { position: [eye.x, eye.y + 0.04, eye.z + 0.03], scale: [0.16, 0.23, 0.2] };
    });
}
