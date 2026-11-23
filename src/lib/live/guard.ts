/**
 * 실시간 조회 API 보호 (proxy.ts 가 쓴다).
 * - 같은 사이트 확인: 브라우저는 fetch 마다 Sec-Fetch-Site 를 붙인다. 없으면 Origin/Referer 의 호스트를 본다.
 *   curl 같은 도구는 헤더를 꾸며 낼 수 있으므로, 이건 "남의 웹사이트·앱이 우리 API를 가져다 쓰는 것"을 막는 벽이다.
 * - IP마다 1분 창 요청 수 제한. 서버(인스턴스)마다 따로 세는 메모리 값이라 완벽하지 않다. 정확한 제한은 Cloudflare 규칙이 맡는다.
 */

/** IP 하나가 1분에 부를 수 있는 횟수. 좌석 화면 하나가 회차마다 한 번 부르므로 넉넉하다. */
export const LIVE_LIMIT_PER_MINUTE = 30;
const WINDOW_MS = 60_000;
/** 메모리가 무한히 늘지 않게 이 수를 넘으면 지난 창을 비운다 */
const MAX_TRACKED_IPS = 10_000;

export function isSameSite(input: {
  host: string | null;
  secFetchSite: string | null;
  origin: string | null;
  referer: string | null;
}): boolean {
  const { host, secFetchSite, origin, referer } = input;
  if (secFetchSite) return secFetchSite === "same-origin";
  if (!host) return false;
  for (const value of [origin, referer]) {
    if (!value) continue;
    try {
      return new URL(value).host === host;
    } catch {
      return false;
    }
  }
  return false;
}

const windows = new Map<string, { start: number; count: number }>();

export function allowRequest(ip: string, now: number, limit = LIVE_LIMIT_PER_MINUTE): { ok: true } | { ok: false; retryAfterSeconds: number } {
  if (windows.size > MAX_TRACKED_IPS) {
    for (const [key, w] of windows) if (now - w.start >= WINDOW_MS) windows.delete(key);
  }
  const w = windows.get(ip);
  if (!w || now - w.start >= WINDOW_MS) {
    windows.set(ip, { start: now, count: 1 });
    return { ok: true };
  }
  if (w.count >= limit) return { ok: false, retryAfterSeconds: Math.ceil((w.start + WINDOW_MS - now) / 1000) };
  w.count += 1;
  return { ok: true };
}

/** 테스트용 */
export function resetRequestWindows() {
  windows.clear();
}
