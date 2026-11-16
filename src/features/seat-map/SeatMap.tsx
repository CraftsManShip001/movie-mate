import Link from "next/link";
import { Fragment } from "react";
import { listSeats } from "@/lib/domain/geometry";
import type { Auditorium, Seat } from "@/lib/domain/types";
import styles from "./SeatMap.module.css";

interface SeatMapProps {
  auditorium: Auditorium;
  /** 좌석을 링크로 만들 때 주소. 없으면 좌석을 보여주기만 한다. */
  seatHref?: (seat: Seat) => string;
  selectedSeatId?: string;
}

/**
 * 좌석 배치도. 훅을 쓰지 않아 서버·클라이언트 컴포넌트 어디서든 쓸 수 있다.
 * 위쪽이 스크린, 왼쪽이 관객 기준 왼쪽이다.
 */
export function SeatMap({ auditorium, seatHref, selectedSeatId }: SeatMapProps) {
  const seats = listSeats(auditorium);
  const seatAt = new Map(seats.map((seat) => [`${seat.rowIndex}:${seat.columnIndex}`, seat]));
  const aisleAfterColumn = new Set(auditorium.layout.verticalAisles.map((a) => a.afterColumn));
  const aisleAfterRow = new Set(auditorium.layout.crossAisles.map((a) => a.afterRow));

  return (
    <div className={styles.scroller}>
      <div className={styles.map}>
        <div className={styles.screen}>스크린</div>
        {auditorium.rows.map((row, rowIndex) => (
          <Fragment key={row.label}>
            <div className={styles.row}>
              <span className={styles.label}>{row.label}</span>
              {[...row.cells].map((code, columnIndex) => {
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
                const label = `${seat.rowLabel}열 ${seat.number}번${seat.kind === "w" ? " 휠체어석" : ""}`;
                const className = [
                  styles.seat,
                  seat.kind === "w" ? styles.wheelchair : "",
                  seat.kind === "x" ? styles.blocked : "",
                  seat.id === selectedSeatId ? styles.selected : "",
                ].join(" ");
                const cell =
                  seatHref && seat.kind !== "x" ? (
                    <Link href={seatHref(seat)} prefetch={false} className={className} aria-label={label} title={label}>
                      {seat.number}
                    </Link>
                  ) : (
                    <span className={className} aria-label={label} title={label}>
                      {seat.number}
                    </span>
                  );
                return (
                  <Fragment key={columnIndex}>
                    {cell}
                    {aisle}
                  </Fragment>
                );
              })}
              <span className={styles.label}>{row.label}</span>
            </div>
            {aisleAfterRow.has(rowIndex) ? <div className={styles.crossAisle} /> : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
