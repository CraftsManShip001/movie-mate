/**
 * 상영관 데이터 등록부.
 *
 * DB 없이 data/theaters/<theaterId>/ 아래 JSON을 정적으로 import 한다.
 * 정적 import라서 서버·클라이언트 어디서든 같은 데이터를 쓰고, Vercel 배포에도 파일 추적 문제가 없다.
 *
 * 새 극장·상영관을 추가하면:
 * 1. data/theaters/<theaterId>/theater.json 과 auditoriums/<auditoriumId>.json 을 만든다.
 * 2. 아래 import 와 THEATER_FILES / AUDITORIUM_FILES 에 한 줄씩 추가한다.
 * (등록을 빠뜨리면 registry.test.ts 가 실패한다.)
 */
import yongsanTheater from "@data/theaters/cgv-yongsan-ipark-mall/theater.json";
import yongsanSampleImax from "@data/theaters/cgv-yongsan-ipark-mall/auditoriums/sample-imax.json";
import yongsanSample4dx from "@data/theaters/cgv-yongsan-ipark-mall/auditoriums/sample-4dx.json";

import type { Auditorium, Theater } from "@/lib/domain/types";
import { validateAuditorium, validateTheater } from "@/lib/domain/validation";

const THEATER_FILES: unknown[] = [yongsanTheater];
const AUDITORIUM_FILES: unknown[] = [yongsanSampleImax, yongsanSample4dx];

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
const auditoriums: Auditorium[] = AUDITORIUM_FILES.map(loadAuditorium);

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
