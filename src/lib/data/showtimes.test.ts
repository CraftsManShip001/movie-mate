import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listSeats } from "@/lib/domain/geometry";
import { getAuditorium, getTheater } from "./registry";
import { getMovie, getSchedules } from "./showtimes";

const DATA_DIR = path.resolve(__dirname, "../../../data/showtimes");

describe("data/showtimes", () => {
  it("폴더의 모든 시간표가 등록돼 있다", () => {
    const files = readdirSync(DATA_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
    expect(getSchedules().map((s) => s.theaterId).sort()).toEqual(files.sort());
  });

  it("극장·영화·관이 모두 존재하고 시각 형식이 맞다", () => {
    for (const schedule of getSchedules()) {
      expect(getTheater(schedule.theaterId)).toBeDefined();
      expect(getMovie(schedule.movieId)).toBeDefined();
      const screenIds = new Set(schedule.screens.map((s) => s.id));
      for (const showing of schedule.showings) {
        expect(screenIds.has(showing.screenId)).toBe(true);
        expect(showing.start).toMatch(/^\d{2}:\d{2}$/);
        expect(showing.end).toMatch(/^\d{2}:\d{2}$/);
        expect(showing.end > showing.start).toBe(true);
        expect(showing.day).toBeGreaterThanOrEqual(0);
        expect(showing.day).toBeLessThan(7);
      }
    }
  });

  it("시야 미리보기가 있는 관은 상영관 데이터와 화면비·좌석 수가 같다", () => {
    for (const schedule of getSchedules()) {
      for (const screen of schedule.screens) {
        if (screen.auditoriumId === null) continue;
        const auditorium = getAuditorium(schedule.theaterId, screen.auditoriumId);
        expect(auditorium, `${schedule.theaterId}/${screen.auditoriumId}`).toBeDefined();
        expect(auditorium!.screen.aspectRatio.value).toBeCloseTo(screen.aspectRatio, 2);
        const seats = listSeats(auditorium!).filter((s) => s.kind !== "x").length;
        expect(seats).toBe(screen.seatCount);
      }
    }
  });

  it("샘플 시간표·영화는 sample 표시가 있다", () => {
    for (const schedule of getSchedules()) {
      expect(schedule.sample).toBe(true);
      expect(getMovie(schedule.movieId)?.sample).toBe(true);
    }
  });
});
