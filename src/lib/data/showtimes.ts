/**
 * 영화·상영 시간표 등록부. registry.ts 와 같이 JSON을 정적으로 import 한다.
 *
 * 새 시간표를 추가하면 data/showtimes/<theaterId>.json 을 만들고 아래 SCHEDULE_FILES 에 한 줄 추가한다.
 * (등록을 빠뜨리면 showtimes.test.ts 가 실패한다.)
 */
import nightOrbit from "@data/movies/the-night-orbit.json";
import yongsanSchedule from "@data/showtimes/cgv-yongsan-ipark-mall.json";

import type { Movie, Schedule } from "@/lib/showtimes/types";
import { LOTTE_SCHEDULE_FILES } from "./lotte.generated";

const MOVIE_FILES = [nightOrbit] as Movie[];
const SCHEDULE_FILES = [yongsanSchedule, ...LOTTE_SCHEDULE_FILES] as Schedule[];

export function getMovies(): Movie[] {
  return MOVIE_FILES;
}

export function getMovie(movieId: string): Movie | undefined {
  return MOVIE_FILES.find((m) => m.id === movieId);
}

export function getSchedules(): Schedule[] {
  return SCHEDULE_FILES;
}

export function getSchedule(theaterId: string): Schedule | undefined {
  return SCHEDULE_FILES.find((s) => s.theaterId === theaterId);
}

/** 상영관(시야 데이터) id로 시간표의 관 이름을 찾는다. 없으면 undefined. */
export function screenNameForAuditorium(theaterId: string, auditoriumId: string): string | undefined {
  return getSchedule(theaterId)?.screens.find((s) => s.auditoriumId === auditoriumId)?.name;
}
