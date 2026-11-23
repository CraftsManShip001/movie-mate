"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DEFAULT_STATURE_CM, MAX_STATURE_CM, MIN_STATURE_CM } from "@/lib/domain/anthropometry";
import styles from "./SeatViewer.module.css";
import { useStature } from "./useStature";

/** 시야 화면의 "키 166cm" 버튼. 누르면 슬라이더가 열리고, 바꾼 값은 저장되어 좌석 화면에도 반영된다. */
export function StatureControl() {
  const [stature, setStature] = useStature();
  const [open, setOpen] = useState(false);
  const popoverId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      // 슬라이더에 있던 포커스가 사라지지 않도록 버튼으로 돌려놓는다
      if (rootRef.current?.contains(document.activeElement)) buttonRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={styles.statureRoot}>
      {open ? (
        <div id={popoverId} className={styles.stature} role="group" aria-label="내 키">
          <div className={styles.statureHead}>
            <span>내 키</span>
            <strong>{stature}cm</strong>
          </div>
          <input
            type="range"
            className={styles.statureRange}
            min={MIN_STATURE_CM}
            max={MAX_STATURE_CM}
            step={1}
            value={stature}
            aria-label="내 키"
            aria-valuetext={`${stature}cm`}
            onChange={(event) => setStature(Number(event.target.value))}
          />
          <div className={styles.statureFoot}>
            <span>
              {MIN_STATURE_CM}cm ~ {MAX_STATURE_CM}cm
            </span>
            {/* 자리는 늘 둔다. 키를 처음 바꿀 때 버튼이 생기며 슬라이더가 끄는 도중에 위로 밀리지 않게 */}
            <button
              type="button"
              className={styles.statureReset}
              onClick={() => setStature(DEFAULT_STATURE_CM)}
              data-idle={stature === DEFAULT_STATURE_CM || undefined}
              aria-hidden={stature === DEFAULT_STATURE_CM || undefined}
              tabIndex={stature === DEFAULT_STATURE_CM ? -1 : undefined}
            >
              평균 키로
            </button>
          </div>
        </div>
      ) : null}
      <button
        ref={buttonRef}
        type="button"
        className={styles.control}
        aria-expanded={open}
        aria-controls={popoverId}
        onClick={() => setOpen((v) => !v)}
      >
        키 {stature}cm
      </button>
    </div>
  );
}
