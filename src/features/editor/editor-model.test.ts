import { describe, expect, it } from "vitest";
import { makeTestAuditorium } from "@/lib/domain/fixtures";
import { validateAuditorium } from "@/lib/domain/validation";
import {
  createBlankAuditorium,
  nextCell,
  resizeGrid,
  rowLabelAt,
  setDimension,
  syncEstimatedFlag,
  toggleCell,
} from "./editor-model";

describe("editor-model", () => {
  it("열 이름", () => {
    expect([0, 25, 26, 27].map(rowLabelAt)).toEqual(["A", "Z", "AA", "AB"]);
  });

  it("칸 종류 순환", () => {
    expect(nextCell(".")).toBe("s");
    expect(nextCell("x")).toBe(".");
  });

  it("행렬 크기 변경은 기존 칸을 유지한다", () => {
    const hall = resizeGrid(makeTestAuditorium(), 4, 6);
    expect(hall.rows.map((r) => r.cells)).toEqual([".sssss", "ssssss", "ws.sss", "ssssss"]);
    expect(hall.rows[3].label).toBe("D");
    expect(resizeGrid(hall, 2, 3).rows.map((r) => r.cells)).toEqual([".ss", "sss"]);
  });

  it("칸 클릭", () => {
    expect(toggleCell(makeTestAuditorium(), 0, 0).rows[0].cells).toBe("sssss");
  });

  it("빈 상영관 기본값은 검증을 통과한다", () => {
    expect(validateAuditorium(createBlankAuditorium())).toEqual([]);
  });

  it("estimated 표시를 출처에 맞춘다", () => {
    const hall = setDimension(makeTestAuditorium(), "layout", "riserHeight", { value: 400, source: "estimated" });
    expect(syncEstimatedFlag(hall).estimated).toBe(true);
    expect(syncEstimatedFlag(makeTestAuditorium({ estimated: true })).estimated).toBe(false);
  });
});
