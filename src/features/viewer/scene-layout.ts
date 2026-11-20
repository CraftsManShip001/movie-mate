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
  seatWidthM,
  seatGridWidthM,
  boxSeats,
  seatCenterX,
  unitX,
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
    // PRIVATE BOX 방은 좌석 앞이 열 간격보다 깊어, 바닥을 유리창 앞벽까지 당긴다
    const row = auditorium.rows[rowIndex];
    const front = row?.zoneKind === "privateBox" ? Math.max(halfSpacing, PRIVATE_BOX.front + PRIVATE_BOX.wall / 2) : halfSpacing;
    const start = rowCenterZ(auditorium, rowIndex) - front;
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
export type ChairStyle = "standard" | "recliner" | "bed" | "beanbag" | "mat" | "cabana";

export function chairStyle(format: AuditoriumFormat): ChairStyle {
  if (format === "bed") return "bed";
  return format === "recliner" || format === "premium" ? "recliner" : "standard";
}

/** 좌석 하나의 의자 모양: 의자가 아닌 좌석(침대·빈백 등) → 위층 구역 → 관 형식 순서로 정한다 */
function seatChairStyle(auditorium: Auditorium, seat: Seat): ChairStyle {
  switch (seat.furniture) {
    case "bed":
    case "beanbag":
    case "mat":
    case "cabana":
      return seat.furniture;
    case "couple":
    case "sofa":
      return "recliner";
  }
  if (auditorium.rows[seat.rowIndex]?.zone !== undefined) return "recliner";
  return chairStyle(auditorium.format);
}

/** 팔걸이가 없는 모양(바닥 좌석) */
const NO_ARMS: ReadonlySet<ChairStyle> = new Set(["beanbag", "mat", "cabana"]);

export interface ChairLayout {
  /** 의자 하나의 바닥 중심 위치 */
  chairs: Tuple3[];
  /** 의자마다 가로 배율: 넓은 좌석(차지한 칸 수)만큼 의자를 넓힌다. chairs 와 같은 순서 */
  widths: number[];
  /** 팔걸이 위치(바닥 중심). 붙어 있는 좌석은 팔걸이를 같이 쓴다. */
  arms: Tuple3[];
}

/** 의자 모양별 묶음. 본 객석은 관 형식의 의자, 따로 떨어진 구역(PRIVATE BOX·SWEETBOX)은 리클라이너·가죽 소파다. */
export interface ChairGroup extends ChairLayout {
  style: ChairStyle;
}

/** 옆 좌석과 이만큼(칸) 안쪽으로 붙어 있으면 팔걸이를 같이 쓴다 */
const JOIN_GAP = 0.08;

/**
 * 의자와 팔걸이 위치. 의자마다 왼쪽 팔걸이를 갖고, 줄 끝(통로·빈 칸 앞) 의자는 오른쪽 팔걸이를 하나 더 갖는다.
 * SWEETBOX(2인 소파)는 한 쌍 사이에 팔걸이가 없다.
 */
export function chairLayout(auditorium: Auditorium): ChairLayout {
  const groups = chairGroups(auditorium);
  return {
    chairs: groups.flatMap((g) => g.chairs),
    widths: groups.flatMap((g) => g.widths),
    arms: groups.flatMap((g) => g.arms),
  };
}

export function chairGroups(auditorium: Auditorium): ChairGroup[] {
  const seats = listSeats(auditorium);
  const aisleEdges = auditorium.layout.verticalAisles.map((a) => a.afterColumn + 1);
  const groups = new Map<ChairStyle, ChairGroup>();
  const group = (style: ChairStyle): ChairGroup => {
    const found = groups.get(style);
    if (found) return found;
    const created: ChairGroup = { style, chairs: [], widths: [], arms: [] };
    groups.set(style, created);
    return created;
  };
  const touching = (a: Seat | undefined, b: Seat | undefined) =>
    a !== undefined && b !== undefined && a.rowIndex === b.rowIndex && Math.abs(b.left - (a.left + a.span)) <= JOIN_GAP;
  // 소파 안쪽 자리(왼쪽 팔걸이를 두지 않는 자리)
  // - SWEETBOX 구역·커플석: 붙어 있는 자리를 왼쪽부터 둘씩 묶는다
  // - 여러 사람 소파(sofa): 같은 묶음 안 자리는 모두 붙인다
  const inner = new Set<number>();
  seats.forEach((seat, i) => {
    const prev = seats[i - 1];
    if (!touching(prev, seat)) return;
    const row = auditorium.rows[seat.rowIndex];
    // 템퍼 시네마 침대도 두 개씩 붙어 있고, 두 개 사이에만 칸막이가 있다
    const pair =
      row?.zoneKind === "sweetbox" ||
      (seat.furniture === "couple" && prev?.furniture === "couple") ||
      (seat.furniture === "bed" && prev?.furniture === "bed");
    if (pair && !inner.has(i - 1)) inner.add(i);
    if (seat.furniture === "sofa" && prev?.furniture === "sofa") {
      // 같은 소파 묶음 안이면(앞 자리가 묶음 첫 자리 이후) 붙인다
      const at = seatIndexInRow(seats, i);
      if (row?.furniture?.some(([first, n, kind]) => kind === "sofa" && at > first && at < first + n)) inner.add(i);
    }
  });

  seats.forEach((seat, i) => {
    const style = seatChairStyle(auditorium, seat);
    const g = group(style);
    const { x, y, z } = seatFloorPosition(auditorium, seat);
    const half = seatWidthM(auditorium, seat) / 2;
    g.chairs.push([x, y, z]);
    g.widths.push(seat.span);
    if (NO_ARMS.has(style)) return;
    if (!inner.has(i)) g.arms.push([x - half, y, z]);
    const next = seats[i + 1];
    const right = seat.left + seat.span;
    const joined =
      touching(seat, next) && seatChairStyle(auditorium, next) === style && !aisleEdges.some((edge) => Math.abs(edge - right) <= JOIN_GAP);
    if (!joined) g.arms.push([x + half, y, z]);
  });
  return [...groups.values()];
}

/** 열 안에서 이 좌석의 순서(0부터) */
function seatIndexInRow(seats: Seat[], i: number): number {
  let n = 0;
  for (let j = i - 1; j >= 0 && seats[j].rowIndex === seats[i].rowIndex; j -= 1) n += 1;
  return n;
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
  // SCREENX 관은 양옆 벽 앞쪽이 영상이 비치는 벽이라 그 구간에는 벽등이 없다
  const screenWall = auditorium.screen.sideScreens ? mmToM(auditorium.screen.sideScreens.value) : 0;
  for (let i = 0; i <= count; i += 1) {
    const z = 1.5 + i * step;
    if (z < screenWall + 0.5) continue;
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

/** PRIVATE BOX 방 치수 (m). 리클라이너를 편 길이와 앞 탁자 자리를 넣은 깊이, 한 층 높이의 천장 */
export const PRIVATE_BOX = {
  /** 좌석 중심에서 앞벽(유리창)까지 */
  front: 1.05,
  /** 좌석 중심에서 뒷벽까지 */
  back: 1.0,
  height: 2.5,
  wall: 0.1,
  /** 유리창 아래 막힌 벽 높이 */
  sill: 0.8,
  glass: 0.02,
} as const;

export interface PrivateBoxRooms {
  /** 칸막이·뒷벽·천장·창 아래 벽 */
  solid: Box[];
  /** 스크린 쪽 유리창 */
  glass: Box[];
  /** 천장 가운데 조명(샹들리에 자리) */
  lamps: Tuple3[];
  /** 유리창 틀(위·아래·양옆) */
  frames: Box[];
}

/**
 * PRIVATE BOX 방. 본 객석 뒤 위층(발코니)에 방이 나란히 있고, 방마다 스크린 쪽은 유리창이다.
 * 옆은 칸막이, 뒤는 벽(복도 쪽 문), 위는 천장으로 막혀 있다.
 */
export function privateBoxRooms(auditorium: Auditorium): PrivateBoxRooms {
  const rooms: PrivateBoxRooms = { solid: [], glass: [], lamps: [], frames: [] };
  const seats = listSeats(auditorium);
  const cell = mmToM(auditorium.layout.seatWidth.value);
  const B = PRIVATE_BOX;
  auditorium.rows.forEach((row, rowIndex) => {
    if (row.zoneKind !== "privateBox" || !row.boxes) return;
    const y0 = rowFloorY(auditorium, rowIndex);
    const zc = rowCenterZ(auditorium, rowIndex);
    const zFront = zc - B.front;
    const zBack = zc + B.back;
    const depth = zBack - zFront;
    const rowSeats = seats.filter((seat) => seat.rowIndex === rowIndex);
    for (const [left, span] of row.boxes) {
      // 방은 안에 든 좌석을 따라 세운다(통로 경계에 걸친 방도 좌석과 맞게)
      const inside = boxSeats(rowSeats, [left, span]);
      const x0 = inside
        ? seatCenterX(auditorium, inside.first) - seatWidthM(auditorium, inside.first) / 2 - inside.padLeft * cell
        : unitX(auditorium, left);
      const x1 = inside
        ? seatCenterX(auditorium, inside.last) + seatWidthM(auditorium, inside.last) / 2 + inside.padRight * cell
        : unitX(auditorium, left + span);
      const w = x1 - x0;
      const cx = (x0 + x1) / 2;
      // 양옆 칸막이
      for (const x of [x0, x1]) rooms.solid.push({ position: [x, y0 + B.height / 2, zc + (B.back - B.front) / 2], scale: [B.wall, B.height, depth] });
      // 뒷벽
      rooms.solid.push({ position: [cx, y0 + B.height / 2, zBack], scale: [w + B.wall, B.height, B.wall] });
      // 천장
      rooms.solid.push({ position: [cx, y0 + B.height + B.wall / 2, zc + (B.back - B.front) / 2], scale: [w + B.wall, B.wall, depth + B.wall] });
      // 창 아래 벽
      rooms.solid.push({ position: [cx, y0 + B.sill / 2, zFront], scale: [w + B.wall, B.sill, B.wall] });
      // 유리창
      rooms.glass.push({ position: [cx, y0 + (B.sill + B.height) / 2, zFront], scale: [w - B.wall, B.height - B.sill, B.glass] });
      rooms.lamps.push([cx, y0 + B.height - 0.12, zc]);
      // 창틀: 창 위·아래 가로대와 양옆 세로대
      const glassH = B.height - B.sill;
      for (const y of [y0 + B.sill, y0 + B.height - 0.03]) rooms.frames.push({ position: [cx, y, zFront - 0.02], scale: [w, 0.05, 0.06] });
      for (const x of [x0 + B.wall / 2 + 0.02, x1 - B.wall / 2 - 0.02]) {
        rooms.frames.push({ position: [x, y0 + B.sill + glassH / 2, zFront - 0.02], scale: [0.05, glassH, 0.06] });
      }
    }
  });
  return rooms;
}

/** 위층 발코니 난간 높이 (m) */
export const BALCONY_PARAPET_M = 0.85;

/**
 * 막힌 방이 아닌 위층 구역(SWEETBOX 발코니) 앞 난간. 구역 첫 열 바닥 앞끝에 실내 폭만큼 낮은 벽을 세운다.
 * PRIVATE BOX는 방마다 창 아래 벽이 있어 따로 세우지 않는다.
 */
export function balconyParapets(auditorium: Auditorium): Box[] {
  const width = mmToM(auditorium.room.width.value);
  const halfSpacing = mmToM(auditorium.layout.rowSpacing.value) / 2;
  const out: Box[] = [];
  auditorium.rows.forEach((row, rowIndex) => {
    if (row.zoneKind !== "sweetbox" || auditorium.rows[rowIndex - 1]?.zone === row.zone) return;
    const y = rowFloorY(auditorium, rowIndex);
    out.push({
      position: [0, y + BALCONY_PARAPET_M / 2, rowCenterZ(auditorium, rowIndex) - halfSpacing],
      scale: [width, BALCONY_PARAPET_M, 0.1],
    });
  });
  return out;
}
