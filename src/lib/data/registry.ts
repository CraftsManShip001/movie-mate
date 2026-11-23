/**
 * 상영관 데이터 등록부.
 *
 * DB 없이 data/theaters/<theaterId>/ 아래 JSON을 정적으로 import 한다.
 * 정적 import라서 서버·클라이언트 어디서든 같은 데이터를 쓰고, Vercel 배포에도 파일 추적 문제가 없다.
 *
 * 새 극장·상영관을 추가하면:
 * 1. data/theaters/<theaterId>/theater.json 을 만든다.
 * 2. 상영관은 둘 중 하나로 넣는다.
 *    - 치수를 아는 상영관: auditoriums/<auditoriumId>.json (완성된 Auditorium)
 *    - 좌석표만 있는 상영관: seatmaps/<auditoriumId>.json (SeatMapInput). 불러올 때 estimateAuditorium 으로 크기를 추정한다.
 * 3. 아래 import 와 THEATER_FILES / AUDITORIUM_FILES / SEATMAP_FILES 에 한 줄씩 추가한다.
 *    (롯데시네마는 lotte.generated.ts, CGV·메가박스는 chains.generated.ts 생성 파일에 모여 있다.)
 * (등록을 빠뜨리면 registry.test.ts 가 실패한다.)
 */
import yongsanImaxSeatMap from "@data/theaters/cgv-yongsan-ipark-mall/seatmaps/imax.json";

import { CHAIN_SEATMAP_FILES, CHAIN_THEATER_FILES } from "./chains.generated";
import { LOTTE_SEATMAP_FILES, LOTTE_THEATER_FILES } from "./lotte.generated";
import { estimateAuditorium, type SeatMapInput } from "@/lib/domain/estimate";
import type { Auditorium, Theater } from "@/lib/domain/types";
import { validateAuditorium, validateTheater } from "@/lib/domain/validation";

const THEATER_FILES: unknown[] = [...CHAIN_THEATER_FILES, ...LOTTE_THEATER_FILES];
/** 치수를 아는(손으로 만든) 상영관. 지금은 없다. */
const AUDITORIUM_FILES: unknown[] = [];
/** 용산 IMAX관은 손으로 옮긴 좌석표(공개 스크린 크기 포함), 나머지는 생성 파일 */
const SEATMAP_FILES: unknown[] = [yongsanImaxSeatMap, ...CHAIN_SEATMAP_FILES, ...LOTTE_SEATMAP_FILES];

function loadTheater(json: unknown): Theater {
  const theater = json as Theater;
  const errors = validateTheater(theater);
  if (errors.length > 0) {
    throw new Error(`극장 데이터 오류 (${theater.id}):\n- ${errors.join("\n- ")}`);
  }
  return theater;
}

function loadAuditorium(json: unknown): Auditorium {
  const auditorium = json as Auditorium;
  const errors = validateAuditorium(auditorium);
  if (errors.length > 0) {
    throw new Error(`상영관 데이터 오류 (${auditorium.theaterId}/${auditorium.id}):\n- ${errors.join("\n- ")}`);
  }
  return auditorium;
}

const theaters: Theater[] = THEATER_FILES.map(loadTheater);
const auditoriums: Auditorium[] = [
  ...AUDITORIUM_FILES.map(loadAuditorium),
  ...SEATMAP_FILES.map((json) => loadAuditorium(estimateAuditorium(json as SeatMapInput))),
];

for (const theater of theaters) {
  for (const auditoriumId of theater.auditoriumIds) {
    if (!auditoriums.some((a) => a.theaterId === theater.id && a.id === auditoriumId)) {
      throw new Error(`${theater.id}의 상영관 ${auditoriumId}가 등록되지 않았습니다.`);
    }
  }
}

export function getTheaters(): Theater[] {
  return theaters;
}

/**
 * 자동차상영관(드라이브인)만 있는 극장. 차 안에서 야외 스크린을 보는 곳이라 3D 실내 시야로 보여 줄 수 없어,
 * 처음 화면·사이트맵에서 빼고 주소도 404로 보낸다(scripts/gen-route-ids.mjs 가 같은 기준을 쓴다).
 */
export function isDriveInOnly(theaterId: string): boolean {
  const halls = getAuditoriums(theaterId);
  return halls.length > 0 && halls.every((a) => a.name.includes("자동차상영관"));
}

/** 사용자에게 보여 주는 극장(자동차상영관만 있는 곳 제외) */
export function getListedTheaters(): Theater[] {
  return theaters.filter((theater) => !isDriveInOnly(theater.id));
}

export function getTheater(theaterId: string): Theater | undefined {
  return theaters.find((theater) => theater.id === theaterId);
}

export function getAuditoriums(theaterId: string): Auditorium[] {
  const theater = getTheater(theaterId);
  if (!theater) return [];
  return theater.auditoriumIds
    .map((id) => getAuditorium(theaterId, id))
    .filter((a): a is Auditorium => a !== undefined);
}

export function getAuditorium(theaterId: string, auditoriumId: string): Auditorium | undefined {
  return auditoriums.find((a) => a.theaterId === theaterId && a.id === auditoriumId);
}

export function getAllAuditoriums(): Auditorium[] {
  return auditoriums;
}
