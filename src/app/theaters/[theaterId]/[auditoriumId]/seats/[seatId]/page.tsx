import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SeatViewer } from "@/features/viewer/SeatViewer";
import { getAuditorium, getTheater } from "@/lib/data/registry";
import { findSeat } from "@/lib/domain/geometry";

/**
 * 좌석 시야 화면.
 * 좌석 수만큼 페이지를 미리 만들지 않으려고 generateStaticParams를 두지 않는다.
 * (Cache Components에서는 그 경우 params 접근을 Suspense 안에서 해야 한다.)
 */
export default function SeatPage({ params }: PageProps<"/theaters/[theaterId]/[auditoriumId]/seats/[seatId]">) {
  return (
    <main className="page">
      <Suspense fallback={<p>불러오는 중</p>}>
        {params.then(({ theaterId, auditoriumId, seatId }) => (
          <SeatView theaterId={theaterId} auditoriumId={auditoriumId} seatId={decodeURIComponent(seatId)} />
        ))}
      </Suspense>
    </main>
  );
}

function SeatView({ theaterId, auditoriumId, seatId }: { theaterId: string; auditoriumId: string; seatId: string }) {
  const theater = getTheater(theaterId);
  const auditorium = getAuditorium(theaterId, auditoriumId);
  const seat = auditorium ? findSeat(auditorium, seatId) : undefined;
  if (!theater || !auditorium || !seat) notFound();

  return (
    <>
      <Link href={`/theaters/${theater.id}/${auditorium.id}`}>
        {theater.branch} {auditorium.name} 좌석 다시 고르기
      </Link>
      <h1>
        {seat.rowLabel}열 {seat.number}번
      </h1>
      <SeatViewer auditorium={auditorium} seatId={seat.id} />
    </>
  );
}
