/**
 * 메가박스 예매 화면이 쓰는 내부 API 응답을 우리 시간표 모양으로 바꾼다 (순수 함수).
 * 받아 오는 쪽은 megabox.ts. 공식 API가 아니라 필드가 바뀔 수 있어, 모르는 값은 버리고 넘어간다.
 */
import { fromMinutes, toMinutes } from "@/lib/showtimes/schedule";
import type { Movie, Schedule, ScreenInfo, Showing } from "@/lib/showtimes/types";

/** schedulePage.do 의 megaMap.movieFormList 한 줄 중 쓰는 필드 */
export interface MegaboxPlayItem {
  rpstMovieNo?: string | null;
  movieNo: string;
  movieNm: string;
  movieEngNm?: string | null;
  admisClassCdNm?: string | null;
  moviePosterImg?: string | null;
  moviePlayTime?: string | number | null;
  theabNo: string;
  theabExpoNm?: string | null;
  playKindNm?: string | null;
  playStartTime: string;
  playEndTime: string;
  restSeatCnt: number;
  totSeatCnt: number;
  playSchdlNo: string;
}

/** 지점 번호와 상영관 번호(theabNo) → 상영관 id (chains.generated.ts 의 MEGABOX_LIVE) */
export interface MegaboxMapping {
  brchNo: string;
  screens: Record<string, string>;
}

export interface MegaboxDay {
  day: number;
  items: MegaboxPlayItem[];
}

const TIME = /^(\d{1,2}):(\d{2})$/;
const POSTER_HOST = "https://img.megabox.co.kr";

/**
 * 티켓 앞면용 큰 포스터. 시간표가 주는 포스터는 104×150 썸네일(`…_150.jpg`)이라
 * 크기 꼬리를 떼어 원본(448×640)을 쓴다.
 */
export function megaboxTicketPosterUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  return `${POSTER_HOST}${path.replace(/_\d+(\.\w+)$/, "$1")}`;
}

/** "&#40;" 같은 HTML 문자 참조를 푼다 */
export function decodeEntities(text: string | null | undefined): string {
  return (text ?? "")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

/** "15세이상관람가" → "15세 이상", "전체관람가" → "전체 관람가" */
export function megaboxRating(grade: string | null | undefined): string {
  const g = (grade ?? "").replace(/\s/g, "");
  if (!g) return "";
  if (g.startsWith("전체")) return "전체 관람가";
  if (g.startsWith("청소년") || g.startsWith("청불")) return "청소년 관람불가";
  const m = /^(\d+)세/.exec(g);
  return m ? `${m[1]}세 이상` : g;
}

/** "2D(자막)" → { film: "2D", subtitle: "자막" } */
function playKind(kind: string | null | undefined): { film: string; subtitle: string } {
  const text = decodeEntities(kind);
  const m = /^(.*?)\s*\((.*?)\)\s*$/.exec(text);
  return m ? { film: m[1] || "2D", subtitle: m[2] } : { film: text || "2D", subtitle: "" };
}

function minutes(time: string): number | null {
  const m = TIME.exec(time ?? "");
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

/**
 * 7일치 시간표를 하나의 Schedule로 묶는다. 관은 theabNo로 우리 상영관과 잇는다.
 * 영화는 7일 동안 상영 횟수가 많은 순.
 */
export function buildMegaboxSchedule(input: {
  theaterId: string;
  mapping: MegaboxMapping;
  days: MegaboxDay[];
  knownScreens: ScreenInfo[];
  fetchedAt: string;
}): Schedule {
  const { theaterId, mapping, days, knownScreens, fetchedAt } = input;
  const known = new Map(knownScreens.filter((s) => s.auditoriumId).map((s) => [s.auditoriumId as string, s]));
  const screens = new Map<string, ScreenInfo & { order: string }>();
  const movies = new Map<string, Movie & { count: number }>();
  const showings: Showing[] = [];

  for (const { day, items } of days) {
    for (const item of items) {
      const movieId = String(item.rpstMovieNo || item.movieNo || "").trim();
      let start = minutes(item.playStartTime);
      if (!movieId || !item.movieNm || start === null) continue;
      if (start < 5 * 60) start += 24 * 60;
      let end = minutes(item.playEndTime) ?? start;
      while (end <= start) end += 24 * 60;

      const auditoriumId = mapping.screens[item.theabNo] ?? null;
      const { film, subtitle } = playKind(item.playKindNm);
      const screenId = `${auditoriumId ?? `t${item.theabNo}`}:${film}:${subtitle}`;
      if (!screens.has(screenId)) {
        const knownScreen = known.get(auditoriumId ?? "");
        screens.set(screenId, {
          id: screenId,
          name: knownScreen?.name || decodeEntities(item.theabExpoNm) || `${Number(item.theabNo)}관`,
          format: knownScreen?.format.replace(/^\S+/, film) ?? film,
          subtitle,
          aspectRatio: knownScreen?.aspectRatio ?? 1.9,
          seatCount: item.totSeatCnt,
          auditoriumId,
          order: item.theabNo,
        });
      }

      const movie = movies.get(movieId);
      if (movie) movie.count += 1;
      else {
        const runtime = Number(item.moviePlayTime);
        movies.set(movieId, {
          schemaVersion: 1,
          id: movieId,
          sample: false,
          source: "megabox",
          title: decodeEntities(item.movieNm),
          titleEn: decodeEntities(item.movieEngNm),
          rating: megaboxRating(item.admisClassCdNm),
          ...(Number.isFinite(runtime) && runtime > 0 ? { runtimeMin: runtime } : {}),
          posterUrl: item.moviePosterImg ? `${POSTER_HOST}${item.moviePosterImg}` : "",
          ticketPosterUrl: megaboxTicketPosterUrl(item.moviePosterImg),
          count: 1,
        });
      }

      showings.push({
        day,
        screenId,
        start: fromMinutes(start),
        end: fromMinutes(end),
        seatsLeft: item.restSeatCnt,
        movieId,
        seq: String(item.playSchdlNo),
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
    .sort((a, b) => a.order.localeCompare(b.order) || a.id.localeCompare(b.id))
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
    notes: "메가박스 예매 화면의 시간표를 받아 왔다.",
    screens: screenList,
    showings,
    movies: movieList,
    live: { source: "메가박스", fetchedAt },
  };
}

/** selectSeatList.do 응답 중 쓰는 필드 */
export interface MegaboxSeatsResponse {
  seatListSD01?: { rowNm?: string | null; seatNo?: number | string | null; seatStatCd?: string | null }[] | null;
}

/** 팔 수 없는 좌석 id("D13" 꼴). 일반 판매(GERN_SELL)가 아닌 좌석은 모두 팔렸거나 막힌 자리로 본다. */
export function parseMegaboxSold(response: MegaboxSeatsResponse): string[] {
  return (response.seatListSD01 ?? [])
    .filter((s) => s.rowNm && s.seatNo != null && s.seatStatCd && s.seatStatCd !== "GERN_SELL")
    .map((s) => `${s.rowNm}${s.seatNo}`);
}
