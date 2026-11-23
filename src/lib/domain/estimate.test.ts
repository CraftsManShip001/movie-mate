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

  it("넓은 좌석이 덮은 세로줄은 빈 줄로 보지 않고, 지운 줄만큼 위치를 당긴다", () => {
    const { rows, verticalAisles } = compactSeatMap([
      { label: "A", cells: ".ss.ss.ss" },
      // 2칸짜리 좌석이 1~3칸, 통로 건너 4.5~6.5칸, 7~9칸
      { label: "B", cells: ".s...s.s.", spans: [[1, 2], [4.5, 2], [7, 2]] },
    ]);
    // 0번 줄(끝)과 3번 줄(통로)만 지워진다. 6번 줄은 B열 좌석이 덮는다
    expect(rows[0].cells).toBe("ss" + "ss.ss");
    expect(verticalAisles).toEqual([1]);
    expect(rows[1].spans).toEqual([[0, 2], [2.5, 2], [5, 2]]);
  });

  it("따로 떨어진 구역(박스석) 열은 본 객석 통로를 지우지 않고, 박스째로 통로 한쪽에 놓는다", () => {
    const { rows, verticalAisles } = compactSeatMap([
      { label: "A", cells: ".ss.ss." },
      // 박스석이 본 객석 통로(3번 줄) 위에 걸쳐 있다
      { label: "B", cells: "..ss...", spans: [[2.5, 1], [3.5, 1]], zone: "PRIVATE BOX 7층", boxes: [[2, 3]] },
    ]);
    expect(verticalAisles).toEqual([1]);
    expect(rows[0].cells).toBe("ssss");
    // 박스 가운데(3.5)는 지운 줄을 빼면 2.0이라 통로 경계(2)에 걸친다. 두 좌석을 통째로 통로 왼쪽에 둔다
    expect(rows[1].spans).toEqual([[0, 1], [1, 1]]);
    expect(rows[1].zone).toBe("PRIVATE BOX 7층");
    expect(rows[1].cells.replace(/\./g, "")).toBe("ss");
    // 박스 벽은 좌석과의 여유(0.5칸)를 두고 따라가되, 좌석표 밖으로는 나가지 않는다
    expect(rows[1].boxes).toEqual([[0, 2.5]]);
  });
});

describe("compactSeatMap · SWEETBOX 2인석", () => {
  it("박스 없는 구역 좌석은 두 자리씩 묶어, 통로가 한 쌍을 가르지 않게 한다", () => {
    const { rows } = compactSeatMap([
      { label: "A", cells: "ss.ssssss.ss" },
      // 2인석 네 쌍. 두 번째 쌍(2.5~4.5)이 통로(2번 줄) 경계에 걸친다
      { label: "O", cells: "ss.ss.ss..ss", spans: [[0, 1], [1, 1], [2.5, 1], [3.5, 1], [6, 1], [7, 1], [10, 1], [11, 1]], zone: "SWEETBOX PREMIUM 6층" },
    ]);
    const spans = rows[1].spans ?? [];
    // 압축 뒤 통로 경계는 2와 8. 쌍마다 두 자리가 붙어 있고, 어느 쌍도 경계를 넘지 않는다
    for (let i = 0; i < spans.length; i += 2) {
      expect(spans[i + 1][0]).toBeCloseTo(spans[i][0] + 1);
      for (const b of [2, 8]) expect(spans[i][0] < b && spans[i + 1][0] + 1 > b).toBe(false);
    }
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
