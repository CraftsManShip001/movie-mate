import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SeatPicker, SeatPickerSkeleton } from "@/features/seat-picker/SeatPicker";
import { getAllAuditoriums, getAuditorium, getTheater } from "@/lib/data/registry";
import { getShowtimesWithMovie } from "@/lib/data/now-showing";
import { screenNameForAuditorium } from "@/lib/data/showtimes";
import { hasLotteLive } from "@/lib/live/lotte";

export function generateStaticParams() {
  return getAllAuditoriums().map((a) => ({ theaterId: a.theaterId, auditoriumId: a.id }));
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
  const movie = (await getShowtimesWithMovie(theater.id))?.movie;
  const backHref = `/theaters/${theater.id}`;

  // 쿼리(날짜·시각·고른 자리)는 브라우저에서 읽으므로 그 부분만 Suspense로 감싼다
  return (
    <Suspense fallback={<SeatPickerSkeleton title={title} backHref={backHref} />}>
      <SeatPicker
        theaterId={theater.id}
        title={title}
        movieTitle={movie?.title ?? ""}
        auditorium={auditorium}
        chain={theater.chain}
        live={hasLotteLive(theater.id)}
      />
    </Suspense>
  );
}
