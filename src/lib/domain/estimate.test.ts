import { describe, expect, it } from "vitest";
import { compactSeatMap, estimateAuditorium, sightlineRiser, type SeatMapInput } from "./estimate";
import { seatGridWidthM } from "./geometry";
import { validateAuditorium } from "./validation";

const input = (overrides: Partial<SeatMapInput> = {}): SeatMapInput => ({
  schemaVersion: 1,
  id: "hall-1",
  theaterId: "test-theater",
  name: "1관",
  format: "standard",
  seatMapSource: "테스트",
  aspectRatio: 2.39,
  rows: [
    { label: "A", cells: "..ssss..ssssssss..ssss.." },
    { label: "B", cells: "..ssss..ssssssss..ssss.." },
    { label: "C", cells: "..ssss..ssssssss..ssss.." },
    { label: "D", cells: ".sssss..ssssssss..sssss." },
  ],
  ...overrides,
});

describe("compactSeatMap", () => {
  it("빈 세로줄을 통로로 바꾸고 양 끝 빈 줄은 지운다", () => {
    const { rows, verticalAisles } = compactSeatMap(input().rows);
    // 맨 앞 칸은 A열에선 비지만 D열에 좌석이 있으므로 남는다
    expect(rows[0].cells).toBe(".ssss" + "ssssssss" + "ssss.");
    expect(rows[3].cells).toBe("sssss" + "ssssssss" + "sssss");
    expect(verticalAisles).toEqual([4, 12]);
  });
});

describe("sightlineRiser", () => {
  it("멀어질수록 필요한 단차가 커지고, 평균값을 돌려준다", () => {
    const riser = sightlineRiser([5000, 6000, 7000], 300, 100);
    // E1 = 400 × 6/5 = 480, E2 = 580 × 7/6 ≈ 676.7 → (676.7 − 300) / 2
    expect(riser).toBeCloseTo((580 * 7) / 6 / 2 - 150, 3);
  });
});

describe("estimateAuditorium", () => {
  it("검증을 통과하고 모든 치수가 추정값이다", () => {
    const auditorium = estimateAuditorium(input());
    expect(validateAuditorium(auditorium)).toEqual([]);
    expect(auditorium.estimated).toBe(true);
    expect(auditorium.sample).toBe(false);
  });

  it("객석 폭 = 좌석 칸 × 좌석 폭 + 통로", () => {
    const auditorium = estimateAuditorium(input());
    // 18칸 × 560 + 통로 2 × 1100 = 12.28m
    expect(seatGridWidthM(auditorium)).toBeCloseTo(12.28, 5);
    expect(auditorium.room.width.value).toBe(12280 + 2200);
  });

  it("공개 스크린 크기가 있으면 그대로 쓰고 화면비를 거기서 계산한다", () => {
    const auditorium = estimateAuditorium(
      input({ format: "imax", screen: { width: 31000, height: 22400, note: "공개 수치" }, aspectRatio: 1.43 }),
    );
    expect(auditorium.screen.width.value).toBe(31000);
    expect(auditorium.screen.height.value).toBe(22400);
    expect(auditorium.screen.aspectRatio.value).toBeCloseTo(31 / 22.4, 3);
    expect(auditorium.room.width.value).toBeGreaterThanOrEqual(33000);
    expect(validateAuditorium(auditorium)).toEqual([]);
  });

  it("가로 통로만큼 뒤 열이 밀린다", () => {
    const flat = estimateAuditorium(input());
    const withCross = estimateAuditorium(input({ crossAisleAfterRows: [1] }));
    expect(withCross.room.depth.value - flat.room.depth.value).toBe(1200);
  });
});
