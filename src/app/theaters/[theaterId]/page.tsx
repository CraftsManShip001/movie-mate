import type { Metadata } from "next";
import { SHARE_IMAGE } from "@/lib/site";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense, type ReactNode } from "react";
import { Frame, FrameHeader } from "@/features/flow/Frame";
import { HallPicker, type HallOption } from "@/features/hall-picker/HallPicker";
import { ShowtimePicker } from "@/features/showtimes/ShowtimePicker";
import { getAuditoriums, getListedTheaters, getTheater } from "@/lib/data/registry";
import { screenNameForAuditorium } from "@/lib/data/showtimes";
import { listSeats } from "@/lib/domain/geometry";
import { nowInSeoul } from "@/lib/format";
import { formatLabel } from "@/lib/labels";
import { getLiveSchedule, hasLive } from "@/lib/live";

export function generateStaticParams() {
  return getListedTheaters().map((theater) => ({ theaterId: theater.id }));
}

export async function generateMetadata({ params }: PageProps<"/theaters/[theaterId]">): Promise<Metadata> {
  const theater = getTheater((await params).theaterId);
  if (!theater) return {};
  const name = `${theater.chain} ${theater.branch}`;
  const formats = [...new Set(getAuditoriums(theater.id).map((a) => a.format).filter((f) => f !== "standard").map(formatLabel))];
  const description = `${name} 상영관 ${theater.auditoriumIds.length}곳${formats.length ? `(${formats.join("·")})` : ""}의 좌석 배치도와 자리마다 보이는 스크린 시야를 3D로 미리 보세요.`;
  return {
    title: `${name} 좌석 시야`,
    description,
    alternates: { canonical: `/theaters/${theater.id}` },
    openGraph: { title: `${name} 좌석 시야`, description, url: `/theaters/${theater.id}`, images: [SHARE_IMAGE] },
  };
}

/**
 * 2 · 상영 시간 또는 상영관.
 * - 실제 시간표가 있는 극장(롯데시네마·메가박스): 영화·날짜·시간을 고른다.
 * - 없는 극장(CGV)이나 시간표를 받지 못했을 때: 영화·시간 없이 관만 고른다.
 * 주소 값(params)은 Suspense 안에서 읽는다(Cache Components).
 */
export default function TheaterPage({ params }: PageProps<"/theaters/[theaterId]">) {
  return (
    <Suspense fallback={<Frame header={<FrameHeader title="" backHref="/" />}>{null}</Frame>}>
      {params.then(({ theaterId }) => (
        <TheaterContent theaterId={theaterId} />
      ))}
    </Suspense>
  );
}

function hallOptions(theaterId: string, auditoriumIds: string[]): HallOption[] {
  const order = new Map(auditoriumIds.map((id, i) => [id, i]));
  return [...getAuditoriums(theaterId)]
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
    .map((a) => ({
      id: a.id,
      name: screenNameForAuditorium(theaterId, a.id) ?? a.name,
      meta: [a.format === "standard" ? null : formatLabel(a.format), `${listSeats(a).length}석`].filter(Boolean).join(" · "),
    }));
}

async function TheaterContent({ theaterId }: { theaterId: string }) {
  const theater = getTheater(theaterId);
  if (!theater) notFound();
  const info = { id: theater.id, name: `${theater.chain} ${theater.branch}`, chain: theater.chain };
  const halls = <HallPicker theater={info} halls={hallOptions(theater.id, theater.auditoriumIds)} />;

  if (!hasLive(theater.id)) return halls;

  const fallback = (
    <Frame header={<FrameHeader title={info.name} backHref="/" />}>
      <span className="visually-hidden">상영 시간을 불러오고 있어요</span>
    </Frame>
  );
  return (
    <Suspense fallback={fallback}>
      <ShowtimesToday theater={info} halls={halls} />
    </Suspense>
  );
}

/** "오늘"과 지금 시각은 요청 때마다 서울 시간으로 계산하고, 그때 실제 시간표를 받아 온다. */
async function ShowtimesToday({
  theater,
  halls,
}: {
  theater: { id: string; name: string; chain: string };
  halls: ReactNode;
}) {
  await connection();
  const { todayIso, minutes } = nowInSeoul(new Date());
  const live = await getLiveSchedule(theater.id, todayIso);
  const movie = live?.movies?.[0];
  if (!live || !movie) return halls;
  return <ShowtimePicker theater={theater} schedule={live} movie={movie} todayIso={todayIso} nowMinutes={minutes} />;
}
