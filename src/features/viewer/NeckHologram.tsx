"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  Color,
  CylinderGeometry,
  type Group,
  MeshBasicMaterial,
  NormalBlending,
  RingGeometry,
  ShaderMaterial,
  SphereGeometry,
} from "three";
import { RECLINE } from "@/lib/domain/geometry";
import { sculptHead } from "./hologram-head";
import { neckAngles, neckLabel, neckStrained, type HeadPose } from "./head-pose";
import styles from "./SeatViewer.module.css";

const HOLO = new Color("#7fe3ff");
const STRAIN = new Color("#e5432f");

// 머리 선은 면이 향한 쪽에 따라 밝기를 달리한다. 옆 위에서 빛이 오는 것처럼 콧날·눈썹뼈는 밝고 눈두덩은 어두워
// 같은 굵기의 그물선 안에서도 얼굴 굴곡이 읽힌다. 가장자리는 홀로그램처럼 조금 더 빛나고, 깎은 눈·입은 어둡게, 돋운 코·눈썹뼈는 밝게 칠해 어느 각도에서도 이목구비가 보인다
const SHELL_VERT = `attribute float relief; varying float vRelief; varying vec3 vN; varying vec3 vV;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vRelief = relief;
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const SHELL_FRAG = `uniform vec3 color; uniform float opacity; varying float vRelief; varying vec3 vN; varying vec3 vV;
void main() {
  vec3 n = normalize(vN);
  float light = max(dot(n, normalize(vec3(-0.55, 0.75, 0.35))), 0.0);
  float rim = pow(1.0 - abs(dot(n, vV)), 2.0);
  float a = 0.05 + 0.55 * pow(light, 2.0) + 0.35 * rim;
  a = a * (1.0 - 0.95 * max(-vRelief, 0.0)) + 0.7 * max(vRelief, 0.0);
  gl_FragColor = vec4(color, clamp(a, 0.0, 1.0) * opacity);
}`;

/**
 * 좌하단에 떠 있는 얼굴·목 홀로그램. 3D 시야에서 고개를 돌리거나 눕기를 하면 그대로 따라 움직인다.
 * 얼굴은 스크린 쪽(-z)을 보고, 비스듬히 앞옆에서 본다. 목을 오래 꺾기 힘든 각도면 강조색으로 바뀐다.
 * 큰 장면과 따로 그리는 작은 캔버스이고, 매 프레임 poseRef 만 읽는다.
 */
export default function NeckHologram({ poseRef }: { poseRef: RefObject<HeadPose> }) {
  const labelRef = useRef<HTMLSpanElement>(null);
  return (
    <div className={styles.holo}>
      <div className={styles.holoCanvas} aria-hidden="true">
        <Canvas
          dpr={[1, 2]}
          // R3F 는 캔버스 바깥 상자에 pointer-events: auto 를 직접 넣는다. 그림 뒤 버튼·시야 드래그를 막지 않게 끈다
          style={{ pointerEvents: "none" }}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [2.6, 0.3, -1.3], fov: 38, near: 0.1, far: 20 }}
          onCreated={({ camera }) => camera.lookAt(0, -0.34, 0.28)}
        >
          <Head poseRef={poseRef} labelRef={labelRef} />
        </Canvas>
      </div>
      <span ref={labelRef} className={styles.holoLabel} />
    </div>
  );
}

function Head({ poseRef, labelRef }: { poseRef: RefObject<HeadPose>; labelRef: RefObject<HTMLSpanElement | null> }) {
  const base = useRef<Group>(null);
  const neck = useRef<Group>(null);
  const head = useRef<Group>(null);
  const color = useMemo(() => HOLO.clone(), []);
  const lastLabel = useRef("");

  const geo = useMemo(() => {
    // 눈·입술처럼 작은 굴곡이 선 사이로 빠지지 않을 만큼 촘촘하게 나눈다
    const skull = sculptHead(64, 48);
    const ear = new SphereGeometry(0.09, 10, 8);
    ear.scale(0.42, 1, 0.7);
    const neckTube = new CylinderGeometry(0.17, 0.2, 0.5, 16, 4, true);
    neckTube.translate(0, 0.25, 0);
    const shoulders = new SphereGeometry(0.5, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    shoulders.scale(1.25, 0.32, 0.55);
    const pad = new RingGeometry(0.5, 0.62, 48);
    pad.rotateX(-Math.PI / 2);
    return { skull, ear, neckTube, shoulders, pad };
  }, []);
  // 선(와이어프레임), 머리 안쪽 옅은 면, 바닥 투사 고리.
  // 빛을 더하는 재질은 밝은 영상 위에서 묻히므로 보통 섞기로 칠하고, 바깥 어두운 테두리·빛 번짐은 CSS 로 준다
  const mat = useMemo(() => {
    const make = (wireframe: boolean) =>
      new MeshBasicMaterial({ wireframe, transparent: true, depthWrite: false, blending: NormalBlending, toneMapped: false });
    const shell = new ShaderMaterial({
      vertexShader: SHELL_VERT,
      fragmentShader: SHELL_FRAG,
      uniforms: { color: { value: HOLO.clone() }, opacity: { value: 1 } },
      wireframe: true,
      transparent: true,
      depthWrite: false,
    });
    const m = { wire: make(true), shell, fill: make(false), ring: make(false) };
    // 머리 안쪽 면이 깊이를 남겨 뒤통수 선이 비치지 않게 한다. 깎아 만든 얼굴 굴곡이 겹친 선에 묻히지 않는다
    m.fill.depthWrite = true;
    return m;
  }, []);
  useEffect(
    () => () => {
      Object.values(geo).forEach((g) => g.dispose());
      Object.values(mat).forEach((m) => m.dispose());
    },
    [geo, mat],
  );

  useFrame(({ clock }) => {
    const pose = poseRef.current;
    if (!pose || !base.current || !neck.current || !head.current) return;
    // 어깨는 눕는 만큼 뒤로 기울고, 그 위에서 목과 머리가 남은 각도를 나눠 꺾는다
    const tilt = (RECLINE.reclinedRad - RECLINE.uprightRad) * pose.recline;
    base.current.rotation.x = tilt;
    const bend = pose.pitch - tilt;
    neck.current.rotation.set(bend * 0.45, pose.yaw * 0.35, 0, "YXZ");
    head.current.rotation.set(bend * 0.55, pose.yaw * 0.65, 0, "YXZ");

    const angles = neckAngles(pose);
    paint(mat, color, neckStrained(angles), clock.elapsedTime);

    const label = labelRef.current;
    if (!label) return;
    const text = neckLabel(angles);
    if (text !== lastLabel.current) {
      lastLabel.current = text;
      label.textContent = text;
    }
    label.style.color = `#${color.getHexString()}`;
  });

  return (
    <group position={[0, -1.15, 0]}>
      <mesh geometry={geo.pad} material={mat.ring} />
      <group ref={base}>
        <mesh geometry={geo.shoulders} material={mat.wire} />
        <group ref={neck} position={[0, 0.12, 0]}>
          <mesh geometry={geo.neckTube} material={mat.wire} />
          <group ref={head} position={[0, 0.5, 0]}>
            <group position={[0, 0.42, 0.04]}>
              <mesh geometry={geo.skull} material={mat.fill} scale={0.985} renderOrder={-1} />
              <mesh geometry={geo.skull} material={mat.shell} />
              <mesh geometry={geo.ear} material={mat.wire} position={[0.36, -0.02, 0.05]} />
              <mesh geometry={geo.ear} material={mat.wire} position={[-0.36, -0.02, 0.05]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/** 색을 평소 색·강조색 쪽으로 조금씩 옮기고, 홀로그램처럼 아주 약하게 숨 쉬듯 밝기를 바꾼다 */
function paint(
  mat: { wire: MeshBasicMaterial; shell: ShaderMaterial; fill: MeshBasicMaterial; ring: MeshBasicMaterial },
  color: Color,
  strained: boolean,
  time: number,
) {
  color.lerp(strained ? STRAIN : HOLO, 0.12);
  const flicker = 0.9 + 0.1 * Math.sin(time * 2.2);
  for (const [m, opacity] of [
    [mat.wire, 0.85],
    [mat.fill, 0.12],
    [mat.ring, 0.6],
  ] as const) {
    m.color.copy(color);
    m.opacity = opacity * flicker;
  }
  mat.shell.uniforms.color.value.copy(color);
  mat.shell.uniforms.opacity.value = flicker;
}
