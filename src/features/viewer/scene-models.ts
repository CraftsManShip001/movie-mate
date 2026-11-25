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
import { RECLINE } from "@/lib/domain/geometry";
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
  /**
   * 리클라이너에서 "눕기"로 움직이는 천 부분. 모양은 축(pivot)을 원점으로 만들어 두고,
   * 그리는 쪽에서 의자 위치 → pivot 으로 옮긴 뒤 x축으로 angle × 젖힌 정도만큼 돌린다.
   */
  moving?: MovingPart[];
}

export interface MovingPart {
  geometry: BufferGeometry;
  /** 의자 바닥 중심 기준의 회전축 위치 */
  pivot: [number, number, number];
  /** 끝까지 젖혔을 때 x축 회전(라디안). 양수면 위쪽이 뒤(+z)로 간다 */
  angle: number;
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
  switch (spec.style) {
    case "recliner":
      return buildRecliner(spec);
    case "bed":
      return buildBed(spec);
    case "beanbag":
      return buildBeanbag(spec);
    case "mat":
      return buildMat(spec, false);
    case "cabana":
      return buildMat(spec, true);
    default:
      return buildStandardChair(spec);
  }
}

/**
 * 누워서 보는 전동 침대(템퍼 시네마·모션베드): 길이 2m, 다리 쪽(스크린 쪽)은 평평하고 머리 쪽 등판을 세웠다.
 * 팔걸이 대신 침대 사이에 높은 칸막이를 둔다.
 */
function buildBed({ width }: ChairSpec): ChairGeometries {
  const inner = width - 0.08;
  const length = 2.0;
  const top = 0.42;
  const upholstery = merge([
    // 다리 쪽 매트리스
    roundedBox(inner, 0.16, 1.15, 0.06, [0, top - 0.08, -0.48], { segments: 3 }),
    // 뒤로 젖힌 등판(약 45°)과 베개. 머리는 뒤(+z), 발은 스크린 쪽(-z)
    roundedBox(inner, 0.85, 0.16, 0.06, [0, top - 0.06, 0.12], { tilt: 0.8, pivotBottom: true, segments: 3 }),
    roundedBox(inner * 0.7, 0.14, 0.12, 0.05, [0, top + 0.52, 0.66], { tilt: 0.8 }),
  ]);
  const shell = merge([roundedBox(inner + 0.02, top - 0.12, length, 0.03, [0, (top - 0.12) / 2, -0.05], { segments: 1 })]);
  const arm = merge([roundedBox(0.05, 1.05, length + 0.1, 0.02, [0, 0.525, -0.05], { segments: 1 })]);
  return { upholstery, shell, arm };
}

/** 바닥 빈백: 납작하게 눌린 자루와 뒤쪽 등 받침 */
function buildBeanbag({ width }: ChairSpec): ChairGeometries {
  const w = Math.max(0.75, width * 0.95);
  const body = new SphereGeometry(0.5, 20, 14);
  body.scale(w, 0.5, 0.9);
  body.translate(0, 0.22, 0.05);
  const back = new SphereGeometry(0.5, 18, 12);
  back.scale(w * 0.85, 0.75, 0.4);
  back.translate(0, 0.42, 0.38);
  const upholstery = merge([body, back]);
  const shell = merge([roundedBox(w * 0.6, 0.02, 0.5, 0.005, [0, 0.01, 0.05], { segments: 1 })]);
  return { upholstery, shell, arm: emptyGeometry() };
}

/** 바닥 매트·방석(씨네앤포레). cabana 면 위에 작은 천막 틀을 씌운다 */
function buildMat({ width }: ChairSpec, tent: boolean): ChairGeometries {
  const w = Math.max(0.7, width * 0.95);
  const upholstery = merge([
    roundedBox(w, 0.1, 0.85, 0.04, [0, 0.05, 0]),
    roundedBox(w * 0.85, 0.45, 0.14, 0.05, [0, 0.08, 0.36], { tilt: -0.2, pivotBottom: true }),
  ]);
  const parts = [roundedBox(w + 0.1, 0.03, 1.0, 0.01, [0, 0.015, 0], { segments: 1 })];
  if (tent) {
    const h = 1.5;
    for (const x of [-(w / 2 + 0.05), w / 2 + 0.05]) {
      for (const z of [-0.5, 0.5]) parts.push(roundedBox(0.04, h, 0.04, 0.01, [x, h / 2, z], { segments: 1 }));
    }
    // 뒤와 양옆 천, 지붕
    parts.push(roundedBox(w + 0.14, h, 0.02, 0.005, [0, h / 2, 0.52], { segments: 1 }));
    for (const x of [-(w / 2 + 0.06), w / 2 + 0.06]) parts.push(roundedBox(0.02, h, 1.0, 0.005, [x, h / 2, 0], { segments: 1 }));
    parts.push(roundedBox(w + 0.2, 0.03, 1.1, 0.01, [0, h + 0.02, 0], { segments: 1 }));
  }
  return { upholstery, shell: merge(parts), arm: emptyGeometry() };
}

function emptyGeometry(): BufferGeometry {
  return new BufferGeometry();
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

/** 끝까지 젖혔을 때 등받이가 더 넘어가는 각도: 상체 각도 변화(RECLINE)와 같다 */
const RECLINE_BACK_RAD = RECLINE.reclinedRad - RECLINE.uprightRad;
/** 발받침이 들리는 각도(약 80°, 거의 수평) */
const RECLINE_FOOT_RAD = 1.4;

/** 리클라이너·프리미엄: 두툼한 가죽 방석과 등받이, 머리받침, 넓은 팔걸이 콘솔, 접힌 발받침 */
function buildRecliner({ width, seatHeight, backHeight }: ChairSpec): ChairGeometries {
  const armW = Math.min(0.17, width * 0.2);
  const inner = width - armW - 0.01;
  const armTop = Math.max(0.6, seatHeight + 0.2);
  const backLen = Math.max(0.5, backHeight - seatHeight + 0.12);
  const recline = 0.26;

  const upholstery = merge([roundedBox(inner, 0.2, 0.6, 0.07, [0, seatHeight - 0.1, -0.04], { tilt: 0.04, segments: 3 })]);

  // 등받이와 머리받침: 등받이 아래 끝을 축으로 뒤로 넘어간다
  const backPivot: [number, number, number] = [0, seatHeight - 0.06, 0.28];
  const back = merge([
    roundedBox(inner, backLen, 0.2, 0.08, [0, 0, 0], { tilt: recline, pivotBottom: true, segments: 3 }),
    roundedBox(inner * 0.78, 0.17, 0.11, 0.05, [0, (backLen - 0.12) * Math.cos(recline), (backLen - 0.12) * Math.sin(recline) - 0.12]),
  ]);
  // 발받침: 방석 앞 끝 아래에 접혀 있다가, 위 끝을 축으로 앞으로 들려 다리를 받친다
  const footLen = seatHeight - 0.12;
  const footPivot: [number, number, number] = [0, footLen + 0.04, -0.31];
  const foot = merge([roundedBox(inner - 0.04, footLen, 0.09, 0.035, [0, -footLen / 2, 0])]);
  const moving: MovingPart[] = [
    { geometry: back, pivot: backPivot, angle: RECLINE_BACK_RAD },
    { geometry: foot, pivot: footPivot, angle: RECLINE_FOOT_RAD },
  ];
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
  return { upholstery, shell, arm, moving };
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
