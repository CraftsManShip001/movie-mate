/**
 * movie mate 데이터 스키마.
 *
 * 단위 규칙
 * - JSON 데이터의 길이 값은 모두 밀리미터(mm) 정수다. 건축 도면이 mm 단위이기 때문.
 * - 계산 함수(geometry, metrics)의 결과는 미터(m)와 도(deg)다.
 *
 * 좌표계 (계산 결과, 미터)
 * - 원점: 스크린 면(z = 0)의 가로 중앙, 객석 맨 앞 바닥 높이(y = 0).
 * - x: 관객이 스크린을 바라볼 때 오른쪽이 +.
 * - y: 위쪽이 +.
 * - z: 스크린에서 객석 뒤쪽으로 갈수록 +. (관객은 -z 방향을 바라본다. three.js 카메라 기본 방향과 같다.)
 */

/** 값의 출처. measured = 도면·현장 실측, estimated = 표준값·추정값. */
export type ValueSource = "measured" | "estimated";

/** 출처가 붙은 값. 모든 치수는 이 형태로 저장해서 어떤 값이 추정인지 데이터에 남긴다. */
export interface Sourced<T = number> {
  value: T;
  source: ValueSource;
  /** 근거 메모. 예: "도면 A-201", "KS 기준 표준값" */
  note?: string;
}

export type ChainName = "CGV" | "롯데시네마" | "메가박스" | (string & {});

export interface Theater {
  schemaVersion: 1;
  /** URL에 쓰는 id. 폴더 이름과 같아야 한다. 예: "cgv-yongsan-ipark-mall" */
  id: string;
  chain: ChainName;
  /** 지점 이름. 예: "용산아이파크몰" */
  branch: string;
  address: string;
  /** 이 극장에 속한 상영관 id 목록 (auditoriums/*.json 파일 이름과 같다) */
  auditoriumIds: string[];
  /** 샘플(가짜) 데이터 여부 */
  sample: boolean;
  notes?: string;
}

export type AuditoriumFormat =
  | "standard"
  | "imax"
  | "4dx"
  | "mx4d"
  | "screenx"
  | "dolby-cinema"
  | "premium"
  | "recliner"
  | "bed"
  | (string & {});

/**
 * 좌석 행렬 한 칸의 종류. 한 글자로 저장해 JSON에서도 배치가 눈에 보이게 한다.
 * - "s": 일반 좌석
 * - "w": 휠체어석
 * - "x": 판매하지 않는 좌석(자리는 있음)
 * - ".": 빈 칸(좌석 없음)
 */
export type CellCode = "s" | "w" | "x" | ".";
export const SEAT_CODES: readonly CellCode[] = ["s", "w", "x"];

export interface SeatRow {
  /** 열 이름. 예: "A" */
  label: string;
  /**
   * 좌석 행렬의 한 줄. 왼쪽(관객 기준)부터 한 글자가 한 칸이다.
   * 모든 행은 같은 길이여야 한다(세로 통로가 열마다 같은 위치에 오도록).
   * 예: "..sssss.ssssssssss.sssss.."
   */
  cells: string;
  /**
   * 예매 화면의 좌석 번호. 이 열의 좌석(빈 칸이 아닌 칸)마다 왼쪽부터 하나씩.
   * 번호가 칸 위치와 맞지 않는 상영관(열마다 좌석이 엇갈리거나 번호가 건너뛰는 곳)에만 쓴다. 있으면 seatNumbering 보다 앞선다.
   */
  numbers?: number[];
  /**
   * 좌석마다 [왼쪽 끝 위치, 폭]. 단위는 칸(1 = 일반 좌석 한 칸)이고 소수도 된다. 이 열의 좌석마다 왼쪽부터 하나씩.
   * 넓은 좌석(리클라이너·커플석·소파석)이 있거나 좌석이 칸에 딱 맞지 않는 열에만 쓴다.
   * 없으면 좌석은 cells 의 칸 위치에 폭 1로 놓인다. 있으면 위치·폭은 이 값을 따르고, cells 는 좌석 종류와 대략의 칸만 나타낸다.
   */
  spans?: [number, number][];
  /**
   * 본 객석과 떨어진 구역 이름. 예: "PRIVATE BOX 7층", "SWEETBOX PREMIUM 6층".
   * 다른 층 발코니처럼 본 객석 뒤에 따로 있는 좌석 열에만 쓴다. 이 열들은 세로 통로를 정할 때 빼고 보며, spans 가 꼭 있어야 한다.
   */
  zone?: string;
  /**
   * 구역 종류. 3D 모양을 정한다.
   * - "privateBox": 객석 뒤 높은 층의 방(유리창, 칸막이·천장, 리클라이너). boxes 로 방 범위를 준다.
   * - "sweetbox": 위층 발코니의 2인 가죽 소파(가운데 팔걸이 없음). 붙어 있는 두 자리가 한 소파다.
   */
  zoneKind?: "privateBox" | "sweetbox";
  /**
   * 구역 바닥. 기본은 "upper"(본 객석 뒤 위층 발코니). "main"이면 본 객석과 같은 층 뒤쪽에 있어 열마다 오르는 단차만 따른다
   * (롯데시네마 1층 씨네패밀리 부스).
   */
  zoneFloor?: "upper" | "main";
  /**
   * 일반 의자가 아닌 좌석. [이 열 좌석 중 첫 좌석 순서(0부터), 좌석 수, 종류]. 종류는 SeatFurniture 참고.
   * 예: [[0, 4, "couple"]] = 왼쪽 네 자리가 2인 소파 두 개.
   */
  furniture?: [number, number, SeatFurniture][];
  /** 칸막이로 둘러싼 박스석(PRIVATE BOX) 범위. 박스마다 [왼쪽 끝, 폭], 단위는 spans 와 같다. */
  boxes?: [number, number][];
}

/**
 * 일반 의자가 아닌 좌석 종류. 3D 모양과 눈높이가 달라진다.
 * - "couple": 2인 소파(SWEETBOX·커플석). 붙어 있는 두 자리가 한 소파이고 가운데 팔걸이가 없다.
 * - "sofa": 여러 사람이 앉는 소파 한 덩어리(가족석·발코니 소파). 덩어리 안에 팔걸이가 없다.
 * - "bed": 누워서 보는 침대(템퍼 시네마, 모션베드). 눈이 낮고 뒤쪽에 있다.
 * - "beanbag": 바닥의 빈백. 눈이 낮다.
 * - "mat": 바닥 매트·방석. 눈이 낮다.
 * - "cabana": 바닥에 앉는 작은 천막(카바나).
 */
export type SeatFurniture = "couple" | "sofa" | "bed" | "beanbag" | "mat" | "cabana";

/** 세로 통로: 좌석 행렬의 몇 번째 칸 뒤에 통로가 있는지 */
export interface VerticalAisle {
  /** 0부터 센 칸 번호. 이 칸의 오른쪽에 통로가 있다. */
  afterColumn: number;
  width: Sourced;
}

/** 가로 통로: 몇 번째 열 뒤에 통로가 있는지 */
export interface CrossAisle {
  /** 0부터 센 열 번호. 이 열의 뒤쪽에 통로가 있다. */
  afterRow: number;
  depth: Sourced;
}

export interface AuditoriumScreen {
  /** 스크린 폭 (mm) */
  width: Sourced;
  /** 스크린 높이 (mm) */
  height: Sourced;
  /** 객석 맨 앞 바닥에서 스크린 하단까지 높이 (mm) */
  bottomHeight: Sourced;
  /** 스크린 비율(폭/높이). 예: 1.9 (= 1.90:1). width/height와 1% 이상 다르면 검증 오류. */
  aspectRatio: Sourced;
  /**
   * SCREENX: 영상이 양옆 벽까지 이어진다. 스크린 면에서 뒤쪽으로 벽 영상이 닿는 깊이 (mm).
   * 없으면 앞벽 스크린만 있다.
   */
  sideScreens?: Sourced;
}

export interface AuditoriumRoom {
  /** 실내 폭 (mm) */
  width: Sourced;
  /** 스크린 면에서 뒷벽까지 깊이 (mm) */
  depth: Sourced;
  /** 맨 앞 바닥에서 천장까지 높이 (mm) */
  height: Sourced;
}

export interface AuditoriumLayout {
  /** 스크린 면에서 첫 열(A열) 좌석 중심까지 수평 거리 (mm) */
  firstRowDistance: Sourced;
  /** 열 간격: 앞뒤 좌석 중심 사이 거리 (mm) */
  rowSpacing: Sourced;
  /** 단차: 한 열 올라갈 때 바닥이 높아지는 양 (mm) */
  riserHeight: Sourced;
  /** 단차 없이 평평한 바닥에 놓인 앞쪽 열 수 */
  flatRowCount: Sourced;
  /** 좌석 폭: 팔걸이 중심 사이 거리 (mm) */
  seatWidth: Sourced;
  /** 좌석 방석 높이 (mm) */
  seatHeight: Sourced;
  /** 등받이 윗면 높이, 좌석 바닥 기준 (mm) */
  seatBackHeight: Sourced;
  verticalAisles: VerticalAisle[];
  crossAisles: CrossAisle[];
  /** 따로 떨어진 구역(zone) 열이 본 객석 맨 뒷열 바닥보다 높은 양. 구역(층)이 바뀔 때마다 한 번씩 더 올라간다 (mm) */
  zoneRise?: Sourced;
}

export interface Auditorium {
  schemaVersion: 1;
  /** 파일 이름과 같은 id. 예: "sample-imax" */
  id: string;
  theaterId: string;
  /** 표시 이름. 예: "IMAX관" */
  name: string;
  format: AuditoriumFormat;
  /** 샘플(가짜) 데이터 여부. 실측 도면이 들어오면 false로 바꾼다. */
  sample: boolean;
  /** true면 값 중 하나 이상이 estimated. validate 단계에서 실제 값과 맞는지 확인한다. */
  estimated: boolean;
  /**
   * 좌석 번호 매기는 방식. 없으면 "count".
   * - "count": 열마다 왼쪽부터 좌석만 세어 1, 2, 3...
   * - "column": 칸 번호 + 1. 빈 칸도 번호를 차지한다(CGV 예매 화면 방식).
   */
  seatNumbering?: "count" | "column";
  notes?: string;
  room: AuditoriumRoom;
  screen: AuditoriumScreen;
  layout: AuditoriumLayout;
  /** 앞(스크린 쪽) 열부터 뒤쪽 열 순서 */
  rows: SeatRow[];
}

/** 좌석 행렬에서 꺼낸 좌석 하나 (계산된 값, JSON에는 저장하지 않음) */
export interface Seat {
  /** 예: "H12" */
  id: string;
  rowLabel: string;
  /** 열 안에서 왼쪽부터 센 좌석 번호(1부터). 빈 칸은 세지 않는다. */
  number: number;
  rowIndex: number;
  columnIndex: number;
  /** 좌석 왼쪽 끝 위치 (칸 단위, 소수 가능). 보통은 columnIndex 와 같다. */
  left: number;
  /** 좌석 폭 (칸 단위). 일반 좌석은 1, 넓은 좌석은 1보다 크다. */
  span: number;
  kind: Exclude<CellCode, ".">;
  /** 일반 의자가 아니면 그 종류 */
  furniture?: SeatFurniture;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}
