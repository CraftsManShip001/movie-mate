/**
 * 티켓 외곽선 (design/DESIGN.md "티켓").
 * 위아래 가장자리에 반원 홈(반지름 6, 중심 간격 26)을 파고, 네 모서리는 오목하게(반지름 14) 깎는다.
 * 순수 함수라서 테스트할 수 있다. 결과는 SVG path d 문자열.
 */
export const TICKET_NOTCH_R = 6;
export const TICKET_NOTCH_PITCH = 26;
export const TICKET_CORNER_R = 14;
/** 모서리 홈과 첫 반원 홈 사이 최소 여백 */
const MIN_EDGE_GAP = 8;

const n = (value: number) => Number(value.toFixed(2)).toString();

/** 한 가장자리에 들어가는 반원 홈 개수 */
export function notchCount(width: number): number {
  const inner = width - TICKET_CORNER_R * 2;
  const usable = inner - TICKET_NOTCH_R * 2 - MIN_EDGE_GAP * 2;
  if (usable < 0) return 0;
  return Math.floor(usable / TICKET_NOTCH_PITCH) + 1;
}

export function ticketOutlinePath(width: number, height: number): string {
  const r = TICKET_NOTCH_R;
  const c = TICKET_CORNER_R;
  const count = notchCount(width);
  const span = count > 0 ? TICKET_NOTCH_PITCH * (count - 1) + r * 2 : 0;
  const first = c + (width - c * 2 - span) / 2;
  // 왼쪽부터 각 홈의 시작 x
  const starts = Array.from({ length: count }, (_, i) => first + i * TICKET_NOTCH_PITCH);

  const parts: string[] = [`M${c},0`];
  for (const x of starts) {
    parts.push(`L${n(x)},0`, `A${r},${r} 0 0 0 ${n(x + r * 2)},0`);
  }
  parts.push(`L${n(width - c)},0`, `A${c},${c} 0 0 0 ${width},${c}`);
  parts.push(`L${width},${n(height - c)}`, `A${c},${c} 0 0 0 ${n(width - c)},${height}`);
  for (const x of [...starts].reverse()) {
    parts.push(`L${n(x + r * 2)},${height}`, `A${r},${r} 0 0 0 ${n(x)},${height}`);
  }
  parts.push(`L${c},${height}`, `A${c},${c} 0 0 0 0,${n(height - c)}`);
  parts.push(`L0,${c}`, `A${c},${c} 0 0 0 ${c},0`, "Z");
  return parts.join(" ");
}
