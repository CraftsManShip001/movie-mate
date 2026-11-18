/**
 * 3D 장면의 모양(메시)과 질감. 브라우저 전용(three.js, canvas)이라 Scene.tsx 에서만 쓴다.
 *
 * 모양은 모두 코드로 만든다(외부 모델 파일 없음). 의자·사람은 원점 기준으로 한 번 만들어 인스턴스로 복사한다.
 * - 의자: 바닥 중심이 원점, 관객은 -z(스크린)를 본다. 등받이는 +z 쪽.
 * - 사람: 눈 위치가 원점.
 */
import {
  BufferGeometry,
  CanvasTexture,
  CapsuleGeometry,
  CylinderGeometry,
  RepeatWrapping,
  SphereGeometry,
  SRGBColorSpace,
  type Texture,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { ChairStyle } from "./scene-layout";

export interface ChairSpec {
  style: ChairStyle;
  /** 좌석 폭(팔걸이 중심 사이, m) */
  width: number;
  /** 방석 윗면 높이 (m) */
  seatHeight: number;
  /** 등받이 윗면 높이 (m) */
  backHeight: number;
}

export interface ChairGeometries {
  /** 천(가죽)으로 싼 부분: 방석, 등받이 */
  upholstery: BufferGeometry;
  /** 딱딱한 부분: 등받이 뒤판, 방석 받침 */
  shell: BufferGeometry;
  /** 팔걸이 하나 (x = 0 중심) */
  arm: BufferGeometry;
}

/** 반올림 모서리 상자. 크기 → 중심 이동 → x축 회전(라디안, 아래 끝 기준) 순서 */
function roundedBox(
  w: number,
  h: number,
  d: number,
  radius: number,
  at: [number, number, number],
  opts: { tilt?: number; pivotBottom?: boolean; segments?: number } = {},
): BufferGeometry {
  const r = Math.min(radius, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001);
  const g: BufferGeometry = new RoundedBoxGeometry(w, h, d, opts.segments ?? 2, r);
  if (opts.pivotBottom) g.translate(0, h / 2, 0);
  if (opts.tilt) g.rotateX(opts.tilt);
  g.translate(...at);
  return g;
}

function merge(parts: BufferGeometry[]): BufferGeometry {
  // RoundedBoxGeometry 는 인덱스가 없고 원기둥·구는 있어서, 모두 인덱스 없는 형태로 맞춘다
  const flat = parts.map((p) => (p.index ? p.toNonIndexed() : p));
  const merged = mergeGeometries(flat, false);
  flat.forEach((p) => p.dispose());
  parts.forEach((p) => p.dispose());
  if (!merged) throw new Error("의자 모양을 합치지 못했습니다.");
  merged.computeBoundingSphere();
  return merged;
}

export function buildChair(spec: ChairSpec): ChairGeometries {
  return spec.style === "recliner" ? buildRecliner(spec) : buildStandardChair(spec);
}

/** 일반 영화관 의자: 얇은 등받이, 플라스틱 뒤판, 좁은 팔걸이와 컵홀더 */
function buildStandardChair({ width, seatHeight, backHeight }: ChairSpec): ChairGeometries {
  const armW = 0.055;
  const inner = width - armW - 0.012;
  const armTop = 0.64;
  const backLen = Math.max(0.3, backHeight - seatHeight + 0.04);
  const recline = 0.2;

  const upholstery = merge([
    // 방석: 앞이 살짝 들린 쿠션
    roundedBox(inner, 0.12, 0.48, 0.045, [0, seatHeight - 0.06, -0.03], { tilt: 0.05 }),
    // 등받이 쿠션: 허리 부분이 두툼하고 위로 갈수록 얇아지도록 두 덩어리
    roundedBox(inner - 0.02, backLen * 0.55, 0.1, 0.04, [0, seatHeight - 0.03, 0.21], { tilt: recline, pivotBottom: true }),
    roundedBox(inner - 0.03, backLen, 0.075, 0.035, [0, seatHeight - 0.03, 0.23], { tilt: recline, pivotBottom: true }),
  ]);
  const shell = merge([
    // 등받이 뒤판 (뒷줄에서 가장 많이 보이는 면)
    roundedBox(inner + 0.006, backLen + 0.03, 0.035, 0.015, [0, seatHeight - 0.05, 0.285], { tilt: recline, pivotBottom: true, segments: 1 }),
    // 방석 받침
    roundedBox(inner - 0.05, 0.09, 0.42, 0.02, [0, seatHeight - 0.16, -0.02], { tilt: 0.05, segments: 1 }),
  ]);
  const cup = new CylinderGeometry(0.042, 0.036, 0.05, 18, 1, true);
  cup.translate(0, armTop + 0.012, -0.25);
  const arm = merge([
    // 옆 기둥 (바닥까지)
    roundedBox(armW, armTop - 0.02, 0.5, 0.02, [0, (armTop - 0.02) / 2, 0.05], { segments: 1 }),
    // 팔걸이 윗면
    roundedBox(armW + 0.03, 0.04, 0.6, 0.018, [0, armTop, -0.02], { segments: 2 }),
    cup,
  ]);
  return { upholstery, shell, arm };
}

/** 리클라이너·프리미엄: 두툼한 가죽 방석과 등받이, 머리받침, 넓은 팔걸이 콘솔, 접힌 발받침 */
function buildRecliner({ width, seatHeight, backHeight }: ChairSpec): ChairGeometries {
  const armW = Math.min(0.17, width * 0.2);
  const inner = width - armW - 0.01;
  const armTop = Math.max(0.6, seatHeight + 0.2);
  const backLen = Math.max(0.5, backHeight - seatHeight + 0.12);
  const recline = 0.26;

  const upholstery = merge([
    roundedBox(inner, 0.2, 0.6, 0.07, [0, seatHeight - 0.1, -0.04], { tilt: 0.04, segments: 3 }),
    // 접힌 발받침 (방석 앞면 아래)
    roundedBox(inner - 0.04, seatHeight - 0.12, 0.09, 0.035, [0, (seatHeight - 0.12) / 2 + 0.04, -0.31]),
    // 등받이와 머리받침
    roundedBox(inner, backLen, 0.2, 0.08, [0, seatHeight - 0.06, 0.28], { tilt: recline, pivotBottom: true, segments: 3 }),
    roundedBox(inner * 0.78, 0.17, 0.11, 0.05, [0, seatHeight - 0.06 + (backLen - 0.12) * Math.cos(recline), 0.28 + (backLen - 0.12) * Math.sin(recline) - 0.12]),
  ]);
  const shell = merge([
    // 바닥 받침대
    roundedBox(inner - 0.04, 0.07, 0.62, 0.02, [0, 0.035, 0.0], { segments: 1 }),
  ]);
  const cup = new CylinderGeometry(0.045, 0.04, 0.06, 18, 1, true);
  cup.translate(0, armTop + 0.015, -0.3);
  const arm = merge([
    roundedBox(armW, armTop, 0.78, 0.05, [0, armTop / 2, 0.02], { segments: 3 }),
    cup,
  ]);
  return { upholstery, shell, arm };
}

export interface PersonGeometries {
  /** 머리(머리카락 색) */
  head: BufferGeometry;
  /** 목·귀(피부색) */
  skin: BufferGeometry;
  /** 어깨·몸통·팔(옷 색) */
  body: BufferGeometry;
}

/** 앉은 사람 상반신. 눈이 원점이고 등은 +z 쪽이다. 뒤에서 보면 머리 윤곽·목·어깨선이 보인다. */
export function buildPerson(): PersonGeometries {
  const head = new SphereGeometry(0.5, 20, 14);
  // 뒤통수가 조금 더 나오고 정수리가 둥근 머리
  head.scale(0.152, 0.21, 0.19);
  head.translate(0, 0.035, 0.035);
  const hairBack = new SphereGeometry(0.5, 16, 12);
  // 뒷머리: 뒤통수에서 목덜미 위까지 덮는다
  hairBack.scale(0.165, 0.2, 0.17);
  hairBack.translate(0, 0.02, 0.065);

  const neck = new CylinderGeometry(0.045, 0.052, 0.11, 16);
  neck.translate(0, -0.115, 0.06);
  const earL = new SphereGeometry(0.5, 10, 8);
  earL.scale(0.022, 0.055, 0.035);
  earL.translate(-0.077, 0.0, 0.035);
  const earR = earL.clone();
  earR.translate(0.154, 0, 0);

  const shoulders = new CapsuleGeometry(0.08, 0.27, 4, 12);
  shoulders.rotateZ(Math.PI / 2);
  shoulders.scale(1, 1, 1.25);
  shoulders.translate(0, -0.215, 0.075);
  // 목에서 어깨로 내려가는 승모근 경사 + 옷깃
  const trapezius = new SphereGeometry(0.5, 14, 8);
  trapezius.scale(0.26, 0.09, 0.15);
  trapezius.translate(0, -0.17, 0.075);
  const chest = roundedBox(0.37, 0.42, 0.22, 0.08, [0, -0.46, 0.09], { segments: 2 });
  const armL = new CapsuleGeometry(0.048, 0.24, 3, 8);
  armL.rotateZ(-0.12);
  armL.translate(-0.215, -0.38, 0.07);
  const armR = new CapsuleGeometry(0.048, 0.24, 3, 8);
  armR.rotateZ(0.12);
  armR.translate(0.215, -0.38, 0.07);

  return {
    head: merge([head, hairBack]),
    skin: merge([neck, earL, earR]),
    body: merge([trapezius, shoulders, chest, armL, armR]),
  };
}

// ---------------------------------------------------------------------------
// 질감: canvas로 만드는 작은 반복 무늬

function canvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D, size: number) => void, srgb = true): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx, size);
  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.anisotropy = 4;
  if (srgb) texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** 0~1 고정 난수 (질감용) */
function noise(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 천 결: 회색 잡음. bumpMap·roughnessMap 으로 쓴다 */
export function fabricBumpTexture(): Texture {
  return canvasTexture(
    128,
    (ctx, n) => {
      const rnd = noise(7);
      const img = ctx.createImageData(n, n);
      for (let y = 0; y < n; y += 1) {
        for (let x = 0; x < n; x += 1) {
          // 가로·세로 실 무늬 + 잡음
          const weave = ((x + (y % 2)) % 2) * 22 + ((y + (x % 2)) % 2) * 22;
          const v = 110 + weave + rnd() * 50;
          const i = (y * n + x) * 4;
          img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    },
    false,
  );
}

/** 카펫: 어두운 바탕에 작은 무늬 */
export function carpetTexture(): Texture {
  return canvasTexture(256, (ctx, n) => {
    ctx.fillStyle = "#1d1a20";
    ctx.fillRect(0, 0, n, n);
    const rnd = noise(11);
    for (let i = 0; i < 9000; i += 1) {
      const l = 18 + rnd() * 22;
      ctx.fillStyle = `rgb(${l + 4},${l},${l + 8})`;
      ctx.fillRect(rnd() * n, rnd() * n, 1.5, 1.5);
    }
    // 은은한 마름모 무늬
    ctx.strokeStyle = "rgba(90,70,110,0.18)";
    ctx.lineWidth = 2;
    for (let k = -n; k < n * 2; k += 64) {
      ctx.beginPath();
      ctx.moveTo(k, 0);
      ctx.lineTo(k + n, n);
      ctx.moveTo(k + n, 0);
      ctx.lineTo(k, n);
      ctx.stroke();
    }
  });
}

/** 흡음 벽 패널 한 장: 천 마감 + 패널 사이 홈. 가로로 반복한다 */
export function acousticPanelTexture(): Texture {
  return canvasTexture(256, (ctx, n) => {
    const grad = ctx.createLinearGradient(0, 0, n, 0);
    grad.addColorStop(0, "#2a2428");
    grad.addColorStop(0.5, "#322b30");
    grad.addColorStop(1, "#2a2428");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, n, n);
    const rnd = noise(3);
    for (let i = 0; i < 5000; i += 1) {
      ctx.fillStyle = `rgba(0,0,0,${rnd() * 0.12})`;
      ctx.fillRect(rnd() * n, rnd() * n, 1, 2);
    }
    // 패널 사이 홈
    ctx.fillStyle = "#0c0a0b";
    ctx.fillRect(0, 0, 5, n);
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(5, 0, 2, n);
  });
}

/** 비상구 표시 */
export function exitSignTexture(): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#0f8a3c";
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = "#e9fff0";
    ctx.font = "bold 52px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("EXIT", 128, 52);
    ctx.font = "bold 30px sans-serif";
    ctx.fillText("비상구", 128, 100);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** 벽등이 벽에 번지는 빛: 가운데가 밝은 원형 그라데이션 (가산 혼합용) */
export function glowTexture(): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,200,140,0.55)");
    g.addColorStop(0.35, "rgba(255,170,110,0.18)");
    g.addColorStop(1, "rgba(255,150,90,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
