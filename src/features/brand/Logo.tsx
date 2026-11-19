import { useId } from "react";

/** E-2 티켓 모양(100칸). 세로 절취선(x=64) 왼쪽이 본권, 오른쪽이 꼭지다. */
const TICKET =
  "M18 26 H57 A7 7 0 0 0 71 26 H82 A8 8 0 0 1 90 34 V66 A8 8 0 0 1 82 74 H71 A7 7 0 0 0 57 74 H18 A8 8 0 0 1 10 66 V34 A8 8 0 0 1 18 26 Z";

/**
 * movie mate 로고(티켓 반쪽). 원본은 design/logo/, 규칙은 design/DESIGN.md "로고".
 * 32px 이하(브라우저 탭)는 src/app/icon.svg의 작은 판을 쓴다.
 */
export function LogoMark({ size = 28, label = "movie mate" }: { size?: number; label?: string }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label} style={{ display: "block" }}>
      <defs>
        <clipPath id={`${id}a`}>
          <rect x="0" y="0" width="62" height="100" />
        </clipPath>
        <clipPath id={`${id}b`}>
          <rect x="66" y="0" width="40" height="100" />
        </clipPath>
      </defs>
      <path d={TICKET} fill="var(--color-brand)" clipPath={`url(#${id}a)`} />
      <path d={TICKET} fill="var(--color-ink)" clipPath={`url(#${id}b)`} />
    </svg>
  );
}
