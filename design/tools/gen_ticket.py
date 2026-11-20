"""movie mate 티켓 다듬기 시안 10종 (모던 · 간지 · 깔끔).
usage: python3 gen_ticket.py <canvas root> [--poster <이미지 주소>] [--out <폴더>]
보드 2장(각 5종). 칸마다 앞면(포스터) · 뒷면(입장권) · 5번 미니 티켓을 실제 크기로 놓는다.
"""
import sys, os, json, argparse

W, H = 250, 520
POSTER_BLOB = "/_blob/7311fb27350ae63e3cd0964fc61338d6"

STAGE, STAGE_FG, STAGE_SUB, STAGE_LINE = "#0C0C0D", "#F4F4F5", "#A4A4AB", "#2A2A2D"
PAPER, PINK, PSUB, PLINE = "#E9E1D3", "#2B2620", "#857A6A", "#CFC4B2"
BAND, BLINE, BTEXT, BSUB = "#120D0A", "#C8612A", "#E9DDCB", "#9C8E80"
INK, ACCENT, BRAND = "#141414", "#E5432F", "#A3192E"

MONO = "'IBM Plex Mono', monospace"
SANS = "'Noto Sans KR', sans-serif"
SERIF = "'Hahmlet', serif"
SEATF = "'Bebas Neue', sans-serif"

# 예시 값 (실제 상영이 아니다)
D = dict(
    no="2611200914", title="오디세이", en="THE ODYSSEY · 2026", seat="J14", row="J", num="14",
    theater="롯데시네마 월드타워", screen="수퍼플렉스관", date="2026.11.20 FRI", date_ko="11월 20일 (금)",
    time="19:30", end="22:18", view="75° / 20°", fov="75°", up="20°", dist="15.5m",
)

BARCODE = [(0, 2.5), (3.8, 1.3), (8.8, 1.3), (12.6, 2.5), (16.4, 3.8), (21.5, 1.3), (25.3, 1.3), (27.8, 3.8),
           (34.1, 1.3), (37.9, 1.3), (42.9, 1.3), (45.5, 2.5), (50.5, 1.3), (55.6, 1.3), (59.4, 1.3), (61.9, 2.5),
           (68.2, 1.3), (70.7, 2.5), (74.5, 3.8), (79.6, 2.5), (83.4, 1.3), (87.2, 1.3), (92.2, 2.5)]


def n(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


# ── 외곽선 ────────────────────────────────────────────
def outline_orig(w=W, h=H, r=6, pitch=26, c=14, gap=8):
    """지금 티켓: 위아래 반원 홈 + 오목한 모서리 (ticket-shape.ts와 같다)"""
    usable = w - c * 2 - r * 2 - gap * 2
    count = usable // pitch + 1 if usable >= 0 else 0
    span = pitch * (count - 1) + r * 2 if count else 0
    first = c + (w - c * 2 - span) / 2
    xs = [first + i * pitch for i in range(int(count))]
    p = [f"M{c},0"]
    for x in xs:
        p += [f"L{n(x)},0", f"A{r},{r} 0 0 0 {n(x + 2 * r)},0"]
    p += [f"L{n(w - c)},0", f"A{c},{c} 0 0 0 {w},{c}", f"L{w},{n(h - c)}", f"A{c},{c} 0 0 0 {n(w - c)},{h}"]
    for x in reversed(xs):
        p += [f"L{n(x + 2 * r)},{h}", f"A{r},{r} 0 0 0 {n(x)},{h}"]
    p += [f"L{c},{h}", f"A{c},{c} 0 0 0 0,{n(h - c)}", f"L0,{c}", f"A{c},{c} 0 0 0 {c},0", "Z"]
    return " ".join(p)


def outline_round(w=W, h=H, r=12, notch_y=None, nr=10):
    """둥근 사각형. notch_y가 있으면 그 높이 양옆에 반원 홈(절취선 자리)"""
    if notch_y is None:
        return f"M{r},0 H{w - r} A{r},{r} 0 0 1 {w},{r} V{h - r} A{r},{r} 0 0 1 {w - r},{h} H{r} A{r},{r} 0 0 1 0,{h - r} V{r} A{r},{r} 0 0 1 {r},0 Z"
    y1, y2 = notch_y - nr, notch_y + nr
    return (f"M{r},0 H{w - r} A{r},{r} 0 0 1 {w},{r} V{y1} A{nr},{nr} 0 0 0 {w},{y2} V{h - r} "
            f"A{r},{r} 0 0 1 {w - r},{h} H{r} A{r},{r} 0 0 1 0,{h - r} V{y2} A{nr},{nr} 0 0 0 0,{y1} V{r} A{r},{r} 0 0 1 {r},0 Z")


def outline_film(w=W, h=H, r=6):
    """필름: 양옆에 톱니 구멍(evenodd로 뚫는다)"""
    out = outline_round(w, h, r)
    holes = []
    y = 14
    while y + 10 < h - 8:
        for x in (7, w - 7 - 9):
            holes.append(f"M{x + 2},{y} H{x + 7} A2,2 0 0 1 {x + 9},{y + 2} V{y + 8} A2,2 0 0 1 {x + 7},{y + 10} H{x + 2} A2,2 0 0 1 {x},{y + 8} V{y + 2} A2,2 0 0 1 {x + 2},{y} Z")
        y += 18
    return out + " " + " ".join(holes)


def outline_zigzag(w=W, h=H, t=5, step=10):
    """감열지: 위아래를 톱니로 뜯은 종이"""
    p = [f"M0,{t}"]
    x = 0
    while x < w:
        p.append(f"L{n(min(x + step / 2, w))},0 L{n(min(x + step, w))},{t}")
        x += step
    p.append(f"L{w},{h - t}")
    x = w
    while x > 0:
        p.append(f"L{n(max(x - step / 2, 0))},{h} L{n(max(x - step, 0))},{h - t}")
        x -= step
    return " ".join(p) + " Z"


# ── 공통 부품 ──────────────────────────────────────────
def face(path, bg, body, evenodd=False, extra=""):
    rule = "evenodd, " if evenodd else ""
    return (f'<div style="position: relative; width: {W}px; height: {H}px; flex: none; clip-path: path({rule}\'{path}\'); background: {bg}; overflow: hidden; {extra}">'
            f'{body}</div>')


def poster_img(poster, top=0, h=375, left=0, w=W):
    return (f'<img src="{poster}" alt="" style="position: absolute; left: {left}px; top: {top}px; width: {w}px; height: {h}px; object-fit: cover; display: block">')


def barcode(color, w=96, h=26):
    bars = "".join(f'<rect x="{x}" y="0" width="{bw}" height="{h}" fill="{color}"/>' for x, bw in BARCODE)
    return f'<svg width="{w}" height="{h}" viewBox="0 0 96 {h}" preserveAspectRatio="none" aria-hidden="true" style="display: block">{bars}</svg>'


def mono(text, size=9, color=PSUB, ls=2, weight=400, extra=""):
    return f'<span style="font-family: {MONO}; font-size: {size}px; letter-spacing: {ls}px; color: {color}; font-weight: {weight}; line-height: 1.35; {extra}">{text}</span>'


def rows(items, label_c, value_c, line_c, size=12, pad=7, lsize=10):
    out = "".join(
        f'<div style="display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding: {pad}px 0; border-bottom: 1px solid {line_c}">'
        f'{mono(k, lsize, label_c, 1)}<span style="font-family: {SANS}; font-size: {size}px; font-weight: 700; color: {value_c}; white-space: nowrap">{v}</span></div>'
        for k, v in items)
    return f'<div>{out}</div>'


STD_ROWS = [("THEATER", D["theater"]), ("SCREEN", D["screen"]), ("DATE", D["date"]), ("TIME", D["time"]), ("VIEW", D["view"]), ("DISTANCE", D["dist"])]


def mini(front_html):
    """5번 시야 화면 오른쪽 아래의 미니 티켓(폭 84)"""
    k = 84 / W
    return (f'<div style="width: 84px; height: {round(H * k)}px; flex: none; overflow: hidden; filter: drop-shadow(0 6px 12px rgba(0,0,0,.4))">'
            f'<div style="transform: scale({k:.4f}); transform-origin: 0 0">{front_html}</div></div>')


# ── 시안 ──────────────────────────────────────────────
def draft_a(P):
    """A · 스위스 그리드: 흰 종이, 큰 좌석 번호, 엄격한 2단 격자"""
    path = outline_round(r=10, notch_y=375, nr=9)
    pap = "#F5F4F0"
    front = face(path, pap, poster_img(P) +
                 f'<div style="position: absolute; left: 20px; right: 20px; top: 393px; display: flex; flex-direction: column; gap: 6px">'
                 f'<div style="display: flex; justify-content: space-between; align-items: baseline"><span style="font-family: {SEATF}; font-size: 44px; line-height: .9; color: {INK}">{D["time"]}</span>{mono(D["date"], 9, "#6E6E73", 1.5)}</div>'
                 f'<div style="border-top: 1px solid {INK}; padding-top: 8px; display: flex; justify-content: space-between">{mono(D["theater"].upper() if False else "LOTTE WORLD TOWER", 8.5, INK, 1.2)}{mono("SUPER PLEX", 8.5, INK, 1.2)}</div></div>')
    cell = lambda k, v: (f'<div style="padding: 8px 0 9px; border-top: 1px solid {INK}; display: flex; flex-direction: column; gap: 3px">'
                         f'{mono(k, 8, "#6E6E73", 1.5)}<span style="font-family: {SANS}; font-size: 12px; font-weight: 700; color: {INK}; white-space: nowrap">{v}</span></div>')
    grid = (f'<div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 16px">'
            + "".join(cell(k, v) for k, v in [("SCREEN", D["screen"]), ("TIME", D["time"]), ("DATE", "11.20 FRI"), ("DISTANCE", D["dist"]), ("VIEW", D["fov"]), ("UP", D["up"])]) + "</div>")
    back = face(path, pap,
                f'<div style="position: absolute; inset: 0; padding: 26px 20px 24px; display: flex; flex-direction: column">'
                f'<div style="display: flex; justify-content: space-between">{mono("MOVIE MATE", 8.5, INK, 2, 500)}{mono("No. " + D["no"], 8.5, "#6E6E73", 1)}</div>'
                f'<div style="margin-top: 18px; font-family: {SANS}; font-size: 26px; font-weight: 700; letter-spacing: -0.03em; color: {INK}; line-height: 1.1">{D["title"]}</div>'
                f'<div style="margin-top: 4px">{mono(D["en"], 8.5, "#6E6E73", 2)}</div>'
                f'<div style="margin-top: 10px; font-family: {SEATF}; font-size: 148px; line-height: .8; color: {INK}; letter-spacing: -2px">{D["seat"]}</div>'
                f'<div style="margin-top: 6px">{mono(D["theater"], 9, INK, 0.5, 500, "font-family: " + SANS + "; letter-spacing: 0")}</div>'
                f'<div style="margin-top: 14px">{grid}</div>'
                f'<div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end">{mono("SEE BEFORE<br>YOU SIT", 8, "#6E6E73", 1.5)}{barcode(INK, 96, 22)}</div></div>')
    return "A · 스위스 그리드", front, back


def draft_b(P):
    """B · 블랙 에디션: 무광 검정 종이, 은색 글자, 속이 빈 큰 좌석 번호"""
    path = outline_orig()
    blk, fg, sub, line = "#111113", "#ECECEE", "#86868C", "#2E2E33"
    front = face(path, blk, poster_img(P) +
                 f'<div style="position: absolute; left: 18px; right: 18px; top: 389px; border-top: 1px solid #5A5A60; padding-top: 22px; display: flex; flex-direction: column; align-items: center; gap: 10px">'
                 f'{mono(D["date"] + " · " + D["time"], 10, fg, 2)}{mono(D["theater"] + " · " + D["screen"], 8.5, sub, 1, 400, "font-family: " + SANS + "; letter-spacing: 0.5px")}</div>')
    back = face(path, blk,
                f'<div style="position: absolute; inset: 0; padding: 30px 22px; display: flex; flex-direction: column">'
                f'<div style="display: flex; justify-content: space-between">{mono("MOVIE MATE", 9, sub, 3)}{mono("No. " + D["no"], 9, sub, 1)}</div>'
                f'<div style="margin-top: 26px; font-family: {SERIF}; font-weight: 600; font-size: 30px; letter-spacing: -0.5px; color: {fg}; line-height: 1.1">{D["title"]}</div>'
                f'<div style="margin-top: 6px">{mono(D["en"], 9, sub, 3)}</div>'
                f'<div style="margin-top: 18px; display: flex; justify-content: space-between; align-items: flex-end">'
                f'{mono("SEAT", 10, sub, 2)}<span style="font-family: {SEATF}; font-size: 104px; line-height: .8; color: transparent; -webkit-text-stroke: 1.4px {fg}">{D["seat"]}</span></div>'
                f'<div style="margin-top: 14px; border-top: 1px solid {line}">{rows(STD_ROWS, sub, fg, line)}</div>'
                f'<div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end">{mono("SEE BEFORE<br>YOU SIT", 9, sub, 2)}{barcode(fg)}</div></div>')
    return "B · 블랙 에디션", front, back


def draft_c(P):
    """C · 꼭지 달린 입장권: 아래 꼭지를 절취선으로 나눈 실제 입장권 구조"""
    cut = 408
    path = outline_round(r=10, notch_y=cut, nr=10)
    dash = f'<div style="position: absolute; left: 14px; right: 14px; top: {cut}px; border-top: 1.5px dashed {PSUB}"></div>'
    stub_front = (f'<div style="position: absolute; left: 0; right: 0; top: {cut}px; bottom: 0; background: {BAND}; padding: 0 22px; display: flex; align-items: center; justify-content: space-between">'
                  f'<div style="display: flex; flex-direction: column; gap: 6px">{mono("ADMIT ONE", 9, BSUB, 3)}{mono(D["date"], 9, BTEXT, 1.5)}{mono(D["time"] + " · " + D["screen"], 9, BTEXT, 1, 400, "font-family: " + SANS)}</div>'
                  f'<span style="font-family: {SEATF}; font-size: 60px; line-height: .8; color: {BTEXT}">{D["seat"]}</span></div>')
    front = face(path, BAND, poster_img(P, 0, cut, 0, W) + stub_front +
                 f'<div style="position: absolute; left: 14px; right: 14px; top: {cut}px; border-top: 1.5px dashed #4A3B30"></div>')
    back = face(path, PAPER,
                f'<div style="position: absolute; left: 0; right: 0; top: 0; height: {cut}px; padding: 28px 22px 18px; box-sizing: border-box; display: flex; flex-direction: column">'
                f'<div style="display: flex; justify-content: space-between">{mono("MOVIE MATE", 9, PSUB, 3)}{mono("No. " + D["no"], 9, PSUB, 1)}</div>'
                f'<div style="margin-top: 20px; font-family: {SERIF}; font-weight: 600; font-size: 30px; letter-spacing: -0.5px; color: {PINK}; line-height: 1.1">{D["title"]}</div>'
                f'<div style="margin-top: 6px">{mono(D["en"], 9, PSUB, 3)}</div>'
                f'<div style="margin-top: 16px; border-top: 2px solid {PINK}">{rows(STD_ROWS, PSUB, PINK, PLINE, 12, 8)}</div>'
                f'<div style="margin-top: auto">{barcode(PINK, 206, 22)}</div></div>'
                + dash +
                f'<div style="position: absolute; left: 0; right: 0; top: {cut}px; bottom: 0; padding: 0 22px; display: flex; align-items: center; justify-content: space-between">'
                f'<div style="display: flex; flex-direction: column; gap: 6px">{mono("ADMIT ONE", 9, PSUB, 3)}{mono("뜯어서 입장해요", 10, PINK, 0, 500, "font-family: " + SANS)}</div>'
                f'<span style="font-family: {SEATF}; font-size: 60px; line-height: .8; color: {PINK}">{D["seat"]}</span></div>')
    return "C · 꼭지 달린 입장권", front, back


def seatmap(cols=20, rws=11, me=(9, 13), aisles=(4, 15), on=ACCENT, off="#CFC4B2", size=7, gap=2.4):
    """뒷면에 찍는 작은 좌석표. 내 자리만 강조색(앱에서 고른 좌석과 같은 색)"""
    cells = []
    for r in range(rws):
        x = 0
        for c in range(cols):
            if c in aisles:
                x += size * 0.8
            fill = on if (r, c) == me else off
            cells.append(f'<rect x="{n(x)}" y="{n(r * (size + gap))}" width="{size}" height="{size}" rx="1.4" fill="{fill}"/>')
            x += size + gap
    w = x
    h = rws * (size + gap)
    return w, h, "".join(cells)


def draft_d(P):
    """D · 내 자리 좌석표: 뒷면에 관 전체 좌석표를 찍고 내 자리 한 칸만 칠한다"""
    path = outline_orig()
    w, h, cells = seatmap()
    sm = (f'<svg width="206" height="{n(h * 206 / w + 20)}" viewBox="-2 -14 {n(w + 4)} {n(h + 16)}" aria-hidden="true" style="display: block">'
          f'<path d="M{n(w * .1)} -6 Q{n(w / 2)} -13 {n(w * .9)} -6" fill="none" stroke="{PINK}" stroke-width="1.2"/>{cells}</svg>')
    front = face(path, BAND, poster_img(P) +
                 f'<div style="position: absolute; left: 16px; right: 16px; top: 376px; border-top: 1.2px solid {BLINE}"></div>'
                 f'<div style="position: absolute; left: 0; right: 0; top: 430px; display: flex; flex-direction: column; align-items: center; gap: 10px">{mono("2026.11.20 (금) 19:30", 10, BTEXT, 2)}{mono(D["theater"] + " · " + D["screen"], 8.5, BSUB, 1.5)}</div>')
    back = face(path, PAPER,
                f'<div style="position: absolute; inset: 0; padding: 30px 22px; display: flex; flex-direction: column">'
                f'<div style="display: flex; justify-content: space-between">{mono("MOVIE MATE", 9, PSUB, 3)}{mono("No. " + D["no"], 9, PSUB, 1)}</div>'
                f'<div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: flex-end">'
                f'<div><div style="font-family: {SERIF}; font-weight: 600; font-size: 28px; letter-spacing: -0.5px; color: {PINK}; line-height: 1.1">{D["title"]}</div><div style="margin-top: 6px">{mono(D["en"], 8.5, PSUB, 2.5)}</div></div>'
                f'<span style="font-family: {SEATF}; font-size: 56px; line-height: .8; color: {ACCENT}">{D["seat"]}</span></div>'
                f'<div style="margin-top: 22px">{sm}</div>'
                f'<div style="margin-top: 6px; text-align: center">{mono("SCREEN ▲ · " + D["dist"], 8.5, PSUB, 2)}</div>'
                f'<div style="margin-top: 14px; border-top: 2px solid {PINK}">{rows([("THEATER", D["theater"]), ("SCREEN", D["screen"]), ("DATE · TIME", "11.20 FRI · 19:30"), ("VIEW", D["view"])], PSUB, PINK, PLINE)}</div>'
                f'<div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end">{mono("SEE BEFORE<br>YOU SIT", 9)}{barcode(PINK)}</div></div>')
    return "D · 내 자리 좌석표", front, back


def sightline(ink, sub, accent, w=206, h=150):
    """상영관 옆 단면: 스크린, 계단 객석, 내 눈에서 스크린 위아래로 가는 선"""
    steps = " ".join(f"L{60 + i * 15},{122 - i * 7} L{75 + i * 15},{122 - i * 7}" for i in range(9))
    ex, ey = 156, 78
    return (f'<svg width="{w}" height="{h}" viewBox="0 0 206 150" aria-hidden="true" style="display: block">'
            f'<rect x="6" y="14" width="4" height="70" rx="2" fill="{ink}"/>'
            f'<path d="M14 130 L60 130 L60 122 {steps} L206 59 L206 130 Z" fill="none" stroke="{sub}" stroke-width="1"/>'
            f'<line x1="{ex}" y1="{ey}" x2="10" y2="14" stroke="{accent}" stroke-width="1.2"/>'
            f'<line x1="{ex}" y1="{ey}" x2="10" y2="84" stroke="{accent}" stroke-width="1.2"/>'
            f'<line x1="{ex}" y1="{ey}" x2="10" y2="{ey}" stroke="{sub}" stroke-width="0.8" stroke-dasharray="2 3"/>'
            f'<circle cx="{ex}" cy="{ey}" r="4" fill="{accent}"/>'
            f'<text x="106" y="40" font-family="IBM Plex Mono" font-size="9" fill="{ink}" letter-spacing="1">{D["fov"]}</text>'
            f'<text x="18" y="146" font-family="IBM Plex Mono" font-size="8" fill="{sub}" letter-spacing="1">SCREEN</text>'
            f'<text x="148" y="146" font-family="IBM Plex Mono" font-size="8" fill="{sub}" letter-spacing="1">{D["seat"]}</text>'
            f'<text x="70" y="{ey - 4}" font-family="IBM Plex Mono" font-size="8" fill="{sub}" letter-spacing="1">{D["dist"]}</text></svg>')


def draft_e(P):
    """E · 시야 단면: 뒷면 가운데에 내 자리에서 본 시야를 옆 단면으로 그린다"""
    path = outline_round(r=14)
    pap = "#F2F1EC"
    front = face(path, INK, poster_img(P) +
                 f'<div style="position: absolute; left: 20px; right: 20px; top: 395px; display: flex; flex-direction: column; gap: 14px">'
                 f'<div style="display: flex; justify-content: space-between; align-items: baseline"><span style="font-family: {SANS}; font-size: 20px; font-weight: 700; color: #F4F4F5">{D["title"]}</span><span style="font-family: {SEATF}; font-size: 32px; line-height: .8; color: #F4F4F5">{D["seat"]}</span></div>'
                 f'<div style="display: flex; justify-content: space-between">{mono("11.20 FRI 19:30", 9, "#A4A4AB", 1.5)}{mono("SUPER PLEX", 9, "#A4A4AB", 1.5)}</div></div>')
    back = face(path, pap,
                f'<div style="position: absolute; inset: 0; padding: 26px 22px; display: flex; flex-direction: column">'
                f'<div style="display: flex; justify-content: space-between">{mono("MOVIE MATE", 8.5, INK, 2, 500)}{mono("No. " + D["no"], 8.5, "#6E6E73", 1)}</div>'
                f'<div style="margin-top: 22px">{sightline(INK, "#A1A1A6", ACCENT)}</div>'
                f'<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid {INK}; border-bottom: 1px solid {INK}">'
                + "".join(f'<div style="padding: 10px 0; display: flex; flex-direction: column; gap: 4px">{mono(k, 8, "#6E6E73", 1)}<span style="font-family: {SANS}; font-size: 17px; font-weight: 700; color: {INK}">{v}</span></div>'
                          for k, v in [("시야각", D["fov"]), ("올려보기", D["up"]), ("스크린까지", D["dist"])]) +
                f'</div>'
                f'<div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: flex-end"><div style="font-family: {SANS}; font-size: 20px; font-weight: 700; color: {INK}; letter-spacing: -0.02em">{D["title"]}</div><span style="font-family: {SEATF}; font-size: 46px; line-height: .8; color: {INK}">{D["seat"]}</span></div>'
                f'<div style="margin-top: 8px">{mono(D["theater"] + " · " + D["screen"] + " · 11.20 19:30", 8.5, "#6E6E73", 0.5, 400, "font-family: " + SANS)}</div>'
                f'<div style="margin-top: auto">{barcode(INK, 206, 18)}</div></div>')
    return "E · 시야 단면", front, back


def draft_f(P):
    """F · 필름 프레임: 양옆 톱니 구멍, 앞면은 필름 한 칸, 뒷면은 필름 바탕"""
    path = outline_film()
    base, amber, fg, sub = "#17130F", BLINE, "#EDE3D4", "#8C7E70"
    edge = lambda side: (f'<div style="position: absolute; top: 0; bottom: 0; {side}: 22px; width: 10px; display: flex; flex-direction: column; justify-content: space-between; padding: 30px 0; box-sizing: border-box; align-items: center">'
                         + "".join(f'<span style="writing-mode: vertical-rl; font-family: {MONO}; font-size: 7px; letter-spacing: 1px; color: {amber}">{t}</span>' for t in ("14A", "▸ 15", "MM 2026", "14A")) + '</div>')
    front = face(path, base, poster_img(P, 34, 330, 34, 182) + edge("left").replace("left: 22px", "left: 20px") + edge("right").replace("right: 22px", "right: 20px") +
                 f'<div style="position: absolute; left: 34px; right: 34px; top: 386px; display: flex; flex-direction: column; gap: 9px">'
                 f'<span style="font-family: {SEATF}; font-size: 40px; line-height: .8; color: {fg}">{D["seat"]}</span>'
                 f'{mono(D["date"], 8.5, fg, 1.5)}{mono("19:30 · SUPER PLEX", 8.5, sub, 1.5)}</div>', evenodd=True)
    back = face(path, base,
                edge("left").replace("left: 22px", "left: 20px") + edge("right").replace("right: 22px", "right: 20px") +
                f'<div style="position: absolute; top: 0; bottom: 0; left: 34px; right: 34px; padding: 30px 0; display: flex; flex-direction: column">'
                f'<div style="display: flex; justify-content: space-between">{mono("REEL 01", 8.5, amber, 2)}{mono("No." + D["no"][-6:], 8.5, sub, 1)}</div>'
                f'<div style="margin-top: 24px; font-family: {SERIF}; font-weight: 600; font-size: 28px; letter-spacing: -0.5px; color: {fg}; line-height: 1.1">{D["title"]}</div>'
                f'<div style="margin-top: 6px">{mono(D["en"], 8, sub, 2)}</div>'
                f'<div style="margin-top: 18px; border-top: 1px solid {amber}; border-bottom: 1px solid {amber}; padding: 10px 0; display: flex; justify-content: space-between; align-items: flex-end">{mono("SEAT", 9, amber, 2)}<span style="font-family: {SEATF}; font-size: 72px; line-height: .8; color: {fg}">{D["seat"]}</span></div>'
                f'<div style="margin-top: 6px">{rows([("THEATER", D["theater"]), ("SCREEN", D["screen"]), ("DATE", "11.20 FRI"), ("TIME", D["time"]), ("VIEW", D["view"]), ("DIST", D["dist"])], sub, fg, "#3A3029", 11.5, 7, 9)}</div>'
                f'<div style="margin-top: auto">{barcode(fg, 182, 18)}</div></div>', evenodd=True)
    return "F · 필름 프레임", front, back


def draft_g(P):
    """G · 감열지: 위아래를 뜯은 흰 감열지, 글자는 전부 고정폭"""
    path = outline_zigzag()
    pap, ink, sub = "#FAFAF7", "#1A1A1A", "#77777C"
    dash = f'<div style="border-top: 1px dashed {ink}; margin: 12px 0"></div>'
    line = lambda k, v: f'<div style="display: flex; justify-content: space-between">{mono(k, 10, sub, 0.5)}{mono(v, 10, ink, 0.5, 500)}</div>'
    front = face(path, pap, poster_img(P, 14, 330, 14, 222).replace("object-fit: cover;", "object-fit: cover; filter: grayscale(1) contrast(1.15);") +
                 f'<div style="position: absolute; left: 14px; right: 14px; top: 358px; display: flex; flex-direction: column; gap: 6px">'
                 f'{mono("*** MOVIE MATE ***", 10, ink, 1, 500, "text-align: center")}'
                 f'<div style="border-top: 1px dashed {ink}; margin: 6px 0"></div>'
                 f'{line("DATE", "2026-11-20 FRI")}{line("TIME", "19:30-22:18")}{line("SEAT", D["seat"])}'
                 f'<div style="border-top: 1px dashed {ink}; margin: 6px 0"></div>'
                 f'{mono(D["theater"] + " " + D["screen"], 9.5, sub, 0, 400, "text-align: center; font-family: " + SANS)}</div>')
    back = face(path, pap,
                f'<div style="position: absolute; inset: 0; padding: 24px 18px; display: flex; flex-direction: column">'
                f'{mono("MOVIE MATE", 11, ink, 3, 500, "text-align: center")}{mono("SEAT VIEW TICKET", 9, sub, 2, 400, "text-align: center; margin-top: 4px")}'
                f'{dash}'
                f'{mono(D["title"], 18, ink, 0, 700, "font-family: " + SANS)}{mono(D["en"], 9, sub, 1, 400, "margin-top: 4px")}'
                f'{dash}'
                f'<div style="display: flex; flex-direction: column; gap: 5px">{line("THEATER", "LOTTE WORLDTOWER")}{line("SCREEN", "SUPER PLEX")}{line("DATE", "2026-11-20 FRI")}{line("TIME", "19:30")}</div>'
                f'{dash}'
                f'<div style="text-align: center">{mono("SEAT", 9, sub, 3)}</div>'
                f'<div style="text-align: center; font-family: {MONO}; font-weight: 500; font-size: 72px; line-height: 1; color: {ink}; letter-spacing: -2px">{D["seat"]}</div>'
                f'{dash}'
                f'<div style="display: flex; flex-direction: column; gap: 5px">{line("VIEW", D["view"])}{line("DISTANCE", D["dist"])}</div>'
                f'<div style="margin-top: auto; display: flex; flex-direction: column; align-items: center; gap: 6px">{barcode(ink, 214, 26)}{mono(D["no"], 9, sub, 3)}</div></div>')
    return "G · 감열지", front, back


def draft_h(P):
    """H · 큰 글자: 앞면은 포스터가 티켓 전체를 채우고, 뒷면은 제목과 좌석이 글자로 꽉 찬다"""
    path = outline_round(r=18)
    front = face(path, INK, poster_img(P, 0, H, 0, W) +
                 f'<div style="position: absolute; left: 0; right: 0; bottom: 0; height: 64px; background: {INK}; padding: 0 18px; display: flex; align-items: center; justify-content: space-between">'
                 f'<div style="display: flex; flex-direction: column; gap: 4px">{mono("11.20 FRI · 19:30", 9, "#F4F4F5", 1.5)}{mono("SUPER PLEX", 8.5, "#A4A4AB", 1.5)}</div>'
                 f'<span style="font-family: {SEATF}; font-size: 40px; line-height: .8; color: #F4F4F5">{D["seat"]}</span></div>')
    pap = "#EFEDE8"
    back = face(path, pap,
                f'<div style="position: absolute; inset: 0; padding: 24px 20px; display: flex; flex-direction: column">'
                f'<div style="display: flex; justify-content: space-between">{mono("MOVIE MATE", 8.5, INK, 2, 500)}{mono("No. " + D["no"], 8.5, "#6E6E73", 1)}</div>'
                f'<div style="margin-top: 14px; font-family: {SERIF}; font-weight: 600; font-size: 74px; letter-spacing: -3px; color: {INK}; line-height: .95">오디<br>세이</div>'
                f'<div style="margin-top: 8px">{mono(D["en"], 8.5, "#6E6E73", 2)}</div>'
                f'<div style="margin-top: auto; display: flex; flex-direction: column; gap: 10px">'
                f'<div style="display: flex; justify-content: space-between">{mono("롯데시네마 월드타워 · 수퍼플렉스관", 9, INK, 0, 500, "font-family: " + SANS)}</div>'
                f'<div style="display: flex; justify-content: space-between">{mono("11.20 FRI 19:30", 9, INK, 1, 400, "white-space: nowrap")}{mono(D["view"] + " · " + D["dist"], 9, "#6E6E73", 0.5, 400, "white-space: nowrap")}</div>'
                f'<div style="border-top: 2px solid {INK}; padding-top: 4px; display: flex; justify-content: space-between; align-items: flex-end">'
                f'<span style="font-family: {SEATF}; font-size: 150px; line-height: .78; color: {INK}; letter-spacing: -3px">{D["seat"]}</span>{barcode(INK, 54, 40)}</div></div></div>')
    return "H · 큰 글자", front, back


def logo(size, body, stub):
    p = ("M18 26 H57 A7 7 0 0 0 71 26 H82 A8 8 0 0 1 90 34 V66 A8 8 0 0 1 82 74 H71 A7 7 0 0 0 57 74 H18 A8 8 0 0 1 10 66 V34 A8 8 0 0 1 18 26 Z")
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 100 100" aria-hidden="true" style="display: block">'
            f'<defs><clipPath id="la{size}{body[1:]}"><rect x="0" y="0" width="62" height="100"/></clipPath><clipPath id="lb{size}{body[1:]}"><rect x="66" y="0" width="40" height="100"/></clipPath></defs>'
            f'<path d="{p}" fill="{body}" clip-path="url(#la{size}{body[1:]})"/><path d="{p}" fill="{stub}" clip-path="url(#lb{size}{body[1:]})"/></svg>')


def draft_i(P):
    """I · 버건디: 새 로고 색을 띠와 세로 꼭지에 쓴다"""
    path = outline_orig()
    front = face(path, BRAND, poster_img(P) +
                 f'<div style="position: absolute; left: 0; right: 0; top: 375px; bottom: 0; padding: 0 20px; display: flex; align-items: center; justify-content: space-between">'
                 f'<div style="display: flex; flex-direction: column; gap: 8px">{mono("2026.11.20 FRI", 10, "#FFFFFF", 1.5)}{mono("19:30 · " + D["screen"], 9, "#E9C4CA", 1, 400, "font-family: " + SANS)}</div>'
                 f'{logo(40, "#FFFFFF", "#DAA3AB")}</div>')
    stub_w = 58
    back = face(path, "#F4F1EC",
                f'<div style="position: absolute; top: 0; bottom: 0; right: 0; width: {stub_w}px; background: {BRAND}; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 34px 0 30px; box-sizing: border-box">'
                f'{logo(30, "#FFFFFF", "#DAA3AB")}<span style="writing-mode: vertical-rl; font-family: {SEATF}; font-size: 54px; line-height: 1; color: #FFFFFF; letter-spacing: 2px">{D["seat"]}</span>{mono("ADMIT ONE", 8, "#E9C4CA", 2, 400, "writing-mode: vertical-rl")}</div>'
                f'<div style="position: absolute; top: 14px; bottom: 14px; right: {stub_w}px; border-left: 1.5px dashed #C9B9B9"></div>'
                f'<div style="position: absolute; top: 0; bottom: 0; left: 0; right: {stub_w + 2}px; padding: 30px 16px 28px 20px; display: flex; flex-direction: column">'
                f'{mono("No. " + D["no"], 8.5, "#857A7A", 1)}'
                f'<div style="margin-top: 22px; font-family: {SERIF}; font-weight: 600; font-size: 28px; letter-spacing: -0.5px; color: {INK}; line-height: 1.1">{D["title"]}</div>'
                f'<div style="margin-top: 6px">{mono(D["en"], 8, "#857A7A", 2)}</div>'
                f'<div style="margin-top: 22px; border-top: 2px solid {BRAND}">{rows([("THEATER", "롯데 월드타워"),("SCREEN", D["screen"]), ("DATE", "11.20 FRI"), ("TIME", D["time"]), ("VIEW", D["view"]), ("DIST", D["dist"])], "#857A7A", INK, "#E2D6D3", 11.5, 7, 9)}</div>'
                f'<div style="margin-top: auto">{barcode(INK, 156, 22)}</div></div>')
    return "I · 버건디 꼭지", front, back


def draft_j(P):
    """J · 상영관 안내판: 뒷면 위쪽은 극장 안내판처럼 검은 판에 관 이름과 좌석"""
    path = outline_round(r=12, notch_y=248, nr=9)
    sign = INK
    front = face(path, sign, poster_img(P, 0, 375) +
                 f'<div style="position: absolute; left: 0; right: 0; top: 375px; bottom: 0; padding: 18px 20px; display: grid; grid-template-columns: 1fr auto; align-content: center; row-gap: 6px; column-gap: 12px">'
                 f'{mono("SCREEN", 8, "#8A8A90", 2)}{mono("SEAT", 8, "#8A8A90", 2, 400, "text-align: right")}'
                 f'<span style="font-family: {SANS}; font-size: 22px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em">수퍼플렉스</span><span style="font-family: {SEATF}; font-size: 40px; line-height: .8; color: #FFFFFF; text-align: right">{D["seat"]}</span>'
                 f'{mono("11.20 FRI 19:30", 9, "#C9C9CE", 1.5, 400, "grid-column: 1 / 3; margin-top: 6px")}</div>')
    back = face(path, "#F5F5F2",
                f'<div style="position: absolute; left: 0; right: 0; top: 0; height: 248px; background: {sign}; padding: 26px 20px 22px; box-sizing: border-box; display: flex; flex-direction: column">'
                f'<div style="display: flex; justify-content: space-between">{mono("MOVIE MATE", 8.5, "#8A8A90", 2)}{mono("No. " + D["no"], 8.5, "#8A8A90", 1)}</div>'
                f'<div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end">'
                f'<div style="display: flex; flex-direction: column; gap: 6px">{mono("SCREEN", 8.5, "#8A8A90", 2)}<span style="font-family: {SANS}; font-size: 24px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.1">수퍼<br>플렉스관</span></div>'
                f'<div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px">{mono("ROW · NO.", 8.5, "#8A8A90", 2)}<span style="font-family: {SEATF}; font-size: 92px; line-height: .8; color: #FFFFFF">{D["seat"]}</span></div></div></div>'
                f'<div style="position: absolute; left: 0; right: 0; top: 248px; bottom: 0; padding: 22px 20px 24px; display: flex; flex-direction: column">'
                f'<div style="font-family: {SANS}; font-size: 20px; font-weight: 700; color: {INK}; letter-spacing: -0.02em">{D["title"]}</div>'
                f'<div style="margin-top: 4px">{mono(D["en"], 8.5, "#6E6E73", 2)}</div>'
                f'<div style="margin-top: 12px">{rows([("THEATER", D["theater"]), ("DATE · TIME", "11.20 FRI · 19:30"), ("VIEW", D["view"]), ("DISTANCE", D["dist"])], "#6E6E73", INK, "#DCDCDF", 11.5, 6, 9)}</div>'
                f'<div style="margin-top: auto">{barcode(INK, 210, 20)}</div></div>')
    return "J · 상영관 안내판", front, back


DRAFTS = [draft_a, draft_b, draft_c, draft_d, draft_e, draft_f, draft_g, draft_h, draft_i, draft_j]


# ── 2라운드: 앞면은 포스터만 (2026-11-20 사용자 지적) ─────────────
# 극장·좌석·시각은 모두 뒷면에 있다. 시안마다 외곽선과 종이만 남기고 포스터가 앞면을 채운다.
def film_edge(side):
    return (f'<div style="position: absolute; top: 0; bottom: 0; {side}: 20px; width: 10px; display: flex; flex-direction: column; justify-content: space-between; padding: 30px 0; box-sizing: border-box; align-items: center">'
            + "".join(f'<span style="writing-mode: vertical-rl; font-family: {MONO}; font-size: 7px; letter-spacing: 1px; color: {BLINE}">{t}</span>' for t in ("14A", "▸ 15", "MM 2026", "14A")) + '</div>')


def poster_front(letter, P):
    full = poster_img(P, 0, H, 0, W)
    if letter == "A":
        return face(outline_round(r=10, notch_y=375, nr=9), "#F5F4F0", full)
    if letter == "B":
        return face(outline_orig(), "#111113", full)
    if letter == "C":
        cut = 408
        return face(outline_round(r=10, notch_y=cut, nr=10), BAND,
                    full + f'<div style="position: absolute; left: 14px; right: 14px; top: {cut}px; border-top: 1.5px dashed rgba(255,255,255,.6)"></div>')
    if letter == "D":
        return face(outline_orig(), BAND, full)
    if letter == "E":
        return face(outline_round(r=14), INK, full)
    if letter == "F":
        return face(outline_film(), "#17130F", poster_img(P, 0, H, 34, 182) + film_edge("left") + film_edge("right"), evenodd=True)
    if letter == "G":
        return face(outline_zigzag(), "#FAFAF7",
                    poster_img(P, 14, H - 28, 14, 222).replace("object-fit: cover;", "object-fit: cover; filter: grayscale(1) contrast(1.15);"))
    if letter == "H":
        return face(outline_round(r=18), INK, full)
    if letter == "I":
        return face(outline_orig(), BRAND, full)
    if letter == "J":
        return face(outline_round(r=12, notch_y=248, nr=9), INK, full)
    raise ValueError(letter)


def round2(fn):
    def draft(P):
        title, _front, back = fn(P)
        letter, rest = title.split(" · ", 1)
        return f"{letter}-1 · {rest}", poster_front(letter, P), back
    return draft


DRAFTS2 = [round2(d) for d in DRAFTS]

CELL_W = 32 + W + 20 + W + 28 + 84 + 32
CELL_H = 32 + 22 + 18 + H + 32 + 18


def cell(fn, P):
    title, front, back = fn(P)
    lab = lambda t: f'<span style="font-size: 12px; color: {STAGE_SUB}">{t}</span>'
    return (f'<section style="width: {CELL_W}px; height: {CELL_H}px; box-sizing: border-box; padding: 32px; border-right: 1px solid {STAGE_LINE}; display: flex; flex-direction: column; gap: 18px">'
            f'<h2 style="margin: 0; font-size: 17px; font-weight: 700; color: {STAGE_FG}">{title}</h2>'
            f'<div style="display: flex; align-items: flex-start; gap: 20px">'
            f'<div style="display: flex; flex-direction: column; gap: 10px">{front}{lab("앞면 · 포스터")}</div>'
            f'<div style="display: flex; flex-direction: column; gap: 10px">{back}{lab("뒷면 · 입장권")}</div>'
            f'<div style="margin-left: 8px; display: flex; flex-direction: column; gap: 10px">{mini(front)}{lab("5번 미니")}</div>'
            f'</div></section>')


def page(title, w, h, cells):
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>{title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&amp;family=Bebas+Neue&amp;family=IBM+Plex+Mono:wght@400;500&amp;family=Hahmlet:wght@600&amp;display=swap" rel="stylesheet">
<style>
body{{margin:0}}
</style>
</helmet>
<div style="width: {w}px; height: {h}px; box-sizing: border-box; padding: 40px; background: {STAGE}; font-family: 'Noto Sans KR', sans-serif; color: {STAGE_FG}">
<div style="display: flex; border-left: 1px solid {STAGE_LINE}; border-top: 1px solid {STAGE_LINE}; border-bottom: 1px solid {STAGE_LINE}">
{cells}
</div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{w},"height":{h}}}}}'>
class Component extends DCLogic {{
renderVals() {{
return {{}};
}}
}}
</script>
</body>
</html>
'''


BW = 80 + 5 * CELL_W + 2
BH = 80 + CELL_H + 2
BOARDS = [("TicketR1.dc.html", "티켓 다듬기 · A~E", DRAFTS[:5]), ("TicketR2.dc.html", "티켓 다듬기 · F~J", DRAFTS[5:])]
BOARDS2 = [("TicketP1.dc.html", "티켓 앞면 포스터만 · A-1~E-1", DRAFTS2[:5]), ("TicketP2.dc.html", "티켓 앞면 포스터만 · F-1~J-1", DRAFTS2[5:])]

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--poster", default=POSTER_BLOB)
    ap.add_argument("--canvas", help="최신 canvas.json (없으면 root/project/canvas.json)")
    a = ap.parse_args()
    proj = os.path.join(a.root, "project")
    os.makedirs(proj, exist_ok=True)
    for fn_name, title, ds in BOARDS + BOARDS2:
        open(os.path.join(proj, fn_name), "w").write(page(title, BW, BH, "\n".join(cell(d, a.poster) for d in ds)))
    idx_path = os.path.join(proj, "canvas.json")
    idx = json.load(open(a.canvas or idx_path))
    y0 = 44140 + 340 + 120  # 로고 작은 판(43600 + 540) 아래, 제목 노트 자리
    for i, (fn_name, title, _) in enumerate(BOARDS):
        idx["boards"][fn_name] = {"x": 0, "y": y0 + i * (BH + 80), "w": BW, "h": BH, "title": title}
        if fn_name not in idx["order"]:
            idx["order"].append(fn_name)
    idx["notes"]["t16"] = {"x": 0, "y": y0 - 340, "text": "티켓 다듬기 — 모던 · 간지 · 깔끔, 시안 10종", "kind": "title1", "maxW": BW}
    idx["notes"]["g16"] = {"x": BW + 80, "y": y0, "w": 380, "size": "m", "fill": "orange",
                           "text": "칸마다 보는 법\n· 왼쪽부터 = 앞면(포스터), 뒷면(입장권), 5번 시야 화면의 미니 티켓\n· 모두 실제 크기(250×520, 미니 84)이고 4·5번처럼 어두운 바탕에 놓았어요\n· 영화·극장·좌석·시각은 예시예요(포스터는 확인용 오디세이)"}
    # 2라운드: 1라운드 두 보드 아래
    y1 = y0 + 2 * (BH + 80) + 120 + 340 + 120
    for i, (fn_name, title, _) in enumerate(BOARDS2):
        idx["boards"][fn_name] = {"x": 0, "y": y1 + i * (BH + 80), "w": BW, "h": BH, "title": title}
        if fn_name not in idx["order"]:
            idx["order"].append(fn_name)
    idx["notes"]["t17"] = {"x": 0, "y": y1 - 340, "text": "티켓 앞면은 포스터만 — 극장 · 좌석 · 시각은 모두 뒷면으로", "kind": "title1", "maxW": BW}
    idx["notes"]["g17"] = {"x": BW + 80, "y": y1, "w": 380, "size": "m", "fill": "orange",
                           "text": "바뀐 것\n· 앞면: 띠와 글자를 빼고 포스터가 티켓 전체를 채워요. 시안마다 외곽선·종이만 남겼어요\n· 뒷면: 1라운드 그대로. F에는 극장 줄을 더했어요\n· 포스터는 2:3이라 앞면(250×520)에 꽉 채우면 양옆이 약 14%씩 잘려요"}
    json.dump(idx, open(idx_path, "w"), ensure_ascii=False, indent=1)
    print("ok", BW, BH)
