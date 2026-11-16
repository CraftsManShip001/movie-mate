#!/usr/bin/env python3
"""movie mate 3차 시안: A-2(입장권)에 발권 애니메이션 4종(A-2a~d). gen2.py의 부품을 그대로 쓴다."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, 'gen2.py')).read()
exec(src[:src.index('VARS = [')])  # 부품만 가져옴 (ROOT 등은 sys.argv[1])

# 좌석을 누를 때마다 n이 늘고, 짝/홀 클래스가 바뀌어 애니메이션이 다시 돈다. 첫 화면(n=0)은 애니메이션 없음.
JS3 = JS.replace("pick: () => this.setState({ r: ri, c: ci + 1 }) };",
                 "pick: () => this.setState({ r: ri, c: ci + 1, n: (st.n || 0) + 1 }) };")
JS3 = JS3.replace("toggleHeads: () => this.setState({ heads: !heads })",
                  "toggleHeads: () => this.setState({ heads: !heads }),\n      tk: !st.n ? 'tk0' : (st.n % 2 ? 'tkA' : 'tkB')")

ANIM = {
    'print': '''@keyframes printA{0%{transform:translateY(-102%)}70%{transform:translateY(4%)}100%{transform:translateY(0)}}
@keyframes printB{0%{transform:translateY(-102%)}70%{transform:translateY(4%)}100%{transform:translateY(0)}}
.tkA{animation:printA 1.1s cubic-bezier(.3,.7,.2,1) both}.tkB{animation:printB 1.1s cubic-bezier(.3,.7,.2,1) both}''',
    'tear': '''@keyframes tearA{0%{transform:none}40%{transform:translate(2px,0) rotate(0deg)}100%{transform:translate(12px,6px) rotate(5deg)}}
@keyframes tearB{0%{transform:none}40%{transform:translate(2px,0) rotate(0deg)}100%{transform:translate(12px,6px) rotate(5deg)}}
.stub.tk0{transform:translate(12px,6px) rotate(5deg)}.stub.tkA{animation:tearA .8s cubic-bezier(.5,0,.2,1) both}.stub.tkB{animation:tearB .8s cubic-bezier(.5,0,.2,1) both}''',
    'stamp': '''@keyframes stampA{0%{transform:scale(1.8) rotate(-14deg);opacity:0}60%{transform:scale(.94) rotate(-7deg);opacity:1}100%{transform:scale(1) rotate(-7deg);opacity:1}}
@keyframes stampB{0%{transform:scale(1.8) rotate(-14deg);opacity:0}60%{transform:scale(.94) rotate(-7deg);opacity:1}100%{transform:scale(1) rotate(-7deg);opacity:1}}
.stamp.tk0{transform:rotate(-7deg)}.stamp.tkA{animation:stampA .55s cubic-bezier(.3,.6,.3,1) both}.stamp.tkB{animation:stampB .55s cubic-bezier(.3,.6,.3,1) both}''',
    'flip': '''@keyframes flipA{0%{transform:rotateX(90deg)}100%{transform:rotateX(0)}}
@keyframes flipB{0%{transform:rotateX(90deg)}100%{transform:rotateX(0)}}
.flap{transform-origin:50% 50%}.flap.tkA{animation:flipA .45s cubic-bezier(.3,.7,.3,1) both}.flap.tkB{animation:flipB .45s cubic-bezier(.3,.7,.3,1) both}
.d2.tkA,.d2.tkB{animation-delay:.12s}.d3.tkA,.d3.tkB{animation-delay:.24s}''',
}


def doc3(title, inner, anim):
    d = doc(title, inner).replace(JS, JS3)
    return d.replace('button{font-family:inherit}', 'button{font-family:inherit}\n' + anim)


def ticket_svg(t, w, h, sx, split=None):
    """입장권 외곽선: 절취선 위아래에 반원 홈. split='main'|'stub'이면 그 조각만."""
    r, c = 9, 12
    s = t['ink']
    if split == 'main':
        d = f'M{c},0 H{sx} V{h} H{c} Q0,{h} 0,{h-c} V{c} Q0,0 {c},0 Z'
        perf = ''
    elif split == 'stub':
        w2 = w - sx
        d = f'M0,0 H{w2-c} Q{w2},0 {w2},{c} V{h-c} Q{w2},{h} {w2-c},{h} H0 Z'
        return f'<svg width="{w2}" height="{h}" viewBox="0 0 {w2} {h}" aria-hidden="true" style="position: absolute; inset: 0"><path d="{d}" fill="{t["bg"]}" stroke="{s}" stroke-width="1.5" stroke-dasharray="0"></path><line x1="0.75" y1="0" x2="0.75" y2="{h}" stroke="{s}" stroke-width="1.5" stroke-dasharray="4 4"></line></svg>'
    else:
        d = (f'M{c},0 H{sx-r} A{r},{r} 0 0 0 {sx+r},0 H{w-c} Q{w},0 {w},{c} V{h-c} Q{w},{h} {w-c},{h} '
             f'H{sx+r} A{r},{r} 0 0 0 {sx-r},{h} H{c} Q0,{h} 0,{h-c} V{c} Q0,0 {c},0 Z')
        perf = f'<line x1="{sx}" y1="{r+4}" x2="{sx}" y2="{h-r-4}" stroke="{s}" stroke-width="1.5" stroke-dasharray="4 4"></line>'
    return f'<svg width="{w}" height="{h}" viewBox="-1 -1 {w+2} {h+2}" aria-hidden="true" style="position: absolute; inset: 0; overflow: visible"><path d="{d}" fill="{t["bg"]}" stroke="{s}" stroke-width="1.5"></path>{perf}</svg>'


def field(t, k, v, size, acc=False, cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<div style="display: flex; flex-direction: column; gap: 4px"><span style="font-size: {SMALL}px; color: {t["sub"]}">{k}</span><span{c} style="display: inline-block; font-family: {DISPLAY}; font-size: {size}px; line-height: 1; color: {t["acc"] if acc else t["ink"]}">{v}</span></div>'


def ticket_body(t, size, flip=False, stamp=False):
    if flip:
        tile = lambda v, cls: f'<span class="flap {cls} {{{{tk}}}}" style="display: inline-flex; align-items: center; justify-content: center; min-width: {int(size*0.75)}px; height: {int(size*1.1)}px; padding: 0 6px; border-radius: 6px; background: {t["ink"]}; color: {t["bg"]}; font-family: {DISPLAY}; font-size: {size}px; line-height: 1; position: relative">{v}<span style="position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: {t["bg"]}"></span></span>'
        fields = f'<div style="display: flex; gap: 20px; align-items: flex-end">{field(t, "상영관", "IMAX", size)}<div style="display: flex; flex-direction: column; gap: 4px"><span style="font-size: {SMALL}px; color: {t["sub"]}">좌석</span><div style="display: flex; gap: 4px">{tile("{{rowL}}", "d1")}{tile("{{col}}", "d2")}</div></div></div>'
    else:
        fields = f'<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 12px">{field(t, "상영관", "IMAX", size)}{field(t, "열", "{{rowL}}", size, not stamp)}{field(t, "번", "{{col}}", size, not stamp)}</div>'
    return f'<div style="display: flex; flex-direction: column; gap: 14px"><span style="font-size: {SMALL}px; color: {t["sub"]}">CGV 용산아이파크몰 · [상영 시각]</span>{fields}{metrics(t, gap=24)}</div>'


def stub_body(t, size):
    return f'<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; height: 100%"><span style="font-size: {SMALL}px; color: {t["sub"]}">좌석</span><span style="font-family: {DISPLAY}; font-size: {size}px; line-height: 1; color: {t["ink"]}">{{{{rowL}}}}{{{{col}}}}</span></div>'


def ticket(t, kind, w, h=210, size=40):
    sx = w - 92
    inner_pad = 'padding: 20px 22px'
    body = ticket_body(t, size, flip=(kind == 'flip'), stamp=(kind == 'stamp'))
    if kind == 'tear':
        main = f'<div style="position: absolute; left: 0; top: 0; width: {sx}px; height: {h}px">{ticket_svg(t, w, h, sx, "main")}<div style="position: relative; {inner_pad}">{body}</div></div>'
        stub = f'<div class="stub {{{{tk}}}}" style="position: absolute; left: {sx}px; top: 0; width: {w-sx}px; height: {h}px; transform-origin: 0 0">{ticket_svg(t, w, h, sx, "stub")}<div style="position: relative; height: 100%">{stub_body(t, 30)}</div></div>'
        return f'<div style="position: relative; width: {w}px; height: {h}px; flex: none">{main}{stub}</div>'
    extra = ''
    if kind == 'stamp':
        extra = f'<div class="stamp {{{{tk}}}}" style="position: absolute; right: 10px; top: calc(50% - 24px); padding: 6px 8px; border: 2.5px solid {t["acc"]}; border-radius: 8px; color: {t["acc"]}; font-family: {DISPLAY}; font-size: 30px; line-height: 1">{{{{rowL}}}} {{{{col}}}}</div>'
    tk = f'<div style="position: relative; width: {w}px; height: {h}px; flex: none">{ticket_svg(t, w, h, sx)}<div style="position: relative; display: flex; height: 100%"><div style="flex: 1; {inner_pad}">{body}</div><div style="width: {w-sx}px">{"" if kind == "stamp" else stub_body(t, 30)}</div></div>{extra}</div>'
    if kind == 'print':
        slot = f'<div style="height: 8px; border-radius: 4px; background: {t["ink"]}; margin: 0 -10px"></div>'
        return f'<div style="display: flex; flex-direction: column; width: {w}px">{slot}<div style="overflow: hidden; padding: 0 2px 4px; margin: 0 -2px"><div class="{{{{tk}}}}">{tk}</div></div></div>'
    return tk


def seat_mobile(t, kind):
    return (f'<div style="display: flex; align-items: center; height: 52px; padding: 0 8px">{back(t["ink"])}<span style="font-size: {BODY}px; font-weight: 700; color: {t["ink"]}">IMAX관</span></div>'
            f'<div style="padding: 4px 20px 0; display: flex; flex-direction: column; gap: 16px">{view(350, 170, radius=14)}{ticket(t, kind, 350, 180, 36)}{ctrls(t)}{seatmap(t, cell=11, gap=3)}</div>')


def seat_desk(t, kind):
    return desk(t, f'<div style="display: flex; gap: 56px; padding: 56px 80px; height: 100%; box-sizing: border-box"><div style="flex: 1; display: flex; flex-direction: column; gap: 20px">{view(800, 700, radius=16)}<div style="display: flex; justify-content: space-between; align-items: center">{sub(t, "CGV 용산아이파크몰 · IMAX관")}{ctrls(t)}</div></div><div style="width: 400px; display: flex; flex-direction: column; gap: 36px">{ticket(t, kind, 400, 220, 48)}{seatmap(t, cell=14, gap=4)}</div></div>')


NAMES = [('print', 'a', '발권기에서 나오기'), ('tear', 'b', '반쪽 뜯기'), ('stamp', 'c', '좌석 도장'), ('flip', 'd', '숫자판 넘기기')]
cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ROW2 = BH + 120 + 340
y4 = 3 * ROW2
for i, (kind, letter, label) in enumerate(NAMES):
    fn = f'SeatA2{letter}.dc.html'
    title = f'A-2{letter} · {label}'
    home = home_d(LT2, f'font-size: {BODY}px; font-weight: 700; color: {LT2["ink"]}', head=question(LT2, 30), perforated=True)
    inner = seat_desk(LT2, kind) + phones([(LT2, home, 54), (LT2, seat_mobile(LT2, kind), 54), (DK2, seat_mobile(DK2, kind), 54)])
    open(os.path.join(P, fn), 'w').write(doc3(title, inner, ANIM[kind]))
    canvas['boards'][fn] = {'x': i * (BW + 80), 'y': y4, 'w': BW, 'h': BH, 'title': title, 'is_interactive': True}
    if fn not in canvas['order']:
        canvas['order'].append(fn)
rowW = 4 * BW + 3 * 80
canvas['notes']['t4'] = {'x': 0, 'y': y4 - 340, 'text': 'A-2 입장권 — 발권 애니메이션 4종', 'kind': 'title1', 'maxW': rowW}
canvas['notes']['g4'] = {'x': rowW + 80, 'y': y4, 'w': 360, 'size': 'm', 'fill': 'orange',
                         'text': '각 시안 보는 법\n· 위 = 데스크톱, 아래 = 홈 D, 좌석 라이트, 좌석 다크\n· 재생 버튼을 누른 뒤 좌석을 누르면 입장권이 새로 발권돼요\n· 애니메이션은 좌석을 바꿀 때마다 다시 나와요'}
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok')
