import type { Movie } from "@/lib/showtimes/types";

/** 실제 시간표를 주는 영화관 */
export type LiveSource = "롯데시네마" | "메가박스";

/** 한 상영(극장·상영관·날짜·회차)의 영화와 팔린 좌석 */
export interface LiveShow {
  source: LiveSource;
  movie: Movie;
  start: string;
  end: string;
  seatsLeft: number;
  /** 팔린 좌석 id("D13" 꼴). 받지 못하면 null */
  booked: string[] | null;
  /** 팔린 좌석을 받아 온 시각(ISO) */
  fetchedAt: string | null;
}
