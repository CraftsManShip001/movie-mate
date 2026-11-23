/**
 * 2번 화면에서 고른 상영(날짜·시각·회차)을 3~5번 화면 주소의 쿼리로 넘긴다.
 * 예: ?date=2026-11-16&time=13:40&seq=3
 * seq는 실제 시간표(롯데시네마·메가박스)에서만 붙는다. 팔린 좌석과 영화를 다시 찾을 때 쓴다.
 */
import { nowInSeoul } from "@/lib/format";

export interface ShowQuery {
  date: string | null;
  time: string | null;
  seq?: string | null;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;
/** 심야 상영은 24:10, 25:30 처럼 적으므로 29시까지 받는다 */
const TIME = /^([01]\d|2\d):[0-5]\d$/;

/** 실제 날짜이고, 시간표가 있는 범위(어제~6일 뒤, 서울 기준) 안일 때만 받는다. 오래된 링크나 꾸민 값은 상영 없이 연다. */
function isShowDate(value: string): boolean {
  if (!DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value) return false;
  const { todayIso } = nowInSeoul(new Date());
  const days = (d.getTime() - Date.parse(`${todayIso}T00:00:00Z`)) / 86_400_000;
  return days >= -1 && days <= 6;
}
const SEQ = /^\d{1,20}$/;

export function readShowQuery(params: { get(name: string): string | null }): ShowQuery {
  const date = params.get("date");
  const time = params.get("time");
  const seq = params.get("seq");
  return {
    date: date && isShowDate(date) ? date : null,
    time: time && TIME.test(time) ? time : null,
    seq: seq && SEQ.test(seq) ? seq : null,
  };
}

/** "?date=...&time=..." (값이 없으면 빈 문자열). extra 값도 함께 붙인다. 날짜·시각·회차는 형식이 정해져 있어 그대로 쓴다. */
export function showQueryString(show: ShowQuery, extra: Record<string, string> = {}): string {
  const parts: string[] = [];
  if (show.date) parts.push(`date=${show.date}`);
  if (show.time) parts.push(`time=${show.time}`);
  if (show.seq != null) parts.push(`seq=${show.seq}`);
  for (const [key, value] of Object.entries(extra)) parts.push(`${key}=${encodeURIComponent(value)}`);
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}
