import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuditoriumEditor } from "@/features/editor/AuditoriumEditor";
import { getAllAuditoriums } from "@/lib/data/registry";

export const metadata: Metadata = {
  title: "좌석 에디터 · movie mate",
  robots: { index: false, follow: false },
};

/** 개발 모드(next dev)에서만 열리는 좌석 배치 에디터. 배포본에서는 404. */
export default function EditorPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <main className="page">
      <h1>좌석 에디터</h1>
      <p className="muted">
        로컬 전용. 내보낸 JSON을 data/theaters/&lt;theaterId&gt;/auditoriums/ 에 저장하고 src/lib/data/registry.ts
        에 등록하세요.
      </p>
      <AuditoriumEditor existing={getAllAuditoriums()} />
    </main>
  );
}
