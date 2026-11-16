/**
 * 테스트·에디터 기본값용 상영관. 숫자가 손으로 계산하기 쉬운 값이다.
 */
import type { Auditorium, Sourced } from "./types";

const m = (value: number): Sourced => ({ value, source: "measured" });

/**
 * 3열 × 5칸, 2번 칸 뒤에 세로 통로.
 * - 좌석 폭 500mm, 통로 1000mm → 행렬 폭 3.5m
 * - 첫 열 5m, 열 간격 1m, 단차 0.5m (앞 1열은 평지)
 * - 스크린 10m × 5m, 하단 1m
 */
export function makeTestAuditorium(overrides: Partial<Auditorium> = {}): Auditorium {
  return {
    schemaVersion: 1,
    id: "test-hall",
    theaterId: "test-theater",
    name: "테스트관",
    format: "standard",
    sample: true,
    estimated: false,
    room: { width: m(12000), depth: m(10000), height: m(8000) },
    screen: { width: m(10000), height: m(5000), bottomHeight: m(1000), aspectRatio: m(2) },
    layout: {
      firstRowDistance: m(5000),
      rowSpacing: m(1000),
      riserHeight: m(500),
      flatRowCount: m(1),
      seatWidth: m(500),
      seatHeight: m(450),
      seatBackHeight: m(1000),
      verticalAisles: [{ afterColumn: 1, width: m(1000) }],
      crossAisles: [],
    },
    rows: [
      { label: "A", cells: ".ssss" },
      { label: "B", cells: "sssss" },
      { label: "C", cells: "ws.ss" },
    ],
    ...overrides,
  };
}
