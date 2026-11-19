"use client";

import { useEffect, useMemo, useState } from "react";
import type { LiveShow } from "@/lib/live/types";

type LiveState = { key: string; show: LiveShow | null } | null;

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
    const controller = new AbortController();
    const query = new URLSearchParams({ theater: theaterId, auditorium: auditoriumId, date, seq });
    fetch(`/api/live/show?${query}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { show: null }))
      .then((data: { show: LiveShow | null }) => setState({ key, show: data.show }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ key, show: null });
      });
    return () => controller.abort();
  }, [key, theaterId, auditoriumId, date, seq]);
  const show = key && state?.key === key ? state.show : null;
  const sold = useMemo(() => (show?.booked ? new Set(show.booked) : undefined), [show]);
  return { loading: key != null && state?.key !== key, show, sold };
}
