import { NextResponse, type NextRequest } from "next/server";
import { ROUTE_IDS } from "@/lib/data/route-ids.generated";
import { allowRequest, isSameSite } from "@/lib/live/guard";

/**
 * 1) 없는 극장·상영관 주소는 화면을 그리기 전에 404 페이지로 보낸다.
 *    (Cache Components 에서는 dynamicParams 를 쓸 수 없고, 화면 안에서 notFound() 를 부르면 스트리밍이 시작된 뒤라 상태 코드가 200 이 된다.)
 *    좌석 번호는 상영관 데이터를 읽어야 알 수 있어 화면에서 확인한다.
 * 2) 실시간 조회 API(/api/live)는 우리 화면에서 부른 요청만, IP마다 1분에 정해진 횟수까지 받는다.
 *    영화관 서버를 대신 불러 주는 통로로 쓰이지 않게 하려는 것이다. 진짜 IP 제한은 Cloudflare 규칙이 맡고, 여기는 서버 안의 두 번째 벽이다.
 */
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/api/live/")) return guardLive(request);

  const [, , theaterId, auditoriumId] = path.split("/").map(decodeURIComponent);
  const halls = theaterId ? ROUTE_IDS[theaterId] : undefined;
  if (!halls || (auditoriumId && !halls.includes(auditoriumId))) {
    return NextResponse.rewrite(new URL("/missing", request.url));
  }
  return NextResponse.next();
}

function guardLive(request: NextRequest) {
  const headers = request.headers;
  if (
    !isSameSite({
      host: headers.get("host"),
      secFetchSite: headers.get("sec-fetch-site"),
      origin: headers.get("origin"),
      referer: headers.get("referer"),
    })
  ) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  // Cloudflare를 거치면 cf-connecting-ip 가 실제 사용자 IP다. 그다음은 Vercel이 직접 채우는 x-real-ip.
  // x-forwarded-for 는 요청하는 쪽이 앞부분을 꾸밀 수 있어 마지막으로 본다.
  const ip =
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ??
    "unknown";
  const verdict = allowRequest(ip, Date.now());
  if (!verdict.ok) {
    return NextResponse.json(
      { error: "too many requests" },
      { status: 429, headers: { "Retry-After": String(verdict.retryAfterSeconds) } },
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/theaters/:path+", "/api/live/:path*"],
};
