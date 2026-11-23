import { useId, useState } from "react";
import { ticketOutlinePath } from "./ticket-shape";
import styles from "./Ticket.module.css";

/** 티켓 뒷면(입장권)에 찍는 내용 */
export interface TicketInfo {
  ticketNo: string;
  movieTitle: string;
  /** "THE NIGHT ORBIT · 2026" */
  movieTitleEn: string;
  /** 앞면 포스터(큰 그림이 있으면 큰 그림) */
  posterUrl: string;
  /** 큰 포스터를 불러오지 못했을 때 쓰는 목록용 포스터 */
  posterFallbackUrl: string;
  /** "J14" */
  seatCode: string;
  theaterName: string;
  screenName: string;
  /** "2026.11.16 MON" (없으면 빈 문자열) */
  dateLine: string;
  /** "13:40" */
  time: string;
  /** "75° / 20°" */
  view: string;
  /** "15.5m" */
  distance: string;
}

export const TICKET_W = 250;
export const TICKET_H = 520;

/** 디자인 파일의 바코드 막대 (x, 폭) */
const BARCODE: [number, number][] = [
  [0, 2.5], [3.8, 1.3], [8.8, 1.3], [12.6, 2.5], [16.4, 3.8], [21.5, 1.3], [25.3, 1.3], [27.8, 3.8],
  [34.1, 1.3], [37.9, 1.3], [42.9, 1.3], [45.5, 2.5], [50.5, 1.3], [55.6, 1.3], [59.4, 1.3], [61.9, 2.5],
  [68.2, 1.3], [70.7, 2.5], [74.5, 3.8], [79.6, 2.5], [83.4, 1.3], [87.2, 1.3], [92.2, 2.5],
];

function Barcode() {
  return (
    <svg width="96" height="26" viewBox="0 0 96 26" aria-hidden="true" className={styles.barcode}>
      {BARCODE.map(([x, w]) => (
        <rect key={x} x={x} y="0" width={w} height="26" fill="currentColor" />
      ))}
    </svg>
  );
}

/** 좌석 번호가 길면(AA114 등) 글자를 줄여 SEAT 라벨과 한 줄에 둔다 */
function seatCodeSize(code: string): number {
  if (code.length <= 4) return 104;
  if (code.length === 5) return 84;
  return 68;
}

/**
 * 입장권 면. 디자인 문서의 "뒷면" (B-1 블랙 에디션).
 * 영화관·상영관·좌석·일시는 모두 이 면에 둔다.
 */
export function TicketPaper({ info }: { info: TicketInfo }) {
  const clipId = useId();
  const outline = ticketOutlinePath(TICKET_W, TICKET_H);
  const rows: [string, string][] = [
    ["THEATER", info.theaterName],
    ["SCREEN", info.screenName],
    ["DATE", info.dateLine],
    ["TIME", info.time],
    ["VIEW", info.view],
    ["DISTANCE", info.distance],
  ];
  return (
    <div className={styles.face}>
      <svg width={TICKET_W} height={TICKET_H} viewBox={`0 0 ${TICKET_W} ${TICKET_H}`} className={styles.shape} aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <path d={outline} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect width={TICKET_W} height={TICKET_H} style={{ fill: "var(--color-paper)" }} />
          {/* 안쪽으로만 보이는 테두리(선 폭의 절반이 잘린다) */}
          <path d={outline} fill="none" style={{ stroke: "var(--color-paper-edge)" }} strokeWidth={2} />
        </g>
      </svg>
      <div className={styles.paper}>
        <div className={styles.paperTop}>
          <span>MOVIE MATE</span>
          <span>No. {info.ticketNo}</span>
        </div>
        <div className={styles.paperTitle}>{info.movieTitle}</div>
        <div className={styles.paperTitleEn}>{info.movieTitleEn}</div>
        <div className={styles.paperSeat}>
          <span className={styles.paperSeatLabel}>SEAT</span>
          <span className={styles.paperSeatCode} style={{ fontSize: seatCodeSize(info.seatCode) }}>
            {info.seatCode}
          </span>
        </div>
        <dl className={styles.paperRows}>
          {rows.map(([label, value]) => (
            <div key={label} className={styles.paperRow}>
              <dt>{label}</dt>
              <dd>{value || "-"}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.paperFoot}>
          <span>
            SEE BEFORE
            <br />
            YOU SIT
          </span>
          <Barcode />
        </div>
      </div>
    </div>
  );
}

/**
 * 포스터 면. 디자인 문서의 "앞면". 포스터만 담고 글자는 넣지 않는다.
 * 2:3 포스터가 티켓 전체를 채우므로 양옆이 조금 잘린다.
 * width를 바꾸면 같은 비율로 작게 그린다(5번 화면 미니 티켓은 84).
 */
export function TicketPoster({
  posterUrl,
  fallbackUrl,
  width = TICKET_W,
  alt,
}: {
  posterUrl: string;
  fallbackUrl?: string;
  width?: number;
  alt?: string;
}) {
  const clipId = useId();
  // 큰 포스터 주소는 이름 규칙으로 만든 것이라 없을 수 있다. 실패하면 목록용 포스터로 바꾼다.
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const href = failedUrl === posterUrl && fallbackUrl ? fallbackUrl : posterUrl;
  const height = Math.round(TICKET_H * (width / TICKET_W));
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={styles.shape}
      role={alt ? "img" : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={ticketOutlinePath(width, height)} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {/* 포스터를 불러오기 전에 보이는 종이 */}
        <rect width={width} height={height} style={{ fill: "var(--color-paper)" }} />
        <image
          href={href}
          x="0"
          y="0"
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid slice"
          onError={() => setFailedUrl(posterUrl)}
        />
      </g>
    </svg>
  );
}
