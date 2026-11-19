import { describe, expect, it } from "vitest";
import { buildMegaboxSchedule, decodeEntities, megaboxRating, parseMegaboxSold, type MegaboxPlayItem } from "./megabox-parse";

const mapping = { brchNo: "1372", screens: { "01": "hall-1", "02": "hall-2" } };

function item(over: Partial<MegaboxPlayItem>): MegaboxPlayItem {
  return {
    rpstMovieNo: "26063500",
    movieNo: "26063501",
    movieNm: "헝거게임 50번째 추첨의 날",
    movieEngNm: "The Hunger Games: Sunrise on the Reaping",
    admisClassCdNm: "15세이상관람가",
    moviePosterImg: "/SharedImg/2026/11/17/poster_150.jpg",
    moviePlayTime: "158",
    theabNo: "01",
    theabExpoNm: "9층 르 리클라이너 1관[Laser]",
    playKindNm: "2D&#40;자막&#41;",
    playStartTime: "10:30",
    playEndTime: "13:18",
    restSeatCnt: 113,
    totSeatCnt: 116,
    playSchdlNo: "2611201372060",
    ...over,
  };
}

describe("buildMegaboxSchedule", () => {
  const schedule = buildMegaboxSchedule({
    theaterId: "megabox-gangnam",
    mapping,
    knownScreens: [
      { id: "hall-1", name: "9층 르 리클라이너 1관", format: "2D 리클라이너", subtitle: "자막", aspectRatio: 1.9, seatCount: 116, auditoriumId: "hall-1" },
    ],
    fetchedAt: "2026-11-19T05:00:00.000Z",
    days: [
      {
        day: 0,
        items: [
          item({}),
          item({ playStartTime: "14:00", playEndTime: "16:48", playSchdlNo: "2611201372061" }),
          item({ rpstMovieNo: "1", movieNo: "1", movieNm: "폭설", admisClassCdNm: "전체관람가", theabNo: "09", playKindNm: "2D" }),
          item({ playStartTime: "23:50", playEndTime: "02:38", playSchdlNo: "2611201372099" }),
        ],
      },
    ],
  });

  it("영화는 상영 횟수가 많은 순이고 등급·상영 시간·포스터를 채운다", () => {
    expect(schedule.movies?.map((m) => m.title)).toEqual(["헝거게임 50번째 추첨의 날", "폭설"]);
    expect(schedule.movies?.[0]).toMatchObject({
      id: "26063500",
      rating: "15세 이상",
      runtimeMin: 158,
      source: "megabox",
      posterUrl: "https://img.megabox.co.kr/SharedImg/2026/11/17/poster_150.jpg",
    });
    expect(schedule.movies?.[1].rating).toBe("전체 관람가");
  });

  it("관은 theabNo로 잇고, 자막 표시는 HTML 문자 참조를 풀어 나눈다", () => {
    expect(schedule.screens[0]).toMatchObject({ auditoriumId: "hall-1", name: "9층 르 리클라이너 1관", subtitle: "자막", format: "2D 리클라이너" });
    expect(schedule.screens.find((s) => s.auditoriumId === null)).toMatchObject({ subtitle: "" });
  });

  it("상영마다 회차 번호를 남기고 자정을 넘는 끝 시각은 24시를 더한다", () => {
    expect(schedule.showings[0]).toMatchObject({ start: "10:30", end: "13:18", seq: "2611201372060", seatsLeft: 113 });
    expect(schedule.showings.find((s) => s.start === "23:50")?.end).toBe("26:38");
    expect(schedule.live?.source).toBe("메가박스");
  });
});

describe("parseMegaboxSold", () => {
  it("일반 판매가 아닌 좌석을 팔린 자리로 본다", () => {
    expect(
      parseMegaboxSold({
        seatListSD01: [
          { rowNm: "A", seatNo: 1, seatStatCd: "GERN_SELL" },
          { rowNm: "A", seatNo: 2, seatStatCd: "SCT04" },
          { rowNm: "B", seatNo: 5, seatStatCd: "STOP_SELL" },
        ],
      }),
    ).toEqual(["A2", "B5"]);
  });
});

describe("표시 문자", () => {
  it("등급과 문자 참조", () => {
    expect(megaboxRating("12세이상관람가")).toBe("12세 이상");
    expect(megaboxRating("청소년관람불가")).toBe("청소년 관람불가");
    expect(decodeEntities("2D&#40;더빙&#41;")).toBe("2D(더빙)");
  });
});
