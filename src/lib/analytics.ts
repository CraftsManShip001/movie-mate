import { sendGAEvent } from "@next/third-parties/google";

/** GA4 "무비메이트 웹" 스트림의 측정 ID(페이지에 그대로 보이는 공개 값) */
const PRODUCTION_GA_ID = "G-YLGXM7YLT1";

/**
 * GA4 측정 ID. 환경 변수가 있으면 그것을, 없으면 Vercel 운영 배포에서만 위 ID를 쓴다.
 * 비어 있으면(로컬·미리 보기 배포) 아무것도 보내지 않는다.
 */
export const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? (process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? PRODUCTION_GA_ID : "");

/**
 * 무비메이트에서 남기는 이벤트. GA4 보고서 > 이벤트에서 이 이름으로 보인다.
 * 매개변수는 GA에서 "맞춤 측정기준"으로 등록해야 보고서에서 나눠 볼 수 있다.
 */
export type AnalyticsEvent =
  // 랜딩
  | { name: "landing_click"; params: { target: "start" | "start_bottom" | "seat_map" | "recent_seat" | "movie"; movie_id?: string } }
  // 핵심 흐름
  | { name: "select_chain"; params: { chain: string } }
  | { name: "select_theater"; params: { theater_id: string } }
  | { name: "select_auditorium"; params: { theater_id: string; auditorium_id: string } }
  | { name: "select_seat"; params: { theater_id: string; auditorium_id: string; seat_id: string } }
  | { name: "view_3d"; params: { chain: string; theater_id: string; auditorium_id: string; seat_id: string } }
  // 예매로 넘어감
  | { name: "booking_click"; params: { chain: string; from: "seat_picker" | "viewer" | "viewer_error" | "showtime" } }
  // 시야 화면 조작
  | { name: "toggle_heads"; params: { on: boolean } }
  | { name: "open_seat_map"; params: { open: boolean } }
  | { name: "change_seat"; params: { auditorium_id: string; seat_id: string } }
  | { name: "change_stature"; params: { stature_cm: number } }
  | { name: "recenter_view"; params: Record<string, never> }
  | { name: "retry_video"; params: Record<string, never> }
  | { name: "video_status"; params: { status: string } }
  // 상영 시간표
  | { name: "select_movie"; params: { theater_id: string; movie_id: string } }
  | { name: "select_day"; params: { theater_id: string; day: number } }
  | { name: "select_showtime"; params: { theater_id: string; screen_id: string; start: string } }
  | { name: "showtime_view_seats"; params: { theater_id: string; auditorium_id: string } };

export function track<N extends AnalyticsEvent["name"]>(
  name: N,
  params: Extract<AnalyticsEvent, { name: N }>["params"],
): void {
  if (!GA_ID || typeof window === "undefined") return;
  sendGAEvent("event", name, params);
}
