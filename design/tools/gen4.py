#!/usr/bin/env python3
"""movie mate 4차 시안: 실제 영화 티켓 3종(감열지 영수증형, 클래식 꼭지형, 오리지널 티켓)으로 발권 애니메이션 8종(A-2e~l)."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, 'gen2.py')).read()
src = src.replace('<span style="width: 16px; font-size: {SMALL}px; color: {t["sub"]}">', '<span style="width: 16px; font-size: 11px; line-height: 1; color: {t["sub"]}">')
exec(src[:src.index('VARS = [')])

JS4 = JS.replace(
    "pick: () => this.setState({ r: ri, c: ci + 1 }) };",
    "pick: () => this.setState({ r: ri, c: ci + 1, n: (st.n || 0) + 1, hist: [L[r] + '열 ' + c + '번'].concat(st.hist || ['H열 12번', 'K열 7번']).slice(0, 2) }) };")
JS4 = JS4.replace(
    "toggleHeads: () => this.setState({ heads: !heads })",
    "toggleHeads: () => this.setState({ heads: !heads }),\n      tk: !st.n ? 'tk0' : (st.n % 2 ? 'tkA' : 'tkB'),\n      hist1: (st.hist || ['H열 12번', 'K열 7번'])[0], hist2: (st.hist || ['H열 12번', 'K열 7번'])[1],\n      ticketNo: '2611' + String(r + 10) + String(c + 10)")

MONO = "'Nanum Gothic Coding', monospace"
PAPER = '#F7F6F1'
PINK = '#1C1C1C'
DARKT = dict(body='#22262D', stub='#EEE9DD', ink='#F3F1EA', sub='#A9ACB3', stubink='#22262D')
REDT = dict(body='#D83A2C', stub='#FFFFFF', ink='#FFFFFF', sub='#FFD9D3', stubink='#1A1A1A')
SHADOW = 'filter: drop-shadow(0 8px 16px rgba(0,0,0,0.16))'
TK = '{{tk}}'


def kf(name, body):
    return f'@keyframes {name}A{{{body}}}@keyframes {name}B{{{body}}}'


def anim(cls, name, dur, ease='cubic-bezier(.3,.7,.2,1)', delay='0s', zero=''):
    z = f'.{cls}.tk0{{{zero}}}' if zero else ''
    return f'{z}.{cls}.tkA{{animation:{name}A {dur} {ease} {delay} both}}.{cls}.tkB{{animation:{name}B {dur} {ease} {delay} both}}'


# ---------- 부품 ----------
BARS = [2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 2, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2, 1, 3, 2, 1]


def barcode(w, h, color, vertical=False):
    xs, x, k = [], 0, 0
    unit = (w if not vertical else h) / sum(BARS)
    for i, b in enumerate(BARS):
        if i % 2 == 0:
            xs.append((x, b * unit))
        x += b * unit
    if vertical:
        rects = ''.join(f'<rect x="0" y="{p:.1f}" width="{w}" height="{s:.1f}" fill="{color}"></rect>' for p, s in xs)
    else:
        rects = ''.join(f'<rect x="{p:.1f}" y="0" width="{s:.1f}" height="{h}" fill="{color}"></rect>' for p, s in xs)
    return f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" aria-hidden="true" style="display: block">{rects}</svg>'


def zigzag(w, h, tooth=8, depth=5):
    pts = [(0, depth)]
    x = 0
    while x < w:
        pts += [(min(x + tooth / 2, w), 0), (min(x + tooth, w), depth)]
        x += tooth
    pts.append((w, h - depth))
    x = w
    while x > 0:
        pts += [(max(x - tooth / 2, 0), h), (max(x - tooth, 0), h - depth)]
        x -= tooth
    return 'M' + ' L'.join(f'{a:.1f},{b:.1f}' for a, b in pts) + ' Z'


def scallop(w, h, sides='lr', r=5, step=15, corner=8):
    """시계 방향으로 돌며 지정한 변에 반원 홈을 판다(안쪽으로 파이는 호 = sweep 0)."""
    def edge(a, b, along, fixed, horiz, forward):
        segs = []
        length = abs(b - a)
        n = max(1, int((length - 2 * corner) // step))
        start = a + (length - n * step) / 2 * (1 if forward else -1)
        for i in range(n):
            cpos = start + (i + 0.5) * step * (1 if forward else -1)
            p1 = cpos - r * (1 if forward else -1)
            p2 = cpos + r * (1 if forward else -1)
            if horiz:
                segs.append(f'L{p1:.1f},{fixed} A{r},{r} 0 0 0 {p2:.1f},{fixed}')
            else:
                segs.append(f'L{fixed},{p1:.1f} A{r},{r} 0 0 0 {fixed},{p2:.1f}')
        return ' '.join(segs)
    d = f'M0,0 '
    d += (edge(0, w, 'x', 0, True, True) if 't' in sides else '') + f' L{w},0 '
    d += (edge(0, h, 'y', w, False, True) if 'r' in sides else '') + f' L{w},{h} '
    d += (edge(w, 0, 'x', h, True, False) if 'b' in sides else '') + f' L0,{h} '
    d += (edge(h, 0, 'y', 0, False, False) if 'l' in sides else '') + ' Z'
    return d


def svgshape(w, h, d, fill, extra=''):
    return f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" aria-hidden="true" style="position: absolute; inset: 0; overflow: visible"><path d="{d}" fill="{fill}"></path>{extra}</svg>'


def rule(ch='='):
    return f'<div style="overflow: hidden; white-space: nowrap; letter-spacing: -1px; line-height: 1.2">{ch * 60}</div>'


def receipt(w, h, cls='', style='', seat_cls='', big_size=22):
    c = f' class="{cls}"' if cls else ''
    sc = f' class="{seat_cls}"' if seat_cls else ''
    body = f'''<div style="position: relative; padding: 16px 16px 12px; font-family: {MONO}; font-size: 12px; color: #1A1A1A; display: flex; flex-direction: column; gap: 3px; line-height: 1.35">
<div style="text-align: center; font-size: 16px; font-weight: 700; letter-spacing: 2px; margin-bottom: 2px">영화입장권</div>
<div style="display: flex; justify-content: space-between"><span>2026-11-16 13:26 (이용분)</span><span>[일반발권]</span></div>
{rule("=")}
<div style="font-weight: 700">IMAX 2D · [영화 제목]</div>
{rule("-")}
<div>26/11/16(월) [상영 시각]</div>
<div{sc} style="font-size: {big_size}px; font-weight: 700; line-height: 1.2">IMAX관 {{{{seatName}}}}</div>
<div>시야각 {{{{fov}}}} · 올려보기 {{{{up}}}} · {{{{dist}}}}</div>
{rule("=")}
<div>CGV 용산아이파크몰</div>
<div style="margin-top: 6px">{barcode(w - 32, 30, "#1A1A1A")}</div>
<div style="text-align: center; font-size: 11px">{{{{ticketNo}}}}</div>
</div>'''
    return f'<div{c} style="position: relative; width: {w}px; height: {h}px; flex: none; {SHADOW}; {style}">{svgshape(w, h, zigzag(w, h), PAPER)}{body}</div>'


def classic(w, h, pal, stub_cls='', stub_style='', hole=None, title='IMAX관', seat='{{rowL}}{{col}}', body_cls='', body_style=''):
    sx = round(w * 0.72)
    sw = w - sx
    perf = f'<line x1="{sx-0.5}" y1="6" x2="{sx-0.5}" y2="{h-6}" stroke="{pal["sub"]}" stroke-width="1.5" stroke-dasharray="3 4"></line>'
    bc = f' class="{body_cls}"' if body_cls else ''
    body = f'''<div{bc} style="position: absolute; left: 0; top: 0; width: {sx}px; height: {h}px; {body_style}">{svgshape(sx, h, scallop(sx, h, "l"), pal["body"], perf)}
<div style="position: relative; padding: {round(h*0.12)}px 18px 0 22px; display: flex; flex-direction: column; gap: 4px; color: {pal["ink"]}">
<span style="font-size: 11px; color: {pal["sub"]}; letter-spacing: 1px; white-space: nowrap">CGV 용산아이파크몰</span>
<span style="font-family: {DISPLAY}; font-size: {round(h*0.26)}px; line-height: 1">{title}</span>
<div style="display: flex; gap: 14px; align-items: baseline"><span style="font-size: 11px; color: {pal["sub"]}">SEAT</span><span style="font-family: {DISPLAY}; font-size: {round(h*0.2)}px; line-height: 1">{seat}</span></div>
<span style="font-size: 11px; color: {pal["sub"]}">{{{{fov}}}} · {{{{up}}}} · {{{{dist}}}}</span>
</div></div>'''
    sc = f' class="{stub_cls}"' if stub_cls else ''
    hole_html = ''
    if hole:
        hole_html = hole
    stub = f'''<div{sc} style="position: absolute; left: {sx}px; top: 0; width: {sw}px; height: {h}px; transform-origin: 0 100%; {stub_style}">{svgshape(sw, h, scallop(sw, h, "r"), pal["stub"])}
<div style="position: relative; height: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; padding-top: {round(h*0.12) if hole else 0}px; box-sizing: border-box">{barcode(round(sw*0.38), round(h*(0.56 if hole else 0.72)), pal["stubink"], vertical=True)}<span style="writing-mode: vertical-rl; font-size: 10px; color: {pal["stubink"]}; letter-spacing: 1px">No. {{{{ticketNo}}}}</span></div>{hole_html}</div>'''
    return f'<div style="position: relative; width: {w}px; height: {h}px; flex: none; {SHADOW}">{body}{stub}</div>'


def original(w, h, flip_cls='', flip_style=''):
    """메가박스 OT처럼 가장자리가 우표 모양인 카드. 앞면 = 이 좌석에서 본 스크린, 뒷면 = 정보."""
    edge = scallop(w, h, 'tlbr', r=4, step=13, corner=4)
    front = f'''<div style="position: absolute; inset: 0; backface-visibility: hidden">{svgshape(w, h, edge, "#111214")}
<div style="position: absolute; left: 10px; right: 10px; top: 10px; bottom: 46px; overflow: hidden; border-radius: 4px">{view(w-20, h-56, fit="slice")}</div>
<div style="position: absolute; left: 14px; right: 14px; bottom: 14px; display: flex; justify-content: space-between; align-items: baseline; color: #F3F1EA"><span style="font-family: {DISPLAY}; font-size: 22px; line-height: 1">{{{{rowL}}}}{{{{col}}}}</span><span style="font-size: 10px; letter-spacing: 1px">ORIGINAL TICKET</span></div></div>'''
    rows = [('Theater', 'CGV 용산아이파크몰'), ('Screen', 'IMAX관'), ('Seat', '{{seatName}}'), ('View', '{{fov}} · {{up}}'), ('Distance', '{{dist}}'), ('Date', '[상영 일시]')]
    lines = ''.join(f'<div style="display: flex; justify-content: space-between; gap: 8px; padding: 5px 0; border-bottom: 1px solid #CFC6B4"><span style="color: #7A705E">{k}</span><span style="font-weight: 700; color: #2B261D; text-align: right">{v}</span></div>' for k, v in rows)
    back = f'''<div style="position: absolute; inset: 0; backface-visibility: hidden; transform: rotateY(180deg)">{svgshape(w, h, edge, "#E8DFCC")}
<div style="position: relative; padding: 18px 16px; font-size: 11px; display: flex; flex-direction: column; gap: 2px">
<div style="display: flex; justify-content: space-between; color: #7A705E; letter-spacing: 1px; margin-bottom: 8px"><span style="white-space: nowrap">ORIGINAL</span><span style="white-space: nowrap">No. {{{{ticketNo}}}}</span></div>
<span style="font-family: {DISPLAY}; font-size: 28px; line-height: 1; color: #2B261D; margin-bottom: 8px">[영화 제목]</span>{lines}</div></div>'''
    fc = f' class="{flip_cls}"' if flip_cls else ''
    return f'<div style="width: {w}px; height: {h}px; perspective: 900px; flex: none; {SHADOW}"><div{fc} style="position: relative; width: 100%; height: 100%; transform-style: preserve-3d; {flip_style}">{front}{back}</div></div>'


# ---------- 시안 8종 ----------
# 각 함수는 (티켓 HTML 만드는 함수(size, mode), CSS) 를 돌려준다. mode: 'live' | 'mid'
def t_print(size, mode):
    w, h = (300, 330) if size == 'd' else (248, 300)
    cls = TK if mode == 'live' else ''
    st = '' if mode == 'live' else 'transform: translateY(-42%)'
    slot = f'<div style="width: {w+28}px; height: 10px; border-radius: 5px; background: {PINK}; position: relative; z-index: 1"></div>'
    return f'<div style="display: flex; flex-direction: column; align-items: center">{slot}<div style="overflow: hidden; padding: 0 20px 24px; margin-top: -3px"><div class="{cls}" style="{st}">{receipt(w, h, big_size=20 if size == "m" else 22)}</div></div></div>'


CSS_PRINT = kf('pr', '0%{transform:translateY(-100%)}100%{transform:translateY(0)}') + anim('tkA', 'pr', '1.6s', 'steps(14, end)').replace('.tkA.tkA', '.tkA').replace('.tkA.tkB', '.tkB')


def t_tear(size, mode):
    w, h = (300, 330) if size == 'd' else (248, 300)
    st = '' if mode == 'live' else 'transform: translate(2px, 4px) rotate(1.2deg)'
    cls = f'tear {TK}' if mode == 'live' else ''
    edge = f'<div style="width: {w+28}px; height: 10px; border-radius: 5px; background: {PINK}"></div>'
    return f'<div style="display: flex; flex-direction: column; align-items: center; gap: 0">{edge}<div style="padding: 0 20px 30px"><div class="{cls}" style="transform-origin: 20% 0; {st}">{receipt(w, h, big_size=20 if size == "m" else 22)}</div></div></div>'


CSS_TEAR = kf('te', '0%{transform:translateY(-30%);opacity:0}45%{transform:translateY(0);opacity:1}65%{transform:translateY(0) rotate(0)}80%{transform:translateY(-3px) rotate(-1deg)}100%{transform:translate(4px,12px) rotate(3deg)}') + anim('tear', 'te', '1.4s', zero='transform:translate(4px,12px) rotate(3deg)')


def t_scan(size, mode):
    w, h = (300, 330) if size == 'd' else (248, 300)
    scan_st = 'left: 50%' if mode == 'mid' else ''
    scan_cls = f'scan {TK}' if mode == 'live' else ''
    seat_cls = f'ink {TK}' if mode == 'live' else ''
    scan = f'<div class="{scan_cls}" style="position: absolute; top: {h-62}px; height: 40px; width: 3px; border-radius: 2px; background: {LT2["acc"]}; left: 16px; {scan_st}"></div>'
    return f'<div style="position: relative">{receipt(w, h, seat_cls=seat_cls, big_size=20 if size == "m" else 22)}{scan}</div>'


CSS_SCAN = (kf('sc', '0%{left:16px;opacity:1}85%{left:calc(100% - 19px);opacity:1}100%{left:calc(100% - 19px);opacity:0}') + anim('scan', 'sc', '1s', 'linear', zero='opacity:0')
            + kf('ik', '0%,70%{color:#1A1A1A}80%{color:' + LT2['acc'] + '}100%{color:#1A1A1A}') + anim('ink', 'ik', '1.4s', 'linear'))


def t_stub(size, mode):
    w, h = (380, 176) if size == 'd' else (330, 152)
    st = 'transform: translate(6px, 2px) rotate(4deg)' if mode == 'mid' else ''
    cls = f'stub {TK}' if mode == 'live' else ''
    return f'<div style="padding: 10px 30px 30px 0">{classic(w, h, DARKT, stub_cls=cls, stub_style=st)}</div>'


CSS_STUB = kf('sb', '0%{transform:none}30%{transform:translate(2px,0) rotate(1deg)}100%{transform:translate(18px,14px) rotate(9deg)}') + anim('stub', 'sb', '.9s', 'cubic-bezier(.5,0,.3,1)', zero='transform:translate(18px,14px) rotate(9deg)')


def t_roll(size, mode):
    w, h = (290, 150) if size == 'd' else (250, 124)
    drum = round(h * 0.7)
    st = 'transform: translateX(-55%)' if mode == 'mid' else ''
    cls = f'roll {TK}' if mode == 'live' else ''
    drum_html = f'<div style="position: absolute; left: 0; top: {(h-drum)//2}px; width: {drum}px; height: {drum}px; border-radius: 50%; background: {REDT["body"]}; z-index: 1; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 14px rgba(0,0,0,0.18)"><div style="width: 36%; height: 36%; border-radius: 50%; background: #FFFFFF; border: 5px solid #B32D21"></div></div>'
    return f'<div style="position: relative; width: {w + drum - 6}px; height: {h+20}px">{drum_html}<div style="position: absolute; left: {drum - 6}px; top: 0; width: {w}px; height: {h+20}px; overflow: hidden"><div class="{cls}" style="{st}">{classic(w, h, REDT)}</div></div></div>'


CSS_ROLL = kf('ro', '0%{transform:translateX(-100%)}80%{transform:translateX(3%)}100%{transform:translateX(0)}') + anim('roll', 'ro', '1.1s', 'cubic-bezier(.2,.8,.2,1)')


def t_flip(size, mode):
    w, h = (230, 350) if size == 'd' else (180, 276)
    st = 'transform: rotateY(0deg)' if mode == 'mid' else ''
    cls = f'flip {TK}' if mode == 'live' else ''
    return original(w, h, flip_cls=cls, flip_style=st)


CSS_FLIP = kf('fl', '0%,35%{transform:rotateY(0)}100%{transform:rotateY(180deg)}') + anim('flip', 'fl', '1.6s', 'cubic-bezier(.4,0,.2,1)', zero='transform:rotateY(180deg)')


def mini_classic(w, h, name):
    return f'<div style="position: relative; width: {w}px; height: {h}px; {SHADOW}">{svgshape(w, h, scallop(w, h, "lr"), DARKT["body"])}<div style="position: relative; padding: 8px 22px; display: flex; gap: 10px; align-items: baseline; color: {DARKT["ink"]}"><span style="font-size: 11px; color: {DARKT["sub"]}">이전 자리</span><span style="font-size: 13px; font-weight: 700">{name}</span></div></div>'


def t_stack(size, mode):
    w, h = (360, 168) if size == 'd' else (310, 140)
    st = 'transform: translate(-24px, -30px) rotate(-6deg)' if mode == 'mid' else ''
    cls = f'deal {TK}' if mode == 'live' else ''
    b2 = f'<div style="position: absolute; left: 20px; top: 0; transform: rotate(3deg)">{mini_classic(w-20, h-24, "{{hist2}}")}</div>'
    b1 = f'<div style="position: absolute; left: 8px; top: 30px; transform: rotate(-2deg)">{mini_classic(w-10, h-14, "{{hist1}}")}</div>'
    top = f'<div class="{cls}" style="position: absolute; left: 0; top: 62px; {st}">{classic(w, h, REDT)}</div>'
    return f'<div style="position: relative; width: {w+24}px; height: {h+70}px">{b2}{b1}{top}</div>'


CSS_STACK = kf('dl', '0%{transform:translate(-60px,-70px) rotate(-10deg);opacity:0}100%{transform:none;opacity:1}') + anim('deal', 'dl', '.7s', 'cubic-bezier(.2,.8,.2,1)')


def t_punch(size, mode):
    w, h = (380, 176) if size == 'd' else (330, 152)
    hole_st = 'transform: scale(1)' if mode == 'mid' else ''
    chad_st = 'transform: translate(6px, 34px) rotate(40deg); opacity: 1' if mode == 'mid' else 'opacity: 0'
    hc = f'hole {TK}' if mode == 'live' else ''
    cc = f'chad {TK}' if mode == 'live' else ''
    bg = '{{BG}}'
    hole = (f'<div class="{hc}" style="position: absolute; left: calc(50% - 8px); top: 8px; width: 16px; height: 16px; border-radius: 50%; background: HOLEBG; border: 1.5px solid #C9C9C9; box-sizing: border-box; box-shadow: inset 0 2px 3px rgba(0,0,0,0.2); {hole_st}"></div>'
            f'<div class="{cc}" style="position: absolute; left: calc(50% - 8px); top: 8px; width: 16px; height: 16px; border-radius: 50%; background: {REDT["stub"]}; border: 1px solid #DDDDDD; box-sizing: border-box; {chad_st}"></div>')
    return f'<div style="padding: 0 0 50px">{classic(w, h, REDT, hole=hole)}</div>'


CSS_PUNCH = (kf('ho', '0%{transform:scale(0)}100%{transform:scale(1)}') + anim('hole', 'ho', '.25s', 'cubic-bezier(.3,1.6,.5,1)')
             + kf('ch', '0%{transform:none;opacity:1}100%{transform:translate(14px,90px) rotate(160deg);opacity:0}') + anim('chad', 'ch', '.8s', 'cubic-bezier(.4,0,.8,.6)', '.2s', zero='opacity:0'))

VARIANTS = [
    ('e', '감열지 출력', t_print, CSS_PRINT),
    ('f', '감열지 찢어내기', t_tear, CSS_TEAR),
    ('g', '바코드 검표', t_scan, CSS_SCAN),
    ('h', '꼭지 떼기', t_stub, CSS_STUB),
    ('i', '롤 티켓 뽑기', t_roll, CSS_ROLL),
    ('j', '오리지널 티켓 뒤집기', t_flip, CSS_FLIP),
    ('k', '티켓 쌓기', t_stack, CSS_STACK),
    ('l', '검표 펀치', t_punch, CSS_PUNCH),
]


def view_ctrl(w, h, t):
    """모바일: 시야 위에 앞사람 버튼을 겹친다."""
    b = f'<button onClick="{{{{toggleHeads}}}}" style="height: 32px; padding: 0 12px; border: 0; border-radius: 9px; background: rgba(255,255,255,0.14); color: #F4F4F5; font-size: {SMALL}px; font-weight: 500; cursor: pointer">{{{{headsLabel}}}}</button>'
    return f'<div style="position: relative; flex: none">{view(w, h, radius=14)}<div style="position: absolute; right: 10px; bottom: 10px">{b}</div></div>'


def seat_mobile(t, tfn, mode):
    tick = tfn('m', mode).replace('HOLEBG', t['bg'])
    return (f'<div style="display: flex; align-items: center; height: 52px; padding: 0 8px">{back(t["ink"])}<span style="font-size: {BODY}px; font-weight: 700; color: {t["ink"]}">IMAX관</span></div>'
            f'<div style="padding: 4px 20px 0; display: flex; flex-direction: column; gap: 14px">{view_ctrl(350, 150, t)}'
            f'<div style="height: 334px; display: flex; align-items: center; justify-content: center">{tick}</div>'
            f'{seatmap(t, cell=9, gap=3)}</div>')


def seat_desk(t, tfn):
    tick = tfn('d', 'live').replace('HOLEBG', t['bg'])
    return desk(t, f'<div style="display: flex; gap: 56px; padding: 48px 80px; height: 100%; box-sizing: border-box"><div style="flex: 1; display: flex; flex-direction: column; gap: 20px">{view(800, 716, radius=16)}<div style="display: flex; justify-content: space-between; align-items: center">{sub(t, "CGV 용산아이파크몰 · IMAX관")}{ctrls(t)}</div></div><div style="width: 400px; display: flex; flex-direction: column; gap: 24px"><div style="height: 440px; display: flex; align-items: center; justify-content: center">{tick}</div>{seatmap(t, cell=13, gap=4)}</div></div>')


def doc4(title, inner, css):
    fonts = GFONTS.replace('family=Bebas+Neue', 'family=Bebas+Neue&amp;family=Nanum+Gothic+Coding:wght@400;700')
    d = doc(title, inner).replace(JS, JS4).replace(GFONTS, fonts)
    return d.replace('button{font-family:inherit}', 'button{font-family:inherit}\n' + css)


cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ROW2 = BH + 120 + 340
y5 = 4 * ROW2
for i, (letter, label, tfn, css) in enumerate(VARIANTS):
    fn = f'SeatA2{letter}.dc.html'
    title = f'A-2{letter} · {label}'
    inner = seat_desk(LT2, tfn) + phones([(LT2, seat_mobile(LT2, tfn, 'live'), 54), (DK2, seat_mobile(DK2, tfn, 'live'), 54), (LT2, seat_mobile(LT2, tfn, 'mid'), 54)])
    open(os.path.join(P, fn), 'w').write(doc4(title, inner, css))
    col, rw = i % 4, i // 4
    canvas['boards'][fn] = {'x': col * (BW + 80), 'y': y5 + rw * (BH + 120), 'w': BW, 'h': BH, 'title': title, 'is_interactive': True}
    if fn not in canvas['order']:
        canvas['order'].append(fn)
rowW = 4 * BW + 3 * 80
canvas['notes']['t5'] = {'x': 0, 'y': y5 - 340, 'text': 'A-2 입장권 다시 — 실제 티켓 발권 애니메이션 8종', 'kind': 'title1', 'maxW': rowW}
canvas['notes']['g5'] = {'x': rowW + 80, 'y': y5, 'w': 360, 'size': 'm', 'fill': 'orange',
                         'text': '각 시안 보는 법\n· 위 = 데스크톱\n· 아래 왼쪽부터 = 휴대폰 라이트, 휴대폰 다크, 애니메이션 중간 장면\n· 재생 버튼을 누른 뒤 좌석을 누르면 발권 애니메이션이 나와요\n· e~g 감열지 영수증형, h·i·k·l 꼭지 달린 클래식 티켓, j 오리지널 티켓'}
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok')
