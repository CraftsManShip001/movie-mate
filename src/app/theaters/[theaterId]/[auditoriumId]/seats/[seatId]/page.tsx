import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SeatViewer } from "@/features/viewer/SeatViewer";
import { getSeatContext } from "@/lib/data/flow-context";

/**
 * 5 · 시야.
 * 좌석 수만큼 페이지를 미리 만들지 않으려고 generateStaticParams를 두지 않는다.
 * (Cache Components에서는 그 경우 params 접근을 Suspense 안에서 해야 한다.)
 */
export default function SeatPage({ params }: PageProps<"/theaters/[theaterId]/[auditoriumId]/seats/[seatId]">) {
  return (
    <Suspense fallback={<div style={{ position: "fixed", inset: 0, background: "var(--color-stage)" }} />}>
      {params.then(({ theaterId, auditoriumId, seatId }) => (
        <SeatView theaterId={theaterId} auditoriumId={auditoriumId} seatId={decodeURIComponent(seatId)} />
      ))}
    </Suspense>
  );
}

function SeatView({ theaterId, auditoriumId, seatId }: { theaterId: string; auditoriumId: string; seatId: string }) {
  const context = getSeatContext(theaterId, auditoriumId, seatId);
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
