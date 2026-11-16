/**
 * 스크린에 재생할 테스트 영상 URL.
 *
 * 영상: Big Buck Bunny (Blender Foundation, 2008)
 * 라이선스: Creative Commons Attribution 3.0 (CC BY 3.0)
 *   (c) copyright 2008, Blender Foundation / www.bigbuckbunny.org
 *   https://creativecommons.org/licenses/by/3.0/
 * 출처: Wikimedia Commons, File:Big_Buck_Bunny_4K.webm (720p VP9 변환본)
 *   https://commons.wikimedia.org/wiki/File:Big_Buck_Bunny_4K.webm
 *
 * - 파일을 저장소에 넣지 않고 공개 URL로 스트리밍한다.
 * - WebGL 텍스처로 쓰려면 CORS 허용이 필요하다. Wikimedia(upload.wikimedia.org)는 Access-Control-Allow-Origin: * 를 준다.
 * - WebM(VP9)을 재생하지 못하는 브라우저나 네트워크 오류일 때는 캔버스 테스트 패턴으로 대체된다.
 * - CC BY 이므로 화면 어딘가(지금은 시야 화면 하단)에 출처 표기를 유지해야 한다.
 */
export const SCREEN_VIDEO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.720p.vp9.webm";

export const SCREEN_VIDEO_CREDIT =
  "영상: Big Buck Bunny (c) Blender Foundation, www.bigbuckbunny.org, CC BY 3.0";

/** 이 시간 안에 재생을 시작하지 못하면 테스트 패턴으로 대체한다. */
export const SCREEN_VIDEO_TIMEOUT_MS = 15000;
