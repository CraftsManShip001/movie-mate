import { describe, expect, it } from "vitest";
import { lotteBookingUrl, megaboxBookingUrl } from "./booking-url";

describe("예매 주소", () => {
  it("메가박스는 상영 번호로 그 회차 좌석 선택을 연다", () => {
    expect(megaboxBookingUrl("2611261372013")).toBe("https://www.megabox.co.kr/booking?playSchdlNo=2611261372013");
  });

  it("롯데시네마는 영화·극장·날짜를 골라 둔다", () => {
    const url = new URL(
      lotteBookingUrl({ cinemaKey: "1|0001|1013", cinemaName: "가산디지털", movieCode: "25121", movieName: "폭설", date: "2026-11-26" }),
    );
    expect(url.origin + url.pathname).toBe("https://www.lottecinema.co.kr/NLCHS/Ticketing");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      movieCd: "25121",
      movieName: "폭설",
      screenCd: "1|0001|1013",
      screenName: "가산디지털",
      releaseDate: "2026-11-26",
    });
  });
});
