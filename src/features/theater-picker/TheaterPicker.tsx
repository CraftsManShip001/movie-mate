"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronRight, Frame, FrameHeader, frameStyles } from "@/features/flow/Frame";
import { track } from "@/lib/analytics";
import { withSubject } from "@/lib/format";
import { REGIONS, type Region } from "@/lib/regions";
import styles from "./TheaterPicker.module.css";

const NOTICE =
  "무비메이트는 비공식·비상업 서비스예요. 시간표와 좌석은 각 영화관 예매 화면을 기준으로 보여 주고, 예매는 각 영화관에서 해요.";

export interface ChainOption {
  name: string;
  theaters: { id: string; name: string; region: Region; formats: string }[];
}

export function TheaterPicker({ chains }: { chains: ChainOption[] }) {
  const firstWithTheaters = chains.find((c) => c.theaters.length > 0) ?? chains[0];
  const [chainName, setChainName] = useState(firstWithTheaters.name);
  const chain = chains.find((c) => c.name === chainName) ?? firstWithTheaters;
  // 극장이 있는 지역만, 정해진 순서로
  const regions = REGIONS.map((name) => ({ name, count: chain.theaters.filter((t) => t.region === name).length })).filter(
    (r) => r.count > 0,
  );
  const [regionName, setRegionName] = useState<Region | null>(null);
  const region = regions.find((r) => r.name === regionName) ?? regions[0];
  const theaters = region ? chain.theaters.filter((t) => t.region === region.name) : chain.theaters;
  const [picked, setPicked] = useState<string | null>(null);
  const selected = theaters.find((t) => t.id === picked) ?? theaters[0];

  // 브랜드·지역을 바꾸면 자동으로 고른 첫 극장이 보이도록 목록을 맨 위로 올린다
  const rowsRef = useRef<HTMLUListElement>(null);
  const scrollToTop = () => rowsRef.current?.scrollTo({ top: 0 });

  const pickChain = (name: string) => {
    setChainName(name);
    track("select_chain", { chain: name });
    setRegionName(null);
    setPicked(null);
    scrollToTop();
  };

  const pickRegion = (name: Region) => {
    setRegionName(name);
    setPicked(null);
    scrollToTop();
  };

  return (
    <Frame
      fit
      header={<FrameHeader title="무비메이트" logo />}
      bottom={
        selected ? (
          <>
            <div className={frameStyles.summary}>
              <span className={frameStyles.summaryLabel}>선택한 극장</span>
              <span className={frameStyles.summaryValue}>{selected.name}</span>
            </div>
            <div className={frameStyles.actions}>
              <Link
                href={`/theaters/${selected.id}`}
                className={frameStyles.cta}
                onClick={() => track("select_theater", { theater_id: selected.id })}
              >
                이 극장으로
              </Link>
            </div>
          </>
        ) : null
      }
    >
      <div className={styles.layout}>
        <div className={styles.side}>
          <h2 className={styles.title}>
            어느 영화관에서
            <br />
            보세요?
          </h2>
          <div className={styles.chains} role="group" aria-label="영화관 브랜드">
            {chains.map((c) => (
              <button
                key={c.name}
                type="button"
                className={styles.chain}
                aria-pressed={c.name === chain.name}
                onClick={() => pickChain(c.name)}
              >
                <span className={styles.chainName}>{c.name}</span>
                <span className={styles.chainCount}>{c.theaters.length}곳</span>
              </button>
            ))}
          </div>
          <p className={styles.notice}>{NOTICE}</p>
        </div>

        {chain.theaters.length > 0 ? (
          <section className={styles.list} aria-labelledby="theater-list-title">
            <div className={styles.listHead} id="theater-list-title">
              <span className={styles.listChain}>{chain.name}</span>
              <span className={styles.listCaption}>시야를 볼 수 있는 극장</span>
            </div>
            {regions.length > 1 ? (
              <div className={styles.regions} role="group" aria-label="지역">
                {regions.map((r) => (
                  <button
                    key={r.name}
                    type="button"
                    className={styles.region}
                    aria-pressed={r.name === region?.name}
                    onClick={() => pickRegion(r.name)}
                  >
                    {r.name}
                    <span className={styles.regionCount}>{r.count}</span>
                  </button>
                ))}
              </div>
            ) : null}
            <ul ref={rowsRef} className={styles.rows}>
              {theaters.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={styles.row}
                    aria-pressed={t.id === selected?.id}
                    onClick={() => setPicked(t.id)}
                  >
                    <span className={styles.rowName}>{t.name}</span>
                    <span className={styles.rowMeta}>
                      <span>{t.formats}</span>
                      <ChevronRight color="var(--color-sub)" />
                    </span>
                  </button>
                </li>
              ))}
              {/* 휴대폰: 안내는 목록 맨 끝에 둔다(위에 두면 키 작은 화면에서 목록이 한 줄만 보인다) */}
              <li className={styles.noticeNarrow}>{NOTICE}</li>
            </ul>
          </section>
        ) : (
          <section className={`${styles.list} ${styles.listEmpty}`}>
            <div className={frameStyles.empty}>
              <p className={frameStyles.emptyTitle}>아직 시야를 볼 수 있는 {withSubject(chain.name)} 없어요</p>
              <p className={frameStyles.emptyBody}>준비되는 대로 여기에 보여 드릴게요</p>
              {firstWithTheaters.theaters.length > 0 ? (
                <div className={frameStyles.emptyActions}>
                  <button type="button" className={frameStyles.secondary} onClick={() => pickChain(firstWithTheaters.name)}>
                    {firstWithTheaters.name} 극장 보기
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        )}
      </div>
    </Frame>
  );
}
