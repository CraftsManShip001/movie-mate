import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // 개발 서버를 Cloudflare 임시 터널(trycloudflare.com)로 열어 휴대폰에서 볼 때. 개발 모드에만 쓰인다
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
