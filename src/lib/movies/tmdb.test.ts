import { describe, expect, it } from "vitest";
import { pickMostPopular, toMovie, type TmdbDetails } from "./tmdb";

const details = (overrides: Partial<TmdbDetails> = {}): TmdbDetails => ({
  id: 693134,
  title: "듄: 파트2",
  original_title: "Dune: Part Two",
  original_language: "en",
  release_date: "2024-02-27",
  runtime: 166,
  poster_path: "/abc.jpg",
  release_dates: {
    results: [
      { iso_3166_1: "US", release_dates: [{ certification: "PG-13", release_date: "2024-03-01T00:00:00.000Z" }] },
      { iso_3166_1: "KR", release_dates: [{ certification: "12", release_date: "2024-02-28T00:00:00.000Z" }] },
    ],
  },
  ...overrides,
});

describe("toMovie", () => {
  it("한국 제목·한국 등급·포스터 주소로 바꾼다", () => {
    const movie = toMovie(details(), 120);
    expect(movie).toMatchObject({
      id: "tmdb-693134",
      sample: false,
      source: "tmdb",
      title: "듄: 파트2",
      titleEn: "DUNE: PART TWO",
      year: 2024,
      rating: "12세 이상",
      runtimeMin: 166,
      posterUrl: "https://image.tmdb.org/t/p/w500/abc.jpg",
    });
  });

  it("영어 영화가 아니면 번역의 영어 제목을 쓴다", () => {
    const movie = toMovie(
      details({
        title: "하얼빈",
        original_title: "하얼빈",
        original_language: "ko",
        translations: { translations: [{ iso_639_1: "en", data: { title: "Harbin" } }] },
      }),
      120,
    );
    expect(movie.titleEn).toBe("HARBIN");
  });

  it("등급·상영 시간이 없으면 '등급 미정'과 대체 시간을 쓴다", () => {
    const movie = toMovie(details({ runtime: 0, release_dates: { results: [] } }), 130);
    expect(movie.rating).toBe("등급 미정");
    expect(movie.runtimeMin).toBe(130);
    expect(movie.year).toBe(2024);
  });
});

describe("pickMostPopular", () => {
  it("포스터 있는 영화 중 인기순 1위", () => {
    expect(
      pickMostPopular([
        { id: 1, popularity: 900, poster_path: null },
        { id: 2, popularity: 300, poster_path: "/b.jpg" },
        { id: 3, popularity: 500, poster_path: "/c.jpg" },
      ])?.id,
    ).toBe(3);
  });
});
