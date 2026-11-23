import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { TicketScene } from "@/features/ticket/TicketScene";
import { getSeatContext } from "@/lib/data/flow-context";

export const metadata: Metadata = { title: "티켓", robots: { index: false, follow: false } };

/** 4 · 티켓 (지나가는 장면, 끝나면 5번으로 자동 이동) */
export default function TicketPage({ params, searchParams }: PageProps<"/theaters/[theaterId]/[auditoriumId]/seats/[seatId]/ticket">) {
  return (
    <Suspense fallback={<div style={{ position: "fixed", inset: 0, background: "var(--color-stage)" }} />}>
      {Promise.all([params, searchParams]).then(([{ theaterId, auditoriumId, seatId }, query]) => (
        <Ticket theaterId={theaterId} auditoriumId={auditoriumId} seatId={decodeURIComponent(seatId)} query={query} />
      ))}
    </Suspense>
  );
}

async function Ticket({
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
  // 영화(실제 회차)가 없으면 티켓 없이 바로 시야로 간다
  if (!context.movie) {
    const rest = new URLSearchParams(Object.entries(query).flatMap(([k, v]) => (typeof v === "string" ? [[k, v]] : [])));
    const qs = rest.toString();
    redirect(`/theaters/${theaterId}/${auditoriumId}/seats/${encodeURIComponent(seatId)}${qs ? `?${qs}` : ""}`);
  }
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
