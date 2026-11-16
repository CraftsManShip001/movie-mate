"use client";

import { useCallback, useSyncExternalStore } from "react";
import { clampStature, DEFAULT_STATURE_CM } from "@/lib/domain/anthropometry";

const STORAGE_KEY = "movie-mate:stature-cm";
const listeners = new Set<() => void>();
/** localStorage를 못 쓰는 환경(사생활 보호 모드 등)에서 쓰는 메모리 값 */
let memoryValue: number | null = null;

function read(): number {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return clampStature(Number(stored));
  } catch {
    // 무시하고 메모리 값 사용
  }
  return memoryValue ?? DEFAULT_STATURE_CM;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** 사용자 키(cm). 기본값은 평균 키, localStorage에 저장된다. */
export function useStature(): [number, (cm: number) => void] {
  const stature = useSyncExternalStore(subscribe, read, () => DEFAULT_STATURE_CM);
  const setStature = useCallback((cm: number) => {
    const value = clampStature(cm);
    memoryValue = value;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // 저장 실패해도 메모리 값으로 동작
    }
    listeners.forEach((listener) => listener());
  }, []);
  return [stature, setStature];
}
