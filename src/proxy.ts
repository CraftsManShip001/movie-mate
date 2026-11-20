import { NextResponse, type NextRequest } from "next/server";
import { ROUTE_IDS } from "@/lib/data/route-ids.generated";

/**
 * 없는 극장·상영관 주소는 화면을 그리기 전에 404 페이지로 보낸다.
 * (Cache Components 에서는 dynamicParams 를 쓸 수 없고, 화면 안에서 notFound() 를 부르면 스트리밍이 시작된 뒤라 상태 코드가 200 이 된다.)
 * 좌석 번호는 상영관 데이터를 읽어야 알 수 있어 화면에서 확인한다.
 */
export function proxy(request: NextRequest) {
  const [, , theaterId, auditoriumId] = request.nextUrl.pathname.split("/").map(decodeURIComponent);
  const halls = theaterId ? ROUTE_IDS[theaterId] : undefined;
  if (!halls || (auditoriumId && !halls.includes(auditoriumId))) {
    return NextResponse.rewrite(new URL("/missing", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/theaters/:path+",
};
