import { BufferAttribute, SphereGeometry } from "three";

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * 홀로그램 머리. 얼굴은 부품을 붙이지 않고 머리 곡면을 깎고 돋워서 만든다(코·눈두덩·눈썹뼈·입술·턱·광대).
 * 얼굴은 -z 쪽을 본다. 깎은 정도는 relief 속성(-1 움푹 ~ 1 볼록)으로 남겨, 그리는 쪽이 눈·입은 어둡게 콧날은 밝게 칠한다. 크기는 가로 0.37, 세로 0.5, 앞뒤 0.44 정도의 타원체다.
 */
export function sculptHead(widthSegments = 40, heightSegments = 30): SphereGeometry {
  const g = new SphereGeometry(1, widthSegments, heightSegments);
  const p = g.attributes.position;
  const relief = new Float32Array(p.count);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const front = Math.max(0, -z);
    const jaw = smooth(-0.1, -0.95, y);
    const bump = (cx: number, cy: number, wx: number, wy: number) =>
      Math.exp(-(((x - cx) / wx) ** 2 + ((y - cy) / wy) ** 2));
    const pair = (cx: number, cy: number, wx: number, wy: number) => bump(cx, cy, wx, wy) + bump(-cx, cy, wx, wy);

    let out = 0;
    out += 0.16 * bump(0, -0.14, 0.08, 0.15) * front ** 4; // 코
    out += 0.035 * bump(0, 0.06, 0.06, 0.14) * front ** 4; // 콧등
    out -= 0.085 * pair(0.31, 0.13, 0.13, 0.08) * front; // 눈두덩
    out += 0.03 * pair(0.31, 0.12, 0.05, 0.035) * front; // 눈알
    out += 0.06 * pair(0.3, 0.27, 0.17, 0.05) * front; // 눈썹뼈
    out += 0.06 * bump(0, -0.43, 0.15, 0.05) * front ** 2; // 윗입술
    out -= 0.045 * bump(0, -0.475, 0.15, 0.022) * front ** 2; // 입 선
    out += 0.055 * bump(0, -0.53, 0.13, 0.045) * front ** 2; // 아랫입술
    out += 0.05 * bump(0, -0.8, 0.18, 0.1) * front; // 턱
    out += 0.015 * pair(0.55, -0.15, 0.15, 0.15) * front; // 광대

    relief[i] = Math.max(-1, Math.min(1, out / 0.04));
    p.setXYZ(i, x * 0.37 * (1 - 0.22 * jaw), y * 0.5, z * 0.44 * (z > 0 ? 1.06 : 1 - 0.12 * jaw) - out);
  }
  g.setAttribute("relief", new BufferAttribute(relief, 1));
  g.computeVertexNormals();
  return g;
}
