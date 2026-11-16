"use client";

import { useMemo } from "react";
import { eyePosition, screenRect } from "@/lib/domain/geometry";
import { computeViewMetrics } from "@/lib/domain/metrics";
import type { Auditorium, Seat } from "@/lib/domain/types";
import { formatViewNumbers, type ViewNumbers } from "@/lib/format";
import { useStature } from "./useStature";

/** 고른 좌석의 시야 수치. 키는 저장된 값(없으면 평균 키)을 쓴다. */
export function useSeatView(auditorium: Auditorium, seat: Seat | undefined): { stature: number; numbers: ViewNumbers | null } {
  const [stature] = useStature();
  const numbers = useMemo(() => {
    if (!seat) return null;
    const eye = eyePosition(auditorium, seat, stature);
    return formatViewNumbers(computeViewMetrics(eye, screenRect(auditorium)));
  }, [auditorium, seat, stature]);
  return { stature, numbers };
}
