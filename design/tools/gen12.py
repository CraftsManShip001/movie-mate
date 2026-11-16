#!/usr/bin/env python3
"""movie mate 12차: 확정된 흐름 A의 나머지 상태 화면 6개 (빈 상태·미리보기 없음·불러오는 중·숨김·오류)."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
g11 = open(os.path.join(HERE, 'gen11.py')).read()
exec(g11[:g11.index("s4 = pair_stage('original')")])


def center_msg(title, sub_text, buttons, dark=False):
    ink = '#F4F4F5' if dark else T['ink']
    sc = '#A4A4AB' if dark else T['sub']
    return (f'<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; text-align: center">'
            f'<div style="font-size: 28px; font-weight: 700; color: {ink}; letter-spacing: -0.02em">{title}</div>'
            f'<div style="font-size: {BODY}px; color: {sc}">{sub_text}</div><div style="display: flex; gap: 10px; margin-top: 14px">{buttons}</div></div>')


def ghost(text, dark=False):
    bg = '#1F1F22' if dark else T['btn']
    fg = '#F4F4F5' if dark else T['ink']
    return f'<button style="height: 56px; padding: 0 22px; border: 0; border-radius: 14px; background: {bg}; color: {fg}; font-size: {BODY}px; font-weight: 500; cursor: pointer">{text}</button>'


# a · 1번 영화관 — 고른 브랜드에 아직 극장이 없을 때
tiles = ''.join(
    f'<div style="display: flex; justify-content: space-between; align-items: center; height: 76px; padding: 0 24px; border-radius: 16px; border: {2 if on else 1}px solid {T["ink"] if on else T["hair"]}; background: {T["ink"] if on else T["bg"]}; color: {T["bg"] if on else T["ink"]}">'
    f'<span style="font-size: 22px; font-weight: 700">{n}</span><span style="font-size: {SMALL}px; opacity: .7">{c}</span></div>'
    for n, c, on in [('CGV', '4곳', False), ('메가박스', '2곳', False), ('롯데시네마', '0곳', True)])
sa = (top('영화관', back_btn=False) + f'<div style="display: flex; gap: 80px; padding: 56px 80px; flex: 1">'
      f'<div style="width: 400px; display: flex; flex-direction: column; gap: 14px">{bigline("어느 영화관에서<br>보세요?", 40)}<div style="height: 18px"></div>{tiles}</div>'
      f'<div style="flex: 1; display: flex; flex-direction: column; border-top: 1px solid {T["ink"]}">'
      + center_msg('아직 시야를 볼 수 있는 롯데시네마가 없어요', '도면이 준비되는 대로 여기에 보여 드릴게요', ghost('CGV 극장 보기')) + '</div></div>')

# b · 2번 상영 시간 — 고른 날짜에 상영이 없을 때
sb = (top('CGV 용산아이파크몰') + f'<div style="padding: 32px 64px 0; display: flex; flex-direction: column; gap: 20px; flex: 1">'
      f'<div style="display: flex; justify-content: space-between; align-items: center">{movie_head()}{date_row()}</div>'
      f'<div style="flex: 1; display: flex; border-top: 1px solid {T["hair"]}">'
      + center_msg('오늘 상영은 모두 끝났어요', '내일은 IMAX관에서 4번 상영해요', primary('내일 상영 보기', 'auto')) + '</div></div>')

# c · 2번 — 시야 미리보기가 없는 관의 시간을 골랐을 때
SEL_C = ('3관', '15:30')
s_c = v_a().replace(f'border: 2px solid {T["ink"]}; background: {T["bg"]}; cursor: pointer; text-align: left', f'border: 1px solid {T["hair"]}; background: {T["bg"]}; cursor: pointer; text-align: left')
s_c = s_c.split('<div style="margin-top: auto; padding: 20px 64px;')[0]
sc_bar = (f'<div style="margin-top: auto; padding: 20px 64px; border-top: 1px solid {T["hair"]}; display: flex; justify-content: space-between; align-items: center">'
          f'<div style="display: flex; flex-direction: column; gap: 2px">{body(T, "3관 · 11월 16일 15:30", 700)}{small(T, "이 관은 아직 시야 미리보기가 없어요")}</div>'
          f'<div style="display: flex; gap: 10px">{ghost("CGV에서 예매하기")}<button disabled style="height: 56px; width: 320px; border: 0; border-radius: 14px; background: {T["btn"]}; color: {T["sub"]}; font-size: {BODY}px; font-weight: 700">이 시간으로 좌석 보기</button></div></div>')
s_c = s_c.replace('<span style="font-size: 22px; font-weight: 700; color: #141414; font-variant-numeric: tabular-nums">15:30</span>',
                  '<span style="font-size: 22px; font-weight: 700; color: #141414; font-variant-numeric: tabular-nums">15:30</span>')
import re
s_c = s_c.replace('<button style="width: 150px; padding: 14px 16px; border-radius: 14px; border: 1px solid #D9D9DC; background: #FFFFFF; cursor: pointer; text-align: left; display: flex; flex-direction: column; gap: 4px"><span style="font-size: 22px; font-weight: 700; color: #141414; font-variant-numeric: tabular-nums">15:30', '<button style="width: 150px; padding: 14px 16px; border-radius: 14px; border: 2px solid #141414; background: #FFFFFF; cursor: pointer; text-align: left; display: flex; flex-direction: column; gap: 4px"><span style="font-size: 22px; font-weight: 700; color: #141414; font-variant-numeric: tabular-nums">15:30')
s_c = s_c + sc_bar

# d · 3번 좌석 — 불러오는 중
sk = lambda w, h, r=8: f'<div style="width: {w}px; height: {h}px; border-radius: {r}px; background: {T["btn"]}"></div>'
rows = ''.join(f'<div style="display: flex; gap: 6px">{"".join(sk(24, 24, 5) for _ in range(20))}</div>' for _ in range(14))
sd = (top('CGV 용산아이파크몰 · IMAX관') + f'<div style="display: flex; flex: 1; min-height: 0"><div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px">{sk(760, 4, 2)}<div style="height: 30px"></div>{rows}</div>'
      f'<div style="width: 400px; border-left: 1px solid {T["hair"]}; padding: 48px 40px; box-sizing: border-box; display: flex; flex-direction: column; gap: 20px">{sk(180, 14)}{sk(200, 34)}{sk(320, 180, 12)}{sk(260, 34)}</div></div>'
      + f'<div style="margin-top: auto; padding: 20px 64px; border-top: 1px solid {T["hair"]}; display: flex; justify-content: space-between; align-items: center">{small(T, "상영관을 불러오고 있어요")}<button disabled style="height: 56px; width: 320px; border: 0; border-radius: 14px; background: {T["btn"]}; color: {T["sub"]}; font-size: {BODY}px; font-weight: 700">이 자리에서 보기</button></div>')

# e · 5번 시야 — 좌석·티켓 숨긴 상태
se = s5.replace('value="{{panelOn}}" hint-placeholder-val="{{true}}"', 'value="{{false}}" hint-placeholder-val="{{false}}"').replace('{{panelLabel}}', '좌석·티켓 보기')

# f · 5번 시야 — 3D를 불러오지 못했을 때
sf = (f'<div style="position: relative; flex: 1; display: flex; flex-direction: column; background: {BG_STAGE}"><div style="position: absolute; left: 24px; top: 20px; display: flex; align-items: center; gap: 4px">{back("#F4F4F5")}<span style="font-size: {BODY}px; font-weight: 700; color: #F4F4F5">IMAX관 · J열 14번</span></div>'
      + center_msg('시야를 불러오지 못했어요', '잠시 뒤 다시 시도해 주세요. 계속 안 되면 다른 기기에서 열어 보세요', '<button style="height: 56px; padding: 0 28px; border: 0; border-radius: 14px; background: #F4F4F5; color: #111111; font-size: 16px; font-weight: 700; cursor: pointer">다시 시도</button>' + ghost('CGV에서 예매하기', True), dark=True) + '</div>')

FR = [('1 · 영화관 — 고른 브랜드에 극장이 없을 때', sa, T['bg']), ('2 · 상영 시간 — 고른 날 상영이 없을 때', sb, T['bg']), ('2 · 시야 미리보기가 없는 관을 골랐을 때', s_c, T['bg']),
      ('3 · 좌석 — 불러오는 중', sd, T['bg']), ('5 · 시야 — 좌석·티켓 숨김', se, BG_STAGE), ('5 · 시야 — 불러오지 못했을 때', sf, BG_STAGE)]
W12 = 40 * 2 + 3 * FW + 2 * GAP
H12 = 40 + 2 * (36 + FH) + 60 + 40
inner = ''.join(frame6(i % 3, i // 3, lab, s, bg) for i, (lab, s, bg) in enumerate(FR))
fn = 'FlowA_States.dc.html'
title = '흐름 A · 나머지 상태 화면'
open(os.path.join(P, fn), 'w').write(doc7(title, inner, '', W12, H12))

cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ref = canvas['boards']['FlowA1R2.dc.html']
canvas['boards'][fn] = {'x': 0, 'y': ref['y'] + ref['h'] + 120, 'w': W12, 'h': H12, 'title': title, 'is_interactive': True}
if fn not in canvas['order']:
    canvas['order'].append(fn)
canvas['notes']['t11']['text'] = '흐름 A 확정 — 티켓 출력 → 두 장으로 → 한 장 뒤집힘 → 자동으로 시야'
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok', W12, H12)
