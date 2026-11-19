import { describe, expect, it } from "vitest";
import { LOTTE_LIVE } from "@/lib/data/lotte.generated";
import { getAuditorium, getTheaters } from "@/lib/data/registry";
import { buildLotteSchedule, parseBookedSeats, ratingLabel, type LottePlayItem } from "./lotte-parse";

const mapping = { cinema: "1|0002|3024", screens: { "302401": "hall-1", "302402": "hall-2" } };

function item(over: Partial<LottePlayItem>): LottePlayItem {
  return {
    RepresentationMovieCode: "25121",
    MovieNameKR: "폭설",
    MovieNameUS: "White Blast",
    ViewGradeNameKR: "15",
    PosterURL: "http://cf.lottecinema.co.kr//Media/MovieFile/MovieImg/202611/25121_503_1.jpg",
    ScreenID: 302402,
    ScreenNameKR: "2관",
    ScreenDivisionNameKR: "리클라이너",
    FilmNameKR: "2D",
    TranslationDivisionNameKR: "",
    StartTime: "13:30",
    EndTime: "15:09",
    BookingSeatCount: 183,
    TotalSeatCount: 210,
    PlaySequence: 3,
    ...over,
  };
}

describe("buildLotteSchedule", () => {
  const schedule = buildLotteSchedule({
    theaterId: "lotte-suwon",
    mapping,
    knownScreens: [],
    fetchedAt: "2026-11-19T05:00:00.000Z",
    days: [
      {
        day: 0,
        items: [
          item({}),
          item({ StartTime: "15:30", EndTime: "17:09", PlaySequence: 4 }),
          item({ RepresentationMovieCode: "10893", MovieNameKR: "라라랜드", ViewGradeNameKR: "12", ScreenID: 302401, ScreenNameKR: "1관" }),
          item({ FilmNameKR: "4D2D", ScreenID: 302499, ScreenNameKR: "샤롯데", StartTime: "00:20", EndTime: "02:00" }),
        ],
      },
      { day: 1, items: [item({ StartTime: "10:00", EndTime: "11:39", PlaySequence: 1 })] },
    ],
  });

  it("영화는 상영 횟수가 많은 순이고, 포스터는 https로 바꾼다", () => {
    expect(schedule.movies?.map((m) => m.title)).toEqual(["폭설", "라라랜드"]);
    expect(schedule.movies?.[0]).toMatchObject({
      id: "25121",
      rating: "15세 이상",
      titleEn: "White Blast",
      source: "lotte",
      posterUrl: "https://cf.lottecinema.co.kr/Media/MovieFile/MovieImg/202611/25121_503_1.jpg",
    });
    expect(schedule.movieId).toBe("25121");
  });

  it("관은 ScreenID로 우리 상영관과 잇고, 모르는 관은 시야 미리보기가 없다", () => {
    const hall2 = schedule.screens.find((s) => s.auditoriumId === "hall-2");
    expect(hall2).toMatchObject({ name: "2관", format: "2D 리클라이너", seatCount: 210 });
    const unknown = schedule.screens.find((s) => s.name === "샤롯데");
    expect(unknown).toMatchObject({ auditoriumId: null, format: "4D 리클라이너" });
  });

  it("상영마다 영화·회차·남은 좌석을 남기고, 자정 넘은 상영은 24시를 더한다", () => {
    const first = schedule.showings.find((s) => s.day === 0 && s.start === "13:30");
    expect(first).toMatchObject({ movieId: "25121", seq: "3", seatsLeft: 183, end: "15:09" });
    expect(schedule.showings.find((s) => s.start === "24:20")?.end).toBe("26:00");
    expect(schedule.showings.filter((s) => s.day === 1)).toHaveLength(1);
    expect(schedule.live).toEqual({ source: "롯데시네마", fetchedAt: "2026-11-19T05:00:00.000Z" });
  });
});

describe("parseBookedSeats", () => {
  it("팔린 좌석을 표시 번호로 돌려주고 2층은 뺀다", () => {
    const booked = parseBookedSeats({
      Seats: {
        Items: [
          { SeatNo: "1D13", SeatFloor: 1 },
          { SeatNo: "1D14", SeatFloor: 1 },
          { SeatNo: "2A01", SeatFloor: 2 },
        ],
      },
      BookingSeats: {
        Items: [
          { SeatNo: "1D13", ShowSeatRow: "D", ShowSeatColumn: 13 },
          { SeatNo: "2A01", ShowSeatRow: "A", ShowSeatColumn: 1 },
        ],
      },
    });
    expect(booked).toEqual(["D13"]);
  });
});

describe("ratingLabel", () => {
  it("등급 표시", () => {
    expect(ratingLabel("전체")).toBe("전체 관람가");
    expect(ratingLabel("12")).toBe("12세 이상");
    expect(ratingLabel("18")).toBe("청소년 관람불가");
    expect(ratingLabel(null)).toBe("");
  });
});

describe("LOTTE_LIVE", () => {
  it("모든 롯데시네마 극장의 상영관이 등록부에 있다", () => {
    const lotte = getTheaters().filter((t) => t.chain === "롯데시네마");
    expect(Object.keys(LOTTE_LIVE).sort()).toEqual(lotte.map((t) => t.id).sort());
    for (const theater of lotte) {
      const halls = Object.values(LOTTE_LIVE[theater.id].screens);
      expect(halls.sort()).toEqual([...theater.auditoriumIds].sort());
      for (const hall of halls) expect(getAuditorium(theater.id, hall)).toBeDefined();
    }
  });
});
