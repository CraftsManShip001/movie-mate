import { describe, expect, it } from "vitest";
import { clampStature, DEFAULT_STATURE_CM, seatedEyeHeightM } from "./anthropometry";
import { makeTestAuditorium } from "./fixtures";
import {
  columnCenterX,
  eyePosition,
  findSeat,
  listSeats,
  rowCenterZ,
  rowFloorY,
  screenRect,
  seatGridWidthM,
  seatInFront,
} from "./geometry";

const hall = makeTestAuditorium();

describe("listSeats", () => {
  it("빈 칸을 건너뛰고 열마다 왼쪽부터 번호를 붙인다", () => {
    const seats = listSeats(hall);
    expect(seats).toHaveLength(4 + 5 + 4);
    expect(seats[0]).toMatchObject({ id: "A1", columnIndex: 1, rowIndex: 0, kind: "s" });
    const c = seats.filter((s) => s.rowLabel === "C");
    expect(c.map((s) => [s.id, s.columnIndex, s.kind])).toEqual([
      ["C1", 0, "w"],
      ["C2", 1, "s"],
      ["C3", 3, "s"],
      ["C4", 4, "s"],
    ]);
  });

  it("findSeat는 대소문자를 가리지 않는다", () => {
    expect(findSeat(hall, "b3")?.columnIndex).toBe(2);
    expect(findSeat(hall, "Z9")).toBeUndefined();
  });
});

describe("좌표", () => {
  it("행렬 폭은 칸 폭 합 + 통로 폭", () => {
    expect(seatGridWidthM(hall)).toBeCloseTo(3.5);
  });

  it("칸 중심 x는 통로를 건너뛴다", () => {
    expect([0, 1, 2, 3, 4].map((i) => columnCenterX(hall, i))).toEqual(
      [-1.5, -1.0, 0.5, 1.0, 1.5].map((v) => expect.closeTo(v, 9)),
    );
  });

  it("열 z는 첫 열 거리 + 열 간격, 가로 통로가 있으면 더한다", () => {
    expect([0, 1, 2].map((i) => rowCenterZ(hall, i))).toEqual([5, 6, 7]);
    const withCross = makeTestAuditorium({
      layout: { ...hall.layout, crossAisles: [{ afterRow: 0, depth: { value: 1500, source: "measured" } }] },
    });
    expect(rowCenterZ(withCross, 0)).toBeCloseTo(5);
    expect(rowCenterZ(withCross, 1)).toBeCloseTo(7.5);
  });

  it("평지 열 뒤로 열마다 단차만큼 바닥이 올라간다", () => {
    expect([0, 1, 2].map((i) => rowFloorY(hall, i))).toEqual([0, 0.5, 1.0]);
  });

  it("눈 위치 = 바닥 + 방석 높이 + 앉은 눈높이", () => {
    const seat = findSeat(hall, "B3")!;
    const eye = eyePosition(hall, seat, 166);
    expect(eye.x).toBeCloseTo(0.5);
    expect(eye.z).toBeCloseTo(6);
    expect(eye.y).toBeCloseTo(0.5 + 0.45 + 1.66 * 0.44);
  });

  it("키가 크면 눈이 높아진다", () => {
    const seat = findSeat(hall, "B3")!;
    expect(eyePosition(hall, seat, 185).y).toBeGreaterThan(eyePosition(hall, seat, 155).y);
  });

  it("바로 앞 좌석은 앞 열 같은 칸", () => {
    expect(seatInFront(hall, findSeat(hall, "B3")!)?.id).toBe("A2");
    expect(seatInFront(hall, findSeat(hall, "B1")!)).toBeUndefined(); // A열 0번 칸은 빈 칸
    expect(seatInFront(hall, findSeat(hall, "A1")!)).toBeUndefined();
  });

  it("스크린 사각형", () => {
    expect(screenRect(hall)).toEqual({ width: 10, height: 5, bottom: 1, top: 6, centerY: 3.5 });
  });
});

describe("키", () => {
  it("범위를 벗어나면 자르고 숫자가 아니면 기본값", () => {
    expect(clampStature(80)).toBe(120);
    expect(clampStature(250)).toBe(200);
    expect(clampStature(Number.NaN)).toBe(DEFAULT_STATURE_CM);
    expect(seatedEyeHeightM(200)).toBeCloseTo(0.88);
  });
});
