import { describe, expect, it } from "vitest";
import { getAuditorium } from "@/lib/data/registry";
import { findSeat, listSeats } from "@/lib/domain/geometry";
import {
  aisleCenters,
  BALCONY_PARAPET_M,
  balconyParapets,
  chairGroups,
  chairLayout,
  chairStyle,
  exitSignPositions,
  floorHeightAt,
  frontPeople,
  hash01,
  PRIVATE_BOX,
  privateBoxRooms,
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

  it("넓은 좌석은 의자를 칸 수만큼 넓히고, 차지한 폭의 가운데에 놓는다", () => {
    // 메가박스 해운대(장산) 1관: B열은 일반 리클라이너, E열은 2칸짜리 넓은 리클라이너 7석
    const wideHall = getAuditorium("megabox-haeundae-jangsan", "hall-1")!;
    const seats = listSeats(wideHall);
    const { chairs, widths } = chairLayout(wideHall);
    const at = (id: string) => seats.findIndex((s) => s.id === id);
    expect(widths[at("B1")]).toBe(1);
    expect(widths[at("E2")]).toBe(2);
    // E열 7석은 B열과 같은 폭에 걸쳐 가운데에 놓인다 (왼쪽으로 쏠리지 않는다)
    const rowE = seats.filter((s) => s.rowLabel === "E").map((s) => chairs[at(s.id)][0]);
    expect(rowE[0] + rowE[rowE.length - 1]).toBeCloseTo(0, 1);
    expect(rowE[1] - rowE[0]).toBeCloseTo(1.6, 2);
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

describe("위층 구역 (PRIVATE BOX · SWEETBOX)", () => {
  const build = async () => {
    const { estimateAuditorium } = await import("@/lib/domain/estimate");
    return estimateAuditorium({
      schemaVersion: 1,
      id: "t",
      theaterId: "t",
      name: "t",
      format: "standard",
      seatMapSource: "test",
      aspectRatio: 1.9,
      rows: [
        { label: "A", cells: "ssss.ssss" },
        { label: "B", cells: "ssss.ssss" },
        { label: "C", cells: ".s.....s.", spans: [[0.5, 1.5], [6.5, 1.5]], zone: "PRIVATE BOX 7층", zoneKind: "privateBox", boxes: [[0.25, 2], [6.25, 2]] },
        { label: "D", cells: "ss.....ss", spans: [[0, 1], [1, 1], [7, 1], [8, 1]], zone: "SWEETBOX 8층", zoneKind: "sweetbox" },
      ],
      crossAisleAfterRows: [1, 2],
    });
  };

  it("구역 열은 본 객석 맨 뒷열보다 층마다 한 번씩 더 높은 발코니에 있다", async () => {
    const { rowFloorY } = await import("@/lib/domain/geometry");
    const hall = await build();
    const rise = hall.layout.zoneRise!.value / 1000;
    expect(rowFloorY(hall, 2)).toBeCloseTo(rowFloorY(hall, 1) + rise);
    expect(rowFloorY(hall, 3)).toBeCloseTo(rowFloorY(hall, 1) + 2 * rise);
    // 천장은 가장 높은 구역 위로도 여유가 있다
    expect(hall.room.height.value / 1000).toBeGreaterThan(rowFloorY(hall, 3) + 2.5);
  });

  it("PRIVATE BOX는 방마다 칸막이 둘·뒷벽·천장·창 아래 벽과 유리창 하나를 갖는다", async () => {
    const { rowCenterZ, rowFloorY } = await import("@/lib/domain/geometry");
    const hall = await build();
    const rooms = privateBoxRooms(hall);
    expect(rooms.glass).toHaveLength(2);
    expect(rooms.solid).toHaveLength(2 * 5);
    expect(rooms.lamps).toHaveLength(2);
    // 유리창은 좌석보다 스크린 쪽, 창 아래 벽 위에 있다
    const [glass] = rooms.glass;
    expect(glass.position[2]).toBeCloseTo(rowCenterZ(hall, 2) - PRIVATE_BOX.front);
    expect(glass.position[1] - glass.scale[1] / 2).toBeCloseTo(rowFloorY(hall, 2) + PRIVATE_BOX.sill);
  });

  it("SWEETBOX 발코니 앞에는 난간이 하나 있다", async () => {
    const { rowFloorY } = await import("@/lib/domain/geometry");
    const hall = await build();
    const parapets = balconyParapets(hall);
    expect(parapets).toHaveLength(1);
    expect(parapets[0].position[1]).toBeCloseTo(rowFloorY(hall, 3) + BALCONY_PARAPET_M / 2);
  });

  it("구역 의자는 리클라이너이고, SWEETBOX 한 쌍 사이에는 팔걸이가 없다", async () => {
    const hall = await build();
    const groups = chairGroups(hall);
    const recliner = groups.find((g) => g.style === "recliner")!;
    // 박스 2자리 + 소파 4자리
    expect(recliner.chairs).toHaveLength(6);
    // 박스 의자: 양쪽 팔걸이 2개씩(떨어져 있음) = 4, 소파 두 쌍: 바깥 팔걸이 2개씩 = 4
    expect(recliner.arms).toHaveLength(8);
    expect(groups.find((g) => g.style === "standard")!.chairs).toHaveLength(16);
  });
});

describe("의자가 아닌 좌석 (침대·빈백·커플석)", () => {
  const build = async () => {
    const { estimateAuditorium } = await import("@/lib/domain/estimate");
    return estimateAuditorium({
      schemaVersion: 1,
      id: "t",
      theaterId: "t",
      name: "t",
      format: "standard",
      seatMapSource: "test",
      aspectRatio: 1.9,
      rows: [
        { label: "A", cells: "ssss", furniture: [[0, 2, "beanbag"]] },
        { label: "B", cells: "ssss", furniture: [[0, 4, "couple"]] },
        { label: "C", cells: "ssss", furniture: [[0, 4, "bed"]] },
      ],
    });
  };

  it("침대·빈백에 앉으면 눈이 의자보다 낮고, 침대는 머리 쪽(뒤)에 있다", async () => {
    const { eyePosition, findSeat, seatFloorPosition } = await import("@/lib/domain/geometry");
    const hall = await build();
    const chair = eyePosition(hall, findSeat(hall, "A3")!, 166);
    const beanbag = eyePosition(hall, findSeat(hall, "A1")!, 166);
    const bed = eyePosition(hall, findSeat(hall, "C1")!, 166);
    const floorA = seatFloorPosition(hall, findSeat(hall, "A1")!).y;
    expect(beanbag.y - floorA).toBeLessThan(chair.y - floorA);
    expect(bed.z).toBeGreaterThan(seatFloorPosition(hall, findSeat(hall, "C1")!).z);
  });

  it("커플석은 두 자리마다 가운데 팔걸이가 없고, 빈백은 팔걸이가 없다", async () => {
    const hall = await build();
    const groups = chairGroups(hall);
    expect(groups.map((g) => g.style).sort()).toEqual(["beanbag", "bed", "recliner", "standard"]);
    // 커플석 4자리 = 소파 두 개(붙어 있음): 바깥 2 + 소파 사이 1 = 3
    expect(groups.find((g) => g.style === "recliner")!.arms).toHaveLength(3);
    expect(groups.find((g) => g.style === "beanbag")!.arms).toHaveLength(0);
    // 침대 4개 = 2인 침대 두 쌍: 칸막이는 바깥 2 + 쌍 사이 1
    expect(groups.find((g) => g.style === "bed")!.arms).toHaveLength(3);
  });
});
