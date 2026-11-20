import type { AuditoriumFormat } from "@/lib/domain/types";

const FORMAT_LABELS: Record<string, string> = {
  standard: "일반",
  imax: "IMAX",
  "4dx": "4DX",
  mx4d: "MX4D",
  screenx: "ScreenX",
  "dolby-cinema": "Dolby Cinema",
  premium: "프리미엄",
  recliner: "리클라이너",
  bed: "침대",
};

export function formatLabel(format: AuditoriumFormat): string {
  return FORMAT_LABELS[format] ?? format;
}

export function aspectLabel(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/** 1번 화면에 보여 주는 영화관 브랜드 (순서 고정) */
export const CHAINS = ["CGV", "메가박스", "롯데시네마"] as const;

/**
 * 실제 예매는 각 영화관 사이트에 맡긴다. 지금은 극장·상영별 딥링크 없이 브랜드 첫 화면으로 보낸다.
 */
const BOOKING_URLS: Record<string, string> = {
  CGV: "https://www.cgv.co.kr",
  메가박스: "https://www.megabox.co.kr/booking",
  롯데시네마: "https://www.lottecinema.co.kr/NLCHS/Ticketing",
};

export function bookingLink(chain: string): { label: string; href: string } {
  return { label: `${chain}에서 예매하기`, href: BOOKING_URLS[chain] ?? BOOKING_URLS.CGV };
}
