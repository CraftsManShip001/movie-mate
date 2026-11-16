import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TicketScene } from "@/features/ticket/TicketScene";
import { getSeatContext } from "@/lib/data/flow-context";

/** 4 · 티켓 (지나가는 장면, 끝나면 5번으로 자동 이동) */
export default function TicketPage({ params }: PageProps<"/theaters/[theaterId]/[auditoriumId]/seats/[seatId]/ticket">) {
  return (
    <Suspense fallback={<div style={{ position: "fixed", inset: 0, background: "var(--color-stage)" }} />}>
      {params.then(({ theaterId, auditoriumId, seatId }) => (
        <Ticket theaterId={theaterId} auditoriumId={auditoriumId} seatId={decodeURIComponent(seatId)} />
      ))}
    </Suspense>
  );
}

function Ticket({ theaterId, auditoriumId, seatId }: { theaterId: string; auditoriumId: string; seatId: string }) {
  const context = getSeatContext(theaterId, auditoriumId, seatId);
  if (!context) notFound();
  return (
    <TicketScene
      theaterId={context.theater.id}
      theaterName={context.theaterName}
      screenName={context.screenName}
      auditorium={context.auditorium}
      seatId={context.seat.id}
      movie={context.movie}
    />
  );
}
