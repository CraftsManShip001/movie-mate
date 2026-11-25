"use client";

import { useEffect, useRef, type RefObject } from "react";
import { neckAngles, neckStrained, torsoTiltDeg, type HeadPose } from "./head-pose";
import styles from "./SeatViewer.module.css";

/** 발받침이 들리는 각도(도). scene-models 의 RECLINE_FOOT_RAD 와 같은 값 */
const FOOT_DEG = 80;
const RAD = Math.PI / 180;

// 옆모습 치수(그림 좌표). 오른쪽이 스크린 쪽이다
const HIP = { x: 62, y: 80 };
const TORSO = 38;
const NECK = 7;
const THIGH = 30;
const SHIN = 22;
const RAY = 110;

/**
 * 좌하단의 옆모습 그림. 시야를 드래그하거나 눕기를 하면 목·상체·다리가 따라 움직여,
 * 지금 시선을 보려면 목을 얼마나 꺾어야 하는지 보여 준다. 실선은 지금 보는 방향, 점선은 스크린 중심 방향.
 * 매 프레임 poseRef 를 읽어 SVG 속성만 바꾼다(React 다시 그리기 없음).
 */
export function NeckGuide({ poseRef }: { poseRef: RefObject<HeadPose> }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const torsoRef = useRef<SVGLineElement>(null);
  const backRef = useRef<SVGLineElement>(null);
  const shinRef = useRef<SVGLineElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const screenRayRef = useRef<SVGLineElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    let last = "";
    const draw = () => {
      frame = requestAnimationFrame(draw);
      const pose = poseRef.current;
      if (!pose) return;
      const tilt = torsoTiltDeg(pose.recline);
      const pitch = pose.pitch / RAD;
      const screenPitch = pose.screenPitch / RAD;
      const key = `${tilt.toFixed(1)}|${pitch.toFixed(1)}|${screenPitch.toFixed(1)}|${(pose.yaw / RAD).toFixed(0)}`;
      if (key === last) return;
      last = key;

      // 상체: 엉덩이에서 뒤(왼쪽)로 tilt 만큼 기운다
      const sx = HIP.x - TORSO * Math.sin(tilt * RAD);
      const sy = HIP.y - TORSO * Math.cos(tilt * RAD);
      const nx = sx - NECK * Math.sin(tilt * RAD);
      const ny = sy - NECK * Math.cos(tilt * RAD);
      setLine(torsoRef.current, HIP.x, HIP.y, nx, ny);
      // 등받이: 상체 바로 뒤
      const bx = HIP.x - 7;
      setLine(backRef.current, bx, HIP.y + 4, bx - (TORSO + 14) * Math.sin(tilt * RAD), HIP.y + 4 - (TORSO + 14) * Math.cos(tilt * RAD));
      // 정강이: 누우면 발받침과 함께 앞으로 들린다
      const foot = FOOT_DEG * pose.recline * RAD;
      const kx = HIP.x + THIGH;
      setLine(shinRef.current, kx, HIP.y, kx + SHIN * Math.sin(foot), HIP.y + SHIN * Math.cos(foot));
      // 머리: 목 끝을 축으로 시선 각도만큼 든다. 스크린 방향 점선은 머리 안에서 (스크린 - 시선)만큼 더 돌린다
      headRef.current?.setAttribute("transform", `translate(${nx.toFixed(2)} ${ny.toFixed(2)}) rotate(${(-pitch).toFixed(2)})`);
      screenRayRef.current?.setAttribute("transform", `rotate(${(pitch - screenPitch).toFixed(2)} 6 -11)`);

      const neck = neckAngles(pose);
      rootRef.current?.toggleAttribute("data-strain", neckStrained(neck));
      if (textRef.current) textRef.current.textContent = neckLabel(neck);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [poseRef]);

  return (
    <div ref={rootRef} className={styles.neck}>
      <svg viewBox="0 0 180 112" className={styles.neckFigure} aria-hidden="true">
        {/* 의자: 방석·등받이 */}
        <line x1={HIP.x - 8} y1={HIP.y + 4} x2={HIP.x + THIGH + 4} y2={HIP.y + 4} className={styles.neckChair} />
        <line ref={backRef} className={styles.neckChair} />
        {/* 몸: 허벅지·정강이·상체 */}
        <line x1={HIP.x} y1={HIP.y} x2={HIP.x + THIGH} y2={HIP.y} className={styles.neckBody} />
        <line ref={shinRef} className={styles.neckBody} />
        <line ref={torsoRef} className={styles.neckBody} />
        <g ref={headRef}>
          <line ref={screenRayRef} x1={6} y1={-11} x2={RAY} y2={-11} className={styles.neckScreenRay} />
          <line x1={6} y1={-11} x2={RAY} y2={-11} className={styles.neckRay} />
          {/* 옆얼굴: 머리, 코, 눈 */}
          <ellipse cx={1} cy={-11} rx={8.5} ry={10.5} className={styles.neckBody} />
          <path d="M 9 -13 L 12 -8.5 L 9 -7.5" className={styles.neckBody} />
          <circle cx={6} cy={-12} r={1.1} className={styles.neckEye} />
        </g>
      </svg>
      <span ref={textRef} className={styles.neckText} />
    </div>
  );
}

function setLine(el: SVGLineElement | null, x1: number, y1: number, x2: number, y2: number) {
  if (!el) return;
  el.setAttribute("x1", x1.toFixed(2));
  el.setAttribute("y1", y1.toFixed(2));
  el.setAttribute("x2", x2.toFixed(2));
  el.setAttribute("y2", y2.toFixed(2));
}

/** "목 20° 위로 · 왼쪽 30°" 처럼 꺾은 쪽만 말한다. 거의 안 꺾었으면 "목 편해요" */
export function neckLabel({ up, turn }: { up: number; turn: number }): string {
  const u = Math.round(up);
  const t = Math.round(turn);
  const parts: string[] = [];
  if (Math.abs(u) >= 3) parts.push(`${Math.abs(u)}° ${u > 0 ? "위로" : "아래로"}`);
  if (Math.abs(t) >= 3) parts.push(`${t > 0 ? "왼쪽" : "오른쪽"} ${Math.abs(t)}°`);
  return parts.length === 0 ? "목 편해요" : `목 ${parts.join(" · ")}`;
}
