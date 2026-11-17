"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { BackSide, Object3D, PerspectiveCamera, type InstancedMesh } from "three";
import { screenRect } from "@/lib/domain/geometry";
import type { Auditorium, Seat, Vec3 } from "@/lib/domain/types";
import { frontHeadBoxes, HORIZONTAL_FOV_DEG, riserBoxes, roomBox, seatBoxes, type Box } from "./scene-layout";
import { useScreenTexture, type ScreenVideoStatus } from "./screen-texture";

export interface SceneProps {
  auditorium: Auditorium;
  seat: Seat;
  eye: Vec3;
  showHeads: boolean;
  videoUrl: string;
  playRequest: number;
  onVideoStatus: (status: ScreenVideoStatus) => void;
  /** 값이 바뀔 때마다 스크린 쪽으로 고개를 되돌린다 */
  recenterRequest: number;
  /** 스크린에서 고개를 많이 돌렸는지(true) 알려 준다 */
  onTurnedAwayChange: (turnedAway: boolean) => void;
}

/** 3D 시야 장면. three.js는 브라우저 전용이므로 next/dynamic(ssr: false)으로만 불러온다. */
export default function Scene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ near: 0.05, far: 200, position: [props.eye.x, props.eye.y, props.eye.z] }}
      style={{ touchAction: "none" }}
    >
      <SceneContents {...props} />
    </Canvas>
  );
}

function SceneContents({
  auditorium,
  seat,
  eye,
  showHeads,
  videoUrl,
  playRequest,
  onVideoStatus,
  recenterRequest,
  onTurnedAwayChange,
}: SceneProps) {
  const screen = screenRect(auditorium);
  const room = useMemo(() => roomBox(auditorium), [auditorium]);
  const risers = useMemo(() => riserBoxes(auditorium), [auditorium]);
  const seats = useMemo(() => seatBoxes(auditorium), [auditorium]);
  const heads = useMemo(() => frontHeadBoxes(auditorium, seat), [auditorium, seat]);
  const { texture, status } = useScreenTexture(videoUrl, auditorium.screen.aspectRatio.value, playRequest);

  useEffect(() => onVideoStatus(status), [status, onVideoStatus]);

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.35} />
      {/* 스크린 빛을 흉내 낸 조명 */}
      <pointLight position={[0, screen.centerY, 2]} intensity={60} distance={0} decay={1.2} />

      <mesh position={room.position}>
        <boxGeometry args={room.scale} />
        <meshStandardMaterial color="#2b2b2b" side={BackSide} />
      </mesh>

      <InstancedBoxes boxes={risers} color="#3a3a3a" />
      <InstancedBoxes boxes={seats.cushions} color="#5a1e1e" />
      <InstancedBoxes boxes={seats.backs} color="#5a1e1e" />
      {showHeads ? <InstancedBoxes boxes={heads} color="#141414" shape="sphere" /> : null}

      <mesh position={[0, screen.centerY, 0]}>
        <planeGeometry args={[screen.width, screen.height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <SeatCamera
        eye={eye}
        target={{ x: 0, y: screen.centerY, z: 0 }}
        aimKey={`${seat.id}:${recenterRequest}`}
        onTurnedAwayChange={onTurnedAwayChange}
      />
    </>
  );
}

function InstancedBoxes({ boxes, color, shape = "box" }: { boxes: Box[]; color: string; shape?: "box" | "sphere" }) {
  const ref = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new Object3D();
    boxes.forEach((box, i) => {
      dummy.position.set(...box.position);
      dummy.scale.set(...box.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [boxes]);

  if (boxes.length === 0) return null;
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, boxes.length]} key={boxes.length}>
      {shape === "sphere" ? <sphereGeometry args={[0.5, 16, 12]} /> : <boxGeometry args={[1, 1, 1]} />}
      <meshStandardMaterial color={color} />
    </instancedMesh>
  );
}

const MAX_PITCH = (80 * Math.PI) / 180;
const DRAG_SPEED = 0.005;
/** 스크린 방향에서 이만큼 넘게 돌리면 "스크린 보기" 버튼을 띄운다 */
const TURNED_AWAY = (60 * Math.PI) / 180;
const MAX_VERTICAL_FOV_DEG = 100;

/**
 * 좌석 위치에 고정된 카메라. 위치는 눈 위치로 고정하고, 드래그로 고개만 돌린다.
 * 좌우는 제한 없이 한 바퀴 돌 수 있고, 위아래는 ±80°까지다.
 * OrbitControls를 쓰지 않는 이유: 궤도 회전은 카메라 위치가 바뀌어 "그 좌석에서 보는 시야"가 아니게 된다.
 */
function SeatCamera({
  eye,
  target,
  aimKey,
  onTurnedAwayChange,
}: {
  eye: Vec3;
  target: Vec3;
  aimKey: string;
  onTurnedAwayChange: (turnedAway: boolean) => void;
}) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const size = useThree((state) => state.size);
  const getState = useThree((state) => state.get);
  const yaw = useRef(0);
  const pitch = useRef(0);
  /** 스크린 중심을 바라보는 yaw. 고개를 얼마나 돌렸는지 잴 때 기준 */
  const homeYaw = useRef(0);
  const turnedAway = useRef(false);
  const reportTurn = useRef(onTurnedAwayChange);
  useEffect(() => {
    reportTurn.current = onTurnedAwayChange;
  }, [onTurnedAwayChange]);

  // 좌석이 바뀌면 스크린 중심을 바라보게 초기화
  useLayoutEffect(() => {
    const dx = target.x - eye.x;
    const dy = target.y - eye.y;
    const dz = target.z - eye.z;
    yaw.current = Math.atan2(-dx, -dz);
    homeYaw.current = yaw.current;
    pitch.current = Math.atan2(dy, Math.hypot(dx, dz));
    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");
    if (turnedAway.current) {
      turnedAway.current = false;
      reportTurn.current(false);
    }
    // eye·target 변경(키 슬라이더)에는 고개 방향을 유지하려고 aimKey만 본다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aimKey]);

  useLayoutEffect(() => {
    camera.position.set(eye.x, eye.y, eye.z);
  }, [camera, eye.x, eye.y, eye.z]);

  useLayoutEffect(() => {
    // 화면 비율이 바뀔 때 가로 시야각을 유지하도록 세로 fov를 다시 계산 (store에서 직접 꺼내 수정)
    const current = getState().camera;
    if (!(current instanceof PerspectiveCamera)) return;
    const aspect = size.width / Math.max(1, size.height);
    const h = (HORIZONTAL_FOV_DEG * Math.PI) / 180;
    const v = (2 * Math.atan(Math.tan(h / 2) / aspect) * 180) / Math.PI;
    current.fov = Math.min(MAX_VERTICAL_FOV_DEG, v);
    current.updateProjectionMatrix();
  }, [getState, size.width, size.height]);

  useEffect(() => {
    const el = gl.domElement;
    let last: { x: number; y: number } | null = null;
    const down = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!last) return;
      yaw.current = wrapAngle(yaw.current + (e.clientX - last.x) * DRAG_SPEED);
      pitch.current = clamp(pitch.current + (e.clientY - last.y) * DRAG_SPEED, -MAX_PITCH, MAX_PITCH);
      last = { x: e.clientX, y: e.clientY };
      camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");
      const away = Math.abs(wrapAngle(yaw.current - homeYaw.current)) > TURNED_AWAY;
      if (away !== turnedAway.current) {
        turnedAway.current = away;
        reportTurn.current(away);
      }
    };
    const up = (e: PointerEvent) => {
      last = null;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [camera, gl]);

  return null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 각도를 -π ~ π 로 맞춘다 */
function wrapAngle(angle: number): number {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}
