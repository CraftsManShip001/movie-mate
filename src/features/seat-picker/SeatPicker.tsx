"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Frame, FrameHeader, frameStyles } from "@/features/flow/Frame";
import { readShowQuery, showQueryString } from "@/features/flow/show-query";
import { SeatGrid, SeatGridSkeleton } from "@/features/seat-map/SeatGrid";
import { SeatPreview } from "@/features/seat-preview/SeatPreview";
import { useSeatView } from "@/features/viewer/useSeatView";
import { findSeat } from "@/lib/domain/geometry";
import type { Auditorium, Seat } from "@/lib/domain/types";
import { formatMonthDay, seatName } from "@/lib/format";
import styles from "./SeatPicker.module.css";

interface SeatPickerProps {
  theaterId: string;
  /** "CGV 용산아이파크몰 · IMAX관" */
  title: string;
  movieTitle: string;
  auditorium: Auditorium;
}

/** 3 · 좌석. 고른 자리는 주소(?seat=J14)에 남겨 4·5번에서 뒤로 왔을 때 그대로 보인다. */
export function SeatPicker({ theaterId, title, movieTitle, auditorium }: SeatPickerProps) {
  const searchParams = useSearchParams();
  const show = readShowQuery(searchParams);
  const [seatId, setSeatId] = useState<string | null>(() => searchParams.get("seat"));
  const seat = useMemo(() => (seatId ? findSeat(auditorium, seatId) : undefined), [auditorium, seatId]);
  const { stature, numbers } = useSeatView(auditorium, seat);

  const pick = (next: Seat) => {
    setSeatId(next.id);
    window.history.replaceState(null, "", showQueryString(show, { seat: next.id }));
  };

  const caption = [movieTitle, show.date ? `${formatMonthDay(show.date)}${show.time ? ` ${show.time}` : ""}` : null]
    .filter(Boolean)
    .join(" · ");
  const base = `/theaters/${theaterId}/${auditorium.id}`;

  return (
    <Frame
      header={<FrameHeader title={title} backHref={`/theaters/${theaterId}`} />}
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
            {seat ? (
              <Link href={`${base}/seats/${seat.id}/ticket${showQueryString(show)}`} className={frameStyles.cta}>
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
        <div className={styles.map}>
          <SeatGrid auditorium={auditorium} selectedSeatId={seat?.id ?? null} onSelect={pick} minSeat={12} showScreen />
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
          {auditorium.sample ? <p className={styles.note}>샘플 상영관이라 실제 치수와 달라요</p> : null}
        </aside>
      </div>
    </Frame>
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
