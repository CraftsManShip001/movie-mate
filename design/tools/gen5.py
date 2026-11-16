#!/usr/bin/env python3
"""movie mate 5차: 데스크톱 5화면 흐름(영화관 → 영화 → 좌석 → 발권 → 시야) 시안 A~D. 보드 하나 = 흐름 하나."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
g4 = open(os.path.join(HERE, 'gen4.py')).read()
exec(g4[:g4.index('VARIANTS = [')])

FW, FH, GAP = 1440, 900, 60
BW5 = 40 * 2 + 5 * FW + 4 * GAP
BH5 = 40 + 36 + FH + 40

JS5 = JS4.replace(
    "toggleHeads: () => this.setState({ heads: !heads }),",
    """toggleHeads: () => this.setState({ heads: !heads }),
      panelOn: st.panel ?? true, panelOff: !(st.panel ?? true),
      togglePanel: () => this.setState({ panel: !(st.panel ?? true) }),
      movies: ['밤의 궤도', '여름 끝의 정류장', '헌터: 마지막 항해', '작은 숲의 노래'].map((m, i) => ({ title: m, on: i === (st.mv ?? 0), off: i !== (st.mv ?? 0), pick: () => this.setState({ mv: i }) })),
      movieTitle: ['밤의 궤도', '여름 끝의 정류장', '헌터: 마지막 항해', '작은 숲의 노래'][st.mv ?? 0],""")

BG_STAGE = '#0C0C0D'
T = LT2
ACC = T['acc']
STEPS = ['영화관', '영화', '좌석', '발권', '시야']
MOVIES = [('밤의 궤도', '12세', '2시간 11분', '#1F2A44', '#E7B04A'),
          ('여름 끝의 정류장', '전체', '1시간 52분', '#D96C4E', '#F3E6CF'),
          ('헌터: 마지막 항해', '15세', '2시간 28분', '#2C2C2C', '#C8402F'),
          ('작은 숲의 노래', '전체', '1시간 38분', '#3F6B4E', '#F0E3A8')]
TIMES = ['10:20', '13:40', '17:00', '20:20']


def doc5(title, inner, css, w, h):
    fonts = GFONTS.replace('family=Bebas+Neue', 'family=Bebas+Neue&amp;family=Nanum+Gothic+Coding:wght@400;700')
    d = doc(title, inner).replace(JS, JS5).replace(GFONTS, fonts)
    d = d.replace(f'width: {BW}px; height: {BH}px; position: relative', f'width: {w}px; height: {h}px; position: relative')
    d = d.replace(f'"$preview":{{"width":{BW},"height":{BH}}}', f'"$preview":{{"width":{w},"height":{h}}}')
    return d.replace('button{font-family:inherit}', 'button{font-family:inherit}\n' + css)


def frame(i, inner, bg):
    x = 40 + i * (FW + GAP)
    lab = f'<div style="position: absolute; left: {x}px; top: 40px; font-size: {BODY}px; font-weight: 700; color: #111111">{i+1} · {STEPS[i]}</div>'
    return lab + f'<div style="position: absolute; left: {x}px; top: 76px; width: {FW}px; height: {FH}px; border-radius: 16px; overflow: hidden; border: 1px solid #E2E2E2; box-sizing: border-box; background: {bg}; display: flex; flex-direction: column">{inner}</div>'


def stepbar(cur, t=T, kiosk=False):
    if kiosk:
        items = ''.join(f'<div style="display: flex; align-items: center; gap: 10px"><span style="width: 28px; height: 28px; border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; font-size: {SMALL}px; font-weight: 700; background: {t["ink"] if i <= cur else t["btn"]}; color: {t["bg"] if i <= cur else t["sub"]}">{i+1}</span><span style="font-size: {BODY}px; font-weight: {700 if i == cur else 400}; color: {t["ink"] if i <= cur else t["sub"]}">{s}</span></div>' for i, s in enumerate(STEPS))
        return f'<div style="display: flex; gap: 36px; align-items: center; height: 88px; padding: 0 80px; border-bottom: 1px solid {t["hair"]}">{items}</div>'
    items = ''.join(f'<span style="font-size: {BODY}px; font-weight: {700 if i == cur else 400}; color: {t["ink"] if i == cur else t["sub"]}">{s}</span>' + (f'<span style="color: {t["hair"]}">/</span>' if i < 4 else '') for i, s in enumerate(STEPS))
    return f'<div style="display: flex; gap: 14px; align-items: center; height: 72px; padding: 0 80px; border-bottom: 1px solid {t["hair"]}">{items}</div>'


def poster(m, w, h, t=T):
    title, rate, run, c1, c2 = m
    return f'''<div style="width: {w}px; height: {h}px; border-radius: 8px; overflow: hidden; background: {c1}; position: relative; flex: none">
<div style="position: absolute; left: 0; right: 0; bottom: 0; height: 38%; background: {c2}"></div>
<div style="position: absolute; left: {round(w*0.18)}px; top: {round(h*0.3)}px; width: {round(w*0.42)}px; height: {round(w*0.42)}px; border-radius: 50%; background: {c2}"></div>
<span style="position: absolute; left: 12px; right: 12px; bottom: 12px; font-size: {max(13, round(w/9))}px; font-weight: 700; color: {c1}; line-height: 1.15">{title}</span></div>'''


def primary(text, w='auto', t=T, onclick=''):
    oc = f' onClick="{{{{{onclick}}}}}"' if onclick else ''
    return f'<button{oc} style="height: 56px; padding: 0 28px; width: {w}; border: 0; border-radius: 14px; background: {t["ink"]}; color: {t["bg"]}; font-size: {BODY}px; font-weight: 700; cursor: pointer">{text}</button>'


def bigline(text, size=32, t=T):
    return f'<div style="font-size: {size}px; font-weight: 700; color: {t["ink"]}; letter-spacing: -0.02em; line-height: 1.2">{text}</div>'


def theater_rows(pad=0, t=T):
    out = ''
    data = [('용산', [('CGV 용산아이파크몰', 'IMAX · 4DX · SCREENX'), ('롯데시네마 용산', '')]),
            ('영등포', [('CGV 영등포', 'SCREENX · 4DX'), ('롯데시네마 영등포', ''), ('CGV 여의도', '4DX')]),
            ('강남', [('메가박스 코엑스', 'Dolby Cinema'), ('CGV 청담씨네시티', '4DX')])]
    for area, ths in data:
        out += f'<div style="padding: 24px {pad}px 6px; display: flex; gap: 8px; align-items: baseline">{body(t, area, 700)}{small(t, f"{len(ths)}곳")}</div>'
        for i, (n, sp) in enumerate(ths):
            on = n == 'CGV 용산아이파크몰'
            nm = f'<span style="font-size: {BODY}px; font-weight: {700 if on else 400}; color: {t["ink"]}">{n}</span>'
            right = (small(t, sp) if sp else '') + chev(t['sub'], 'right', 18)
            out += f'<a href="#" style="display: flex; align-items: center; justify-content: space-between; height: 56px; padding: 0 {pad}px; text-decoration: none; border-bottom: 1px solid {t["hair"]}">{nm}<span style="display: flex; gap: 10px; align-items: center">{right}</span></a>'
    return out


def body(t, text, weight=400, color=None):
    return f'<span style="font-size: {BODY}px; font-weight: {weight}; color: {color or t["ink"]}">{text}</span>'


def small(t, text):
    return f'<span style="font-size: {SMALL}px; color: {t["sub"]}">{text}</span>'


def time_chips(t=T, sel=1):
    return ''.join(f'<button style="height: 44px; padding: 0 16px; border-radius: 10px; border: 1px solid {t["ink"] if i == sel else t["hair"]}; background: {t["ink"] if i == sel else t["bg"]}; color: {t["bg"] if i == sel else t["ink"]}; font-size: {BODY}px; font-weight: 500; cursor: pointer; font-variant-numeric: tabular-nums">{tm}</button>' for i, tm in enumerate(TIMES))


def movie_list(t=T, posters=True, pw=72):
    out = ''
    for i, m in enumerate(MOVIES):
        on = i == 0
        out += f'''<div style="display: flex; gap: 20px; padding: 18px 0; border-bottom: 1px solid {t["hair"]}; align-items: center">{poster(m, pw, round(pw*1.43)) if posters else ""}
<div style="flex: 1; display: flex; flex-direction: column; gap: 8px"><div style="display: flex; gap: 10px; align-items: baseline">{body(t, m[0], 700)}{small(t, m[1] + " · " + m[2])}</div>
<div style="display: flex; gap: 8px">{time_chips(t, 1 if on else -1)}</div></div></div>'''
    return out


def seat_screen(t, side_extra=''):
    arc_ = arc(t, 760)
    return (f'<div style="display: flex; flex: 1; min-height: 0"><div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px">{arc_}{small(t, "스크린")}<div style="height: 10px"></div>{seatmap(t, cell=24, gap=6)}</div>'
            f'<div style="width: 400px; border-left: 1px solid {t["hair"]}; padding: 48px 40px; box-sizing: border-box; display: flex; flex-direction: column; gap: 20px">{small(t, "CGV 용산아이파크몰 · IMAX관 · 13:40")}{bigline("{{seatName}}", 32, t)}<div style="border-radius: 12px; overflow: hidden">{view(320, 180)}</div>{metrics(t, gap=24)}{side_extra}<div style="margin-top: auto">{primary("이 자리로 발권", "100%", t)}</div></div></div>')


def ticket_stage(tick, caption='J열 14번 발권 완료'):
    return (f'<div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; background: {BG_STAGE}">'
            f'<div style="transform: scale(1.35); transform-origin: 50% 50%; margin: 70px 0">{tick}</div>'
            f'<div style="display: flex; gap: 12px; align-items: center"><button style="height: 56px; padding: 0 28px; border: 0; border-radius: 14px; background: #F4F4F5; color: #111111; font-size: {BODY}px; font-weight: 700; cursor: pointer">시야 보러 가기</button><button style="height: 56px; padding: 0 22px; border: 0; border-radius: 14px; background: #1F1F22; color: #F4F4F5; font-size: {BODY}px; font-weight: 500; cursor: pointer">다른 자리</button></div></div>')


def viewer_screen(mini):
    toggle_on = f'<button onClick="{{{{togglePanel}}}}" style="height: 40px; padding: 0 16px; border: 0; border-radius: 12px; background: rgba(255,255,255,0.14); color: #F4F4F5; font-size: {SMALL}px; font-weight: 500; cursor: pointer">{{{{panelLabel}}}}</button>'
    panel = (f'<sc-if value="{{{{panelOn}}}}" hint-placeholder-val="{{{{true}}}}"><div style="position: absolute; right: 32px; bottom: 88px; width: 360px; padding: 20px; box-sizing: border-box; border-radius: 18px; background: rgba(12,12,13,0.72); display: flex; flex-direction: column; gap: 16px">'
             f'{mini}<div style="border-top: 1px dashed #3A3A3F"></div>{seatmap(DK2, cell=11, gap=3)}</div></sc-if>')
    top = f'<div style="position: absolute; left: 24px; top: 20px; display: flex; align-items: center; gap: 4px">{back("#F4F4F5")}<span style="font-size: {BODY}px; font-weight: 700; color: #F4F4F5">IMAX관 · {{{{seatName}}}}</span></div>'
    ctr = f'<div style="position: absolute; right: 32px; bottom: 32px; display: flex; gap: 8px"><button onClick="{{{{toggleHeads}}}}" style="height: 40px; padding: 0 16px; border: 0; border-radius: 12px; background: rgba(255,255,255,0.14); color: #F4F4F5; font-size: {SMALL}px; font-weight: 500; cursor: pointer">{{{{headsLabel}}}}</button>{toggle_on}</div>'
    met = f'<div style="position: absolute; left: 32px; bottom: 32px; display: flex; gap: 28px">' + ''.join(f'<div style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: {BODY}px; font-weight: 700; color: #F4F4F5">{{{{{v}}}}}</span><span style="font-size: {SMALL}px; color: #A4A4AB">{k}</span></div>' for v, k in (('fov', '시야각'), ('up', '올려보기'), ('dist', '스크린까지'))) + '</div>'
    return f'<div style="position: relative; flex: 1">{view(FW, FH, fit="slice")}{top}{met}{panel}{ctr}</div>'


# ---- 작은 티켓 (시야 화면 오른쪽 아래) ----
def mini_receipt(w=320, h=92):
    return f'''<div style="position: relative; width: {w}px; height: {h}px; {SHADOW}">{svgshape(w, h, zigzag(w, h), PAPER)}
<div style="position: relative; padding: 12px 14px; font-family: {MONO}; color: #1A1A1A; display: flex; justify-content: space-between; align-items: center; height: 100%; box-sizing: border-box">
<div style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 11px">영화입장권 · {{{{movieTitle}}}}</span><span style="font-size: 18px; font-weight: 700">IMAX관 {{{{seatName}}}}</span><span style="font-size: 11px">13:40 · CGV 용산아이파크몰</span></div>{barcode(56, 52, "#1A1A1A", vertical=True)}</div></div>'''


def mini_classic(pal, w=320, h=110):
    return classic(w, h, pal)


def mini_original():
    card = f'<div style="position: relative; width: 96px; height: 140px; flex: none; {SHADOW}">{svgshape(96, 140, scallop(96, 140, "tlbr", r=3, step=11, corner=3), "#111214")}<div style="position: absolute; left: 7px; right: 7px; top: 7px; bottom: 30px; overflow: hidden; border-radius: 3px">{view(82, 103, fit="slice")}</div><span style="position: absolute; left: 9px; bottom: 8px; font-family: {DISPLAY}; font-size: 16px; line-height: 1; color: #F3F1EA">{{{{rowL}}}}{{{{col}}}}</span></div>'
    return f'<div style="display: flex; gap: 16px; align-items: center">{card}<div style="display: flex; flex-direction: column; gap: 4px">{small(DK2, "ORIGINAL TICKET")}<span style="font-size: 20px; font-weight: 700; color: #F4F4F5">{{{{seatName}}}}</span>{small(DK2, "{{movieTitle}} · 13:40")}</div></div>'


# ---------- 시안 A~D ----------
def flow_A():
    """A · 키오스크: 번호 단계 막대, 지역별 목록, 포스터 목록, 감열지 출력."""
    s1 = stepbar(0, kiosk=True) + f'<div style="display: flex; gap: 80px; padding: 48px 80px; flex: 1"><div style="width: 360px; display: flex; flex-direction: column; gap: 16px">{bigline("어느 극장에서<br>보세요?", 40)}{small(T, "도면을 받은 상영관만 있어요")}</div><div style="flex: 1">{theater_rows()}</div></div>'
    s2 = stepbar(1, kiosk=True) + f'<div style="display: flex; gap: 80px; padding: 32px 80px; flex: 1"><div style="width: 360px; display: flex; flex-direction: column; gap: 16px">{small(T, "CGV 용산아이파크몰 · IMAX관")}{bigline("무엇을<br>보세요?", 40)}</div><div style="flex: 1">{movie_list()}</div></div>'
    s3 = stepbar(2, kiosk=True) + seat_screen(T)
    s4 = ticket_stage(t_print('d', 'live'))
    s5 = viewer_screen(mini_receipt())
    return 'A · 키오스크', [s1, s2, s3, s4, s5], CSS_PRINT


def fmt_rows():
    rows = [('IMAX', '1곳', 20, 14, True), ('Dolby Cinema', '1곳', 24, 11, False), ('SCREENX', '2곳', 24, 10, False), ('4DX', '4곳', 24, 12, False), ('일반관', '7곳', 24, 12, False)]
    out = ''
    for n, c, iw, ih, on in rows:
        ic = f'<svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true"><rect x="{(28-iw)/2}" y="{(20-ih)/2}" width="{iw}" height="{ih}" rx="1.5" fill="none" stroke="#141414" stroke-width="1.6"></rect></svg>'
        out += f'<div style="display: flex; align-items: center; gap: 16px; height: 64px; border-bottom: 1px dashed {T["hair"]}">{ic}<span style="flex: 1; font-size: {BODY}px; font-weight: 700; color: {T["ink"]}">{n}</span>{small(T, c)}</div>'
        if on:
            out += f'<a href="#" style="display: flex; justify-content: space-between; align-items: center; height: 52px; padding-left: 44px; text-decoration: none; border-bottom: 1px dashed {T["hair"]}">{body(T, "CGV 용산아이파크몰", 700)}{chev(T["sub"], "right", 18)}</a>'
    return out


def flow_B():
    """B · 오리지널 티켓: 관 형식부터(홈 D), 큰 포스터 격자, 오리지널 티켓 뒤집기."""
    s1 = stepbar(0) + f'<div style="display: flex; gap: 80px; padding: 56px 80px; flex: 1"><div style="width: 360px">{bigline("어떤 관에서<br>보세요?", 40)}</div><div style="flex: 1">{fmt_rows()}</div></div>'
    posters = ''.join(f'<div style="display: flex; flex-direction: column; gap: 12px">{poster(m, 230, 329)}<div style="display: flex; gap: 8px; align-items: baseline">{body(T, m[0], 700)}{small(T, m[1])}</div></div>' for m in MOVIES)
    s2 = stepbar(1) + f'<div style="padding: 40px 80px; display: flex; flex-direction: column; gap: 28px">{bigline("IMAX로 보면 좋은 영화", 32)}<div style="display: flex; gap: 32px">{posters}</div><div style="display: flex; gap: 8px; align-items: center">{small(T, "밤의 궤도 · 오늘")}<div style="width: 8px"></div>{time_chips()}</div></div>'
    s3 = stepbar(2) + seat_screen(T)
    s4 = ticket_stage(t_flip('d', 'live'))
    s5 = viewer_screen(mini_original())
    return 'B · 오리지널 티켓', [s1, s2, s3, s4, s5], CSS_FLIP


def map_panel(w, h):
    pins = [('용산', 520, 250, True), ('영등포', 300, 300, False), ('강남', 780, 380, False)]
    g = ''.join(f'<circle cx="{x}" cy="{y}" r="{12 if on else 9}" fill="{ACC if on else "#141414"}"></circle><text x="{x+20}" y="{y+7}" font-size="22" font-weight="{700 if on else 400}" fill="#141414" font-family="Noto Sans KR, sans-serif">{a}</text>' for a, x, y, on in pins)
    return f'<svg role="img" aria-label="지역 약도" width="{w}" height="{h}" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet" style="display: block"><path d="M-20 250 C 150 240 220 330 380 330 C 520 330 560 300 680 300 C 820 300 880 250 1020 230" stroke="#D6E2EC" stroke-width="46" fill="none" stroke-linecap="round"></path>{g}</svg>'


def timetable():
    halls = [('IMAX관', [(0, '밤의 궤도', '10:20'), (1, '밤의 궤도', '13:40'), (2, '헌터: 마지막 항해', '17:00')]),
             ('4DX관', [(0, '헌터: 마지막 항해', '11:00'), (2, '헌터: 마지막 항해', '16:10')]),
             ('SCREENX관', [(1, '여름 끝의 정류장', '12:30'), (3, '작은 숲의 노래', '19:00')]),
             ('1관', [(0, '작은 숲의 노래', '10:00'), (1, '여름 끝의 정류장', '14:20'), (3, '밤의 궤도', '20:20')])]
    head = ''.join(f'<span style="flex: 1; font-size: {SMALL}px; color: {T["sub"]}">{h}</span>' for h in ('오전', '낮', '오후', '저녁'))
    out = f'<div style="display: flex; padding-left: 140px; padding-bottom: 10px; border-bottom: 1px solid {T["hair"]}">{head}</div>'
    for hall, shows in halls:
        cells = ['' for _ in range(4)]
        for slot, title, tm in shows:
            on = hall == 'IMAX관' and tm == '13:40'
            cells[slot] = f'<button style="width: 100%; text-align: left; padding: 10px 12px; border-radius: 10px; border: 1px solid {T["ink"] if on else T["hair"]}; background: {T["ink"] if on else T["bg"]}; color: {T["bg"] if on else T["ink"]}; cursor: pointer; display: flex; flex-direction: column; gap: 2px"><span style="font-size: {BODY}px; font-weight: 700">{tm}</span><span style="font-size: {SMALL}px; opacity: .8">{title}</span></button>'
        row = ''.join(f'<div style="flex: 1; padding-right: 10px">{c}</div>' for c in cells)
        out += f'<div style="display: flex; align-items: center; padding: 14px 0; border-bottom: 1px solid {T["hair"]}"><span style="width: 140px; font-size: {BODY}px; font-weight: 700; color: {T["ink"]}">{hall}</span>{row}</div>'
    return out


def flow_C():
    """C · 상영 시간표: 지도로 극장, 관별 시간표로 영화, 꼭지 떼는 클래식 티켓."""
    s1 = stepbar(0) + f'<div style="display: flex; flex: 1; min-height: 0"><div style="flex: 1; border-right: 1px solid {T["hair"]}">{map_panel(960, 828)}</div><div style="width: 480px; padding: 32px 48px; box-sizing: border-box">{bigline("용산 2곳", 32)}<div style="height: 12px"></div>{theater_rows()[theater_rows().index("<a"):theater_rows().index("영등포")-120] if False else ""}{"".join(f"""<a href="#" style="display: flex; justify-content: space-between; align-items: center; height: 60px; text-decoration: none; border-bottom: 1px solid {T['hair']}">{body(T, n, 700 if i == 0 else 400)}{chev(T['sub'], 'right', 18)}</a>""" for i, n in enumerate(['CGV 용산아이파크몰', '롯데시네마 용산']))}</div></div>'
    s2 = stepbar(1) + f'<div style="padding: 40px 80px; display: flex; flex-direction: column; gap: 24px">{bigline("오늘 CGV 용산아이파크몰 상영표", 32)}{timetable()}</div>'
    s3 = stepbar(2) + seat_screen(T)
    s4 = ticket_stage(t_stub('d', 'live'))
    s5 = viewer_screen(mini_classic(DARKT))
    return 'C · 상영 시간표', [s1, s2, s3, s4, s5], CSS_STUB


def search_box(text):
    return f'<label style="display: flex; align-items: center; gap: 12px; height: 60px; padding: 0 20px; border-radius: 16px; border: 1px solid {T["hair"]}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="{T["sub"]}" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg><input aria-label="찾기" placeholder="{text}" style="border: 0; outline: none; font-size: {BODY}px; font-family: inherit; width: 100%; background: none"></label>'


def flow_D():
    """D · 한 화면씩 크게: 찾기 + 최근, 영화 한 편씩 넘기기, 롤 티켓 뽑기."""
    recent = ''.join(f'<a href="#" style="display: flex; justify-content: space-between; align-items: center; height: 60px; text-decoration: none; border-bottom: 1px solid {T["hair"]}">{body(T, n, 700 if i == 0 else 400)}<span style="display: flex; gap: 10px; align-items: center">{small(T, h)}{chev(T["sub"], "right", 18)}</span></a>' for i, (n, h) in enumerate([('CGV 용산아이파크몰', 'IMAX관'), ('메가박스 코엑스', 'Dolby Cinema'), ('CGV 영등포', 'SCREENX관')]))
    s1 = f'<div style="width: 760px; margin: 0 auto; padding-top: 120px; display: flex; flex-direction: column; gap: 28px">{bigline("어느 극장에서 보세요?", 40)}{search_box("극장 이름으로 찾기")}<div>{small(T, "최근 본 극장")}{recent}</div></div>'
    m = MOVIES[0]
    s2 = (f'<div style="flex: 1; display: flex; align-items: center; gap: 80px; padding: 0 120px">{poster(m, 360, 515)}'
          f'<div style="flex: 1; display: flex; flex-direction: column; gap: 20px">{small(T, "CGV 용산아이파크몰 · 오늘 상영 4편 중 1")}{bigline(m[0], 48)}{small(T, m[1] + " · " + m[2] + " · IMAX 2D")}'
          f'<div style="display: flex; gap: 8px; margin-top: 8px">{time_chips()}</div>'
          f'<div style="display: flex; gap: 8px; margin-top: 24px">{"".join(poster(x, 64, 92) for x in MOVIES[1:])}</div></div></div>')
    s3 = seat_screen(T)
    s4 = ticket_stage(t_roll('d', 'live'))
    s5 = viewer_screen(mini_classic(REDT))
    return 'D · 한 화면씩 크게', [s1, s2, s3, s4, s5], CSS_ROLL


FLOWS = [('FlowA.dc.html', flow_A), ('FlowB.dc.html', flow_B), ('FlowC.dc.html', flow_C), ('FlowD.dc.html', flow_D)]
JS5 = JS5.replace("panelOn: st.panel ?? true,", "panelLabel: (st.panel ?? true) ? '좌석·티켓 숨기기' : '좌석·티켓 보기',\n      panelOn: st.panel ?? true,")

cpath = os.path.join(P, 'canvas.json')
canvas = json.load(open(cpath))
ROW2 = BH + 120 + 340
y0 = 6 * ROW2 + 200
for i, (fn, f) in enumerate(FLOWS):
    title, screens, css = f()
    bgs = [T['bg'], T['bg'], T['bg'], BG_STAGE, BG_STAGE]
    inner = ''.join(frame(k, s, bgs[k]) for k, s in enumerate(screens))
    open(os.path.join(P, fn), 'w').write(doc5(title, inner, css, BW5, BH5))
    canvas['boards'][fn] = {'x': 0, 'y': y0 + i * (BH5 + 200), 'w': BW5, 'h': BH5, 'title': title, 'is_interactive': True}
    if fn not in canvas['order']:
        canvas['order'].append(fn)
canvas['notes']['t6'] = {'x': 0, 'y': y0 - 340, 'text': '전체 흐름 — 영화관 → 영화 → 좌석 → 발권 → 시야, 시안 4종', 'kind': 'title1', 'maxW': BW5}
canvas['notes']['g6'] = {'x': BW5 + 80, 'y': y0, 'w': 380, 'size': 'm', 'fill': 'orange',
                         'text': '각 시안 보는 법\n· 한 줄 = 한 흐름, 왼쪽부터 1~5 화면\n· 재생 버튼을 누르고 3번에서 좌석을 누르면 4번 티켓이 다시 발권되고 5번 시야도 바뀌어요\n· 5번 오른쪽 아래 버튼으로 좌석·티켓을 숨기고 켤 수 있어요\n· 영화 제목·포스터는 예시예요'}
json.dump(canvas, open(cpath, 'w'), ensure_ascii=False, indent=1)
print('ok', BW5, BH5)
