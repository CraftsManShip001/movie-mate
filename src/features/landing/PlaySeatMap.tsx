"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";
import styles from "./Landing.module.css";

export interface PlaySeat {
  id: string;
  /** "N열 23번" */
  name: string;
  row: number;
  column: number;
  span: number;
}

/**
 * 랜딩 첫 화면의 좌석표. 다른 화면으로 가지 않고, 누르면 그 자리만 강조색으로 바뀐다(가지고 노는 용도).
 * 실제 시야는 "좌석 찾아보기"로 극장을 골라서 본다.
 */
export function PlaySeatMap({ seats, rows, columns, initialId }: { seats: PlaySeat[]; rows: number; columns: number; initialId: string }) {
  const [pickedId, setPickedId] = useState(initialId);
  const played = useRef(false);
  const picked = seats.find((s) => s.id === pickedId);

  const gridRef = useRef<HTMLDivElement>(null);

  const pick = (seat: PlaySeat) => {
    setPickedId(seat.id);
    if (!played.current) {
      played.current = true;
      track("landing_click", { target: "seat_map" });
    }
  };

  // 키보드: 탭 한 번으로 좌석표에 들어오고, 화살표로 옆·앞뒤 자리로 옮긴다
  const onKeyDown = (event: KeyboardEvent) => {
    if (!picked) return;
    const dir = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[event.key];
    if (!dir) return;
    event.preventDefault();
    const [dr, dc] = dir;
    const candidates = seats.filter((s) =>
      dr === 0 ? s.row === picked.row && Math.sign(s.column - picked.column) === dc : Math.sign(s.row - picked.row) === dr,
    );
    const next = candidates.sort(
      (a, b) =>
        Math.abs(a.row - picked.row) - Math.abs(b.row - picked.row) || Math.abs(a.column - picked.column) - Math.abs(b.column - picked.column),
    )[0];
    if (!next) return;
    pick(next);
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-seat="${next.id}"]`)?.focus();
  };

  return (
    <figure className={styles.seatMap}>
      <div className={styles.screen} aria-hidden="true">
        <span className={styles.screenLine} />
        <span className={styles.screenLabel}>스크린</span>
      </div>
      <div
        ref={gridRef}
        onKeyDown={onKeyDown}
        className={styles.seatGrid}
        role="group"
        aria-label="CGV 용산아이파크몰 IMAX관 좌석표"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, auto)` }}
      >
        {seats.map((seat) => (
          <button
            key={seat.id}
            data-seat={seat.id}
            type="button"
            className={seat.id === pickedId ? `${styles.seat} ${styles.seatPicked}` : styles.seat}
            style={{ gridRow: seat.row + 1, gridColumn: `${seat.column + 1} / span ${seat.span}` }}
            aria-label={seat.name}
            aria-pressed={seat.id === pickedId}
            tabIndex={seat.id === pickedId ? 0 : -1}
            onClick={() => pick(seat)}
          />
        ))}
      </div>
      <figcaption className={styles.seatCaption} aria-live="polite">
        IMAX관 · {picked?.name}
      </figcaption>
    </figure>
  );
}
