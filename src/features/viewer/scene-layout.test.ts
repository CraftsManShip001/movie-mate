import { describe, expect, it } from "vitest";
import { getAuditorium } from "@/lib/data/registry";
import { findSeat, listSeats } from "@/lib/domain/geometry";
import {
  aisleCenters,
  chairLayout,
  chairStyle,
  exitSignPositions,
  floorHeightAt,
  frontPeople,
  hash01,
  riserBoxes,
  roomShape,
  sconcePositions,
  stepLightBoxes,
} from "./scene-layout";

const hall = getAuditorium("lotte-yeongdeungpo", "hall-1")!;

describe("scene-layout", () => {
  it("의자마다 왼쪽 팔걸이, 줄 끝마다 오른쪽 팔걸이가 하나 더 있다", () => {
    const seats = listSeats(hall);
    const { chairs, arms } = chairLayout(hall);
    expect(chairs).toHaveLength(seats.length);
    // 영등포 1관 B열: 4석 | 11석 | 4석 → 블록 3개
    const rowB = arms.filter((a) => Math.abs(a[2] - chairs[seats.findIndex((s) => s.id === "B1")][2]) < 1e-9);
    expect(rowB).toHaveLength(19 + 3);
  });

  it("앞사람은 고른 좌석보다 앞 열에만 앉고, 좌석마다 늘 같은 모습이다", () => {
    const seat = findSeat(hall, "H10")!;
    const people = frontPeople(hall, seat);
    const frontSeats = listSeats(hall).filter((s) => s.rowIndex < seat.rowIndex && s.kind !== "x");
    expect(people).toHaveLength(frontSeats.length);
    expect(frontPeople(hall, seat)).toEqual(people);
    expect(hash01("A1")).toBe(hash01("A1"));
    expect(hash01("A1")).not.toBe(hash01("A2"));
  });

  it("발밑 등은 단차 앞면, 벽등·비상구는 실내 안쪽에 있다", () => {
    const room = roomShape(hall);
    const steps = stepLightBoxes(hall);
    expect(steps.length).toBe(riserBoxes(hall).length * aisleCenters(hall).length);
    for (const { position } of [...sconcePositions(hall), ...exitSignPositions(hall)]) {
      expect(Math.abs(position[0])).toBeLessThan(room.width / 2);
      expect(position[1]).toBeLessThan(room.height);
      expect(position[2]).toBeGreaterThan(0);
      expect(position[2]).toBeLessThan(room.depth);
      expect(position[1]).toBeGreaterThan(floorHeightAt(hall, position[2]));
    }
  });

  it("리클라이너·프리미엄 관은 리클라이너 의자를 쓴다", () => {
    expect(chairStyle("recliner")).toBe("recliner");
    expect(chairStyle("premium")).toBe("recliner");
    expect(chairStyle("imax")).toBe("standard");
  });
});
