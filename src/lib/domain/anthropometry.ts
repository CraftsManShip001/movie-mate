/**
 * 사람 몸 치수 관련 표준값. 모두 추정값이며, 근거가 바뀌면 여기만 고치면 된다.
 */

/** 기본 키(cm). 한국 성인 남녀 평균(사이즈코리아 8차 조사 기준 남 약 172.5, 여 약 159.6)의 중간값. */
export const DEFAULT_STATURE_CM = 166;
export const MIN_STATURE_CM = 120;
export const MAX_STATURE_CM = 200;

/**
 * 앉은 눈높이(방석 윗면에서 눈까지) / 키 비율.
 * 똑바로 앉으면 약 0.46, 영화관 좌석처럼 살짝 기대면 조금 낮아져 0.44로 둔다. (추정값)
 */
export const SEATED_EYE_HEIGHT_RATIO = 0.44;

/** 눈에서 정수리까지 높이 (m). 성인 평균 약 11~13cm. (추정값) */
export const EYE_TO_HEAD_TOP_M = 0.12;

/** 키 값을 허용 범위 안으로 자른다. 숫자가 아니면 기본값. */
export function clampStature(cm: number): number {
  if (!Number.isFinite(cm)) return DEFAULT_STATURE_CM;
  return Math.min(MAX_STATURE_CM, Math.max(MIN_STATURE_CM, Math.round(cm)));
}

/** 방석 윗면에서 눈까지 높이 (m) */
export function seatedEyeHeightM(statureCm: number): number {
  return (clampStature(statureCm) / 100) * SEATED_EYE_HEIGHT_RATIO;
}
