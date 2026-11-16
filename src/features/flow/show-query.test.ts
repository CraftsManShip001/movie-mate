import { describe, expect, it } from "vitest";
import { readShowQuery, showQueryString } from "./show-query";

describe("show-query", () => {
  it("형식이 맞는 값만 읽는다", () => {
    expect(readShowQuery(new URLSearchParams("date=2026-11-16&time=13:40"))).toEqual({ date: "2026-11-16", time: "13:40" });
    expect(readShowQuery(new URLSearchParams("date=yesterday&time=1340"))).toEqual({ date: null, time: null });
  });

  it("쿼리 문자열을 만든다", () => {
    expect(showQueryString({ date: "2026-11-16", time: "13:40" })).toBe("?date=2026-11-16&time=13:40");
    expect(showQueryString({ date: null, time: null })).toBe("");
    expect(showQueryString({ date: null, time: null }, { seat: "J14" })).toBe("?seat=J14");
  });
});
