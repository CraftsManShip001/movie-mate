/**
 * 메가박스 실제 시간표·팔린 좌석을 받아 온다. 서버에서만 쓴다(next/cache).
 *
 * 공식 API가 아니라 예매 화면이 로그인 없이 쓰는 주소다. 롯데시네마(lotte.ts)와 같은 조건을 지킨다.
 * - 사용자가 극장·상영을 열 때만, 그 극장·그 회차만 묻는다.
 * - 받은 값은 잠깐 저장해 다시 쓴다(시간표 10분, 팔린 좌석 1분).
 * - 화면에 메가박스가 출처라고 남기고, 예매는 메가박스로 보낸다.
 * - 실패하면 null을 돌려주고, 부르는 쪽은 샘플 시간표로 돌아간다.
 */
import { cacheLife } from "next/cache";
import { MEGABOX_LIVE } from "@/lib/data/chains.generated";
import { getSchedule } from "@/lib/data/showtimes";
import { addDays } from "@/lib/showtimes/schedule";
import type { Schedule } from "@/lib/showtimes/types";
import {
  buildMegaboxSchedule,
  parseMegaboxSold,
  type MegaboxPlayItem,
  type MegaboxSeatsResponse,
} from "./megabox-parse";
import { megaboxBookingUrl } from "./booking-url";
import type { LiveShow } from "./types";

const BASE = "https://www.megabox.co.kr";
const DAYS = 7;

async function post(path: string, body: Record<string, unknown>): Promise<unknown> {
  const response = await fetch(BASE + path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`메가박스 응답 ${response.status}`);
  return response.json();
}

const compact = (iso: string) => iso.replace(/-/g, "");

export function hasMegaboxLive(theaterId: string): boolean {
  return theaterId in MEGABOX_LIVE;
}

/** 한 지점 하루치 상영. 10분 동안 다시 쓴다. todayIso는 조회 기준일(메가박스가 요구한다). */
async function playItems(
  brchNo: string,
  todayIso: string,
  dateIso: string,
): Promise<{ items: MegaboxPlayItem[]; fetchedAt: string }> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 600, expire: 1800 });
  const data = (await post("/on/oh/ohc/Brch/schedulePage.do", {
    masterType: "brch",
    detailType: "area",
    brchNo,
    brchNo1: brchNo,
    firstAt: "N",
    crtDe: compact(todayIso),
    playDe: compact(dateIso),
  })) as { megaMap?: { movieFormList?: MegaboxPlayItem[] | null } | null };
  const items = data.megaMap?.movieFormList;
  if (!Array.isArray(items)) throw new Error("메가박스 시간표 형식이 달라요");
  return { items, fetchedAt: new Date().toISOString() };
}

/** 한 회차의 팔린 좌석. 1분 동안 다시 쓴다. */
async function soldSeats(brchNo: string, playSchdlNo: string): Promise<{ booked: string[]; fetchedAt: string }> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 300 });
  const data = (await post("/on/oh/ohz/PcntSeatChoi/selectSeatList.do", { playSchdlNo, brchNo })) as MegaboxSeatsResponse;
  if (!Array.isArray(data.seatListSD01)) throw new Error("메가박스 좌석 형식이 달라요");
  return { booked: parseMegaboxSold(data), fetchedAt: new Date().toISOString() };
}

export async function getMegaboxSchedule(theaterId: string, todayIso: string): Promise<Schedule | null> {
  const mapping = MEGABOX_LIVE[theaterId];
  if (!mapping) return null;
  try {
    const results = await Promise.all(
      Array.from({ length: DAYS }, (_, day) => playItems(mapping.brchNo, todayIso, addDays(todayIso, day))),
    );
    return buildMegaboxSchedule({
      theaterId,
      mapping,
      days: results.map((r, day) => ({ day, items: r.items })),
      knownScreens: getSchedule(theaterId)?.screens ?? [],
      fetchedAt: results.map((r) => r.fetchedAt).sort()[0],
    });
  } catch (error) {
    console.warn(`[megabox] ${theaterId} 시간표를 받지 못했어요`, error);
    return null;
  }
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * 한 상영의 영화와 팔린 좌석. 회차 번호가 그 극장·그 상영관·그 날짜의 시간표에 있을 때만 좌석을 묻는다.
 * todayIso: 시간표 조회 기준일(오늘)
 */
export async function getMegaboxShow(
  theaterId: string,
  auditoriumId: string,
  dateIso: string,
  seq: string,
  todayIso: string,
  { withSeats = true }: { withSeats?: boolean } = {},
): Promise<LiveShow | null> {
  const mapping = MEGABOX_LIVE[theaterId];
  if (!mapping || !DATE.test(dateIso) || !DATE.test(todayIso) || !/^\d{6,20}$/.test(seq)) return null;
  try {
    const { items } = await playItems(mapping.brchNo, todayIso, dateIso);
    const item = items.find((i) => String(i.playSchdlNo) === seq && mapping.screens[i.theabNo] === auditoriumId);
    if (!item) return null;
    const schedule = buildMegaboxSchedule({ theaterId, mapping, days: [{ day: 0, items: [item] }], knownScreens: [], fetchedAt: "" });
    const movie = schedule.movies?.[0];
    const showing = schedule.showings[0];
    if (!movie || !showing) return null;
    const seats = withSeats
      ? await soldSeats(mapping.brchNo, seq).catch((error) => {
          console.warn(`[megabox] ${theaterId} ${auditoriumId} 좌석을 받지 못했어요`, error);
          return null;
        })
      : null;
    return {
      source: "메가박스",
      movie,
      start: showing.start,
      end: showing.end,
      seatsLeft: showing.seatsLeft,
      booked: seats?.booked ?? null,
      fetchedAt: seats?.fetchedAt ?? null,
      bookingUrl: megaboxBookingUrl(seq),
    };
  } catch (error) {
    console.warn(`[megabox] ${theaterId} 상영 정보를 받지 못했어요`, error);
    return null;
  }
}
