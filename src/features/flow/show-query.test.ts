import { describe, expect, it } from "vitest";
import { readShowQuery, showQueryString } from "./show-query";

describe("show-query", () => {
  it("형식이 맞는 값만 읽는다", () => {
    expect(readShowQuery(new URLSearchParams("date=2026-11-16&time=13:40"))).toEqual({
      date: "2026-11-16",
      time: "13:40",
      seq: null,
    });
    expect(readShowQuery(new URLSearchParams("date=2026-11-16&time=13:40&seq=3"))).toMatchObject({ seq: "3" });
    expect(readShowQuery(new URLSearchParams("date=yesterday&time=1340&seq=x"))).toEqual({ date: null, time: null, seq: null });
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
