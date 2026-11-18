/**
 * 3D 장면에 놓을 물체들의 위치·크기 계산 (순수 함수, 미터 단위).
 * three.js에 의존하지 않아 단위 테스트할 수 있다. 모양(메시)은 scene-models.ts 가 만든다.
 */
import { DEFAULT_STATURE_CM } from "@/lib/domain/anthropometry";
import {
  columnCenterX,
  eyePosition,
  listSeats,
  mmToM,
  rowCenterZ,
  rowFloorY,
  seatFloorPosition,
  seatGridWidthM,
} from "@/lib/domain/geometry";
import type { Auditorium, AuditoriumFormat, Seat } from "@/lib/domain/types";

export type Tuple3 = [number, number, number];

/** 3D 뷰어의 가로 시야각. 세로 화면(모바일)에서도 옆이 너무 좁지 않게 가로 기준으로 맞춘다. 3번 화면 작은 시야도 같은 값을 쓴다. */
export const HORIZONTAL_FOV_DEG = 90;

export interface Box {
  position: Tuple3;
  scale: Tuple3;
}

/** 실내 상자. 스크린 뒤로 FRONT_GAP 만큼 여유를 둔다. */
export const FRONT_GAP_M = 0.5;

export interface RoomShape {
  width: number;
  height: number;
  /** 스크린 면(z = 0)에서 뒷벽까지 */
  depth: number;
  /** 앞벽 z (스크린 뒤) */
  front: number;
}

export function roomShape(auditorium: Auditorium): RoomShape {
  return {
    width: mmToM(auditorium.room.width.value),
    height: mmToM(auditorium.room.height.value),
    depth: mmToM(auditorium.room.depth.value),
    front: -FRONT_GAP_M,
  };
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

/** z 위치의 바닥 높이 (m). 단차 상자와 같은 경계를 쓴다. */
export function floorHeightAt(auditorium: Auditorium, z: number): number {
  const halfSpacing = mmToM(auditorium.layout.rowSpacing.value) / 2;
  let height = 0;
  auditorium.rows.forEach((_, rowIndex) => {
    if (z >= rowCenterZ(auditorium, rowIndex) - halfSpacing) height = rowFloorY(auditorium, rowIndex);
  });
  return height;
}

/** 의자 모양 종류. 형식에 따라 고른다. */
export type ChairStyle = "standard" | "recliner";

export function chairStyle(format: AuditoriumFormat): ChairStyle {
  return format === "recliner" || format === "premium" ? "recliner" : "standard";
}

export interface ChairLayout {
  /** 의자 하나의 바닥 중심 위치 */
  chairs: Tuple3[];
  /** 팔걸이 위치(바닥 중심). 붙어 있는 좌석은 팔걸이를 같이 쓴다. */
  arms: Tuple3[];
}

/**
 * 의자와 팔걸이 위치. 의자마다 왼쪽 팔걸이를 갖고, 줄 끝(통로·빈 칸 앞) 의자는 오른쪽 팔걸이를 하나 더 갖는다.
 */
export function chairLayout(auditorium: Auditorium): ChairLayout {
  const seats = listSeats(auditorium);
  const half = mmToM(auditorium.layout.seatWidth.value) / 2;
  const aisleAfter = new Set(auditorium.layout.verticalAisles.map((a) => a.afterColumn));
  const occupied = new Set(seats.map((s) => `${s.rowIndex}:${s.columnIndex}`));
  const chairs: Tuple3[] = [];
  const arms: Tuple3[] = [];
  for (const seat of seats) {
    const { x, y, z } = seatFloorPosition(auditorium, seat);
    chairs.push([x, y, z]);
    arms.push([x - half, y, z]);
    const joined = occupied.has(`${seat.rowIndex}:${seat.columnIndex + 1}`) && !aisleAfter.has(seat.columnIndex);
    if (!joined) arms.push([x + half, y, z]);
  }
  return { chairs, arms };
}

export interface PersonPlacement {
  /** 눈 위치. 사람 모양은 눈을 원점으로 만든다. */
  position: Tuple3;
  /** 고개·몸 방향(라디안, 0 = 스크린 쪽) */
  yaw: number;
  /** 고개 기울기(라디안, 좌우) */
  roll: number;
  /** 몸 크기 배율 */
  scale: number;
  /** 팔레트 번호 */
  hair: number;
  skin: number;
  clothes: number;
}

export const HAIR_COLORS = ["#0d0b0a", "#16110e", "#1f1712", "#2a2018", "#3b2a1d", "#4a4642", "#0b0b0c"];
export const SKIN_COLORS = ["#a87c60", "#966c52", "#805a44", "#b48a6c"];
export const CLOTHES_COLORS = ["#1c232d", "#2f2f31", "#4d4038", "#26364a", "#5a5a5c", "#2c3a2c", "#6e2a2a", "#b9b2a6", "#141416", "#3d3550"];

/** 문자열에서 0 이상 1 미만의 고정된 난수를 만든다 (좌석마다 늘 같은 사람이 앉도록) */
export function hash01(text: string, salt = 0): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

/** 앞사람: 선택한 좌석보다 앞 열의 모든 좌석에 평균 키의 관객이 앉았다고 본다. 모습만 조금씩 다르다. */
export function frontPeople(auditorium: Auditorium, selected: Seat): PersonPlacement[] {
  return listSeats(auditorium)
    .filter((seat) => seat.rowIndex < selected.rowIndex && seat.kind !== "x")
    .map((seat) => {
      const eye = eyePosition(auditorium, seat, DEFAULT_STATURE_CM);
      const r = (salt: number) => hash01(seat.id, salt);
      return {
        position: [eye.x + (r(1) - 0.5) * 0.04, eye.y + (r(2) - 0.5) * 0.04, eye.z],
        yaw: (r(3) - 0.5) * 0.3,
        roll: (r(4) - 0.5) * 0.12,
        scale: 0.94 + r(5) * 0.12,
        hair: Math.floor(r(6) * HAIR_COLORS.length),
        skin: Math.floor(r(7) * SKIN_COLORS.length),
        clothes: Math.floor(r(8) * CLOTHES_COLORS.length),
      };
    });
}

/** 통로 가운데 x 좌표: 세로 통로들과 객석 양옆 통로 */
export function aisleCenters(auditorium: Auditorium): { x: number; width: number }[] {
  const seatWidth = mmToM(auditorium.layout.seatWidth.value);
  const result = auditorium.layout.verticalAisles.map((aisle) => {
    const width = mmToM(aisle.width.value);
    return { x: columnCenterX(auditorium, aisle.afterColumn) + seatWidth / 2 + width / 2, width };
  });
  const gridHalf = seatGridWidthM(auditorium) / 2;
  const side = mmToM(auditorium.room.width.value) / 2 - gridHalf;
  if (side >= 0.6) {
    result.push({ x: -(gridHalf + side / 2), width: side }, { x: gridHalf + side / 2, width: side });
  }
  return result;
}

/** 통로 계단 앞면에 붙은 발밑 등. 단차가 있는 열마다, 통로마다 하나씩 */
export function stepLightBoxes(auditorium: Auditorium): Box[] {
  const halfSpacing = mmToM(auditorium.layout.rowSpacing.value) / 2;
  const aisles = aisleCenters(auditorium);
  const boxes: Box[] = [];
  auditorium.rows.forEach((_, rowIndex) => {
    const y = rowFloorY(auditorium, rowIndex);
    if (y <= 0) return;
    const front = rowCenterZ(auditorium, rowIndex) - halfSpacing;
    for (const aisle of aisles) {
      boxes.push({ position: [aisle.x, y - 0.035, front - 0.006], scale: [Math.min(0.45, aisle.width * 0.45), 0.018, 0.012] });
    }
  });
  return boxes;
}

/** 옆벽 벽등: 양쪽 벽에 약 3.5m 간격, 그 자리 바닥에서 2.4m 높이 */
export function sconcePositions(auditorium: Auditorium): { position: Tuple3; side: -1 | 1 }[] {
  const room = roomShape(auditorium);
  const count = Math.max(1, Math.floor((room.depth - 2.5) / 3.5));
  const step = (room.depth - 2.5) / count;
  const out: { position: Tuple3; side: -1 | 1 }[] = [];
  for (let i = 0; i <= count; i += 1) {
    const z = 1.5 + i * step;
    const y = Math.min(room.height - 0.6, floorHeightAt(auditorium, z) + 2.4);
    for (const side of [-1, 1] as const) out.push({ position: [side * (room.width / 2 - 0.04), y, z], side });
  }
  return out;
}

/** 비상구 표시등: 앞쪽 양 모서리와 뒤쪽 양 모서리 */
export function exitSignPositions(auditorium: Auditorium): { position: Tuple3; side: -1 | 1 }[] {
  const room = roomShape(auditorium);
  const backZ = Math.max(2, room.depth - 0.8);
  const out: { position: Tuple3; side: -1 | 1 }[] = [];
  for (const side of [-1, 1] as const) {
    out.push({ position: [side * (room.width / 2 - 0.03), 2.3, 1.0], side });
    out.push({ position: [side * (room.width / 2 - 0.03), floorHeightAt(auditorium, backZ) + 2.3, backZ], side });
  }
  return out;
}

/** 천장 다운라이트: 약 3m 간격 격자 */
export function downlightPositions(auditorium: Auditorium): Tuple3[] {
  const room = roomShape(auditorium);
  const nx = Math.max(1, Math.round(room.width / 3));
  const nz = Math.max(1, Math.round(room.depth / 3));
  const out: Tuple3[] = [];
  for (let i = 0; i < nx; i += 1) {
    for (let j = 0; j < nz; j += 1) {
      out.push([-room.width / 2 + (i + 0.5) * (room.width / nx), room.height - 0.01, (j + 0.5) * (room.depth / nz)]);
    }
  }
  return out;
}
