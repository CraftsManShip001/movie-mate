"use client";

import { useSyncExternalStore } from "react";

/** 마지막으로 3D로 본 자리. 브라우저에만 저장하고 서버로 보내지 않는다. 랜딩의 "이어 보기" 줄이 쓴다. */
export interface RecentSeat {
  theaterId: string;
  auditoriumId: string;
  seatId: string;
  /** "CGV 용산아이파크몰" */
  theaterName: string;
  /** "IMAX관" */
  screenName: string;
  /** "N열 23번" */
  seatName: string;
}

const STORAGE_KEY = "movie-mate:recent-seat";
const ID = /^[A-Za-z0-9_-]{1,80}$/;
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedValue: RecentSeat | null = null;

function parse(raw: string | null): RecentSeat | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<RecentSeat>;
    const text = (s: unknown) => typeof s === "string" && s.length > 0 && s.length <= 80;
    if (!ID.test(v.theaterId ?? "") || !ID.test(v.auditoriumId ?? "") || !ID.test(v.seatId ?? "")) return null;
    if (!text(v.theaterName) || !text(v.screenName) || !text(v.seatName)) return null;
    return v as RecentSeat;
  } catch {
    return null;
  }
}

function read(): RecentSeat | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // 저장소를 못 쓰면 이어 보기 줄 없이 연다
  }
  // useSyncExternalStore는 같은 값이면 같은 객체를 돌려받아야 한다
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
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

export function saveRecentSeat(seat: RecentSeat): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seat));
  } catch {
    return;
  }
  listeners.forEach((listener) => listener());
}

/** 서버와 첫 그리기에서는 null(줄 없음)이고, 브라우저에서 저장된 자리가 있으면 나타난다. */
export function useRecentSeat(): RecentSeat | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function recentSeatHref(seat: RecentSeat): string {
  return `/theaters/${seat.theaterId}/${seat.auditoriumId}/seats/${seat.seatId}`;
}
