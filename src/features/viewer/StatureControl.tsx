"use client";

import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { DEFAULT_STATURE_CM, MAX_STATURE_CM, MIN_STATURE_CM } from "@/lib/domain/anthropometry";
import { HeightIcon } from "./rail-icons";
import styles from "./SeatViewer.module.css";
import { useStature } from "./useStature";

/**
 * 시야 화면의 "키 166cm" 버튼. 누르면 슬라이더가 열리고, 바꾼 값은 저장되어 좌석 화면에도 반영된다.
 * rail: 휴대폰 오른쪽 레일의 동그란 버튼. 누르면 버튼 위로 세로 슬라이더가 길게 열리고, 그 왼쪽에 지금 키를 크게 띄운다.
 */
export function StatureControl({ variant = "pill" }: { variant?: "pill" | "rail" }) {
  const [stature, setStature] = useStature();
  const [open, setOpen] = useState(false);
  const popoverId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 슬라이더를 끄는 동안 쏟아지지 않게, 키를 바꾸고 1초 멈췄을 때 한 번만 남긴다(처음 값은 남기지 않음)
  const firstStature = useRef(stature);
  useEffect(() => {
    if (stature === firstStature.current) return;
    const timer = window.setTimeout(() => track("change_stature", { stature_cm: stature }), 1000);
    return () => window.clearTimeout(timer);
  }, [stature]);

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

  if (variant === "rail") {
    return (
      <div ref={rootRef} className={styles.statureRoot}>
        {open ? (
          <div id={popoverId} className={styles.statureRail} role="group" aria-label="내 키">
            <div className={styles.statureRailValue} aria-hidden="true">
              <strong>{stature}</strong>
              <span>cm</span>
              {stature === DEFAULT_STATURE_CM ? null : (
                <button type="button" className={styles.statureReset} onClick={() => setStature(DEFAULT_STATURE_CM)}>
                  평균 키로
                </button>
              )}
            </div>
            <VerticalSlider value={stature} onChange={setStature} />
          </div>
        ) : null}
        <button
          ref={buttonRef}
          type="button"
          className={styles.railButton}
          aria-label={`키 ${stature}cm`}
          aria-expanded={open}
          aria-controls={popoverId}
          onClick={() => setOpen((v) => !v)}
        >
          <HeightIcon />
        </button>
      </div>
    );
  }

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

/**
 * 휴대폰 레일의 세로 키 슬라이더. 브라우저 기본 슬라이더 모양(회색 막대·흰 상자)이 나오지 않게 직접 그린다.
 * 위가 큰 키. 끌기·누르기·방향키 모두 된다.
 */
function VerticalSlider({ value, onChange }: { value: number; onChange: (cm: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const span = MAX_STATURE_CM - MIN_STATURE_CM;
  const ratio = (value - MIN_STATURE_CM) / span;

  const clamp = (cm: number) => Math.min(MAX_STATURE_CM, Math.max(MIN_STATURE_CM, Math.round(cm)));
  const fromPointer = (clientY: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.height === 0) return;
    const t = 1 - (clientY - rect.top) / rect.height;
    onChange(clamp(MIN_STATURE_CM + t * span));
  };

  return (
    <div
      ref={trackRef}
      className={styles.statureRailRange}
      role="slider"
      tabIndex={0}
      aria-label="내 키"
      aria-orientation="vertical"
      aria-valuemin={MIN_STATURE_CM}
      aria-valuemax={MAX_STATURE_CM}
      aria-valuenow={value}
      aria-valuetext={`${value}cm`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        fromPointer(event.clientY);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) fromPointer(event.clientY);
      }}
      onKeyDown={(event) => {
        const step = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10 }[event.key];
        if (step !== undefined) onChange(clamp(value + step));
        else if (event.key === "Home") onChange(MIN_STATURE_CM);
        else if (event.key === "End") onChange(MAX_STATURE_CM);
        else return;
        event.preventDefault();
      }}
    >
      <span className={styles.statureRailFill} style={{ height: `${ratio * 100}%` }} />
      <span className={styles.statureRailThumb} style={{ bottom: `${ratio * 100}%` }} />
    </div>
  );
}
