import { describe, expect, it } from "vitest";
import {
  formatMonthDay,
  formatTicketDate,
  formatViewNumbers,
  nowInSeoul,
  seatCode,
  seatName,
  ticketNumber,
  withSubject,
  withTopic,
} from "./format";

describe("날짜 문구", () => {
  it("화면과 티켓 형식", () => {
    expect(formatMonthDay("2026-11-16")).toBe("11월 16일");
    expect(formatTicketDate("2026-11-16")).toBe("2026.11.16 MON");
  });

  it("nowInSeoul은 서울 시각 기준", () => {
    // UTC 15:30 = 서울 다음 날 00:30
    expect(nowInSeoul(new Date("2026-11-16T15:30:00Z"))).toEqual({ todayIso: "2026-11-17", minutes: 30 });
    expect(nowInSeoul(new Date("2026-11-16T04:40:00Z"))).toEqual({ todayIso: "2026-11-16", minutes: 13 * 60 + 40 });
  });
});

describe("좌석 문구", () => {
  it("J열 14번 / J14", () => {
    const seat = { rowLabel: "J", number: 14 };
    expect(seatName(seat)).toBe("J열 14번");
    expect(seatCode(seat)).toBe("J14");
  });

  it("티켓 번호는 날짜와 좌석으로 정해진다", () => {
    expect(ticketNumber("2026-11-16", { rowIndex: 9, number: 14 })).toBe("2611161014");
    expect(ticketNumber("2026-01-05", { rowIndex: 0, number: 3 })).toBe("2601050103");
  });
});

describe("조사", () => {
  it("받침에 따라 이/가, 은/는", () => {
    expect(withSubject("롯데시네마")).toBe("롯데시네마가");
    expect(withSubject("메가박스")).toBe("메가박스가");
    expect(withSubject("극장")).toBe("극장이");
    expect(withSubject("CGV")).toBe("CGV가");
    expect(withTopic("내일")).toBe("내일은");
    expect(withTopic("11월 18일")).toBe("11월 18일은");
    expect(withTopic("모레")).toBe("모레는");
  });
});

describe("formatViewNumbers", () => {
  it("각도는 반올림, 거리는 소수 한 자리", () => {
    expect(formatViewNumbers({ horizontalFovDeg: 74.6, neckElevationDeg: 19.5, distanceToScreenM: 15.46 })).toEqual({
      fov: "75°",
      up: "20°",
      upLabel: "올려보기",
      dist: "15.5m",
    });
  });

  it("고개를 숙여 보면 내려보기로 크기만 보여 준다", () => {
    const n = formatViewNumbers({ horizontalFovDeg: 50, neckElevationDeg: -13.2, distanceToScreenM: 16 });
    expect(n.up).toBe("13°");
    expect(n.upLabel).toBe("내려보기");
  });
});
