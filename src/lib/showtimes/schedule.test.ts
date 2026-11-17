import { describe, expect, it } from "vitest";
import {
  addDays,
  buildDateStrip,
  daysBetween,
  findNextShowDay,
  fromMinutes,
  groupShowingsByScreen,
  isFewSeatsLeft,
  screenMeta,
  toMinutes,
  withRuntime,
} from "./schedule";
import type { Schedule } from "./types";

const schedule: Schedule = {
  schemaVersion: 1,
  theaterId: "t",
  movieId: "m",
  sample: true,
  screens: [
    { id: "imax", name: "IMAX관", format: "IMAX 레이저", subtitle: "자막", aspectRatio: 1.43, seatCount: 624, auditoriumId: "a" },
    { id: "4dx", name: "4DX관", format: "4DX", subtitle: "자막", aspectRatio: 1.9, seatCount: 120, auditoriumId: "b" },
    { id: "3", name: "3관", format: "2D", subtitle: "자막", aspectRatio: 2.39, seatCount: 172, auditoriumId: null },
  ],
  showings: [
    { day: 0, screenId: "3", start: "21:00", end: "23:52", seatsLeft: 158 },
    { day: 0, screenId: "imax", start: "13:40", end: "16:32", seatsLeft: 212 },
    { day: 0, screenId: "imax", start: "10:20", end: "13:12", seatsLeft: 88 },
    { day: 0, screenId: "3", start: "12:10", end: "15:02", seatsLeft: 140 },
    { day: 2, screenId: "4dx", start: "11:00", end: "13:52", seatsLeft: 14 },
    { day: 2, screenId: "imax", start: "17:00", end: "19:52", seatsLeft: 31 },
  ],
};

describe("isFewSeatsLeft", () => {
  it("40석 미만이면 강조한다", () => {
    expect(isFewSeatsLeft(39)).toBe(true);
    expect(isFewSeatsLeft(0)).toBe(true);
    expect(isFewSeatsLeft(40)).toBe(false);
    expect(isFewSeatsLeft(212)).toBe(false);
  });
});

describe("groupShowingsByScreen", () => {
  it("관 순서를 지키고 관 안에서는 시작 시각 순서로 묶는다", () => {
    const groups = groupShowingsByScreen(schedule, 0);
    expect(groups.map((g) => g.screen.id)).toEqual(["imax", "3"]);
    expect(groups[0].showings.map((s) => s.start)).toEqual(["10:20", "13:40"]);
    expect(groups[1].showings.map((s) => s.start)).toEqual(["12:10", "21:00"]);
  });

  it("상영이 없는 관은 빼고, 시야 데이터가 없는 관은 preview가 false다", () => {
    const groups = groupShowingsByScreen(schedule, 0);
    expect(groups.find((g) => g.screen.id === "4dx")).toBeUndefined();
    expect(groups.find((g) => g.screen.id === "3")?.preview).toBe(false);
    expect(groups.find((g) => g.screen.id === "imax")?.preview).toBe(true);
  });

  it("notBeforeMinutes 이전에 시작한 상영은 뺀다", () => {
    const groups = groupShowingsByScreen(schedule, 0, { notBeforeMinutes: toMinutes("13:40") });
    expect(groups.map((g) => g.screen.id)).toEqual(["3"]);
    expect(groups[0].showings.map((s) => s.start)).toEqual(["21:00"]);
  });

  it("상영이 없는 날은 빈 배열", () => {
    expect(groupShowingsByScreen(schedule, 1)).toEqual([]);
  });
});

describe("findNextShowDay", () => {
  it("다음 상영일과 횟수, 관 이름을 알려 준다", () => {
    expect(findNextShowDay(schedule, 0, 6)).toEqual({ day: 2, count: 2, screenNames: ["IMAX관", "4DX관"] });
  });
  it("없으면 null", () => {
    expect(findNextShowDay(schedule, 2, 6)).toBeNull();
  });
});

describe("날짜", () => {
  it("addDays는 달과 해를 넘긴다", () => {
    expect(addDays("2026-11-30", 1)).toBe("2026-12-01");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(daysBetween("2026-11-16", "2026-11-22")).toBe(6);
  });

  it("buildDateStrip은 오늘부터 7일, 첫날은 '오늘'", () => {
    const strip = buildDateStrip("2026-11-16");
    expect(strip).toHaveLength(7);
    expect(strip.map((d) => d.label)).toEqual(["오늘", "화", "수", "목", "금", "토", "일"]);
    expect(strip.map((d) => d.day)).toEqual([16, 17, 18, 19, 20, 21, 22]);
  });
});

describe("screenMeta", () => {
  it("포맷 · 자막 · 화면비 · 좌석 수", () => {
    expect(screenMeta(schedule.screens[0])).toBe("IMAX 레이저 · 자막 · 1.43:1 · 624석");
    expect(screenMeta(schedule.screens[1])).toBe("4DX · 자막 · 1.90:1 · 120석");
  });
});

describe("withRuntime", () => {
  it("끝나는 시각을 시작 + 상영 시간으로 다시 계산한다", () => {
    const next = withRuntime(schedule, 166);
    expect(next.showings[0].end).toBe(fromMinutes(toMinutes(next.showings[0].start) + 166));
    expect(fromMinutes(23 * 60 + 30 + 166)).toBe("26:16");
  });
});

