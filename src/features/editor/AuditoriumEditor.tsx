"use client";

import { useMemo, useState } from "react";
import { SeatMap } from "@/features/seat-map/SeatMap";
import type { Auditorium, Sourced, ValueSource } from "@/lib/domain/types";
import { validateAuditorium } from "@/lib/domain/validation";
import {
  createBlankAuditorium,
  DIMENSION_FIELDS,
  getDimension,
  resizeGrid,
  rowLabelAt,
  setDimension,
  syncEstimatedFlag,
  toggleCell,
} from "./editor-model";
import styles from "./AuditoriumEditor.module.css";

interface AuditoriumEditorProps {
  existing: Auditorium[];
}

/**
 * 로컬 전용 좌석 배치 에디터.
 * 결과는 JSON으로 내보내서 data/theaters/<theaterId>/auditoriums/<id>.json 에 저장하고 registry.ts에 등록한다.
 */
export function AuditoriumEditor({ existing }: AuditoriumEditorProps) {
  const [draft, setDraft] = useState<Auditorium>(() => createBlankAuditorium());
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);

  const output = useMemo(() => {
    try {
      return syncEstimatedFlag(draft);
    } catch {
      return draft;
    }
  }, [draft]);
  const errors = useMemo(() => {
    try {
      return validateAuditorium(output);
    } catch (error) {
      return [`형식이 맞지 않습니다: ${error instanceof Error ? error.message : String(error)}`];
    }
  }, [output]);
  const json = useMemo(() => JSON.stringify(output, null, 2) + "\n", [output]);
  const columnCount = draft.rows[0]?.cells.length ?? 0;

  const loadFrom = (value: string) => {
    if (value === "__blank") return setDraft(createBlankAuditorium());
    const found = existing.find((a) => `${a.theaterId}/${a.id}` === value);
    if (found) setDraft(structuredClone(found));
  };

  const importJson = () => {
    try {
      setDraft(JSON.parse(importText) as Auditorium);
      setImportError(null);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : String(error));
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${output.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateDimension = (group: string, key: string, patch: Partial<Sourced>) => {
    const current = getDimension(draft, group, key) ?? { value: 0, source: "estimated" as const };
    setDraft(setDimension(draft, group, key, { ...current, ...patch }));
  };

  return (
    <div className={styles.editor}>
      <section className={styles.section}>
        <h2>시작</h2>
        <select defaultValue="" onChange={(e) => loadFrom(e.target.value)}>
          <option value="" disabled>
            불러올 상영관 선택
          </option>
          <option value="__blank">빈 상영관</option>
          {existing.map((a) => (
            <option key={`${a.theaterId}/${a.id}`} value={`${a.theaterId}/${a.id}`}>
              {a.theaterId} / {a.name}
            </option>
          ))}
        </select>
        <textarea
          rows={3}
          placeholder="JSON 붙여넣기"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
        />
        <button type="button" onClick={importJson}>
          붙여넣은 JSON 불러오기
        </button>
        {importError ? <p className={styles.error}>{importError}</p> : null}
      </section>

      <section className={styles.section}>
        <h2>기본 정보</h2>
        <div className={styles.fields}>
          <TextField label="id (파일 이름)" value={draft.id} onChange={(id) => setDraft({ ...draft, id })} />
          <TextField
            label="theaterId"
            value={draft.theaterId}
            onChange={(theaterId) => setDraft({ ...draft, theaterId })}
          />
          <TextField label="이름" value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
          <TextField label="포맷" value={draft.format} onChange={(format) => setDraft({ ...draft, format })} />
          <label className={styles.inline}>
            <input
              type="checkbox"
              checked={draft.sample}
              onChange={(e) => setDraft({ ...draft, sample: e.target.checked })}
            />
            샘플 데이터
          </label>
        </div>
      </section>

      <section className={styles.section}>
        <h2>치수</h2>
        <div className={styles.dimensions}>
          {DIMENSION_FIELDS.map(({ group, key, label, unit }) => {
            const field = getDimension(draft, group, key);
            if (!field) return null;
            return (
              <div key={`${group}.${key}`} className={styles.dimension}>
                <span>{label}</span>
                <input
                  type="number"
                  step="any"
                  value={field.value}
                  onChange={(e) => updateDimension(group, key, { value: Number(e.target.value) })}
                />
                <span className="muted">{unit}</span>
                <SourceSelect value={field.source} onChange={(source) => updateDimension(group, key, { source })} />
              </div>
            );
          })}
        </div>
        <AisleList
          title="세로 통로 (몇 번째 칸 뒤, 0부터)"
          items={draft.layout.verticalAisles.map((a) => ({ at: a.afterColumn, size: a.width }))}
          onChange={(items) =>
            setDraft({
              ...draft,
              layout: { ...draft.layout, verticalAisles: items.map((i) => ({ afterColumn: i.at, width: i.size })) },
            })
          }
        />
        <AisleList
          title="가로 통로 (몇 번째 열 뒤, 0부터)"
          items={draft.layout.crossAisles.map((a) => ({ at: a.afterRow, size: a.depth }))}
          onChange={(items) =>
            setDraft({
              ...draft,
              layout: { ...draft.layout, crossAisles: items.map((i) => ({ afterRow: i.at, depth: i.size })) },
            })
          }
        />
      </section>

      <section className={styles.section}>
        <h2>좌석 행렬</h2>
        <div className={styles.fields}>
          <NumberField
            label="열 수"
            value={draft.rows.length}
            onChange={(n) => setDraft(resizeGrid(draft, n, columnCount))}
          />
          <NumberField
            label="칸 수"
            value={columnCount}
            onChange={(n) => setDraft(resizeGrid(draft, draft.rows.length, n))}
          />
          <button
            type="button"
            onClick={() => setDraft({ ...draft, rows: draft.rows.map((r, i) => ({ ...r, label: rowLabelAt(i) })) })}
          >
            열 이름 A부터 다시 매기기
          </button>
        </div>
        <p className="muted">칸을 누를 때마다 빈 칸 → 일반 → 휠체어 → 판매 안 함 순서로 바뀝니다. 위쪽이 스크린.</p>
        <div className={styles.gridScroller}>
          {draft.rows.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.gridRow}>
              <input
                className={styles.rowLabel}
                value={row.label}
                aria-label={`${rowIndex + 1}번째 열 이름`}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    rows: draft.rows.map((r, i) => (i === rowIndex ? { ...r, label: e.target.value } : r)),
                  })
                }
              />
              {[...row.cells].map((code, columnIndex) => (
                <button
                  key={columnIndex}
                  type="button"
                  className={styles.cell}
                  data-code={code}
                  aria-label={`${row.label} ${columnIndex}번 칸: ${code}`}
                  onClick={() => setDraft(toggleCell(draft, rowIndex, columnIndex))}
                >
                  {code === "." ? "" : code}
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>미리보기</h2>
        {errors.length === 0 ? <SeatMap auditorium={output} /> : <p className="muted">오류를 고치면 보입니다.</p>}
      </section>

      <section className={styles.section}>
        <h2>내보내기</h2>
        {errors.length > 0 ? (
          <ul className={styles.error}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : (
          <p className="muted">검증 통과. estimated 표시는 출처에 맞춰 자동으로 정해집니다.</p>
        )}
        <div className={styles.fields}>
          <button type="button" onClick={download}>
            JSON 다운로드
          </button>
          <button type="button" onClick={() => navigator.clipboard?.writeText(json)}>
            JSON 복사
          </button>
        </div>
        <textarea className={styles.output} readOnly rows={16} value={json} />
      </section>
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input type="number" min={1} max={60} value={value} onChange={(e) => onChange(Number(e.target.value) || 1)} />
    </label>
  );
}

function SourceSelect({ value, onChange }: { value: ValueSource; onChange: (v: ValueSource) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as ValueSource)}>
      <option value="measured">실측</option>
      <option value="estimated">추정</option>
    </select>
  );
}

interface AisleItem {
  at: number;
  size: Sourced;
}

function AisleList({
  title,
  items,
  onChange,
}: {
  title: string;
  items: AisleItem[];
  onChange: (items: AisleItem[]) => void;
}) {
  const update = (index: number, patch: Partial<AisleItem>) =>
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  return (
    <div className={styles.aisles}>
      <span>{title}</span>
      {items.map((item, index) => (
        <div key={index} className={styles.dimension}>
          <input type="number" value={item.at} onChange={(e) => update(index, { at: Number(e.target.value) })} />
          <input
            type="number"
            value={item.size.value}
            onChange={(e) => update(index, { size: { ...item.size, value: Number(e.target.value) } })}
          />
          <span className="muted">mm</span>
          <SourceSelect value={item.size.source} onChange={(source) => update(index, { size: { ...item.size, source } })} />
          <button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))}>
            삭제
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { at: 0, size: { value: 1000, source: "estimated" } }])}>
        통로 추가
      </button>
    </div>
  );
}
