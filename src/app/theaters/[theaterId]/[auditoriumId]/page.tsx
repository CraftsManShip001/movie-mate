import type { Metadata } from "next";
import { SHARE_IMAGE } from "@/lib/site";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SeatPicker, SeatPickerSkeleton } from "@/features/seat-picker/SeatPicker";
import { getAllAuditoriums, getAuditorium, getTheater } from "@/lib/data/registry";
import { screenNameForAuditorium } from "@/lib/data/showtimes";
import { listSeats } from "@/lib/domain/geometry";
import { formatLabel } from "@/lib/labels";
import { hasLive } from "@/lib/live";

export function generateStaticParams() {
  return getAllAuditoriums().map((a) => ({ theaterId: a.theaterId, auditoriumId: a.id }));
}

export async function generateMetadata({ params }: PageProps<"/theaters/[theaterId]/[auditoriumId]">): Promise<Metadata> {
  const { theaterId, auditoriumId } = await params;
  const theater = getTheater(theaterId);
  const auditorium = getAuditorium(theaterId, auditoriumId);
  if (!theater || !auditorium) return {};
  const screenName = screenNameForAuditorium(theater.id, auditorium.id) ?? auditorium.name;
  const name = `${theater.chain} ${theater.branch} ${screenName}`;
  const kind = auditorium.format === "standard" ? "" : `${formatLabel(auditorium.format)} · `;
  const description = `${name} 좌석 배치도(${kind}${listSeats(auditorium).length}석). 자리를 누르면 그 좌석에서 보이는 스크린을 3D로 보여 줘요. 명당 자리를 예매 전에 확인하세요.`;
  const url = `/theaters/${theater.id}/${auditorium.id}`;
  return {
    title: `${name} 좌석 배치도·시야`,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${name} 좌석 배치도·시야`, description, url, images: [SHARE_IMAGE] },
  };
}

/** 3 · 좌석. 주소 값(params)은 Suspense 안에서 읽는다(Cache Components). */
export default function AuditoriumPage({ params }: PageProps<"/theaters/[theaterId]/[auditoriumId]">) {
  return (
    <Suspense fallback={<SeatPickerSkeleton title="" backHref="/" />}>
      {params.then(({ theaterId, auditoriumId }) => (
        <AuditoriumContent theaterId={theaterId} auditoriumId={auditoriumId} />
      ))}
    </Suspense>
  );
}

async function AuditoriumContent({ theaterId, auditoriumId }: { theaterId: string; auditoriumId: string }) {
  const theater = getTheater(theaterId);
  const auditorium = getAuditorium(theaterId, auditoriumId);
  if (!theater || !auditorium) notFound();

  const screenName = screenNameForAuditorium(theater.id, auditorium.id) ?? auditorium.name;
  const title = `${theater.chain} ${theater.branch} · ${screenName}`;
  const backHref = `/theaters/${theater.id}`;

  // 쿼리(날짜·시각·고른 자리)는 브라우저에서 읽으므로 그 부분만 Suspense로 감싼다
  return (
    <Suspense fallback={<SeatPickerSkeleton title={title} backHref={backHref} />}>
      <SeatPicker
        theaterId={theater.id}
        title={title}
        auditorium={auditorium}
        chain={theater.chain}
        live={hasLive(theater.id)}
      />
    </Suspense>
  );
}
