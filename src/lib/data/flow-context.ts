import { getAuditorium, getTheater } from "./registry";
import { getShowtimesWithMovie } from "./now-showing";
import { screenNameForAuditorium } from "./showtimes";
import { findSeat } from "@/lib/domain/geometry";
import { getLotteShow } from "@/lib/live/lotte";
import { readShowQuery } from "@/features/flow/show-query";

type SearchParams = Record<string, string | string[] | undefined>;

/**
 * 4·5번 화면에서 쓰는 극장·관·좌석·영화 묶음. 하나라도 없으면 undefined.
 * 주소에 실제 시간표의 회차(date·seq)가 있으면 그 회차의 영화를 쓴다.
 */
export async function getSeatContext(theaterId: string, auditoriumId: string, seatId: string, searchParams: SearchParams = {}) {
  const theater = getTheater(theaterId);
  const auditorium = getAuditorium(theaterId, auditoriumId);
  const seat = auditorium ? findSeat(auditorium, seatId) : undefined;
  const showtimes = theater ? await getShowtimesWithMovie(theater.id) : undefined;
  if (!theater || !auditorium || !seat || !showtimes) return undefined;
  const show = readShowQuery({ get: (name) => (typeof searchParams[name] === "string" ? searchParams[name] : null) });
  const live =
    show.date && show.seq != null
      ? await getLotteShow(theater.id, auditorium.id, show.date, show.seq, { withSeats: false })
      : null;
  return {
    theater,
    theaterName: `${theater.chain} ${theater.branch}`,
    auditorium,
    screenName: screenNameForAuditorium(theater.id, auditorium.id) ?? auditorium.name,
    seat,
    movie: live?.movie ?? showtimes.movie,
  };
}
