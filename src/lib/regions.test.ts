import { describe, expect, it } from "vitest";
import { regionOf } from "./regions";

describe("regionOf", () => {
  it("주소의 시·도로 지역을 고른다", () => {
    expect(regionOf("서울특별시 용산구 한강대로23길 55")).toBe("서울");
    expect(regionOf("경기도 광명시 일직로 17")).toBe("경기·인천");
    expect(regionOf("인천광역시 남동구 예술로 198")).toBe("경기·인천");
    expect(regionOf("충청남도 천안시 서북구 불당21로 67")).toBe("충청·대전");
    expect(regionOf("전북특별자치도 전주시 완산구 백제대로 10")).toBe("전라·광주");
    expect(regionOf("경상북도 포항시 남구 중앙로 300")).toBe("경북·대구");
    expect(regionOf("경상남도 창원시 성산구 중앙대로 124")).toBe("부산·울산·경남");
    expect(regionOf("강원특별자치도 춘천시 중앙로 2")).toBe("강원");
    expect(regionOf("제주특별자치도 제주시 과원로 128")).toBe("제주");
  });

  it("시·도를 알 수 없으면 null", () => {
    expect(regionOf("롯데아울렛 광교")).toBeNull();
  });
});
