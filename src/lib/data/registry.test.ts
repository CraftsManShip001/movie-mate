import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listSeats } from "@/lib/domain/geometry";
import { CHAIN_SEAT_TOTALS } from "./chains.generated";
import { LOTTE_SEAT_TOTALS } from "./lotte.generated";
import { getAllAuditoriums, getAuditorium, getAuditoriums, getListedTheaters, getTheaters } from "./registry";
import { regionOf } from "@/lib/regions";
import { ROUTE_IDS } from "./route-ids.generated";

const DATA_DIR = path.resolve(__dirname, "../../../data/theaters");

/** 2026-11-18 롯데시네마 예매 화면 좌석 미리보기에 나온 좌석 번호. "A:1-14,16-19" = A1~A14, A16~A19 */
const LOTTE_SEAT_NUMBERS: Record<string, string> = {
  "lotte-yeongdeungpo/hall-1": "A:1-14,16-19 B-L:1-19",
  "lotte-yeongdeungpo/hall-2": "A:4-14,16-19 B-G:4-19 H-L:1-19",
  "lotte-yeongdeungpo/hall-3": "A:1-13,15-18 B-L:1-18",
  "lotte-yeongdeungpo/hall-4": "A:1-7,9-12 B-K:1-12",
  "lotte-yeongdeungpo/hall-5": "A:4-10 B-L:1-10",
  "lotte-yeongdeungpo/hall-6": "A:2-4,6-19 B-L:1-19",
  "lotte-yeongdeungpo/hall-7": "A:1-4,6-16 B-G:1-16 H-L:1-19",
  "lotte-yongsan/hall-1": "A:12 B-C:1-14 D-H:1-12 I:13-14",
  "lotte-yongsan/hall-2": "A:3 B-C:1-14 D-G:3-14 H:1-2",
  "lotte-yongsan/hall-3": "A:10 B:1-10 C-F:3-12 G:1-2",
  "lotte-yongsan/hall-4": "A:10-11 B:1-11 C-D:1-13 E:1-12 F-G:1-13",
  "lotte-yongsan/hall-5": "A:10-11 B-D:1-13 E:1-12 F-G:1-13",
  "lotte-yongsan/hall-6": "A:3 B-D:3-16 E:3-14 F:3-11 G:1-2",
  "lotte-yongsan/hall-7": "A-M:1-16 N:3-16",
  "lotte-yongsan/hall-8": "A-M:1-16 N:1-14",
};

function expandSeatNumbers(spec: string): string[] {
  return spec.split(" ").flatMap((part) => {
    const [labels, ranges] = part.split(":");
    const [from, to = from] = labels.split("-");
    const rowLabels = Array.from({ length: to.charCodeAt(0) - from.charCodeAt(0) + 1 }, (_, i) =>
      String.fromCharCode(from.charCodeAt(0) + i),
    );
    const numbers = ranges.split(",").flatMap((range) => {
      const [a, b = a] = range.split("-").map(Number);
      return Array.from({ length: b - a + 1 }, (_, i) => a + i);
    });
    return rowLabels.flatMap((label) => numbers.map((n) => `${label}${n}`));
  });
}

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

  it("롯데시네마 상영관 좌석 번호가 예매 화면과 같다", () => {
    for (const [key, spec] of Object.entries(LOTTE_SEAT_NUMBERS)) {
      const [theaterId, auditoriumId] = key.split("/");
      const auditorium = getAuditorium(theaterId, auditoriumId);
      expect(auditorium, key).toBeDefined();
      const actual = listSeats(auditorium!).map((s) => s.id).sort();
      expect(actual, key).toEqual(expandSeatNumbers(spec).sort());
    }
  });

  it("롯데시네마 지점 좌석 수가 예매 좌석 데이터의 좌석 수와 같다", () => {
    // 2026-11-18 서울 지점 상세의 총 좌석 수. 생성 파일의 값이 바뀌어도 서울은 그대로인지 따로 본다.
    const seoul: Record<string, number> = {
      "lotte-avenuel": 710, "lotte-yeongdeungpo": 1328, "lotte-nowon": 934, "lotte-konkuk-univ": 1813,
      "lotte-hongik-univ": 730, "lotte-sillim": 841, "lotte-cheongnyangni": 1733, "lotte-gimpo-airport": 2127,
      "lotte-seoul-natl-univ": 687, "lotte-gasan-digital": 1054, "lotte-yongsan": 889, "lotte-sindorim": 560,
      "lotte-world-tower": 4180, "lotte-doksan": 1606, "lotte-eunpyeong": 1336, "lotte-dogok": 847,
      "lotte-sindaebang": 533, "lotte-gangdong": 1186, "lotte-jungnang": 973, "lotte-gayang": 444, "lotte-suyu": 852,
    };
    for (const [id, total] of Object.entries(seoul)) expect(LOTTE_SEAT_TOTALS[id], id).toBe(total);
    const totals = LOTTE_SEAT_TOTALS;
    const lotte = getTheaters().filter((t) => t.chain === "롯데시네마");
    expect(lotte.map((t) => t.id).sort()).toEqual(Object.keys(totals).sort());
    for (const theater of lotte) {
      const seats = getAuditoriums(theater.id).reduce((sum, a) => sum + listSeats(a).length, 0);
      expect(seats, theater.id).toBe(totals[theater.id]);
    }
  });

  it("CGV·메가박스 지점 좌석 수가 예매 좌석 데이터의 좌석 수와 같다", () => {
    const chains = getTheaters().filter((t) => t.chain === "CGV" || t.chain === "메가박스");
    expect(chains.map((t) => t.id).sort()).toEqual(Object.keys(CHAIN_SEAT_TOTALS).sort());
    for (const theater of chains) {
      const seats = getAuditoriums(theater.id).reduce((sum, a) => sum + listSeats(a).length, 0);
      expect(seats, theater.id).toBe(CHAIN_SEAT_TOTALS[theater.id]);
    }
  });

  it("주소 검사용 id 목록(route-ids.generated.ts)이 실제 데이터와 같다", () => {
    const fromData = Object.fromEntries(getListedTheaters().map((t) => [t.id, [...t.auditoriumIds].sort()]));
    expect(ROUTE_IDS).toEqual(fromData);
  });

  it("모든 극장 주소에서 지역을 알 수 있다", () => {
    for (const theater of getTheaters()) expect(regionOf(theater.address), theater.id).not.toBeNull();
  });

  it("샘플 상영관은 sample·estimated 표시가 있다", () => {
    const samples = getAllAuditoriums().filter((a) => a.id.startsWith("sample-"));
    for (const a of samples) {
      expect(a.sample).toBe(true);
      expect(a.estimated).toBe(true);
    }
  });
});
