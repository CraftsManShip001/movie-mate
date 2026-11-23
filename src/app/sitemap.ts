import type { MetadataRoute } from "next";
import { getAllAuditoriums, getListedTheaters } from "@/lib/data/registry";
import { SITE_URL } from "@/lib/site";

/** 처음 화면, 극장, 상영관(좌석 배치도)까지 올린다. 좌석 하나하나는 상영관 페이지가 대표한다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const theaters = getListedTheaters();
  const ids = new Set(theaters.map((t) => t.id));
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...theaters.map((t) => ({ url: `${SITE_URL}/theaters/${t.id}`, changeFrequency: "daily" as const, priority: 0.8 })),
    ...getAllAuditoriums()
      .filter((a) => ids.has(a.theaterId))
      .map((a) => ({
      url: `${SITE_URL}/theaters/${a.theaterId}/${a.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
