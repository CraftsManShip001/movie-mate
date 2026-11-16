import { useId } from "react";
import { ticketOutlinePath } from "./ticket-shape";
import styles from "./Ticket.module.css";

/** 티켓에 찍는 내용 (4번 화면, 5번 미니 티켓) */
export interface TicketInfo {
  ticketNo: string;
  movieTitle: string;
  /** "THE NIGHT ORBIT · 2026" */
  movieTitleEn: string;
  posterUrl: string;
  /** "J14" */
  seatCode: string;
  theaterName: string;
  screenName: string;
  /** "2026.11.16 MON" (없으면 빈 문자열) */
  dateLine: string;
  /** "13:40" */
  time: string;
  /** "2026.11.16 (월) 13:40" */
  bandDate: string;
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

/** 입장권 면 (종이). 디자인 문서의 "뒷면". */
export function TicketPaper({ info }: { info: TicketInfo }) {
  const clipId = useId();
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
            <path d={ticketOutlinePath(TICKET_W, TICKET_H)} />
          </clipPath>
        </defs>
        <rect width={TICKET_W} height={TICKET_H} style={{ fill: "var(--color-paper)" }} clipPath={`url(#${clipId})`} />
      </svg>
      <div className={styles.paper}>
        <div className={styles.paperTop}>
          <span>MOVIE MATE ORIGINAL</span>
          <span>No. {info.ticketNo}</span>
        </div>
        <div className={styles.paperTitle}>{info.movieTitle}</div>
        <div className={styles.paperTitleEn}>{info.movieTitleEn}</div>
        <div className={styles.paperSeat}>
          <span className={styles.paperSeatLabel}>SEAT</span>
          <span className={styles.paperSeatCode}>{info.seatCode}</span>
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
 * 포스터 면. 위쪽 2:3 포스터 + 아래 띠(상영 일시·극장 두 줄). 디자인 문서의 "앞면".
 * width를 바꾸면 같은 비율로 작게 그린다(5번 화면 미니 티켓은 84).
 */
export function TicketPoster({
  posterUrl,
  bandDate,
  bandTheater,
  width = TICKET_W,
  alt,
}: {
  posterUrl: string;
  bandDate: string;
  bandTheater: string;
  width?: number;
  alt?: string;
}) {
  const clipId = useId();
  const k = width / TICKET_W;
  const height = Math.round(TICKET_H * k);
  const posterH = width * 1.5;
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
        <image href={posterUrl} x="0" y="0" width={width} height={posterH} preserveAspectRatio="xMidYMid slice" />
        <rect x="0" y={posterH} width={width} height={height - posterH} style={{ fill: "var(--color-poster-band)" }} />
        <line x1={16 * k} y1={posterH + k} x2={width - 16 * k} y2={posterH + k} style={{ stroke: "var(--color-poster-line)" }} strokeWidth={1.2 * k} />
        <text
          x={width / 2}
          y={posterH + 68.5 * k}
          textAnchor="middle"
          fontSize={10 * k}
          letterSpacing={2 * k}
          style={{ fill: "var(--color-poster-text)" }}
          className={styles.monoText}
        >
          {bandDate}
        </text>
        <text
          x={width / 2}
          y={posterH + 88.5 * k}
          textAnchor="middle"
          fontSize={8.5 * k}
          letterSpacing={1.5 * k}
          style={{ fill: "var(--color-poster-sub)" }}
          className={styles.monoText}
        >
          {bandTheater}
        </text>
      </g>
    </svg>
  );
}
