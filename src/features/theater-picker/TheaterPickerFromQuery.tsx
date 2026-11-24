"use client";

import { useSearchParams } from "next/navigation";
import { TheaterPicker, type ChainOption } from "./TheaterPicker";

/** 주소의 ?title=(랜딩에서 고른 영화)을 읽어 극장 고르기에 넘긴다. 쓸 수 없는 값은 버린다. */
export function TheaterPickerFromQuery({ chains }: { chains: ChainOption[] }) {
  const raw = useSearchParams().get("title")?.trim() ?? "";
  const movieTitle = raw.length > 0 && raw.length <= 80 ? raw : null;
  // 영화가 바뀌면 브랜드 첫 선택도 다시 정하도록 새로 그린다
  return <TheaterPicker key={movieTitle ?? ""} chains={chains} movieTitle={movieTitle} />;
}
