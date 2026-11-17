import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listSeats } from "@/lib/domain/geometry";
import { getAllAuditoriums, getAuditorium, getAuditoriums, getTheaters } from "./registry";

const DATA_DIR = path.resolve(__dirname, "../../../data/theaters");

describe("data/theaters", () => {
  it("폴더의 모든 JSON이 registry에 등록돼 있다", () => {
    const theaterIds = readdirSync(DATA_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    expect(getTheaters().map((t) => t.id).sort()).toEqual([...theaterIds].sort());

    for (const theaterId of theaterIds) {
      const files = ["auditoriums", "seatmaps"].flatMap((dir) => {
        const full = path.join(DATA_DIR, theaterId, dir);
        if (!existsSync(full)) return [];
        return readdirSync(full)
          .filter((f) => f.endsWith(".json"))
          .map((f) => f.replace(/\.json$/, ""));
      });
      expect(getAuditoriums(theaterId).map((a) => a.id).sort()).toEqual(files.sort());
    }
  });

  it("용아맥은 예매 화면 좌석표대로 624석이고 번호도 CGV와 같다", () => {
    const imax = getAuditorium("cgv-yongsan-ipark-mall", "imax");
    expect(imax).toBeDefined();
    if (!imax) return;
    expect(imax.sample).toBe(false);
    expect(imax.estimated).toBe(true);
    const seats = listSeats(imax);
    expect(seats).toHaveLength(624);
    expect(seats.filter((s) => s.kind === "w").map((s) => s.id)).toEqual(["A17", "A18", "A19", "A22", "A23", "A24"]);
    const ids = new Set(seats.map((s) => s.id));
    for (const id of ["A3", "A43", "B16", "I1", "I45", "P44", "P37"]) expect(ids.has(id)).toBe(true);
    expect(ids.has("A1")).toBe(false);
    expect(imax.screen.width.value).toBe(31000);
  });

  it("폴더 이름과 JSON 안의 id가 같다", () => {
    for (const theater of getTheaters()) {
      const json = JSON.parse(readFileSync(path.join(DATA_DIR, theater.id, "theater.json"), "utf8"));
      expect(json.id).toBe(theater.id);
    }
  });

  it("샘플 상영관은 sample·estimated 표시가 있다", () => {
    const samples = getAllAuditoriums().filter((a) => a.id.startsWith("sample-"));
    expect(samples.length).toBeGreaterThan(0);
    for (const a of samples) {
      expect(a.sample).toBe(true);
      expect(a.estimated).toBe(true);
    }
  });
});
