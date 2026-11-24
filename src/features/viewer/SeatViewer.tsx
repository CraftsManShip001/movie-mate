"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "@/features/flow/Frame";
import { readShowQuery, showQueryString } from "@/features/flow/show-query";
import { useLiveShow } from "@/features/flow/useLiveShow";
import { saveRecentSeat } from "@/features/landing/recent-seat";
import { SeatGrid } from "@/features/seat-map/SeatGrid";
import { FROM_PICKER_KEY } from "@/features/seat-picker/SeatPicker";
import { TicketPoster } from "@/features/ticket/Ticket";
import { buildTicketInfo } from "@/features/ticket/ticket-info";
import { track } from "@/lib/analytics";
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

/** 휴대폰 폭(720px 이하): 좌석·티켓 패널이 화면을 거의 덮으므로 처음엔 접어 두고 3D 시야부터 보여 준다 */
const PHONE_QUERY = "(max-width: 720px)";
function subscribePhone(onChange: () => void) {
  const query = window.matchMedia(PHONE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function useIsPhone(): boolean {
  return useSyncExternalStore(
    subscribePhone,
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false,
  );
}

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
  /** 실제 회차의 영화. 없으면(CGV 등) 티켓 없이 좌석표만 보여 준다 */
  movie: Movie | null;
}

/** 5 · 시야. 3D 시야가 화면 전체를 채우고 그 위에 정보·조작을 얹는다. */
export function SeatViewer({ theaterId, theaterName, chain, screenName, auditorium, seatId, movie }: SeatViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const show = readShowQuery(searchParams);
  const seat = useMemo(() => findSeat(auditorium, seatId), [auditorium, seatId]);
  const { stature, numbers } = useSeatView(auditorium, seat);
  const [showHeads, setShowHeads] = useState(true);
  // null = 아직 직접 고르지 않음: 데스크톱은 펼치고 휴대폰은 접는다
  const [panelChoice, setPanelChoice] = useState<boolean | null>(null);
  const isPhone = useIsPhone();
  const panelOpen = panelChoice ?? !isPhone;
  const [videoStatus, setVideoStatus] = useState<ScreenVideoStatus>("loading");
  const [playRequest, setPlayRequest] = useState(0);
  const [recenterRequest, setRecenterRequest] = useState(0);
  const [turnedAway, setTurnedAway] = useState(false);
  const [failed, setFailed] = useState(false);
  // 3D 첫 장면을 그릴 때까지(큰 관은 몇 초) 검은 화면 대신 불러오는 중 표시를 둔다
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const [attempt, setAttempt] = useState(0);
  const onVideoStatus = useCallback((status: ScreenVideoStatus) => {
    setVideoStatus(status);
    if (status !== "loading") track("video_status", { status });
  }, []);
  const eye = useMemo(() => (seat ? eyePosition(auditorium, seat, stature) : null), [auditorium, seat, stature]);
  // 실제 회차(영화가 있을 때)면 미니 좌석표에도 팔린 자리를 표시한다
  const { sold } = useLiveShow(theaterId, auditorium.id, show.date, show.seq, movie != null);

  const booking = bookingLink(chain);
  const base = `/theaters/${theaterId}/${auditorium.id}`;
  const backHref = `${base}${showQueryString(show, seat ? { seat: seat.id } : {})}`;

  useEffect(() => {
    track("view_3d", { chain, theater_id: theaterId, auditorium_id: auditorium.id, seat_id: seatId });
  }, [chain, theaterId, auditorium.id, seatId]);

  // 랜딩의 "이어 보기" 줄에 쓸 마지막 자리
  useEffect(() => {
    if (!seat) return;
    saveRecentSeat({ theaterId, auditoriumId: auditorium.id, seatId: seat.id, theaterName, screenName, seatName: seatName(seat) });
  }, [theaterId, auditorium.id, seat, theaterName, screenName]);

  // Esc: 뒤로(좌석 화면). 3D 화면은 키보드로 다른 할 일이 없어 바로 돌아간다
  const backRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) backRef.current?.click();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!seat || !eye) return null;

  // 팔린 자리는 내 티켓이 될 수 없으므로 티켓 없이 좌석표만 보여 준다
  const seatSold = sold?.has(seat.id) ?? false;
  const info = movie && !seatSold && buildTicketInfo({ movie, theaterName, screenName, seat, date: show.date, time: show.time, numbers });
  const pickSeat = (next: Seat) => {
    if (next.id === seat.id) return;
    track("change_seat", { auditorium_id: auditorium.id, seat_id: next.id });
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
        <a
          href={booking.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.errorBooking}
          onClick={() => track("booking_click", { chain, from: "viewer_error" })}
        >
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
              onReady={onReady}
            />
          </SceneErrorBoundary>
          {ready ? null : (
            <div className={`${styles.placeholder} ${styles.loadingCover}`} role="status">
              시야를 그리고 있어요
            </div>
          )}
        </div>
      )}

      <div className={styles.top}>
        <div className={styles.titleBar}>
          <Link
            ref={backRef}
            href={backHref}
            className={styles.back}
            aria-label="뒤로"
            onClick={(event) => {
              // 좌석 화면에서 왔으면 기록을 쌓지 않고 돌아간다(브라우저 뒤로 가기가 다시 시야로 오지 않게)
              let fromPicker = false;
              try {
                fromPicker = sessionStorage.getItem(FROM_PICKER_KEY) === base;
                sessionStorage.removeItem(FROM_PICKER_KEY);
              } catch {
                fromPicker = false;
              }
              if (fromPicker && window.history.length > 1) {
                event.preventDefault();
                router.back();
              }
            }}
          >
            <ChevronLeft />
          </Link>
          <h1 className={styles.title}>
            {screenName} · {seatName(seat)}
          </h1>
        </div>
        {failed ? null : (
          <a
            href={booking.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.booking}
            aria-label={`${booking.label} (새 창)`}
            onClick={() => track("booking_click", { chain, from: "viewer" })}
          >
            <span className={styles.bookingLong}>{booking.label}</span>
            <span className={styles.bookingShort}>예매</span>
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
              <section id="seat-ticket-panel" className={styles.panel} aria-label={info ? "내 티켓과 좌석표" : "좌석표"}>
                {movie && info ? (
                  <>
                    <div className={styles.ticketRow}>
                      <div className={styles.miniTicket}>
                        <TicketPoster
                          width={84}
                          posterUrl={info.posterUrl}
                          fallbackUrl={info.posterFallbackUrl}
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
                  </>
                ) : null}
                <div className={styles.miniMap}>
                  <SeatGrid
                    auditorium={auditorium}
                    selectedSeatId={seat.id}
                    onSelect={pickSeat}
                    tone="dark"
                    maxSeat={11}
                    soldSeatIds={sold}
                  />
                </div>
              </section>
            ) : null}
            <div className={styles.controls}>
              {turnedAway ? (
                <button type="button" className={styles.control} onClick={() => {
                    setRecenterRequest((n) => n + 1);
                    track("recenter_view", {});
                  }}>
                  스크린 보기
                </button>
              ) : null}
              {videoStatus === "blocked" ? (
                <button type="button" className={styles.control} onClick={() => {
                    setPlayRequest((n) => n + 1);
                    track("retry_video", {});
                  }}>
                  영상 재생
                </button>
              ) : null}
              <StatureControl />
              <button type="button" className={styles.control} aria-pressed={!showHeads} onClick={() => {
                  setShowHeads(!showHeads);
                  track("toggle_heads", { on: !showHeads });
                }}>
                {showHeads ? "앞사람 끄기" : "앞사람 켜기"}
              </button>
              <button
                type="button"
                className={styles.control}
                aria-expanded={panelOpen}
                aria-controls="seat-ticket-panel"
                onClick={() => {
                  setPanelChoice(!panelOpen);
                  track("open_seat_map", { open: !panelOpen });
                }}
              >
                {panelOpen ? (info ? "좌석·티켓 숨기기" : "좌석표 숨기기") : info ? "좌석·티켓 보기" : "좌석표 보기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
