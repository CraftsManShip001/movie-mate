"""랜딩 페이지 시안 4종(LandingA~D) 캔버스 보드를 만든다.

쓰는 법: python3 design/tools/gen_landing.py <캔버스 root>   (root 아래 project/ 에 쓴다)

보드 한 장 = 위 데스크톱 1440 전체 페이지, 아래 휴대폰 390×844 세 장(첫 화면, 스크롤한 아래, 다시 온 사람).
3D 시야 사진은 운영 사이트(CGV 용산아이파크몰 IMAX관 C·H·N열 23번 등)를 찍어 캔버스 자산으로 올린 것이다.
"""
import json
import sys
from pathlib import Path

ROOT = Path(sys.argv[1]) / "project"
DATA = Path(__file__).resolve().parents[2] / "data/theaters"

# 캔버스 자산
IMG = {
    "C23": "/_blob/37f32eba4badea88eb02e3c5a58f3c25",
    "H23": "/_blob/41d2d9c0cc0750c6290b16b834dede10",
    "N23": "/_blob/cf224f0059cf4a799cdf90f7dfdd7188",
    "dolby": "/_blob/84f5eb38859e53612cf4914240461a6f",
    "screenx": "/_blob/1e75b14c5e676571b4326e749bcae4fc",
    "charlotte": "/_blob/03c3f83e3d861c4ca4ee0052311619eb",
}

# DESIGN.md 색
BG, INK, SUB, HAIR, BTN, SEAT, ACC, STAGE = "#FFFFFF", "#141414", "#6E6E73", "#D9D9DC", "#F2F2F3", "#DDDDE1", "#E5432F", "#0C0C0D"
BRAND = "#A3192E"
D_INK, D_SUB, D_HAIR = "#F3F3F4", "#9C9CA3", "#2A2A2E"

FONT = "'Noto Sans KR', -apple-system, sans-serif"

# 운영 데이터에서 센 수(2026-11-25)
COUNTS = [("CGV", 171, 1158), ("메가박스", 107, 700), ("롯데시네마", 128, 882)]
TOTAL_T = sum(c[1] for c in COUNTS)
TOTAL_H = sum(c[2] for c in COUNTS)

# 많이 찾는 자리(좌석은 예시로 고른 것)
SPOTS = [
    ("N23", "CGV 용산아이파크몰", "IMAX관", "N열 23번"),
    ("dolby", "메가박스 코엑스", "DOLBY CINEMA", "M열 12번"),
    ("screenx", "CGV 용산아이파크몰", "14관 SCREENX", "H열 7번"),
    ("charlotte", "롯데시네마 월드타워", "1관 샤롯데", "C열 5번"),
]

# 시야 화면에서 읽은 실제 수치
METRICS = {"C23": ("100°", "36°", "13.1m"), "H23": ("80°", "21°", "18.6m"), "N23": ("63°", "10°", "25.1m")}


def fmt(n):
    return f"{n:,}"


LOGO = (
    '<svg width="{s}" height="{s}" viewBox="0 0 100 100" aria-hidden="true" style="display: block; flex: none">'
    '<defs><clipPath id="lg{k}a"><rect x="0" y="0" width="62" height="100"></rect></clipPath>'
    '<clipPath id="lg{k}b"><rect x="66" y="0" width="40" height="100"></rect></clipPath></defs>'
    '<path d="M18 26 H57 A7 7 0 0 0 71 26 H82 A8 8 0 0 1 90 34 V66 A8 8 0 0 1 82 74 H71 A7 7 0 0 0 57 74 H18 A8 8 0 0 1 10 66 V34 A8 8 0 0 1 18 26 Z" fill="{b}" clip-path="url(#lg{k}a)"></path>'
    '<path d="M18 26 H57 A7 7 0 0 0 71 26 H82 A8 8 0 0 1 90 34 V66 A8 8 0 0 1 82 74 H71 A7 7 0 0 0 57 74 H18 A8 8 0 0 1 10 66 V34 A8 8 0 0 1 18 26 Z" fill="{t}" clip-path="url(#lg{k}b)"></path>'
    "</svg>"
)
_logo_n = [0]


def logo(size=28, dark=False):
    _logo_n[0] += 1
    return LOGO.format(s=size, k=_logo_n[0], b=BRAND, t="#FFFFFF" if dark else INK)


def header(pad, dark=False):
    ink = D_INK if dark else INK
    return (
        f'<div style="height: 72px; display: flex; align-items: center; gap: 10px; padding: 0 {pad}px; flex: none">'
        f'{logo(28, dark)}<span style="font-size: 17px; font-weight: 700; color: {ink}; letter-spacing: -0.01em">무비메이트</span></div>'
    )


def button(label, dark=False, full=False, h=56):
    bg, fg = ("#FFFFFF", INK) if dark else (INK, "#FFFFFF")
    w = "width: 100%;" if full else "width: 240px;"
    return (
        f'<a href="#" style="{w} height: {h}px; border-radius: 14px; background: {bg}; color: {fg}; font-size: 17px; font-weight: 700; '
        f'display: flex; align-items: center; justify-content: center; text-decoration: none; box-sizing: border-box; flex: none">{label}</a>'
    )


def resume_row(pad, dark=False):
    ink, sub, hair = (D_INK, D_SUB, D_HAIR) if dark else (INK, SUB, HAIR)
    return (
        f'<a href="#" style="display: flex; align-items: center; gap: 14px; padding: 12px {pad}px; text-decoration: none; border-bottom: 1px solid {hair}; flex: none">'
        f'<img src="{IMG["N23"]}" alt="" style="width: 64px; height: 36px; object-fit: cover; border-radius: 6px; flex: none">'
        f'<span style="display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1">'
        f'<span style="font-size: 16px; font-weight: 700; color: {ink}">N열 23번 이어 보기</span>'
        f'<span style="font-size: 13px; color: {sub}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">CGV 용산아이파크몰 IMAX관</span></span>'
        f'<span style="color: {sub}; font-size: 18px">›</span></a>'
    )


# ---------- 좌석표(실제 IMAX관 데이터) ----------

def seat_rows():
    d = json.loads((DATA / "cgv-yongsan-ipark-mall/seatmaps/imax.json").read_text())
    return [(r["label"], r["cells"]) for r in d["rows"]]


def seatmap(cell, gap, pick=("N", 22), labels=True, dark=False, screen=True):
    seat_c = "#3A3A40" if dark else SEAT
    sub = D_SUB if dark else SUB
    rows = []
    for label, cells in seat_rows():
        out = []
        for i, c in enumerate(cells):
            if c == ".":
                out.append(f'<span style="width: {cell}px; height: {cell}px"></span>')
            else:
                col = ACC if (label, i) == pick else seat_c
                out.append(f'<span style="width: {cell}px; height: {cell}px; border-radius: {max(2, cell // 4)}px; background: {col}"></span>')
        lab = f'<span style="width: {cell * 1.6:.0f}px; font-size: {max(9, cell - 4)}px; color: {sub}; text-align: left">{label}</span>' if labels else ""
        rows.append(f'<div style="display: flex; align-items: center; gap: {gap}px">{lab}{"".join(out)}</div>')
    w = len(seat_rows()[0][1]) * (cell + gap)
    scr = ""
    if screen:
        scr = (
            f'<div style="display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: {cell * 2}px">'
            f'<div style="width: {int(w * 0.8)}px; height: 3px; border-radius: 2px; background: {D_INK if dark else INK}"></div>'
            f'<span style="font-size: 12px; color: {sub}">스크린</span></div>'
        )
    return f'<div role="img" aria-label="CGV 용산아이파크몰 IMAX관 좌석표, N열 23번 선택" style="display: flex; flex-direction: column; align-items: center; gap: {gap}px">{scr}{"".join(rows)}</div>'


# ---------- 공통 아래 섹션 ----------

def spots_desktop():
    items = []
    for key, th, hall, seat in SPOTS:
        items.append(
            f'<a href="#" style="display: flex; flex-direction: column; gap: 12px; text-decoration: none; min-width: 0">'
            f'<img src="{IMG[key]}" alt="{th} {hall} {seat}에서 본 시야" style="width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 12px; display: block">'
            f'<span style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 16px; font-weight: 700; color: {INK}">{hall} · {seat}</span>'
            f'<span style="font-size: 13px; color: {SUB}">{th}</span></span></a>'
        )
    return (
        f'<section style="padding: 96px 80px 0; display: flex; flex-direction: column; gap: 28px">'
        f'<div style="display: flex; align-items: baseline; justify-content: space-between"><h2 style="margin: 0; font-size: 28px; font-weight: 700; color: {INK}; letter-spacing: -0.02em">많이 찾는 자리</h2>'
        f'<span style="font-size: 16px; color: {SUB}">바로 3D로 열어요</span></div>'
        f'<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px">{"".join(items)}</div></section>'
    )


def counts_desktop():
    rows = "".join(
        f'<div style="display: flex; align-items: center; justify-content: space-between; height: 64px; border-bottom: 1px solid {HAIR}">'
        f'<span style="font-size: 16px; font-weight: 500; color: {INK}">{name}</span>'
        f'<span style="font-size: 16px; color: {INK}">{fmt(t)}곳 <span style="color: {SUB}">·</span> {fmt(h)}관</span></div>'
        for name, t, h in COUNTS
    )
    return (
        f'<section style="padding: 120px 80px 0; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 80px; align-items: start">'
        f'<h2 style="margin: 0; font-size: 40px; font-weight: 700; color: {INK}; letter-spacing: -0.02em; line-height: 1.3">전국 {fmt(TOTAL_T)}개 극장,<br>{fmt(TOTAL_H)}개 상영관의<br>자리를 볼 수 있어요</h2>'
        f'<div style="border-top: 1px solid {HAIR}">{rows}</div></section>'
    )


def footer_desktop():
    return (
        f'<div style="padding: 120px 80px 0"><div style="display: flex; align-items: center; justify-content: space-between; gap: 40px; padding: 40px 0; border-top: 1px solid {HAIR}">'
        f'<span style="font-size: 28px; font-weight: 700; color: {INK}; letter-spacing: -0.02em">내 자리, 미리 앉아 볼까요?</span>{button("좌석 찾아보기")}</div></div>'
        f'<div style="padding: 24px 80px 48px; display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: {SUB}">'
        f'<span>좌석 배치와 크기는 예매 화면을 바탕으로 추정했어요. 예매는 각 영화관 사이트에서 해요.</span>'
        f'<span>영상: Spring (c) Blender Foundation, cloud.blender.org/spring, CC BY 4.0</span></div>'
    )


def spots_phone():
    items = "".join(
        f'<a href="#" style="display: flex; align-items: center; gap: 14px; min-height: 76px; padding: 0 20px; text-decoration: none; border-bottom: 1px solid {HAIR}">'
        f'<img src="{IMG[key]}" alt="" style="width: 96px; height: 54px; object-fit: cover; border-radius: 8px; flex: none">'
        f'<span style="display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0"><span style="font-size: 16px; font-weight: 700; color: {INK}">{hall} · {seat}</span>'
        f'<span style="font-size: 13px; color: {SUB}">{th}</span></span><span style="color: {SUB}; font-size: 18px">›</span></a>'
        for key, th, hall, seat in SPOTS
    )
    return (
        f'<div style="padding: 32px 20px 8px"><h2 style="margin: 0; font-size: 22px; font-weight: 700; color: {INK}; letter-spacing: -0.02em">많이 찾는 자리</h2></div>{items}'
    )


def counts_phone():
    rows = "".join(
        f'<div style="display: flex; align-items: center; justify-content: space-between; height: 52px; border-bottom: 1px solid {HAIR}">'
        f'<span style="font-size: 16px; color: {INK}">{name}</span><span style="font-size: 16px; color: {INK}">{fmt(t)}곳 · {fmt(h)}관</span></div>'
        for name, t, h in COUNTS
    )
    return (
        f'<div style="padding: 48px 20px 0; display: flex; flex-direction: column; gap: 20px">'
        f'<h2 style="margin: 0; font-size: 28px; font-weight: 700; color: {INK}; letter-spacing: -0.02em; line-height: 1.3">전국 {fmt(TOTAL_T)}개 극장,<br>{fmt(TOTAL_H)}개 상영관</h2>'
        f'<div style="border-top: 1px solid {HAIR}">{rows}</div></div>'
    )


# ---------- 시안별 첫 화면 ----------

def hero_A(phone=False):
    sentence = "앉기 전에,<br>그 자리에서 보세요"
    line = "좌석을 고르면 그 자리에서 보이는 스크린을 3D로 보여 드려요."
    if phone:
        return (
            f'<div style="padding: 16px 20px 0; display: flex; flex-direction: column; gap: 14px">'
            f'<h1 style="margin: 0; font-size: 32px; font-weight: 700; color: {INK}; letter-spacing: -0.02em; line-height: 1.3">{sentence}</h1>'
            f'<p style="margin: 0; font-size: 16px; color: {SUB}; line-height: 1.5">{line}</p></div>'
            f'<div style="padding: 28px 20px 0; display: flex; flex-direction: column; gap: 16px">'
            f'<div style="display: flex; justify-content: center">{seatmap(5, 1, labels=False)}</div>'
            f'<img src="{IMG["N23"]}" alt="N열 23번에서 본 IMAX관 스크린" style="width: 100%; height: 196px; object-fit: cover; border-radius: 12px; display: block">'
            f'<span style="font-size: 13px; color: {SUB}">CGV 용산아이파크몰 IMAX관 · N열 23번</span></div>'
            f'<div style="padding: 24px 20px 0">{button("좌석 찾아보기", full=True)}</div>'
        )
    return (
        f'<section style="padding: 56px 80px 0; display: flex; flex-direction: column; gap: 56px">'
        f'<div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 40px">'
        f'<div style="display: flex; flex-direction: column; gap: 16px"><h1 style="margin: 0; font-size: 56px; font-weight: 700; color: {INK}; letter-spacing: -0.03em; line-height: 1.2">{sentence}</h1>'
        f'<p style="margin: 0; font-size: 18px; color: {SUB}">{line}</p></div>{button("좌석 찾아보기")}</div>'
        f'<div style="display: grid; grid-template-columns: 400px minmax(0, 1fr); gap: 40px; align-items: center">'
        f'<div style="display: flex; flex-direction: column; gap: 20px; align-items: center">{seatmap(6, 2)}'
        f'<span style="font-size: 13px; color: {SUB}">CGV 용산아이파크몰 IMAX관 · N열 23번</span></div>'
        f'<img src="{IMG["N23"]}" alt="N열 23번에서 본 IMAX관 스크린" style="width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 16px; display: block"></div></section>'
    )


def seat_switch(phone):
    """B: 앞·가운데·뒤 자리 버튼. 누르면 사진과 수치가 바뀐다."""
    size = 15 if phone else 16
    return (
        f'<div role="group" aria-label="자리 바꿔 보기" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; width: 100%">'
        f'<sc-for list="{{{{seats}}}}" as="s" hint-placeholder-count="3">'
        f'<button onClick="{{{{s.pick}}}}" aria-pressed="{{{{s.on}}}}" style="height: {52 if phone else 60}px; border-radius: 12px; border: 1px solid {{{{s.border}}}}; background: {{{{s.bg}}}}; color: {{{{s.fg}}}}; font-size: {size}px; font-weight: 700; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px">'
        f'<span>{{{{s.label}}}}</span><span style="font-size: 12px; font-weight: 400; opacity: 0.7">{{{{s.where}}}}</span></button></sc-for></div>'
    )


def metrics_line(phone):
    fs = 15 if phone else 16
    return (
        f'<div style="display: flex; gap: {20 if phone else 32}px; font-size: {fs}px; color: {D_INK}">'
        f'<span>시야각 <b>{{{{m.view}}}}</b></span><span>올려보기 <b>{{{{m.up}}}}</b></span><span>스크린까지 <b>{{{{m.dist}}}}</b></span></div>'
    )


def hero_B(phone=False):
    sentence = "자리를 바꾸면,<br>보이는 화면도 달라져요"
    if phone:
        return (
            f'<div style="background: {STAGE}; padding: 8px 0 28px; display: flex; flex-direction: column; gap: 20px">'
            f'<h1 style="margin: 0; padding: 0 20px; font-size: 30px; font-weight: 700; color: {D_INK}; letter-spacing: -0.02em; line-height: 1.3">{sentence}</h1>'
            f'<img src="{{{{img}}}}" alt="{{{{alt}}}}" style="width: 100%; height: 232px; object-fit: cover; display: block">'
            f'<div style="padding: 0 20px; display: flex; flex-direction: column; gap: 16px">{seat_switch(True)}{metrics_line(True)}'
            f'{button("좌석 찾아보기", dark=True, full=True)}</div></div>'
        )
    return (
        f'<section style="background: {STAGE}; padding: 56px 80px 64px; display: flex; flex-direction: column; gap: 40px">'
        f'<div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 40px">'
        f'<h1 style="margin: 0; font-size: 56px; font-weight: 700; color: {D_INK}; letter-spacing: -0.03em; line-height: 1.2">{sentence}</h1>'
        f'{button("좌석 찾아보기", dark=True)}</div>'
        f'<img src="{{{{img}}}}" alt="{{{{alt}}}}" style="width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 16px; display: block">'
        f'<div style="display: flex; align-items: center; justify-content: space-between; gap: 40px"><div style="width: 560px">{seat_switch(False)}</div>{metrics_line(False)}</div></section>'
    )


def hero_C(phone=False):
    sentence = "어느 자리가<br>잘 보일까요?"
    line = "CGV·메가박스·롯데시네마 좌석에서 보이는 스크린을 미리 보여 드려요."
    if phone:
        return (
            f'<div style="padding: 16px 20px 0; display: flex; flex-direction: column; gap: 14px">'
            f'<h1 style="margin: 0; font-size: 36px; font-weight: 700; color: {INK}; letter-spacing: -0.02em; line-height: 1.25">{sentence}</h1>'
            f'<p style="margin: 0; font-size: 16px; color: {SUB}; line-height: 1.5">{line}</p></div>'
            f'<div style="padding: 48px 0 0; display: flex; justify-content: center">{seatmap(6, 1, labels=False)}</div>'
            f'<div style="padding: 48px 20px 0">{button("좌석 찾아보기", full=True)}</div>'
        )
    return (
        f'<section style="padding: 88px 80px 0; display: grid; grid-template-columns: minmax(0, 1fr) 680px; gap: 40px; align-items: center">'
        f'<div style="display: flex; flex-direction: column; gap: 32px"><h1 style="margin: 0; font-size: 64px; font-weight: 700; color: {INK}; letter-spacing: -0.03em; line-height: 1.2">{sentence}</h1>'
        f'<p style="margin: 0; font-size: 18px; color: {SUB}; line-height: 1.6; max-width: 420px">{line}</p>{button("좌석 찾아보기")}</div>'
        f'<div style="display: flex; justify-content: center">{seatmap(10, 3)}</div></section>'
    )


def ticket_back(scale=1.0):
    """B-1 블랙 에디션 뒷면(250×520)을 줄여 그린 것. 홈과 오목 모서리는 마스크로 판다."""
    w, h = 250, 520
    mono = "'IBM Plex Mono', monospace"
    line = "#2E2E33"
    rows = "".join(
        f'<div style="display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid {line}"><span style="color: #86868C">{k}</span><span style="color: #ECECEE">{v}</span></div>'
        for k, v in [("THEATER", "CGV 용산"), ("SCREEN", "IMAX"), ("VIEW", "63°"), ("DISTANCE", "25.1m")]
    )
    bars, x = [], 0
    for i, bw in enumerate([2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 2] * 4):
        if x + bw > 206:
            break
        if i % 2 == 0:
            bars.append(f'<rect x="{x}" y="0" width="{bw}" height="34" fill="#ECECEE"></rect>')
        x += bw + 1
    bars = "".join(bars)
    return (
        f'<div style="width: {w}px; height: {h}px; transform: scale({scale}); transform-origin: top left; flex: none">'
        f'<div class="tk" style="width: {w}px; height: {h}px; background: #111113; box-sizing: border-box; padding: 26px 22px; display: flex; flex-direction: column; font-family: {mono}; font-size: 10px; letter-spacing: 0.12em; color: #ECECEE; position: relative">'
        f'<div style="position: absolute; inset: 6px; border: 1px solid #38383E; border-radius: 10px; pointer-events: none"></div>'
        f'<div style="display: flex; justify-content: space-between"><span>MOVIE MATE</span><span style="color: #86868C">No.0023</span></div>'
        f"<div style=\"margin-top: 26px; font-family: 'Hahmlet', serif; font-weight: 600; font-size: 26px; letter-spacing: -0.5px; line-height: 1.2\">좌석 미리 보기</div>"
        f'<div style="margin-top: 4px; color: #86868C">SEE BEFORE YOU SIT</div>'
        f'<div style="margin-top: 22px; display: flex; justify-content: space-between; align-items: flex-end"><span style="color: #86868C">SEAT</span>'
        f"<span style=\"font-family: 'Bebas Neue', sans-serif; font-size: 104px; line-height: 0.9; letter-spacing: 0.02em; color: transparent; -webkit-text-stroke: 1.4px #ECECEE\">N23</span></div>"
        f'<div style="margin-top: 18px; border-top: 1px solid {line}">{rows}</div>'
        f'<svg width="206" height="34" aria-hidden="true" style="margin-top: auto; display: block">{bars}</svg>'
        f"</div></div>"
    )


def hero_D(phone=False):
    sentence = "티켓을 끊기 전에,<br>시야부터"
    line = "고른 자리에서 보이는 스크린과 거리를 3D로 확인해요."
    if phone:
        return (
            f'<div style="background: {STAGE}; padding: 8px 20px 32px; display: flex; flex-direction: column; gap: 14px">'
            f'<h1 style="margin: 0; font-size: 32px; font-weight: 700; color: {D_INK}; letter-spacing: -0.02em; line-height: 1.3">{sentence}</h1>'
            f'<p style="margin: 0; font-size: 16px; color: {D_SUB}; line-height: 1.5">{line}</p>'
            f'<div style="position: relative; height: 300px; margin-top: 12px">'
            f'<img src="{IMG["N23"]}" alt="N열 23번에서 본 IMAX관 스크린" style="position: absolute; left: 0; top: 0; width: 300px; height: 200px; object-fit: cover; border-radius: 12px">'
            f'<div style="position: absolute; right: 0; top: 40px; width: 125px; height: 260px; overflow: hidden">{ticket_back(0.5)}</div></div>'
            f'{button("좌석 찾아보기", dark=True, full=True)}</div>'
        )
    return (
        f'<section style="background: {STAGE}; padding: 72px 80px 80px; display: grid; grid-template-columns: minmax(0, 1fr) 820px; gap: 56px; align-items: center">'
        f'<div style="display: flex; flex-direction: column; gap: 24px"><h1 style="margin: 0; font-size: 56px; font-weight: 700; color: {D_INK}; letter-spacing: -0.03em; line-height: 1.2">{sentence}</h1>'
        f'<p style="margin: 0; font-size: 18px; color: {D_SUB}; line-height: 1.6">{line}</p><div style="margin-top: 16px">{button("좌석 찾아보기", dark=True)}</div></div>'
        f'<div style="position: relative; height: 560px">'
        f'<img src="{IMG["N23"]}" alt="N열 23번에서 본 IMAX관 스크린" style="position: absolute; left: 0; top: 40px; width: 680px; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 16px">'
        f'<div style="position: absolute; right: 0; top: 0">{ticket_back(1.0)}</div></div></section>'
    )


# ---------- 보드 조립 ----------

DESK_W = 1440
PHONE_W, PHONE_H = 390, 844
DESK_H = {"A": 1900, "B": 2280, "C": 1600, "D": 1880, "C1": 1760}


def frame(left, top, w, h, inner, bg=BG, radius=16, border="#E2E2E2"):
    return (
        f'<div style="position: absolute; left: {left}px; top: {top}px; width: {w}px; height: {h}px; border-radius: {radius}px; overflow: hidden; '
        f'border: 1px solid {border}; box-sizing: border-box; background: {bg}; display: flex; flex-direction: column">{inner}</div>'
    )


def phone(left, top, inner, dark_top=False):
    pad_bg = STAGE if dark_top else BG
    return frame(left, top, PHONE_W, PHONE_H, f'<div style="height: 54px; background: {pad_bg}; flex: none"></div>{inner}', radius=40)


def caption(left, top, text):
    return f'<div style="position: absolute; left: {left}px; top: {top}px; font-size: 20px; font-weight: 700; color: {SUB}">{text}</div>'


HERO = {"A": hero_A, "B": hero_B, "C": hero_C, "D": hero_D}
DARK_HERO = {"B", "D"}
TITLE = {"A": "A · 시야와 좌석표", "B": "B · 자리 바꿔 보기", "C": "C · 좌석표 한 장", "D": "D · 티켓과 시야", "C1": "C-1 · 좌석표 + 영화 순위"}

B_SCRIPT = """
class Component extends DCLogic {
  constructor(p) { super(p); this.state = { seat: 'N23' }; }
  renderVals() {
    const IMG = %s;
    const M = %s;
    const LBL = { C23: ['C열 23번', '앞'], H23: ['H열 23번', '가운데'], N23: ['N열 23번', '뒤'] };
    const cur = this.state.seat;
    const seats = ['C23', 'H23', 'N23'].map((k) => {
      const on = k === cur;
      return { label: LBL[k][0], where: LBL[k][1], on: on ? 'true' : 'false',
        bg: on ? '#FFFFFF' : 'transparent', fg: on ? '#141414' : '#F3F3F4', border: on ? '#FFFFFF' : '#3A3A40',
        pick: () => this.setState({ seat: k }) };
    });
    const m = M[cur];
    return { seats, img: IMG[cur], alt: LBL[cur][0] + '에서 본 IMAX관 스크린', m: { view: m[0], up: m[1], dist: m[2] } };
  }
}
"""

PLAIN_SCRIPT = """
class Component extends DCLogic {
  renderVals() { return {}; }
}
"""


# C-1: "많이 찾는 자리" 대신 영화 순위. 영화·포스터는 메가박스 코엑스 실시간 목록 맨 위 5편(2026-11-25), 순위는 예시.
MOVIES = [
    ("/_blob/36bd04b532cfa627dee2d76664e10e65", "슬픈 열대", "청소년 관람불가", 107),
    ("/_blob/5ba9b020a2a18d8a3cb9c053d9ee84a2", "헥스: 마녀왕국", "전체 관람가", 109),
    ("/_blob/4ea70122c6c3b85f7718424537597f46", "폭설", "15세 이상", 88),
    ("/_blob/746c15e25e378b25593a0c0a47f9a5e3", "헝거게임 50번째 추첨의 날", "15세 이상", 158),
    ("/_blob/2b10b202721f73a1d12f9920cd77b809", "미트 페어런츠 4", "12세 이상", 105),
]


def ranking_desktop():
    items = "".join(
        f'<a href="#" style="display: flex; flex-direction: column; gap: 14px; text-decoration: none; min-width: 0">'
        f'<img src="{src}" alt="{title} 포스터" style="width: 100%; aspect-ratio: 2 / 3; object-fit: cover; border-radius: 10px; display: block">'
        f'<span style="display: flex; gap: 12px; align-items: baseline; min-width: 0">'
        f'<span style="font-size: 28px; font-weight: 700; color: {INK}; line-height: 1">{i}</span>'
        f'<span style="display: flex; flex-direction: column; gap: 4px; min-width: 0"><span style="font-size: 16px; font-weight: 700; color: {INK}; line-height: 1.35">{title}</span>'
        f'<span style="font-size: 13px; color: {SUB}">{rating} · {rt}분</span></span></span></a>'
        for i, (src, title, rating, rt) in enumerate(MOVIES, 1)
    )
    return (
        f'<section style="padding: 96px 80px 0; display: flex; flex-direction: column; gap: 28px">'
        f'<div style="display: flex; align-items: baseline; justify-content: space-between"><h2 style="margin: 0; font-size: 28px; font-weight: 700; color: {INK}; letter-spacing: -0.02em">지금 많이 보는 영화</h2>'
        f'<span style="font-size: 16px; color: {SUB}">누르면 상영관과 시간을 골라요</span></div>'
        f'<div style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 24px">{items}</div></section>'
    )


def ranking_phone():
    items = "".join(
        f'<a href="#" style="display: flex; flex-direction: column; gap: 10px; width: 132px; flex: none; text-decoration: none">'
        f'<img src="{src}" alt="{title} 포스터" style="width: 132px; height: 198px; object-fit: cover; border-radius: 8px; display: block">'
        f'<span style="display: flex; gap: 8px; align-items: baseline"><span style="font-size: 20px; font-weight: 700; color: {INK}; line-height: 1">{i}</span>'
        f'<span style="font-size: 15px; font-weight: 700; color: {INK}; line-height: 1.35">{title}</span></span></a>'
        for i, (src, title, rating, rt) in enumerate(MOVIES, 1)
    )
    return (
        f'<div style="padding: 32px 20px 16px"><h2 style="margin: 0; font-size: 22px; font-weight: 700; color: {INK}; letter-spacing: -0.02em">지금 많이 보는 영화</h2></div>'
        f'<div style="display: flex; gap: 14px; padding: 0 20px; overflow-x: auto">{items}</div>'
    )


def board(key):
    variant = key
    key = key[0]
    hero = HERO[key]
    dark = key in DARK_HERO
    dh = DESK_H[variant]
    ranked = variant == "C1"
    sec_desk = ranking_desktop if ranked else spots_desktop
    sec_phone = ranking_phone if ranked else spots_phone
    desk_inner = (
        (f'<div style="background: {STAGE}">{header(80, True)}</div>' if dark else header(80))
        + hero(False)
        # C-1은 지원 범위 숫자를 영화 순위보다 먼저 둔다(사용자 요청)
        + (counts_desktop() + sec_desk() if ranked else sec_desk() + counts_desktop())
        + footer_desktop()
    )
    top_hdr = f'<div style="background: {STAGE}">{header(20, True)}</div>' if dark else header(20)
    # 휴대폰 1: 첫 화면, 2: 스크롤한 아래, 3: 다시 온 사람(이어 보기 줄)
    first_phone = counts_phone if ranked else sec_phone
    p1 = top_hdr + hero(True) + first_phone()
    lower = counts_phone() + sec_phone() if ranked else sec_phone() + counts_phone()
    p2 = lower + f'<div style="padding: 32px 20px 0">{button("좌석 찾아보기", full=True)}</div>'
    resume = f'<div style="background: {STAGE}">{resume_row(20, True)}</div>' if dark else resume_row(20)
    p3 = top_hdr + resume + hero(True) + first_phone()
    ptop = 40 + dh + 120
    W = 40 + DESK_W + 40
    H = ptop + 44 + PHONE_H + 40
    body = (
        frame(40, 40, DESK_W, dh, desk_inner)
        + caption(40, ptop, "휴대폰 · 첫 화면")
        + phone(40, ptop + 44, p1, dark)
        + caption(470, ptop, "휴대폰 · 아래로 내린 곳")
        + phone(470, ptop + 44, p2)
        + caption(900, ptop, "휴대폰 · 다시 온 사람")
        + phone(900, ptop + 44, p3, dark)
    )
    fonts = "family=Noto+Sans+KR:wght@400;500;700"
    if key == "D":
        fonts += "&amp;family=Hahmlet:wght@600&amp;family=IBM+Plex+Mono:wght@400;500&amp;family=Bebas+Neue"
    script = PLAIN_SCRIPT
    if key == "B":
        script = B_SCRIPT % (json.dumps({k: IMG[k] for k in ("C23", "H23", "N23")}), json.dumps(METRICS, ensure_ascii=False))
    extra_css = ""
    if key == "D":
        extra_css = (
            ".tk{-webkit-mask: radial-gradient(circle 14px at 0 0,#0000 14px,#000 14.5px) top left,"
            "radial-gradient(circle 14px at 100% 0,#0000 14px,#000 14.5px) top right,"
            "radial-gradient(circle 14px at 0 100%,#0000 14px,#000 14.5px) bottom left,"
            "radial-gradient(circle 14px at 100% 100%,#0000 14px,#000 14.5px) bottom right;"
            "-webkit-mask-size: 51% 51%; -webkit-mask-repeat: no-repeat;"
            "mask: radial-gradient(circle 14px at 0 0,#0000 14px,#000 14.5px) top left,"
            "radial-gradient(circle 14px at 100% 0,#0000 14px,#000 14.5px) top right,"
            "radial-gradient(circle 14px at 0 100%,#0000 14px,#000 14.5px) bottom left,"
            "radial-gradient(circle 14px at 100% 100%,#0000 14px,#000 14.5px) bottom right;"
            "mask-size: 51% 51%; mask-repeat: no-repeat}"
        )
    html = f"""<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>랜딩 {TITLE[variant]}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?{fonts}&amp;display=swap" rel="stylesheet">
<style>
body{{margin:0}}
*{{word-break:keep-all}}
button{{font-family:inherit}}
b{{font-weight:700}}
{extra_css}
</style>
</helmet>
<div style="width: {W}px; height: {H}px; position: relative; background: #FFFFFF; font-family: {FONT}; font-variant-numeric: tabular-nums">
{body}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{W},"height":{H}}}}}'>{script}</script>
</body>
</html>
"""
    (ROOT / f"Landing{variant}.dc.html").write_text(html)
    return W, H


if __name__ == "__main__":
    ROOT.mkdir(parents=True, exist_ok=True)
    keys = sys.argv[2:] or ["A", "B", "C", "D", "C1"]
    sizes = {k: board(k) for k in keys}
    print(json.dumps(sizes))
