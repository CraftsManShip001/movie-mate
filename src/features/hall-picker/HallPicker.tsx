"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Frame, FrameHeader, frameStyles } from "@/features/flow/Frame";
import { track } from "@/lib/analytics";
import styles from "./HallPicker.module.css";

export interface HallOption {
  id: string;
  name: string;
  /** "IMAX · 624석" */
  meta: string;
}

/**
 * 2 · 상영관. 실제 시간표가 없는 극장(CGV, 또는 시간표를 받지 못한 경우)은 영화·시간 없이 관만 고른다.
 */
export function HallPicker({ theater, halls }: { theater: { id: string; name: string }; halls: HallOption[] }) {
  const [picked, setPicked] = useState<string | null>(null);
  const selected = halls.find((h) => h.id === picked) ?? halls[0];

  return (
    <Frame
      fit
      header={<FrameHeader title={theater.name} backHref="/theaters" />}
      bottom={
        selected ? (
          <>
            <div className={frameStyles.summary}>
              <span className={frameStyles.summaryLabel}>선택한 관</span>
              <span className={frameStyles.summaryValue}>{selected.name}</span>
            </div>
            <div className={frameStyles.actions}>
              <Link
                href={`/theaters/${theater.id}/${selected.id}`}
                className={frameStyles.cta}
                onClick={() => track("select_auditorium", { theater_id: theater.id, auditorium_id: selected.id })}
              >
                이 관 좌석 보기
              </Link>
            </div>
          </>
        ) : null
      }
    >
      <div className={styles.body}>
        <h2 className={styles.title}>몇 관에서 보세요?</h2>
        <ul className={styles.rows} aria-label="상영관">
          {halls.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                className={styles.row}
                aria-pressed={h.id === selected?.id}
                onClick={() => setPicked(h.id)}
              >
                <span className={styles.rowName}>{h.name}</span>
                <span className={styles.rowMeta}>
                  <span>{h.meta}</span>
                  <ChevronRight color="var(--color-sub)" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}
