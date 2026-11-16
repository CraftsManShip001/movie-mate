import { describe, expect, it } from "vitest";
import type { ScreenRect } from "./geometry";
import { computeViewMetrics, cValue, frontHeadOcclusionRatio } from "./metrics";
import { coverUv } from "./texture-fit";

// 폭 10m, 높이 5m, 하단 1m
const screen: ScreenRect = { width: 10, height: 5, bottom: 1, top: 6, centerY: 3.5 };

describe("computeViewMetrics", () => {
  it("정중앙, 스크린 중심 높이의 눈", () => {
    const m = computeViewMetrics({ x: 0, y: 3.5, z: 5 }, screen);
    expect(m.distanceToScreenM).toBe(5);
    expect(m.distanceToScreenCenterM).toBeCloseTo(5);
    expect(m.horizontalFovDeg).toBeCloseTo(90);
    expect(m.verticalFovDeg).toBeCloseTo(53.1301, 3);
    expect(m.neckElevationDeg).toBeCloseTo(0);
    expect(m.screenTopElevationDeg).toBeCloseTo(26.5651, 3);
  });

  it("옆으로 치우치면 수평 시야각이 줄어든다", () => {
    const side = computeViewMetrics({ x: 5, y: 3.5, z: 5 }, screen);
    expect(side.horizontalFovDeg).toBeCloseTo(63.4349, 3);
    expect(side.distanceToScreenCenterM).toBeCloseTo(Math.hypot(5, 5));
  });

  it("눈이 스크린 중심보다 낮으면 올려본다(양수)", () => {
    const m = computeViewMetrics({ x: 0, y: 1.5, z: 4 }, screen);
    expect(m.neckElevationDeg).toBeCloseTo(26.5651, 3); // atan(2/4)
  });

  it("뒤로 갈수록 시야각이 작아진다", () => {
    const near = computeViewMetrics({ x: 0, y: 2, z: 6 }, screen);
    const far = computeViewMetrics({ x: 0, y: 2, z: 20 }, screen);
    expect(far.horizontalFovDeg).toBeLessThan(near.horizontalFovDeg);
  });

  it("스크린 뒤(z <= 0)는 오류", () => {
    expect(() => computeViewMetrics({ x: 0, y: 2, z: 0 }, screen)).toThrow();
  });
});

describe("앞사람", () => {
  it("C값: 스크린 하단 시선이 앞사람 눈보다 높은 만큼", () => {
    expect(cValue({ x: 0, y: 2, z: 6 }, { x: 0, y: 1.5, z: 5 }, screen)).toBeCloseTo(1 / 3);
  });

  it("앞사람이 뒤에 있으면 오류", () => {
    expect(() => cValue({ x: 0, y: 2, z: 5 }, { x: 0, y: 1.5, z: 6 }, screen)).toThrow();
  });

  it("앞사람 머리가 스크린 하단 일부를 가린다", () => {
    expect(frontHeadOcclusionRatio({ x: 0, y: 2, z: 6 }, { x: 0, y: 1.9, z: 5 }, screen)).toBeCloseTo(0.224);
  });

  it("단차가 충분하면 가리지 않는다", () => {
    expect(frontHeadOcclusionRatio({ x: 0, y: 2, z: 6 }, { x: 0, y: 1.0, z: 5 }, screen)).toBe(0);
  });
});

describe("coverUv", () => {
  it("영상이 더 넓으면 좌우를 자른다", () => {
    const fit = coverUv(16 / 9, 1.43);
    expect(fit.repeatY).toBe(1);
    expect(fit.repeatX).toBeCloseTo(1.43 / (16 / 9));
    expect(fit.offsetX).toBeCloseTo((1 - fit.repeatX) / 2);
  });

  it("영상이 더 좁으면 위아래를 자른다", () => {
    expect(coverUv(1, 2)).toEqual({ repeatX: 1, repeatY: 0.5, offsetX: 0, offsetY: 0.25 });
  });

  it("비율이 같으면 그대로", () => {
    expect(coverUv(2.39, 2.39)).toEqual({ repeatX: 1, repeatY: 1, offsetX: 0, offsetY: 0 });
  });
});
