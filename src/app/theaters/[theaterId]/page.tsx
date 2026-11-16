import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuditoriums, getTheater, getTheaters } from "@/lib/data/registry";
import { aspectLabel, formatLabel } from "@/lib/labels";

export function generateStaticParams() {
  return getTheaters().map((theater) => ({ theaterId: theater.id }));
}

export default async function TheaterPage({ params }: PageProps<"/theaters/[theaterId]">) {
  const { theaterId } = await params;
  const theater = getTheater(theaterId);
  if (!theater) notFound();
  const auditoriums = getAuditoriums(theater.id);

  return (
    <main className="page">
      <Link href="/">극장 목록</Link>
      <h1>
        {theater.chain} {theater.branch}
      </h1>
      <p className="muted">{theater.address}</p>
      <h2>상영관</h2>
      <ul className="list">
        {auditoriums.map((auditorium) => (
          <li key={auditorium.id}>
            <Link href={`/theaters/${theater.id}/${auditorium.id}`}>{auditorium.name}</Link>
            <p className="muted">
              {formatLabel(auditorium.format)} · 스크린 {aspectLabel(auditorium.screen.aspectRatio.value)}
              {auditorium.sample ? " · 샘플 데이터" : ""}
              {auditorium.estimated ? " · 일부 추정값" : ""}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
