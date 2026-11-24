"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CanvasTexture, SRGBColorSpace, VideoTexture, type Texture } from "three";
import { coverUv } from "@/lib/domain/texture-fit";
import { aspectLabel } from "@/lib/labels";
import { pickScreenVideoUrl, SCREEN_VIDEO_RANGE, SCREEN_VIDEO_TIMEOUT_MS } from "./video-source";

/** 영상 불러오기에 실패하면 다시 시도하는 횟수 */
const VIDEO_RETRIES = 2;

export type ScreenVideoStatus = "loading" | "playing" | "blocked" | "fallback";

/**
 * 스크린 비율 그대로 그린 테스트 패턴. 영상을 못 쓸 때와 영상 로딩 중에 보인다.
 * 브라우저에서만 호출해야 한다(document 사용).
 */
export function createTestPatternTexture(aspect: number): CanvasTexture {
  const width = 1024;
  const height = Math.max(1, Math.round(width / aspect));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    // 색 막대 (SMPTE 순서)
    const bars = ["#c0c0c0", "#c0c000", "#00c0c0", "#00c000", "#c000c0", "#c00000", "#0000c0"];
    const barHeight = height * 0.6;
    bars.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect((i * width) / bars.length, 0, width / bars.length + 1, barHeight);
    });

    // 격자: 화면 왜곡·잘림 확인용
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    const step = width / 16;
    for (let x = 0; x <= width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = height; y >= 0; y -= step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // 가운데 원: 비율이 맞으면 정원으로 보인다
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, height * 0.4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = `${Math.round(height * 0.07)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(`TEST PATTERN ${aspectLabel(aspect)}`, width / 2, height * 0.85);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/**
 * 스크린 텍스처. 영상을 재생할 수 있으면 VideoTexture(스크린 비율에 꽉 채워 자름), 아니면 테스트 패턴.
 * playRequest 값을 바꾸면 재생을 다시 시도한다(자동재생이 막혔을 때 버튼 클릭 등 사용자 동작에서 호출).
 */
export function useScreenTexture(
  url: string,
  screenAspect: number,
  playRequest: number,
): { texture: Texture; status: ScreenVideoStatus } {
  const pattern = useMemo(() => createTestPatternTexture(screenAspect), [screenAspect]);
  const [video, setVideo] = useState<{ texture: VideoTexture | null; status: ScreenVideoStatus }>({
    texture: null,
    status: "loading",
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => () => pattern.dispose(), [pattern]);

  useEffect(() => {
    const el = document.createElement("video");
    el.crossOrigin = "anonymous";
    el.muted = true;
    // 반복은 SCREEN_VIDEO_RANGE 구간으로 직접 한다(끝의 자막을 건너뛰려고)
    el.loop = false;
    el.playsInline = true;
    el.preload = "auto";
    el.src = pickScreenVideoUrl(el, url);
    videoRef.current = el;

    let settled = false;
    let texture: VideoTexture | null = null;
    let timer = 0;

    const settle = (status: ScreenVideoStatus) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      if (status === "playing") {
        texture = new VideoTexture(el);
        texture.colorSpace = SRGBColorSpace;
        const fit = coverUv(el.videoWidth / el.videoHeight, screenAspect);
        texture.repeat.set(fit.repeatX, fit.repeatY);
        texture.offset.set(fit.offsetX, fit.offsetY);
        setVideo({ texture, status });
      } else {
        setVideo({ texture: null, status });
      }
    };

    const onLoaded = () => {
      el.play().then(
        () => settle("playing"),
        () => {
          // 자동재생 차단. settle 하지 않고 상태만 알려서 사용자 동작으로 다시 시도할 수 있게 한다.
          window.clearTimeout(timer);
          setVideo({ texture: null, status: "blocked" });
        },
      );
    };
    // 영상 서버(Wikimedia)가 잠깐 503 을 줄 때가 있어 두 번까지 다시 받아 본다
    let retries = 0;
    let retryTimer = 0;
    const onError = () => {
      if (settled) return;
      if (retries < VIDEO_RETRIES) {
        retries += 1;
        retryTimer = window.setTimeout(() => el.load(), 1500 * retries);
        return;
      }
      settle("fallback");
    };
    const onPlaying = () => settle("playing");
    const { start, loopFrom, loopTo } = SCREEN_VIDEO_RANGE;
    const onMetadata = () => {
      if (el.duration > start) el.currentTime = start;
    };
    const restart = () => {
      el.currentTime = loopFrom;
      el.play().catch(() => undefined);
    };
    const onTimeUpdate = () => {
      if (el.currentTime >= Math.min(loopTo, el.duration || loopTo)) restart();
    };

    el.addEventListener("loadedmetadata", onMetadata, { once: true });
    el.addEventListener("loadeddata", onLoaded, { once: true });
    el.addEventListener("playing", onPlaying);
    el.addEventListener("error", onError);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", restart);
    timer = window.setTimeout(() => settle("fallback"), SCREEN_VIDEO_TIMEOUT_MS);
    // 아이폰 Safari는 preload를 무시해 play()를 부르기 전까지 받지 않으므로(loadeddata가 오지 않음) 바로 재생을 건다
    onLoaded();

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(retryTimer);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("error", onError);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", restart);
      el.pause();
      el.removeAttribute("src");
      el.load();
      texture?.dispose();
      videoRef.current = null;
    };
  }, [url, screenAspect]);

  // 사용자 동작으로 재생 재시도
  useEffect(() => {
    if (playRequest > 0) videoRef.current?.play().catch(() => undefined);
  }, [playRequest]);

  return { texture: video.texture ?? pattern, status: video.status };
}
