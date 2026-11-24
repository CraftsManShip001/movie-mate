/**
 * 랜딩의 "지금 많이 보는 영화". 서버에서만 쓴다.
 *
 * 공식 박스오피스(KOBIS)는 API 키가 있어야 해서, 지금은 이미 받아 오는 실제 시간표로 순위를 낸다.
 * 큰 극장 두 곳(메가박스 코엑스·롯데시네마 월드타워)의 오늘 상영 횟수를 합쳐 많은 순으로 줄 세운다.
 * 관객 수가 아니라 상영 횟수라는 점은 화면 아래 안내에 적는다.
 * 시간표 자체가 10분 동안 캐시되므로(lotte.ts·megabox.ts) 여기서 영화관에 따로 묻지 않는다.
 */
import { titleKey } from "@/lib/showtimes/title";
import type { Movie, Schedule } from "@/lib/showtimes/types";
import { getLiveSchedule } from "./index";

/** 순위를 셀 극장. 첫 극장의 영화 정보(포스터)를 먼저 쓴다. */
export const RANKING_THEATERS = ["megabox-koekseu", "lotte-world-tower"] as const;

export interface RankedMovie {
  title: string;
  rating: string;
  runtimeMin?: number;
  posterUrl: string;
  /** 누르면 갈 곳: 이 영화를 가장 많이 상영하는 극장의 시간표 */
  theaterId: string;
  movieId: string;
  showings: number;
}

/** "[F] 아사코", "[무대인사] 눈 내리는 여름" 같은 특별 상영 표시가 붙은 제목 */
const TAGGED = /^\s*\[/;

/** 시간표 몇 개에서 오늘 상영 횟수로 순위를 낸다. 특별 상영(제목이 [로 시작)은 뺀다. */
export function rankMovies(schedules: Schedule[], limit = 5): RankedMovie[] {
  const byKey = new Map<string, { movie: Movie; theaterId: string; best: number; total: number }>();
  for (const schedule of schedules) {
    const movies = new Map((schedule.movies ?? []).map((m) => [m.id, m]));
    const counts = new Map<string, number>();
    for (const showing of schedule.showings) {
      if (showing.day !== 0 || !showing.movieId) continue;
      counts.set(showing.movieId, (counts.get(showing.movieId) ?? 0) + 1);
    }
    for (const [movieId, count] of counts) {
      const movie = movies.get(movieId);
      if (!movie || TAGGED.test(movie.title)) continue;
      const key = titleKey(movie.title);
      const entry = byKey.get(key);
      if (!entry) {
        byKey.set(key, { movie, theaterId: schedule.theaterId, best: count, total: count });
        continue;
      }
      entry.total += count;
      // 연결할 극장은 더 많이 트는 곳으로 바꾸되, 포스터·상영 시간은 먼저 받은 쪽(메가박스, 정보가 더 많다)을 남긴다
      if (count > entry.best) {
        const first = entry.movie;
        entry.theaterId = schedule.theaterId;
        entry.best = count;
        entry.movie = {
          ...movie,
          posterUrl: first.posterUrl,
          ticketPosterUrl: first.ticketPosterUrl ?? movie.ticketPosterUrl,
          runtimeMin: first.runtimeMin ?? movie.runtimeMin,
        };
      }
    }
  }
  return [...byKey.values()]
    .sort((a, b) => b.total - a.total || a.movie.title.localeCompare(b.movie.title, "ko"))
    .slice(0, limit)
    .map(({ movie, theaterId, total }) => ({
      title: movie.title,
      rating: movie.rating,
      runtimeMin: movie.runtimeMin,
      posterUrl: movie.ticketPosterUrl ?? movie.posterUrl,
      theaterId,
      movieId: movie.id,
      showings: total,
    }));
}

/** 오늘(서울) 기준 순위. 시간표를 하나도 받지 못하면 빈 배열. */
export async function getRanking(todayIso: string): Promise<RankedMovie[]> {
  const schedules = await Promise.all(RANKING_THEATERS.map((id) => getLiveSchedule(id, todayIso)));
  return rankMovies(schedules.filter((s): s is Schedule => s !== null));
}
