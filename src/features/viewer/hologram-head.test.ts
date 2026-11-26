import { describe, expect, it } from "vitest";
import { sculptHead } from "./hologram-head";

describe("홀로그램 머리", () => {
  it("코가 얼굴 앞(-z)으로 가장 많이 나온다", () => {
    const g = sculptHead();
    g.computeBoundingBox();
    const p = g.attributes.position;
    let front = { z: Infinity, x: 0, y: 0 };
    for (let i = 0; i < p.count; i++) {
      if (p.getZ(i) < front.z) front = { z: p.getZ(i), x: p.getX(i), y: p.getY(i) };
    }
    expect(Math.abs(front.x)).toBeLessThan(0.03);
    expect(front.y).toBeLessThan(0);
    expect(front.z).toBeLessThan(-0.5);
    const relief = g.attributes.relief.array;
    expect(Math.min(...relief)).toBe(-1); // 눈두덩·입 선
    expect(Math.max(...relief)).toBe(1); // 코
    // 뒤통수는 그대로 둥글다
    expect(g.boundingBox!.max.z).toBeCloseTo(0.44 * 1.06, 2);
  });
});
