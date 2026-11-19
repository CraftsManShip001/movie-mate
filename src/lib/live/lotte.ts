/**
 * 롯데시네마 실제 시간표·팔린 좌석을 받아 온다. 서버에서만 쓴다(next/cache).
 *
 * 공식 API가 아니라 예매 화면이 로그인 없이 쓰는 주소다. 그래서
 * - 사용자가 극장·상영을 열 때만, 그 극장·그 회차만 묻는다(전국 시간표를 모아 쌓지 않는다).
 * - 받은 값은 잠깐 저장해 다시 쓴다(시간표 10분, 팔린 좌석 1분).
 * - 화면에 롯데시네마가 출처라고 남기고, 예매는 롯데시네마로 보낸다.
 * - 실패하면 null을 돌려주고, 부르는 쪽은 샘플 시간표로 돌아간다.
 */
import { cacheLife } from "next/cache";
import { LOTTE_LIVE } from "@/lib/data/lotte.generated";
import { getSchedule } from "@/lib/data/showtimes";
import { addDays } from "@/lib/showtimes/schedule";
import type { Movie, Schedule } from "@/lib/showtimes/types";
import { buildLotteSchedule, parseBookedSeats, type LottePlayItem, type LotteSeatsResponse } from "./lotte-parse";

const ENDPOINT = "https://www.lottecinema.co.kr/LCWS/Ticketing/TicketingData.aspx";
const DAYS = 7;

async function call(params: Record<string, unknown>): Promise<unknown> {
  const body = new FormData();
  body.set("paramList", JSON.stringify({ channelType: "HO", osType: "W", osVersion: "Mozilla/5.0", ...params }));
  const response = await fetch(ENDPOINT, {
    method: "POST",
    body,
    headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.lottecinema.co.kr/NLCHS/Ticketing" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`롯데시네마 응답 ${response.status}`);
  return response.json();
}

/** 롯데시네마 시간표가 있는 극장인지 */
export function hasLotteLive(theaterId: string): boolean {
  return theaterId in LOTTE_LIVE;
}

/** 한 극장 하루치 상영. 10분 동안 다시 쓴다. */
async function playItems(cinema: string, dateIso: string): Promise<{ items: LottePlayItem[]; fetchedAt: string }> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 600, expire: 1800 });
  const data = (await call({
    MethodName: "GetPlaySequence",
    playDate: dateIso,
    cinemaID: cinema,
    representationMovieCode: "",
  })) as { PlaySeqs?: { Items?: LottePlayItem[] | null } | null };
  const items = data.PlaySeqs?.Items;
  if (!Array.isArray(items)) throw new Error("롯데시네마 시간표 형식이 달라요");
  return { items, fetchedAt: new Date().toISOString() };
}

/** 한 회차의 팔린 좌석. 1분 동안 다시 쓴다. */
async function bookedSeats(
  cinemaId: number,
  screenId: number,
  dateIso: string,
  seq: number,
  movieCode: string,
): Promise<{ booked: string[]; fetchedAt: string }> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 300 });
  const data = (await call({
    MethodName: "GetSeats",
    cinemaId,
    screenId,
    playDate: dateIso,
    playSequence: seq,
    representationMovieCode: movieCode,
  })) as LotteSeatsResponse & { IsOK?: string | boolean };
  if (!data.BookingSeats) throw new Error("롯데시네마 좌석 형식이 달라요");
  return { booked: parseBookedSeats(data), fetchedAt: new Date().toISOString() };
}

/** 오늘부터 7일치 실제 시간표. 롯데시네마 극장이 아니거나 받지 못하면 null. */
export async function getLotteSchedule(theaterId: string, todayIso: string): Promise<Schedule | null> {
  const mapping = LOTTE_LIVE[theaterId];
  if (!mapping) return null;
  try {
    const results = await Promise.all(
      Array.from({ length: DAYS }, (_, day) => playItems(mapping.cinema, addDays(todayIso, day))),
    );
    const fetchedAt = results.map((r) => r.fetchedAt).sort()[0];
    return buildLotteSchedule({
      theaterId,
      mapping,
      days: results.map((r, day) => ({ day, items: r.items })),
      knownScreens: getSchedule(theaterId)?.screens ?? [],
      fetchedAt,
    });
  } catch (error) {
    console.warn(`[lotte] ${theaterId} 시간표를 받지 못했어요`, error);
    return null;
  }
}

export interface LotteShow {
  movie: Movie;
  start: string;
  end: string;
  seatsLeft: number;
  /** 팔린 좌석 id. 받지 못하면 null */
  booked: string[] | null;
  /** 팔린 좌석을 받아 온 시각(ISO) */
  fetchedAt: string | null;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * 한 상영(극장·상영관·날짜·회차)의 영화와 팔린 좌석.
 * withSeats가 false면 팔린 좌석은 묻지 않는다(티켓·시야 화면).
 */
export async function getLotteShow(
  theaterId: string,
  auditoriumId: string,
  dateIso: string,
  seq: number,
  { withSeats = true }: { withSeats?: boolean } = {},
): Promise<LotteShow | null> {
  const mapping = LOTTE_LIVE[theaterId];
  if (!mapping || !DATE.test(dateIso) || !Number.isInteger(seq) || seq < 0) return null;
  const sid = Object.keys(mapping.screens).find((key) => mapping.screens[key] === auditoriumId);
  if (!sid) return null;
  try {
    const { items } = await playItems(mapping.cinema, dateIso);
    const item = items.find((i) => String(i.ScreenID) === sid && i.PlaySequence === seq);
    if (!item) return null;
    const schedule = buildLotteSchedule({
      theaterId,
      mapping,
      days: [{ day: 0, items: [item] }],
      knownScreens: [],
      fetchedAt: "",
    });
    const movie = schedule.movies?.[0];
    const showing = schedule.showings[0];
    if (!movie || !showing) return null;
    let seats: { booked: string[]; fetchedAt: string } | null = null;
    if (withSeats) {
      const cinemaId = Number(mapping.cinema.split("|")[2]);
      seats = await bookedSeats(cinemaId, Number(sid), dateIso, seq, item.RepresentationMovieCode).catch((error) => {
        console.warn(`[lotte] ${theaterId} ${auditoriumId} 좌석을 받지 못했어요`, error);
        return null;
      });
    }
    return {
      movie,
      start: showing.start,
      end: showing.end,
      seatsLeft: showing.seatsLeft,
      booked: seats?.booked ?? null,
      fetchedAt: seats?.fetchedAt ?? null,
    };
  } catch (error) {
    console.warn(`[lotte] ${theaterId} 상영 정보를 받지 못했어요`, error);
    return null;
  }
}
