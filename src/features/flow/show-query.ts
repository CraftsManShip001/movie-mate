/**
 * 2번 화면에서 고른 상영(날짜·시각)을 3~5번 화면 주소의 쿼리로 넘긴다.
 * 예: ?date=2026-11-16&time=13:40
 */
export interface ShowQuery {
  date: string | null;
  time: string | null;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}$/;

export function readShowQuery(params: { get(name: string): string | null }): ShowQuery {
  const date = params.get("date");
  const time = params.get("time");
  return {
    date: date && DATE.test(date) ? date : null,
    time: time && TIME.test(time) ? time : null,
  };
}

/** "?date=...&time=..." (값이 없으면 빈 문자열). extra 값도 함께 붙인다. 날짜·시각은 형식이 정해져 있어 그대로 쓴다. */
export function showQueryString(show: ShowQuery, extra: Record<string, string> = {}): string {
  const parts: string[] = [];
  if (show.date) parts.push(`date=${show.date}`);
  if (show.time) parts.push(`time=${show.time}`);
  for (const [key, value] of Object.entries(extra)) parts.push(`${key}=${encodeURIComponent(value)}`);
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}
