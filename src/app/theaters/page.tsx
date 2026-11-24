import type { Metadata } from "next";
import { Suspense } from "react";
import { TheaterPicker, type ChainOption } from "@/features/theater-picker/TheaterPicker";
import { TheaterPickerFromQuery } from "@/features/theater-picker/TheaterPickerFromQuery";
import { getAuditoriums, getListedTheaters } from "@/lib/data/registry";
import { CHAINS, formatLabel } from "@/lib/labels";
import { REGIONS, regionOf } from "@/lib/regions";

export const metadata: Metadata = {
  title: "영화관 고르기",
  alternates: { canonical: "/theaters" },
};

/** 1 · 영화관. 시야 데이터(상영관)가 하나라도 있는 극장만 "시야를 볼 수 있는 극장"으로 보여 준다. 랜딩(/)의 "좌석 찾아보기"로 온다. */
export default function TheatersPage() {
  const theaters = getListedTheaters();
  const chains: ChainOption[] = CHAINS.map((chain) => ({
    name: chain,
    theaters: theaters
      .filter((t) => t.chain === chain)
      .map((t) => ({ theater: t, auditoriums: getAuditoriums(t.id) }))
      .filter(({ auditoriums }) => auditoriums.length > 0)
      .map(({ theater, auditoriums }) => ({
        id: theater.id,
        name: `${theater.chain} ${theater.branch}`,
        region: regionOf(theater.address) ?? REGIONS[0],
        formats: [...new Set(auditoriums.map((a) => formatLabel(a.format)))].join(" · "),
      })),
  }));

  // ?title=(랜딩에서 고른 영화)은 브라우저에서 읽는다. 읽기 전에는 영화 없이 그린다.
  return (
    <Suspense fallback={<TheaterPicker chains={chains} />}>
      <TheaterPickerFromQuery chains={chains} />
    </Suspense>
  );
}
