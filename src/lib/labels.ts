import type { AuditoriumFormat } from "@/lib/domain/types";

const FORMAT_LABELS: Record<string, string> = {
  standard: "일반",
  imax: "IMAX",
  "4dx": "4DX",
  screenx: "ScreenX",
  "dolby-cinema": "Dolby Cinema",
  premium: "프리미엄",
};

export function formatLabel(format: AuditoriumFormat): string {
  return FORMAT_LABELS[format] ?? format;
}

export function aspectLabel(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}
