import type { Seat } from "@/lib/domain/types";
import { formatTicketDate, seatCode, ticketNumber, type ViewNumbers } from "@/lib/format";
import type { Movie } from "@/lib/showtimes/types";
import type { TicketInfo } from "./Ticket";

export function buildTicketInfo(input: {
  movie: Pick<Movie, "title" | "titleEn" | "year" | "posterUrl" | "ticketPosterUrl">;
  theaterName: string;
  screenName: string;
  seat: Pick<Seat, "rowLabel" | "number" | "rowIndex">;
  date: string | null;
  time: string | null;
  numbers: ViewNumbers | null;
}): TicketInfo {
  const { movie, date, time, numbers } = input;
  return {
    // 날짜를 모르면(주소로 바로 들어온 경우) 좌석만으로 번호를 만든다
    ticketNo: ticketNumber(date ?? "0000-00-00", input.seat).replace(/^000000/, ""),
    movieTitle: movie.title,
    movieTitleEn: [movie.titleEn, movie.year].filter(Boolean).join(" · "),
    posterUrl: movie.ticketPosterUrl || movie.posterUrl,
    posterFallbackUrl: movie.posterUrl,
    seatCode: seatCode(input.seat),
    theaterName: input.theaterName,
    screenName: input.screenName,
    dateLine: date ? formatTicketDate(date) : "",
    time: time ?? "",
    view: numbers ? `${numbers.fov} / ${numbers.up}` : "",
    distance: numbers?.dist ?? "",
  };
}
