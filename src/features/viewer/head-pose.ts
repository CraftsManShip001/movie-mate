import { RECLINE } from "@/lib/domain/geometry";

/**
 * 3D 시야의 지금 고개 방향. 카메라가 매 프레임 써 넣고, 좌하단 목 그림이 읽는다.
 * 매 프레임 바뀌므로 React 상태가 아니라 하나의 객체(ref)로 주고받는다.
 */
export interface HeadPose {
  /** 시선의 위아래 각도(라디안, 수평 0, 위가 양수) */
  pitch: number;
  /** 시선의 좌우 각도(라디안, 몸이 향한 스크린 쪽 0, 왼쪽이 양수) */
  yaw: number;
  /** 리클라이너를 젖힌 정도(0~1) */
  recline: number;
  /** 눈에서 스크린 중심을 보는 위아래 각도(라디안) */
  screenPitch: number;
}

export function createHeadPose(): HeadPose {
  return { pitch: 0, yaw: 0, recline: 0, screenPitch: 0 };
}

const DEG = 180 / Math.PI;

/** 상체가 수직에서 기운 각도(도). 바로 앉으면 15°, 끝까지 누우면 50° */
export function torsoTiltDeg(recline: number): number {
  return (RECLINE.uprightRad + (RECLINE.reclinedRad - RECLINE.uprightRad) * recline) * DEG;
}

/**
 * 목을 얼마나 꺾었는지(도). 목에 힘을 뺐을 때 얼굴 방향(바로 앉으면 수평, 누우면 gazeUpDeg 위)에서
 * 지금 시선까지의 차이다. up 이 양수면 고개를 든 것, 음수면 숙인 것. turn 이 양수면 왼쪽으로 돌린 것.
 */
export function neckAngles(pose: HeadPose): { up: number; turn: number } {
  return { up: pose.pitch * DEG - RECLINE.gazeUpDeg * pose.recline, turn: pose.yaw * DEG };
}

/** 오래 보면 목이 불편해지는 각도(도). 이보다 크면 그림을 강조색으로 바꾼다 */
export const NECK_STRAIN = { up: 25, down: 20, turn: 45 } as const;

export function neckStrained({ up, turn }: { up: number; turn: number }): boolean {
  return up > NECK_STRAIN.up || up < -NECK_STRAIN.down || Math.abs(turn) > NECK_STRAIN.turn;
}

/** "목 20° 위로 · 왼쪽 30°" 처럼 꺾은 쪽만 말한다. 거의 안 꺾었으면 "목 편해요" */
export function neckLabel({ up, turn }: { up: number; turn: number }): string {
  const u = Math.round(up);
  const t = Math.round(turn);
  const parts: string[] = [];
  if (Math.abs(u) >= 3) parts.push(`${Math.abs(u)}° ${u > 0 ? "위로" : "아래로"}`);
  if (Math.abs(t) >= 3) parts.push(`${t > 0 ? "왼쪽" : "오른쪽"} ${Math.abs(t)}°`);
  return parts.length === 0 ? "목 편해요" : `목 ${parts.join(" · ")}`;
}
