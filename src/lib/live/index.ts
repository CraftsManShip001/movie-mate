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
  // 시간표가 있는 7일(어제 심야 회차~6일 뒤) 밖의 날짜는 영화관에 묻지 않는다.
  // 날짜마다 따로 저장되므로, 아무 날짜나 받으면 요청을 바꿔 가며 영화관 서버를 계속 부를 수 있다.
  if (!withinWeek(dateIso, todayIso)) return null;
  if (hasLotteLive(theaterId)) return getLotteShow(theaterId, auditoriumId, dateIso, seq, options);
  if (hasMegaboxLive(theaterId)) return getMegaboxShow(theaterId, auditoriumId, dateIso, seq, todayIso, options);
  return null;
}

/** dateIso 가 어제(자정 넘긴 심야 회차)부터 6일 뒤까지인지 */
export function withinWeek(dateIso: string, todayIso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso) || !/^\d{4}-\d{2}-\d{2}$/.test(todayIso)) return false;
  const days = (Date.parse(`${dateIso}T00:00:00Z`) - Date.parse(`${todayIso}T00:00:00Z`)) / 86_400_000;
  return days >= -1 && days <= 6;
}
