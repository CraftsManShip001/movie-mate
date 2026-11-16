import { getAuditorium, getTheater } from "./registry";
import { getMovie, getSchedule, screenNameForAuditorium } from "./showtimes";
import { findSeat } from "@/lib/domain/geometry";

/** 4·5번 화면에서 쓰는 극장·관·좌석·영화 묶음. 하나라도 없으면 undefined. */
export function getSeatContext(theaterId: string, auditoriumId: string, seatId: string) {
  const theater = getTheater(theaterId);
  const auditorium = getAuditorium(theaterId, auditoriumId);
  const seat = auditorium ? findSeat(auditorium, seatId) : undefined;
  const schedule = theater ? getSchedule(theater.id) : undefined;
  const movie = schedule ? getMovie(schedule.movieId) : undefined;
  if (!theater || !auditorium || !seat || !movie) return undefined;
  return {
    theater,
    theaterName: `${theater.chain} ${theater.branch}`,
    auditorium,
    screenName: screenNameForAuditorium(theater.id, auditorium.id) ?? auditorium.name,
    seat,
    movie,
  };
}
