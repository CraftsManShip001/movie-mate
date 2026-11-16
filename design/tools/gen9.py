#!/usr/bin/env python3
"""movie mate 9차: 상영 시간 선택 화면 4종 — 관 정보(관 이름·포맷·화면비·좌석 수)와 끝나는 시각, 남은 좌석까지."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
g7 = open(os.path.join(HERE, 'gen7.py')).read()
exec(g7[:g7.index('BH6 = 40')])

DATES = [('오늘', '16', True), ('화', '17', False), ('수', '18', False), ('목', '19', False), ('금', '20', False), ('토', '21', False), ('일', '22', False)]
# (관, 포맷, 화면, 좌석, 시야 가능, [(시작, 끝, 남은 좌석)]) — 모두 예시
HALLS = [
    ('IMAX관', 'IMAX 레이저 · 자막', '1.43:1 · 31m 스크린', '624석', True, [('10:20', '13:12', 88), ('13:40', '16:32', 212), ('17:00', '19:52', 31), ('20:20', '23:12', 405)]),
    ('4DX관', '4DX · 자막', '1.90:1', '120석', True, [('11:00', '13:52', 14), ('18:10', '21:02', 63)]),
    ('3관', '2D · 자막', '2.39:1', '172석', False, [('12:10', '15:02', 140), ('15:30', '18:22', 96), ('21:00', '23:52', 158)]),
]
SEL = ('IMAX관', '13:40')
F9W, F9H, G9 = 1440, 900, 60
BW9 = 40 * 2 + 4 * F9W + 3 * G9
BH9 = 40 + 36 + F9H + 40


def header(title):
    return f'<div style="display: flex; align-items: center; gap: 4px; height: 72px; padding: 0 64px; border-bottom: 1px solid {T["hair"]}">{back(T["ink"])}<span style="font-size: {BODY}px; font-weight: 700; color: {T["ink"]}">{title}</span></div>'


def date_row():
    out = ''
    for d, n, on in DATES:
        out += (f'<button style="width: 64px; height: 64px; border-radius: 16px; border: 0; background: {T["ink"] if on else T["bg"]}; color: {T["bg"] if on else T["ink"]}; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px">'
                f'<span style="font-size: {SMALL}px; opacity: {1 if on else .6}">{d}</span><span style="font-size: 20px; font-weight: 700">{n}</span></button>')
    return f'<div style="display: flex; gap: 8px">{out}</div>'


def seats_left(n):
    few = n < 40
    return f'<span style="font-size: {SMALL}px; color: {ACC if few else T["sub"]}">{n}석 남음</span>'


def view_mark(ok):
    if not ok:
        return f'<span style="font-size: {SMALL}px; color: {T["sub"]}">시야 미리보기 없음</span>'
    return f'<span style="display: inline-flex; align-items: center; gap: 6px; font-size: {SMALL}px; font-weight: 700; color: {T["ink"]}"><svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><rect x="1" y="1" width="14" height="10" rx="1.5" fill="none" stroke="{T["ink"]}" stroke-width="1.6"></rect></svg>시야 미리보기</span>'


def time_box(hall, s, e, n, w=150):
    on = (hall, s) == SEL
    bd = T['ink'] if on else T['hair']
    return (f'<button style="width: {w}px; padding: 14px 16px; border-radius: 14px; border: {2 if on else 1}px solid {bd}; background: {T["bg"]}; cursor: pointer; text-align: left; display: flex; flex-direction: column; gap: 4px">'
            f'<span style="font-size: 22px; font-weight: 700; color: {T["ink"]}; font-variant-numeric: tabular-nums">{s}</span>'
            f'<span style="font-size: {SMALL}px; color: {T["sub"]}">~{e}</span>{seats_left(n)}</button>')


def movie_head(size=56):
    return (f'<div style="display: flex; gap: 20px; align-items: center">{poster(MOVIES[0], size, round(size*1.5))}'
            f'<div style="display: flex; flex-direction: column; gap: 4px"><span style="font-size: 22px; font-weight: 700; color: {T["ink"]}">{TITLE}</span>{small(T, "[등급] · [상영 시간]")}</div></div>')


def bottom_cta(text):
    return f'<div style="margin-top: auto; padding: 20px 64px; border-top: 1px solid {T["hair"]}; display: flex; justify-content: space-between; align-items: center">{body(T, "IMAX관 · 11월 16일 13:40", 700)}{primary(text, "320px")}</div>'


# A · 관별로 묶기
def v_a():
    blocks = ''
    for hall, fmt, scr, seats, ok, times in HALLS:
        blocks += (f'<div style="padding: 22px 0; border-bottom: 1px solid {T["hair"]}; display: flex; flex-direction: column; gap: 14px">'
                   f'<div style="display: flex; justify-content: space-between; align-items: baseline"><div style="display: flex; gap: 12px; align-items: baseline">{body(T, hall, 700)}{small(T, fmt + " · " + scr + " · " + seats)}</div>{view_mark(ok)}</div>'
                   f'<div style="display: flex; gap: 10px">{"".join(time_box(hall, s, e, n) for s, e, n in times)}</div></div>')
    return (header('CGV 용산아이파크몰') + f'<div style="padding: 32px 64px 0; display: flex; flex-direction: column; gap: 20px; flex: 1; min-height: 0">'
            f'<div style="display: flex; justify-content: space-between; align-items: center">{movie_head()}{date_row()}</div><div>{blocks}</div></div>' + bottom_cta('이 시간으로 좌석 보기'))


# B · 시간순 한 줄 목록
def v_b():
    rows = sorted([(s, e, n, hall, fmt, scr, ok) for hall, fmt, scr, seats, ok, times in HALLS for s, e, n in times])
    out = ''
    for s, e, n, hall, fmt, scr, ok in rows[:8]:
        on = (hall, s) == SEL
        out += (f'<a href="#" style="display: grid; grid-template-columns: 120px 120px minmax(0, 1fr) 160px 140px 24px; align-items: center; height: 64px; padding: 0 16px; margin: 0 -16px; border-radius: 12px; text-decoration: none; background: {T["btn"] if on else T["bg"]}">'
                f'<span style="font-size: 22px; font-weight: 700; color: {T["ink"]}">{s}</span>{small(T, "~" + e)}'
                f'<span style="display: flex; gap: 10px; align-items: baseline">{body(T, hall, 700)}{small(T, fmt)}</span>{view_mark(ok)}{seats_left(n)}{chev(T["sub"], "right", 18)}</a>')
    return (header('CGV 용산아이파크몰') + f'<div style="width: 1040px; margin: 0 auto; padding-top: 32px; display: flex; flex-direction: column; gap: 22px">'
            f'<div style="display: flex; justify-content: space-between; align-items: center">{movie_head()}{date_row()}</div>'
            f'<div style="border-top: 1px solid {T["hair"]}; padding-top: 6px">{out}</div></div>')


# C · 왼쪽 영화 / 오른쪽 시간 패널
def v_c():
    movies = ''
    for i, m in enumerate(MOVIES):
        on = i == 0
        movies += (f'<a href="#" style="display: flex; gap: 16px; align-items: center; padding: 14px 16px; margin: 0 -16px; border-radius: 14px; text-decoration: none; background: {T["btn"] if on else T["bg"]}">'
                   f'{poster(m, 48, 72)}<div style="display: flex; flex-direction: column; gap: 2px">{body(T, m[0], 700)}{small(T, m[1] + " · " + m[2])}</div></a>')
    panel = ''
    for hall, fmt, scr, seats, ok, times in HALLS:
        chips = ''.join(f'<button style="height: 48px; padding: 0 16px; border-radius: 12px; border: {2 if (hall, s) == SEL else 1}px solid {T["ink"] if (hall, s) == SEL else T["hair"]}; background: {T["bg"]}; cursor: pointer; display: flex; gap: 8px; align-items: baseline"><span style="font-size: 18px; font-weight: 700; color: {T["ink"]}">{s}</span>{seats_left(n)}</button>' for s, e, n in times)
        panel += (f'<div style="padding: 20px 0; border-bottom: 1px solid {T["hair"]}; display: flex; flex-direction: column; gap: 12px"><div style="display: flex; justify-content: space-between">{body(T, hall, 700)}{view_mark(ok)}</div>'
                  f'{small(T, fmt + " · " + scr + " · " + seats)}<div style="display: flex; gap: 8px; flex-wrap: wrap">{chips}</div></div>')
    return (header('CGV 용산아이파크몰') + f'<div style="display: flex; flex: 1; min-height: 0">'
            f'<div style="width: 420px; padding: 32px 48px 0 64px; border-right: 1px solid {T["hair"]}; display: flex; flex-direction: column; gap: 8px">{bigline("무엇을 보세요?", 28)}<div style="height: 8px"></div>{movies}</div>'
            f'<div style="flex: 1; padding: 32px 64px 0; display: flex; flex-direction: column; gap: 16px">{bigline(TITLE + ", 언제 보세요?", 28)}{date_row()}<div>{panel}</div></div></div>' + bottom_cta('좌석 보기'))


# D · 관 먼저 (시야가 핵심이니 관을 크게)
def hall_card(hall, fmt, scr, seats, ok, times):
    on = hall == SEL[0]
    w, h = (88, 62) if hall == 'IMAX관' else ((96, 51) if hall == '4DX관' else (100, 42))
    shape = f'<div style="width: 112px; height: 72px; display: flex; align-items: center; justify-content: center"><div style="width: {w}px; height: {h}px; border: 2px solid {T["ink"]}; border-radius: 3px"></div></div>'
    chips = ''.join(f'<button style="height: 44px; padding: 0 14px; border-radius: 10px; border: {2 if (hall, s) == SEL else 1}px solid {T["ink"] if (hall, s) == SEL else T["hair"]}; background: {T["bg"]}; cursor: pointer; font-size: 16px; font-weight: 700; color: {T["ink"]}">{s}</button>' for s, e, n in times)
    return (f'<div style="flex: 1; border-radius: 20px; border: {2 if on else 1}px solid {T["ink"] if on else T["hair"]}; padding: 24px; display: flex; flex-direction: column; gap: 14px">'
            f'{shape}<div style="display: flex; flex-direction: column; gap: 4px"><span style="font-size: 22px; font-weight: 700; color: {T["ink"]}">{hall}</span>{small(T, fmt)}{small(T, scr + " · " + seats)}</div>'
            f'{view_mark(ok)}<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px">{chips}</div></div>')


def v_d():
    cards = ''.join(hall_card(*h_) for h_ in HALLS)
    return (header('CGV 용산아이파크몰') + f'<div style="padding: 32px 64px 0; display: flex; flex-direction: column; gap: 24px; flex: 1">'
            f'<div style="display: flex; justify-content: space-between; align-items: center">{movie_head()}{date_row()}</div>'
            f'{bigline("어느 관에서 보세요?", 28)}<div style="display: flex; gap: 20px; align-items: stretch">{cards}</div></div>' + bottom_cta('이 시간으로 좌석 보기'))


VARS = [('A · 관별로 묶기', v_a), ('B · 시간순 목록', v_b), ('C · 영화 왼쪽, 시간 오른쪽', v_c), ('D · 관 먼저 크게', v_d)]


def frame9(i, label, inner):
    x = 40 + i * (F9W + G9)
    return (f'<div style="position: absolute; left: {x}px; top: 40px; font-size: {BODY}px; font-weight: 700; color: #111111">{label}</div>'
            f'<div style="position: absolute; left: {x}px; top: 76px; width: {F9W}px; height: {F9H}px; border-radius: 16px; overflow: hidden; border: 1px solid #E2E2E2; box-sizing: border-box; background: {T["bg"]}; display: flex; flex-direction: column">{inner}</div>')


inner = ''.join(frame9(i, lab, f()) for i, (lab, f) in enumerate(VARS))
fn = 'ShowTimes.dc.html'
open(os.path.join(P, fn), 'w').write(doc7('상영 시간 선택 4종', inner, '', BW9, BH9))

cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ref = canvas['boards']['FlowA1P.dc.html']
y = ref['y'] + ref['h'] + 560
canvas['boards'][fn] = {'x': 0, 'y': y, 'w': BW9, 'h': BH9, 'title': '2번 · 상영 시간 선택 4종'}
if fn not in canvas['order']:
    canvas['order'].append(fn)
canvas['notes']['t9'] = {'x': 0, 'y': y - 340, 'text': '2번 화면 — 상영 시간 선택에 관 정보 더하기, 시안 4종', 'kind': 'title1', 'maxW': BW9}
canvas['notes']['g9'] = {'x': BW9 + 80, 'y': y, 'w': 380, 'size': 'm', 'fill': 'orange',
                         'text': '보는 법\n· 네 화면 모두 같은 정보: 관 이름, 포맷·자막, 화면비, 좌석 수, 끝나는 시각, 남은 좌석, 시야 미리보기 가능 여부\n· 상영 시각·남은 좌석·끝나는 시각은 예시예요\n· 토스처럼 단계 막대를 빼고 뒤로 가기 + 제목만 둔 헤더로 그렸어요'}
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok', BW9, BH9, y)
