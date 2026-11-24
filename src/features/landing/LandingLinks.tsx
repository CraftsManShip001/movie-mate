"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "@/features/flow/Frame";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { recentSeatHref, useRecentSeat } from "./recent-seat";
import styles from "./Landing.module.css";

type LandingTarget = Extract<AnalyticsEvent, { name: "landing_click" }>["params"]["target"];

/** 랜딩의 링크. 누르면 어디로 갔는지 GA에 남긴다. */
export function LandingLink({
  href,
  target,
  movieId,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  target: LandingTarget;
  movieId?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => track("landing_click", movieId ? { target, movie_id: movieId } : { target })}
    >
      {children}
    </Link>
  );
}

/** 다시 온 사람에게만 보이는 "N열 23번 이어 보기" 줄. 저장된 자리가 없으면 아무것도 그리지 않는다. */
export function RecentSeatRow() {
  const seat = useRecentSeat();
  if (!seat) return null;
  return (
    <LandingLink href={recentSeatHref(seat)} target="recent_seat" className={styles.recent}>
      <span className={styles.recentText}>
        <span className={styles.recentTitle}>{seat.seatName} 이어 보기</span>
        <span className={styles.recentSub}>
          {seat.theaterName} {seat.screenName}
        </span>
      </span>
      <ChevronRight color="var(--color-sub)" />
    </LandingLink>
  );
}
