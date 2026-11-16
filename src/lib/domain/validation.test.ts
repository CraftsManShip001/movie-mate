import { describe, expect, it } from "vitest";
import { makeTestAuditorium } from "./fixtures";
import { listSourcedValues, validateAuditorium } from "./validation";

describe("validateAuditorium", () => {
  it("올바른 데이터는 오류가 없다", () => {
    expect(validateAuditorium(makeTestAuditorium())).toEqual([]);
  });

  it("열마다 칸 수가 다르면 오류", () => {
    const hall = makeTestAuditorium({ rows: [{ label: "A", cells: "sss" }, { label: "B", cells: "ss" }] });
    expect(validateAuditorium(hall).join()).toContain("칸 수");
  });

  it("허용하지 않는 글자, 중복 열 이름", () => {
    const hall = makeTestAuditorium({ rows: [{ label: "A", cells: "sSs" }, { label: "A", cells: "sss" }] });
    const errors = validateAuditorium(hall).join("\n");
    expect(errors).toContain("이외 글자");
    expect(errors).toContain("중복");
  });

  it("스크린 비율이 폭/높이와 맞지 않으면 오류", () => {
    const base = makeTestAuditorium();
    const hall = makeTestAuditorium({
      screen: { ...base.screen, aspectRatio: { value: 2.39, source: "measured" } },
    });
    expect(validateAuditorium(hall).join()).toContain("aspectRatio");
  });

  it("estimated 값이 있는데 estimated 표시가 없으면 오류", () => {
    const base = makeTestAuditorium();
    const hall = makeTestAuditorium({
      layout: { ...base.layout, riserHeight: { value: 450, source: "estimated" } },
    });
    expect(validateAuditorium(hall).join()).toContain("estimated는 true");
    expect(validateAuditorium({ ...hall, estimated: true })).toEqual([]);
  });

  it("통로 위치가 범위 밖이면 오류", () => {
    const base = makeTestAuditorium();
    const hall = makeTestAuditorium({
      layout: { ...base.layout, verticalAisles: [{ afterColumn: 4, width: { value: 1000, source: "measured" } }] },
    });
    expect(validateAuditorium(hall).join()).toContain("afterColumn");
  });
});

describe("listSourcedValues", () => {
  it("모든 치수를 경로와 함께 꺼낸다", () => {
    const paths = listSourcedValues(makeTestAuditorium()).map((e) => e.path);
    expect(paths).toContain("screen.bottomHeight");
    expect(paths).toContain("layout.verticalAisles[0].width");
    expect(paths).toContain("room.depth");
  });
});
