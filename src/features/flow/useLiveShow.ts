"use client";

import { useEffect, useMemo, useState } from "react";
import type { LiveShow } from "@/lib/live/types";

type LiveState = { key: string; show: LiveShow | null } | null;

/** 같은 회차를 여러 곳(좌석표·미니 좌석표)이나 다시 그릴 때 함께 쓴다. 서버 캐시와 같은 1분 동안만 둔다. */
const RECENT_MS = 60_000;
const recent = new Map<string, { at: number; promise: Promise<LiveShow | null> }>();

function fetchLiveShow(key: string, query: URLSearchParams): Promise<LiveShow | null> {
  const now = Date.now();
  const hit = recent.get(key);
  if (hit && now - hit.at < RECENT_MS) return hit.promise;
  const promise = fetch(`/api/live/show?${query}`)
    .then((response) => (response.ok ? response.json() : { show: null }))
    .then((data: { show: LiveShow | null }) => data.show)
    .catch(() => {
      recent.delete(key);
      return null;
    });
  recent.set(key, { at: now, promise });
  return promise;
}

/**
 * 고른 회차의 영화와 팔린 좌석을 서버(/api/live/show)에 묻는다. 3번 좌석표와 5번 미니 좌석표가 쓴다.
 * 서버가 팔린 좌석을 1분 동안 다시 쓰므로, 같은 회차를 여러 번 열어도 영화관 서버에 다시 묻지 않는다.
 */
export function useLiveShow(
  theaterId: string,
  auditoriumId: string,
  date: string | null,
  seq: string | null | undefined,
  enabled: boolean,
) {
  const key = enabled && date && seq != null ? `${theaterId}/${auditoriumId}/${date}/${seq}` : null;
  const [state, setState] = useState<LiveState>(null);
  useEffect(() => {
    if (!key || !date || seq == null) return;
    let alive = true;
    const query = new URLSearchParams({ theater: theaterId, auditorium: auditoriumId, date, seq });
    fetchLiveShow(key, query).then((show) => {
      if (alive) setState({ key, show });
    });
    return () => {
      alive = false;
    };
  }, [key, theaterId, auditoriumId, date, seq]);
  const show = key && state?.key === key ? state.show : null;
  const sold = useMemo(() => (show?.booked ? new Set(show.booked) : undefined), [show]);
  return { loading: key != null && state?.key !== key, show, sold };
}
