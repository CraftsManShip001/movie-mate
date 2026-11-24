import { Landing } from "@/features/landing/Landing";
import { SITE_ALTERNATE_NAMES, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/** 랜딩. 극장 고르기는 /theaters 로 옮겼다. */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // 고정 문자열뿐이지만 안내대로 < 를 이스케이프한다
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD).replace(/</g, "\\u003c") }}
      />
      <Landing />
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
