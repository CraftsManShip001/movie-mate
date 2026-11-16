"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import {
  DEFAULT_STATURE_CM,
  MAX_STATURE_CM,
  MIN_STATURE_CM,
  seatedEyeHeightM,
} from "@/lib/domain/anthropometry";
import { eyePosition, findSeat, rowFloorY, screenRect, seatInFront } from "@/lib/domain/geometry";
import { computeViewMetrics, cValue, frontHeadOcclusionRatio } from "@/lib/domain/metrics";
import type { Auditorium } from "@/lib/domain/types";
import type { ScreenVideoStatus } from "./screen-texture";
import styles from "./SeatViewer.module.css";
import { useStature } from "./useStature";
import { SCREEN_VIDEO_CREDIT, SCREEN_VIDEO_URL } from "./video-source";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className={styles.placeholder}>3D 장면을 불러오는 중</div>,
});

const VIDEO_STATUS_TEXT: Record<ScreenVideoStatus, string> = {
  loading: "영상 불러오는 중 (테스트 패턴 표시)",
  playing: "영상 재생 중",
  blocked: "자동재생이 막혔습니다",
  fallback: "영상을 쓸 수 없어 테스트 패턴을 표시합니다",
};

interface SeatViewerProps {
  auditorium: Auditorium;
  seatId: string;
}

export function SeatViewer({ auditorium, seatId }: SeatViewerProps) {
  const seat = useMemo(() => findSeat(auditorium, seatId), [auditorium, seatId]);
  const [stature, setStature] = useStature();
  const [showHeads, setShowHeads] = useState(true);
  const [videoStatus, setVideoStatus] = useState<ScreenVideoStatus>("loading");
  const [playRequest, setPlayRequest] = useState(0);
  const onVideoStatus = useCallback((status: ScreenVideoStatus) => setVideoStatus(status), []);

  const view = useMemo(() => {
    if (!seat) return null;
    const screen = screenRect(auditorium);
    const eye = eyePosition(auditorium, seat, stature);
    const metrics = computeViewMetrics(eye, screen);
    const front = seatInFront(auditorium, seat);
    const frontEye = front ? eyePosition(auditorium, front, DEFAULT_STATURE_CM) : null;
    return {
      eye,
      metrics,
      eyeAboveFloor: eye.y - rowFloorY(auditorium, seat.rowIndex),
      cValueM: frontEye ? cValue(eye, frontEye, screen) : null,
      occlusion: frontEye ? frontHeadOcclusionRatio(eye, frontEye, screen) : null,
    };
  }, [auditorium, seat, stature]);

  if (!seat || !view) return <p>좌석을 찾을 수 없습니다.</p>;
  const { metrics } = view;

  return (
    <div className={styles.viewer}>
      <div className={styles.canvas}>
        <Scene
          auditorium={auditorium}
          seat={seat}
          eye={view.eye}
          showHeads={showHeads}
          videoUrl={SCREEN_VIDEO_URL}
          playRequest={playRequest}
          onVideoStatus={onVideoStatus}
        />
      </div>
      <p className="muted">화면을 드래그해서 둘러보세요.</p>

      <section className={styles.controls}>
        <label className={styles.field}>
          <span>
            키 {stature}cm (앉은 눈높이 {Math.round(seatedEyeHeightM(stature) * 100)}cm)
          </span>
          <input
            type="range"
            min={MIN_STATURE_CM}
            max={MAX_STATURE_CM}
            step={1}
            value={stature}
            onChange={(e) => setStature(Number(e.target.value))}
          />
        </label>
        <button type="button" onClick={() => setStature(DEFAULT_STATURE_CM)}>
          평균 키로
        </button>
        <label className={styles.toggle}>
          <input type="checkbox" checked={showHeads} onChange={(e) => setShowHeads(e.target.checked)} />
          앞사람 머리
        </label>
      </section>

      <dl className={styles.metrics}>
        <dt>수평 시야각</dt>
        <dd>{metrics.horizontalFovDeg.toFixed(1)}°</dd>
        <dt>올려보는 목 각도</dt>
        <dd>
          {metrics.neckElevationDeg.toFixed(1)}° (스크린 윗변 {metrics.screenTopElevationDeg.toFixed(1)}°)
        </dd>
        <dt>스크린까지 거리</dt>
        <dd>
          {metrics.distanceToScreenM.toFixed(1)}m (중심까지 {metrics.distanceToScreenCenterM.toFixed(1)}m)
        </dd>
        <dt>눈높이</dt>
        <dd>좌석 바닥에서 {view.eyeAboveFloor.toFixed(2)}m</dd>
        {view.cValueM !== null && view.occlusion !== null ? (
          <>
            <dt>앞사람 시선 여유(C값)</dt>
            <dd>
              {Math.round(view.cValueM * 1000)}mm · 스크린 하단 {Math.round(view.occlusion * 100)}% 가림
            </dd>
          </>
        ) : null}
      </dl>

      <p className="muted">
        {VIDEO_STATUS_TEXT[videoStatus]}
        {videoStatus === "blocked" ? (
          <>
            {" "}
            <button type="button" onClick={() => setPlayRequest((n) => n + 1)}>
              영상 재생
            </button>
          </>
        ) : null}
      </p>
      {auditorium.estimated ? (
        <p className="muted">단차, 스크린 하단 높이 등 일부 치수는 추정값이라 실제와 다를 수 있습니다.</p>
      ) : null}
      <p className="muted">{SCREEN_VIDEO_CREDIT}</p>
    </div>
  );
}
