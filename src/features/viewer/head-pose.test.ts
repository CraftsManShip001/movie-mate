import { describe, expect, it } from "vitest";
import { RECLINE } from "@/lib/domain/geometry";
import { neckAngles, neckStrained, torsoTiltDeg } from "./head-pose";
import { neckLabel } from "./NeckGuide";

const rad = (deg: number) => (deg * Math.PI) / 180;

describe("목 각도", () => {
  it("바로 앉으면 시선 각도가 곧 목을 든 각도다", () => {
    const neck = neckAngles({ pitch: rad(20), yaw: rad(-30), recline: 0, screenPitch: rad(20) });
    expect(neck.up).toBeCloseTo(20);
    expect(neck.turn).toBeCloseTo(-30);
  });

  it("누우면 머리받침에 기댄 만큼 덜 든다", () => {
    const neck = neckAngles({ pitch: rad(RECLINE.gazeUpDeg), yaw: 0, recline: 1, screenPitch: 0 });
    expect(neck.up).toBeCloseTo(0);
    expect(torsoTiltDeg(0)).toBeCloseTo(15, 0);
    expect(torsoTiltDeg(1)).toBeCloseTo(50, 0);
  });

  it("많이 꺾으면 불편한 자세로 본다", () => {
    expect(neckStrained({ up: 10, turn: 0 })).toBe(false);
    expect(neckStrained({ up: 30, turn: 0 })).toBe(true);
    expect(neckStrained({ up: -25, turn: 0 })).toBe(true);
    expect(neckStrained({ up: 0, turn: 60 })).toBe(true);
  });

  it("꺾은 쪽만 짧게 말한다", () => {
    expect(neckLabel({ up: 1, turn: -2 })).toBe("목 편해요");
    expect(neckLabel({ up: 20.4, turn: 0 })).toBe("목 20° 위로");
    expect(neckLabel({ up: -8, turn: 31 })).toBe("목 8° 아래로 · 왼쪽 31°");
  });
});
