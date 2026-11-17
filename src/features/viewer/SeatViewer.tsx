"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/features/flow/Frame";
import { readShowQuery, showQueryString } from "@/features/flow/show-query";
import { SeatGrid } from "@/features/seat-map/SeatGrid";
import { TicketPoster } from "@/features/ticket/Ticket";
import { buildTicketInfo } from "@/features/ticket/ticket-info";
import { eyePosition, findSeat } from "@/lib/domain/geometry";
import type { Auditorium, Seat } from "@/lib/domain/types";
import { seatName } from "@/lib/format";
import { bookingLink } from "@/lib/labels";
import type { Movie } from "@/lib/showtimes/types";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { StatureControl } from "./StatureControl";
import type { ScreenVideoStatus } from "./screen-texture";
import styles from "./SeatViewer.module.css";
import { useSeatView } from "./useSeatView";
import { SCREEN_VIDEO_CREDIT, SCREEN_VIDEO_URL } from "./video-source";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className={styles.placeholder}>시야를 불러오고 있어요</div>,
});

interface SeatViewerProps {
  theaterId: string;
  theaterName: string;
  chain: string;
  screenName: string;
  auditorium: Auditorium;
  seatId: string;
  movie: Movie;
}

/** 5 · 시야. 3D 시야가 화면 전체를 채우고 그 위에 정보·조작을 얹는다. */
export function SeatViewer({ theaterId, theaterName, chain, screenName, auditorium, seatId, movie }: SeatViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const show = readShowQuery(searchParams);
  const seat = useMemo(() => findSeat(auditorium, seatId), [auditorium, seatId]);
  const { stature, numbers } = useSeatView(auditorium, seat);
  const [showHeads, setShowHeads] = useState(true);
  const [panelOpen, setPanelOpen] = useState(true);
  const [videoStatus, setVideoStatus] = useState<ScreenVideoStatus>("loading");
  const [playRequest, setPlayRequest] = useState(0);
  const [recenterRequest, setRecenterRequest] = useState(0);
  const [turnedAway, setTurnedAway] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const onVideoStatus = useCallback((status: ScreenVideoStatus) => setVideoStatus(status), []);
  const eye = useMemo(() => (seat ? eyePosition(auditorium, seat, stature) : null), [auditorium, seat, stature]);

  const booking = bookingLink(chain);
  const base = `/theaters/${theaterId}/${auditorium.id}`;
  const backHref = `${base}${showQueryString(show, seat ? { seat: seat.id } : {})}`;

  if (!seat || !eye) return null;

  const info = buildTicketInfo({ movie, theaterName, screenName, seat, date: show.date, time: show.time, numbers });
  const pickSeat = (next: Seat) => {
    if (next.id === seat.id) return;
    router.replace(`${base}/seats/${next.id}${showQueryString(show)}`, { scroll: false });
  };
  const retry = () => {
    setFailed(false);
    setAttempt((n) => n + 1);
  };

  const errorView = (
    <div className={styles.error} role="alert">
      <p className={styles.errorTitle}>시야를 불러오지 못했어요</p>
      <p className={styles.errorBody}>잠시 뒤 다시 시도해 주세요. 계속 안 되면 다른 기기에서 열어 보세요</p>
      <div className={styles.errorActions}>
        <button type="button" className={styles.retry} onClick={retry}>
          다시 시도
        </button>
        <a href={booking.href} target="_blank" rel="noopener noreferrer" className={styles.errorBooking}>
          {booking.label}
        </a>
      </div>
    </div>
  );

  return (
    <div className={styles.stage}>
      {failed ? (
        errorView
      ) : (
        <div className={styles.canvas}>
          <SceneErrorBoundary key={attempt} fallback={null} onError={() => setFailed(true)}>
            <Scene
              auditorium={auditorium}
              seat={seat}
              eye={eye}
              showHeads={showHeads}
              videoUrl={SCREEN_VIDEO_URL}
              playRequest={playRequest}
              onVideoStatus={onVideoStatus}
              recenterRequest={recenterRequest}
              onTurnedAwayChange={setTurnedAway}
            />
          </SceneErrorBoundary>
        </div>
      )}

      <div className={styles.top}>
        <div className={styles.titleBar}>
          <Link href={backHref} className={styles.back} aria-label="뒤로">
            <ChevronLeft />
          </Link>
          <h1 className={styles.title}>
            {screenName} · {seatName(seat)}
          </h1>
        </div>
        {failed ? null : (
          <a href={booking.href} target="_blank" rel="noopener noreferrer" className={styles.booking}>
            {booking.label}
            <ChevronRight />
          </a>
        )}
      </div>

      {failed ? null : (
        <div className={styles.bottom}>
          <div className={styles.left}>
            {numbers ? (
              <dl className={styles.numbers}>
                <div>
                  <dt>시야각</dt>
                  <dd>{numbers.fov}</dd>
                </div>
                <div>
                  <dt>올려보기</dt>
                  <dd>{numbers.up}</dd>
                </div>
                <div>
                  <dt>스크린까지</dt>
                  <dd>{numbers.dist}</dd>
                </div>
              </dl>
            ) : null}
            <p className={styles.credit}>
              {auditorium.sample ? "샘플 상영관이라 실제와 달라요 · " : auditorium.estimated ? "좌석표로 추정한 크기예요 · " : ""}
              {SCREEN_VIDEO_CREDIT}
            </p>
          </div>

          <div className={styles.right}>
            {panelOpen ? (
              <section id="seat-ticket-panel" className={styles.panel} aria-label="내 티켓과 좌석표">
                <div className={styles.ticketRow}>
                  <div className={styles.miniTicket}>
                    <TicketPoster
                      width={84}
                      posterUrl={info.posterUrl}
                      bandDate={info.bandDate}
                      bandTheater={`${theaterName} · ${screenName}`}
                      alt={`${movie.title} 티켓`}
                    />
                  </div>
                  <div className={styles.ticketText}>
                    <span className={styles.ticketNo}>No. {info.ticketNo}</span>
                    <span className={styles.ticketSeat}>{info.seatCode}</span>
                    <span className={styles.ticketLine}>
                      {movie.title}
                      {show.time ? ` · ${show.time}` : ""}
                    </span>
                    <span className={styles.ticketLine}>
                      {theaterName} {screenName}
                    </span>
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.miniMap}>
                  <SeatGrid auditorium={auditorium} selectedSeatId={seat.id} onSelect={pickSeat} tone="dark" maxSeat={11} />
                </div>
              </section>
            ) : null}
            <div className={styles.controls}>
              {turnedAway ? (
                <button type="button" className={styles.control} onClick={() => setRecenterRequest((n) => n + 1)}>
                  스크린 보기
                </button>
              ) : null}
              {videoStatus === "blocked" ? (
                <button type="button" className={styles.control} onClick={() => setPlayRequest((n) => n + 1)}>
                  영상 재생
                </button>
              ) : null}
              <StatureControl />
              <button type="button" className={styles.control} aria-pressed={!showHeads} onClick={() => setShowHeads((v) => !v)}>
                {showHeads ? "앞사람 끄기" : "앞사람 켜기"}
              </button>
              <button
                type="button"
                className={styles.control}
                aria-expanded={panelOpen}
                aria-controls="seat-ticket-panel"
                onClick={() => setPanelOpen((v) => !v)}
              >
                {panelOpen ? "좌석·티켓 숨기기" : "좌석·티켓 보기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
