import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "movie mate",
  description: "영화관 좌석에서 보이는 시야를 3D로 미리 보기",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <header className="page">
          <Link href="/">movie mate</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
