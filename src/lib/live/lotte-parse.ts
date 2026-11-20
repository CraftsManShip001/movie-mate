/**
 * 롯데시네마 예매 화면이 쓰는 내부 API 응답을 우리 시간표 모양으로 바꾼다 (순수 함수).
 * 받아 오는 쪽은 lotte.ts. 공식 API가 아니라 필드가 바뀔 수 있어, 모르는 값은 버리고 넘어간다.
 */
import { toMinutes, fromMinutes } from "@/lib/showtimes/schedule";
import type { Movie, Schedule, ScreenInfo, Showing } from "@/lib/showtimes/types";

/** GetPlaySequence 의 PlaySeqs.Items 한 줄 중 쓰는 필드 */
export interface LottePlayItem {
  RepresentationMovieCode: string;
  MovieNameKR: string;
  MovieNameUS?: string | null;
  ViewGradeNameKR?: string | null;
  PosterURL?: string | null;
  ScreenID: number;
  ScreenNameKR: string;
  ScreenDivisionNameKR?: string | null;
  FilmNameKR?: string | null;
  TranslationDivisionNameKR?: string | null;
  StartTime: string;
  EndTime: string;
  /** 남은 좌석 수 */
  BookingSeatCount: number;
  TotalSeatCount: number;
  PlaySequence: number;
}

/** 지점의 극장 키와 상영관 번호 → 상영관 id (lotte.generated.ts 의 LOTTE_LIVE) */
export interface LotteMapping {
  cinema: string;
  screens: Record<string, string>;
}

export interface LotteDay {
  /** 오늘로부터 며칠 뒤 */
  day: number;
  items: LottePlayItem[];
}

const TIME = /^(\d{1,2}):(\d{2})$/;

/** 이른 새벽(05시 전) 시작은 그날 밤 늦은 상영이라 24시를 더한다 */
function startMinutes(time: string): number | null {
  const m = TIME.exec(time);
  if (!m) return null;
  const minutes = Number(m[1]) * 60 + Number(m[2]);
  return minutes < 5 * 60 ? minutes + 24 * 60 : minutes;
}

function endMinutes(time: string, start: number): number | null {
  const m = TIME.exec(time);
  if (!m) return null;
  let minutes = Number(m[1]) * 60 + Number(m[2]);
  while (minutes <= start) minutes += 24 * 60;
  return minutes;
}

/** "15" → "15세 이상", "전체" → "전체 관람가" */
export function ratingLabel(grade: string | null | undefined): string {
  const g = (grade ?? "").trim();
  if (g === "") return "";
  if (g === "전체") return "전체 관람가";
  if (g === "18" || g === "19" || g.startsWith("청")) return "청소년 관람불가";
  if (/^\d+$/.test(g)) return `${g}세 이상`;
  return g;
}

/** "4D2D" → "4D". 그 밖에는 그대로 */
function filmLabel(film: string | null | undefined): string {
  const f = (film ?? "").trim();
  if (f === "") return "2D";
  if (f.startsWith("4D")) return "4D";
  return f;
}

/** 포스터는 http 주소로 오므로 https로 바꾼다(같은 서버가 https도 받는다) */
function posterUrl(url: string | null | undefined): string {
  if (!url) return "";
  return url.replace(/^http:\/\//, "https://").replace(/([^:])\/\/+/g, "$1/");
}

/**
 * 티켓 앞면용 큰 포스터. 시간표 포스터(`…_503_1.jpg`)는 200×288이라
 * 같은 그림의 600×860 판(`…_504_1.jpg`)을 쓴다. 이름 규칙이 다르면 없다.
 */
export function lotteTicketPosterUrl(url: string): string | undefined {
  return /_503_1\.jpg$/.test(url) ? url.replace(/_503_1\.jpg$/, "_504_1.jpg") : undefined;
}

/**
 * 7일치 시간표를 하나의 Schedule로 묶는다.
 * - 관은 우리 상영관(시야 데이터)과 ScreenID로 잇고, 같은 관이라도 형식(2D·4D·자막·더빙)이 다르면 줄을 나눈다.
 * - 영화는 7일 동안 상영 횟수가 많은 순.
 */
export function buildLotteSchedule(input: {
  theaterId: string;
  mapping: LotteMapping;
  days: LotteDay[];
  /** 같은 극장의 샘플 시간표 관 목록. 화면비 같은 우리 값을 가져온다. */
  knownScreens: ScreenInfo[];
  fetchedAt: string;
}): Schedule {
  const { theaterId, mapping, days, knownScreens, fetchedAt } = input;
  const known = new Map(knownScreens.filter((s) => s.auditoriumId).map((s) => [s.auditoriumId as string, s]));
  const screens = new Map<string, ScreenInfo & { order: number }>();
  const movies = new Map<string, Movie & { count: number }>();
  const showings: Showing[] = [];

  for (const { day, items } of days) {
    for (const item of items) {
      const movieId = String(item.RepresentationMovieCode ?? "").trim();
      const start = startMinutes(item.StartTime);
      if (!movieId || !item.MovieNameKR || start === null) continue;
      const end = endMinutes(item.EndTime, start) ?? start;

      const sid = String(item.ScreenID);
      const auditoriumId = mapping.screens[sid] ?? null;
      const film = filmLabel(item.FilmNameKR);
      const subtitle = (item.TranslationDivisionNameKR ?? "").trim();
      const screenId = `${auditoriumId ?? `s${sid}`}:${film}:${subtitle}`;
      if (!screens.has(screenId)) {
        const division = (item.ScreenDivisionNameKR ?? "").trim();
        screens.set(screenId, {
          id: screenId,
          name: item.ScreenNameKR || known.get(auditoriumId ?? "")?.name || "",
          format: division && division !== "일반" ? `${film} ${division}` : film,
          subtitle,
          aspectRatio: known.get(auditoriumId ?? "")?.aspectRatio ?? 1.9,
          seatCount: item.TotalSeatCount,
          auditoriumId,
          order: Number(sid),
        });
      }

      const movie = movies.get(movieId);
      if (movie) movie.count += 1;
      else
        movies.set(movieId, {
          schemaVersion: 1,
          id: movieId,
          sample: false,
          source: "lotte",
          title: item.MovieNameKR.trim(),
          titleEn: (item.MovieNameUS ?? "").trim(),
          rating: ratingLabel(item.ViewGradeNameKR),
          posterUrl: posterUrl(item.PosterURL),
          ticketPosterUrl: lotteTicketPosterUrl(posterUrl(item.PosterURL)),
          count: 1,
        });

      showings.push({
        day,
        screenId,
        start: fromMinutes(start),
        end: fromMinutes(end),
        seatsLeft: item.BookingSeatCount,
        movieId,
        seq: String(item.PlaySequence),
      });
    }
  }

  const movieList = [...movies.values()]
    .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, "ko"))
    .map((movie): Movie => {
      const { count, ...rest } = movie;
      void count;
      return rest;
    });
  const screenList = [...screens.values()]
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
    .map((screen): ScreenInfo => {
      const { order, ...rest } = screen;
      void order;
      return rest;
    });
  showings.sort((a, b) => a.day - b.day || toMinutes(a.start) - toMinutes(b.start));

  return {
    schemaVersion: 1,
    theaterId,
    movieId: movieList[0]?.id ?? "",
    sample: false,
    notes: "롯데시네마 예매 화면의 시간표를 받아 왔다.",
    screens: screenList,
    showings,
    movies: movieList,
    live: { source: "롯데시네마", fetchedAt },
  };
}

/** GetSeats 응답 중 쓰는 필드 */
export interface LotteSeatsResponse {
  Seats?: { Items?: { SeatNo: string; SeatFloor: number }[] | null } | null;
  BookingSeats?: { Items?: { SeatNo: string; ShowSeatRow: string; ShowSeatColumn: number }[] | null } | null;
}

/**
 * 팔린 좌석 id 목록("D13" 꼴, 우리 좌석 id와 같다).
 * 2층(발코니)은 우리 좌석표에 없으므로 가장 낮은 층의 좌석만 남긴다.
 */
export function parseBookedSeats(response: LotteSeatsResponse): string[] {
  const seats = response.Seats?.Items ?? [];
  const floorOf = new Map(seats.map((s) => [s.SeatNo, s.SeatFloor]));
  const lowest = seats.length > 0 ? Math.min(...seats.map((s) => s.SeatFloor)) : undefined;
  const booked = response.BookingSeats?.Items ?? [];
  return booked
    .filter((b) => lowest === undefined || (floorOf.get(b.SeatNo) ?? lowest) === lowest)
    .filter((b) => b.ShowSeatRow && Number.isInteger(b.ShowSeatColumn))
    .map((b) => `${b.ShowSeatRow}${b.ShowSeatColumn}`);
}
