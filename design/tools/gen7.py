#!/usr/bin/env python3
"""movie mate 7차: A-1(오리지널 티켓)에 실제 상영작 포스터(오디세이, TMDB) 넣기. 보드 하나."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
g6 = open(os.path.join(HERE, 'gen6.py')).read()
exec(g6[:g6.index('ORDER = [')])

BLOB = '/_blob/7311fb27350ae63e3cd0964fc61338d6'
TITLE, EN = '오디세이', 'THE ODYSSEY'
JS6 = JS6.replace("panelOn: st.panel ?? true,", "panelLabel: (st.panel ?? true) ? '좌석·티켓 숨기기' : '좌석·티켓 보기',\n      panelOn: st.panel ?? true,", 1)
JS7 = JS6.replace("'밤의 궤도'", f"'{TITLE}'")
MOVIES[0] = (TITLE, '[등급]', '[상영 시간]', '#1A120D', '#C8612A')

_poster_flat = poster


def poster(m, w, h, t=T):
    if m[0] == TITLE:
        return f'<img src="{BLOB}" alt="{TITLE} 포스터" style="width: {w}px; height: {h}px; object-fit: cover; border-radius: 8px; flex: none; display: block">'
    return _poster_flat(m, w, h, t)


def poster_svg(w, h, uid, d, perf=False):
    """앞면: 위는 실제 포스터(2:3), 아래 띠는 입장 정보."""
    ph = round(w * 1.5)
    s = w / 250
    mid = ph + (h - ph) / 2
    band = (f'<rect x="0" y="{ph}" width="{w}" height="{h-ph}" fill="#120D0A"></rect>'
            f'<line x1="{16*s:.1f}" y1="{ph + 1}" x2="{w-16*s:.1f}" y2="{ph + 1}" stroke="#C8612A" stroke-width="{1.2*s:.1f}"></line>'
            f'<text x="{w/2:.1f}" y="{mid - 4*s:.1f}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="{10*s:.1f}" fill="#E9DDCB" letter-spacing="{2*s:.1f}">2026.11.16 (월) 13:40</text>'
            f'<text x="{w/2:.1f}" y="{mid + 16*s:.1f}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="{8.5*s:.1f}" fill="#9C8E80" letter-spacing="{1.5*s:.1f}">CGV 용산아이파크몰 · IMAX관</text>')
    art = f'<image href="{BLOB}" x="0" y="0" width="{w}" height="{ph}" preserveAspectRatio="xMidYMid slice"></image>{band}'
    return clip_svg(w, h, d, art, uid)


src_back = back_original


def back_original(w, h, d, uid):
    return src_back(w, h, d, uid).replace('THE NIGHT ORBIT · 2026', f'{EN} · 2026')


STYLES['original']['back'] = back_original


def doc7(title, inner, css, w, h):
    return doc6(title, inner, css, w, h).replace(JS6, JS7)


BH6 = 40 + 2 * (36 + FH) + 60 + 40
style = "original"
fn = 'FlowA1P.dc.html'
title = 'A-1 · 실제 포스터 (오디세이)'
s1 = chain_screen()
s2 = stepbar(1, kiosk=True) + f'<div style="display: flex; gap: 80px; padding: 32px 80px; flex: 1"><div style="width: 360px; display: flex; flex-direction: column; gap: 16px">{small(T, "CGV 용산아이파크몰 · IMAX관")}{bigline("무엇을<br>보세요?", 40)}</div><div style="flex: 1">{movie_list()}</div></div>'
s3 = stepbar(2, kiosk=True) + seat_screen(T)
s4 = kiosk_stage(style)
s5 = viewer_screen(mini_poster_ticket(style))
inner = ''.join(frame6(k, 0, f'{k+1} · {STEPS[k]}' if k else '1 · 영화관 (브랜드 → 극장)', s, bg)
                for k, (s, bg) in enumerate([(s1, T['bg']), (s2, T['bg']), (s3, T['bg']), (s4, BG_STAGE), (s5, BG_STAGE)]))
inner += frame6(0, 1, '티켓 앞·뒤', spec_frame(style), BG_STAGE) + frame6(1, 1, '4 · 발권 중간 장면 (출력 중)', mid_frame(style), BG_STAGE)
open(os.path.join(P, fn), 'w').write(doc7(title, inner, css6(style), BW5, BH6))

cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
last = canvas['boards']['FlowA4.dc.html']
y = last['y'] + last['h'] + 560
canvas['boards'][fn] = {'x': 0, 'y': y, 'w': BW5, 'h': BH6, 'title': title, 'is_interactive': True}
if fn not in canvas['order']:
    canvas['order'].append(fn)
canvas['notes']['t8'] = {'x': 0, 'y': y - 340, 'text': 'A-1 오리지널 티켓 — 실제 상영작 포스터로 보기', 'kind': 'title1', 'maxW': BW5}
canvas['notes']['g8'] = {'x': BW5 + 80, 'y': y, 'w': 380, 'size': 'm', 'fill': 'orange',
                         'text': '포스터: 오디세이 (TMDB 이미지, 확인용)\n· 앞면 위는 포스터, 아래 띠는 좌석·상영 정보\n· 2번 화면의 나머지 영화와 시각·등급은 예시예요\n· 서비스에 쓰려면 포스터 사용 권리 확인이 필요해요'}
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok', y)
