"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CanvasTexture, SRGBColorSpace, VideoTexture, type Texture } from "three";
import { coverUv } from "@/lib/domain/texture-fit";
import { aspectLabel } from "@/lib/labels";
import { SCREEN_VIDEO_TIMEOUT_MS } from "./video-source";

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
    el.loop = true;
    el.playsInline = true;
    el.preload = "auto";
    el.src = url;
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
    const onError = () => settle("fallback");
    const onPlaying = () => settle("playing");

    el.addEventListener("loadeddata", onLoaded, { once: true });
    el.addEventListener("playing", onPlaying);
    el.addEventListener("error", onError);
    timer = window.setTimeout(() => settle("fallback"), SCREEN_VIDEO_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("error", onError);
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
