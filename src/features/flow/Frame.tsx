import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Frame.module.css";

export { styles as frameStyles };

export function ChevronLeft({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 5 8 12 15 19" />
    </svg>
  );
}

export function ChevronRight({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 5 16 12 9 19" />
    </svg>
  );
}

/** 헤더: "‹ 뒤로 + 제목" 하나. 높이 72. backHref가 없으면 뒤로 버튼 없이 제목만 */
export function FrameHeader({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {backHref ? (
          <Link href={backHref} className={styles.back} aria-label="뒤로">
            <ChevronLeft />
          </Link>
        ) : (
          <div className={styles.headerSpacer} />
        )}
        <h1 className={styles.headerTitle}>{title}</h1>
      </div>
    </header>
  );
}

export function Frame({ header, children, bottom }: { header: ReactNode; children: ReactNode; bottom?: ReactNode }) {
  return (
    <div className={styles.frame}>
      {header}
      <main className={styles.content}>{children}</main>
      {bottom ? (
        <div className={styles.bottom}>
          <div className={styles.bottomInner}>{bottom}</div>
        </div>
      ) : null}
    </div>
  );
}
