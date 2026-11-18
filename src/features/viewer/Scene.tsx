"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactElement } from "react";
import {
  AdditiveBlending,
  BoxGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  RectAreaLight,
  type BufferGeometry,
  type InstancedMesh,
} from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { mmToM, screenRect } from "@/lib/domain/geometry";
import type { Auditorium, Seat, Vec3 } from "@/lib/domain/types";
import {
  CLOTHES_COLORS,
  chairLayout,
  chairStyle,
  downlightPositions,
  exitSignPositions,
  frontPeople,
  HAIR_COLORS,
  HORIZONTAL_FOV_DEG,
  riserBoxes,
  roomShape,
  sconcePositions,
  SKIN_COLORS,
  stepLightBoxes,
  type Tuple3,
} from "./scene-layout";
import {
  acousticPanelTexture,
  buildChair,
  buildPerson,
  carpetTexture,
  exitSignTexture,
  fabricBumpTexture,
  glowTexture,
} from "./scene-models";
import { useScreenTexture, type ScreenVideoStatus } from "./screen-texture";

// 스크린 면광원(RectAreaLight)을 쓰려면 한 번 초기화해야 한다
RectAreaLightUniformsLib.init();

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
  // 큰 상영관(의자·사람 수백 개)에서 프레임이 떨어지면 해상도를 낮추고, 여유가 생기면 다시 올린다
  const [dpr, setDpr] = useState(() => Math.min(2, typeof window === "undefined" ? 1 : window.devicePixelRatio || 1));
  return (
    <Canvas
      dpr={dpr}
      camera={{ near: 0.05, far: 200, position: [props.eye.x, props.eye.y, props.eye.z] }}
      style={{ touchAction: "none" }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr((d) => Math.max(1, d - 0.5))}
        onIncline={() => setDpr((d) => Math.min(2, window.devicePixelRatio || 1, d + 0.5))}
      />
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
  const { texture, status } = useScreenTexture(videoUrl, auditorium.screen.aspectRatio.value, playRequest);

  useEffect(() => onVideoStatus(status), [status, onVideoStatus]);

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <Lights auditorium={auditorium} />
      <Room auditorium={auditorium} />
      <Chairs auditorium={auditorium} />
      {showHeads ? <People auditorium={auditorium} seat={seat} /> : null}

      <mesh position={[0, screen.centerY, 0]}>
        <planeGeometry args={[screen.width, screen.height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <ScreenMasking width={screen.width} height={screen.height} centerY={screen.centerY} />

      <SeatCamera
        eye={eye}
        target={{ x: 0, y: screen.centerY, z: 0 }}
        aimKey={`${seat.id}:${recenterRequest}`}
        onTurnedAwayChange={onTurnedAwayChange}
      />
    </>
  );
}

/**
 * 조명: 상영 중인 어두운 관. 스크린이 가장 큰 광원(면광원)이고,
 * 뒤쪽 영사실과 벽등에서 새는 약한 빛이 의자 뒤판·사람 윤곽을 겨우 드러낸다.
 */
function Lights({ auditorium }: { auditorium: Auditorium }) {
  const screen = screenRect(auditorium);
  const room = roomShape(auditorium);
  const screenLight = useMemo(() => {
    const light = new RectAreaLight("#d9e2ff", 2.2, screen.width, screen.height);
    light.position.set(0, screen.centerY, 0.05);
    light.lookAt(0, screen.centerY, 10);
    return light;
  }, [screen.width, screen.height, screen.centerY]);
  return (
    <>
      <ambientLight intensity={0.12} />
      <hemisphereLight args={["#3a3f52", "#0c0a0a", 0.35]} />
      {/* 영사실 쪽에서 오는 약한 빛 */}
      <directionalLight position={[0, room.height, room.depth + 3]} intensity={0.16} color="#b8c4e0" />
      <primitive object={screenLight} />
    </>
  );
}

function Room({ auditorium }: { auditorium: Auditorium }) {
  const room = roomShape(auditorium);
  const length = room.depth - room.front;
  const midZ = (room.depth + room.front) / 2;
  const risers = useMemo(() => riserBoxes(auditorium), [auditorium]);
  const steps = useMemo(() => stepLightBoxes(auditorium), [auditorium]);
  const sconces = useMemo(() => sconcePositions(auditorium), [auditorium]);
  const exits = useMemo(() => exitSignPositions(auditorium), [auditorium]);
  const downlights = useMemo(() => downlightPositions(auditorium), [auditorium]);

  const textures = useMemo(() => {
    const carpet = carpetTexture();
    carpet.repeat.set(room.width / 2.5, length / 2.5);
    const riserCarpet = carpet.clone();
    riserCarpet.repeat.set(room.width / 2.5, 1);
    const sidePanel = acousticPanelTexture();
    sidePanel.repeat.set(length / 1.2, 1);
    const backPanel = sidePanel.clone();
    backPanel.repeat.set(room.width / 1.2, 1);
    return { carpet, riserCarpet, sidePanel, backPanel, exit: exitSignTexture(), glow: glowTexture() };
  }, [room.width, length]);
  useEffect(() => () => Object.values(textures).forEach((t) => t.dispose()), [textures]);

  return (
    <group>
      {/* 바닥·단차: 카펫 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, midZ]}>
        <planeGeometry args={[room.width, length]} />
        <meshStandardMaterial map={textures.carpet} roughness={1} />
      </mesh>
      <Instanced
        geometry={UNIT_BOX}
        items={risers.map((b) => ({ position: b.position, scale: b.scale }))}
        material={<meshStandardMaterial map={textures.riserCarpet} roughness={1} />}
      />

      {/* 옆벽·뒷벽: 흡음 패널, 앞벽·천장: 검은 마감 */}
      <mesh position={[-room.width / 2, room.height / 2, midZ]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, room.height]} />
        <meshStandardMaterial map={textures.sidePanel} roughness={0.95} />
      </mesh>
      <mesh position={[room.width / 2, room.height / 2, midZ]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, room.height]} />
        <meshStandardMaterial map={textures.sidePanel} roughness={0.95} />
      </mesh>
      <mesh position={[0, room.height / 2, room.depth]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[room.width, room.height]} />
        <meshStandardMaterial map={textures.backPanel} roughness={0.95} />
      </mesh>
      <mesh position={[0, room.height / 2, room.front]}>
        <planeGeometry args={[room.width, room.height]} />
        <meshStandardMaterial color="#060606" roughness={1} />
      </mesh>
      <mesh position={[0, room.height, midZ]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[room.width, length]} />
        <meshStandardMaterial color="#121214" roughness={1} />
      </mesh>

      {/* 영사실 창 */}
      <mesh position={[0, room.height - 1.2, room.depth - 0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.9, 0.5]} />
        <meshBasicMaterial color="#9fb4e6" toneMapped={false} />
      </mesh>

      {/* 통로 계단 발밑 등 */}
      <Instanced geometry={UNIT_BOX} items={steps} material={<meshBasicMaterial color="#ffb45e" toneMapped={false} />} />

      {/* 벽등과 벽에 번지는 빛 */}
      <Instanced
        geometry={UNIT_BOX}
        items={sconces.map((s) => ({ position: s.position, scale: [0.06, 0.32, 0.18] as Tuple3 }))}
        material={<meshBasicMaterial color="#ffd7a6" toneMapped={false} />}
      />
      <Instanced
        geometry={UNIT_PLANE}
        items={sconces.map((s) => ({
          position: [s.position[0] - s.side * 0.02, s.position[1], s.position[2]] as Tuple3,
          rotation: [0, -s.side * (Math.PI / 2), 0] as Tuple3,
          scale: [1.8, 1.8, 1] as Tuple3,
        }))}
        material={
          <meshBasicMaterial map={textures.glow} transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
        }
      />

      {/* 천장 다운라이트(상영 중이라 아주 어둡게) */}
      <Instanced
        geometry={DOWNLIGHT}
        items={downlights.map((position) => ({ position }))}
        material={<meshBasicMaterial color="#5c4c3a" toneMapped={false} />}
      />

      {/* 비상구 표시등 */}
      {exits.map((e, i) => (
        <mesh key={i} position={e.position} rotation={[0, -e.side * (Math.PI / 2), 0]}>
          <planeGeometry args={[0.5, 0.25]} />
          <meshBasicMaterial map={textures.exit} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** 스크린 둘레의 검은 마스킹 천 */
function ScreenMasking({ width, height, centerY }: { width: number; height: number; centerY: number }) {
  const border = 0.35;
  const bars: { position: Tuple3; scale: Tuple3 }[] = [
    { position: [0, centerY + height / 2 + border / 2, -0.03], scale: [width + border * 2, border, 0.04] },
    { position: [0, centerY - height / 2 - border / 2, -0.03], scale: [width + border * 2, border, 0.04] },
    { position: [-width / 2 - border / 2, centerY, -0.03], scale: [border, height, 0.04] },
    { position: [width / 2 + border / 2, centerY, -0.03], scale: [border, height, 0.04] },
  ];
  return <Instanced geometry={UNIT_BOX} items={bars} material={<meshStandardMaterial color="#030303" roughness={1} />} />;
}

const CHAIR_LOOK = {
  standard: {
    upholstery: { color: "#7f1b23", roughness: 0.95, bumpScale: 1.2 },
    shell: { color: "#1b1b1e", roughness: 0.42 },
    arm: { color: "#202023", roughness: 0.45 },
  },
  recliner: {
    upholstery: { color: "#6a2d25", roughness: 0.5, bumpScale: 0.35 },
    shell: { color: "#141212", roughness: 0.5 },
    arm: { color: "#2c1e1b", roughness: 0.55 },
  },
} as const;

function Chairs({ auditorium }: { auditorium: Auditorium }) {
  const style = chairStyle(auditorium.format);
  const { seatWidth, seatHeight, seatBackHeight } = auditorium.layout;
  const geometry = useMemo(
    () =>
      buildChair({
        style,
        width: mmToM(seatWidth.value),
        seatHeight: mmToM(seatHeight.value),
        backHeight: mmToM(seatBackHeight.value),
      }),
    [style, seatWidth.value, seatHeight.value, seatBackHeight.value],
  );
  useEffect(() => () => Object.values(geometry).forEach((g) => g.dispose()), [geometry]);
  const layout = useMemo(() => chairLayout(auditorium), [auditorium]);
  const bump = useMemo(() => {
    const t = fabricBumpTexture();
    t.repeat.set(5, 5);
    return t;
  }, []);
  useEffect(() => () => bump.dispose(), [bump]);
  const chairs = useMemo(() => layout.chairs.map((position) => ({ position })), [layout]);
  const arms = useMemo(() => layout.arms.map((position) => ({ position })), [layout]);
  const look = CHAIR_LOOK[style];

  return (
    <>
      <Instanced
        geometry={geometry.upholstery}
        items={chairs}
        material={<meshStandardMaterial {...look.upholstery} bumpMap={bump} roughnessMap={bump} />}
      />
      <Instanced geometry={geometry.shell} items={chairs} material={<meshStandardMaterial {...look.shell} />} />
      <Instanced
        geometry={geometry.arm}
        items={arms}
        material={<meshStandardMaterial {...look.arm} side={DoubleSide} />}
      />
    </>
  );
}

function People({ auditorium, seat }: { auditorium: Auditorium; seat: Seat }) {
  const geometry = useMemo(() => buildPerson(), []);
  useEffect(() => () => Object.values(geometry).forEach((g) => g.dispose()), [geometry]);
  const people = useMemo(() => frontPeople(auditorium, seat), [auditorium, seat]);
  const { placed, hair, skin, clothes } = useMemo(
    () => ({
      placed: people.map((p) => ({
        position: p.position,
        rotation: [0, p.yaw, p.roll] as Tuple3,
        scale: [p.scale, p.scale, p.scale] as Tuple3,
      })),
      hair: people.map((p) => HAIR_COLORS[p.hair]),
      skin: people.map((p) => SKIN_COLORS[p.skin]),
      clothes: people.map((p) => CLOTHES_COLORS[p.clothes]),
    }),
    [people],
  );
  return (
    <>
      <Instanced
        geometry={geometry.head}
        items={placed}
        colors={hair}
        material={<meshStandardMaterial roughness={0.75} />}
      />
      <Instanced
        geometry={geometry.skin}
        items={placed}
        colors={skin}
        material={<meshStandardMaterial roughness={0.6} />}
      />
      <Instanced
        geometry={geometry.body}
        items={placed}
        colors={clothes}
        material={<meshStandardMaterial roughness={0.92} />}
      />
    </>
  );
}

const UNIT_BOX = new BoxGeometry(1, 1, 1);
const UNIT_PLANE = new PlaneGeometry(1, 1);
const DOWNLIGHT = new CylinderGeometry(0.07, 0.07, 0.02, 20);

interface InstanceItem {
  position: Tuple3;
  rotation?: Tuple3;
  scale?: Tuple3;
}

/** 같은 모양을 여러 곳에 놓는다(인스턴싱). colors 를 주면 인스턴스마다 색을 곱한다. */
function Instanced({
  geometry,
  items,
  material,
  colors,
}: {
  geometry: BufferGeometry;
  items: InstanceItem[];
  material: ReactElement;
  colors?: string[];
}) {
  const ref = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new Object3D();
    const color = new Color();
    items.forEach((item, i) => {
      dummy.position.set(...item.position);
      dummy.rotation.set(...(item.rotation ?? [0, 0, 0]));
      dummy.scale.set(...(item.scale ?? [1, 1, 1]));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      if (colors) mesh.setColorAt(i, color.set(colors[i] ?? "#ffffff"));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items, colors]);

  if (items.length === 0) return null;
  return (
    <instancedMesh ref={ref} args={[geometry, undefined, items.length]} key={`${geometry.uuid}:${items.length}`}>
      {material}
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
