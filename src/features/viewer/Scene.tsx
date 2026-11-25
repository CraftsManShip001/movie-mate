"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactElement, type RefObject } from "react";
import {
  AdditiveBlending,
  BoxGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Matrix4,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  RectAreaLight,
  type BufferGeometry,
  type InstancedMesh,
  type Texture,
} from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { DEFAULT_STATURE_CM } from "@/lib/domain/anthropometry";
import { mmToM, RECLINE, reclineEyeOffset, rowCenterZ, screenRect, seatFloorPosition } from "@/lib/domain/geometry";
import type { Auditorium, Seat, Vec3 } from "@/lib/domain/types";
import {
  balconyParapets,
  CLOTHES_COLORS,
  chairGroups,
  downlightPositions,
  exitSignPositions,
  WALL_INSET,
  frontPeople,
  HAIR_COLORS,
  HORIZONTAL_FOV_DEG,
  riserBoxes,
  roomShape,
  sconcePositions,
  SKIN_COLORS,
  stepLightBoxes,
  privateBoxRooms,
  type ChairGroup,
  type ChairStyle,
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
  type MovingPart,
} from "./scene-models";
import type { HeadPose } from "./head-pose";
import { useScreenTexture, type ScreenVideoStatus } from "./screen-texture";

// 스크린 면광원(RectAreaLight)을 쓰려면 한 번 초기화해야 한다
RectAreaLightUniformsLib.init();

export interface SceneProps {
  auditorium: Auditorium;
  seat: Seat;
  eye: Vec3;
  /** 리클라이너를 끝까지 젖혔을 때 눈 위치. 리클라이너가 아니면 null */
  eyeReclined: Vec3 | null;
  /** 눕기: 바뀌면 의자·앞사람·시선이 RECLINE_SECONDS 동안 함께 움직인다 */
  reclined: boolean;
  showHeads: boolean;
  videoUrl: string;
  playRequest: number;
  onVideoStatus: (status: ScreenVideoStatus) => void;
  /** 값이 바뀔 때마다 스크린 쪽으로 고개를 되돌린다 */
  recenterRequest: number;
  /** 스크린에서 고개를 많이 돌렸는지(true) 알려 준다 */
  onTurnedAwayChange: (turnedAway: boolean) => void;
  /** 첫 장면을 그렸을 때 한 번 부른다(불러오는 중 표시를 걷는다) */
  onReady?: () => void;
  /** 매 프레임 지금 고개 방향을 써 넣는다(좌하단 목 그림용) */
  poseRef?: RefObject<HeadPose>;
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
      {props.onReady ? <FirstFrame onReady={props.onReady} /> : null}
    </Canvas>
  );
}

function SceneContents({
  auditorium,
  seat,
  eye,
  eyeReclined,
  reclined,
  showHeads,
  videoUrl,
  playRequest,
  onVideoStatus,
  recenterRequest,
  onTurnedAwayChange,
  poseRef,
}: SceneProps) {
  const screen = screenRect(auditorium);
  // 젖힌 정도(0~1). 매 프레임 바뀌므로 React 상태가 아니라 ref 로 두고, 움직이는 부분이 useFrame 에서 읽는다
  const recline = useRef(0);
  const { texture, status } = useScreenTexture(videoUrl, auditorium.screen.aspectRatio.value, playRequest);

  useEffect(() => onVideoStatus(status), [status, onVideoStatus]);

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <Lights auditorium={auditorium} />
      <BoxLamp auditorium={auditorium} seat={seat} />
      <Room auditorium={auditorium} />
      <ReclineDriver target={reclined && eyeReclined ? 1 : 0} valueRef={recline} />
      <Chairs auditorium={auditorium} recline={recline} />
      {showHeads ? <People auditorium={auditorium} seat={seat} recline={recline} /> : null}

      <mesh position={[0, screen.centerY, 0]}>
        <planeGeometry args={[screen.width, screen.height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <ScreenMasking width={screen.width} height={screen.height} centerY={screen.centerY} />
      {auditorium.screen.sideScreens ? (
        <SideScreens auditorium={auditorium} texture={texture} depth={mmToM(auditorium.screen.sideScreens.value)} />
      ) : null}

      <SeatCamera
        eye={eye}
        eyeReclined={eyeReclined ?? eye}
        recline={recline}
        poseRef={poseRef}
        target={{ x: 0, y: screen.centerY, z: 0 }}
        aimKey={`${seat.id}:${recenterRequest}`}
        onTurnedAwayChange={onTurnedAwayChange}
      />
    </>
  );
}

/**
 * PRIVATE BOX에 앉으면 그 방 천장 조명(어둡게 줄인 샹들리에)만 켠다.
 * 방마다 켜면 빛이 많아 무거워지고, 다른 방은 유리창 너머라 잘 보이지 않는다.
 */
function BoxLamp({ auditorium, seat }: { auditorium: Auditorium; seat: Seat }) {
  const lamp = useMemo(() => {
    if (auditorium.rows[seat.rowIndex]?.zoneKind !== "privateBox") return null;
    const x = seatFloorPosition(auditorium, seat).x;
    const lamps = privateBoxRooms(auditorium).lamps.filter((p) => Math.abs(p[2] - rowCenterZ(auditorium, seat.rowIndex)) < 0.01);
    return lamps.reduce<Tuple3 | null>((best, p) => (best === null || Math.abs(p[0] - x) < Math.abs(best[0] - x) ? p : best), null);
  }, [auditorium, seat]);
  if (!lamp) return null;
  return <pointLight position={[lamp[0], lamp[1] - 0.15, lamp[2]]} intensity={7} distance={5} decay={2} color="#ffcf94" />;
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
  const boxRooms = useMemo(() => privateBoxRooms(auditorium), [auditorium]);
  const parapets = useMemo(() => balconyParapets(auditorium), [auditorium]);
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
      {/* PRIVATE BOX: 위층 방. 칸막이·뒷벽·천장은 어두운 패널, 스크린 쪽은 유리창, 천장 가운데 따뜻한 조명 */}
      <Instanced geometry={UNIT_BOX} items={boxRooms.solid} material={<meshStandardMaterial color="#4a382d" roughness={0.75} />} />
      {/* SWEETBOX 같은 열린 발코니 앞 난간 */}
      <Instanced geometry={UNIT_BOX} items={parapets} material={<meshStandardMaterial color="#5a463b" roughness={0.7} />} />
      <Instanced geometry={UNIT_BOX} items={boxRooms.frames} material={<meshStandardMaterial color="#8a7a68" roughness={0.4} metalness={0.5} />} />
      <Instanced
        geometry={UNIT_BOX}
        items={boxRooms.glass}
        material={
          <meshStandardMaterial color="#9fb3c4" roughness={0.05} metalness={0.2} transparent opacity={0.14} depthWrite={false} />
        }
      />
      <Instanced
        geometry={LAMP}
        items={boxRooms.lamps.map((position) => ({ position }))}
        material={<meshBasicMaterial color="#ffd9a3" toneMapped={false} />}
      />

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

/**
 * SCREENX 양옆 벽 영상. 앞 스크린 영상이 양옆 벽으로 이어지는 장면을 흉내 내어,
 * 같은 영상을 어둡게 해서 벽(스크린 높이만큼, 앞에서 depth 까지)에 비춘다. 실제 벽 영상은 일부 장면에서만 나온다.
 */
function SideScreens({ auditorium, texture, depth }: { auditorium: Auditorium; texture: Texture | null; depth: number }) {
  const screen = screenRect(auditorium);
  const room = roomShape(auditorium);
  const half = room.width / 2 - WALL_INSET.sideScreen;
  return (
    <>
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[side * half, screen.centerY, depth / 2]} rotation={[0, (-side * Math.PI) / 2, 0]}>
          <planeGeometry args={[depth, screen.height]} />
          <meshBasicMaterial map={texture} color="#5c5c5c" toneMapped={false} />
        </mesh>
      ))}
    </>
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
  // 침대: 밝은 회색 매트리스, 어두운 틀, 짙은 칸막이
  bed: {
    upholstery: { color: "#8c8a86", roughness: 0.9, bumpScale: 0.6 },
    shell: { color: "#1d1c1c", roughness: 0.6 },
    arm: { color: "#262323", roughness: 0.7 },
  },
  beanbag: {
    upholstery: { color: "#5b6b52", roughness: 0.95, bumpScale: 1 },
    shell: { color: "#2f3a2a", roughness: 1 },
    arm: { color: "#2f3a2a", roughness: 1 },
  },
  mat: {
    upholstery: { color: "#7a6a55", roughness: 0.95, bumpScale: 1 },
    shell: { color: "#3b4a33", roughness: 1 },
    arm: { color: "#3b4a33", roughness: 1 },
  },
  cabana: {
    upholstery: { color: "#7a6a55", roughness: 0.95, bumpScale: 1 },
    shell: { color: "#cfc6b4", roughness: 0.9 },
    arm: { color: "#cfc6b4", roughness: 0.9 },
  },
} as const satisfies Record<ChairStyle, unknown>;

function Chairs({ auditorium, recline }: { auditorium: Auditorium; recline: RefObject<number> }) {
  const groups = useMemo(() => chairGroups(auditorium), [auditorium]);
  const bump = useMemo(() => {
    const t = fabricBumpTexture();
    t.repeat.set(5, 5);
    return t;
  }, []);
  useEffect(() => () => bump.dispose(), [bump]);
  return (
    <>
      {groups.map((group) => (
        <ChairSet key={group.style} auditorium={auditorium} group={group} bump={bump} recline={recline} />
      ))}
    </>
  );
}

/** 같은 모양의 의자 묶음. 본 객석과 위층 구역(PRIVATE BOX·SWEETBOX)의 의자 모양이 다를 수 있다. */
function ChairSet({
  auditorium,
  group,
  bump,
  recline,
}: {
  auditorium: Auditorium;
  group: ChairGroup;
  bump: Texture;
  recline: RefObject<number>;
}) {
  const { style } = group;
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
  useEffect(
    () => () => {
      [geometry.upholstery, geometry.shell, geometry.arm].forEach((g) => g.dispose());
      geometry.moving?.forEach((part) => part.geometry.dispose());
    },
    [geometry],
  );
  const chairs = useMemo(
    () => group.chairs.map((position, i) => ({ position, scale: [group.widths[i], 1, 1] as Tuple3 })),
    [group],
  );
  const arms = useMemo(() => group.arms.map((position) => ({ position })), [group]);
  const look = CHAIR_LOOK[style];
  const upholstery = <meshStandardMaterial {...look.upholstery} bumpMap={bump} roughnessMap={bump} />;

  return (
    <>
      <Instanced geometry={geometry.upholstery} items={chairs} material={upholstery} />
      {geometry.moving?.map((part, i) => (
        <ChairPart key={i} part={part} chairs={chairs} material={upholstery} recline={recline} />
      ))}
      <Instanced geometry={geometry.shell} items={chairs} material={<meshStandardMaterial {...look.shell} />} />
      <Instanced
        geometry={geometry.arm}
        items={arms}
        material={<meshStandardMaterial {...look.arm} side={DoubleSide} />}
      />
    </>
  );
}

/** 리클라이너의 등받이·발받침. 의자마다 축을 중심으로 젖힌 정도만큼 돌린다 */
function ChairPart({
  part,
  chairs,
  material,
  recline,
}: {
  part: MovingPart;
  chairs: InstanceItem[];
  material: ReactElement;
  recline: RefObject<number>;
}) {
  const bases = useMemo(() => {
    const dummy = new Object3D();
    return chairs.map((c) => {
      dummy.position.set(...c.position);
      dummy.scale.set(...(c.scale ?? [1, 1, 1]));
      dummy.updateMatrix();
      return dummy.matrix.clone().multiply(new Matrix4().makeTranslation(...part.pivot));
    });
  }, [chairs, part.pivot]);
  const turn = useMemo(() => new Matrix4(), []);
  const matrixAt = useCallback(
    (i: number, t: number, out: Matrix4) => out.multiplyMatrices(bases[i], turn.makeRotationX(part.angle * t)),
    [bases, turn, part.angle],
  );
  return <MovingInstanced geometry={part.geometry} count={chairs.length} material={material} progress={recline} matrixAt={matrixAt} />;
}

/** 앞사람이 리클라이너에 앉았으면 눕기에 맞춰 같이 기댄다(눈이 내려가고 뒤로 가며 몸이 뒤로 기운다) */
function People({ auditorium, seat, recline }: { auditorium: Auditorium; seat: Seat; recline: RefObject<number> }) {
  const geometry = useMemo(() => buildPerson(), []);
  useEffect(() => () => Object.values(geometry).forEach((g) => g.dispose()), [geometry]);
  const people = useMemo(() => frontPeople(auditorium, seat), [auditorium, seat]);
  const { hair, skin, clothes } = useMemo(
    () => ({
      hair: people.map((p) => HAIR_COLORS[p.hair]),
      skin: people.map((p) => SKIN_COLORS[p.skin]),
      clothes: people.map((p) => CLOTHES_COLORS[p.clothes]),
    }),
    [people],
  );
  const matrixAt = useMemo(() => {
    const dummy = new Object3D();
    dummy.rotation.order = "YXZ";
    return (i: number, t: number, out: Matrix4) => {
      const p = people[i];
      const lean = p.reclines ? t : 0;
      const { dy, dz } = lean > 0 ? reclineEyeOffset(DEFAULT_STATURE_CM, lean) : { dy: 0, dz: 0 };
      dummy.position.set(p.position[0], p.position[1] + dy * p.scale, p.position[2] + dz * p.scale);
      dummy.rotation.set((RECLINE.reclinedRad - RECLINE.uprightRad) * lean, p.yaw, p.roll);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      return out.copy(dummy.matrix);
    };
  }, [people]);
  const parts = [
    { geometry: geometry.head, colors: hair, roughness: 0.75 },
    { geometry: geometry.skin, colors: skin, roughness: 0.6 },
    { geometry: geometry.body, colors: clothes, roughness: 0.92 },
  ];
  return (
    <>
      {parts.map((part) => (
        <MovingInstanced
          key={part.geometry.uuid}
          geometry={part.geometry}
          count={people.length}
          colors={part.colors}
          material={<meshStandardMaterial roughness={part.roughness} />}
          progress={recline}
          matrixAt={matrixAt}
        />
      ))}
    </>
  );
}

const RECLINE_SECONDS = 1.6;
// 처음과 끝은 천천히, 가운데는 빠르게(전동 의자가 움직이는 느낌)
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);

/** 눕기 진행값을 target 쪽으로 RECLINE_SECONDS 에 걸쳐 옮긴다 */
function ReclineDriver({ target, valueRef }: { target: number; valueRef: RefObject<number> }) {
  // valueRef 와 같이 0(바로 앉음)에서 시작한다
  const linear = useRef(0);
  useFrame((_, delta) => {
    if (linear.current === target) return;
    const step = Math.min(delta, 0.1) / RECLINE_SECONDS;
    linear.current = target > linear.current ? Math.min(target, linear.current + step) : Math.max(target, linear.current - step);
    valueRef.current = easeInOut(linear.current);
  });
  return null;
}

/**
 * 움직이는 인스턴스. progress 가 바뀐 프레임에만 matrixAt 으로 모든 인스턴스 위치를 다시 잡는다.
 * 눕기 애니메이션 동안만 계산하고, 멈춰 있으면 아무것도 하지 않는다.
 */
function MovingInstanced({
  geometry,
  count,
  material,
  colors,
  progress,
  matrixAt,
}: {
  geometry: BufferGeometry;
  count: number;
  material: ReactElement;
  colors?: string[];
  progress: RefObject<number>;
  matrixAt: (i: number, t: number, out: Matrix4) => Matrix4;
}) {
  const ref = useRef<InstancedMesh>(null);
  const applied = useRef<number | null>(null);
  const apply = useCallback(
    (t: number) => {
      const mesh = ref.current;
      if (!mesh) return;
      const m = new Matrix4();
      for (let i = 0; i < count; i += 1) mesh.setMatrixAt(i, matrixAt(i, t, m));
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
      applied.current = t;
    },
    [count, matrixAt],
  );
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    if (colors) {
      const color = new Color();
      colors.forEach((c, i) => mesh.setColorAt(i, color.set(c)));
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    apply(progress.current);
  }, [apply, colors, progress]);
  useFrame(() => {
    if (progress.current !== applied.current) apply(progress.current);
  });
  if (count === 0) return null;
  return (
    <instancedMesh ref={ref} args={[geometry, undefined, count]} key={`${geometry.uuid}:${count}`}>
      {material}
    </instancedMesh>
  );
}

const UNIT_BOX = new BoxGeometry(1, 1, 1);
/** PRIVATE BOX 천장 조명(샹들리에 자리) */
const LAMP = new CylinderGeometry(0.16, 0.2, 0.06, 20);
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

/** 첫 프레임을 그린 뒤 onReady 를 한 번 부른다 */
function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    onReady();
  });
  return null;
}

const MAX_PITCH = (80 * Math.PI) / 180;
/** 끝까지 누웠을 때 얼굴이 위를 향하는 각도 */
const GAZE_UP_RAD = (RECLINE.gazeUpDeg * Math.PI) / 180;
const DRAG_SPEED = 0.005;
/** 스크린 방향에서 이만큼 넘게 돌리면 "스크린 보기" 버튼을 띄운다(좌우) */
const TURNED_AWAY = (60 * Math.PI) / 180;
/** 위아래로 이만큼 넘게 고개를 들거나 숙여도 버튼을 띄운다 */
const TILTED_AWAY = (40 * Math.PI) / 180;
const MAX_VERTICAL_FOV_DEG = 100;

/**
 * 좌석 위치에 고정된 카메라. 위치는 눈 위치로 고정하고, 드래그로 고개만 돌린다.
 * 좌우는 제한 없이 한 바퀴 돌 수 있고, 위아래는 ±80°까지다.
 * OrbitControls를 쓰지 않는 이유: 궤도 회전은 카메라 위치가 바뀌어 "그 좌석에서 보는 시야"가 아니게 된다.
 */
function SeatCamera({
  eye,
  eyeReclined,
  recline,
  poseRef,
  target,
  aimKey,
  onTurnedAwayChange,
}: {
  poseRef?: RefObject<HeadPose>;
  eye: Vec3;
  /** 끝까지 젖혔을 때 눈 위치. 눕기 진행값만큼 eye 와 사이를 옮겨 간다 */
  eyeReclined: Vec3;
  recline: RefObject<number>;
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
  /** 스크린 중심을 바라보는 yaw·pitch. 고개를 얼마나 돌렸는지 잴 때 기준 */
  const homeYaw = useRef(0);
  const homePitch = useRef(0);
  const turnedAway = useRef(false);
  const reportTurn = useRef(onTurnedAwayChange);
  useEffect(() => {
    reportTurn.current = onTurnedAwayChange;
  }, [onTurnedAwayChange]);

  /** 지금 젖힌 정도에서의 눈 위치 */
  const poseEye = useCallback(
    (t: number): Vec3 => ({
      x: eye.x + (eyeReclined.x - eye.x) * t,
      y: eye.y + (eyeReclined.y - eye.y) * t,
      z: eye.z + (eyeReclined.z - eye.z) * t,
    }),
    [eye.x, eye.y, eye.z, eyeReclined.x, eyeReclined.y, eyeReclined.z],
  );
  const appliedRecline = useRef(recline.current);
  /**
   * 고개를 돌리지 않았을 때 보는 방향.
   * 바로 앉으면 고개를 들어 스크린 중심을 본다. 누우면 목에 힘을 빼고 머리받침에 기대므로,
   * 얼굴은 스크린과 상관없이 GAZE_UP 만큼 위를 향한다. 그래서 뒷줄은 스크린이 시야 아래로, 앞줄은 가운데로 온다.
   */
  const homeAt = useCallback(
    (t: number) => {
      const aim = aimAt(poseEye(t), target);
      return { yaw: aim.yaw, pitch: aim.pitch + (GAZE_UP_RAD - aim.pitch) * t };
    },
    [poseEye, target],
  );

  // 좌석이 바뀌면(또는 "스크린 보기") 고개를 기본 방향으로 되돌린다
  useLayoutEffect(() => {
    const home = homeAt(recline.current);
    yaw.current = home.yaw;
    homeYaw.current = home.yaw;
    pitch.current = home.pitch;
    homePitch.current = home.pitch;
    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");
    if (turnedAway.current) {
      turnedAway.current = false;
      reportTurn.current(false);
    }
    // eye·target 변경(키 슬라이더)에는 고개 방향을 유지하려고 aimKey만 본다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aimKey]);

  useLayoutEffect(() => {
    const at = poseEye(recline.current);
    camera.position.set(at.x, at.y, at.z);
  }, [camera, poseEye, recline]);

  // 눕기·일어나기: 눈이 젖힌 자리로 옮겨 가고 얼굴이 위로 들린다. 드래그로 돌려 둔 만큼은 그대로 둔다
  useFrame(() => {
    const t = recline.current;
    if (poseRef) {
      poseRef.current = { pitch: pitch.current, yaw: yaw.current, recline: t, screenPitch: aimAt(poseEye(t), target).pitch };
    }
    if (t === appliedRecline.current) return;
    appliedRecline.current = t;
    const at = poseEye(t);
    camera.position.set(at.x, at.y, at.z);
    const home = homeAt(t);
    yaw.current = wrapAngle(yaw.current + wrapAngle(home.yaw - homeYaw.current));
    pitch.current = clamp(pitch.current + home.pitch - homePitch.current, -MAX_PITCH, MAX_PITCH);
    homeYaw.current = home.yaw;
    homePitch.current = home.pitch;
    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");
  });

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
      const away =
        Math.abs(wrapAngle(yaw.current - homeYaw.current)) > TURNED_AWAY ||
        Math.abs(pitch.current - homePitch.current) > TILTED_AWAY;
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

/** 눈에서 target 을 바라보는 고개 방향 */
function aimAt(eye: Vec3, target: Vec3): { yaw: number; pitch: number } {
  const dx = target.x - eye.x;
  const dy = target.y - eye.y;
  const dz = target.z - eye.z;
  return { yaw: Math.atan2(-dx, -dz), pitch: Math.atan2(dy, Math.hypot(dx, dz)) };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 각도를 -π ~ π 로 맞춘다 */
function wrapAngle(angle: number): number {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}
