/**
 * 상영 시간표 계산 (순수 함수). 날짜는 "YYYY-MM-DD" 문자열로 다루고 시간대 계산은 하지 않는다.
 */
import { aspectLabel } from "@/lib/labels";
import type { Schedule, ScreenInfo, Showing } from "./types";

/** 남은 좌석이 이보다 적으면 강조색으로 보여 준다 */
export const FEW_SEATS_THRESHOLD = 40;

export function isFewSeatsLeft(seatsLeft: number): boolean {
  return seatsLeft < FEW_SEATS_THRESHOLD;
}

/** "13:40" → 820 */
export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function parseIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** 840 → "14:00". 자정을 넘기면 24 이상으로 쓴다. */
export function fromMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** 영화가 바뀌면 끝나는 시각을 상영 시간에 맞춰 다시 계산한다 (시작 + 상영 시간). */
export function withRuntime(schedule: Schedule, runtimeMin: number): Schedule {
  return {
    ...schedule,
    showings: schedule.showings.map((s) => ({ ...s, end: fromMinutes(toMinutes(s.start) + runtimeMin) })),
  };
}

export function addDays(iso: string, days: number): string {
  const date = parseIso(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return toIso(date);
}

/** 두 날짜 사이 날 수 (b - a) */
export function daysBetween(a: string, b: string): number {
  return Math.round((parseIso(b).getTime() - parseIso(a).getTime()) / 86_400_000);
}

/** 0 = 일요일 */
export function weekdayIndex(iso: string): number {
  return parseIso(iso).getUTCDay();
}

export const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"] as const;

export interface DateChip {
  iso: string;
  /** "오늘" 또는 요일 한 글자 */
  label: string;
  day: number;
}

/** 오늘부터 count일 */
export function buildDateStrip(todayIso: string, count = 7): DateChip[] {
  return Array.from({ length: count }, (_, i) => {
    const iso = addDays(todayIso, i);
    return { iso, label: i === 0 ? "오늘" : WEEKDAYS_KO[weekdayIndex(iso)], day: parseIso(iso).getUTCDate() };
  });
}

export interface ScreenGroup {
  screen: ScreenInfo;
  /** 시야 미리보기가 있는 관인지 */
  preview: boolean;
  showings: Showing[];
}

export interface GroupOptions {
  /** 이 시각(분) 이전에 시작한 상영은 뺀다. 오늘 날짜에만 넘긴다. */
  notBeforeMinutes?: number;
}

/**
 * 하루치 상영을 관별로 묶는다.
 * 관 순서는 시간표의 screens 순서, 관 안의 시간은 시작 시각 순서. 상영이 없는 관은 뺀다.
 */
export function groupShowingsByScreen(schedule: Schedule, day: number, options: GroupOptions = {}): ScreenGroup[] {
  const { notBeforeMinutes } = options;
  const showings = schedule.showings.filter(
    (s) => s.day === day && (notBeforeMinutes === undefined || toMinutes(s.start) > notBeforeMinutes),
  );
  return schedule.screens
    .map((screen) => ({
      screen,
      preview: screen.auditoriumId !== null,
      showings: showings
        .filter((s) => s.screenId === screen.id)
        .sort((a, b) => toMinutes(a.start) - toMinutes(b.start)),
    }))
    .filter((group) => group.showings.length > 0);
}

/** 관 줄의 보조 설명. 예: "IMAX 레이저 · 자막 · 1.43:1 · 592석" */
export function screenMeta(screen: ScreenInfo): string {
  return [screen.format, screen.subtitle, aspectLabel(screen.aspectRatio), `${screen.seatCount}석`].join(" · ");
}

export interface NextShowDay {
  day: number;
  count: number;
  screenNames: string[];
}

/** fromDay 다음 날부터 lastDay까지 중 상영이 있는 첫날 */
export function findNextShowDay(schedule: Schedule, fromDay: number, lastDay: number): NextShowDay | null {
  for (let day = fromDay + 1; day <= lastDay; day += 1) {
    const groups = groupShowingsByScreen(schedule, day);
    if (groups.length > 0) {
      return {
        day,
        count: groups.reduce((sum, g) => sum + g.showings.length, 0),
        screenNames: groups.map((g) => g.screen.name),
      };
    }
  }
  return null;
}
