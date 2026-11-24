import type { Metadata, Viewport } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} · 영화관 좌석 시야 미리 보기`, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["좌석 시야", "영화관 명당", "CGV 좌석", "메가박스 좌석", "롯데시네마 좌석", "IMAX 명당", "좌석 배치도"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} · 영화관 좌석 시야 미리 보기`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // 네이버 서치어드바이저 소유 확인(구글은 stalemate.kr DNS TXT로 확인해 태그가 필요 없다)
  verification: { other: { "naver-site-verification": "1159fba0e89182db31af8a6ec13869bf500367db" } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
