import { getAuditorium, getTheater } from "./registry";
import { getShowtimesWithMovie } from "./now-showing";
import { screenNameForAuditorium } from "./showtimes";
import { findSeat } from "@/lib/domain/geometry";

/** 4·5번 화면에서 쓰는 극장·관·좌석·영화 묶음. 하나라도 없으면 undefined. */
export async function getSeatContext(theaterId: string, auditoriumId: string, seatId: string) {
  const theater = getTheater(theaterId);
  const auditorium = getAuditorium(theaterId, auditoriumId);
  const seat = auditorium ? findSeat(auditorium, seatId) : undefined;
  const showtimes = theater ? await getShowtimesWithMovie(theater.id) : undefined;
  if (!theater || !auditorium || !seat || !showtimes) return undefined;
  return {
    theater,
    theaterName: `${theater.chain} ${theater.branch}`,
    auditorium,
    screenName: screenNameForAuditorium(theater.id, auditorium.id) ?? auditorium.name,
    seat,
    movie: showtimes.movie,
  };
}
