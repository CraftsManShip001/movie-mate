import Link from "next/link";
import { getTheaters } from "@/lib/data/registry";

export default function HomePage() {
  const theaters = getTheaters();
  return (
    <main className="page">
      <h1>극장</h1>
      <ul className="list">
        {theaters.map((theater) => (
          <li key={theater.id}>
            <Link href={`/theaters/${theater.id}`}>
              {theater.chain} {theater.branch}
            </Link>
            <p className="muted">{theater.address}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
