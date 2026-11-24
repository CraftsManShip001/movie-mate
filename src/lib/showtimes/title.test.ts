import { describe, expect, it } from "vitest";
import { findMovieByTitle, titleKey } from "./title";

describe("titleKey", () => {
  it("띄어쓰기·기호가 달라도 같은 영화로 본다", () => {
    expect(titleKey("헥스: 마녀왕국")).toBe(titleKey("헥스 마녀왕국"));
    expect(titleKey("헝거게임 50번째 추첨의 날")).toBe(titleKey("헝거게임50번째추첨의날"));
  });
});

describe("findMovieByTitle", () => {
  const movies = [
    { id: "25174", title: "헥스 마녀왕국" },
    { id: "25121", title: "폭설" },
  ];

  it("제목으로 이 극장의 영화를 찾는다", () => {
    expect(findMovieByTitle(movies, "헥스: 마녀왕국")?.id).toBe("25174");
  });

  it("없는 영화나 빈 값은 undefined", () => {
    expect(findMovieByTitle(movies, "라라랜드")).toBeUndefined();
    expect(findMovieByTitle(movies, "")).toBeUndefined();
    expect(findMovieByTitle(movies, null)).toBeUndefined();
    expect(findMovieByTitle(undefined, "폭설")).toBeUndefined();
  });
});
