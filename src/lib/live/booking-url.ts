/**
 * 고른 상영을 영화관 예매 화면에서 바로 이어 고를 수 있게 하는 주소 (순수 함수).
 * 좌석은 어느 영화관도 주소로 넘길 수 없어, 거기서 직접 고른다.
 *
 * - 메가박스: 상영 번호(playSchdlNo)를 주면 그 회차의 좌석 선택 화면이 바로 열린다.
 * - 롯데시네마: 영화·극장·날짜가 골라진 채로 열린다. 시간은 거기서 누른다.
 *   (시간까지 표시하는 값은 네이버 예매에서 넘어온 경우에만 동작해 쓰지 않는다.)
 * - CGV: 실제 시간표가 없어 첫 화면으로 보낸다(labels.ts).
 */

export function megaboxBookingUrl(playSchdlNo: string): string {
  return `https://www.megabox.co.kr/booking?${new URLSearchParams({ playSchdlNo })}`;
}

export interface LotteBookingTarget {
  /** 예매 API의 극장 키. 예: "1|0001|1013" */
  cinemaKey: string;
  /** 롯데시네마가 쓰는 극장 이름. 예: "가산디지털" */
  cinemaName: string;
  /** 대표 영화 코드(RepresentationMovieCode). 우리 영화 id와 같다. */
  movieCode: string;
  movieName: string;
  /** "YYYY-MM-DD" */
  date: string;
}

export function lotteBookingUrl(target: LotteBookingTarget): string {
  const query = new URLSearchParams({
    movieCd: target.movieCode,
    movieName: target.movieName,
    screenCd: target.cinemaKey,
    screenName: target.cinemaName,
    releaseDate: target.date,
  });
  return `https://www.lottecinema.co.kr/NLCHS/Ticketing?${query}`;
}
