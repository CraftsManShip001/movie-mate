import { beforeEach, describe, expect, it } from "vitest";
import { allowRequest, isSameSite, resetRequestWindows } from "./guard";

describe("isSameSite", () => {
  it("브라우저의 같은 출처 요청만 받는다", () => {
    expect(isSameSite({ host: "a.kr", secFetchSite: "same-origin", origin: null, referer: null })).toBe(true);
    expect(isSameSite({ host: "a.kr", secFetchSite: "cross-site", origin: "https://evil.com", referer: null })).toBe(false);
    expect(isSameSite({ host: "a.kr", secFetchSite: "none", origin: null, referer: null })).toBe(false);
  });

  it("Sec-Fetch-Site 가 없으면 Origin/Referer 호스트를 본다", () => {
    expect(isSameSite({ host: "a.kr", secFetchSite: null, origin: null, referer: "https://a.kr/theaters/x" })).toBe(true);
    expect(isSameSite({ host: "a.kr", secFetchSite: null, origin: "https://b.kr", referer: null })).toBe(false);
    expect(isSameSite({ host: "a.kr", secFetchSite: null, origin: null, referer: null })).toBe(false);
  });
});

describe("allowRequest", () => {
  beforeEach(() => resetRequestWindows());

  it("1분에 정한 횟수까지만 받고, 창이 지나면 다시 받는다", () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i += 1) expect(allowRequest("1.1.1.1", t + i, 3).ok).toBe(true);
    const blocked = allowRequest("1.1.1.1", t + 10, 3);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterSeconds).toBe(60);
    expect(allowRequest("2.2.2.2", t + 10, 3).ok).toBe(true);
    expect(allowRequest("1.1.1.1", t + 60_000, 3).ok).toBe(true);
  });
});
