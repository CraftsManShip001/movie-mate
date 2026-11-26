"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Frame, FrameHeader, frameStyles } from "@/features/flow/Frame";
import { readShowQuery, showQueryString } from "@/features/flow/show-query";
import { useLiveShow } from "@/features/flow/useLiveShow";
import { SeatGrid, SeatGridSkeleton } from "@/features/seat-map/SeatGrid";
import { SCREEN_VIDEO_CREDIT } from "@/features/viewer/video-source";
import { useSeatView } from "@/features/viewer/useSeatView";
import { track } from "@/lib/analytics";
import { findSeat } from "@/lib/domain/geometry";
import type { Auditorium, Seat } from "@/lib/domain/types";
import { asOfLabel, formatMonthDay, seatName, type ViewNumbers } from "@/lib/format";
import { bookingLink } from "@/lib/labels";
import { LiveSeatPreview } from "./LiveSeatPreview";
import styles from "./SeatPicker.module.css";

interface SeatPickerProps {
  theaterId: string;
  /** "CGV 용산아이파크몰 · IMAX관" */
  title: string;
  auditorium: Auditorium;
  /** 영화관 브랜드. 예매 링크에 쓴다. */
  chain: string;
  /** 실제 시간표(롯데시네마·메가박스)가 있는 극장인지. 그러면 고른 회차의 영화와 팔린 좌석을 받아 온다. */
  live: boolean;
}

/** 3 · 좌석. 고른 자리는 주소(?seat=J14)에 남겨 4·5번에서 뒤로 왔을 때 그대로 보인다. */
export function SeatPicker({ theaterId, title, auditorium, chain, live }: SeatPickerProps) {
  const searchParams = useSearchParams();
  const show = readShowQuery(searchParams);
  const [seatId, setSeatId] = useState<string | null>(() => searchParams.get("seat"));
  const seat = useMemo(() => (seatId ? findSeat(auditorium, seatId) : undefined), [auditorium, seatId]);
  const { stature, numbers } = useSeatView(auditorium, seat);
  const liveShow = useLiveShow(theaterId, auditorium.id, show.date, show.seq, live);
  const sold = liveShow.sold;
  const seatSold = seat ? (sold?.has(seat.id) ?? false) : false;
  const booking = bookingLink(chain);

  // 주소로 미리 고른 자리(뒤로 가기 등)가 좌석표 아래쪽이면 그 자리가 보이게 스크롤한다
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!seatId) return;
    mapRef.current?.querySelector('[aria-pressed="true"]')?.scrollIntoView({ block: "center", inline: "nearest" });
    // 처음 한 번만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pick = (next: Seat) => {
    setSeatId(next.id);
    window.history.replaceState(null, "", showQueryString(show, { seat: next.id }));
  };

  // 영화 제목은 실제 시간표에서 고른 회차일 때만 쓴다(CGV는 관만 고르므로 없다)
  const caption = [liveShow.show?.movie.title ?? "", show.date ? `${formatMonthDay(show.date)}${show.time ? ` ${show.time}` : ""}` : null]
    .filter(Boolean)
    .join(" · ");
  const base = `/theaters/${theaterId}/${auditorium.id}`;
  // 2번 화면이 이 회차를 다시 골라 두도록 관·날짜·시각·회차를 넘긴다(회차 번호는 관·날짜마다 1부터라 혼자서는 못 찾는다)
  const backHref = `/theaters/${theaterId}${show.seq != null ? showQueryString(show, { hall: auditorium.id }) : ""}`;
  // 아래 "시야 확인하러 가기"와 미리보기의 전체 보기 아이콘이 같은 곳으로 간다
  const viewHref = seat ? `${base}/seats/${seat.id}${liveShow.show && !seatSold ? "/ticket" : ""}${showQueryString(show)}` : null;
  const goView = () => {
    if (!seat) return;
    markFromPicker(base);
    track("select_seat", { theater_id: theaterId, auditorium_id: auditorium.id, seat_id: seat.id });
  };
  const isDesktop = useIsDesktop();

  return (
    <Frame
      header={<FrameHeader title={title} backHref={backHref} />}
      bottom={
        <>
          {seat ? (
            // 데스크톱은 오른쪽 패널에 고른 자리가 크게 있으므로 휴대폰에서만 보인다
            <div className={`${frameStyles.summary} ${styles.phoneOnly}`}>
              <span className={frameStyles.summaryLabel}>고른 자리</span>
              <span className={frameStyles.summaryValue}>{seatName(seat)}</span>
            </div>
          ) : (
            <span className={`${frameStyles.summaryLabel} ${styles.phoneOnly}`}>자리를 골라 주세요</span>
          )}
          <div className={`${frameStyles.actions} ${styles.actions}`}>
            {/* 상영 정보 없이 들어와도(CGV·주소로 바로) 예매는 영화관 사이트로 보낸다 */}
            <a
              href={booking.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${frameStyles.secondary} ${styles.booking}`}
              aria-label={`${booking.label} (새 창)`}
              onClick={() => track("booking_click", { chain, from: "seat_picker" })}
            >
              {chain}에서 예매
              <ExternalIcon />
            </a>
            {viewHref ? (
              <Link href={viewHref} className={frameStyles.cta} onClick={goView}>
                시야 확인하러 가기
              </Link>
            ) : (
              <button type="button" className={frameStyles.cta} disabled>
                시야 확인하러 가기
              </button>
            )}
          </div>
        </>
      }
    >
      <div className={styles.layout}>
        <div className={styles.map} ref={mapRef}>
          <SeatGrid
            auditorium={auditorium}
            selectedSeatId={seat?.id ?? null}
            onSelect={pick}
            minSeat={12}
            showScreen
            soldSeatIds={sold}
          />
          {sold ? <SeatLegend /> : null}
        </div>
        <aside className={styles.panel} aria-live="polite">
          <span className={styles.caption}>{caption}</span>
          <p className={styles.seatName}>{seat ? seatName(seat) : "자리를 골라 주세요"}</p>
          {/* 미리보기는 데스크톱에서만. 휴대폰은 좁은 화면에 3D 를 하나 더 그리기보다 바로 시야 화면으로 보낸다 */}
          {!isDesktop ? null : seat && viewHref ? (
            <div className={styles.preview}>
              <LiveSeatPreview auditorium={auditorium} seat={seat} statureCm={stature} />
              <Link href={viewHref} className={styles.expand} onClick={goView} aria-label="시야 확인하러 가기" title="크게 보기">
                <ExpandIcon />
              </Link>
            </div>
          ) : (
            <div className={`${styles.preview} ${styles.previewEmpty}`}>
              <span>좌석표에서 자리를 누르면 여기서 시야를 미리 볼 수 있어요</span>
            </div>
          )}
          {numbers ? <ViewNumbersRow numbers={numbers} /> : null}
          <div className={styles.notes}>
            {seatSold ? <p className={styles.note}>이미 팔린 자리라 티켓 없이 시야만 보여 드려요</p> : null}
            {live && show.seq != null ? (
              <p className={styles.note}>
                {liveShow.loading
                  ? "팔린 자리를 불러오고 있어요"
                  : liveShow.show?.booked
                    ? `팔린 자리 ${liveShow.show.booked.length}석 · ${liveShow.show.source} ${asOfLabel(liveShow.show.fetchedAt)}`
                    : "팔린 자리를 불러오지 못했어요"}
              </p>
            ) : null}
            {isDesktop && seat ? <p className={styles.note}>{SCREEN_VIDEO_CREDIT}</p> : null}
            {auditorium.sample ? (
              <p className={styles.note}>샘플 상영관이라 실제 치수와 달라요</p>
            ) : auditorium.estimated ? (
              <p className={styles.note}>좌석표로 추정한 크기라 실제와 조금 다를 수 있어요</p>
            ) : null}
          </div>
        </aside>
      </div>
    </Frame>
  );
}

/** 미리보기 우하단의 전체 보기(바깥으로 벌어지는 네 모서리) */
function ExpandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 7V3h4M11 3h4v4M15 11v4h-4M7 15H3v-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DESKTOP_QUERY = "(min-width: 961px)";
function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
/** 오른쪽 패널이 좌석표 옆에 서는 폭(CSS 의 960px 경계와 같다). 서버에서는 false */
function useIsDesktop(): boolean {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/** 영화관 사이트로 나간다는 표시(새 창) */
function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className={styles.externalIcon}>
      <path d="M5 2.5h6.5V9M11.5 2.5 3 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 팔린 자리를 받아 왔을 때만 좌석표 아래에 붙는 색 설명 */
function SeatLegend() {
  return (
    <ul className={styles.legend} aria-label="좌석 표시">
      <li>
        <span className={`${styles.swatch} ${styles.swatchFree}`} aria-hidden="true" />
        빈 자리
      </li>
      <li>
        <span className={`${styles.swatch} ${styles.swatchSold}`} aria-hidden="true" />
        팔린 자리
      </li>
      <li>
        <span className={`${styles.swatch} ${styles.swatchOn}`} aria-hidden="true" />
        고른 자리
      </li>
    </ul>
  );
}

function ViewNumbersRow({ numbers }: { numbers: ViewNumbers }) {
  return (
    <dl className={styles.numbers}>
      <div>
        <dt>시야각</dt>
        <dd>{numbers.fov}</dd>
      </div>
      <div>
        <dt>{numbers.upLabel}</dt>
        <dd>{numbers.up}</dd>
      </div>
      <div>
        <dt>스크린까지</dt>
        <dd>{numbers.dist}</dd>
      </div>
    </dl>
  );
}

/** 3번 화면 불러오는 중 */
export function SeatPickerSkeleton({ title, backHref }: { title: string; backHref: string }) {
  return (
    <Frame
      header={<FrameHeader title={title} backHref={backHref} />}
      bottom={
        <>
          <span className={frameStyles.summaryLabel}>상영관을 불러오고 있어요</span>
          <div className={frameStyles.actions}>
            <button type="button" className={frameStyles.cta} disabled>
              시야 확인하러 가기
            </button>
          </div>
        </>
      }
    >
      <div className={styles.layout} aria-busy="true">
        <div className={styles.map}>
          <SeatGridSkeleton />
        </div>
        <aside className={styles.panel} aria-hidden="true">
          <div className={styles.skeleton} style={{ width: 180, height: 14 }} />
          <div className={styles.skeleton} style={{ width: 200, height: 34 }} />
          <div className={`${styles.skeleton} ${styles.preview}`} style={{ aspectRatio: "16 / 9" }} />
          <div className={styles.skeleton} style={{ width: 260, height: 34 }} />
        </aside>
      </div>
    </Frame>
  );
}

/** 시야 화면의 뒤로 버튼이 새 기록을 쌓지 않고 이 화면으로 돌아오게 표시해 둔다 */
export const FROM_PICKER_KEY = "movie-mate:from-picker";
function markFromPicker(base: string) {
  try {
    sessionStorage.setItem(FROM_PICKER_KEY, base);
  } catch {
    // 저장소를 못 쓰면 뒤로 버튼은 링크로 동작한다
  }
}
