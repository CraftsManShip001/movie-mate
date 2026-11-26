"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { SeatPreview } from "@/features/seat-preview/SeatPreview";
import { SceneErrorBoundary } from "@/features/viewer/SceneErrorBoundary";
import { SCREEN_VIDEO_URL } from "@/features/viewer/video-source";
import { eyePosition } from "@/lib/domain/geometry";
import type { Auditorium, Seat } from "@/lib/domain/types";
import styles from "./SeatPicker.module.css";

const Scene = dynamic(() => import("@/features/viewer/Scene"), { ssr: false });
const noop = () => {};

/**
 * 3번 화면 오른쪽의 시야. 그 자리의 3D 장면을 작게 바로 띄워 끌어서 둘러볼 수 있다.
 * 3D 첫 장면이 그려질 때까지(그리고 3D 를 못 쓰면 계속) 같은 카메라의 2D 그림을 밑에 깔아 둔다.
 */
export function LiveSeatPreview({ auditorium, seat, statureCm }: { auditorium: Auditorium; seat: Seat; statureCm: number }) {
  const eye = useMemo(() => eyePosition(auditorium, seat, statureCm), [auditorium, seat, statureCm]);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  return (
    <div className={styles.live}>
      <SeatPreview auditorium={auditorium} seat={seat} statureCm={statureCm} />
      <div className={styles.liveCanvas} data-ready={ready}>
        <SceneErrorBoundary fallback={null} onError={noop}>
          <Scene
            auditorium={auditorium}
            seat={seat}
            eye={eye}
            eyeReclined={null}
            reclined={false}
            showHeads
            videoUrl={SCREEN_VIDEO_URL}
            playRequest={0}
            onVideoStatus={noop}
            recenterRequest={0}
            onTurnedAwayChange={noop}
            onReady={onReady}
          />
        </SceneErrorBoundary>
      </div>
    </div>
  );
}
