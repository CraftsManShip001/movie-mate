import { describe, expect, it } from "vitest";
import { DEFAULT_STATURE_CM } from "./anthropometry";
import { makeTestAuditorium } from "./fixtures";
import { findSeat, listSeats } from "./geometry";
import { projectPoint, seatPreviewShapes } from "./preview-projection";

const VIEW = { width: 1600, height: 900, hFovDeg: 90 };

describe("projectPoint", () => {
  it("바라보는 점은 가운데에, 오른쪽 점은 오른쪽에 찍힌다", () => {
    const camera = { eye: { x: 0, y: 1, z: 10 }, target: { x: 0, y: 1, z: 0 }, ...VIEW };
    expect(projectPoint(camera, { x: 0, y: 1, z: 0 })).toMatchObject({ x: 800, y: 450, depth: 10 });
    // 가로 시야각 90도: 거리 10m에서 오른쪽 10m는 화면 오른쪽 끝
    expect(projectPoint(camera, { x: 10, y: 1, z: 0 })?.x).toBeCloseTo(1600);
    expect(projectPoint(camera, { x: 0, y: 2, z: 0 })!.y).toBeLessThan(450);
  });

  it("카메라 뒤의 점은 null", () => {
    const camera = { eye: { x: 0, y: 1, z: 10 }, target: { x: 0, y: 1, z: 0 }, ...VIEW };
    expect(projectPoint(camera, { x: 0, y: 1, z: 12 })).toBeNull();
  });
});

describe("seatPreviewShapes", () => {
  const SAMPLE_AUDITORIUM = makeTestAuditorium();
  const seats = listSeats(SAMPLE_AUDITORIUM);
  const front = seats[0];
  const back = seats[seats.length - 1];

  const screenWidth = (pts: [number, number][]) => pts[1][0] - pts[0][0];

  it("뒤쪽 좌석일수록 스크린이 작게 보인다", () => {
    const near = seatPreviewShapes(SAMPLE_AUDITORIUM, front, DEFAULT_STATURE_CM, VIEW);
    const far = seatPreviewShapes(SAMPLE_AUDITORIUM, back, DEFAULT_STATURE_CM, VIEW);
    expect(near.screen).toHaveLength(4);
    expect(screenWidth(near.screen)).toBeGreaterThan(screenWidth(far.screen));
  });

  it("맨 앞 열은 앞사람이 없다", () => {
    const shapes = seatPreviewShapes(SAMPLE_AUDITORIUM, front, DEFAULT_STATURE_CM, VIEW);
    expect(shapes.heads).toHaveLength(0);
    expect(shapes.seatBacks).toHaveLength(0);
  });

  it("뒤 열은 앞사람 머리와 앞줄 등받이가 있다", () => {
    const seat = findSeat(SAMPLE_AUDITORIUM, "C4")!;
    const shapes = seatPreviewShapes(SAMPLE_AUDITORIUM, seat, DEFAULT_STATURE_CM, VIEW);
    expect(shapes.heads.length).toBeGreaterThan(0);
    expect(shapes.seatBacks.length).toBeGreaterThan(0);
  });
});
