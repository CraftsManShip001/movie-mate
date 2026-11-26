"""휴대폰 3D 시야 화면(5번) 다듬기 시안 4종(ViewerMA~MD) 캔버스 보드를 만든다.

쓰는 법: python3 design/tools/gen_viewer_mobile.py <캔버스 root>   (root 아래 project/ 에 쓴다)

보드 한 장 = 휴대폰 390×844 세 장(처음 들어왔을 때, 좌석표 열었을 때, 키 바꿀 때 / C는 3D 크게 볼 때).
배경 3D 장면은 개발 서버의 메가박스 해운대(장산) 더! 넓은 리클라이너 1관 E열 2번을 390×844·600·470 높이로 찍어
캔버스 자산으로 올린 것이고, 홀로그램도 같은 화면에서 찍었다.
"""
import json
import sys
from pathlib import Path

ROOT = Path(sys.argv[1]) / "project"
DATA = Path(__file__).resolve().parents[2] / "data/theaters/megabox-haeundae-jangsan/seatmaps/hall-1.json"

IMG = {
    844: "/_blob/8d546723d4f1bfa556d2e7e91ad22e6e",
    600: "/_blob/ef4f5addecde0a3d7ded7d84616429ea",
    470: "/_blob/bb15401a7dca8c83bceb00903efd8dba",
    "holo": "/_blob/8a0f75505df3ebaae052cdba015a325f",
}

# DESIGN.md 색(시야 화면은 항상 어둡다)
STAGE, INK, SUB, HAIR, ACC, HOLO = "#0C0C0D", "#F3F3F4", "#9C9CA3", "#2A2A2E", "#E5432F", "#7FE3FF"
SEAT = "#3A3A3F"
FONT = "'Noto Sans KR', -apple-system, sans-serif"
CREDIT = "영상: Spring (c) Blender Foundation, CC BY 4.0"
TITLE = "1관 · E열 2번"
SHADOW = "text-shadow: 0 1px 3px rgba(0,0,0,0.9)"

PW, PH = 390, 844


# ---------- 아이콘(선 아이콘) ----------
def svg(body, size=22, sw=1.8):
    return (
        f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" aria-hidden="true" style="display: block; flex: none">'
        f'<g fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>'
    )


IC = {
    "back": '<path d="M15 5l-7 7 7 7"></path>',
    "ext": '<path d="M9 6h9v9M18 6L7 17"></path>',
    "seats": '<rect x="3" y="5" width="5" height="5" rx="1.2"></rect><rect x="10" y="5" width="5" height="5" rx="1.2"></rect><rect x="17" y="5" width="4" height="5" rx="1.2"></rect>'
    '<rect x="3" y="13" width="5" height="5" rx="1.2"></rect><rect x="10" y="13" width="5" height="5" rx="1.2"></rect><rect x="17" y="13" width="4" height="5" rx="1.2"></rect>',
    "height": '<circle cx="9" cy="5" r="2"></circle><path d="M9 8v8M6 11h6M9 16l-2 5M9 16l2 5"></path><path d="M18 3v18M16 5l2-2 2 2M16 19l2 2 2-2"></path>',
    "heads": '<circle cx="12" cy="8" r="3.5"></circle><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5"></path>',
    "recline": '<path d="M5 4l3 10h9l2 5"></path><path d="M8 14l-1 6M15 14v6"></path><path d="M17 14l3-3"></path>',
    "sliders": '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"></path><circle cx="16" cy="7" r="2"></circle><circle cx="10" cy="17" r="2"></circle>',
    "close": '<path d="M6 6l12 12M18 6L6 18"></path>',
    "expand": '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"></path>',
    "drag": '<path d="M4 12h16M7 9l-3 3 3 3M17 9l3 3-3 3"></path>',
    "chev": '<path d="M9 5l7 7-7 7"></path>',
    "up": '<path d="M6 15l6-6 6 6"></path>',
}


def icon(name, size=22, sw=1.8):
    return svg(IC[name], size, sw)


# ---------- 부품 ----------
def bg(h, top=0, height=None):
    """3D 장면 사진. height 만큼 보이고 넘치면 잘린다"""
    height = height or h
    return (
        f'<img src="{IMG[h]}" alt="" style="position: absolute; left: 0; top: {top}px; width: {PW}px; height: {height}px; '
        f'object-fit: cover; object-position: center top; display: block">'
    )


def header(booking="outline"):
    if booking == "outline":
        right = (
            f'<a href="#" style="height: 36px; padding: 0 12px 0 14px; display: flex; align-items: center; gap: 4px; border-radius: 10px; '
            f'border: 1px solid rgba(255,255,255,0.32); color: {INK}; font-size: 15px; text-decoration: none; background: rgba(12,12,13,0.35)">'
            f'예매{icon("ext", 16)}</a>'
        )
    else:
        right = ""
    return (
        f'<div style="position: absolute; left: 0; top: 54px; width: {PW}px; height: 52px; display: flex; align-items: center; '
        f'justify-content: space-between; padding: 0 20px 0 8px; box-sizing: border-box">'
        f'<div style="display: flex; align-items: center; gap: 2px">'
        f'<button aria-label="뒤로" style="width: 44px; height: 44px; border: 0; background: none; color: {INK}; display: flex; align-items: center; justify-content: center; padding: 0">{icon("back", 24, 2)}</button>'
        f'<span style="font-size: 17px; font-weight: 700; color: {INK}; {SHADOW}">{TITLE}</span></div>'
        f"{right}</div>"
    )


def drag_hint(y):
    return (
        f'<div style="position: absolute; left: 0; top: {y}px; width: {PW}px; display: flex; flex-direction: column; align-items: center; gap: 6px; color: {INK}">'
        f'<div style="opacity: 0.95; {SHADOW}">{icon("drag", 30, 1.6)}</div>'
        f'<span style="font-size: 15px; font-weight: 500; {SHADOW}">끌어서 둘러보기</span></div>'
    )


def holo(x, y, w, label=True, label_side="below"):
    h = round(w * 140 / 150)
    lab = ""
    if label:
        if label_side == "below":
            lab = f'<span style="position: absolute; left: {x + 8}px; top: {y + h - 6}px; font-size: 12px; font-weight: 700; color: {HOLO}; {SHADOW}">목 편해요</span>'
        else:
            lab = f'<span style="position: absolute; left: {x + w - 6}px; top: {y + h - 30}px; font-size: 12px; font-weight: 700; color: {HOLO}; {SHADOW}">목 편해요</span>'
    return f'<img src="{IMG["holo"]}" alt="" style="position: absolute; left: {x}px; top: {y}px; width: {w}px; height: {h}px">{lab}'


def credit(y, color=SUB):
    return f'<p style="position: absolute; left: 20px; top: {y}px; margin: 0; font-size: 12px; color: {color}; white-space: nowrap; {SHADOW}">{CREDIT}</p>'


def grabber(y):
    return f'<div style="position: absolute; left: {PW / 2 - 18}px; top: {y}px; width: 36px; height: 4px; border-radius: 2px; background: #3A3A3F"></div>'


def seat_map(x, y, w, cell_h=14, gap=4, labels=True, selected=("E", 0)):
    data = json.loads(DATA.read_text())
    lab_w = 16 if labels else 0
    unit = (w - lab_w) / 20
    parts = []
    yy = y
    aisles = set(data.get("crossAisleAfterRows", []))
    for ri, row in enumerate(data["rows"]):
        spans = row.get("spans")
        if not spans:
            spans = [[i, 1] for i, c in enumerate(row["cells"]) if c != "."]
        if labels:
            parts.append(
                f'<span style="position: absolute; left: {x}px; top: {yy - 2}px; width: {lab_w}px; font-size: 11px; line-height: {cell_h + 4}px; color: {SUB}">{row["label"]}</span>'
            )
        for si, (start, span) in enumerate(spans):
            on = row["label"] == selected[0] and si == selected[1]
            parts.append(
                f'<div style="position: absolute; left: {x + lab_w + start * unit + 1:.1f}px; top: {yy}px; width: {span * unit - gap / 2 - 1:.1f}px; '
                f'height: {cell_h}px; border-radius: 3px 3px 1px 1px; background: {ACC if on else SEAT}"></div>'
            )
        yy += cell_h + gap
        if ri in aisles:
            yy += cell_h * 0.7
    return "".join(parts), yy - y


def screen_line(x, y, w):
    return (
        f'<svg width="{w}" height="14" viewBox="0 0 {w} 14" aria-hidden="true" style="position: absolute; left: {x}px; top: {y}px">'
        f'<path d="M4 12 Q {w / 2} 0 {w - 4} 12" fill="none" stroke="{SUB}" stroke-width="2" stroke-linecap="round"></path></svg>'
    )


def slider(x, y, w, value=166):
    pct = (value - 120) / 80
    return (
        f'<div style="position: absolute; left: {x}px; top: {y}px; width: {w}px">'
        f'<div style="display: flex; justify-content: space-between; align-items: baseline">'
        f'<span style="font-size: 15px; color: {SUB}">내 키</span>'
        f'<span style="font-size: 28px; font-weight: 700; color: {INK}">{value}cm</span></div>'
        f'<div style="position: relative; height: 44px; margin-top: 8px">'
        f'<div style="position: absolute; left: 0; right: 0; top: 20px; height: 4px; border-radius: 2px; background: #3A3A3F"></div>'
        f'<div style="position: absolute; left: 0; width: {pct * 100:.1f}%; top: 20px; height: 4px; border-radius: 2px; background: {INK}"></div>'
        f'<div style="position: absolute; left: calc({pct * 100:.1f}% - 12px); top: 10px; width: 24px; height: 24px; border-radius: 12px; background: {INK}"></div></div>'
        f'<div style="display: flex; justify-content: space-between; font-size: 12px; color: {SUB}"><span>120cm</span><span>200cm</span></div></div>'
    )


def tool(name, label, active=False, w=None):
    color = INK if active else SUB
    width = f"width: {w}px;" if w else "flex: 1;"
    return (
        f'<button style="{width} height: 56px; border: 0; background: none; color: {color}; display: flex; flex-direction: column; '
        f'align-items: center; justify-content: center; gap: 4px; padding: 0; font-family: inherit">'
        f'{icon(name, 22)}<span style="font-size: 12px; font-weight: {700 if active else 500}">{label}</span></button>'
    )


def toolbar(y, active=None):
    tools = [("seats", "좌석표"), ("height", "키 166"), ("heads", "앞사람"), ("recline", "눕기")]
    inner = "".join(tool(n, l, active == n) for n, l in tools)
    return (
        f'<div style="position: absolute; left: 0; top: {y}px; width: {PW}px; height: {PH - y}px; background: {STAGE}; border-top: 1px solid {HAIR}">'
        f'<div style="display: flex; padding: 6px 8px 0">{inner}</div>'
        f'<p style="margin: 2px 0 0; text-align: center; font-size: 12px; color: {SUB}">{CREDIT}</p></div>'
    )


def sheet(y, h, inner, close_label=None):
    head = ""
    if close_label:
        head = (
            f'<div style="position: absolute; left: 20px; top: 18px; right: 8px; display: flex; justify-content: space-between; align-items: center">'
            f'<span style="font-size: 17px; font-weight: 700; color: {INK}">{close_label}</span>'
            f'<button aria-label="닫기" style="width: 44px; height: 44px; border: 0; background: none; color: {SUB}; display: flex; align-items: center; justify-content: center; padding: 0">{icon("close", 20)}</button></div>'
        )
    return (
        f'<div style="position: absolute; left: 0; top: {y}px; width: {PW}px; height: {h}px; background: {STAGE}; border-radius: 20px 20px 0 0; border-top: 1px solid {HAIR}; overflow: hidden">'
        f'{grabber(8).replace("position: absolute; left", "position: absolute; left")}{head}{inner}</div>'
    )


def round_btn(name, label, x, y, size=48, active=False):
    bgc = INK if active else "rgba(12,12,13,0.62)"
    fg = STAGE if active else INK
    return (
        f'<button aria-label="{label}" style="position: absolute; left: {x}px; top: {y}px; width: {size}px; height: {size}px; border-radius: {size / 2}px; '
        f'border: 1px solid rgba(255,255,255,0.16); background: {bgc}; color: {fg}; display: flex; align-items: center; justify-content: center; padding: 0">{icon(name, 22)}</button>'
    )


# ---------- 시안 ----------
def variant_a():
    """A · 아래 서랍: 맨 아래 도구 막대, 누르면 서랍이 올라오고 3D 는 남은 높이로 줄어든다"""
    bar = PH - 104
    p1 = bg(844, 0, bar) + header() + drag_hint(560) + holo(12, bar - 120, 112) + toolbar(bar)
    # 좌석표: 3D 0~430, 서랍 430~bar
    top = 430
    sm, smh = seat_map(20, top + 56, PW - 40, cell_h=16, gap=5)
    p2 = (
        bg(470, 0, top + 20) + header() + holo(8, top - 92, 84, label=False)
        + f'<div style="position: absolute; left: 0; top: {top}px; width: {PW}px; height: {bar - top}px; background: {STAGE}; border-radius: 20px 20px 0 0; border-top: 1px solid {HAIR}">{grabber(8)}</div>'
        + screen_line(70, top + 28, PW - 140) + sm
        + toolbar(bar, "seats")
    )
    top3 = 560
    p3 = (
        bg(600, 0, top3 + 20) + header() + holo(8, top3 - 108, 100)
        + f'<div style="position: absolute; left: 0; top: {top3}px; width: {PW}px; height: {bar - top3}px; background: {STAGE}; border-radius: 20px 20px 0 0; border-top: 1px solid {HAIR}">{grabber(8)}</div>'
        + slider(20, top3 + 26, PW - 40)
        + toolbar(bar, "height")
    )
    return [("처음 들어왔을 때", p1), ("좌석표 열었을 때", p2), ("키 바꿀 때", p3)]


def rail(x, y, active=None, gap=12):
    items = [("seats", "좌석표"), ("height", "키 166cm"), ("heads", "앞사람 끄기"), ("recline", "눕기")]
    out = []
    for i, (n, l) in enumerate(items):
        out.append(round_btn(n, l, x, y + i * (48 + gap), active=active == n))
    return "".join(out)


def variant_b():
    """B · 오른쪽 레일: 엄지 닿는 오른쪽 세로 버튼. 패널은 스크린 아래 객석 자리에만 뜬다"""
    rx, ry = PW - 20 - 48, 560
    p1 = bg(844) + header() + drag_hint(600 - 70) + holo(8, 640, 150) + rail(rx, ry) + credit(PH - 34)
    # 좌석표: 스크린(약 y 310~515) 아래 객석 자리에 지도를 띄운다
    px, py, pw_, ph_ = 16, 540, PW - 16 - 16 - 48 - 12, 248
    sm, _ = seat_map(px + 14, py + 40, pw_ - 28, cell_h=14, gap=5)
    p2 = (
        bg(844) + header()
        + f'<div style="position: absolute; left: {px}px; top: {py}px; width: {pw_}px; height: {ph_}px; border-radius: 16px; background: rgba(12,12,13,0.92); border: 1px solid {HAIR}"></div>'
        + screen_line(px + 40, py + 16, pw_ - 80) + sm
        + rail(rx, ry, "seats") + credit(PH - 34)
    )
    # 키: 레일의 키 버튼이 위로 길게 늘어나 세로 슬라이더가 된다
    sx, sy, sh = rx, 300, 300
    knob = sy + sh * (1 - (166 - 120) / 80)
    p3 = (
        bg(844) + header() + holo(8, 640, 150)
        + f'<div style="position: absolute; left: {sx}px; top: {sy}px; width: 48px; height: {sh + 48}px; border-radius: 24px; background: rgba(12,12,13,0.92); border: 1px solid {HAIR}"></div>'
        + f'<div style="position: absolute; left: {sx + 22}px; top: {sy + 24}px; width: 4px; height: {sh - 24}px; border-radius: 2px; background: #3A3A3F"></div>'
        + f'<div style="position: absolute; left: {sx + 22}px; top: {knob}px; width: 4px; height: {sy + sh - knob}px; border-radius: 2px; background: {INK}"></div>'
        + f'<div style="position: absolute; left: {sx + 12}px; top: {knob - 12}px; width: 24px; height: 24px; border-radius: 12px; background: {INK}"></div>'
        + f'<span style="position: absolute; left: {sx - 104}px; top: {knob - 20}px; width: 92px; text-align: right; font-size: 28px; font-weight: 700; color: {INK}; {SHADOW}">166</span>'
        + f'<span style="position: absolute; left: {sx - 104}px; top: {knob + 16}px; width: 92px; text-align: right; font-size: 12px; color: {SUB}; {SHADOW}">cm</span>'
        + round_btn("height", "키 166cm", rx, sy + sh, active=True)
        + "".join(round_btn(n, l, rx, sy + sh + 60 * (i + 1)) for i, (n, l) in enumerate([("heads", "앞사람 끄기"), ("recline", "눕기")]))
        + round_btn("seats", "좌석표", rx, sy - 60)
        + credit(PH - 34)
    )
    return [("처음 들어왔을 때", p1), ("좌석표 열었을 때", p2), ("키 바꿀 때", p3)]


def chips_row(y, active=None):
    items = [("height", "키 166cm"), ("heads", "앞사람"), ("recline", "눕기")]
    out = []
    for n, l in items:
        on = active == n
        out.append(
            f'<button style="height: 40px; padding: 0 14px 0 12px; border: 0; border-radius: 10px; background: {INK if on else "#1E1E21"}; color: {STAGE if on else INK}; '
            f'display: flex; align-items: center; gap: 6px; font-size: 15px; font-family: inherit">{icon(n, 18)}{l}</button>'
        )
    return f'<div style="position: absolute; left: 20px; top: {y}px; display: flex; gap: 8px">{"".join(out)}</div>'


def variant_c():
    """C · 위아래 나눔: 위는 3D, 아래는 늘 보이는 좌석표. 다른 자리를 바로 눌러 비교한다"""
    split = 470
    sm, smh = seat_map(20, split + 52, PW - 40, cell_h=15, gap=5)
    lower = (
        f'<div style="position: absolute; left: 0; top: {split}px; width: {PW}px; height: {PH - split}px; background: {STAGE}; border-top: 1px solid {HAIR}"></div>'
        + screen_line(70, split + 24, PW - 140) + sm
    )
    expand = (
        f'<button aria-label="3D 크게 보기" style="position: absolute; right: 16px; top: {split - 56}px; width: 40px; height: 40px; border-radius: 10px; '
        f'border: 0; background: rgba(12,12,13,0.6); color: {INK}; display: flex; align-items: center; justify-content: center; padding: 0">{icon("expand", 20)}</button>'
    )
    p1 = (
        bg(470, 0, split) + header() + drag_hint(250) + holo(6, split - 104, 96, label_side="right") + expand
        + lower + chips_row(split + 52 + smh + 14) + credit(PH - 34)
    )
    # 3D 크게: 좌석표를 접으면 아래에 고른 자리 한 줄만 남는다
    p2 = (
        bg(844, 0, PH - 92) + header() + holo(8, PH - 92 - 130, 120)
        + f'<button style="position: absolute; left: 0; top: {PH - 92}px; width: {PW}px; height: 92px; border: 0; border-top: 1px solid {HAIR}; background: {STAGE}; '
        f'display: flex; align-items: flex-start; justify-content: space-between; padding: 18px 20px 0; box-sizing: border-box; font-family: inherit; color: {INK}">'
        f'<span style="font-size: 15px; font-weight: 500">좌석표 펼치기</span>{icon("up", 22)}</button>'
        + credit(PH - 34)
    )
    # 키: 키를 바꾸는 동안은 아래 칸이 좌석표 대신 슬라이더가 된다
    p3 = (
        bg(470, 0, split) + header() + holo(6, split - 104, 96, label_side="right") + expand
        + f'<div style="position: absolute; left: 0; top: {split}px; width: {PW}px; height: {PH - split}px; background: {STAGE}; border-top: 1px solid {HAIR}"></div>'
        + chips_row(split + 24, "height")
        + f'<div style="position: absolute; left: 0; top: {split + 88}px; width: {PW}px; height: 1px; background: {HAIR}"></div>'
        + slider(20, split + 116, PW - 40)
        + credit(PH - 34)
    )
    return [("처음 들어왔을 때", p1), ("3D 크게 볼 때", p2), ("키 바꿀 때", p3)]


def list_row(label, value=None, toggle=None, chevron=False):
    right = ""
    if value:
        right += f'<span style="font-size: 15px; color: {SUB}">{value}</span>'
    if chevron:
        right += f'<span style="color: {SUB}">{icon("chev", 18)}</span>'
    if toggle is not None:
        on = toggle
        right += (
            f'<span style="width: 48px; height: 28px; border-radius: 14px; background: {INK if on else "#3A3A3F"}; position: relative; display: block">'
            f'<span style="position: absolute; top: 3px; left: {23 if on else 3}px; width: 22px; height: 22px; border-radius: 11px; background: {STAGE if on else INK}"></span></span>'
        )
    return (
        f'<button {"aria-pressed=\"true\" " if toggle else ""}style="width: 100%; height: 56px; border: 0; background: none; display: flex; align-items: center; justify-content: space-between; '
        f'padding: 0 20px; box-sizing: border-box; font-family: inherit; color: {INK}; font-size: 17px">'
        f'<span>{label}</span><span style="display: flex; align-items: center; gap: 6px">{right}</span></button>'
    )


def variant_d():
    """D · 버튼 하나: 장면 위엔 설정 버튼 하나만. 누르면 모든 조절이 한 서랍에 목록으로 모인다"""
    p1 = (
        bg(844) + header() + drag_hint(560) + holo(8, PH - 196, 150)
        + f'<button aria-label="보기 설정" style="position: absolute; right: 20px; top: {PH - 104}px; width: 56px; height: 56px; border-radius: 28px; '
        f'border: 0; background: {INK}; color: {STAGE}; display: flex; align-items: center; justify-content: center; padding: 0">{icon("sliders", 24, 2)}</button>'
        + credit(PH - 34)
    )
    top = 360
    sm, smh = seat_map(20, top + 60, PW - 40, cell_h=13, gap=4)
    rows_y = top + 60 + smh + 12
    p2 = (
        bg(470, 0, top + 20) + header() + holo(6, top - 92, 84, label=False)
        + f'<div style="position: absolute; left: 0; top: {top}px; width: {PW}px; height: {PH - top}px; background: {STAGE}; border-radius: 20px 20px 0 0; border-top: 1px solid {HAIR}">{grabber(8)}</div>'
        + screen_line(70, top + 30, PW - 140) + sm
        + f'<div style="position: absolute; left: 0; top: {rows_y}px; width: {PW}px; border-top: 1px solid {HAIR}">'
        + list_row("내 키", "166cm", chevron=True) + list_row("앞사람 보기", toggle=True) + list_row("눕기", toggle=False)
        + "</div>"
        + credit(PH - 30)
    )
    top3 = 560
    p3 = (
        bg(600, 0, top3 + 20) + header() + holo(8, top3 - 108, 100)
        + f'<div style="position: absolute; left: 0; top: {top3}px; width: {PW}px; height: {PH - top3}px; background: {STAGE}; border-radius: 20px 20px 0 0; border-top: 1px solid {HAIR}">{grabber(8)}'
        + f'<button aria-label="뒤로" style="position: absolute; left: 8px; top: 20px; width: 44px; height: 44px; border: 0; background: none; color: {INK}; display: flex; align-items: center; justify-content: center; padding: 0">{icon("back", 22, 2)}</button>'
        + "</div>"
        + slider(20, top3 + 70, PW - 40)
        + credit(PH - 30)
    )
    return [("처음 들어왔을 때", p1), ("설정 열었을 때", p2), ("키 바꿀 때", p3)]


VARIANTS = {
    "A": ("A · 아래 서랍", variant_a),
    "B": ("B · 오른쪽 레일", variant_b),
    "C": ("C · 위아래 나눔", variant_c),
    "D": ("D · 버튼 하나", variant_d),
}


def phone(x, y, inner):
    return (
        f'<div style="position: absolute; left: {x}px; top: {y}px; width: {PW}px; height: {PH}px; border-radius: 48px; overflow: hidden; '
        f'background: {STAGE}; box-shadow: 0 0 0 1px #D9D9DC">{inner}</div>'
    )


def caption(x, y, text):
    return f'<p style="position: absolute; left: {x}px; top: {y}px; margin: 0; font-size: 15px; font-weight: 500; color: #6E6E73">{text}</p>'


def board(key):
    title, fn = VARIANTS[key]
    screens = fn()
    W = 40 + PW * 3 + 40 * 2 + 40
    H = 40 + 36 + PH + 40
    body = ""
    for i, (cap, inner) in enumerate(screens):
        x = 40 + i * (PW + 40)
        body += caption(x, 40, cap) + phone(x, 76, inner)
    html = f"""<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>{title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&amp;display=swap" rel="stylesheet">
<style>
body{{margin:0}}
*{{word-break:keep-all}}
button{{font-family:inherit;cursor:pointer}}
</style>
</helmet>
<div style="width: {W}px; height: {H}px; position: relative; background: #FFFFFF; font-family: {FONT}; font-variant-numeric: tabular-nums">
{body}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{W},"height":{H}}}}}'>class Component extends DCLogic {{
renderVals() {{ return {{}}; }}
}}</script>
</body>
</html>
"""
    (ROOT / f"ViewerM{key}.dc.html").write_text(html)
    return W, H


if __name__ == "__main__":
    ROOT.mkdir(parents=True, exist_ok=True)
    keys = sys.argv[2:] or list(VARIANTS)
    print(json.dumps({k: board(k) for k in keys}))
