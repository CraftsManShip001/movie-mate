/**
 * 스크린에 재생할 영상 URL.
 *
 * 영상: Spring (Blender Studio, 2019), 감독 Andy Goralczyk
 * 라이선스: Creative Commons Attribution 4.0 (CC BY 4.0)
 *   (c) Blender Foundation | cloud.blender.org/spring
 *   https://creativecommons.org/licenses/by/4.0/
 * 출처: Wikimedia Commons, File:Spring - Blender Open Movie.webm (720p VP9 변환본, 1280×536, 2.39:1)
 *   https://commons.wikimedia.org/wiki/File:Spring_-_Blender_Open_Movie.webm
 *
 * - 파일을 저장소에 넣지 않고 공개 URL로 스트리밍한다.
 * - WebGL 텍스처로 쓰려면 CORS 허용이 필요하다. Wikimedia(upload.wikimedia.org)는 Access-Control-Allow-Origin: * 를 준다.
 * - WebM(VP9)을 재생하지 못하는 브라우저나 네트워크 오류일 때는 캔버스 테스트 패턴으로 대체된다.
 * - CC BY 이므로 화면 어딘가(지금은 시야 화면 하단)에 출처 표기를 유지해야 한다.
 */
export const SCREEN_VIDEO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a5/Spring_-_Blender_Open_Movie.webm/Spring_-_Blender_Open_Movie.webm.720p.vp9.webm";

/**
 * WebM(VP9)을 못 트는 브라우저(아이폰 Safari 일부 등)용 같은 영상의 다른 변환본.
 * Wikimedia가 주는 MPEG-4 Part 2(.mov, 640×268). 아이폰이 기본으로 재생하는 형식이다.
 */
export const SCREEN_VIDEO_FALLBACK_URL =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a5/Spring_-_Blender_Open_Movie.webm/Spring_-_Blender_Open_Movie.webm.360p.mpeg4.mov";

/** 이 브라우저가 WebM(VP9)을 틀 수 있으면 기본 영상, 아니면 .mov 변환본 */
export function pickScreenVideoUrl(el: HTMLVideoElement, url: string): string {
  if (url !== SCREEN_VIDEO_URL) return url;
  return el.canPlayType('video/webm; codecs="vp9, opus"') ? url : SCREEN_VIDEO_FALLBACK_URL;
}

export const SCREEN_VIDEO_ORIGIN = new URL(SCREEN_VIDEO_URL).origin;

export const SCREEN_VIDEO_CREDIT = "영상: Spring (c) Blender Foundation, cloud.blender.org/spring, CC BY 4.0";

/**
 * 재생 구간(초). 앞의 어두운 숲과 끝의 제목·자막을 건너뛴다.
 * - start: 처음 재생할 곳. 밝은 초원과 산이 나오는 후반부(5:40)
 * - loopTo: 여기에 닿으면 loopFrom으로 돌아간다. 6:58 뒤로는 제목 화면과 엔딩 자막
 * - loopFrom: 첫 산 풍경(0:23). 앞의 로고·검은 화면은 건너뛴다
 */
export const SCREEN_VIDEO_RANGE = { start: 340, loopFrom: 23, loopTo: 418 } as const;

/** 이 시간 안에 재생을 시작하지 못하면 테스트 패턴으로 대체한다. */
export const SCREEN_VIDEO_TIMEOUT_MS = 15000;
