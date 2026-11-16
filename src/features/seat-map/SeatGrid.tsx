import { Fragment, type CSSProperties } from "react";
import { seatName } from "@/lib/format";
import { listSeats } from "@/lib/domain/geometry";
import type { Auditorium, Seat } from "@/lib/domain/types";
import styles from "./SeatGrid.module.css";

interface SeatGridProps {
  auditorium: Auditorium;
  selectedSeatId?: string | null;
  onSelect?: (seat: Seat) => void;
  /** light: 3번 화면, dark: 5번 화면 미니 좌석표 */
  tone?: "light" | "dark";
  /** 좌석 한 칸의 최대 크기(px). 실제 크기는 들어갈 폭에 맞춰 줄어든다. */
  maxSeat?: number;
  /** 좌석 한 칸의 최소 크기(px). 이보다 작아질 폭이면 가로로 스크롤한다(손가락으로 누를 수 있게). */
  minSeat?: number;
  /** 스크린 곡선 표시 */
  showScreen?: boolean;
}

/**
 * 고를 수 있는 좌석표. 폭에 맞춰 좌석 크기가 줄어든다(컨테이너 쿼리).
 * 위쪽이 스크린, 왼쪽이 관객 기준 왼쪽이다.
 */
export function SeatGrid({ auditorium, selectedSeatId, onSelect, tone = "light", maxSeat = 24, minSeat = 0, showScreen = false }: SeatGridProps) {
  const seats = listSeats(auditorium);
  const seatAt = new Map(seats.map((seat) => [`${seat.rowIndex}:${seat.columnIndex}`, seat]));
  const aisleAfterColumn = new Set(auditorium.layout.verticalAisles.map((a) => a.afterColumn));
  const aisleAfterRow = new Set(auditorium.layout.crossAisles.map((a) => a.afterRow));
  const columns = auditorium.rows[0]?.cells.length ?? 0;
  const units = columns + aisleAfterColumn.size;
  const style = { "--units": units, "--seat-max": `${maxSeat}px`, "--seat-min": `${minSeat}px` } as CSSProperties;

  return (
    <div className={`${styles.wrap} ${tone === "dark" ? styles.dark : ""}`} style={style}>
      <div className={styles.grid} role="group" aria-label="좌석표">
        {showScreen ? (
          <div className={styles.screen}>
            <svg viewBox="0 0 760 26" preserveAspectRatio="none" aria-hidden="true" className={styles.screenCurve}>
              <path d="M8 22 Q 380 -6 752 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className={styles.screenLabel}>스크린</span>
          </div>
        ) : null}
        {auditorium.rows.map((row, rowIndex) => (
          <Fragment key={row.label}>
            <div className={styles.row}>
              <span className={styles.label} aria-hidden="true">
                {row.label}
              </span>
              {[...row.cells].map((_, columnIndex) => {
                const seat = seatAt.get(`${rowIndex}:${columnIndex}`);
                const aisle = aisleAfterColumn.has(columnIndex) ? <span className={styles.aisle} /> : null;
                if (!seat) {
                  return (
                    <Fragment key={columnIndex}>
                      <span className={styles.empty} />
                      {aisle}
                    </Fragment>
                  );
                }
                const label = `${seatName(seat)}${seat.kind === "w" ? " 휠체어석" : ""}`;
                const className = [styles.seat, seat.kind === "w" ? styles.wheelchair : ""].join(" ");
                return (
                  <Fragment key={columnIndex}>
                    {onSelect ? (
                      <button
                        type="button"
                        className={className}
                        aria-label={label}
                        aria-pressed={seat.id === selectedSeatId}
                        disabled={seat.kind === "x"}
                        onClick={() => onSelect(seat)}
                      />
                    ) : (
                      <span className={className} data-selected={seat.id === selectedSeatId || undefined} aria-label={label} />
                    )}
                    {aisle}
                  </Fragment>
                );
              })}
            </div>
            {aisleAfterRow.has(rowIndex) ? <div className={styles.crossAisle} /> : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** 불러오는 중 자리표시 (3번 화면) */
export function SeatGridSkeleton({ rows = 14, columns = 20 }: { rows?: number; columns?: number }) {
  return (
    <div className={styles.wrap} style={{ "--units": columns, "--seat-max": "24px" } as CSSProperties} aria-hidden="true">
      <div className={styles.grid}>
        <div className={styles.screen}>
          <div className={styles.skeletonLine} />
        </div>
        {Array.from({ length: rows }, (_, r) => (
          <div key={r} className={styles.row}>
            {Array.from({ length: columns }, (_, c) => (
              <span key={c} className={styles.skeletonSeat} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
