// 무비메이트 홍보 영상 · 세로(릴스)판 촬영 스크립트. 휴대폰 비율 화면(500×1084, 1080×2342)으로 찍는다.
// 쓰는 법은 record.mjs 와 같다. 결과: design/promo/footage/p-<장면>/
// (아래 도구는 record.mjs 에서 옮겨 왔다)
// (promo-film 스킬의 record.ts를 옮긴 것).
// 쓰는 법: 서버(next start -p 3100)를 켠 뒤
//   PLAYWRIGHT_FROM=<playwright 가 깔린 폴더> node design/promo/record.mjs [장면,장면]
// 결과: design/promo/footage/<장면>/raw/*.jpg, list.txt, marks.json → node <스킬>/scripts/footage.mjs design/promo/footage <장면…>
import { mkdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(join(process.env.PLAYWRIGHT_FROM ?? process.cwd(), "noop.js"));
const { chromium } = require("playwright");

const BASE = process.env.BASE ?? "http://localhost:3100";
const OUT = decodeURIComponent(new URL("./footage/", import.meta.url).pathname);
const ONLY = process.argv[2]?.split(",");

const POINTER = () => {
  const draw = () => {
    if (document.getElementById("__pointer") || !document.body) return;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="__pointer" style="position:fixed;left:-60px;top:-60px;z-index:2147483647;pointer-events:none;width:34px;height:34px"><svg width="34" height="34" viewBox="0 0 24 24"><path d="M5 3l14 8-6 1.6L10 19z" fill="#151515" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg></div><div id="__ripple" style="position:fixed;z-index:2147483646;pointer-events:none;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;background:rgba(127,127,127,.35);opacity:0"></div>`,
    );
  };
  addEventListener("mousemove", (e) => {
    draw();
    const p = document.getElementById("__pointer");
    p.style.left = e.clientX - 5 + "px";
    p.style.top = e.clientY - 3 + "px";
  }, true);
  addEventListener("mousedown", (e) => {
    draw();
    const r = document.getElementById("__ripple");
    r.style.left = e.clientX + "px";
    r.style.top = e.clientY + "px";
    r.animate([{ opacity: 1, transform: "scale(.4)" }, { opacity: 0, transform: "scale(1.6)" }], { duration: 450, easing: "ease-out" });
  }, true);
};

let cursor = { x: 1500, y: 900 };
async function glide(page, x, y, ms = 700) {
  const from = { ...cursor };
  const steps = Math.max(8, Math.round(ms / 16));
  for (let i = 1; i <= steps; i += 1) {
    const k = 1 - Math.pow(1 - i / steps, 3);
    await page.mouse.move(from.x + (x - from.x) * k, from.y + (y - from.y) * k - Math.sin(k * Math.PI) * 16);
    await page.waitForTimeout(ms / steps);
  }
  cursor = { x, y };
}
async function glideTo(page, locator, ms = 700) {
  const b = await locator.boundingBox();
  await glide(page, b.x + b.width / 2, b.y + b.height / 2, ms);
}
async function click(page) {
  await page.mouse.down();
  await page.mouse.up();
}
/** 누른 채 천천히 끈다. ease: 처음과 끝이 부드럽게 */
async function drag(page, to, ms = 1500) {
  const from = { ...cursor };
  await page.mouse.down();
  const steps = Math.round(ms / 16);
  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps, k = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await page.mouse.move(from.x + (to.x - from.x) * k, from.y + (to.y - from.y) * k);
    await page.waitForTimeout(16);
  }
  await page.mouse.up();
  cursor = { ...to };
}
const viewReady = (page) =>
  page.waitForFunction(() => document.querySelector("canvas") && !document.body.innerText.includes("시야를 그리고 있어요"), null, { timeout: 30000 });

/** 좌석표에서 (x, y)에 가장 가까운 좌석 버튼 */
async function seatNear(page, x, y, scope = "body") {
  const label = await page.evaluate(([x, y, scope]) => {
    let best = null, d = Infinity;
    for (const b of document.querySelector(scope).querySelectorAll("button[aria-label*='열']")) {
      if (b.disabled || b.getAttribute("aria-label").includes("팔린 자리")) continue;
      const r = b.getBoundingClientRect();
      const dd = Math.hypot(r.x + r.width / 2 - x, r.y + r.height / 2 - y);
      if (dd < d) { d = dd; best = b.getAttribute("aria-label"); }
    }
    return best;
  }, [x, y, scope]);
  return page.locator(`${scope} button[aria-label="${label}"]`).first();
}

async function film(page, name, act) {
  if (ONLY && !ONLY.includes(name)) return;
  const dir = `${OUT}${name}`;
  await rm(dir, { recursive: true, force: true });
  await mkdir(`${dir}/raw`, { recursive: true });
  const cdp = await page.context().newCDPSession(page);
  const frames = [];
  cdp.on("Page.screencastFrame", (f) => {
    frames.push({ t: f.metadata.timestamp ?? Date.now() / 1000, data: f.data });
    void cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  });
  const marks = [];
  const mark = async (label, locator, pad = 10) => {
    const b = await locator.boundingBox();
    marks.push({ name: label, t: Date.now() / 1000, x: b.x - pad, y: b.y - pad, w: b.width + pad * 2, h: b.height + pad * 2 });
  };
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1080, maxHeight: 2400 });
  await page.waitForTimeout(400);
  await act(mark);
  await page.waitForTimeout(500);
  await cdp.send("Page.stopScreencast");
  await cdp.detach();
  const t0 = frames[0].t;
  const lines = [];
  for (let i = 0; i < frames.length; i += 1) {
    const file = `${String(i).padStart(5, "0")}.jpg`;
    await writeFile(`${dir}/raw/${file}`, Buffer.from(frames[i].data, "base64"));
    const next = frames[i + 1]?.t ?? frames[i].t + 0.5;
    lines.push(`file 'raw/${file}'`, `duration ${Math.max(0.001, next - frames[i].t).toFixed(4)}`);
  }
  lines.push(`file 'raw/${String(frames.length - 1).padStart(5, "0")}.jpg'`);
  await writeFile(`${dir}/list.txt`, lines.join("\n"));
  await writeFile(`${dir}/marks.json`, JSON.stringify(marks.map((m) => ({ ...m, t: Math.round((m.t - t0) * 100) / 100 })), null, 2));
  console.log(name, frames.length, "frames", (frames.at(-1).t - t0).toFixed(1) + "s");
}

/** 영화 같은 장면: 3D 화면에서 앱의 글자·버튼·커서를 숨긴다(영상에 넣는 글자와 겹치지 않게). 캔버스가 있을 때만 적용된다. */
async function cine(page) {
  await page.evaluate(() => {
    if (document.getElementById("__cine")) return;
    const style = document.createElement("style");
    style.id = "__cine";
    style.textContent = "body:has(canvas) *:not(:has(canvas)):not(canvas) { visibility: hidden !important; }";
    document.head.appendChild(style);
  });
}

/** 3D 화면에서 천천히 둘러보기: 왼쪽 → 오른쪽 → 가운데 */
async function lookAround(page, amount = 360) {
  await glide(page, 960, 520, 500);
  await drag(page, { x: 960 + amount, y: 530 }, 1600);
  await page.waitForTimeout(300);
  await drag(page, { x: 960 - amount, y: 515 }, 2400);
  await page.waitForTimeout(300);
  await drag(page, { x: 960, y: 520 }, 1500);
}

// 화면 녹화(스크린캐스트)는 Playwright의 deviceScaleFactor를 무시하고 1배로 찍는다.
// 그래서 Chrome 자체 배율(--force-device-scale-factor)을 쓰고, 창 최소 폭(500) 때문에 500×1084(휴대폰 비율)로 연다 → 1080×2342
const W = 500, H = 1084;
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required", `--force-device-scale-factor=${1080 / W}`, `--window-size=${W},${H + 87}`],
});
const context = await browser.newContext({ viewport: null });
await context.addInitScript(POINTER);
const page = await context.newPage();
const tap = async (locator, ms = 650) => {
  await locator.scrollIntoViewIfNeeded();
  await glideTo(page, locator, ms);
  await page.waitForTimeout(180);
  await click(page);
};
async function lookPhone(amount = 70) {
  await glide(page, W / 2, H * 0.42, 400);
  await drag(page, { x: W / 2 + amount, y: H * 0.42 }, 1500);
  await page.waitForTimeout(250);
  await drag(page, { x: W / 2 - amount, y: H * 0.42 + 4 }, 2200);
  await page.waitForTimeout(250);
  await drag(page, { x: W / 2, y: H * 0.42 }, 1400);
}

// 스크린 영상을 미리 받아 둔다
await page.goto(`${BASE}/theaters/cgv-yongsan-ipark-mall/hall-2/seats/H8`);
await viewReady(page).catch(() => {});
await page.waitForTimeout(12000);
await page.evaluate(() => localStorage.removeItem("movie-mate:stature-cm"));

// 1) 흐름: 홈 → CGV 서울 용산아이파크몰 → IMAX관 → 좌석 → 시야
if (!ONLY || ONLY.includes("p-flow")) {
  await page.goto(`${BASE}/`);
  await page.waitForTimeout(1500);
  await page.mouse.move(W * 0.75, H * 0.85);
  cursor = { x: W * 0.75, y: H * 0.85 };
  await film(page, "p-flow", async (mark) => {
    await page.waitForTimeout(500);
    await tap(page.getByRole("button", { name: /^CGV \d+곳/ }));
    await page.waitForTimeout(400);
    await tap(page.getByRole("button", { name: /^서울/ }).first());
    await page.waitForTimeout(400);
    await tap(page.getByRole("button", { name: /^CGV 용산아이파크몰/ }).first(), 800);
    await page.waitForTimeout(600);
    await tap(page.getByRole("link", { name: "이 극장으로" }).or(page.getByRole("button", { name: "이 극장으로" })).first());
    await page.waitForURL(/cgv-yongsan-ipark-mall/);
    await page.waitForTimeout(1100);
    await tap(page.getByRole("button", { name: /^IMAX관/ }).first(), 750);
    await page.waitForTimeout(500);
    await tap(page.getByRole("link", { name: "이 관 좌석 보기" }).or(page.getByRole("button", { name: "이 관 좌석 보기" })).first());
    await page.waitForURL(/\/imax/);
    await page.waitForTimeout(1300);
    const row = page.locator("button[aria-label^='N열']");
    const seat = row.nth(Math.floor((await row.count()) / 2));
    await tap(seat, 900);
    await mark("seat", seat, 20);
    await page.waitForTimeout(1400);
    await cine(page);
    await tap(page.getByRole("link", { name: "이 자리에서 보기" }).or(page.getByRole("button", { name: "이 자리에서 보기" })).first());
    await viewReady(page);
    await page.waitForTimeout(2500);
    await lookPhone(60);
    await page.waitForTimeout(800);
  });
}

// 2) 키: 일반관(2관) 가운데 뒤쪽
if (!ONLY || ONLY.includes("p-height")) {
  await page.goto(`${BASE}/theaters/cgv-yongsan-ipark-mall/hall-2/seats/H8`);
  await viewReady(page);
  await page.waitForTimeout(3500);
  await page.mouse.move(W * 0.8, H * 0.6);
  cursor = { x: W * 0.8, y: H * 0.6 };
  await film(page, "p-height", async (mark) => {
    await page.waitForTimeout(600);
    await tap(page.getByRole("button", { name: /키 \d+cm/ }), 800);
    await page.waitForTimeout(600);
    const range = page.locator("input[type=range]").first();
    await mark("range", range, 20);
    const r = await range.boundingBox();
    const min = Number(await range.getAttribute("min")), max = Number(await range.getAttribute("max")), value = Number(await range.inputValue());
    const xOf = (v) => r.x + 8 + ((v - min) / (max - min)) * (r.width - 16);
    await glide(page, xOf(value), r.y + r.height / 2, 500);
    await drag(page, { x: xOf(min), y: r.y + r.height / 2 }, 2400);
    await page.waitForTimeout(900);
    await drag(page, { x: xOf(max), y: r.y + r.height / 2 }, 3000);
    await page.waitForTimeout(1200);
  });
  await page.evaluate(() => localStorage.removeItem("movie-mate:stature-cm"));
}

// 3~5) 특별관
for (const [name, path, amount] of [
  ["p-screenx", "/theaters/cgv-yongsan-ipark-mall/hall-14/seats/H12", 90],
  ["p-privatebox", "/theaters/cgv-yeongdeungpotaimseukweeo/s010/seats/L3", 50],
  ["p-bed", "/theaters/cgv-sinsegyegyeonggi/s001/seats/B4", 50],
]) {
  if (ONLY && !ONLY.includes(name)) continue;
  await page.goto(`${BASE}${path}`);
  await cine(page);
  await viewReady(page).catch(() => console.log(name, "not ready"));
  await page.waitForTimeout(3500);
  await film(page, name, async () => {
    await page.waitForTimeout(1200);
    await lookPhone(amount);
    await page.waitForTimeout(1000);
  });
}

// 8~9) 특별관 더: IMAX(용산 N열 가운데), 메가박스 해운대(장산) 더! 넓은 리클라이너 1관
async function middleSeatPath(hallPath, frac) {
  await page.goto(`${BASE}${hallPath}`);
  await page.waitForTimeout(1500);
  const label = await page.evaluate((frac) => {
    const seats = [...document.querySelectorAll("button[aria-label*='열']")].filter((b) => !b.disabled);
    const ys = seats.map((b) => b.getBoundingClientRect().y), lo = Math.min(...ys), hi = Math.max(...ys);
    const xs = seats.map((b) => b.getBoundingClientRect().x), l = Math.min(...xs), r = Math.max(...xs);
    const goal = { x: (l + r) / 2, y: lo + (hi - lo) * frac };
    let best = null, d = Infinity;
    for (const b of seats) {
      const q = b.getBoundingClientRect(), dd = Math.hypot(q.x + q.width / 2 - goal.x, q.y + q.height / 2 - goal.y);
      if (dd < d) { d = dd; best = b.getAttribute("aria-label"); }
    }
    return best;
  }, frac);
  const [, row, num] = label.match(/^(\S+)열 (\d+)번/);
  return `${hallPath}/seats/${row}${num}`;
}
for (const [name, hall, frac, amount] of [
  ["p-imax", "/theaters/cgv-yongsan-ipark-mall/imax", 0.82, 80],
  ["p-jangsan", "/theaters/megabox-haeundae-jangsan/hall-1", 0.7, 70],
]) {
  if (ONLY && !ONLY.includes(name)) continue;
  const path = await middleSeatPath(hall, frac);
  console.log(name, path);
  await page.goto(`${BASE}${path}`);
  await cine(page);
  await viewReady(page).catch(() => console.log(name, "not ready"));
  await page.waitForTimeout(3500);
  await film(page, name, async () => {
    await page.waitForTimeout(1200);
    await lookPhone(amount);
    await page.waitForTimeout(1000);
  });
}

// 6) 자리 옮기기: 일반관(2관) 시야에서 좌석표를 펼치고 앞·옆·뒤로 옮긴다
if (!ONLY || ONLY.includes("p-hop")) {
  await page.goto(`${BASE}/theaters/cgv-yongsan-ipark-mall/hall-2/seats/H8`);
  await viewReady(page);
  await page.waitForTimeout(3500);
  await page.mouse.move(W * 0.8, H * 0.6);
  cursor = { x: W * 0.8, y: H * 0.6 };
  await film(page, "p-hop", async (mark) => {
    await page.waitForTimeout(500);
    await tap(page.getByRole("button", { name: /좌석표 보기|좌석·티켓 보기/ }), 700);
    await page.locator("section#seat-ticket-panel [class*=grid]").first().waitFor({ timeout: 5000 }).catch(async () => {
      console.log("panel not open, clicking directly");
      await page.getByRole("button", { name: /좌석표 보기|좌석·티켓 보기/ }).click();
    });
    await page.waitForTimeout(900);
    const panel = "section#seat-ticket-panel";
    for (const [fx, fy] of [[0.5, 0.08], [0.15, 0.5], [0.6, 0.95], [0.5, 0.55]]) {
      // 자리를 옮기면 휴대폰에서는 좌석표가 다시 접힌다
      if (!(await page.locator(`${panel} [class*=grid]`).first().isVisible().catch(() => false))) {
        await tap(page.getByRole("button", { name: /좌석표 보기|좌석·티켓 보기/ }), 600);
        await page.waitForTimeout(700);
      }
      const box = await page.locator(`${panel} [class*=grid]`).first().boundingBox();
      const seat = await seatNear(page, box.x + box.width * fx, box.y + box.height * fy, panel);
      await glideTo(page, seat, 700);
      await page.waitForTimeout(150);
      await click(page);
      await mark("hop", seat, 12);
      await page.waitForTimeout(400);
      await viewReady(page);
      await page.waitForTimeout(2400);
    }
  });
}

// 7) 영화·날짜·시간 → 좌석 → 티켓 → 시야 (메가박스 코엑스)
if (!ONLY || ONLY.includes("p-showtime")) {
  await page.goto(`${BASE}/theaters/megabox-koekseu`);
  await page.waitForTimeout(3000);
  await page.mouse.move(W * 0.8, H * 0.7);
  cursor = { x: W * 0.8, y: H * 0.7 };
  await film(page, "p-showtime", async (mark) => {
    await page.waitForTimeout(500);
    const movie = page.getByRole("button", { name: "라라랜드" }).first();
    await movie.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await tap(movie, 800);
    await mark("movie", movie, 8);
    await page.waitForTimeout(900);
    await tap(page.getByRole("button", { name: /11월 24일/ }).first(), 700);
    await page.waitForTimeout(900);
    await tap(page.getByRole("button", { name: /시작, .*끝/ }).first(), 700);
    await page.waitForTimeout(800);
    await tap(page.getByRole("link", { name: /좌석 보기/ }).or(page.getByRole("button", { name: /좌석 보기/ })).last());
    await page.waitForURL(/\/theaters\/megabox-koekseu\/[^/?]+\?/);
    await page.waitForTimeout(2200);
    const first = await page.locator("button[aria-label*='열']").first().boundingBox();
    const last = await page.locator("button[aria-label*='열']").last().boundingBox();
    const seat = await seatNear(page, W / 2, first.y + (last.y - first.y) * 0.6);
    await tap(seat, 900);
    await mark("seat", seat, 16);
    await page.waitForTimeout(1600);
    console.log("href", await page.getByRole("link", { name: "이 자리에서 보기" }).first().getAttribute("href").catch(() => "none"));
    await cine(page);
    await tap(page.getByRole("link", { name: "이 자리에서 보기" }).or(page.getByRole("button", { name: "이 자리에서 보기" })).first());
    await page.waitForURL(/\/seats\/[^/]+\?/, { timeout: 30000 }).catch(() => {});
    await viewReady(page).catch(() => {});
    await page.waitForTimeout(3000);
    // 좌석 시야를 크게 둘러본다(위아래도 조금)
    await glide(page, W / 2, H * 0.42, 400);
    await drag(page, { x: W / 2 + 120, y: H * 0.42 }, 1800);
    await page.waitForTimeout(300);
    await drag(page, { x: W / 2 - 120, y: H * 0.42 + 30 }, 2600);
    await page.waitForTimeout(300);
    await drag(page, { x: W / 2, y: H * 0.42 }, 1600);
    await page.waitForTimeout(1500);
  });
}

await browser.close();
