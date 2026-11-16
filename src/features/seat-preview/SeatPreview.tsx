"use client";

import { useId, useMemo } from "react";
import { HORIZONTAL_FOV_DEG } from "@/features/viewer/scene-layout";
import { seatPreviewShapes } from "@/lib/domain/preview-projection";
import type { Auditorium, Seat } from "@/lib/domain/types";
import { seatName } from "@/lib/format";

const VIEW = { width: 1600, height: 900, hFovDeg: HORIZONTAL_FOV_DEG };

/** 그림 색 (3D 시야는 다크 모드와 상관없이 항상 어둡게 그린다) */
const C = {
  bg: "#0A0A0B",
  sky: "#9FB1C3",
  sun: "#EADCB2",
  mountains: "#66788A",
  water: "#2E3943",
  seatBack: "#18181B",
  head: "#050506",
};

const points = (pts: [number, number][]) => pts.map((p) => p.join(",")).join(" ");

/**
 * 작은 시야 (3번 화면). 3D 뷰어 첫 화면과 같은 카메라로 2D 투영해 그린다.
 * WebGL 없이 그려서 좌석을 바꿀 때마다 바로 바뀐다.
 */
export function SeatPreview({
  auditorium,
  seat,
  statureCm,
  className,
}: {
  auditorium: Auditorium;
  seat: Seat;
  statureCm: number;
  className?: string;
}) {
  const clipId = useId();
  const shapes = useMemo(() => seatPreviewShapes(auditorium, seat, statureCm, VIEW), [auditorium, seat, statureCm]);

  return (
    <svg
      role="img"
      aria-label={`${seatName(seat)}에서 본 스크린`}
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ display: "block", width: "100%", height: "auto", background: C.bg }}
    >
      <defs>
        <clipPath id={clipId}>
          <polygon points={points(shapes.screen)} />
        </clipPath>
      </defs>
      <polygon points={points(shapes.sky)} fill={C.sky} />
      <g clipPath={`url(#${clipId})`}>
        <polygon points={points(shapes.sun)} fill={C.sun} />
        <polygon points={points(shapes.mountains)} fill={C.mountains} />
        <polygon points={points(shapes.water)} fill={C.water} />
      </g>
      {shapes.heads.map((h, i) => (
        <g key={i} fill={C.head}>
          <ellipse cx={h.cx} cy={h.shoulderCy} rx={h.shoulderRx} ry={h.shoulderRy} />
          <ellipse cx={h.cx} cy={h.cy} rx={h.rx} ry={h.ry} />
        </g>
      ))}
      {shapes.seatBacks.map((b, i) => (
        <rect
          key={i}
          x={b.x + b.width * 0.04}
          y={b.y}
          width={b.width * 0.92}
          height={Math.max(0, VIEW.height - b.y) + 40}
          rx={Math.min(22, b.width * 0.18)}
          fill={C.seatBack}
        />
      ))}
    </svg>
  );
}
