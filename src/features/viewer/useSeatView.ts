"use client";

import { useMemo } from "react";
import { eyePosition, RECLINE, screenRect } from "@/lib/domain/geometry";
import { computeViewMetrics } from "@/lib/domain/metrics";
import type { Auditorium, Seat } from "@/lib/domain/types";
import { formatViewNumbers, type ViewNumbers } from "@/lib/format";
import { useStature } from "./useStature";

/**
 * 고른 좌석의 시야 수치. 키는 저장된 값(없으면 평균 키)을 쓴다.
 * 누웠으면(리클라이너) 젖힌 눈 위치로 재고, 올려보기는 머리받침에 기댄 얼굴 방향에서 더 드는 각도로 본다.
 */
export function useSeatView(
  auditorium: Auditorium,
  seat: Seat | undefined,
  reclined = false,
): { stature: number; numbers: ViewNumbers | null } {
  const [stature] = useStature();
  const numbers = useMemo(() => {
    if (!seat) return null;
    const eye = eyePosition(auditorium, seat, stature, reclined ? 1 : 0);
    const metrics = computeViewMetrics(eye, screenRect(auditorium));
    return formatViewNumbers(reclined ? { ...metrics, neckElevationDeg: metrics.neckElevationDeg - RECLINE.gazeUpDeg } : metrics);
  }, [auditorium, seat, stature, reclined]);
  return { stature, numbers };
}
