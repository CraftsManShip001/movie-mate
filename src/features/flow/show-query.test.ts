import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readShowQuery, showQueryString } from "./show-query";

describe("show-query", () => {
  // 날짜는 "어제~6일 뒤" 안에서만 받으므로 오늘을 2026-11-16(서울)로 고정한다
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-16T03:00:00Z"));
  });
  afterEach(() => vi.useRealTimers());

  it("형식이 맞는 값만 읽는다", () => {
    expect(readShowQuery(new URLSearchParams("date=2026-11-16&time=13:40"))).toEqual({
      date: "2026-11-16",
      time: "13:40",
      seq: null,
    });
    expect(readShowQuery(new URLSearchParams("date=2026-11-16&time=13:40&seq=3"))).toMatchObject({ seq: "3" });
    expect(readShowQuery(new URLSearchParams("date=yesterday&time=1340&seq=x"))).toEqual({ date: null, time: null, seq: null });
    // 심야 회차(25:10)는 받고, 없는 시각·없는 날짜·범위 밖 날짜는 버린다
    expect(readShowQuery(new URLSearchParams("date=2026-11-17&time=25:10")).time).toBe("25:10");
    expect(readShowQuery(new URLSearchParams("date=2026-02-30&time=99:99"))).toMatchObject({ date: null, time: null });
    expect(readShowQuery(new URLSearchParams("date=2099-01-01")).date).toBeNull();
    expect(readShowQuery(new URLSearchParams("date=2026-11-15")).date).toBe("2026-11-15");
  });

  it("쿼리 문자열을 만든다", () => {
    expect(showQueryString({ date: "2026-11-16", time: "13:40" })).toBe("?date=2026-11-16&time=13:40");
    expect(showQueryString({ date: "2026-11-16", time: "13:40", seq: "3" }, { seat: "J14" })).toBe(
      "?date=2026-11-16&time=13:40&seq=3&seat=J14",
    );
    expect(showQueryString({ date: null, time: null })).toBe("");
    expect(showQueryString({ date: null, time: null }, { seat: "J14" })).toBe("?seat=J14");
  });
});
