/** 배포 주소. 미리 보기 배포 등에서 바꿀 수 있게 환경 변수를 먼저 본다. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://movie.stalemate.kr";
export const SITE_NAME = "무비메이트";
/** 검색 엔진이 같은 사이트로 묶도록 알려 주는 다른 표기 */
export const SITE_ALTERNATE_NAMES = ["무비 메이트", "MovieMate", "Movie Mate"];
export const SITE_DESCRIPTION =
  "CGV·메가박스·롯데시네마 상영관의 좌석에 앉았을 때 스크린이 어떻게 보이는지 3D로 미리 보세요. 예매 전에 자리를 고를 때 써요.";

/** 하위 페이지가 openGraph를 새로 쓰면 루트의 공유 이미지가 빠지므로, 같은 이미지를 함께 넘긴다. */
export const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "좌석에 앉았을 때 보이는 ScreenX 상영관 3D 시야와 무비메이트 소개 문구",
};
