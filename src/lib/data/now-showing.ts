/**
 * 시간표에 붙일 영화를 고른다. TMDB 키가 있으면 한국 현재 상영작, 없으면 data/movies 의 샘플 영화.
 * 서버에서만 쓴다(next/cache).
 */
import { cacheLife } from "next/cache";
import { fetchNowPlayingMovie } from "@/lib/movies/tmdb";
import { withRuntime } from "@/lib/showtimes/schedule";
import type { Movie, Schedule } from "@/lib/showtimes/types";
import { getMovie, getSchedule } from "./showtimes";

async function nowPlayingMovie(fallbackRuntime: number): Promise<Movie | null> {
  "use cache";
  cacheLife("hours");
  return fetchNowPlayingMovie(fallbackRuntime);
}

export interface ShowtimesWithMovie {
  schedule: Schedule;
  movie: Movie;
}

export async function getShowtimesWithMovie(theaterId: string): Promise<ShowtimesWithMovie | undefined> {
  const schedule = getSchedule(theaterId);
  const fallback = schedule ? getMovie(schedule.movieId) : undefined;
  if (!schedule || !fallback) return undefined;
  const live = await nowPlayingMovie(fallback.runtimeMin ?? 120);
  if (!live) return { schedule, movie: fallback };
  return { schedule: live.runtimeMin ? withRuntime(schedule, live.runtimeMin) : schedule, movie: live };
}
