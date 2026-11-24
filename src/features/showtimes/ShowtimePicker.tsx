"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Frame, FrameHeader, frameStyles } from "@/features/flow/Frame";
import { showQueryString } from "@/features/flow/show-query";
import { track } from "@/lib/analytics";
import { asOfLabel, formatMonthDay, withTopic } from "@/lib/format";
import { bookingLink } from "@/lib/labels";
import {
  addDays,
  buildDateStrip,
  findNextShowDay,
  groupShowingsByScreen,
  isFewSeatsLeft,
  screenMeta,
} from "@/lib/showtimes/schedule";
import { findMovieByTitle } from "@/lib/showtimes/title";
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

interface PickState {
  day: number;
  /** 실제 시간표에서 고른 영화 id. 샘플 시간표는 null */
  movieId: string | null;
  picked: Picked | null;
}

/**
 * 고른 날짜·영화·시간을 주소에 남겨 3번 화면에서 뒤로 왔을 때 그대로 보이게 한다.
 * 3번 화면의 ‹ 뒤로는 관·날짜·시각·회차(?hall=&date=&time=&seq=)를 넘기므로, 그때는 시간표에서 그 상영을 찾아 되살린다.
 */
function readPicked(params: URLSearchParams, schedule: Schedule, todayIso: string): PickState {
  const seq = params.get("seq");
  const hall = params.get("hall");
  const date = params.get("date");
  const time = params.get("time");
  if (!params.get("show") && seq && hall && date && time) {
    const halls = new Map(schedule.screens.map((screen) => [screen.id, screen.auditoriumId]));
    const showing = schedule.showings.find(
      (s) => s.seq === seq && s.start === time && halls.get(s.screenId) === hall && addDays(todayIso, s.day) === date,
    );
    if (showing && showing.day >= 0 && showing.day < DAYS) {
      return {
        day: showing.day,
        movieId: showing.movieId ?? null,
        picked: { screenId: showing.screenId, start: showing.start },
      };
    }
  }
  // 날짜는 실제 날짜(?date=)로 남긴다. 예전 링크의 ?day=(오늘부터 며칠째)도 읽는다.
  const dateParam = params.get("date");
  const day = dateParam
    ? (Date.parse(`${dateParam}T00:00:00Z`) - Date.parse(`${todayIso}T00:00:00Z`)) / 86_400_000
    : Number(params.get("day") ?? 0);
  const show = params.get("show");
  const [screenId, start] = show ? show.split("@") : [];
  return {
    day: Number.isInteger(day) && day >= 0 && day < DAYS ? day : 0,
    // ?movie=(이 극장의 영화 id)가 없으면 ?title=(랜딩→극장 고르기에서 넘어온 제목)으로 찾는다
    movieId: params.get("movie") ?? findMovieByTitle(schedule.movies, params.get("title"))?.id ?? null,
    picked: screenId && start ? { screenId, start } : null,
  };
}

function writePicked({ day, movieId, picked }: PickState, todayIso: string) {
  const params = new URLSearchParams();
  if (day > 0) params.set("date", addDays(todayIso, day));
  if (movieId) params.set("movie", movieId);
  if (picked) params.set("show", `${picked.screenId}@${picked.start}`);
  const query = params.toString();
  window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}

export function ShowtimePicker({ theater, movie, schedule, todayIso, nowMinutes }: ShowtimePickerProps) {
  const searchParams = useSearchParams();
  const [state, setState] = useState(() => readPicked(searchParams, schedule, todayIso));
  const { day } = state;

  // 실제 시간표는 영화가 여럿이다. 고른 영화의 상영만 남긴다.
  const movies = schedule.movies ?? null;
  const currentMovie = (movies && movies.find((m) => m.id === state.movieId)) ?? movies?.[0] ?? movie;
  const view = movies ? { ...schedule, showings: schedule.showings.filter((s) => s.movieId === currentMovie.id) } : schedule;

  const dates = buildDateStrip(todayIso, DAYS);
  // 상영이 없는 날은 누를 수 없게 한다(지금 보고 있는 날은 빈 화면 안내가 나오므로 그대로 둔다)
  const hasShows = dates.map((_, i) => groupShowingsByScreen(view, i, i === 0 ? { notBeforeMinutes: nowMinutes } : {}).length > 0);
  const groups = groupShowingsByScreen(view, day, day === 0 ? { notBeforeMinutes: nowMinutes } : {});
  const picked = state.picked;
  const pickedGroup = picked ? groups.find((g) => g.screen.id === picked.screenId) : undefined;
  const pickedShowing = pickedGroup?.showings.find((s) => s.start === picked?.start);
  const dateIso = addDays(todayIso, day);
  const booking = bookingLink(theater.chain);

  const update = (next: Partial<PickState>) => {
    const merged = { ...state, movieId: movies ? currentMovie.id : null, ...next };
    setState(merged);
    writePicked(merged, todayIso);
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
                href={`/theaters/${theater.id}/${auditoriumId}${showQueryString({ date: dateIso, time: pickedShowing.start, seq: pickedShowing.seq ?? null })}`}
                className={frameStyles.cta}
                onClick={() => track("showtime_view_seats", { theater_id: theater.id, auditorium_id: auditoriumId })}
              >
                이 시간으로 좌석 보기
              </Link>
            ) : (
              <>
                <a
                  href={booking.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={frameStyles.secondary}
                  onClick={() => track("booking_click", { chain: theater.chain, from: "showtime" })}
                >
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
    <Frame header={<FrameHeader title={theater.name} backHref="/theaters" />} bottom={bottom}>
      <div className={styles.body}>
        {movies ? (
          <div className={styles.movies} role="group" aria-label="영화">
            {movies.map((m) => (
              <button
                key={m.id}
                type="button"
                className={styles.movieOption}
                aria-pressed={m.id === currentMovie.id}
                onClick={() => {
                  update({ movieId: m.id, picked: null });
                  track("select_movie", { theater_id: theater.id, movie_id: m.id });
                }}
              >
                <Poster movie={m} className={styles.optionPoster} />
                <span className={styles.optionTitle}>{m.title}</span>
              </button>
            ))}
          </div>
        ) : null}
        <div className={styles.top}>
          <div className={styles.movie}>
            {movies ? null : <Poster movie={currentMovie} className={styles.poster} />}
            <div className={styles.movieText}>
              <span className={styles.movieTitle}>{currentMovie.title}</span>
              <span className={styles.movieMeta}>{movieMeta(currentMovie, schedule)}</span>
            </div>
          </div>
          <div className={styles.dates} role="group" aria-label="날짜">
            {dates.map((d, i) => (
              <button
                key={d.iso}
                type="button"
                className={styles.date}
                aria-pressed={i === day}
                disabled={!hasShows[i] && i !== day}
                aria-label={`${formatMonthDay(d.iso)}${i === 0 ? " 오늘" : ` ${d.label}요일`}${hasShows[i] ? "" : ", 상영 없음"}`}
                onClick={() => {
                  update({ day: i, picked: null });
                  track("select_day", { theater_id: theater.id, day: i });
                }}
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
                  {group.showings.map((s, i) => {
                    const few = isFewSeatsLeft(s.seatsLeft);
                    const isPicked = picked?.screenId === group.screen.id && picked.start === s.start;
                    return (
                      <button
                        // 같은 관·같은 시각 회차가 둘 올 때가 있다(롯데시네마 무대인사 회차 등)
                        key={`${s.start}-${s.seq ?? i}`}
                        type="button"
                        className={styles.time}
                        aria-pressed={isPicked}
                        aria-label={`${group.screen.name} ${s.start} 시작, ${s.end} 끝, ${s.seatsLeft}석 남음`}
                        onClick={() => {
                          update({ picked: { screenId: group.screen.id, start: s.start } });
                          track("select_showtime", { theater_id: theater.id, screen_id: group.screen.id, start: s.start });
                        }}
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
          <EmptyDay schedule={view} day={day} todayIso={todayIso} onPickDay={(d) => update({ day: d, picked: null })} />
        )}
      </div>
    </Frame>
  );
}

function Poster({ movie, className }: { movie: Movie; className: string }) {
  if (!movie.posterUrl) return <span className={className} aria-hidden="true" />;
  return <Image src={movie.posterUrl} alt={`${movie.title} 포스터`} width={56} height={84} unoptimized className={className} />;
}

/** "15세 이상 · 98분 · 시간표 메가박스 14:02 기준" */
function movieMeta(movie: Movie, schedule: Schedule): string {
  const source = schedule.live ? `시간표 ${schedule.live.source} ${asOfLabel(schedule.live.fetchedAt)}`.trim() : null;
  return [movie.rating || null, movie.runtimeMin ? `${movie.runtimeMin}분` : null, source].filter(Boolean).join(" · ");
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
