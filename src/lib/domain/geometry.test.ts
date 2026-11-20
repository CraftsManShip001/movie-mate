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
  seatCenterX,
  seatGridWidthM,
  seatInFront,
  seatWidthM,
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

  it("열에 numbers가 있으면 그 번호를 쓴다", () => {
    const numbered = { ...hall, rows: hall.rows.map((row, i) => (i === 2 ? { ...row, numbers: [3, 5, 6, 7] } : row)) };
    const c = listSeats(numbered).filter((s) => s.rowLabel === "C");
    expect(c.map((s) => [s.id, s.columnIndex])).toEqual([
      ["C3", 0],
      ["C5", 1],
      ["C6", 3],
      ["C7", 4],
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

describe("넓은 좌석 (spans)", () => {
  // C열: 0~2칸을 차지하는 2칸짜리 좌석 하나, 통로 건너 3~5칸에 2칸짜리 하나
  const wide = makeTestAuditorium({
    rows: [
      { label: "A", cells: ".ssss" },
      { label: "B", cells: "sssss" },
      { label: "C", cells: "s..s.", spans: [[0, 2], [3, 2]] },
    ],
  });

  it("좌석마다 위치와 폭을 갖고, spans 가 없으면 칸 위치에 폭 1이다", () => {
    const seats = listSeats(wide);
    expect(seats.find((s) => s.id === "B3")).toMatchObject({ left: 2, span: 1 });
    expect(seats.filter((s) => s.rowLabel === "C").map((s) => [s.id, s.left, s.span])).toEqual([
      ["C1", 0, 2],
      ["C2", 3, 2],
    ]);
  });

  it("넓은 좌석의 중심은 차지한 폭의 가운데이고, 폭은 칸 수만큼 넓다", () => {
    const [c1, c2] = listSeats(wide).filter((s) => s.rowLabel === "C");
    // C1은 B1·B2 두 칸의 가운데
    expect(seatCenterX(wide, c1)).toBeCloseTo((columnCenterX(wide, 0) + columnCenterX(wide, 1)) / 2, 9);
    expect(seatCenterX(wide, c2)).toBeCloseTo((columnCenterX(wide, 3) + columnCenterX(wide, 4)) / 2, 9);
    expect(seatWidthM(wide, c1)).toBeCloseTo(1.0, 9);
    expect(eyePosition(wide, c1, DEFAULT_STATURE_CM).x).toBeCloseTo(seatCenterX(wide, c1), 9);
  });

  it("앞 좌석은 내 가운데 앞에 있는 좌석이다", () => {
    const b4 = findSeat(wide, "B4")!;
    const c2 = findSeat(wide, "C2")!;
    // C2(3~5칸)의 가운데 4는 B5(4~5칸) 앞
    expect(seatInFront(wide, c2)?.id).toBe("B5");
    expect(seatInFront(wide, b4)?.id).toBe("A3");
  });
});

describe("boxSeats", () => {
  it("박스 안 좌석(가운데 기준)과 벽까지 여유를 돌려준다", async () => {
    const { boxSeats } = await import("./geometry");
    const seat = (left: number, span = 1) => ({ id: `A${left}`, rowLabel: "A", number: 1, rowIndex: 0, columnIndex: 0, left, span, kind: "s" as const });
    const result = boxSeats([seat(0.5), seat(1.5), seat(4)], [0.2, 2.6]);
    expect(result?.first.left).toBe(0.5);
    expect(result?.last.left).toBe(1.5);
    expect(result?.padLeft).toBeCloseTo(0.3);
    expect(result?.padRight).toBeCloseTo(0.3);
    expect(boxSeats([seat(4)], [0, 2])).toBeNull();
  });
});
