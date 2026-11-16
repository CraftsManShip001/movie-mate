import Link from "next/link";
import { notFound } from "next/navigation";
import { SeatMap } from "@/features/seat-map/SeatMap";
import { getAllAuditoriums, getAuditorium, getTheater } from "@/lib/data/registry";
import { listSourcedValues } from "@/lib/domain/validation";
import { aspectLabel, formatLabel } from "@/lib/labels";

export function generateStaticParams() {
  return getAllAuditoriums().map((a) => ({ theaterId: a.theaterId, auditoriumId: a.id }));
}

export default async function AuditoriumPage({ params }: PageProps<"/theaters/[theaterId]/[auditoriumId]">) {
  const { theaterId, auditoriumId } = await params;
  const theater = getTheater(theaterId);
  const auditorium = getAuditorium(theaterId, auditoriumId);
  if (!theater || !auditorium) notFound();

  const sourced = listSourcedValues(auditorium);
  const estimatedCount = sourced.filter((e) => e.source === "estimated").length;

  return (
    <main className="page">
      <Link href={`/theaters/${theater.id}`}>
        {theater.chain} {theater.branch}
      </Link>
      <h1>{auditorium.name}</h1>
      <p className="muted">
        {formatLabel(auditorium.format)} · 스크린 {(auditorium.screen.width.value / 1000).toFixed(1)}m ×{" "}
        {(auditorium.screen.height.value / 1000).toFixed(1)}m ({aspectLabel(auditorium.screen.aspectRatio.value)})
      </p>
      {auditorium.sample ? <p className="muted">샘플 데이터입니다. 실제 상영관과 치수가 다릅니다.</p> : null}
      <p className="muted">
        치수 {sourced.length}개 중 추정값 {estimatedCount}개
      </p>
      <h2>좌석을 고르세요</h2>
      <SeatMap
        auditorium={auditorium}
        seatHref={(seat) => `/theaters/${theater.id}/${auditorium.id}/seats/${seat.id}`}
      />
    </main>
  );
}
