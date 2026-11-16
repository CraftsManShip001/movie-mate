import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense, type ComponentProps } from "react";
import { Frame, FrameHeader, frameStyles } from "@/features/flow/Frame";
import { ShowtimePicker } from "@/features/showtimes/ShowtimePicker";
import { getTheater, getTheaters } from "@/lib/data/registry";
import { getMovie, getSchedule } from "@/lib/data/showtimes";
import { nowInSeoul } from "@/lib/format";

export function generateStaticParams() {
  return getTheaters().map((theater) => ({ theaterId: theater.id }));
}

/** 2 · 상영 시간. 주소 값(params)은 Suspense 안에서 읽는다(Cache Components). */
export default function TheaterPage({ params }: PageProps<"/theaters/[theaterId]">) {
  return (
    <Suspense fallback={<Frame header={<FrameHeader title="" backHref="/" />}>{null}</Frame>}>
      {params.then(({ theaterId }) => (
        <TheaterContent theaterId={theaterId} />
      ))}
    </Suspense>
  );
}

function TheaterContent({ theaterId }: { theaterId: string }) {
  const theater = getTheater(theaterId);
  if (!theater) notFound();
  const name = `${theater.chain} ${theater.branch}`;
  const schedule = getSchedule(theater.id);
  const movie = schedule ? getMovie(schedule.movieId) : undefined;

  if (!schedule || !movie) {
    return (
      <Frame header={<FrameHeader title={name} backHref="/" />}>
        <div className={frameStyles.empty}>
          <p className={frameStyles.emptyTitle}>아직 상영 시간표가 없어요</p>
          <p className={frameStyles.emptyBody}>시간표가 들어오는 대로 보여 드릴게요</p>
        </div>
      </Frame>
    );
  }

  const fallback = (
    <Frame header={<FrameHeader title={name} backHref="/" />}>
      <span className="visually-hidden">상영 시간을 불러오고 있어요</span>
    </Frame>
  );

  return (
    <Suspense fallback={fallback}>
      <ShowtimesToday
        theater={{ id: theater.id, name, chain: theater.chain }}
        schedule={schedule}
        movie={movie}
      />
    </Suspense>
  );
}

/** "오늘"과 지금 시각은 요청 때마다 서울 시간으로 계산한다 */
async function ShowtimesToday(props: Omit<ComponentProps<typeof ShowtimePicker>, "todayIso" | "nowMinutes">) {
  await connection();
  const { todayIso, minutes } = nowInSeoul(new Date());
  return <ShowtimePicker {...props} todayIso={todayIso} nowMinutes={minutes} />;
}
