#!/usr/bin/env python3
"""movie mate 10차: 흐름 A 수정 — 상영 시간 A(관별), 용어·버튼 정리, 단계 막대 대신 헤더 + 하단 고정 버튼."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
g9 = open(os.path.join(HERE, 'gen9.py')).read()
exec(g9[:g9.index('VARS = [')])

STEPS2 = ['영화관', '상영 시간', '좌석', '티켓', '시야']


def bar(summary, cta, summary_html=None):
    left = summary_html or body(T, summary, 700)
    return f'<div style="margin-top: auto; padding: 20px 64px; border-top: 1px solid {T["hair"]}; display: flex; justify-content: space-between; align-items: center; background: {T["bg"]}">{left}{primary(cta, "320px")}</div>'


def top(title, back_btn=True):
    b = back(T['ink']) if back_btn else '<div style="width: 8px"></div>'
    return f'<div style="display: flex; align-items: center; gap: 4px; height: 72px; padding: 0 64px; border-bottom: 1px solid {T["hair"]}; flex: none">{b}<span style="font-size: {BODY}px; font-weight: 700; color: {T["ink"]}">{title}</span></div>'


# 1 · 영화관: 단계 막대 대신 제목 헤더, 내부 용어 정리, 아래 고정 버튼
s1 = chain_screen().replace(stepbar(0, kiosk=True), '')
s1 = s1.replace('도면을 받은 극장', '시야를 볼 수 있는 극장')
s1 = top('영화관', back_btn=False) + s1 + bar('', '이 극장으로', f'<div style="display: flex; flex-direction: column; gap: 2px">{small(T, "선택한 극장")}{body(T, "CGV 용산아이파크몰", 700)}</div>')

# 2 · 상영 시간: 시안 A 그대로 (헤더 + 하단 고정 버튼이 이미 있음)
s2 = v_a()

# 3 · 좌석: 패널 안 버튼을 빼고 하단 고정 버튼으로, 문구 '이 자리에서 보기'
s3 = seat_screen(T).replace(primary("이 자리로 발권", "100%", T), '')
s3 = s3.replace('CGV 용산아이파크몰 · IMAX관 · 13:40', '오디세이 · 11월 16일 13:40')
s3 = top('CGV 용산아이파크몰 · IMAX관') + s3 + bar('', '이 자리에서 보기', f'<div style="display: flex; flex-direction: column; gap: 2px">{small(T, "고른 자리")}{body(T, "{{seatName}}", 700)}</div>')

# 4 · 티켓: 키오스크 그대로 (발권 대신 '티켓')
s4 = kiosk_stage('original')

# 5 · 시야: 오른쪽 위에 예매 버튼
book = (f'<a href="#" style="position: absolute; right: 32px; top: 22px; height: 48px; padding: 0 22px; border-radius: 14px; background: #F4F4F5; color: #111111; '
        f'font-size: {BODY}px; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 6px">CGV에서 예매하기{chev("#111111", "right", 18)}</a>')
s5 = f'<div style="position: relative; flex: 1; display: flex; flex-direction: column">{viewer_screen(mini_poster_ticket("original"))}{book}</div>'

inner = ''.join(frame6(k, 0, f'{k+1} · {STEPS2[k]}', s, bg)
                for k, (s, bg) in enumerate([(s1, T['bg']), (s2, T['bg']), (s3, T['bg']), (s4, BG_STAGE), (s5, BG_STAGE)]))
inner += frame6(0, 1, '티켓 앞·뒤', spec_frame('original'), BG_STAGE) + frame6(1, 1, '4 · 티켓 출력 중', mid_frame('original'), BG_STAGE)

BH10 = 40 + 2 * (36 + FH) + 60 + 40
fn = 'FlowA1R.dc.html'
title = '흐름 A 수정 · 관별 상영 시간 + 버튼·용어 정리'
open(os.path.join(P, fn), 'w').write(doc7(title, inner, css6('original'), BW5, BH10))

cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ref = canvas['boards']['ShowTimes.dc.html']
y = ref['y'] + ref['h'] + 560
canvas['boards'][fn] = {'x': 0, 'y': y, 'w': BW5, 'h': BH10, 'title': title, 'is_interactive': True}
if fn not in canvas['order']:
    canvas['order'].append(fn)
canvas['notes']['t10'] = {'x': 0, 'y': y - 340, 'text': '흐름 A 수정 — 관별 상영 시간, 버튼·용어 정리, 헤더 + 하단 고정 버튼', 'kind': 'title1', 'maxW': BW5}
canvas['notes']['g10'] = {'x': BW5 + 80, 'y': y, 'w': 380, 'size': 'm', 'fill': 'orange',
                          'text': '바뀐 점\n· 단계 막대 대신 뒤로 가기 + 제목 헤더\n· 1~3번 아래 고정 버튼: 고른 것 + 다음 행동 하나\n· "발권" → "이 자리에서 보기", "도면을 받은 극장" → "시야를 볼 수 있는 극장"\n· 5번 오른쪽 위에 "CGV에서 예매하기"\n· 상영 시각·남은 좌석은 예시'}
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok', y)
