#!/usr/bin/env python3
"""movie mate 6차: 흐름 A 확정 + 오리지널 티켓(앞면 포스터 / 뒷면 입장권) 4종. 키오스크 출력 → 툭 튀어나옴 → 뒤집혀 포스터."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
g5 = open(os.path.join(HERE, 'gen5.py')).read()
exec(g5[:g5.index('FLOWS = [')])

FONTS6 = ('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&amp;family=Bebas+Neue'
          '&amp;family=Nanum+Gothic+Coding:wght@400;700&amp;family=Noto+Serif+KR:wght@600;900&amp;family=IBM+Plex+Mono:wght@400;500&amp;family=Hahmlet:wght@600&amp;display=swap')
SERIF = "'Noto Serif KR', serif"
PMONO = "'IBM Plex Mono', 'Nanum Gothic Coding', monospace"

CHAINS = [('CGV', [('용산아이파크몰', 'IMAX · 4DX · SCREENX'), ('영등포', 'SCREENX · 4DX'), ('여의도', '4DX'), ('청담씨네시티', '4DX')]),
          ('메가박스', [('코엑스', 'Dolby Cinema'), ('센트럴', '')]),
          ('롯데시네마', [('용산', ''), ('영등포', '')])]

JS6 = JS5.replace(
    "toggleHeads: () => this.setState({ heads: !heads }),",
    """toggleHeads: () => this.setState({ heads: !heads }),
      flipDeg: (st.flip ? 180 : 0), flipLabel: st.flip ? '앞면 보기' : '뒷면 보기',
      toggleFlip: () => this.setState({ flip: !st.flip }),
      chains: CH.map((c, i) => ({ name: c[0], count: c[1].length + '곳', on: i === (st.ch ?? 0), off: i !== (st.ch ?? 0), pick: () => this.setState({ ch: i }) })),
      chainName: CH[st.ch ?? 0][0],
      chainTheaters: CH[st.ch ?? 0][1].map((t, i) => ({ name: t[0], fmt: t[1], first: i === 0 && (st.ch ?? 0) === 0, rest: !(i === 0 && (st.ch ?? 0) === 0) })),""")
JS6 = JS6.replace("const L = 'ABCDEFGHIJKLMN';", "const L = 'ABCDEFGHIJKLMN';\n    const CH = " + json.dumps(CHAINS, ensure_ascii=False) + ";")

# ---------- 티켓 모양 ----------
def ot_path(w, h, c=14, r=6, step=26):
    def bites(a, b, y):
        n = int((b - a) // step)
        start = a + ((b - a) - n * step) / 2
        segs = []
        xs = [start + (i + 0.5) * step for i in range(n)]
        if a > b:
            xs = xs[::-1]
        for x in xs:
            if a < b:
                segs.append(f'L{x-r:.1f},{y} A{r},{r} 0 0 0 {x+r:.1f},{y}')
            else:
                segs.append(f'L{x+r:.1f},{y} A{r},{r} 0 0 0 {x-r:.1f},{y}')
        return ' '.join(segs)
    top = bites(c, w - c, 0)
    n = int((w - 2 * c) // step)
    start = c + ((w - 2 * c) - n * step) / 2
    bot = ' '.join(f'L{start + (i + 0.5) * step + r:.1f},{h} A{r},{r} 0 0 0 {start + (i + 0.5) * step - r:.1f},{h}' for i in reversed(range(n)))
    return (f'M{c},0 {top} L{w-c},0 A{c},{c} 0 0 0 {w},{c} L{w},{h-c} A{c},{c} 0 0 0 {w-c},{h} '
            f'{bot} L{c},{h} A{c},{c} 0 0 0 0,{h-c} L0,{c} A{c},{c} 0 0 0 {c},0 Z')


def zig_path(w, h):
    return zigzag(w, h, tooth=10, depth=6)


def film_path(w, h, c=10):
    return f'M{c},0 H{w-c} Q{w},0 {w},{c} V{h-c} Q{w},{h} {w-c},{h} H{c} Q0,{h} 0,{h-c} V{c} Q0,0 {c},0 Z'


N6 = [0]


def clip_svg(w, h, d, inner, uid):
    return (f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" style="position: absolute; inset: 0; display: block" aria-hidden="true">'
            f'<defs><clipPath id="{uid}"><path d="{d}"></path></clipPath></defs><g clip-path="url(#{uid})">{inner}</g></svg>')


# ---------- 포스터 (밤의 궤도, 직접 그린 예시) ----------
STARS = [(22, 40, 1.2), (60, 22, .9), (98, 70, 1.4), (140, 30, 1), (212, 60, 1.2), (230, 120, .8), (40, 120, 1), (80, 170, 1.3), (20, 220, .9),
         (120, 110, .8), (236, 230, 1.1), (200, 260, .8), (55, 280, 1.2), (150, 250, .9), (110, 300, 1.1), (225, 310, .9), (30, 330, .8)]


def poster_svg(w, h, uid, d, perf=False):
    sx, sy = w / 250, h / 520
    stars = ''.join(f'<circle cx="{x*sx:.1f}" cy="{y*sy:.1f}" r="{r}" fill="#F3E9D2" opacity=".8"></circle>' for x, y, r in STARS)
    art = (f'<rect width="{w}" height="{h}" fill="#141B33"></rect>{stars}'
           f'<ellipse cx="{125*sx:.1f}" cy="{235*sy:.1f}" rx="{170*sx:.1f}" ry="{44*sy:.1f}" fill="none" stroke="#F3E9D2" stroke-opacity=".35" stroke-width="1" transform="rotate(-16 {125*sx:.1f} {235*sy:.1f})"></ellipse>'
           f'<ellipse cx="{125*sx:.1f}" cy="{235*sy:.1f}" rx="{120*sx:.1f}" ry="{28*sy:.1f}" fill="none" stroke="#F3E9D2" stroke-opacity=".22" stroke-width="1" transform="rotate(-16 {125*sx:.1f} {235*sy:.1f})"></ellipse>'
           f'<circle cx="{172*sx:.1f}" cy="{168*sy:.1f}" r="{64*sx:.1f}" fill="#E7B04A"></circle>'
           f'<circle cx="{196*sx:.1f}" cy="{152*sy:.1f}" r="{60*sx:.1f}" fill="#141B33" opacity=".38"></circle>'
           f'<circle cx="{64*sx:.1f}" cy="{248*sy:.1f}" r="{6*sx:.1f}" fill="#F3E9D2"></circle>'
           f'<path d="M0 {372*sy:.1f} C {60*sx:.1f} {352*sy:.1f} {110*sx:.1f} {350*sy:.1f} {150*sx:.1f} {362*sy:.1f} C {190*sx:.1f} {374*sy:.1f} {220*sx:.1f} {368*sy:.1f} {w} {356*sy:.1f} V{h} H0 Z" fill="#0B1022"></path>'
           f'<circle cx="{92*sx:.1f}" cy="{334*sy:.1f}" r="{4.5*sx:.1f}" fill="#0B1022"></circle>'
           f'<path d="M{88*sx:.1f} {339*sy:.1f} L{96*sx:.1f} {339*sy:.1f} L{97.5*sx:.1f} {358*sy:.1f} L{86.5*sx:.1f} {358*sy:.1f} Z" fill="#0B1022"></path>'
           f'<text x="{w/2:.1f}" y="{432*sy:.1f}" text-anchor="middle" font-family="Noto Serif KR, serif" font-weight="900" font-size="{36*sx:.1f}" fill="#F3E9D2" letter-spacing="2">밤의 궤도</text>'
           f'<text x="{w/2:.1f}" y="{454*sy:.1f}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="{8.5*sx:.1f}" fill="#E7B04A" letter-spacing="4">THE NIGHT ORBIT</text>'
           f'<text x="{w/2:.1f}" y="{490*sy:.1f}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="{7*sx:.1f}" fill="#F3E9D2" fill-opacity=".6" letter-spacing="2">IN CINEMAS 2026</text>')
    if perf:
        art += perf
    return clip_svg(w, h, d, art, uid)


# ---------- 뒷면 4종 ----------
def back_original(w, h, d, uid):
    ink, sub, paper, rule = '#2B2620', '#857A6A', '#E9E1D3', '#CFC4B2'
    rows = [('Theater', 'CGV 용산아이파크몰'), ('Screen', 'IMAX관'), ('Date', '2026.11.16 MON'), ('Time', '13:40'), ('View', '{{fov}} / {{up}}'), ('Distance', '{{dist}}')]
    lines = ''.join(f'<div style="display: flex; justify-content: space-between; align-items: baseline; padding: 7px 0; border-bottom: 1px solid {rule}"><span style="font-family: {PMONO}; font-size: 10px; letter-spacing: 1px; color: {sub}">{k.upper()}</span><span style="font-size: 12px; font-weight: 700; color: {ink}">{v}</span></div>' for k, v in rows)
    return (f'{clip_svg(w, h, d, f"<rect width=\'{w}\' height=\'{h}\' fill=\'{paper}\'></rect>", uid)}'
            f'<div style="position: relative; padding: 30px 22px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column">'
            f'<div style="display: flex; justify-content: space-between; font-family: {PMONO}; font-size: 9px; letter-spacing: 2px; color: {sub}"><span>MOVIE MATE ORIGINAL</span><span>No. {{{{ticketNo}}}}</span></div>'
            f'<div style="margin-top: 22px; font-family: \'Hahmlet\', serif; font-weight: 600; letter-spacing: -0.5px; font-size: 30px; line-height: 1.1; color: {ink}">{{{{movieTitle}}}}</div>'
            f'<div style="margin-top: 6px; font-family: {PMONO}; font-size: 9px; letter-spacing: 3px; color: {sub}">THE NIGHT ORBIT · 2026</div>'
            f'<div style="margin-top: 22px; display: flex; align-items: flex-end; justify-content: space-between; border-top: 2px solid {ink}; border-bottom: 2px solid {ink}; padding: 10px 0">'
            f'<span style="font-family: {PMONO}; font-size: 10px; letter-spacing: 2px; color: {ink}">SEAT</span><span style="font-family: {DISPLAY}; font-size: 64px; line-height: .85; color: {ink}">{{{{rowL}}}}{{{{col}}}}</span></div>'
            f'<div style="margin-top: 8px">{lines}</div>'
            f'<div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end"><span style="font-family: {PMONO}; font-size: 9px; letter-spacing: 2px; color: {sub}">SEE BEFORE<br>YOU SIT</span>{barcode(96, 26, ink)}</div></div>')


def back_film(w, h, d, uid):
    ink, sub, paper = '#EDE7DA', '#8E8A80', '#121212'
    perf = ''.join(f'<rect x="7" y="{y}" width="9" height="12" rx="2" fill="#2A2A2A"></rect><rect x="{w-16}" y="{y}" width="9" height="12" rx="2" fill="#2A2A2A"></rect>' for y in range(14, h - 14, 22))
    cells = [('THEATER', 'CGV 용산아이파크몰'), ('SCREEN', 'IMAX관'), ('DATE', '11.16 MON'), ('TIME', '13:40'), ('VIEW', '{{fov}}'), ('TILT', '{{up}}')]
    grid = ''.join(f'<div style="display: flex; flex-direction: column; gap: 3px; padding: 9px 0; border-top: 1px solid #2E2E2E"><span style="font-family: {PMONO}; font-size: 9px; letter-spacing: 2px; color: {sub}">{k}</span><span style="font-size: 12px; font-weight: 700; color: {ink}">{v}</span></div>' for k, v in cells)
    return (f'{clip_svg(w, h, d, f"<rect width=\'{w}\' height=\'{h}\' fill=\'{paper}\'></rect>" + perf, uid)}'
            f'<div style="position: relative; padding: 26px 30px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column">'
            f'<span style="font-family: {PMONO}; font-size: 9px; letter-spacing: 3px; color: {sub}">ADMIT ONE · No. {{{{ticketNo}}}}</span>'
            f'<div style="margin-top: 18px; font-family: {SERIF}; font-weight: 900; font-size: 28px; line-height: 1.15; color: {ink}">{{{{movieTitle}}}}</div>'
            f'<div style="margin-top: 20px; font-family: {DISPLAY}; font-size: 96px; line-height: .82; color: #E7B04A">{{{{rowL}}}}{{{{col}}}}</div>'
            f'<span style="font-family: {PMONO}; font-size: 9px; letter-spacing: 3px; color: {sub}; margin-top: 4px">ROW {{{{rowL}}}} · SEAT {{{{col}}}}</span>'
            f'<div style="margin-top: 18px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 14px">{grid}</div>'
            f'<div style="margin-top: auto">{barcode(w-60, 22, ink)}</div></div>')


def back_swiss(w, h, d, uid):
    ink, sub, paper, red = '#141414', '#7A7A76', '#F7F5F0', '#E5432F'
    sy = round(h * 0.76)
    stub_line = f'<line x1="14" y1="{sy}" x2="{w-14}" y2="{sy}" stroke="#BDB8AE" stroke-width="1.2" stroke-dasharray="3 4"></line>'
    notch = f'<circle cx="0" cy="{sy}" r="9" fill="{BG_STAGE}"></circle><circle cx="{w}" cy="{sy}" r="9" fill="{BG_STAGE}"></circle>'
    return (f'{clip_svg(w, h, d, f"<rect width=\'{w}\' height=\'{h}\' fill=\'{paper}\'></rect>" + stub_line + notch, uid)}'
            f'<div style="position: relative; height: 100%; box-sizing: border-box; display: flex; flex-direction: column">'
            f'<div style="padding: 28px 24px 0; display: flex; flex-direction: column; height: {sy}px; box-sizing: border-box">'
            f'<div style="display: flex; justify-content: space-between; font-family: {PMONO}; font-size: 9px; letter-spacing: 2px; color: {sub}"><span>IMAX관</span><span>13:40</span></div>'
            f'<div style="margin-top: 14px; font-family: {DISPLAY}; font-size: 150px; line-height: .8; color: {red}; letter-spacing: -2px">{{{{rowL}}}}</div>'
            f'<div style="font-family: {DISPLAY}; font-size: 150px; line-height: .8; color: {ink}; letter-spacing: -2px">{{{{col}}}}</div>'
            f'<div style="margin-top: auto; padding-bottom: 16px; display: flex; flex-direction: column; gap: 4px"><span style="font-family: {SERIF}; font-weight: 900; font-size: 20px; color: {ink}">{{{{movieTitle}}}}</span><span style="font-size: 11px; color: {sub}">CGV 용산아이파크몰 · 2026.11.16 (월)</span></div></div>'
            f'<div style="padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; flex: 1"><div style="display: flex; flex-direction: column; gap: 3px; font-family: {PMONO}; font-size: 10px; color: {ink}"><span>{{{{fov}}}} · {{{{up}}}}</span><span>{{{{dist}}}}</span></div>{barcode(90, 34, ink)}</div></div>')


def back_thermal(w, h, d, uid):
    ink = '#1C1C1C'
    rule = lambda ch: f'<div style="overflow: hidden; white-space: nowrap; letter-spacing: 1px; color: #6E6E6E">{ch * 50}</div>'
    return (f'{clip_svg(w, h, d, f"<rect width=\'{w}\' height=\'{h}\' fill=\'{PAPER}\'></rect>", uid)}'
            f'<div style="position: relative; padding: 26px 20px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; gap: 5px; font-family: {PMONO}; font-size: 11px; color: {ink}">'
            f'<div style="text-align: center; font-family: {SERIF}; font-weight: 900; font-size: 18px; letter-spacing: 6px">영화입장권</div>'
            f'<div style="text-align: center; font-size: 9px; letter-spacing: 2px; color: #6E6E6E">ADMISSION · 이용분</div>{rule("=")}'
            f'<div style="font-family: {SERIF}; font-weight: 900; font-size: 22px; line-height: 1.2">{{{{movieTitle}}}}</div><span>IMAX 2D · 12세</span>{rule("-")}'
            f'<div style="display: flex; justify-content: space-between"><span>2026.11.16 (월)</span><span>13:40</span></div>'
            f'<div style="display: flex; justify-content: space-between; align-items: baseline"><span>IMAX관</span><span style="font-family: {DISPLAY}; font-size: 54px; line-height: .9">{{{{rowL}}}}{{{{col}}}}</span></div>'
            f'<div style="display: flex; justify-content: space-between"><span>시야각 {{{{fov}}}}</span><span>올려보기 {{{{up}}}}</span></div>{rule("=")}'
            f'<span>CGV 용산아이파크몰</span><span style="color: #6E6E6E">한강대로23길 55</span>'
            f'<div style="margin-top: auto">{barcode(w-40, 34, ink)}</div><div style="text-align: center; font-size: 9px; letter-spacing: 2px">{{{{ticketNo}}}}</div></div>')


STYLES = {
    'original': dict(name='오리지널 티켓', shape=ot_path, back=back_original, perf=False, ease='cubic-bezier(.3,.7,.2,1)', print_steps=False),
    'film': dict(name='필름 티켓', shape=film_path, back=back_film, perf=True, ease='steps(16, end)', print_steps=True),
    'swiss': dict(name='큰 좌석 번호', shape=film_path, back=back_swiss, perf=False, ease='cubic-bezier(.3,.7,.2,1)', print_steps=False),
    'thermal': dict(name='감열지 + 포스터', shape=zig_path, back=back_thermal, perf=False, ease='steps(14, end)', print_steps=True),
}


def film_perf(w, h):
    return ''.join(f'<rect x="7" y="{y}" width="9" height="12" rx="2" fill="#0A0A0A" opacity=".55"></rect><rect x="{w-16}" y="{y}" width="9" height="12" rx="2" fill="#0A0A0A" opacity=".55"></rect>' for y in range(14, h - 14, 22))


def ticket(style, w, h, live=True, mode='final'):
    """mode: final(포스터 앞면) | back(뒷면 정지) | front(포스터 정지) | mid(출력 중)."""
    S = STYLES[style]
    d = S['shape'](w, h)
    N6[0] += 1
    u = f't{N6[0]}'
    front = f'<div style="position: absolute; inset: 0; backface-visibility: hidden; transform: rotateY(180deg)">{poster_svg(w, h, u + "f", d, film_perf(w, h) if S["perf"] else False)}</div>'
    back = f'<div style="position: absolute; inset: 0; backface-visibility: hidden">{S["back"](w, h, d, u + "b")}</div>'
    faces = f'<div style="position: relative; width: {w}px; height: {h}px; transform-style: preserve-3d; transition: transform .7s cubic-bezier(.4,0,.2,1); transform: rotateY({{{{flipDeg}}}}deg)">{back}{front}</div>' if live else \
            f'<div style="position: relative; width: {w}px; height: {h}px; transform-style: preserve-3d">{back}{front}</div>'
    if live:
        flip = f'<div class="flipa {TK}" style="transform-style: preserve-3d">{faces}</div>'
        pop = f'<div class="pop {TK}" style="transform-style: preserve-3d">{flip}</div>'
        prt = f'<div class="print {TK}" style="transform-style: preserve-3d">{pop}</div>'
        return f'<div style="perspective: 1400px; filter: drop-shadow(0 18px 30px rgba(0,0,0,0.45))">{prt}</div>'
    rot = {'back': 0, 'front': 180, 'mid': 0, 'final': 180}[mode]
    shift = 'translateY(-48%)' if mode == 'mid' else 'none'
    return f'<div style="perspective: 1400px; filter: drop-shadow(0 18px 30px rgba(0,0,0,0.45))"><div style="transform: {shift}"><div style="transform-style: preserve-3d; transform: rotateY({rot}deg)">{faces}</div></div></div>'


def css6(style):
    S = STYLES[style]
    e = S['ease']
    print_kf = '0%{transform:translateY(-102%)}48%{transform:translateY(0)}100%{transform:translateY(0)}'
    pop_kf = '0%,50%{transform:none}60%{transform:translateY(46px) scale(1.07)}70%{transform:translateY(30px) scale(.99)}78%,100%{transform:translateY(34px) scale(1)}'
    flip_kf = '0%,72%{transform:rotateY(0)}100%{transform:rotateY(180deg)}'
    out = kf('pt', print_kf) + kf('pp', pop_kf) + kf('fp', flip_kf)
    out += f'.print.tkA{{animation:ptA 2.6s {e} both}}.print.tkB{{animation:ptB 2.6s {e} both}}'
    out += '.pop.tk0{transform:translateY(34px)}.pop.tkA{animation:ppA 2.6s cubic-bezier(.3,.7,.2,1) both}.pop.tkB{animation:ppB 2.6s cubic-bezier(.3,.7,.2,1) both}'
    out += '.flipa.tk0{transform:rotateY(180deg)}.flipa.tkA{animation:fpA 2.6s cubic-bezier(.5,0,.2,1) both}.flipa.tkB{animation:fpB 2.6s cubic-bezier(.5,0,.2,1) both}'
    return out


# ---------- 화면 ----------
TW, TH = 250, 520


def kiosk_stage(style):
    slot = (f'<div style="position: absolute; left: 0; right: 0; top: 0; height: 120px; background: #19191B; border-bottom: 1px solid #2A2A2D; display: flex; align-items: flex-end; justify-content: center">'
            f'<div style="width: {TW+70}px; height: 16px; border-radius: 8px 8px 0 0; background: #050505; margin-bottom: -1px"></div></div>')
    tick = f'<div style="position: absolute; left: 0; right: 0; top: 120px; height: 640px; overflow: hidden; display: flex; justify-content: center; padding-top: 0"><div style="padding: 0 40px">{ticket(style, TW, TH)}</div></div>'
    btns = (f'<div style="position: absolute; left: 0; right: 0; bottom: 48px; display: flex; gap: 12px; justify-content: center">'
            f'<button style="height: 56px; padding: 0 28px; border: 0; border-radius: 14px; background: #F4F4F5; color: #111111; font-size: {BODY}px; font-weight: 700; cursor: pointer">시야 보러 가기</button>'
            f'<button onClick="{{{{toggleFlip}}}}" style="height: 56px; padding: 0 22px; border: 0; border-radius: 14px; background: #1F1F22; color: #F4F4F5; font-size: {BODY}px; font-weight: 500; cursor: pointer">{{{{flipLabel}}}}</button>'
            f'<button style="height: 56px; padding: 0 22px; border: 0; border-radius: 14px; background: #1F1F22; color: #F4F4F5; font-size: {BODY}px; font-weight: 500; cursor: pointer">다른 자리</button></div>')
    return f'<div style="position: relative; flex: 1; background: {BG_STAGE}">{slot}{tick}{btns}</div>'


def chain_screen():
    tile_on = lambda: f'<button onClick="{{{{c.pick}}}}" style="display: flex; justify-content: space-between; align-items: center; width: 100%; height: 76px; padding: 0 24px; border-radius: 16px; border: 2px solid {T["ink"]}; background: {T["ink"]}; color: {T["bg"]}; cursor: pointer"><span style="font-size: 22px; font-weight: 700">{{{{c.name}}}}</span><span style="font-size: {SMALL}px; opacity: .7">{{{{c.count}}}}</span></button>'
    tile_off = lambda: f'<button onClick="{{{{c.pick}}}}" style="display: flex; justify-content: space-between; align-items: center; width: 100%; height: 76px; padding: 0 24px; border-radius: 16px; border: 1px solid {T["hair"]}; background: {T["bg"]}; color: {T["ink"]}; cursor: pointer"><span style="font-size: 22px; font-weight: 700">{{{{c.name}}}}</span><span style="font-size: {SMALL}px; color: {T["sub"]}">{{{{c.count}}}}</span></button>'
    tiles = (f'<sc-for list="{{{{chains}}}}" as="c" hint-placeholder-count="3"><sc-if value="{{{{c.on}}}}" hint-placeholder-val="{{{{false}}}}">{tile_on()}</sc-if>'
             f'<sc-if value="{{{{c.off}}}}" hint-placeholder-val="{{{{true}}}}">{tile_off()}</sc-if></sc-for>')
    row = lambda weight: f'<a href="#" style="display: flex; justify-content: space-between; align-items: center; height: 60px; text-decoration: none; border-bottom: 1px solid {T["hair"]}"><span style="font-size: {BODY}px; font-weight: {weight}; color: {T["ink"]}">{{{{chainName}}}} {{{{th.name}}}}</span><span style="display: flex; gap: 10px; align-items: center"><span style="font-size: {SMALL}px; color: {T["sub"]}">{{{{th.fmt}}}}</span>{chev(T["sub"], "right", 18)}</span></a>'
    lst = (f'<sc-for list="{{{{chainTheaters}}}}" as="th" hint-placeholder-count="4"><sc-if value="{{{{th.first}}}}" hint-placeholder-val="{{{{false}}}}">{row(700)}</sc-if>'
           f'<sc-if value="{{{{th.rest}}}}" hint-placeholder-val="{{{{true}}}}">{row(400)}</sc-if></sc-for>')
    return (stepbar(0, kiosk=True) + f'<div style="display: flex; gap: 80px; padding: 56px 80px; flex: 1">'
            f'<div style="width: 400px; display: flex; flex-direction: column; gap: 14px">{bigline("어느 영화관에서<br>보세요?", 40)}<div style="height: 18px"></div>{tiles}</div>'
            f'<div style="flex: 1; display: flex; flex-direction: column"><div style="display: flex; gap: 8px; align-items: baseline; padding-bottom: 12px; border-bottom: 1px solid {T["ink"]}">{body(T, "{{chainName}}", 700)}{small(T, "도면을 받은 극장")}</div>{lst}</div></div>')


def mini_poster_ticket(style):
    w, h = 84, 175
    S = STYLES[style]
    d = S['shape'](w, h)
    N6[0] += 1
    return (f'<div style="display: flex; gap: 16px; align-items: center"><div style="position: relative; width: {w}px; height: {h}px; flex: none; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4))">{poster_svg(w, h, f"m{N6[0]}", d)}</div>'
            f'<div style="display: flex; flex-direction: column; gap: 6px"><span style="font-family: {PMONO}; font-size: 10px; letter-spacing: 2px; color: #A4A4AB">No. {{{{ticketNo}}}}</span>'
            f'<span style="font-family: {DISPLAY}; font-size: 44px; line-height: .9; color: #F4F4F5">{{{{rowL}}}}{{{{col}}}}</span><span style="font-size: {SMALL}px; color: #C9C9CE">{{{{movieTitle}}}} · 13:40</span><span style="font-size: {SMALL}px; color: #C9C9CE">CGV 용산아이파크몰 IMAX관</span></div></div>')


def spec_frame(style):
    S = STYLES[style]
    cap = lambda t: f'<span style="font-family: {PMONO}; font-size: 11px; letter-spacing: 2px; color: #8E8E95">{t}</span>'
    item = lambda mode, label: f'<div style="display: flex; flex-direction: column; align-items: center; gap: 22px">{ticket(style, TW, TH, live=False, mode=mode)}{cap(label)}</div>'
    return f'<div style="flex: 1; background: {BG_STAGE}; display: flex; align-items: center; justify-content: center; gap: 120px">{item("front", "FRONT · 포스터")}{item("back", "BACK · 입장권")}</div>'


def mid_frame(style):
    slot = f'<div style="position: absolute; left: 0; right: 0; top: 0; height: 120px; background: #19191B; border-bottom: 1px solid #2A2A2D; display: flex; align-items: flex-end; justify-content: center"><div style="width: {TW+70}px; height: 16px; border-radius: 8px 8px 0 0; background: #050505; margin-bottom: -1px"></div></div>'
    return f'<div style="position: relative; flex: 1; background: {BG_STAGE}">{slot}<div style="position: absolute; left: 0; right: 0; top: 120px; height: 640px; overflow: hidden; display: flex; justify-content: center">{ticket(style, TW, TH, live=False, mode="mid")}</div></div>'


def frame6(i, row, label, inner, bg):
    x = 40 + i * (FW + GAP)
    y = 40 + row * (36 + FH + 60)
    lab = f'<div style="position: absolute; left: {x}px; top: {y}px; font-size: {BODY}px; font-weight: 700; color: #111111">{label}</div>'
    return lab + f'<div style="position: absolute; left: {x}px; top: {y+36}px; width: {FW}px; height: {FH}px; border-radius: 16px; overflow: hidden; border: 1px solid #E2E2E2; box-sizing: border-box; background: {bg}; display: flex; flex-direction: column">{inner}</div>'


def doc6(title, inner, css, w, h):
    d = doc(title, inner).replace(JS, JS6).replace(GFONTS, FONTS6)
    d = d.replace(f'width: {BW}px; height: {BH}px; position: relative', f'width: {w}px; height: {h}px; position: relative')
    d = d.replace(f'"$preview":{{"width":{BW},"height":{BH}}}', f'"$preview":{{"width":{w},"height":{h}}}')
    return d.replace('button{font-family:inherit}', 'button{font-family:inherit}\n' + css)


ORDER = [('original', '1'), ('film', '2'), ('swiss', '3'), ('thermal', '4')]
BH6 = 40 + 2 * (36 + FH) + 60 + 40
cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ROW2 = BH + 120 + 340
y0 = 6 * ROW2 + 200 + 4 * (BH5 + 200) + 300
JS6 = JS6.replace("panelOn: st.panel ?? true,", "panelLabel: (st.panel ?? true) ? '좌석·티켓 숨기기' : '좌석·티켓 보기',\n      panelOn: st.panel ?? true,", 1)
for i, (style, num) in enumerate(ORDER):
    fn = f'FlowA{num}.dc.html'
    title = f'A-{num} · {STYLES[style]["name"]}'
    s1 = chain_screen()
    s2 = stepbar(1, kiosk=True) + f'<div style="display: flex; gap: 80px; padding: 32px 80px; flex: 1"><div style="width: 360px; display: flex; flex-direction: column; gap: 16px">{small(T, "CGV 용산아이파크몰 · IMAX관")}{bigline("무엇을<br>보세요?", 40)}</div><div style="flex: 1">{movie_list()}</div></div>'
    s3 = stepbar(2, kiosk=True) + seat_screen(T)
    s4 = kiosk_stage(style)
    s5 = viewer_screen(mini_poster_ticket(style))
    inner = ''.join(frame6(k, 0, f'{k+1} · {STEPS[k]}' if k != 0 else '1 · 영화관 (브랜드 → 극장)', s, bg)
                    for k, (s, bg) in enumerate([(s1, T['bg']), (s2, T['bg']), (s3, T['bg']), (s4, BG_STAGE), (s5, BG_STAGE)]))
    inner += frame6(0, 1, '티켓 앞·뒤', spec_frame(style), BG_STAGE) + frame6(1, 1, '4 · 발권 중간 장면 (출력 중)', mid_frame(style), BG_STAGE)
    open(os.path.join(P, fn), 'w').write(doc6(title, inner, css6(style), BW5, BH6))
    canvas['boards'][fn] = {'x': 0, 'y': y0 + i * (BH6 + 200), 'w': BW5, 'h': BH6, 'title': title, 'is_interactive': True}
    if fn not in canvas['order']:
        canvas['order'].append(fn)
canvas['notes']['t7'] = {'x': 0, 'y': y0 - 340, 'text': '흐름 A 확정 — 오리지널 티켓 4종 (키오스크 출력 → 툭 → 포스터)', 'kind': 'title1', 'maxW': BW5}
canvas['notes']['g7'] = {'x': BW5 + 80, 'y': y0, 'w': 380, 'size': 'm', 'fill': 'orange',
                         'text': '각 시안 보는 법\n· 윗줄 = 흐름 1~5, 아랫줄 = 티켓 앞·뒤와 출력 중 장면\n· 재생 후 1번에서 브랜드를 누르면 극장 목록이 바뀌어요\n· 3번에서 좌석을 누르면 4번 키오스크에서 티켓이 다시 출력돼요\n· 4번 "뒷면 보기"로 티켓을 뒤집어요\n· 포스터와 영화 제목은 직접 그린 예시예요'}
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok', BW5, BH6, y0)
