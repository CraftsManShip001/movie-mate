/**
 * 좌석에서 본 장면을 2D로 투영한다 (순수 함수).
 * 3번 화면의 "작은 시야"를 WebGL 없이 그릴 때 쓴다. 3D 뷰어의 첫 화면과 같은 카메라(눈 위치, 스크린 중심을 바라봄,
 * 가로 시야각 같음)로 계산하므로 스크린이 보이는 크기·기울기가 실제 3D 화면과 맞는다.
 */
import { DEFAULT_STATURE_CM } from "./anthropometry";
import { eyePosition, listSeats, mmToM, screenRect, seatFloorPosition } from "./geometry";
import type { Auditorium, Seat, Vec3 } from "./types";

export interface PreviewCamera {
  eye: Vec3;
  target: Vec3;
  /** 가로 시야각 (deg) */
  hFovDeg: number;
  /** 결과 좌표계 크기 (예: SVG viewBox) */
  width: number;
  height: number;
}

export interface ProjectedPoint {
  x: number;
  y: number;
  /** 카메라 앞쪽 거리 (m) */
  depth: number;
}

const sub = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;
const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});
const normalize = (v: Vec3): Vec3 => {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
};

/** 원근 투영. 카메라 뒤(또는 거의 눈 위치)에 있는 점은 null. */
export function projectPoint(camera: PreviewCamera, p: Vec3): ProjectedPoint | null {
  const forward = normalize(sub(camera.target, camera.eye));
  const right = normalize(cross(forward, { x: 0, y: 1, z: 0 }));
  const up = cross(right, forward);
  const d = sub(p, camera.eye);
  const depth = dot(d, forward);
  if (depth < 0.05) return null;
  const focal = camera.width / 2 / Math.tan((camera.hFovDeg * Math.PI) / 360);
  return {
    x: camera.width / 2 + (dot(d, right) / depth) * focal,
    y: camera.height / 2 - (dot(d, up) / depth) * focal,
    depth,
  };
}

/** 투영한 길이(m → 좌표계 단위) */
export function projectedSize(camera: PreviewCamera, sizeM: number, depth: number): number {
  const focal = camera.width / 2 / Math.tan((camera.hFovDeg * Math.PI) / 360);
  return (sizeM / depth) * focal;
}

type Point2 = [number, number];

export interface SeatPreviewShapes {
  /** 스크린 네 귀퉁이 (왼아래, 오른아래, 오른위, 왼위) */
  screen: Point2[];
  /** 스크린 안 풍경 그림 (스크린 좌표 u,v를 투영) */
  sky: Point2[];
  mountains: Point2[];
  water: Point2[];
  sun: Point2[];
  /** 바로 앞 열 등받이 */
  seatBacks: { x: number; y: number; width: number }[];
  /** 앞 열 관객 머리·어깨 (가까운 3열) */
  heads: { cx: number; cy: number; rx: number; ry: number; shoulderCy: number; shoulderRx: number; shoulderRy: number }[];
}

/** 스크린 안 풍경 (u: 왼→오 0~1, v: 아래→위 0~1). 디자인 시안의 단순 풍경을 옮긴 것 */
const MOUNTAINS_UV: Point2[] = [
  [0, 0.42], [0.12, 0.57], [0.34, 0.46], [0.58, 0.64], [0.85, 0.42], [1, 0.51], [1, 0], [0, 0],
];
const WATER_TOP_V = 0.26;
const SUN_UV: Point2 = [0.76, 0.64];
const SUN_R_U = 0.045;

const HEAD_ROWS = 3;

export function seatPreviewShapes(
  auditorium: Auditorium,
  seat: Seat,
  statureCm: number,
  view: { width: number; height: number; hFovDeg: number },
): SeatPreviewShapes {
  const rect = screenRect(auditorium);
  const eye = eyePosition(auditorium, seat, statureCm);
  const camera: PreviewCamera = { eye, target: { x: 0, y: rect.centerY, z: 0 }, ...view };

  const onScreen = (u: number, v: number): Vec3 => ({
    x: (u - 0.5) * rect.width,
    y: rect.bottom + v * rect.height,
    z: 0,
  });
  const toPoint = (p: Vec3): Point2 | null => {
    const q = projectPoint(camera, p);
    return q ? [round(q.x), round(q.y)] : null;
  };
  const poly = (uvs: Point2[]): Point2[] =>
    uvs.map(([u, v]) => toPoint(onScreen(u, v))).filter((p): p is Point2 => p !== null);

  const sunPoints: Point2[] = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    const rU = SUN_R_U;
    const rV = (SUN_R_U * rect.width) / rect.height;
    return [SUN_UV[0] + Math.cos(a) * rU, SUN_UV[1] + Math.sin(a) * rV];
  });

  const all = listSeats(auditorium);
  const { seatBackHeight, seatWidth } = auditorium.layout;
  const seatBacks = all
    .filter((s) => s.rowIndex === seat.rowIndex - 1 && s.kind !== "x")
    .map((s) => {
      const floor = seatFloorPosition(auditorium, s);
      const w = mmToM(seatWidth.value) * 0.9;
      const top = { x: floor.x, y: floor.y + mmToM(seatBackHeight.value), z: floor.z + 0.28 };
      const left = projectPoint(camera, { ...top, x: top.x - w / 2 });
      const right = projectPoint(camera, { ...top, x: top.x + w / 2 });
      if (!left || !right) return null;
      return { x: round(left.x), y: round(left.y), width: round(right.x - left.x) };
    })
    .filter((b): b is NonNullable<typeof b> => b !== null);

  const heads = all
    .filter((s) => s.rowIndex < seat.rowIndex && s.rowIndex >= seat.rowIndex - HEAD_ROWS && s.kind !== "x")
    .map((s) => {
      const e = eyePosition(auditorium, s, DEFAULT_STATURE_CM);
      const center = projectPoint(camera, { x: e.x, y: e.y + 0.04, z: e.z + 0.03 });
      const shoulder = projectPoint(camera, { x: e.x, y: e.y - 0.26, z: e.z + 0.05 });
      if (!center || !shoulder) return null;
      return {
        cx: round(center.x),
        cy: round(center.y),
        rx: round(projectedSize(camera, 0.085, center.depth)),
        ry: round(projectedSize(camera, 0.115, center.depth)),
        shoulderCy: round(shoulder.y),
        shoulderRx: round(projectedSize(camera, 0.23, shoulder.depth)),
        shoulderRy: round(projectedSize(camera, 0.16, shoulder.depth)),
      };
    })
    .filter((h): h is NonNullable<typeof h> => h !== null);

  return {
    screen: poly([[0, 0], [1, 0], [1, 1], [0, 1]]),
    sky: poly([[0, 0], [1, 0], [1, 1], [0, 1]]),
    mountains: poly(MOUNTAINS_UV),
    water: poly([[0, 0], [1, 0], [1, WATER_TOP_V], [0, WATER_TOP_V]]),
    sun: poly(sunPoints),
    seatBacks,
    // listSeats는 앞(스크린 쪽) 열부터 나오므로 먼 머리부터 그려지고 가까운 머리가 위에 온다
    heads,
  };
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
