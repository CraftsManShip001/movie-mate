/**
 * 화면·티켓 문구 만들기 (순수 함수).
 */
import { WEEKDAYS_KO, weekdayIndex } from "@/lib/showtimes/schedule";
import type { Seat } from "@/lib/domain/types";

const WEEKDAYS_EN = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

function splitIso(iso: string): [string, number, number] {
  const [y, m, d] = iso.split("-");
  return [y, Number(m), Number(d)];
}

/** "2026-11-16" → "11월 16일" */
export function formatMonthDay(iso: string): string {
  const [, m, d] = splitIso(iso);
  return `${m}월 ${d}일`;
}

/** "2026-11-16" → "2026.11.16" */
export function formatDotDate(iso: string): string {
  return iso.replaceAll("-", ".");
}

/** 티켓 뒷면 DATE 줄. "2026.11.16 MON" */
export function formatTicketDate(iso: string): string {
  return `${formatDotDate(iso)} ${WEEKDAYS_EN[weekdayIndex(iso)]}`;
}

/** 티켓 앞면 띠. "2026.11.16 (월) 13:40" */
export function formatBandDate(iso: string, time: string): string {
  return `${formatDotDate(iso)} (${WEEKDAYS_KO[weekdayIndex(iso)]}) ${time}`;
}

/** "J열 14번" */
export function seatName(seat: Pick<Seat, "rowLabel" | "number">): string {
  return `${seat.rowLabel}열 ${seat.number}번`;
}

/** "J14" */
export function seatCode(seat: Pick<Seat, "rowLabel" | "number">): string {
  return `${seat.rowLabel}${seat.number}`;
}

function hasFinalConsonant(word: string): boolean {
  const last = word.trim().at(-1);
  if (!last) return false;
  const code = last.charCodeAt(0);
  if (code >= 0xac00 && code <= 0xd7a3) return (code - 0xac00) % 28 !== 0;
  // 숫자는 읽는 소리 기준: 0(영) 1(일) 3(삼) 6(육) 7(칠) 8(팔)은 받침이 있다
  if (/[0-9]/.test(last)) return "013678".includes(last);
  // 영문 약어(CGV 등)는 받침 없는 소리로 읽는 경우가 많다
  return false;
}

/** 주격 조사. "롯데시네마" → "롯데시네마가", "극장" → "극장이" */
export function withSubject(word: string): string {
  return `${word}${hasFinalConsonant(word) ? "이" : "가"}`;
}

/** 보조사 은/는. "내일" → "내일은", "모레" → "모레는" */
export function withTopic(word: string): string {
  return `${word}${hasFinalConsonant(word) ? "은" : "는"}`;
}

/**
 * 티켓 번호. 실제 발행 번호가 아니라 날짜와 좌석으로 만든 표시용 번호다.
 * 연월일 6자리 + 열 순서 2자리 + 좌석 번호 2자리. 예: 2026-11-16, J열(10번째) 14번 → "2611161014"
 */
export function ticketNumber(dateIso: string, seat: Pick<Seat, "rowIndex" | "number">): string {
  const [y, m, d] = splitIso(dateIso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${y.slice(2)}${pad(m)}${pad(d)}${pad(seat.rowIndex + 1)}${pad(seat.number)}`;
}

/** 서울 시각 기준 오늘 날짜와 지금 시각(분) */
export function nowInSeoul(now: Date): { todayIso: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "00";
  return {
    todayIso: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/** 화면에 보여 줄 시야 수치 세 개 */
export interface ViewNumbers {
  /** 시야각 (스크린 폭이 차지하는 가로 각도) */
  fov: string;
  /** 올려보기 (스크린 중심을 보는 고개 각도) */
  up: string;
  /** 스크린까지 거리 */
  dist: string;
}

export function formatViewNumbers(metrics: {
  horizontalFovDeg: number;
  neckElevationDeg: number;
  distanceToScreenM: number;
}): ViewNumbers {
  return {
    fov: `${Math.round(metrics.horizontalFovDeg)}°`,
    up: `${Math.round(metrics.neckElevationDeg)}°`,
    dist: `${metrics.distanceToScreenM.toFixed(1)}m`,
  };
}
