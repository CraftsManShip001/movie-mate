/**
 * 실제 시간표·팔린 좌석을 영화관별 모듈(lotte.ts, megabox.ts)로 나눠 보낸다. 서버에서만 쓴다.
 * CGV는 서버에서 부르면 막혀 있어(403) 실제 시간표가 없다.
 */
import { getLotteSchedule, getLotteShow, hasLotteLive } from "./lotte";
import { getMegaboxSchedule, getMegaboxShow, hasMegaboxLive } from "./megabox";
import type { Schedule } from "@/lib/showtimes/types";
import type { LiveShow } from "./types";

export type { LiveShow, LiveSource } from "./types";

/** 실제 시간표가 있는 극장인지 */
export function hasLive(theaterId: string): boolean {
  return hasLotteLive(theaterId) || hasMegaboxLive(theaterId);
}

/** 오늘부터 7일치 실제 시간표. 없거나 받지 못하면 null. */
export async function getLiveSchedule(theaterId: string, todayIso: string): Promise<Schedule | null> {
  if (hasLotteLive(theaterId)) return getLotteSchedule(theaterId, todayIso);
  if (hasMegaboxLive(theaterId)) return getMegaboxSchedule(theaterId, todayIso);
  return null;
}

/** 한 상영의 영화와 팔린 좌석. todayIso는 서울 기준 오늘(메가박스 시간표 조회에 쓴다). */
export async function getLiveShow(
  theaterId: string,
  auditoriumId: string,
  dateIso: string,
  seq: string,
  todayIso: string,
  options: { withSeats?: boolean } = {},
): Promise<LiveShow | null> {
  if (hasLotteLive(theaterId)) return getLotteShow(theaterId, auditoriumId, dateIso, seq, options);
  if (hasMegaboxLive(theaterId)) return getMegaboxShow(theaterId, auditoriumId, dateIso, seq, todayIso, options);
  return null;
}
