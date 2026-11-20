"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Frame, FrameHeader, frameStyles } from "@/features/flow/Frame";
import { readShowQuery, showQueryString } from "@/features/flow/show-query";
import { useLiveShow } from "@/features/flow/useLiveShow";
import { SeatGrid, SeatGridSkeleton } from "@/features/seat-map/SeatGrid";
import { SeatPreview } from "@/features/seat-preview/SeatPreview";
import { useSeatView } from "@/features/viewer/useSeatView";
import { findSeat } from "@/lib/domain/geometry";
import type { Auditorium, Seat } from "@/lib/domain/types";
import { asOfLabel, formatMonthDay, seatName } from "@/lib/format";
import { bookingLink } from "@/lib/labels";
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

  return (
    <Frame
      header={<FrameHeader title={title} backHref={backHref} />}
      bottom={
        <>
          {seat ? (
            <div className={frameStyles.summary}>
              <span className={frameStyles.summaryLabel}>고른 자리</span>
              <span className={frameStyles.summaryValue}>{seatName(seat)}</span>
            </div>
          ) : (
            <span className={frameStyles.summaryLabel}>자리를 골라 주세요</span>
          )}
          <div className={frameStyles.actions}>
            {/* 상영 정보 없이 들어와도(CGV·주소로 바로) 예매는 영화관 사이트로 보낸다 */}
            <a
              href={booking.href}
              target="_blank"
              rel="noopener noreferrer"
              className={frameStyles.secondary}
              aria-label={`${booking.label} (새 창)`}
            >
              {chain} 예매
            </a>
            {seat ? (
              <Link
                href={`${base}/seats/${seat.id}${liveShow.show && !seatSold ? "/ticket" : ""}${showQueryString(show)}`}
                className={frameStyles.cta}
                onClick={() => markFromPicker(base)}
              >
                이 자리에서 보기
              </Link>
            ) : (
              <button type="button" className={frameStyles.cta} disabled>
                이 자리에서 보기
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
          {seat ? (
            <div className={styles.preview}>
              <SeatPreview auditorium={auditorium} seat={seat} statureCm={stature} />
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

function ViewNumbersRow({ numbers }: { numbers: { fov: string; up: string; dist: string } }) {
  return (
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
              이 자리에서 보기
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
