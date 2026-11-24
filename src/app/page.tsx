import { TheaterPicker, type ChainOption } from "@/features/theater-picker/TheaterPicker";
import { getAuditoriums, getListedTheaters } from "@/lib/data/registry";
import { CHAINS, formatLabel } from "@/lib/labels";
import { REGIONS, regionOf } from "@/lib/regions";
import { SITE_ALTERNATE_NAMES, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/** 1 · 영화관. 시야 데이터(상영관)가 하나라도 있는 극장만 "시야를 볼 수 있는 극장"으로 보여 준다. */
export default function HomePage() {
  const theaters = getListedTheaters();
  const chains: ChainOption[] = CHAINS.map((chain) => ({
    name: chain,
    theaters: theaters
      .filter((t) => t.chain === chain)
      .map((t) => ({ theater: t, auditoriums: getAuditoriums(t.id) }))
      .filter(({ auditoriums }) => auditoriums.length > 0)
      .map(({ theater, auditoriums }) => ({
        id: theater.id,
        name: `${theater.chain} ${theater.branch}`,
        region: regionOf(theater.address) ?? REGIONS[0],
        formats: [...new Set(auditoriums.map((a) => formatLabel(a.format)))].join(" · "),
      })),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        // 고정 문자열뿐이지만 안내대로 < 를 이스케이프한다
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD).replace(/</g, "\\u003c") }}
      />
      <TheaterPicker chains={chains} />
    </>
  );
}

/** 검색 결과에 "무비메이트"를 사이트 이름으로 보여 주도록 알리는 구조화 데이터(구글 사이트 이름 안내를 따름) */
const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      inLanguage: "ko-KR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/apple-icon.png`,
    },
  ],
};
