import { describe, expect, it } from "vitest";
import { withinWeek } from "./index";

describe("withinWeek", () => {
  it("어제(심야 회차)부터 6일 뒤까지만 영화관에 묻는다", () => {
    expect(withinWeek("2026-11-22", "2026-11-23")).toBe(true);
    expect(withinWeek("2026-11-29", "2026-11-23")).toBe(true);
    expect(withinWeek("2026-11-30", "2026-11-23")).toBe(false);
    expect(withinWeek("2026-11-21", "2026-11-23")).toBe(false);
    expect(withinWeek("2099-01-01", "2026-11-23")).toBe(false);
    expect(withinWeek("bad", "2026-11-23")).toBe(false);
  });
});
