import { describe, expect, it } from "vitest";
import type { Movie, Schedule, Showing } from "@/lib/showtimes/types";
import { rankMovies } from "./ranking";

const movie = (id: string, title: string, extra: Partial<Movie> = {}): Movie => ({
  schemaVersion: 1,
  id,
  sample: false,
  title,
  titleEn: "",
  rating: "12세 이상",
  posterUrl: `https://img.example/${id}.jpg`,
  ...extra,
});

const show = (movieId: string, day = 0): Showing => ({ day, screenId: "1", start: "10:00", end: "12:00", seatsLeft: 10, movieId });

const schedule = (theaterId: string, movies: Movie[], showings: Showing[]): Schedule => ({
  schemaVersion: 1,
  theaterId,
  movieId: movies[0]?.id ?? "",
  sample: false,
  screens: [],
  showings,
  movies,
});

describe("rankMovies", () => {
  it("오늘 상영 횟수를 극장끼리 합쳐 많은 순으로 줄 세운다", () => {
    const a = schedule("mega", [movie("m1", "폭설"), movie("m2", "헥스: 마녀왕국")], [show("m1"), show("m2"), show("m2")]);
    const b = schedule("lotte", [movie("l1", "폭설"), movie("l2", "헥스 마녀왕국")], [show("l1"), show("l1"), show("l1"), show("l2")]);
    const ranked = rankMovies([a, b]);
    expect(ranked.map((m) => [m.title, m.showings])).toEqual([
      ["폭설", 4],
      ["헥스: 마녀왕국", 3],
    ]);
    // 가장 많이 트는 극장으로 연결한다
    expect(ranked[0]).toMatchObject({ theaterId: "lotte", movieId: "l1" });
    expect(ranked[1]).toMatchObject({ theaterId: "mega", movieId: "m2" });
  });

  it("내일 상영과 특별 상영([F], [무대인사])은 세지 않는다", () => {
    const s = schedule(
      "mega",
      [movie("m1", "[F] 아사코"), movie("m2", "룩백"), movie("m3", "실낙원")],
      [show("m1"), show("m1"), show("m2"), show("m3", 1), show("m3", 1)],
    );
    expect(rankMovies([s]).map((m) => m.title)).toEqual(["룩백"]);
  });

  it("큰 포스터가 있으면 그것을 쓰고, 개수를 자른다", () => {
    const movies = Array.from({ length: 7 }, (_, i) => movie(`m${i}`, `영화${i}`, i === 0 ? { ticketPosterUrl: "big.jpg" } : {}));
    const s = schedule("mega", movies, movies.flatMap((m, i) => Array.from({ length: 7 - i }, () => show(m.id))));
    const ranked = rankMovies([s]);
    expect(ranked).toHaveLength(5);
    expect(ranked[0].posterUrl).toBe("big.jpg");
  });
});
