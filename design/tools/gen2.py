#!/usr/bin/env python3
"""movie mate 2차 시안: 홈 D + 좌석 A를 스타일 4종(A-1~A-4)으로. 좌석을 누르면 시야·수치가 바뀌는 인터랙티브 보드."""
import json, os, sys

ROOT = sys.argv[1]
P = os.path.join(ROOT, 'project')
BW, BH = 1520, 1904
DESK = (1440, 900)
PH = (390, 844)
SMALL, BODY = 13, 16

GFONTS = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&amp;family=Bebas+Neue&amp;display=swap'
SANS = "'Noto Sans KR', -apple-system, sans-serif"
DISPLAY = "'Bebas Neue', 'Noto Sans KR', sans-serif"

JS = r'''
class Component extends DCLogic {
  renderVals() {
    const st = this.state || {};
    const r = st.r ?? 9, c = st.c ?? 14, heads = st.heads ?? true, fmt = st.fmt ?? 0;
    const L = 'ABCDEFGHIJKLMN';
    const rows = L.split('').map((ch, ri) => ({
      label: ch,
      seats: Array.from({ length: 20 }, (_, ci) => {
        const on = ri === r && ci + 1 === c;
        return { on: on, off: !on, aisle: ci === 2 || ci === 16, name: ch + '열 ' + (ci + 1) + '번',
          pick: () => this.setState({ r: ri, c: ci + 1 }) };
      })
    }));
    const dist = 6 + r * 1.05;
    const lat = (c - 10.5) * 0.55;
    const W = 24, H = 16.8, base = 1.2;
    const eye = 1.15 + r * 0.32;
    const fov = 2 * Math.atan(W / 2 / Math.hypot(dist, lat)) * 180 / Math.PI;
    const up = Math.atan((base + H / 2 - eye) / dist) * 180 / Math.PI;
    const S = Math.min(1.9, 13.5 / dist);
    const dx = -lat * 34 * S;
    const dy = (eye - 3) * 16;
    const vt = 'translate(' + (800 + dx).toFixed(1) + ' ' + (440 + dy).toFixed(1) + ') scale(' + S.toFixed(3) + ') translate(-800 -440)';
    const F = [
      { name: 'IMAX', count: '1곳', iw: 20, ih: 14, list: ['CGV 용산아이파크몰'] },
      { name: 'Dolby Cinema', count: '1곳', iw: 24, ih: 11, list: ['메가박스 코엑스'] },
      { name: 'SCREENX', count: '2곳', iw: 24, ih: 10, list: ['CGV 용산아이파크몰', 'CGV 영등포'] },
      { name: '4DX', count: '4곳', iw: 24, ih: 12, list: ['CGV 용산아이파크몰', 'CGV 영등포', 'CGV 여의도', 'CGV 청담씨네시티'] },
      { name: '일반관', count: '7곳', iw: 24, ih: 12, list: ['CGV 용산아이파크몰', '롯데시네마 용산', 'CGV 영등포', '롯데시네마 영등포', 'CGV 여의도', '메가박스 코엑스', 'CGV 청담씨네시티'] }
    ];
    const formats = F.map((f, i) => ({ name: f.name, count: f.count, iw: f.iw, ih: f.ih, ix: (28 - f.iw) / 2, iy: (20 - f.ih) / 2,
      open: i === fmt, closed: i !== fmt, theaters: f.list.map((t) => ({ name: t })), pick: () => this.setState({ fmt: i }) }));
    return {
      rows: rows, formats: formats,
      seatName: L[r] + '열 ' + c + '번', rowL: L[r], col: String(c),
      fov: Math.round(fov) + '°', up: Math.round(up) + '°', dist: dist.toFixed(1) + 'm',
      vt: vt, headsOp: heads ? 1 : 0, headsLabel: heads ? '앞사람 끄기' : '앞사람 켜기',
      toggleHeads: () => this.setState({ heads: !heads })
    };
  }
}
'''


def doc(title, inner):
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
<link href="{GFONTS}" rel="stylesheet">
<style>
body{{margin:0}}
button{{font-family:inherit}}
</style>
</helmet>
<div style="width: {BW}px; height: {BH}px; position: relative; background: #FFFFFF; font-family: {SANS}; font-variant-numeric: tabular-nums">
{inner}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{BW},"height":{BH}}}}}'>{JS}</script>
</body>
</html>
'''


N = [0]


def view(w, h, fit=None, radius=0):
    N[0] += 1
    u = f'c{N[0]}'
    fit = fit or ('slice' if w / h >= 1.3 else 'meet')
    scr = '330,110 1270,110 1300,640 300,640'
    seats = ''.join(f'<rect x="{x}" y="780" width="118" height="160" rx="22" fill="#18181B"></rect>' for x in range(-40, 1640, 132))
    hd = ''.join(f'<path d="M{cx-120} 900 C{cx-110} 800 {cx+110} 800 {cx+120} 900 Z" fill="#050506"></path><ellipse cx="{cx}" cy="752" rx="52" ry="64" fill="#050506"></ellipse>' for cx in (430, 760, 1090))
    return f'''<svg role="img" aria-label="{{{{seatName}}}}에서 본 스크린" width="{w}" height="{h}" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid {fit}" style="display: block; background: #0A0A0B; border-radius: {radius}px">
<defs><clipPath id="{u}"><polygon points="{scr}"></polygon></clipPath></defs>
<g transform="{{{{vt}}}}">
<polygon points="-800,-300 290,70 270,700 -800,1300" fill="#111113"></polygon>
<polygon points="2400,-300 1310,70 1330,700 2400,1300" fill="#111113"></polygon>
<g clip-path="url(#{u})">
<rect x="0" y="0" width="1600" height="900" fill="#9FB1C3"></rect>
<circle cx="1050" cy="300" r="46" fill="#EADCB2"></circle>
<polygon points="300,420 420,340 640,400 880,300 1150,420 1300,370 1300,900 300,900" fill="#66788A"></polygon>
<rect x="0" y="500" width="1600" height="400" fill="#2E3943"></rect>
</g>
</g>
<rect x="-10" y="770" width="1620" height="200" fill="#0E0E10"></rect>
{seats}
<g opacity="{{{{headsOp}}}}">{hd}</g>
</svg>'''


def seatmap(t, cell=11, gap=3, label=True, radius='4px 4px 2px 2px', wrap_style=''):
    lab = f'<span style="width: 16px; font-size: {SMALL}px; color: {t["sub"]}">{{{{row.label}}}}</span>' if label else ''
    btn = lambda bg: f'<button aria-label="{{{{seat.name}}}}" onClick="{{{{seat.pick}}}}" style="width: {cell}px; height: {cell}px; padding: 0; border: 0; border-radius: {radius}; background: {bg}; cursor: pointer; flex: none"></button>'
    return f'''<div style="display: flex; flex-direction: column; gap: {gap}px; {wrap_style}">
<sc-for list="{{{{rows}}}}" as="row" hint-placeholder-count="14">
<div style="display: flex; align-items: center; gap: {gap}px">{lab}
<sc-for list="{{{{row.seats}}}}" as="seat" hint-placeholder-count="20">
<sc-if value="{{{{seat.on}}}}" hint-placeholder-val="{{{{false}}}}">{btn(t["acc"])}</sc-if>
<sc-if value="{{{{seat.off}}}}" hint-placeholder-val="{{{{true}}}}">{btn(t["seat"])}</sc-if>
<sc-if value="{{{{seat.aisle}}}}" hint-placeholder-val="{{{{false}}}}"><span style="width: {cell}px; flex: none"></span></sc-if>
</sc-for>
</div>
</sc-for>
</div>'''


def metrics(t, gap=32, vsize=BODY, font=None):
    ff = f'font-family: {font};' if font else ''
    item = lambda v, k: f'<div style="display: flex; flex-direction: column; gap: 2px; white-space: nowrap"><span style="font-size: {vsize}px; font-weight: 700; color: {t["ink"]}; {ff}">{{{{{v}}}}}</span><span style="font-size: {SMALL}px; color: {t["sub"]}">{k}</span></div>'
    return f'<div style="display: flex; gap: {gap}px">{item("fov", "시야각")}{item("up", "올려보기")}{item("dist", "스크린까지")}</div>'


def gbtn(t, inner, click=''):
    oc = f' onClick="{{{{{click}}}}}"' if click else ''
    return f'<button{oc} style="height: 36px; padding: 0 14px; border: 0; border-radius: 10px; background: {t["btn"]}; color: {t["ink"]}; font-size: {SMALL}px; font-weight: 500; cursor: pointer">{inner}</button>'


def ctrls(t):
    return f'<div style="display: flex; gap: 8px">{gbtn(t, "{{headsLabel}}", "toggleHeads")}{gbtn(t, "키 172cm")}</div>'


def chev(color, d='left', size=22):
    pts = '15 5 8 12 15 19' if d == 'left' else '9 5 16 12 9 19'
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="{pts}"></polyline></svg>'


def back(color):
    return f'<button aria-label="뒤로" style="width: 44px; height: 44px; border: 0; background: none; padding: 0; display: flex; align-items: center; justify-content: center; cursor: pointer">{chev(color)}</button>'


def screen_icon(t):
    return f'<svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true" style="flex: none"><rect x="{{{{f.ix}}}}" y="{{{{f.iy}}}}" width="{{{{f.iw}}}}" height="{{{{f.ih}}}}" rx="1.5" fill="none" stroke="{t["ink"]}" stroke-width="1.6"></rect></svg>'


def home_d(t, name_style, row_h=64, head=None, icon=True, perforated=False):
    """홈 D: 관 형식 목록, 누르면 그 자리에서 극장이 펼쳐짐."""
    border = f'1px {"dashed" if perforated else "solid"} {t["hair"]}'
    ic = screen_icon(t) if icon else ''
    theaters = f'''<sc-for list="{{{{f.theaters}}}}" as="th" hint-placeholder-count="2">
<a href="#" style="display: flex; align-items: center; justify-content: space-between; height: 52px; padding: 0 20px 0 {64 if icon else 20}px; text-decoration: none; color: {t["ink"]}; font-size: {BODY}px">{{{{th.name}}}}{chev(t["sub"], "right", 18)}</a>
</sc-for>'''
    rows = f'''<sc-for list="{{{{formats}}}}" as="f" hint-placeholder-count="5">
<div style="border-bottom: {border}">
<button onClick="{{{{f.pick}}}}" style="width: 100%; display: flex; align-items: center; gap: 16px; height: {row_h}px; padding: 0 20px; border: 0; background: none; cursor: pointer; text-align: left">{ic}<span style="flex: 1; {name_style}">{{{{f.name}}}}</span><span style="font-size: {SMALL}px; color: {t["sub"]}">{{{{f.count}}}}</span></button>
<sc-if value="{{{{f.open}}}}" hint-placeholder-val="{{{{false}}}}"><div style="padding-bottom: 8px">{theaters}</div></sc-if>
</div>
</sc-for>'''
    return (head or '') + rows


def phone(t, inner, x, y, pad_top=54):
    return f'<div style="position: absolute; left: {x}px; top: {y}px; width: {PH[0]}px; height: {PH[1]}px; border-radius: 40px; overflow: hidden; border: 1px solid {t["frame"]}; box-sizing: border-box; background: {t["bg"]}; display: flex; flex-direction: column; padding-top: {pad_top}px">{inner}</div>'


def desk(t, inner):
    return f'<div style="position: absolute; left: 40px; top: 40px; width: {DESK[0]}px; height: {DESK[1]}px; border-radius: 16px; overflow: hidden; border: 1px solid {t["frame"]}; box-sizing: border-box; background: {t["bg"]}; display: flex; flex-direction: column; position: absolute">{inner}</div>'


def phones(items):
    y = 40 + DESK[1] + 80
    return ''.join(phone(t, inner, 40 + i * (PH[0] + 40), y, pt) for i, (t, inner, pt) in enumerate(items))


def big(t, text, size, font=None, weight=700):
    ff = f'font-family: {font};' if font else ''
    return f'<div style="font-size: {size}px; font-weight: {weight}; color: {t["ink"]}; letter-spacing: -0.02em; line-height: 1.15; {ff}">{text}</div>'


def sub(t, text, size=BODY):
    return f'<span style="font-size: {size}px; color: {t["sub"]}">{text}</span>'


def question(t, size=30, font=None):
    return f'<div style="padding: 24px 20px 16px">{big(t, "어떤 관에서<br>보세요?", size, font)}</div>'


# ---------- A-1 · 불 꺼진 상영관 ----------
DK1 = dict(bg='#09090A', ink='#F4F4F5', sub='#8E8E95', hair='#1E1E21', btn='#1C1C1F', seat='#2C2C31', acc='#FFB224', frame='#09090A')
LT1 = dict(bg='#FFFFFF', ink='#111111', sub='#6B6B70', hair='#EAEAEA', btn='#F2F2F3', seat='#DEDEE2', acc='#E09400', frame='#E2E2E2')


def v1():
    def seatm(t):
        return f'<div style="position: relative; height: 300px; flex: none">{view(390, 300)}<div style="position: absolute; left: 8px; top: 0">{back("#F4F4F5")}</div></div><div style="padding: 24px 20px 0; display: flex; flex-direction: column; gap: 18px">{sub(t, "CGV 용산아이파크몰 · IMAX관", SMALL)}{big(t, "{{seatName}}", 32)}{metrics(t)}{ctrls(t)}<div style="height: 4px"></div>{seatmap(t)}</div>'
    d = desk(DK1, f'<div style="display: flex; height: 100%"><div style="flex: 1; position: relative">{view(992, 900, fit="slice")}<div style="position: absolute; left: 24px; top: 24px">{back("#F4F4F5")}</div></div><div style="width: 448px; padding: 48px 40px; box-sizing: border-box; display: flex; flex-direction: column; gap: 22px">{sub(DK1, "CGV 용산아이파크몰 · IMAX관")}{big(DK1, "{{seatName}}", 32)}{metrics(DK1)}{ctrls(DK1)}<div style="height: 8px"></div>{seatmap(DK1, cell=13, gap=4)}</div></div>')
    home = home_d(DK1, f'font-size: {BODY}px; font-weight: 700; color: {DK1["ink"]}', head=question(DK1, 32))
    return 'A-1 · 불 꺼진 상영관', d + phones([(DK1, home, 54), (DK1, seatm(DK1), 0), (LT1, seatm(LT1), 0)]), 'A-1 보는 법'


# ---------- A-2 · 입장권 ----------
LT2 = dict(bg='#FFFFFF', ink='#141414', sub='#6E6E73', hair='#D9D9DC', btn='#F2F2F3', seat='#DDDDE1', acc='#E5432F', frame='#E2E2E2')
DK2 = dict(bg='#0D0D0E', ink='#F2F2F3', sub='#9A9AA0', hair='#3A3A3F', btn='#1F1F22', seat='#33333A', acc='#FF5B45', frame='#0D0D0E')


def ticket(t, vsize=40, pad=20):
    cell = lambda k, v, acc=False: f'<div style="display: flex; flex-direction: column; gap: 4px; padding: 14px 0"><span style="font-size: {SMALL}px; color: {t["sub"]}">{k}</span><span style="font-size: {vsize}px; font-weight: 700; color: {t["acc"] if acc else t["ink"]}; line-height: 1; font-family: {DISPLAY}">{v}</span></div>'
    perf = f'<div style="border-top: 1px dashed {t["hair"]}"></div>'
    grid = f'<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 16px">{cell("상영관", "IMAX")}{cell("열", "{{rowL}}", True)}{cell("번", "{{col}}", True)}</div>'
    return perf + grid + f'<div style="border-top: 1px dashed {t["hair"]}; padding-top: 16px">{metrics(t)}</div>'


def v2():
    def seatm(t):
        return f'<div style="display: flex; align-items: center; height: 52px; padding: 0 8px">{back(t["ink"])}<span style="font-size: {BODY}px; font-weight: 700; color: {t["ink"]}">용산아이파크몰</span></div><div style="padding: 4px 20px 0; display: flex; flex-direction: column; gap: 16px">{view(350, 220, radius=14)}<div>{ticket(t, 40)}</div>{ctrls(t)}{seatmap(t)}</div>'
    d = desk(LT2, f'<div style="display: flex; gap: 48px; padding: 48px 80px; height: 100%; box-sizing: border-box"><div style="flex: 1; display: flex; flex-direction: column; gap: 20px">{view(820, 560, radius=16)}<div style="display: flex; justify-content: space-between; align-items: center">{sub(LT2, "CGV 용산아이파크몰 · 한강대로23길 55")}{ctrls(LT2)}</div></div><div style="width: 392px; display: flex; flex-direction: column; gap: 4px">{ticket(LT2, 56, pad=0)}<div style="height: 24px"></div>{seatmap(LT2, cell=13, gap=4)}</div></div>')
    home = home_d(LT2, f'font-size: {BODY}px; font-weight: 700; color: {LT2["ink"]}', head=question(LT2, 30), perforated=True)
    return 'A-2 · 입장권', d + phones([(LT2, home, 54), (LT2, seatm(LT2), 54), (DK2, seatm(DK2), 54)]), 'A-2 보는 법'


# ---------- A-3 · 객석 원근 ----------
LT3 = dict(bg='#FFFFFF', ink='#111111', sub='#6B6B70', hair='#EAEAEA', btn='#F2F2F3', seat='#D7D9E0', acc='#3355FF', frame='#E2E2E2')
DK3 = dict(bg='#0B0C0F', ink='#F2F3F5', sub='#8F93A0', hair='#20232A', btn='#1C1F26', seat='#2E323C', acc='#6B86FF', frame='#0B0C0F')
PERSP = 'transform: perspective(700px) rotateX(36deg); transform-origin: 50% 100%'


def arc(t, w):
    return f'<svg width="{w}" height="26" viewBox="0 0 {w} 26" aria-hidden="true" style="display: block"><path d="M8 22 Q {w/2} -6 {w-8} 22" fill="none" stroke="{t["ink"]}" stroke-width="2.5" stroke-linecap="round"></path></svg>'


def v3():
    def seatm(t):
        over = f'<div style="position: absolute; left: 16px; bottom: 14px; display: flex; flex-direction: column; gap: 2px"><span style="font-size: 32px; font-weight: 700; color: #F4F4F5; letter-spacing: -0.02em">{{{{seatName}}}}</span></div>'
        return f'<div style="display: flex; align-items: center; height: 52px; padding: 0 8px">{back(t["ink"])}<span style="font-size: {BODY}px; font-weight: 700; color: {t["ink"]}">용산아이파크몰 IMAX관</span></div><div style="padding: 4px 20px 0; display: flex; flex-direction: column; gap: 18px"><div style="position: relative; border-radius: 18px; overflow: hidden">{view(350, 250)}{over}</div>{metrics(t)}<div style="display: flex; flex-direction: column; align-items: center; gap: 0; margin-top: 8px">{arc(t, 300)}{seatmap(t, cell=13, gap=3, label=False, wrap_style=PERSP)}</div>{ctrls(t)}</div>'
    d = desk(LT3, f'<div style="display: flex; height: 100%"><div style="width: 640px; padding: 48px 56px; box-sizing: border-box; display: flex; flex-direction: column; gap: 28px">{sub(LT3, "CGV 용산아이파크몰 · IMAX관")}{big(LT3, "{{seatName}}", 32)}<div style="display: flex; flex-direction: column; align-items: center; margin-top: 12px">{arc(LT3, 500)}{seatmap(LT3, cell=19, gap=5, label=False, wrap_style=PERSP)}</div><div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto">{metrics(LT3)}{ctrls(LT3)}</div></div><div style="flex: 1; padding: 32px 32px 32px 0"><div style="border-radius: 24px; overflow: hidden; height: 100%">{view(768, 836)}</div></div></div>')
    home = home_d(LT3, f'font-size: {BODY}px; font-weight: 700; color: {LT3["ink"]}', head=question(LT3, 30))
    return 'A-3 · 객석 원근', d + phones([(LT3, home, 54), (LT3, seatm(LT3), 54), (DK3, seatm(DK3), 54)]), 'A-3 보는 법'


# ---------- A-4 · 레터박스 ----------
DK4 = dict(bg='#000000', ink='#EDEDED', sub='#8A8A8A', hair='#1C1C1C', btn='#1A1A1A', seat='#2A2A2A', acc='#FF5A1F', frame='#000000')
LT4 = dict(bg='#FFFFFF', ink='#0A0A0A', sub='#6B6B6B', hair='#E6E6E6', btn='#F1F1F1', seat='#DCDCDC', acc='#F04E12', frame='#E2E2E2')


def rowseat(t, size, lab=SMALL):
    unit = lambda v, k: f'<div style="display: flex; align-items: baseline; gap: 6px"><span style="font-family: {DISPLAY}; font-size: {size}px; line-height: 0.9; color: {t["ink"]}">{v}</span><span style="font-size: {lab}px; color: {t["sub"]}">{k}</span></div>'
    return f'<div style="display: flex; gap: 20px; align-items: baseline">{unit("{{rowL}}", "열")}{unit("{{col}}", "번")}</div>'


def letterbox(w, h_box):
    vh = round(w / 2.39)
    return f'<div style="width: {w}px; height: {h_box}px; background: #000000; display: flex; align-items: center; flex: none">{view(w, vh, fit="slice")}</div>'


def v4():
    def seatm(t):
        return f'<div style="display: flex; align-items: center; height: 52px; padding: 0 8px">{back(t["ink"])}<span style="font-size: {BODY}px; font-weight: 700; color: {t["ink"]}">IMAX관</span></div>{letterbox(390, 190)}<div style="padding: 24px 20px 0; display: flex; flex-direction: column; gap: 20px">{rowseat(t, 60)}{metrics(t)}{ctrls(t)}{seatmap(t)}</div>'
    d = desk(DK4, f'<div style="display: flex; align-items: center; justify-content: space-between; height: 64px; padding: 0 80px">{sub(DK4, "CGV 용산아이파크몰")}{sub(DK4, "IMAX관 · 1.43:1")}</div><div style="display: flex; justify-content: center; background: #000000">{letterbox(1200, 560)}</div><div style="display: flex; align-items: flex-end; justify-content: space-between; padding: 28px 80px 0">{rowseat(DK4, 120, BODY)}<div style="display: flex; flex-direction: column; gap: 18px">{metrics(DK4)}{ctrls(DK4)}</div>{seatmap(DK4, cell=8, gap=3, label=False)}</div>')
    home = home_d(DK4, f'font-family: {DISPLAY}; font-size: 40px; line-height: 1; color: {DK4["ink"]}', row_h=76, icon=False, head=f'<div style="padding: 24px 20px 12px">{sub(DK4, "어떤 관에서 보세요?")}</div>')
    return 'A-4 · 레터박스', d + phones([(DK4, home, 54), (DK4, seatm(DK4), 54), (LT4, seatm(LT4), 54)]), 'A-4 보는 법'


VARS = [('SeatA1.dc.html', v1), ('SeatA2.dc.html', v2), ('SeatA3.dc.html', v3), ('SeatA4.dc.html', v4)]

cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ROW2 = BH + 120 + 340
y3 = 2 * ROW2
for i, (fn, f) in enumerate(VARS):
    title, inner, _ = f()
    open(os.path.join(P, fn), 'w').write(doc(title, inner))
    canvas['boards'][fn] = {'x': i * (BW + 80), 'y': y3, 'w': BW, 'h': BH, 'title': title, 'is_interactive': True}
    if fn not in canvas['order']:
        canvas['order'].append(fn)
rowW = 4 * BW + 3 * 80
canvas['notes']['t3'] = {'x': 0, 'y': y3 - 340, 'text': '홈 D + 좌석 A 다듬기 — 스타일 4종', 'kind': 'title1', 'maxW': rowW}
canvas['notes']['g3'] = {'x': rowW + 80, 'y': y3, 'w': 360, 'size': 'm', 'fill': 'orange',
                         'text': '각 시안 보는 법\n· 위 = 데스크톱 좌석 화면\n· 아래 왼쪽부터 = 홈 D, 좌석 A, 좌석 A 반대 모드\n· 재생 버튼을 누르고 좌석을 누르면 시야와 수치가 바뀌어요\n· 홈 D는 관 형식을 누르면 극장이 펼쳐져요'}
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok')
