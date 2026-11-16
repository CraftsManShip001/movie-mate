/**
 * 시야 지표 계산. 모두 순수 함수.
 * 스크린은 평면(곡면 아님)으로 가정한다.
 */
import { EYE_TO_HEAD_TOP_M } from "./anthropometry";
import type { ScreenRect } from "./geometry";
import type { Vec3 } from "./types";

const toDeg = (rad: number): number => (rad * 180) / Math.PI;

export interface ViewMetrics {
  /** 눈에서 스크린 면까지 수평 거리 (m) */
  distanceToScreenM: number;
  /** 눈에서 스크린 중심까지 직선 거리 (m) */
  distanceToScreenCenterM: number;
  /** 스크린 폭이 차지하는 수평 시야각 (deg) */
  horizontalFovDeg: number;
  /** 스크린 높이가 차지하는 수직 시야각 (deg) */
  verticalFovDeg: number;
  /** 스크린 중심을 보려고 고개를 드는 각도 (deg). 양수면 올려본다. */
  neckElevationDeg: number;
  /** 스크린 윗변을 보는 올려보기 각도 (deg) */
  screenTopElevationDeg: number;
}

/**
 * 눈 위치와 스크린으로 시야 지표를 계산한다.
 * 수평 시야각은 스크린 왼쪽 끝과 오른쪽 끝이 눈에서 이루는 각이다.
 * 좌석이 옆으로 치우치면 그만큼 작아진다.
 */
export function computeViewMetrics(eye: Vec3, screen: ScreenRect): ViewMetrics {
  const d = eye.z;
  if (!(d > 0)) {
    throw new Error("눈 위치가 스크린 앞(z > 0)이어야 합니다.");
  }
  const half = screen.width / 2;
  const horizontal = Math.atan((half - eye.x) / d) + Math.atan((half + eye.x) / d);
  const topAngle = Math.atan((screen.top - eye.y) / d);
  const bottomAngle = Math.atan((screen.bottom - eye.y) / d);
  const centerAngle = Math.atan((screen.centerY - eye.y) / d);

  return {
    distanceToScreenM: d,
    distanceToScreenCenterM: Math.hypot(eye.x, screen.centerY - eye.y, d),
    horizontalFovDeg: toDeg(horizontal),
    verticalFovDeg: toDeg(topAngle - bottomAngle),
    neckElevationDeg: toDeg(centerAngle),
    screenTopElevationDeg: toDeg(topAngle),
  };
}

/**
 * C값(C-value): 극장 시선 설계 지표.
 * 내 눈에서 스크린 하단을 잇는 시선이 앞사람 눈 위치를 지날 때, 시선이 앞사람 눈보다 얼마나 높은지 (m).
 * 보통 0.06m 이상이면 앞사람 머리 사이로, 0.12m 이상이면 머리 위로 화면 하단이 보인다.
 * 단면(y-z)으로만 본 근사값이다.
 */
export function cValue(eye: Vec3, frontEye: Vec3, screen: ScreenRect): number {
  if (!(eye.z > 0) || !(frontEye.z > 0) || frontEye.z >= eye.z) {
    throw new Error("앞사람 눈은 내 눈과 스크린 사이에 있어야 합니다.");
  }
  const t = (eye.z - frontEye.z) / eye.z;
  const sightlineY = eye.y + (screen.bottom - eye.y) * t;
  return sightlineY - frontEye.y;
}

/**
 * 앞사람 머리가 스크린 아래쪽을 가리는 비율 (0~1).
 * 앞사람 정수리를 지나는 시선이 스크린 면에 닿는 높이까지가 가려진다고 본다.
 */
export function frontHeadOcclusionRatio(eye: Vec3, frontEye: Vec3, screen: ScreenRect): number {
  if (!(frontEye.z > 0) || frontEye.z >= eye.z) return 0;
  const headTop = frontEye.y + EYE_TO_HEAD_TOP_M;
  // 눈 → 정수리 직선을 스크린 면(z = 0)까지 연장
  const slope = (headTop - eye.y) / (eye.z - frontEye.z);
  const hitY = eye.y + slope * eye.z;
  const hidden = (hitY - screen.bottom) / (screen.top - screen.bottom);
  return Math.min(1, Math.max(0, hidden));
}

/** 앞사람 정수리 높이 (m) */
export function headTopY(eye: Vec3): number {
  return eye.y + EYE_TO_HEAD_TOP_M;
}
