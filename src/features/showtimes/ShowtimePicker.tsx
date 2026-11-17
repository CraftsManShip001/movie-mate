"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Frame, FrameHeader, frameStyles } from "@/features/flow/Frame";
import { showQueryString } from "@/features/flow/show-query";
import { formatMonthDay, withTopic } from "@/lib/format";
import { bookingLink } from "@/lib/labels";
import {
  addDays,
  buildDateStrip,
  findNextShowDay,
  groupShowingsByScreen,
  isFewSeatsLeft,
  screenMeta,
} from "@/lib/showtimes/schedule";
import type { Movie, Schedule } from "@/lib/showtimes/types";
import styles from "./ShowtimePicker.module.css";

const DAYS = 7;

interface ShowtimePickerProps {
  theater: { id: string; name: string; chain: string };
  movie: Movie;
  schedule: Schedule;
  /** 서울 기준 오늘 (서버에서 계산) */
  todayIso: string;
  /** 서울 기준 지금 시각(분). 오늘 이미 시작한 상영은 빼고 보여 준다. */
  nowMinutes: number;
}

interface Picked {
  screenId: string;
  start: string;
}

/** 고른 날짜·시간을 주소에 남겨 3번 화면에서 뒤로 왔을 때 그대로 보이게 한다 */
function readPicked(params: URLSearchParams): { day: number; picked: Picked | null } {
  const day = Number(params.get("day") ?? 0);
  const show = params.get("show");
  const [screenId, start] = show ? show.split("@") : [];
  return {
    day: Number.isInteger(day) && day >= 0 && day < DAYS ? day : 0,
    picked: screenId && start ? { screenId, start } : null,
  };
}

function writePicked(day: number, picked: Picked | null) {
  const params = new URLSearchParams();
  if (day > 0) params.set("day", String(day));
  if (picked) params.set("show", `${picked.screenId}@${picked.start}`);
  const query = params.toString();
  window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}

export function ShowtimePicker({ theater, movie, schedule, todayIso, nowMinutes }: ShowtimePickerProps) {
  const searchParams = useSearchParams();
  const [state, setState] = useState(() => readPicked(searchParams));
  const { day } = state;

  const dates = buildDateStrip(todayIso, DAYS);
  const groups = groupShowingsByScreen(schedule, day, day === 0 ? { notBeforeMinutes: nowMinutes } : {});
  const picked = state.picked;
  const pickedGroup = picked ? groups.find((g) => g.screen.id === picked.screenId) : undefined;
  const pickedShowing = pickedGroup?.showings.find((s) => s.start === picked?.start);
  const dateIso = addDays(todayIso, day);
  const booking = bookingLink(theater.chain);

  const update = (next: { day: number; picked: Picked | null }) => {
    setState(next);
    writePicked(next.day, next.picked);
  };

  let bottom = null;
  if (groups.length > 0) {
    if (!pickedGroup || !pickedShowing) {
      bottom = (
        <>
          <span className={frameStyles.summaryLabel}>시간을 골라 주세요</span>
          <div className={frameStyles.actions}>
            <button type="button" className={frameStyles.cta} disabled>
              이 시간으로 좌석 보기
            </button>
          </div>
        </>
      );
    } else {
      const summary = `${pickedGroup.screen.name} · ${formatMonthDay(dateIso)} ${pickedShowing.start}`;
      const auditoriumId = pickedGroup.screen.auditoriumId;
      bottom = (
        <>
          <div className={frameStyles.summary}>
            <span className={frameStyles.summaryValue}>{summary}</span>
            {auditoriumId ? null : <span className={frameStyles.summaryLabel}>이 관은 아직 시야 미리보기가 없어요</span>}
          </div>
          <div className={frameStyles.actions}>
            {auditoriumId ? (
              <Link
                href={`/theaters/${theater.id}/${auditoriumId}${showQueryString({ date: dateIso, time: pickedShowing.start })}`}
                className={frameStyles.cta}
              >
                이 시간으로 좌석 보기
              </Link>
            ) : (
              <>
                <a href={booking.href} target="_blank" rel="noopener noreferrer" className={frameStyles.secondary}>
                  {booking.label}
                </a>
                <button type="button" className={frameStyles.cta} disabled>
                  이 시간으로 좌석 보기
                </button>
              </>
            )}
          </div>
        </>
      );
    }
  }

  return (
    <Frame header={<FrameHeader title={theater.name} backHref="/" />} bottom={bottom}>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.movie}>
            <Image
              src={movie.posterUrl}
              alt={`${movie.title} 포스터`}
              width={56}
              height={84}
              unoptimized
              className={styles.poster}
            />
            <div className={styles.movieText}>
              <span className={styles.movieTitle}>{movie.title}</span>
              <span className={styles.movieMeta}>
                {movie.rating} · {movie.runtimeMin}분{movie.source === "tmdb" ? " · 정보 TMDB" : ""}
              </span>
            </div>
          </div>
          <div className={styles.dates} role="group" aria-label="날짜">
            {dates.map((d, i) => (
              <button
                key={d.iso}
                type="button"
                className={styles.date}
                aria-pressed={i === day}
                aria-label={`${formatMonthDay(d.iso)}${i === 0 ? " 오늘" : ` ${d.label}요일`}`}
                onClick={() => update({ day: i, picked: null })}
              >
                <span className={styles.dateLabel}>{d.label}</span>
                <span className={styles.dateDay}>{d.day}</span>
              </button>
            ))}
          </div>
        </div>

        {groups.length > 0 ? (
          <div>
            {groups.map((group) => (
              <section key={group.screen.id} className={styles.group} aria-label={group.screen.name}>
                <div className={styles.groupHead}>
                  <div className={styles.groupName}>
                    <h2 className={styles.screenName}>{group.screen.name}</h2>
                    <span className={styles.screenMeta}>{screenMeta(group.screen)}</span>
                  </div>
                  {group.preview ? (
                    <span className={styles.preview}>
                      <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                        <rect x="1" y="1" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      시야 미리보기
                    </span>
                  ) : (
                    <span className={styles.noPreview}>시야 미리보기 없음</span>
                  )}
                </div>
                <div className={styles.times}>
                  {group.showings.map((s) => {
                    const few = isFewSeatsLeft(s.seatsLeft);
                    const isPicked = picked?.screenId === group.screen.id && picked.start === s.start;
                    return (
                      <button
                        key={s.start}
                        type="button"
                        className={styles.time}
                        aria-pressed={isPicked}
                        aria-label={`${group.screen.name} ${s.start} 시작, ${s.end} 끝, ${s.seatsLeft}석 남음`}
                        onClick={() => update({ day, picked: { screenId: group.screen.id, start: s.start } })}
                      >
                        <span className={styles.timeStart}>{s.start}</span>
                        <span className={styles.timeSub}>~{s.end}</span>
                        <span className={few ? styles.timeFew : styles.timeSub}>{s.seatsLeft}석 남음</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <EmptyDay schedule={schedule} day={day} todayIso={todayIso} onPickDay={(d) => update({ day: d, picked: null })} />
        )}
      </div>
    </Frame>
  );
}

function EmptyDay({
  schedule,
  day,
  todayIso,
  onPickDay,
}: {
  schedule: Schedule;
  day: number;
  todayIso: string;
  onPickDay: (day: number) => void;
}) {
  const endedToday = day === 0 && groupShowingsByScreen(schedule, 0).length > 0;
  const next = findNextShowDay(schedule, day, DAYS - 1);
  const nextLabel = next ? (next.day === 1 ? "내일" : formatMonthDay(addDays(todayIso, next.day))) : "";
  const where = next
    ? next.screenNames.length === 1
      ? `${next.screenNames[0]}에서`
      : `${next.screenNames.length}개 관에서`
    : "";

  return (
    <div className={`${frameStyles.empty} ${styles.empty}`}>
      <p className={frameStyles.emptyTitle}>{endedToday ? "오늘 상영은 모두 끝났어요" : "이날은 상영이 없어요"}</p>
      <p className={frameStyles.emptyBody}>
        {next ? `${withTopic(nextLabel)} ${where} ${next.count}번 상영해요` : "다른 날을 골라 주세요"}
      </p>
      {next ? (
        <div className={frameStyles.emptyActions}>
          <button type="button" className={`${frameStyles.cta} ${frameStyles.ctaAuto}`} onClick={() => onPickDay(next.day)}>
            {nextLabel} 상영 보기
          </button>
        </div>
      ) : null}
    </div>
  );
}
