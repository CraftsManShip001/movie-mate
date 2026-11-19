import { type NextRequest } from "next/server";
import { getLotteShow } from "@/lib/live/lotte";

/**
 * 3번 화면이 고른 상영의 영화와 팔린 좌석을 묻는다.
 * GET /api/live/show?theater=lotte-suwon&auditorium=hall-2&date=2026-11-19&seq=3
 * 우리 극장·상영관 id만 받고, 롯데시네마 쪽 번호는 서버의 등록부에서 찾는다(아무 주소나 대신 묻지 않는다).
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const theater = params.get("theater") ?? "";
  const auditorium = params.get("auditorium") ?? "";
  const date = params.get("date") ?? "";
  const seq = Number(params.get("seq"));
  const show = await getLotteShow(theater, auditorium, date, seq);
  if (!show) return Response.json({ show: null }, { status: 404 });
  return Response.json({ show }, { headers: { "Cache-Control": "private, max-age=30" } });
}
