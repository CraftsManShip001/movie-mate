/**
 * 스크린에 재생할 영상.
 *
 * 영상: Spring (Blender Studio, 2019), 감독 Andy Goralczyk
 * 라이선스: Creative Commons Attribution 4.0 (CC BY 4.0)
 *   (c) Blender Foundation | cloud.blender.org/spring
 *   https://creativecommons.org/licenses/by/4.0/
 * 원본: Wikimedia Commons, File:Spring - Blender Open Movie.webm (1080p VP9 변환본)
 *   https://commons.wikimedia.org/wiki/File:Spring_-_Blender_Open_Movie.webm
 *
 * - public/video/spring.mp4 는 원본 5:40부터 77초를 잘라 H.264(1280×536, 소리 없음)로 다시 인코딩한 편집본이다.
 *   밝은 초원·산 장면부터 제목 화면 직전까지다.
 * - 예전에는 Wikimedia의 WebM(VP9)을 바로 스트리밍했는데, Safari(맥·아이폰)는 그 영상을 WebGL 텍스처로 쓰지 못해
 *   테스트 패턴만 나왔다. 모든 브라우저가 트는 H.264 MP4를 같은 사이트에서 준다(CORS도 필요 없다).
 * - 재생에 실패하면 캔버스 테스트 패턴으로 대체된다.
 * - CC BY 이므로 화면 어딘가(지금은 시야 화면 하단)에 출처 표기를 유지해야 한다.
 */
export const SCREEN_VIDEO_URL = "/video/spring.mp4";

export const SCREEN_VIDEO_CREDIT = "영상: Spring (c) Blender Foundation, cloud.blender.org/spring, CC BY 4.0";

/**
 * 재생 구간(초). 편집본 전체를 처음부터 반복한다.
 * - start: 처음 재생할 곳
 * - loopTo: 여기에 닿으면 loopFrom으로 돌아간다
 */
export const SCREEN_VIDEO_RANGE = { start: 0, loopFrom: 0, loopTo: 77 } as const;

/** 이 시간 안에 재생을 시작하지 못하면 테스트 패턴으로 대체한다. */
export const SCREEN_VIDEO_TIMEOUT_MS = 15000;
