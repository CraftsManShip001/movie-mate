import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAllAuditoriums, getAuditoriums, getTheaters } from "./registry";

const DATA_DIR = path.resolve(__dirname, "../../../data/theaters");

describe("data/theaters", () => {
  it("폴더의 모든 JSON이 registry에 등록돼 있다", () => {
    const theaterIds = readdirSync(DATA_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    expect(getTheaters().map((t) => t.id).sort()).toEqual([...theaterIds].sort());

    for (const theaterId of theaterIds) {
      const files = readdirSync(path.join(DATA_DIR, theaterId, "auditoriums"))
        .filter((f) => f.endsWith(".json"))
        .map((f) => f.replace(/\.json$/, ""));
      expect(getAuditoriums(theaterId).map((a) => a.id).sort()).toEqual(files.sort());
    }
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
