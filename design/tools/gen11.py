#!/usr/bin/env python3
"""movie mate 11차: 티켓 화면을 지나가는 장면으로 — 버튼 없음. 출력 → 툭 → 두 장으로 나뉘며 왼쪽은 포스터로 뒤집힘 → 자동으로 시야."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
g10 = open(os.path.join(HERE, 'gen10.py')).read()
# gen10의 화면 조립 직전까지(부품과 s1~s5 정의 포함)
exec(g10[:g10.index("inner = ''.join(frame6(")])

SHIFT = 150   # 두 장이 벌어지는 거리(px, 티켓 폭 250 기준)
DUR = '3.4s'


def css11():
    k = lambda n, b: kf(n, b)
    out = (k('pt', '0%{transform:translateY(-102%)}34%,100%{transform:translateY(0)}')
           + k('pp', '0%,36%{transform:none}44%{transform:translateY(46px) scale(1.06)}52%,100%{transform:translateY(34px) scale(1)}')
           + k('ml', f'0%,56%{{transform:translateX(0)}}78%,100%{{transform:translateX(-{SHIFT}px)}}')
           + k('fp', '0%,62%{transform:rotateY(0)}88%,100%{transform:rotateY(180deg)}')
           + k('cp', f'0%,54%{{transform:translateX(0);opacity:0}}58%{{opacity:1}}78%,100%{{transform:translateX({SHIFT}px);opacity:1}}'))
    a = lambda cls, name, ease='cubic-bezier(.3,.7,.2,1)': f'.{cls}.tkA{{animation:{name}A {DUR} {ease} both}}.{cls}.tkB{{animation:{name}B {DUR} {ease} both}}'
    out += a('print', 'pt') + a('pop', 'pp') + a('movel', 'ml') + a('flipa', 'fp', 'cubic-bezier(.5,0,.2,1)') + a('copy', 'cp')
    out += f'.pop.tk0{{transform:translateY(34px)}}.movel.tk0{{transform:translateX(-{SHIFT}px)}}.flipa.tk0{{transform:rotateY(180deg)}}.copy.tk0{{transform:translateX({SHIFT}px);opacity:1}}'
    return out


def faces(style, w, h, live_flip):
    S = STYLES[style]
    d = S['shape'](w, h)
    N6[0] += 1
    u = f'k{N6[0]}'
    front = f'<div style="position: absolute; inset: 0; backface-visibility: hidden; transform: rotateY(180deg)">{poster_svg(w, h, u + "f", d)}</div>'
    back = f'<div style="position: absolute; inset: 0; backface-visibility: hidden">{S["back"](w, h, d, u + "b")}</div>'
    return f'<div style="position: relative; width: {w}px; height: {h}px; transform-style: preserve-3d">{back}{front}</div>'


def pair_stage(style):
    slot = (f'<div style="position: absolute; left: 0; right: 0; top: 0; height: 120px; background: #19191B; border-bottom: 1px solid #2A2A2D; display: flex; align-items: flex-end; justify-content: center">'
            f'<div style="width: {TW+70}px; height: 16px; border-radius: 8px 8px 0 0; background: #050505; margin-bottom: -1px"></div></div>')
    shadow = 'filter: drop-shadow(0 18px 30px rgba(0,0,0,0.45))'
    # 뒤에 숨어 있다가 오른쪽으로 빠져나오는 둘째 장(뒷면 = 입장권)
    copy = (f'<div style="position: absolute; left: 50%; top: 0; margin-left: -{TW//2}px; transform: translateY(34px)">'
            f'<div class="copy {TK}" style="{shadow}">{faces(style, TW, TH, False)}</div></div>')
    # 출력되는 첫 장 → 왼쪽으로 가며 포스터 면으로 뒤집힘
    main = (f'<div style="position: absolute; left: 50%; top: 0; margin-left: -{TW//2}px; perspective: 1400px; {shadow}">'
            f'<div class="print {TK}" style="transform-style: preserve-3d"><div class="pop {TK}" style="transform-style: preserve-3d">'
            f'<div class="movel {TK}" style="transform-style: preserve-3d"><div class="flipa {TK}" style="transform-style: preserve-3d">{faces(style, TW, TH, True)}</div></div></div></div></div>')
    area = f'<div style="position: absolute; left: 0; right: 0; top: 120px; bottom: 0; overflow: hidden">{copy}{main}</div>'
    return f'<div style="position: relative; flex: 1; background: {BG_STAGE}">{slot}{area}</div>'


def pair_static(style, mode):
    """mode: split(두 장으로 나뉘는 중) | final(멈춘 모습)"""
    sh = 'filter: drop-shadow(0 18px 30px rgba(0,0,0,0.45))'
    if mode == 'split':
        lx, rx, rot = -110, 110, 55
    else:
        lx, rx, rot = -SHIFT, SHIFT, 180
    left = f'<div style="position: absolute; left: 50%; top: 154px; margin-left: -{TW//2}px; perspective: 1400px; {sh}"><div style="transform: translateX({lx}px)"><div style="transform-style: preserve-3d; transform: rotateY({rot}deg)">{faces(style, TW, TH, True)}</div></div></div>'
    right = f'<div style="position: absolute; left: 50%; top: 154px; margin-left: -{TW//2}px; {sh}"><div style="transform: translateX({rx}px)">{faces(style, TW, TH, False)}</div></div>'
    slot = f'<div style="position: absolute; left: 0; right: 0; top: 0; height: 120px; background: #19191B; border-bottom: 1px solid #2A2A2D; display: flex; align-items: flex-end; justify-content: center"><div style="width: {TW+70}px; height: 16px; border-radius: 8px 8px 0 0; background: #050505; margin-bottom: -1px"></div></div>'
    return f'<div style="position: relative; flex: 1; background: {BG_STAGE}">{slot}{right}{left}</div>'


s4 = pair_stage('original')
labels = ['1 · 영화관', '2 · 상영 시간', '3 · 좌석', '4 · 티켓 (버튼 없이 자동으로 5번으로)', '5 · 시야']
inner = ''.join(frame6(k, 0, labels[k], s, bg)
                for k, (s, bg) in enumerate([(s1, T['bg']), (s2, T['bg']), (s3, T['bg']), (s4, BG_STAGE), (s5, BG_STAGE)]))
inner += (frame6(0, 1, '4 · 출력 중', mid_frame('original'), BG_STAGE)
          + frame6(1, 1, '4 · 두 장으로 나뉘며 뒤집히는 중', pair_static('original', 'split'), BG_STAGE)
          + frame6(2, 1, '4 · 멈춘 모습 (곧 5번으로)', pair_static('original', 'final'), BG_STAGE))

BH11 = 40 + 2 * (36 + FH) + 60 + 40
fn = 'FlowA1R2.dc.html'
title = '흐름 A 수정 2 · 티켓은 지나가는 장면'
open(os.path.join(P, fn), 'w').write(doc7(title, inner, css11(), BW5, BH11))

cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ref = canvas['boards']['FlowA1R.dc.html']
y = ref['y'] + ref['h'] + 560
canvas['boards'][fn] = {'x': 0, 'y': y, 'w': BW5, 'h': BH11, 'title': title, 'is_interactive': True}
if fn not in canvas['order']:
    canvas['order'].append(fn)
canvas['notes']['t11'] = {'x': 0, 'y': y - 340, 'text': '흐름 A 수정 2 — 티켓 출력 → 두 장으로 → 한 장 뒤집힘 → 자동으로 시야', 'kind': 'title1', 'maxW': BW5}
canvas['notes']['g11'] = {'x': BW5 + 80, 'y': y, 'w': 380, 'size': 'm', 'fill': 'orange',
                          'text': '보는 법\n· 4번에 버튼이 없어요. 실제 앱에선 애니메이션(약 3.4초)이 끝나면 5번으로 자동으로 넘어가요\n· 3번에서 좌석을 누르면 4번 애니메이션이 다시 나와요\n· 아랫줄 = 4번의 단계별 정지 장면'}
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok', y)
