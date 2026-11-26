import type { ReactNode } from "react";

/** 휴대폰 시야 화면 오른쪽 레일의 선 아이콘(24 격자, 글자 색을 따른다) */
function Icon({ children, size = 22 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function SeatsIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="5" height="5" rx="1.2" />
      <rect x="10" y="5" width="5" height="5" rx="1.2" />
      <rect x="17" y="5" width="4" height="5" rx="1.2" />
      <rect x="3" y="13" width="5" height="5" rx="1.2" />
      <rect x="10" y="13" width="5" height="5" rx="1.2" />
      <rect x="17" y="13" width="4" height="5" rx="1.2" />
    </Icon>
  );
}

export function HeightIcon() {
  return (
    <Icon>
      <circle cx="9" cy="5" r="2" />
      <path d="M9 8v8M6 11h6M9 16l-2 5M9 16l2 5" />
      <path d="M18 3v18M16 5l2-2 2 2M16 19l2 2 2-2" />
    </Icon>
  );
}

export function HeadsIcon() {
  return (
    <Icon>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />
    </Icon>
  );
}

export function ReclineIcon() {
  return (
    <Icon>
      <path d="M5 4l3 10h9l2 5" />
      <path d="M8 14l-1 6M15 14v6" />
      <path d="M17 14l3-3" />
    </Icon>
  );
}

/** 스크린 쪽으로 고개 되돌리기 */
export function RecenterIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </Icon>
  );
}

export function PlayIcon() {
  return (
    <Icon>
      <path d="M8 5.5v13l10-6.5z" />
    </Icon>
  );
}

export function ExternalIcon() {
  return (
    <Icon size={16}>
      <path d="M9 6h9v9M18 6L7 17" />
    </Icon>
  );
}

export function DragIcon() {
  return (
    <Icon size={30}>
      <path d="M4 12h16M7 9l-3 3 3 3M17 9l3 3-3 3" />
    </Icon>
  );
}
