/**
 * TMDB(The Movie Database)에서 한국 현재 상영작을 가져온다.
 *
 * - 키: 환경 변수 TMDB_API_KEY. v3 API 키(32자)나 v4 읽기 토큰(eyJ...) 둘 다 받는다.
 * - 키가 없거나 요청이 실패하면 null을 돌려주고, 부르는 쪽은 data/movies 의 샘플 영화를 쓴다.
 * - 표시 조건(TMDB 약관): 영화 정보를 보여 주는 화면에 TMDB 출처를 남긴다.
 *   "This product uses the TMDB API but is not endorsed or certified by TMDB."
 */
import type { Movie } from "@/lib/showtimes/types";

const API = "https://api.themoviedb.org/3";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export interface TmdbListItem {
  id: number;
  popularity: number;
  poster_path: string | null;
}

export interface TmdbDetails {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  release_date: string;
  runtime: number | null;
  poster_path: string | null;
  release_dates?: {
    results: { iso_3166_1: string; release_dates: { certification: string; release_date: string }[] }[];
  };
  translations?: {
    translations: { iso_639_1: string; data: { title?: string } }[];
  };
}

/** 영등위 등급 코드 → 화면 표시 */
const KR_RATING: Record<string, string> = {
  ALL: "전체 관람가",
  "12": "12세 이상",
  "15": "15세 이상",
  "18": "청소년 관람불가",
  "19": "청소년 관람불가",
};

/** 포스터가 있는 영화 중 인기순 1위 */
export function pickMostPopular(items: TmdbListItem[]): TmdbListItem | undefined {
  return [...items].filter((m) => m.poster_path).sort((a, b) => b.popularity - a.popularity)[0];
}

/** TMDB 상세 정보 → 앱의 Movie. runtime 이 없으면 fallbackRuntime 을 쓴다. */
export function toMovie(details: TmdbDetails, fallbackRuntime: number): Movie {
  const kr = details.release_dates?.results.find((r) => r.iso_3166_1 === "KR")?.release_dates ?? [];
  const certification = kr.map((d) => d.certification.trim()).find(Boolean) ?? "";
  const releaseDate = kr.map((d) => d.release_date).find(Boolean) ?? details.release_date;
  const english =
    details.original_language === "en"
      ? details.original_title
      : details.translations?.translations.find((t) => t.iso_639_1 === "en")?.data.title || details.original_title;

  return {
    schemaVersion: 1,
    id: `tmdb-${details.id}`,
    sample: false,
    source: "tmdb",
    notes: `TMDB 영화 ${details.id}`,
    title: details.title,
    titleEn: english.toUpperCase(),
    year: Number(releaseDate.slice(0, 4)) || new Date().getFullYear(),
    rating: KR_RATING[certification] ?? "등급 미정",
    runtimeMin: details.runtime && details.runtime > 0 ? details.runtime : fallbackRuntime,
    posterUrl: details.poster_path ? `${POSTER_BASE}${details.poster_path}` : "",
  };
}

function request(path: string, params: Record<string, string>): { url: string; init: RequestInit } | null {
  const key = process.env.TMDB_API_KEY?.trim();
  if (!key) return null;
  const query = new URLSearchParams(params);
  const isToken = key.startsWith("eyJ");
  if (!isToken) query.set("api_key", key);
  return {
    url: `${API}${path}?${query}`,
    init: { headers: { accept: "application/json", ...(isToken ? { authorization: `Bearer ${key}` } : {}) } },
  };
}

async function getJson<T>(path: string, params: Record<string, string>): Promise<T | null> {
  const req = request(path, params);
  if (!req) return null;
  try {
    const res = await fetch(req.url, { ...req.init, signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      console.warn(`TMDB ${path} 요청 실패: ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`TMDB ${path} 요청 실패`, error);
    return null;
  }
}

/** 한국 현재 상영작 중 가장 인기 있는 영화. 키가 없거나 실패하면 null. */
export async function fetchNowPlayingMovie(fallbackRuntime: number): Promise<Movie | null> {
  const list = await getJson<{ results: TmdbListItem[] }>("/movie/now_playing", {
    language: "ko-KR",
    region: "KR",
    page: "1",
  });
  const top = list ? pickMostPopular(list.results) : undefined;
  if (!top) return null;
  const details = await getJson<TmdbDetails>(`/movie/${top.id}`, {
    language: "ko-KR",
    append_to_response: "release_dates,translations",
  });
  return details ? toMovie(details, fallbackRuntime) : null;
}
