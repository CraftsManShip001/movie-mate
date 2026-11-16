#!/usr/bin/env python3
"""movie mate 8차: A-1 티켓 제목 글꼴 4종 비교 (앞면·뒷면)."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
g7 = open(os.path.join(HERE, 'gen7.py')).read()
exec(g7[:g7.index('BH6 = 40')])

FONTS = [
    ('a', '모던 고딕', 'IBM Plex Sans KR', "'IBM Plex Sans KR', sans-serif", 600, '-0.5'),
    ('b', '단정한 명조', 'Gowun Batang', "'Gowun Batang', serif", 700, '0'),
    ('c', '굵은 포스터 고딕', 'Black Han Sans', "'Black Han Sans', sans-serif", 400, '0'),
    ('d', '현대 명조', 'Hahmlet', "'Hahmlet', serif", 600, '-0.5'),
]
EXTRA = '&amp;family=IBM+Plex+Sans+KR:wght@600&amp;family=Gowun+Batang:wght@700&amp;family=Black+Han+Sans&amp;family=Hahmlet:wght@600'

FRONT_OLD = 'font-family="Noto Serif KR, serif" font-weight="900" font-size'
BACK_OLD = f'font-family: {SERIF}; font-weight: 900; font-size: 30px'

TW8, TH8 = 250, 520
COLW = TW8 + 120
BW8 = 120 + 4 * TW8 + 3 * 120 + 120
BH8 = 100 + TH8 + 70 + TH8 + 100


def col(i, letter, label, fam, css, wt, ls):
    x = 120 + i * COLW
    front = ticket('original', TW8, TH8, live=False, mode='front').replace(FRONT_OLD, f'font-family="{fam}" font-weight="{wt}" letter-spacing="{ls}" font-size')
    back = ticket('original', TW8, TH8, live=False, mode='back').replace(BACK_OLD, f'font-family: {css}; font-weight: {wt}; letter-spacing: {ls}px; font-size: 30px')
    cap = f'<div style="position: absolute; left: {x}px; top: 40px; display: flex; gap: 10px; align-items: baseline"><span style="font-size: {BODY}px; font-weight: 700; color: #F4F4F5">{letter.upper()} · {label}</span><span style="font-family: {PMONO}; font-size: 11px; color: #8E8E95">{fam}</span></div>'
    return (cap + f'<div style="position: absolute; left: {x}px; top: 100px">{front}</div>'
            f'<div style="position: absolute; left: {x}px; top: {100 + TH8 + 70}px">{back}</div>')


inner = f'<div style="position: absolute; inset: 0; background: {BG_STAGE}"></div>' + ''.join(col(i, *f) for i, f in enumerate(FONTS))
fn = 'TitleFont.dc.html'
d = doc7('A-1 제목 글꼴 4종', inner, css6('original'), BW8, BH8)
d = d.replace('family=IBM+Plex+Mono:wght@400;500', 'family=IBM+Plex+Mono:wght@400;500' + EXTRA)
open(os.path.join(P, fn), 'w').write(d)

cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ref = canvas['boards']['FlowA1P.dc.html']
canvas['boards'][fn] = {'x': ref['w'] + 600, 'y': ref['y'], 'w': BW8, 'h': BH8, 'title': 'A-1 제목 글꼴 4종'}
if fn not in canvas['order']:
    canvas['order'].append(fn)
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok', BW8, BH8)
