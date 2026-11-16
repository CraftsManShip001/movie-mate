import { describe, expect, it } from "vitest";
import { buildTicketInfo } from "./ticket-info";

const base = {
  movie: { title: "밤의 궤도", titleEn: "THE NIGHT ORBIT", year: 2026, posterUrl: "/p.svg" },
  theaterName: "CGV 용산아이파크몰",
  screenName: "IMAX관",
  seat: { rowLabel: "J", number: 14, rowIndex: 9 },
  numbers: { fov: "75°", up: "20°", dist: "15.5m" },
};

describe("buildTicketInfo", () => {
  it("티켓 앞뒤에 들어갈 문구를 만든다", () => {
    const info = buildTicketInfo({ ...base, date: "2026-11-16", time: "13:40" });
    expect(info).toMatchObject({
      ticketNo: "2611161014",
      movieTitleEn: "THE NIGHT ORBIT · 2026",
      seatCode: "J14",
      dateLine: "2026.11.16 MON",
      time: "13:40",
      bandDate: "2026.11.16 (월) 13:40",
      view: "75° / 20°",
      distance: "15.5m",
    });
  });

  it("상영 정보 없이 들어와도 깨지지 않는다", () => {
    const info = buildTicketInfo({ ...base, date: null, time: null, numbers: null });
    expect(info.ticketNo).toBe("1014");
    expect(info.dateLine).toBe("");
    expect(info.bandDate).toBe("");
    expect(info.view).toBe("");
  });
});
