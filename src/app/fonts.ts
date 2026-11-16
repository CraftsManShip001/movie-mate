import { Bebas_Neue, Hahmlet, IBM_Plex_Mono, Noto_Sans_KR } from "next/font/google";

/**
 * 글꼴 (design/DESIGN.md "글꼴").
 * 한글 글꼴은 글자 범위별로 잘게 나뉘어 있어 미리 불러오지 않는다(preload: false).
 */
export const notoSansKr = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-kr",
});

/** 티켓 제목 */
export const hahmlet = Hahmlet({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-hahmlet",
});

/** 티켓 라벨·날짜·번호 */
export const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

/** 좌석 번호 (J14) */
export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas-neue",
});

export const fontVariables = [notoSansKr, hahmlet, ibmPlexMono, bebasNeue].map((f) => f.variable).join(" ");
