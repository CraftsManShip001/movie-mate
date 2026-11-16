import { describe, expect, it } from "vitest";
import { notchCount, ticketOutlinePath } from "./ticket-shape";

describe("ticketOutlinePath", () => {
  it("250×520 티켓은 위아래 8개씩 홈이 있고 디자인 파일과 같은 위치다", () => {
    expect(notchCount(250)).toBe(8);
    const d = ticketOutlinePath(250, 520);
    expect(d.startsWith("M14,0 L28,0 A6,6 0 0 0 40,0 L54,0")).toBe(true);
    expect(d).toContain("L236,0 A14,14 0 0 0 250,14");
    expect(d).toContain("L250,506 A14,14 0 0 0 236,520");
    expect(d.endsWith("L0,14 A14,14 0 0 0 14,0 Z")).toBe(true);
    expect(d.match(/A6,6/g)).toHaveLength(16);
  });

  it("미니 티켓(84×175)은 홈 2개, 가운데 정렬", () => {
    expect(notchCount(84)).toBe(2);
    const d = ticketOutlinePath(84, 175);
    expect(d.startsWith("M14,0 L23,0 A6,6 0 0 0 35,0 L49,0 A6,6 0 0 0 61,0 L70,0")).toBe(true);
  });

  it("너무 좁으면 홈 없이 모서리만", () => {
    expect(notchCount(40)).toBe(0);
    expect(ticketOutlinePath(40, 80)).not.toContain("A6,6");
  });
});
