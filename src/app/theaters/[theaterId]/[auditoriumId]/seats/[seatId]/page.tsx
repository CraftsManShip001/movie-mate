import type { Metadata } from "next";
import { SHARE_IMAGE } from "@/lib/site";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SeatViewer } from "@/features/viewer/SeatViewer";
import { getSeatContext } from "@/lib/data/flow-context";
import { getAuditorium, getTheater } from "@/lib/data/registry";
import { findSeat } from "@/lib/domain/geometry";
import { screenNameForAuditorium } from "@/lib/data/showtimes";

/** 좌석마다 따로 검색에 올리지 않는다(상영관 페이지가 대표). 공유했을 때 제목만 좌석까지 보이게 한다. */
export async function generateMetadata({ params }: PageProps<"/theaters/[theaterId]/[auditoriumId]/seats/[seatId]">): Promise<Metadata> {
  const { theaterId, auditoriumId, seatId } = await params;
  const theater = getTheater(theaterId);
  const auditorium = getAuditorium(theaterId, auditoriumId);
  const seat = auditorium ? findSeat(auditorium, decodeURIComponent(seatId)) : undefined;
  if (!theater || !auditorium || !seat) return { title: "찾는 화면이 없어요", robots: { index: false, follow: false } };
  const screenName = screenNameForAuditorium(theater.id, auditorium.id) ?? auditorium.name;
  const title = `${theater.chain} ${theater.branch} ${screenName} ${seat.id} 시야`;
  return {
    title,
    alternates: { canonical: `/theaters/${theater.id}/${auditorium.id}` },
    openGraph: { title, images: [SHARE_IMAGE] },
    robots: { index: false, follow: true },
  };
}

/**
 * 5 · 시야.
 * 좌석 수만큼 페이지를 미리 만들지 않으려고 generateStaticParams를 두지 않는다.
 * (Cache Components에서는 그 경우 params 접근을 Suspense 안에서 해야 한다.)
 */
export default function SeatPage({ params, searchParams }: PageProps<"/theaters/[theaterId]/[auditoriumId]/seats/[seatId]">) {
  return (
    <Suspense fallback={<div style={{ position: "fixed", inset: 0, background: "var(--color-stage)" }} />}>
      {Promise.all([params, searchParams]).then(([{ theaterId, auditoriumId, seatId }, query]) => (
        <SeatView theaterId={theaterId} auditoriumId={auditoriumId} seatId={decodeURIComponent(seatId)} query={query} />
      ))}
    </Suspense>
  );
}

async function SeatView({
  theaterId,
  auditoriumId,
  seatId,
  query,
}: {
  theaterId: string;
  auditoriumId: string;
  seatId: string;
  query: Record<string, string | string[] | undefined>;
}) {
  const context = await getSeatContext(theaterId, auditoriumId, seatId, query);
  if (!context) notFound();

  return (
    <SeatViewer
      theaterId={context.theater.id}
      theaterName={context.theaterName}
      chain={context.theater.chain}
      screenName={context.screenName}
      auditorium={context.auditorium}
      seatId={context.seat.id}
      movie={context.movie}
    />
  );
}
