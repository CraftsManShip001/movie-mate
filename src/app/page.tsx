import { TheaterPicker, type ChainOption } from "@/features/theater-picker/TheaterPicker";
import { getAuditoriums, getListedTheaters } from "@/lib/data/registry";
import { CHAINS, formatLabel } from "@/lib/labels";
import { REGIONS, regionOf } from "@/lib/regions";

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

  return <TheaterPicker chains={chains} />;
}
