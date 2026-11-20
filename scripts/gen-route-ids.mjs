// 주소 검사(proxy.ts)용 극장·상영관 id 목록을 만든다. 데이터를 바꾼 뒤 `node scripts/gen-route-ids.mjs`
// registry.test.ts 가 이 목록과 실제 데이터가 같은지 확인한다.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "data", "theaters");
const ids = {};
for (const dir of readdirSync(root).sort()) {
  const theaterFile = join(root, dir, "theater.json");
  if (!existsSync(theaterFile)) continue;
  const theater = JSON.parse(readFileSync(theaterFile, "utf8"));
  ids[theater.id] = [...theater.auditoriumIds].sort();
}
const body = Object.entries(ids)
  .map(([t, halls]) => `  ${JSON.stringify(t)}: [${halls.map((h) => JSON.stringify(h)).join(", ")}],`)
  .join("\n");
writeFileSync(
  join(import.meta.dirname, "..", "src", "lib", "data", "route-ids.generated.ts"),
  `// 자동 생성: scripts/gen-route-ids.mjs. 손으로 고치지 않는다.\n/** 극장 id → 상영관 id 목록. 없는 주소를 404로 돌려보낼 때(proxy.ts) 쓴다. */\nexport const ROUTE_IDS: Record<string, readonly string[]> = {\n${body}\n};\n`,
);
console.log(Object.keys(ids).length, "theaters");
