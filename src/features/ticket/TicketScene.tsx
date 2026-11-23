"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { preconnect } from "react-dom";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { readShowQuery, showQueryString } from "@/features/flow/show-query";
import { useSeatView } from "@/features/viewer/useSeatView";
import { SCREEN_VIDEO_ORIGIN } from "@/features/viewer/video-source";
import { findSeat } from "@/lib/domain/geometry";
import type { Auditorium } from "@/lib/domain/types";
import { seatName } from "@/lib/format";
import type { Movie } from "@/lib/showtimes/types";
import { TicketPaper, TicketPoster } from "./Ticket";
import { buildTicketInfo } from "./ticket-info";
import styles from "./TicketScene.module.css";

/** 애니메이션 길이(3.4초) + 멈춘 모습을 잠깐 보여 주는 시간 */
const SCENE_MS = 3400 + 350;

interface TicketSceneProps {
  theaterId: string;
  theaterName: string;
  screenName: string;
  auditorium: Auditorium;
  seatId: string;
  movie: Movie;
}

/**
 * 4 · 티켓. 버튼 없이 지나가는 장면.
 * 키오스크 출력구에서 입장권이 나오고 → 툭 떨어지고 → 두 장으로 나뉘며 왼쪽 장이 포스터 면으로 뒤집힌 뒤 → 5번으로 넘어간다.
 * 화면을 누르면 건너뛰고, 움직임 줄이기 설정이면 바로 넘어간다.
 * 뒤로 가기를 했을 때 이 장면을 다시 보지 않도록 replace로 이동한다.
 */
export function TicketScene({ theaterId, theaterName, screenName, auditorium, seatId, movie }: TicketSceneProps) {
  // 다음 화면(시야)에서 받을 스크린 영상 서버와 미리 연결해 둔다
  preconnect(SCREEN_VIDEO_ORIGIN, { crossOrigin: "anonymous" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const show = readShowQuery(searchParams);
  const seat = useMemo(() => findSeat(auditorium, seatId), [auditorium, seatId]);
  const { numbers } = useSeatView(auditorium, seat);
  const viewHref = `/theaters/${theaterId}/${auditorium.id}/seats/${seatId}${showQueryString(show)}`;
  const done = useRef(false);

  const goToView = useCallback(() => {
    if (done.current) return;
    done.current = true;
    router.replace(viewHref);
  }, [router, viewHref]);

  useEffect(() => {
    router.prefetch(viewHref);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      goToView();
      return;
    }
    const timer = window.setTimeout(goToView, SCENE_MS);
    return () => window.clearTimeout(timer);
  }, [router, viewHref, goToView]);

  if (!seat) return null;

  const info = buildTicketInfo({
    movie,
    theaterName,
    screenName,
    seat,
    date: show.date,
    time: show.time,
    numbers,
  });
  const poster = <TicketPoster posterUrl={info.posterUrl} fallbackUrl={info.posterFallbackUrl} />;

  return (
    <div className={styles.stage}>
      <div className={styles.kiosk}>
        <div className={styles.slot} />
      </div>
      <div className={styles.out}>
        <div className={styles.scale}>
          {/* 오른쪽 장: 입장권 면 그대로 */}
          <div className={`${styles.anchor} ${styles.dropped}`}>
            <div className={`${styles.copy} ${styles.shadow}`}>
              <TicketPaper info={info} />
            </div>
          </div>
          {/* 왼쪽 장: 출력 → 툭 → 왼쪽으로 → 포스터 면으로 뒤집힘 */}
          <div className={`${styles.anchor} ${styles.perspective} ${styles.shadow}`}>
            <div className={`${styles.print} ${styles.d3}`}>
              <div className={`${styles.pop} ${styles.d3}`}>
                <div className={`${styles.moveLeft} ${styles.d3}`}>
                  <div className={`${styles.flip} ${styles.d3}`}>
                    <div className={`${styles.card} ${styles.d3}`}>
                      <div className={styles.side}>
                        <TicketPaper info={info} />
                      </div>
                      <div className={`${styles.side} ${styles.back}`}>{poster}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className={styles.skip} onClick={goToView} aria-label={`건너뛰고 ${seatName(seat)} 시야 보기`} autoFocus />
      <p className="visually-hidden" aria-live="polite">
        {seatName(seat)} 티켓을 만들고 있어요. 곧 시야 화면으로 넘어가요.
      </p>
    </div>
  );
}
