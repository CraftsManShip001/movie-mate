// 무비메이트 홍보 영상 촬영 스크립트 (promo-film 스킬의 record.ts를 옮긴 것).
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
    await page.mouse.move(from.x + (x - from.x) * k, from.y + (y - from.y) * k - Math.sin(k * Math.PI) * 40);
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
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1920, maxHeight: 1080 });
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

const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await context.addInitScript(POINTER);
const page = await context.newPage();

// 스크린 영상을 미리 한 번 받아 둔다(처음엔 몇 초 동안 테스트 패턴이 보인다)
await page.goto(`${BASE}/theaters/cgv-yongsan-ipark-mall/hall-2/seats/H8`);
await viewReady(page).catch(() => {});
await page.waitForTimeout(12000); // 영상 요소는 화면에 붙지 않아(텍스처) 시간으로 기다린다

// 1) 좌석표에서 자리를 누르고 그 자리 시야로 들어간다 (CGV 용산 IMAX)
await page.goto(`${BASE}/theaters/cgv-yongsan-ipark-mall/imax`);
await page.waitForTimeout(1200);
await page.mouse.move(1500, 900);
cursor = { x: 1500, y: 900 };
await film(page, "pick", async (mark) => {
  await page.waitForTimeout(500);
  await glide(page, 1000, 700, 800);
  const seat = await seatNear(page, 770, 674); // N열 가운데: 스크린 전체와 앞사람이 함께 보인다
  await glideTo(page, seat, 900);
  await page.waitForTimeout(250);
  await click(page);
  await mark("seat", seat, 30);
  await page.waitForTimeout(1800);
  const go = page.getByRole("button", { name: "이 자리에서 보기" }).or(page.getByRole("link", { name: "이 자리에서 보기" })).first();
  await glideTo(page, go, 900);
  await page.waitForTimeout(250);
  await cine(page);
  await click(page);
  await viewReady(page);
  await page.waitForTimeout(2500);
  await lookAround(page, 300);
  await page.waitForTimeout(800);
});

// 일반관(2관)의 가운데 뒤쪽 자리: 앞사람 머리가 보여 키·자리 차이가 잘 드러난다
async function openStandard() {
  await page.goto(`${BASE}/theaters/cgv-yongsan-ipark-mall/hall-2`);
  await page.waitForTimeout(1200);
  const box = await page.locator("button[aria-label*='열']").first().boundingBox();
  const last = await page.locator("button[aria-label*='열']").last().boundingBox();
  const seat = await seatNear(page, 770, box.y + (last.y - box.y) * 0.62);
  const label = await seat.getAttribute("aria-label");
  const [, row, num] = label.match(/^(\S+)열 (\d+)번/);
  await page.goto(`${BASE}/theaters/cgv-yongsan-ipark-mall/hall-2/seats/${row}${num}`);
  await viewReady(page);
  await page.waitForTimeout(3500);
}

// 2) 3D 안에서 미니 좌석표로 앞줄·뒷줄 옮겨 다니기
if (!ONLY || ONLY.includes("hop")) await openStandard();
await film(page, "hop", async (mark) => {
  const panel = "section#seat-ticket-panel";
  await page.waitForTimeout(600);
  for (const [fx, fy] of [[0.5, 0.08], [0.18, 0.55], [0.55, 0.95], [0.5, 0.5]]) {
    const box = await page.locator(`${panel} svg, ${panel} [class*=grid]`).first().boundingBox();
    const seat = await seatNear(page, box.x + box.width * fx, box.y + box.height * fy, panel);
    await glideTo(page, seat, 800);
    await page.waitForTimeout(200);
    await click(page);
    await mark("hop", seat, 20);
    await page.waitForTimeout(400);
    await viewReady(page);
    await page.waitForTimeout(2200);
  }
});

// 3) 키 바꾸기: 앞사람 머리 뒤에서 키를 낮췄다 높인다
if (!ONLY || ONLY.includes("height")) await openStandard();
await film(page, "height", async (mark) => {
  await page.waitForTimeout(600);
  const btn = page.getByRole("button", { name: /키 \d+cm/ });
  await glideTo(page, btn, 900);
  await page.waitForTimeout(200);
  await click(page);
  await page.waitForTimeout(700);
  const range = page.locator("input[type=range]").first();
  await mark("range", range, 40);
  const r = await range.boundingBox();
  const value = Number(await range.inputValue());
  const min = Number(await range.getAttribute("min")), max = Number(await range.getAttribute("max"));
  const xOf = (v) => r.x + 10 + ((v - min) / (max - min)) * (r.width - 20);
  await glide(page, xOf(value), r.y + r.height / 2, 600);
  await drag(page, { x: xOf(min), y: r.y + r.height / 2 }, 2600);
  await page.waitForTimeout(900);
  await drag(page, { x: xOf(max), y: r.y + r.height / 2 }, 3200);
  await page.waitForTimeout(900);
  await drag(page, { x: xOf(value), y: r.y + r.height / 2 }, 1500);
  await page.waitForTimeout(600);
});

// 4~6) 특별관: ScreenX, PRIVATE BOX, 침대
for (const [name, path, amount] of [
  ["screenx", "/theaters/cgv-yongsan-ipark-mall/hall-14/seats/H12", 240],
  ["privatebox", "/theaters/cgv-yeongdeungpotaimseukweeo/s010/seats/L3", 130],
  ["bed", "/theaters/cgv-sinsegyegyeonggi/s001/seats/B4", 130],
]) {
  if (ONLY && !ONLY.includes(name)) continue;
  await page.goto(`${BASE}${path}`);
  await cine(page);
  await viewReady(page).catch(() => console.log(name, "not ready"));
  await page.waitForTimeout(3500);
  await film(page, name, async () => {
    await page.waitForTimeout(1500);
    await lookAround(page, amount);
    await page.waitForTimeout(1200);
  });
}

// 7) 관 고르기: CGV 용산아이파크몰 → IMAX관 → 이 관 좌석 보기
if (!ONLY || ONLY.includes("halls")) {
  await page.goto(`${BASE}/theaters/cgv-yongsan-ipark-mall`);
  await page.waitForTimeout(1500);
  await page.mouse.move(1500, 900);
  cursor = { x: 1500, y: 900 };
  await film(page, "halls", async (mark) => {
    await page.waitForTimeout(600);
    const rows = page.getByRole("button").filter({ hasText: /관/ });
    await glideTo(page, rows.nth(3), 800);
    await page.waitForTimeout(300);
    await glideTo(page, rows.nth(1), 600);
    await page.waitForTimeout(300);
    const imax = page.getByRole("button", { name: /^IMAX관/ }).first();
    await glideTo(page, imax, 700);
    await page.waitForTimeout(200);
    await click(page);
    await mark("imax", imax, 12);
    await page.waitForTimeout(900);
    const go = page.getByRole("link", { name: "이 관 좌석 보기" }).or(page.getByRole("button", { name: "이 관 좌석 보기" })).first();
    await glideTo(page, go, 800);
    await page.waitForTimeout(200);
    await click(page);
    await page.waitForURL(/\/imax/);
    await page.waitForTimeout(2200);
  });
}

// 8) 영화·날짜·시간 고르기 → 좌석 → 티켓 → 시야 (메가박스 코엑스, 실시간 시간표)
if (!ONLY || ONLY.includes("showtime")) {
  page.on("response", (r) => { if (r.url().includes("/api/live")) console.log("live", r.status()); });
  page.on("framenavigated", (f) => { if (f === page.mainFrame()) console.log("nav", f.url().replace(BASE, "")); });
  await page.goto(`${BASE}/theaters/megabox-koekseu`);
  await page.waitForTimeout(3000);
  await page.mouse.move(1500, 900);
  cursor = { x: 1500, y: 900 };
  await film(page, "showtime", async (mark) => {
    await page.waitForTimeout(600);
    const movie = page.getByRole("button", { name: "라라랜드" }).first();
    await glideTo(page, movie, 900);
    await page.waitForTimeout(200);
    await click(page);
    await mark("movie", movie, 12);
    await page.waitForTimeout(1000);
    const day = page.getByRole("button", { name: /11월 24일/ }).first();
    await glideTo(page, day, 800);
    await page.waitForTimeout(200);
    await click(page);
    await mark("day", day, 12);
    await page.waitForTimeout(1000);
    const time = page.getByRole("button", { name: /시작, .*끝/ }).first();
    await glideTo(page, time, 800);
    await page.waitForTimeout(200);
    await click(page);
    await mark("time", time, 12);
    await page.waitForTimeout(900);
    const go = page.getByRole("link", { name: /좌석 보기/ }).or(page.getByRole("button", { name: /좌석 보기/ })).last();
    await glideTo(page, go, 800);
    await page.waitForTimeout(200);
    await click(page);
    await page.waitForURL(/\/theaters\/megabox-koekseu\/[^/?]+\?/);
    await page.waitForTimeout(2200);
    const seats = page.locator("button[aria-label*='열']:not([disabled])");
    const box = await page.locator("button[aria-label*='열']").first().boundingBox();
    const last = await page.locator("button[aria-label*='열']").last().boundingBox();
    const seat = await seatNear(page, 770, box.y + (last.y - box.y) * 0.6);
    await glideTo(page, seat, 900);
    await page.waitForTimeout(200);
    await click(page);
    await mark("seat", seat, 30);
    await page.waitForTimeout(1600);
    console.log("href", await page.getByRole("link", { name: "이 자리에서 보기" }).first().getAttribute("href").catch(() => "none"));
    const view = page.getByRole("button", { name: "이 자리에서 보기" }).or(page.getByRole("link", { name: "이 자리에서 보기" })).first();
    await glideTo(page, view, 800);
    await page.waitForTimeout(200);
    await click(page);
    await page.waitForURL(/\/seats\/[^/]+\?/, { timeout: 30000 }).catch(() => {});
    await viewReady(page).catch(() => {});
    await page.waitForTimeout(4000);
  });
}

await browser.close();
