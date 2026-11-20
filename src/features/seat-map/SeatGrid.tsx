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
  /** 이 회차에 이미 팔린 좌석 id */
  soldSeatIds?: ReadonlySet<string>;
}

/**
 * 고를 수 있는 좌석표. 폭에 맞춰 좌석 크기가 줄어든다(컨테이너 쿼리).
 * 위쪽이 스크린, 왼쪽이 관객 기준 왼쪽이다.
 */
export function SeatGrid({
  auditorium,
  selectedSeatId,
  onSelect,
  tone = "light",
  maxSeat = 24,
  minSeat = 0,
  showScreen = false,
  soldSeatIds,
}: SeatGridProps) {
  const seats = listSeats(auditorium);
  const aisleColumns = auditorium.layout.verticalAisles.map((a) => a.afterColumn);
  const aisleAfterRow = new Set(auditorium.layout.crossAisles.map((a) => a.afterRow));
  const columns = auditorium.rows[0]?.cells.length ?? 0;
  const units = columns + aisleColumns.length;
  const style = { "--units": units, "--seat-max": `${maxSeat}px`, "--seat-min": `${minSeat}px` } as CSSProperties;
  /** 칸 단위 위치 → 통로 칸을 더한 화면 위치(칸 단위). 3D의 unitX 와 같은 규칙이다. */
  const place = (unit: number) => unit + aisleColumns.filter((after) => after + 1 <= unit).length;

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
            {row.zone && row.zone !== auditorium.rows[rowIndex - 1]?.zone ? (
              <div className={styles.zone}>{row.zone}</div>
            ) : null}
            <div className={styles.row}>
              <span className={styles.label} aria-hidden="true">
                {row.label}
              </span>
              <div className={styles.seats}>
                {/* 칸막이로 둘러싼 박스석 */}
                {row.boxes?.map(([left, span]) => (
                  <span
                    key={left}
                    className={styles.box}
                    style={{ "--x": place(left + span / 2) - span / 2, "--w": span } as CSSProperties}
                    aria-hidden="true"
                  />
                ))}
                {seats
                  .filter((seat) => seat.rowIndex === rowIndex)
                  .map((seat) => {
                    const sold = soldSeatIds?.has(seat.id) ?? false;
                    const wide = seat.span >= 1.5;
                    const label = `${row.zone ? `${row.zone} ` : ""}${seatName(seat)}${seat.kind === "w" ? " 휠체어석" : ""}${wide ? " 넓은 좌석" : ""}${sold ? ", 팔린 자리" : ""}`;
                    const className = [styles.seat, seat.kind === "w" ? styles.wheelchair : "", sold ? styles.sold : ""].join(" ");
                    // 가운데 위치는 통로를 반영하고, 폭은 좌석이 차지한 칸 수 그대로다
                    const x = place(seat.left + seat.span / 2) - seat.span / 2;
                    const seatStyle = { "--x": x, "--w": seat.span } as CSSProperties;
                    return onSelect ? (
                      <button
                        key={seat.id}
                        type="button"
                        className={className}
                        style={seatStyle}
                        aria-label={label}
                        aria-pressed={seat.id === selectedSeatId}
                        disabled={seat.kind === "x"}
                        onClick={() => onSelect(seat)}
                      />
                    ) : (
                      <span
                        key={seat.id}
                        className={className}
                        style={seatStyle}
                        data-selected={seat.id === selectedSeatId || undefined}
                        aria-label={label}
                      />
                    );
                  })}
              </div>
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
