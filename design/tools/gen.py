#!/usr/bin/env python3
"""movie mate 시안 생성기: 극장 고르기(Home A~D), 좌석·시야(Seat A~D)."""
import json, os, sys
from datetime import datetime, timezone

ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', 'canvas')
P = os.path.join(ROOT, 'project')
os.makedirs(P, exist_ok=True)

FONT = "'Noto Sans KR', -apple-system, sans-serif"
L = dict(bg='#FFFFFF', ink='#111111', sub='#6B6B70', hair='#EAEAEA', btn='#F2F2F3', seat='#DEDEE2', frame='#E2E2E2')
D = dict(bg='#0C0C0D', ink='#F3F3F4', sub='#9C9CA3', hair='#242427', btn='#1F1F22', seat='#34343A', frame='#0C0C0D')
ACC = '#FF5A1F'
BIG, BODY, SMALL = 30, 16, 13

BW, BH = 1520, 1904
DESK = (1440, 900)
PH = (390, 844)

# 예시 데이터 (실측 아님)
THEATERS = [
    ('용산', [('CGV 용산아이파크몰', '22관', 'IMAX · 4DX · SCREENX'), ('롯데시네마 용산', '8관', '')]),
    ('영등포', [('CGV 영등포', '12관', 'SCREENX · 4DX'), ('롯데시네마 영등포', '7관', ''), ('CGV 여의도', '7관', '4DX')]),
    ('강남', [('메가박스 코엑스', '20관', 'Dolby Cinema'), ('CGV 청담씨네시티', '6관', '4DX')]),
]
HALLS = [('IMAX관', '624석'), ('4DX관', '[좌석 수]'), ('SCREENX관', '[좌석 수]'), ('골드클래스', '[좌석 수]'), ('1관', '[좌석 수]'), ('2관', '[좌석 수]'), ('3관', '[좌석 수]')]
FORMATS = [('IMAX', '1곳'), ('Dolby Cinema', '1곳'), ('SCREENX', '2곳'), ('4DX', '4곳'), ('일반관', '7곳')]
FOURDX = ['CGV 용산아이파크몰', 'CGV 영등포', 'CGV 여의도', 'CGV 청담씨네시티']
METRICS = [('52°', '시야각'), ('14°', '올려보기'), ('18.4m', '스크린까지')]


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;')


def doc(title, inner, w, h):
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>{esc(title)}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&amp;display=swap" rel="stylesheet">
<style>
body{{margin:0}}
button{{font-family:inherit}}
</style>
</helmet>
<div style="width: {w}px; height: {h}px; position: relative; background: #FFFFFF; font-family: {FONT}; font-variant-numeric: tabular-nums">
{inner}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{w},"height":{h}}}}}'>
class Component extends DCLogic {{
renderVals() {{ return {{}}; }}
}}
</script>
</body>
</html>
'''


# ---------- 부품 ----------
def chev(t, d='left', size=22):
    pts = '15 5 8 12 15 19' if d == 'left' else '9 5 16 12 9 19'
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{t["ink"]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="{pts}"></polyline></svg>'


def arrow(t):
    return f'<span style="color: {t["sub"]}; font-size: {BODY}px">›</span>'


def iconbtn(t, label, d='left'):
    return f'<button aria-label="{label}" style="width: 44px; height: 44px; border: 0; background: none; padding: 0; display: flex; align-items: center; justify-content: center; cursor: pointer">{chev(t, d)}</button>'


def gbtn(t, text):
    return f'<button style="height: 36px; padding: 0 14px; border: 0; border-radius: 10px; background: {t["btn"]}; color: {t["ink"]}; font-size: {SMALL}px; font-weight: 500; cursor: pointer">{text}</button>'


def primary(t, text, w='100%'):
    return f'<button style="width: {w}; height: 54px; border: 0; border-radius: 14px; background: {t["ink"]}; color: {t["bg"]}; font-size: {BODY}px; font-weight: 700; cursor: pointer">{text}</button>'


def big(t, text, size=BIG):
    return f'<div style="font-size: {size}px; font-weight: 700; color: {t["ink"]}; letter-spacing: -0.02em; line-height: 1.25">{text}</div>'


def body(t, text, weight=400, color=None):
    return f'<span style="font-size: {BODY}px; font-weight: {weight}; color: {color or t["ink"]}">{text}</span>'


def small(t, text):
    return f'<span style="font-size: {SMALL}px; color: {t["sub"]}">{text}</span>'


def hr(t):
    return f'<div style="height: 1px; background: {t["hair"]}"></div>'


def metrics(t, on_dark=False, gap=32):
    ink = '#F3F3F4' if on_dark else t['ink']
    sub = '#A4A4AB' if on_dark else t['sub']
    items = ''.join(
        f'<div style="display: flex; flex-direction: column; gap: 2px; white-space: nowrap"><span style="font-size: {BODY}px; font-weight: 700; color: {ink}">{v}</span><span style="font-size: {SMALL}px; color: {sub}">{k}</span></div>'
        for v, k in METRICS)
    return f'<div style="display: flex; gap: {gap}px">{items}</div>'


def row(t, left, right, h=60, pad=20):
    return f'<a href="#" style="display: flex; align-items: center; justify-content: space-between; min-height: {h}px; padding: 0 {pad}px; text-decoration: none; border-bottom: 1px solid {t["hair"]}">{left}<span style="display: flex; align-items: center; gap: 10px">{right}</span></a>'


def section_head(t, title, value, pad=20):
    return f'<div style="display: flex; align-items: baseline; gap: 8px; padding: 28px {pad}px 8px">{body(t, title, 700)}{small(t, value)}</div>'


SVG_N = [0]


def view(w, h, heads=True, aspect=1.43):
    """좌석 시야(항상 어두운 장면). 평평한 면으로만 그린다."""
    SVG_N[0] += 1
    u = f'v{SVG_N[0]}'
    sw = 1000
    sh = sw / aspect * 0.78
    x0, x1 = 800 - sw / 2, 800 + sw / 2
    top, bot = 70, 70 + sh
    scr = f'{x0+30},{top} {x1-30},{top} {x1},{bot} {x0},{bot}'
    seats = ''.join(f'<rect x="{x}" y="770" width="118" height="160" rx="22" fill="#18181B"></rect>' for x in range(-40, 1640, 132))
    hd = ''
    if heads:
        for cx in (430, 760, 1090):
            hd += f'<path d="M{cx-120} 900 C{cx-110} 800 {cx+110} 800 {cx+120} 900 Z" fill="#060607"></path><ellipse cx="{cx}" cy="742" rx="52" ry="64" fill="#060607"></ellipse>'
    return f'''<svg role="img" aria-label="J열 14번에서 본 스크린" width="{w}" height="{h}" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid {'slice' if w / h >= 1.3 else 'meet'}" style="display: block; background: #0A0A0B">
<defs><clipPath id="{u}"><polygon points="{scr}"></polygon></clipPath></defs>
<rect width="1600" height="900" fill="#0A0A0B"></rect>
<polygon points="0,0 {x0-40},40 {x0-60},{bot+40} 0,900" fill="#111113"></polygon>
<polygon points="1600,0 {x1+40},40 {x1+60},{bot+40} 1600,900" fill="#111113"></polygon>
<g clip-path="url(#{u})">
<rect x="0" y="0" width="1600" height="900" fill="#9FB1C3"></rect>
<circle cx="1050" cy="{top+sh*0.42}" r="46" fill="#EADCB2"></circle>
<polygon points="{x0},{top+sh*0.62} 420,{top+sh*0.44} 640,{top+sh*0.58} 880,{top+sh*0.38} 1150,{top+sh*0.6} {x1},{top+sh*0.5} {x1},900 {x0},900" fill="#66788A"></polygon>
<rect x="0" y="{top+sh*0.74}" width="1600" height="900" fill="#2E3943"></rect>
</g>
<rect x="-10" y="760" width="1620" height="200" fill="#0E0E10"></rect>
{seats}
{hd}
</svg>'''


ROWS = 'ABCDEFGHIJKLMN'


def seatmap(t, cell=12, gap=3, sel=('J', 14), aisles=(3, 17), cols=20, label=True, screen=True):
    out = []
    if screen:
        out.append(f'<div style="display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: 14px"><div style="width: 80%; height: 3px; border-radius: 2px; background: {t["sub"]}"></div>{small(t, "스크린")}</div>')
    for r in ROWS:
        cells = []
        for c in range(1, cols + 1):
            on = (r, c) == sel
            bg = ACC if on else t['seat']
            cells.append(f'<div style="width: {cell}px; height: {cell}px; border-radius: {max(2, cell//4)}px; background: {bg}"></div>')
            if c in aisles:
                cells.append(f'<div style="width: {cell}px"></div>')
        lab = f'<span style="width: 14px; font-size: {SMALL}px; color: {t["ink"] if r == sel[0] else t["sub"]}; font-weight: {700 if r == sel[0] else 400}">{r}</span>' if label else ''
        out.append(f'<div style="display: flex; align-items: center; gap: {gap}px">{lab}{"".join(cells)}</div>')
    return f'<div style="display: flex; flex-direction: column; gap: {gap}px">{"".join(out)}</div>'


def phone(t, inner, x, y, pad_top=54):
    return f'<div style="position: absolute; left: {x}px; top: {y}px; width: {PH[0]}px; height: {PH[1]}px; border-radius: 40px; overflow: hidden; border: 1px solid {t["frame"]}; box-sizing: border-box; background: {t["bg"]}; display: flex; flex-direction: column; padding-top: {pad_top}px">{inner}</div>'


def desk(t, inner):
    return f'<div style="position: absolute; left: 40px; top: 40px; width: {DESK[0]}px; height: {DESK[1]}px; border-radius: 16px; overflow: hidden; border: 1px solid {t["frame"]}; box-sizing: border-box; background: {t["bg"]}; display: flex; flex-direction: column">{inner}</div>'


def phones(*items):
    y = 40 + DESK[1] + 80
    return ''.join(phone(t, inner, 40 + i * (PH[0] + 40), y, **kw) for i, (t, inner, kw) in enumerate(items))


def mhead(t, title, back=True):
    b = iconbtn(t, '뒤로') if back else '<div style="width: 12px"></div>'
    return f'<div style="display: flex; align-items: center; height: 52px; padding: 0 8px">{b}{body(t, title, 700)}</div>'


def dhead(t, title, right=''):
    return f'<div style="display: flex; align-items: center; justify-content: space-between; height: 72px; padding: 0 80px; border-bottom: 1px solid {t["hair"]}">{body(t, title, 700)}<div style="display: flex; gap: 28px">{right}</div></div>'


def areas_nav(t, active='용산'):
    return ''.join(f'<a href="#" style="font-size: {BODY}px; text-decoration: none; color: {t["ink"] if a == active else t["sub"]}; font-weight: {700 if a == active else 400}">{a}</a>' for a, _ in THEATERS)


# ---------- 극장 고르기 ----------
def theater_list(t, pad=20, specials=False):
    out = ''
    for area, ths in THEATERS:
        out += section_head(t, area, f'{len(ths)}곳', pad)
        for name, halls, sp in ths:
            right = (small(t, sp) if specials and sp else '') + small(t, halls) + arrow(t)
            out += row(t, body(t, name), right, pad=pad)
    return out


def hall_list(t, pad=20):
    out = ''
    for n, s in HALLS:
        out += row(t, body(t, n), small(t, s) + arrow(t), pad=pad)
    return out


def home_A():
    def m(t):
        return mhead(t, '극장', back=False) + f'<div style="overflow: hidden">{theater_list(t)}</div>'
    def m3(t):
        return mhead(t, 'CGV 용산아이파크몰') + f'<div style="padding: 8px 0 0">{hall_list(t)}</div>'
    d = desk(L, dhead(L, '극장') + f'<div style="width: 760px; margin: 0 auto; padding-top: 24px">{theater_list(L, pad=0)}</div>')
    return '홈 A · 지역별 목록', d + phones((L, m(L), {}), (D, m(D), {}), (L, m3(L), {}))


def search_box(t, text, typed=False):
    col = t['ink'] if typed else t['sub']
    return f'<label style="display: flex; align-items: center; gap: 10px; height: 52px; padding: 0 16px; border-radius: 14px; border: 1px solid {t["hair"]}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="{t["sub"]}" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg><input aria-label="극장 찾기" value="{text if typed else ""}" placeholder="{"" if typed else text}" style="border: 0; background: none; outline: none; font-size: {BODY}px; color: {col}; font-family: inherit; width: 100%"></label>'


def home_B():
    recent = [('CGV 용산아이파크몰', 'IMAX관'), ('메가박스 코엑스', 'Dolby Cinema')]
    def rec(t, pad=20):
        return section_head(t, '최근 본 상영관', '', pad) + ''.join(row(t, body(t, n), small(t, h) + arrow(t), pad=pad) for n, h in recent) + \
            section_head(t, '전체 극장', '7곳', pad) + ''.join(row(t, body(t, n), small(t, a) + arrow(t), pad=pad) for a, ths in THEATERS for n, _, _ in ths[:2])
    def m(t):
        return f'<div style="padding: 24px 20px 20px; display: flex; flex-direction: column; gap: 20px">{big(t, "어느 극장에서<br>보세요?")}{search_box(t, "극장 이름으로 찾기")}</div><div style="overflow: hidden">{rec(t)}</div>'
    def m3(t):
        res = [('CGV 용산아이파크몰', '22관'), ('롯데시네마 용산', '8관')]
        return f'<div style="padding: 24px 20px 12px">{search_box(t, "용산", typed=True)}</div>' + ''.join(row(t, body(t, n), small(t, h) + arrow(t)) for n, h in res)
    d = desk(L, f'<div style="width: 760px; margin: 0 auto; padding-top: 72px; display: flex; flex-direction: column; gap: 28px">{big(L, "어느 극장에서 보세요?", BIG)}{search_box(L, "극장 이름으로 찾기")}<div>{rec(L, pad=0)}</div></div>')
    return '홈 B · 큰 문장 + 찾기', d + phones((L, m(L), {}), (D, m(D), {}), (L, m3(L), {}))


def mapsvg(t, w, h, active='용산'):
    pins = {'용산': (500, 260), '영등포': (300, 300), '강남': (760, 360)}
    river = '#D6E2EC' if t is L else '#1B2630'
    g = ''
    for a, (x, y) in pins.items():
        on = a == active
        g += f'<circle cx="{x}" cy="{y}" r="{11 if on else 8}" fill="{ACC if on else t["ink"]}"></circle><text x="{x+18}" y="{y+6}" font-size="22" font-weight="{700 if on else 400}" fill="{t["ink"]}" font-family="Noto Sans KR, sans-serif">{a}</text>'
    return f'<svg role="img" aria-label="지역 지도" width="{w}" height="{h}" viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid {'slice' if w < 500 else 'meet'}" style="display: block"><rect width="1000" height="520" fill="{t["bg"]}"></rect><path d="M-20 250 C 150 240 220 330 380 330 C 520 330 560 300 680 300 C 820 300 880 250 1020 230" stroke="{river}" stroke-width="46" fill="none" stroke-linecap="round"></path>{g}</svg>'


def home_C():
    def lst(t, area, pad=20):
        ths = dict(THEATERS)[area]
        return section_head(t, area, f'{len(ths)}곳', pad) + ''.join(row(t, body(t, n), small(t, h) + arrow(t), pad=pad) for n, h, _ in ths)
    def m(t, area):
        return f'<div style="border-bottom: 1px solid {t["hair"]}">{mapsvg(t, 388, 300, area)}</div>' + lst(t, area)
    d = desk(L, dhead(L, '극장') + f'<div style="display: flex; flex: 1"><div style="flex: 1; border-right: 1px solid {L["hair"]}">{mapsvg(L, 900, 828)}</div><div style="width: 460px; padding: 0 40px">{lst(L, "용산", pad=0)}</div></div>')
    return '홈 C · 지도', d + phones((L, m(L, '용산'), {}), (D, m(D, '용산'), {}), (L, m(L, '영등포'), {}))


def home_D():
    def fm(t, pad=20):
        return ''.join(row(t, body(t, n, 500), small(t, c) + arrow(t), h=64, pad=pad) for n, c in FORMATS)
    def m(t):
        return f'<div style="padding: 24px 20px 12px">{big(t, "어떤 관에서<br>보세요?")}</div>{fm(t)}<div style="padding: 20px">{body(t, "극장 이름으로 찾기 ›", 500)}</div>'
    def m3(t):
        return mhead(t, '4DX') + ''.join(row(t, body(t, n), small(t, '4DX관') + arrow(t)) for n in FOURDX)
    d = desk(L, f'<div style="display: flex; gap: 80px; width: 1120px; margin: 0 auto; padding-top: 72px"><div style="width: 420px; display: flex; flex-direction: column; gap: 24px">{big(L, "어떤 관에서 보세요?", BIG)}<div>{fm(L, pad=0)}</div></div><div style="flex: 1; padding-top: 74px">{section_head(L, "IMAX", "1곳", 0)}{row(L, body(L, "CGV 용산아이파크몰"), small(L, "IMAX관 · 624석") + arrow(L), pad=0)}</div></div>')
    return '홈 D · 관 형식부터', d + phones((L, m(L), {}), (D, m(D), {}), (L, m3(L), {}))


# ---------- 좌석·시야 ----------
TITLE = '용산아이파크몰 IMAX관'
SEL = 'J열 14번'


def ctrls(t, heads=True):
    return f'<div style="display: flex; gap: 8px">{gbtn(t, "앞사람 끄기" if heads else "앞사람 켜기")}{gbtn(t, "키 172cm")}</div>'


def roundview(w, h, heads=True, r=16):
    return f'<div style="width: {w}px; height: {h}px; border-radius: {r}px; overflow: hidden; flex: none">{view(w, h, heads)}</div>'


def seat_A():
    def m(t):
        return mhead(t, TITLE) + f'<div style="padding: 4px 20px 0; display: flex; flex-direction: column; gap: 18px">{roundview(350, 230)}<div style="display: flex; flex-direction: column; gap: 12px">{big(t, SEL)}{metrics(t)}</div>{ctrls(t)}{hr(t)}{seatmap(t)}</div>'
    def m3(t):
        empty = f'<div style="width: 350px; height: 230px; border-radius: 16px; background: #0A0A0B; display: flex; align-items: center; justify-content: center"><span style="font-size: {BODY}px; color: #A4A4AB">좌석을 누르면 여기서 보여요</span></div>'
        return mhead(t, TITLE) + f'<div style="padding: 4px 20px 0; display: flex; flex-direction: column; gap: 18px">{empty}{big(t, "자리를 골라 보세요")}{hr(t)}{seatmap(t, sel=("", 0))}</div>'
    d = desk(L, dhead(L, 'CGV 용산아이파크몰', areas_nav(L, '') if False else '') + f'<div style="display: flex; gap: 48px; padding: 32px 80px; flex: 1"><div style="flex: 1; display: flex; flex-direction: column; gap: 20px">{roundview(840, 560)}</div><div style="width: 392px; display: flex; flex-direction: column; gap: 20px">{body(L, "IMAX관", 500, L["sub"])}{big(L, SEL, BIG)}{metrics(L)}{ctrls(L)}{hr(L)}{seatmap(L, cell=13, gap=4)}</div></div>')
    return '좌석 A · 위 시야, 아래 좌석표', d + phones((L, m(L), {}), (D, m(D), {}), (L, m3(L), {}))


def seat_B():
    def step1(t):
        return mhead(t, TITLE) + f'<div style="padding: 20px 20px 0; flex: 1">{seatmap(t, cell=13, gap=3)}</div><div style="padding: 16px 20px 34px; border-top: 1px solid {t["hair"]}; display: flex; align-items: center; justify-content: space-between">{big(t, SEL, 22) if False else body(t, SEL, 700)}{primary(t, "이 자리에서 보기", "200px")}</div>'
    def step2(t):
        top = f'<div style="position: absolute; left: 8px; top: 54px">{iconbtn(D, "좌석표로")}</div>'
        bottom = f'<div style="position: absolute; left: 20px; right: 20px; bottom: 34px; display: flex; flex-direction: column; gap: 14px">{big(D, SEL)}{metrics(D, on_dark=True)}{ctrls(D)}</div>'
        return f'<div style="position: absolute; inset: 0">{view(390, 844, True)}</div>{top}{bottom}'
    d = desk(L, dhead(L, 'CGV 용산아이파크몰 · IMAX관') + f'<div style="display: flex; flex-direction: column; align-items: center; gap: 28px; padding-top: 48px; flex: 1">{seatmap(L, cell=22, gap=6)}</div><div style="display: flex; align-items: center; justify-content: space-between; padding: 20px 80px; border-top: 1px solid {L["hair"]}">{big(L, SEL)}{primary(L, "이 자리에서 보기", "240px")}</div>')
    return '좌석 B · 좌석표 먼저, 시야는 전체 화면', d + phones((L, step1(L), {}), (D, step1(D), {}), (D, step2(D), {'pad_top': 0}))


def seat_C():
    def m(t, expanded=False):
        vh = 300 if expanded else 470
        sheet = f'<div style="flex: 1; background: {t["bg"]}; border-radius: 24px 24px 0 0; margin-top: -24px; position: relative; padding: 10px 20px 0; display: flex; flex-direction: column; gap: 16px"><div style="width: 40px; height: 5px; border-radius: 3px; background: {t["hair"]}; align-self: center"></div><div style="display: flex; align-items: flex-end; justify-content: space-between">{big(t, SEL)}{gbtn(t, "좌석 바꾸기")}</div>{metrics(t)}'
        sheet += (f'{hr(t)}{seatmap(t)}' if expanded else ctrls(t)) + '</div>'
        top = f'<div style="position: absolute; left: 8px; top: 54px">{iconbtn(D, "뒤로")}</div>'
        return f'<div style="height: {vh}px; flex: none">{view(390, vh)}</div>{top}{sheet}'
    d = desk(L, f'<div style="position: absolute; left: 0; top: 0; bottom: 0; width: 1000px">{view(1000, 900)}</div><div style="position: absolute; left: 32px; top: 24px">{iconbtn(D, "뒤로")}</div><div style="position: absolute; right: 0; top: 0; bottom: 0; width: 440px; background: #FFFFFF; padding-top: 40px; padding: 28px; box-sizing: border-box; display: flex; flex-direction: column; gap: 18px">{body(L, TITLE, 500, L["sub"])}{big(L, SEL, BIG)}{metrics(L)}{ctrls(L)}{hr(L)}{seatmap(L, cell=12, gap=4)}</div>')
    return '좌석 C · 시야 위에 좌석 시트', d + phones((L, m(L), {'pad_top': 0}), (D, m(D), {'pad_top': 0}), (L, m(L, True), {'pad_top': 0}))


def stepper(t, label, size=BIG):
    return f'<div style="display: flex; align-items: center; gap: 2px">{iconbtn(t, label + " 앞으로")}<span style="font-size: {size}px; font-weight: 700; color: {t["ink"]}; letter-spacing: -0.02em">{label}</span>{iconbtn(t, label + " 뒤로", "right")}</div>'


def seat_D():
    def mini(t):
        return seatmap(t, cell=4, gap=2, label=False, screen=False)
    def m(t, height=False):
        steps = f'<div style="display: flex; align-items: center; justify-content: space-between; margin: 0 -12px">{stepper(t, "J열")}{stepper(t, "14번")}</div>'
        extra = ctrls(t)
        if height:
            extra = f'<div style="display: flex; flex-direction: column; gap: 12px"><div style="display: flex; justify-content: space-between">{body(t, "내 키", 500)}{body(t, "172cm", 700)}</div><input type="range" aria-label="키" min="140" max="200" value="172" style="width: 100%; accent-color: {t["ink"]}"></div>'
        return mhead(t, TITLE) + f'<div style="padding: 4px 20px 0; display: flex; flex-direction: column; gap: 20px">{roundview(350, 330)}{steps}<div style="display: flex; justify-content: space-between; align-items: flex-end">{metrics(t, gap=20)}{mini(t)}</div>{hr(t)}{extra}</div>'
    d = desk(L, dhead(L, 'CGV 용산아이파크몰 · IMAX관') + f'<div style="padding: 28px 80px 0; display: flex; flex-direction: column; gap: 24px">{roundview(1280, 600)}<div style="display: flex; align-items: center; justify-content: space-between">{stepper(L, "J열", BIG)}{stepper(L, "14번", BIG)}{metrics(L)}{ctrls(L)}{seatmap(L, cell=6, gap=2, label=False, screen=False)}</div></div>')
    return '좌석 D · 한 칸씩 옮겨 보기', d + phones((L, m(L), {}), (D, m(D), {}), (L, m(L, True), {}))


BOARDS = [
    ('Main.dc.html', home_A), ('HomeB.dc.html', home_B), ('HomeC.dc.html', home_C), ('HomeD.dc.html', home_D),
    ('SeatA.dc.html', seat_A), ('SeatB.dc.html', seat_B), ('SeatC.dc.html', seat_C), ('SeatD.dc.html', seat_D),
]

boards, order = {}, []
ROW2 = BH + 120 + 340
for i, (fn, f) in enumerate(BOARDS):
    title, inner = f()
    open(os.path.join(P, fn), 'w').write(doc(title, inner, BW, BH))
    col, rw = i % 4, i // 4
    boards[fn] = {'x': col * (BW + 80), 'y': rw * ROW2, 'w': BW, 'h': BH, 'title': title}
    order.append(fn)

rowW = 4 * BW + 3 * 80
guide = lambda states: f'각 시안 보는 법\n· 위 = 데스크톱(라이트)\n· 아래 왼쪽부터 = 휴대폰 라이트, 휴대폰 다크, {states}'
canvas = {
    'v': 3, 'createdOnFiles': {'v': 1, 'at': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')},
    'title': 'movie mate 디자인', 'launch': {'view': 'canvas'}, 'pages': [],
    'boards': boards, 'order': order, 'designSystems': [],
    'notes': {
        't1': {'x': 0, 'y': -340, 'text': '극장 고르기 — 시안 4종', 'kind': 'title1', 'maxW': rowW},
        't2': {'x': 0, 'y': ROW2 - 340, 'text': '좌석·시야 — 시안 4종', 'kind': 'title1', 'maxW': rowW},
        'g1': {'x': rowW + 80, 'y': 0, 'w': 360, 'size': 'm', 'fill': 'orange', 'text': guide('다음 단계 화면')},
        'g2': {'x': rowW + 80, 'y': ROW2, 'w': 360, 'size': 'm', 'fill': 'orange', 'text': guide('다른 상태(B는 시야 전체 화면)')},
    },
}
existing = os.path.join(P, 'canvas.json')
if os.path.exists(existing):
    old = json.load(open(existing))
    canvas['createdOnFiles'] = old.get('createdOnFiles', canvas['createdOnFiles'])
json.dump(canvas, open(existing, 'w'), ensure_ascii=False, indent=1)
print('wrote', len(BOARDS), 'boards to', P)
