/**
 * 영화·상영 시간표 스키마. 파일은 data/movies/*.json, data/showtimes/<theaterId>.json.
 * 지금은 모두 샘플(sample: true)이다. 실제 시간표를 받으면 같은 모양으로 바꿔 넣는다.
 */

export interface Movie {
  schemaVersion: 1;
  id: string;
  sample: boolean;
  notes?: string;
  title: string;
  /** 티켓에 쓰는 영문 제목. 예: "THE NIGHT ORBIT" */
  titleEn: string;
  year: number;
  /** 관람 등급. 예: "12세 이상" */
  rating: string;
  runtimeMin: number;
  /** 포스터 이미지 주소(2:3). public/ 경로나 외부 URL. 바꾸면 화면·티켓이 모두 따라 바뀐다. */
  posterUrl: string;
}

/** 시간표의 관 하나 */
export interface ScreenInfo {
  /** 시간표 안에서만 쓰는 id. 예: "imax" */
  id: string;
  /** 표시 이름. 예: "IMAX관" */
  name: string;
  /** 포맷 표시. 예: "IMAX 레이저", "4DX", "2D" */
  format: string;
  /** 예: "자막", "더빙" */
  subtitle: string;
  /** 화면비(폭/높이). 예: 1.43 */
  aspectRatio: number;
  seatCount: number;
  /**
   * 시야 데이터가 있는 상영관 id (data/theaters/<theaterId>/auditoriums/<id>.json).
   * null이면 이 관은 시야 미리보기가 없다.
   */
  auditoriumId: string | null;
}

export interface Showing {
  /** 오늘로부터 며칠 뒤인지. 0 = 오늘. (샘플 데이터가 항상 이번 주를 가리키게 하려고 상대값으로 둔다) */
  day: number;
  screenId: string;
  /** "HH:MM" */
  start: string;
  /** "HH:MM". 자정을 넘기면 24 이상으로 쓴다. 예: "24:30" */
  end: string;
  seatsLeft: number;
}

export interface Schedule {
  schemaVersion: 1;
  theaterId: string;
  movieId: string;
  sample: boolean;
  notes?: string;
  screens: ScreenInfo[];
  showings: Showing[];
}
