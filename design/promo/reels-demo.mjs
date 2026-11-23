// 릴스 촬영용 자동 재생 데모. 휴대폰 크기(393×852) Chrome 창에서 실제 앱 흐름을 사람 속도로 되풀이한다.
// 모니터 옆에 이 창을 띄워 두고 휴대폰으로 찍는다(촬영 가이드: design/promo/REELS.md).
//   서버: npx next start -p 3100
//   실행: PLAYWRIGHT_FROM=<playwright 가 깔린 폴더> node design/promo/reels-demo.mjs [반복 횟수=99]
//   확인용(창 없이 장면 사진만): HEADLESS=1 node design/promo/reels-demo.mjs 1
//   흐름: 기본은 메가박스 코엑스 영화 → 시간 → 좌석 → 티켓 → 시야(참고 릴스와 같은 순서, 약 30초).
//         FLOW=cgv 면 CGV 용산 IMAX 자리 → 시야 → 키 조절. MOVIE="영화 제목"으로 영화를 바꾼다.
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(join(process.env.PLAYWRIGHT_FROM ?? process.cwd(), "noop.js"));
const { chromium } = require("playwright");

const BASE = process.env.BASE ?? "http://localhost:3100";
const LOOPS = Number(process.argv[2] ?? 99);
const HEADLESS = process.env.HEADLESS === "1";
const SHOTS = decodeURIComponent(new URL("./out/reels-check/", import.meta.url).pathname);
const W = 393, H = 852;

// 시뮬레이터처럼 화살표 커서와 누른 자리 물결을 그린다(창 녹화·촬영에 보이게)
const POINTER = () => {
  const draw = () => {
    if (document.getElementById("__pointer") || !document.body) return;
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="__pointer" style="position:fixed;left:-60px;top:-60px;z-index:2147483647;pointer-events:none;width:26px;height:26px"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M5 3l14 8-6 1.6L10 19z" fill="#151515" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg></div><div id="__ripple" style="position:fixed;z-index:2147483646;pointer-events:none;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(127,127,127,.35);opacity:0"></div>`,
    );
  };
  addEventListener("mousemove", (e) => {
    draw();
    const p = document.getElementById("__pointer");
    p.style.left = e.clientX - 4 + "px";
    p.style.top = e.clientY - 2 + "px";
  }, true);
  addEventListener("mousedown", (e) => {
    draw();
    const r = document.getElementById("__ripple");
    r.style.left = e.clientX + "px";
    r.style.top = e.clientY + "px";
    r.animate([{ opacity: 1, transform: "scale(.4)" }, { opacity: 0, transform: "scale(1.5)" }], { duration: 450, easing: "ease-out" });
  }, true);
};

const browser = await chromium.launch({
  channel: "chrome",
  headless: HEADLESS,
  args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required", `--window-size=${W},${H + 40}`, "--hide-scrollbars"],
});
const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 3 });
await context.addInitScript(POINTER);
const page = await context.newPage();

let cursor = { x: W * 0.7, y: H * 0.8 };
const wait = (ms) => page.waitForTimeout(ms);
async function glide(x, y, ms = 650) {
  const from = { ...cursor };
  const steps = Math.max(8, Math.round(ms / 16));
  for (let i = 1; i <= steps; i += 1) {
    const k = 1 - Math.pow(1 - i / steps, 3);
    await page.mouse.move(from.x + (x - from.x) * k, from.y + (y - from.y) * k - Math.sin(k * Math.PI) * 18);
    await wait(ms / steps);
  }
  cursor = { x, y };
}
async function tap(locator, ms = 650) {
  await locator.scrollIntoViewIfNeeded();
  const b = await locator.boundingBox();
  await glide(b.x + b.width / 2, b.y + b.height / 2, ms);
  await wait(180);
  await page.mouse.down();
  await wait(70);
  await page.mouse.up();
}
async function drag(dx, dy, ms = 1400) {
  const from = { ...cursor };
  await page.mouse.down();
  const steps = Math.round(ms / 16);
  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps, k = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await page.mouse.move(from.x + dx * k, from.y + dy * k);
    await wait(16);
  }
  await page.mouse.up();
  cursor = { x: from.x + dx, y: from.y + dy };
}
let shot = 0;
async function check(name) {
  if (!HEADLESS) return;
  await mkdir(SHOTS, { recursive: true });
  await page.screenshot({ path: `${SHOTS}${String(++shot).padStart(2, "0")}-${name}.png` });
}
const viewReady = () =>
  page.waitForFunction(() => document.querySelector("canvas") && !document.body.innerText.includes("시야를 그리고 있어요"), null, { timeout: 30000 });

// 스크린 영상을 미리 받아 둔다(처음엔 몇 초 동안 테스트 패턴이 보인다)
await page.goto(`${BASE}/theaters/cgv-yongsan-ipark-mall/hall-2/seats/H8`);
await viewReady().catch(() => {});
await wait(HEADLESS ? 3000 : 10000);
await page.evaluate(() => localStorage.removeItem("movie-mate:stature-cm"));

// 참고 릴스(경기장 → 구역 → 좌석 → 시야 → 결제 완료)와 같은 흐름: 영화 → 시간 → 좌석 → 시야 미리보기 → 티켓 → 3D 시야
async function ticketLoop() {
  await page.goto(`${BASE}/theaters/megabox-koekseu`);
  await wait(2200);
  await check("t-showtimes");
  const movie = page.getByRole("button", { name: process.env.MOVIE ?? "라라랜드" }).first();
  await tap(movie, 900);
  await wait(900);
  const tomorrow = page.getByRole("button", { name: /\d+월 \d+일 (?!오늘)(?!.*상영 없음)/ }).first();
  await tap(tomorrow, 700);
  await wait(900);
  await tap(page.getByRole("button", { name: /시작, .*끝/ }).first(), 700);
  await wait(700);
  await check("t-time");
  await tap(page.getByRole("link", { name: /좌석 보기/ }).or(page.getByRole("button", { name: /좌석 보기/ })).last());
  await page.waitForURL(/\/theaters\/megabox-koekseu\/[^/?]+\?/);
  await wait(2000);
  // 팔리지 않은 가운데 뒤쪽 자리
  const label = await page.evaluate(() => {
    const seats = [...document.querySelectorAll("button[aria-label*='열']")].filter((b) => !b.disabled && !b.getAttribute("aria-label").includes("팔린 자리"));
    const ys = seats.map((b) => b.getBoundingClientRect().y), lo = Math.min(...ys), hi = Math.max(...ys);
    const goal = { x: innerWidth / 2, y: lo + (hi - lo) * 0.62 };
    let best = null, d = Infinity;
    for (const b of seats) {
      const r = b.getBoundingClientRect(), dd = Math.hypot(r.x + r.width / 2 - goal.x, r.y + r.height / 2 - goal.y);
      if (dd < d) { d = dd; best = b.getAttribute("aria-label"); }
    }
    return best;
  });
  await tap(page.locator(`button[aria-label="${label}"]`).first(), 900);
  await wait(1500);
  await check("t-seat");
  await tap(page.getByRole("link", { name: "이 자리에서 보기" }).or(page.getByRole("button", { name: "이 자리에서 보기" })).first());
  await wait(2500);
  await check("t-ticket");
  await viewReady().catch(() => {});
  await wait(2500);
  await check("t-view");
  await glide(W / 2, H * 0.42, 600);
  await drag(90, 0, 1500);
  await wait(300);
  await drag(-180, 0, 2000);
  await wait(300);
  await drag(90, 0, 1300);
  await wait(2000);
}

for (let loop = 0; loop < LOOPS; loop += 1) {
  if (process.env.FLOW !== "cgv") {
    await ticketLoop();
    continue;
  }
  // 1 · 영화관: CGV → 서울 → 용산아이파크몰
  await page.goto(`${BASE}/`);
  await wait(1600);
  await check("home");
  await tap(page.getByRole("button", { name: /^CGV \d+곳/ }));
  await wait(500);
  await tap(page.getByRole("button", { name: /^서울/ }).first());
  await wait(500);
  await tap(page.getByRole("button", { name: /^CGV 용산아이파크몰/ }).first(), 800);
  await wait(700);
  await check("picked");
  await tap(page.getByRole("link", { name: "이 극장으로" }).or(page.getByRole("button", { name: "이 극장으로" })).first());
  await page.waitForURL(/cgv-yongsan-ipark-mall/);
  await wait(1300);
  await check("halls");

  // 2 · 상영관: IMAX
  await tap(page.getByRole("button", { name: /^IMAX관/ }).first(), 800);
  await wait(600);
  await tap(page.getByRole("link", { name: "이 관 좌석 보기" }).or(page.getByRole("button", { name: "이 관 좌석 보기" })).first());
  await page.waitForURL(/\/imax/);
  await wait(1500);
  await check("seatmap");

  // 3 · 좌석: 가운데 뒤쪽 한 자리 → 미리보기 → 이 자리에서 보기
  const row = page.locator("button[aria-label^='N열']");
  const seat = row.nth(Math.floor((await row.count()) / 2));
  await tap(seat, 900);
  await wait(1400);
  await check("seat");
  await tap(page.getByRole("link", { name: "이 자리에서 보기" }).or(page.getByRole("button", { name: "이 자리에서 보기" })).first());
  await viewReady();
  await wait(2500);
  await check("view");

  // 4 · 시야: 손가락으로 둘러보고, 키를 낮췄다 올린다
  await glide(W / 2, H * 0.42, 600);
  await drag(110, 0, 1500);
  await wait(300);
  await drag(-220, 0, 2000);
  await wait(300);
  await drag(110, 0, 1300);
  await wait(800);
  await check("look");
  await tap(page.getByRole("button", { name: /키 \d+cm/ }));
  await wait(600);
  const range = page.locator("input[type=range]").first();
  const r = await range.boundingBox();
  const min = Number(await range.getAttribute("min")), max = Number(await range.getAttribute("max")), value = Number(await range.inputValue());
  const xOf = (v) => r.x + 8 + ((v - min) / (max - min)) * (r.width - 16);
  await glide(xOf(value), r.y + r.height / 2, 500);
  await drag(xOf(min) - xOf(value), 0, 1800);
  await wait(900);
  await check("short");
  await drag(xOf(max) - xOf(min), 0, 2400);
  await wait(1200);
  await check("tall");
  await page.evaluate(() => localStorage.removeItem("movie-mate:stature-cm"));
  await wait(1500);
}
await browser.close();
