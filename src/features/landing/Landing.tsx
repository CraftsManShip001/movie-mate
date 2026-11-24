import { connection } from "next/server";
import { Suspense } from "react";
import { LogoMark } from "@/features/brand/Logo";
import { SCREEN_VIDEO_CREDIT } from "@/features/viewer/video-source";
import { getAuditorium, getAuditoriums, getListedTheaters } from "@/lib/data/registry";
import { listSeats } from "@/lib/domain/geometry";
import { nowInSeoul, seatName } from "@/lib/format";
import { CHAINS } from "@/lib/labels";
import { getRanking } from "@/lib/live/ranking";
import { LandingLink, RecentSeatRow } from "./LandingLinks";
import { PlaySeatMap } from "./PlaySeatMap";
import styles from "./Landing.module.css";

/**
 * 랜딩(/). 확정 시안 design/landing/LandingC1.dc.html (DESIGN.md "랜딩 페이지").
 * 첫 화면(큰 문장 + 실제 좌석표) → 지원 범위 숫자 → 지금 많이 보는 영화 → 마무리.
 * "좌석 찾아보기"는 극장 선택(/theaters)으로 간다.
 */

/** 첫 화면 좌석표: CGV 용산아이파크몰 IMAX관, 처음 고른 자리 N열 23번 */
const DEMO = { theaterId: "cgv-yongsan-ipark-mall", auditoriumId: "imax", seatId: "N23" } as const;

export function Landing() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.brand}>
            <LogoMark size={28} label="movie mate" />
            <span className={styles.brandName}>무비메이트</span>
          </span>
        </div>
      </header>
      <RecentSeatRow />

      <main>
        <section className={`${styles.inner} ${styles.hero}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              어느 자리가
              <br />
              잘 보일까요?
            </h1>
            <p className={styles.heroLine}>CGV·메가박스·롯데시네마 좌석에서 보이는 스크린을 미리 보여 드려요.</p>
            <LandingLink href="/theaters" target="start" className={`${styles.cta} ${styles.heroCta}`}>
              좌석 찾아보기
            </LandingLink>
          </div>
          <div className={styles.seatMapBox}>
            <DemoSeatMap />
          </div>
          <LandingLink href="/theaters" target="start" className={`${styles.cta} ${styles.heroCtaPhone}`}>
            좌석 찾아보기
          </LandingLink>
        </section>

        <Coverage />

        <section className={`${styles.inner} ${styles.section}`} aria-labelledby="ranking-title">
          <div className={styles.sectionHead}>
            <h2 id="ranking-title" className={styles.sectionTitle}>
              지금 많이 보는 영화
            </h2>
            <span className={styles.sectionNote}>누르면 극장을 골라 시간표를 봐요</span>
          </div>
          <Suspense fallback={<RankingSkeleton />}>
            <Ranking />
          </Suspense>
        </section>

        <section className={styles.inner}>
          <div className={styles.closing}>
            <h2 className={styles.closingTitle}>내 자리, 미리 앉아 볼까요?</h2>
            <LandingLink href="/theaters" target="start_bottom" className={styles.cta}>
              좌석 찾아보기
            </LandingLink>
          </div>
        </section>
      </main>

      <footer className={`${styles.inner} ${styles.footer}`}>
        <p>좌석 배치와 크기는 예매 화면을 바탕으로 추정했어요. 예매는 각 영화관 사이트에서 해요.</p>
        <p>영화 순위는 메가박스 코엑스·롯데시네마 월드타워의 오늘 상영 횟수로 매겨요.</p>
        <p>{SCREEN_VIDEO_CREDIT}</p>
      </footer>
    </div>
  );
}

/** 실제 좌석 데이터로 그린 좌석표. 누르면 고른 자리만 바뀌고 다른 화면으로 가지 않는다. */
function DemoSeatMap() {
  const auditorium = getAuditorium(DEMO.theaterId, DEMO.auditoriumId);
  if (!auditorium) return null;
  const seats = listSeats(auditorium).map((seat) => ({
    id: seat.id,
    name: seatName(seat),
    row: seat.rowIndex,
    column: seat.columnIndex,
    span: Math.max(1, Math.round(seat.span)),
  }));
  const columns = Math.max(...auditorium.rows.map((r) => r.cells.length));
  return <PlaySeatMap seats={seats} rows={auditorium.rows.length} columns={columns} initialId={DEMO.seatId} />;
}

/** 시야를 볼 수 있는 극장(상영관이 하나라도 있는 곳)과 상영관 수 */
function Coverage() {
  const theaters = getListedTheaters();
  const rows = CHAINS.map((chain) => {
    const halls = theaters.filter((t) => t.chain === chain).map((t) => getAuditoriums(t.id).length).filter((n) => n > 0);
    return { chain, theaters: halls.length, halls: halls.reduce((a, b) => a + b, 0) };
  });
  const total = rows.reduce((acc, r) => ({ theaters: acc.theaters + r.theaters, halls: acc.halls + r.halls }), { theaters: 0, halls: 0 });
  const n = (v: number) => v.toLocaleString("ko-KR");
  return (
    <section className={`${styles.inner} ${styles.coverage}`} aria-labelledby="coverage-title">
      <h2 id="coverage-title" className={styles.coverageTitle}>
        전국 {n(total.theaters)}개 극장,
        <br />
        {n(total.halls)}개 상영관<span className={styles.coverageTail}>의</span>
        <br className={styles.coverageTail} />
        <span className={styles.coverageTail}>자리를 볼 수 있어요</span>
      </h2>
      <dl className={styles.coverageList}>
        {rows.map((r) => (
          <div key={r.chain} className={styles.coverageRow}>
            <dt>{r.chain}</dt>
            <dd>
              {n(r.theaters)}곳 · {n(r.halls)}관
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

async function Ranking() {
  await connection();
  const { todayIso } = nowInSeoul(new Date());
  const movies = await getRanking(todayIso);
  if (movies.length === 0) {
    return <p className={styles.rankingEmpty}>지금은 상영 정보를 불러오지 못했어요. 극장을 고르면 시간표를 볼 수 있어요.</p>;
  }
  return (
    <ol className={styles.ranking}>
      {movies.map((m, i) => (
        <li key={`${m.theaterId}-${m.movieId}`}>
          {/* 극장 고르기로 간다. 고른 극장의 시간표에서 이 영화가 미리 골라진다(영화관마다 id가 달라 제목으로 넘긴다) */}
          <LandingLink href={`/theaters?title=${encodeURIComponent(m.title)}`} target="movie" movieId={m.movieId} className={styles.movie}>
            {/* 영화관 이미지 서버의 포스터. 크기가 제각각이라 2:3 칸에 맞춰 자른다 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.posterUrl} alt={`${m.title} 포스터`} className={styles.poster} loading="lazy" decoding="async" />
            <span className={styles.movieInfo}>
              <span className={styles.rank}>{i + 1}</span>
              <span className={styles.movieText}>
                <span className={styles.movieTitle}>{m.title}</span>
                <span className={styles.movieMeta}>{[m.rating, m.runtimeMin ? `${m.runtimeMin}분` : null].filter(Boolean).join(" · ")}</span>
              </span>
            </span>
          </LandingLink>
        </li>
      ))}
    </ol>
  );
}

function RankingSkeleton() {
  return (
    <>
      <ol className={styles.ranking} aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i}>
            <span className={styles.movie}>
              <span className={`${styles.poster} ${styles.posterLoading}`} />
            </span>
          </li>
        ))}
      </ol>
      <span className="visually-hidden">영화 순위를 불러오고 있어요</span>
    </>
  );
}
