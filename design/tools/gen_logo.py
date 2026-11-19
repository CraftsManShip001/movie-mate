"""movie mate 로고 시안 8종 보드 생성기. usage: python3 gen_logo.py <canvas root>"""
import sys, os, json

INK, RED, WHITE, HAIR, STAGE, SUB = "#141414", "#E5432F", "#FFFFFF", "#D9D9DC", "#0C0C0D", "#6E6E73"

# 바탕별 색: main(기본 부분), accent(내 자리 = 빨강)
PAL = {
    "white": {"bg": WHITE, "main": INK, "accent": RED},
    "black": {"bg": INK, "main": WHITE, "accent": RED},
    "red": {"bg": RED, "main": INK, "accent": WHITE},
    "stage": {"bg": STAGE, "main": WHITE, "accent": RED},
}

_uid = [0]


def uid():
    _uid[0] += 1
    return f"k{_uid[0]}"


# 각 마크: (m, a, bg) -> 100x100 안의 SVG 조각
def chair(m, a, bg):
    return (f'<rect x="30" y="14" width="40" height="44" rx="14" fill="{a}"/>'
            f'<rect x="14" y="42" width="12" height="42" rx="6" fill="{a}"/>'
            f'<rect x="74" y="42" width="12" height="42" rx="6" fill="{a}"/>'
            f'<rect x="30" y="62" width="40" height="18" rx="7" fill="{a}"/>')


def sight(m, a, bg):
    return (f'<rect x="18" y="14" width="64" height="11" rx="5.5" fill="{m}"/>'
            f'<path d="M50 86 L20 38 Q50 30 80 38 Z" fill="{a}" stroke="{a}" stroke-width="6" stroke-linejoin="round"/>')


def curve(m, a, bg):
    return (f'<path d="M16 46 Q50 18 84 46" fill="none" stroke="{m}" stroke-width="12" stroke-linecap="round"/>'
            f'<circle cx="50" cy="70" r="12" fill="{a}"/>')


def grid(m, a, bg):
    out = []
    for r in range(3):
        for c in range(3):
            col = a if (r, c) == (1, 1) else m
            out.append(f'<rect x="{10 + c * 29}" y="{10 + r * 29}" width="22" height="22" rx="6" fill="{col}"/>')
    return "".join(out)


TICKET = ("M20 24 H80 A8 8 0 0 1 88 32 V41 A9 9 0 0 0 88 59 V68 A8 8 0 0 1 80 76 "
          "H20 A8 8 0 0 1 12 68 V59 A9 9 0 0 0 12 41 V32 A8 8 0 0 1 20 24 Z")


def ticket(m, a, bg):
    i = uid()
    return (f'<defs><clipPath id="{i}"><rect x="0" y="0" width="62" height="100"/></clipPath></defs>'
            f'<path d="{TICKET}" fill="{m}"/>'
            f'<path d="{TICKET}" fill="{a}" clip-path="url(#{i})"/>'
            f'<rect x="62" y="20" width="4" height="60" fill="{bg}"/>')


def head(m, a, bg):
    return (f'<rect x="12" y="14" width="76" height="40" rx="7" fill="{a}"/>'
            f'<path d="M24 90 Q24 74 40 74 H60 Q76 74 76 90 Z" fill="{m}" stroke="{bg}" stroke-width="5" stroke-linejoin="round"/>'
            f'<circle cx="50" cy="60" r="13" fill="{m}" stroke="{bg}" stroke-width="5"/>')


def em(m, a, bg):
    return (f'<path d="M21 80 V52 A14.5 14.5 0 0 1 50 52 V80" fill="none" stroke="{m}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="M50 80 V52 A14.5 14.5 0 0 1 79 52 V80" fill="none" stroke="{a}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>')


def rows(m, a, bg):
    # 상영관 옆 단면: 왼쪽 스크린, 오른쪽으로 올라가는 계단식 객석, 그중 한 칸에 내 머리
    return (f'<rect x="12" y="14" width="10" height="48" rx="5" fill="{m}"/>'
            f'<path d="M32 86 V76 H47 V64 H62 V52 H77 V40 H86 V86 Z" fill="{m}" stroke="{m}" stroke-width="4" stroke-linejoin="round"/>'
            f'<circle cx="69.5" cy="40" r="9" fill="{a}"/>')


MARKS = [
    ("A", "의자", chair),
    ("B", "시선", sight),
    ("C", "곡면 스크린", curve),
    ("D", "좌석표 한 칸", grid),
    ("E", "티켓 반쪽", ticket),
    ("F", "앞사람 너머", head),
    ("G", "두 자리 m", em),
    ("H", "계단 객석", rows),
]


def mark_svg(fn, size, pal, label=None):
    p = PAL[pal]
    aria = f'role="img" aria-label="{label}"' if label else 'aria-hidden="true"'
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 100 100" {aria} style="display: block">'
            f'{fn(p["main"], p["accent"], p["bg"])}</svg>')


def icon(fn, size, pal, label=None, border=False):
    p = PAL[pal]
    inner = round(size * 0.64)
    bd = f"box-shadow: inset 0 0 0 1px {HAIR}; " if border else ""
    return (f'<div style="{bd}width: {size}px; height: {size}px; border-radius: {size * 0.225:.1f}px; '
            f'background: {p["bg"]}; display: flex; align-items: center; justify-content: center; flex: none">'
            f'{mark_svg(fn, inner, pal, label)}</div>')


def header(fn, pal):
    p = PAL[pal]
    bd = f"box-shadow: inset 0 0 0 1px {HAIR}; " if pal == "white" else ""
    return (f'<div style="{bd}flex: 1; height: 56px; border-radius: 8px; background: {p["bg"]}; '
            f'display: flex; align-items: center; padding: 0 16px; box-sizing: border-box">'
            f'{mark_svg(fn, 28, pal)}</div>')


def cell(letter, name, fn):
    return f'''<section style="width: 440px; height: 460px; box-sizing: border-box; padding: 32px 40px; display: flex; flex-direction: column; gap: 20px; border-right: 1px solid {HAIR}; border-bottom: 1px solid {HAIR}">
<h2 style="margin: 0; font-size: 16px; font-weight: 700; color: {INK}">{letter} · {name}</h2>
<div style="display: flex; justify-content: center">{icon(fn, 180, "white", f"{letter} {name} 로고", border=True)}</div>
<div style="display: flex; align-items: center; gap: 12px">{icon(fn, 60, "white", border=True)}{icon(fn, 60, "red")}{icon(fn, 60, "black")}<div style="flex: 1"></div>{mark_svg(fn, 32, "white")}{mark_svg(fn, 16, "white")}</div>
<div style="display: flex; gap: 8px">{header(fn, "white")}{header(fn, "stage")}</div>
</section>'''


W, H = 1840, 1000


def board():
    cells = "\n".join(cell(*m) for m in MARKS)
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>movie mate 로고 시안</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&amp;display=swap" rel="stylesheet">
<style>
body{{margin:0}}
</style>
</helmet>
<div style="width: {W}px; height: {H}px; box-sizing: border-box; padding: 40px; background: {WHITE}; font-family: 'Noto Sans KR', sans-serif; color: {INK}">
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid {HAIR}; border-left: 1px solid {HAIR}">
{cells}
</div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{W},"height":{H}}}}}'>
class Component extends DCLogic {{
renderVals() {{
return {{}};
}}
}}
</script>
</body>
</html>
'''


if __name__ == "__main__":
    root = sys.argv[1]
    os.makedirs(os.path.join(root, "project"), exist_ok=True)
    with open(os.path.join(root, "project", "Logo.dc.html"), "w") as f:
        f.write(board())
    idx_path = os.path.join(root, "project", "canvas.json")
    idx = json.load(open(idx_path))
    y = 40060
    idx["boards"]["Logo.dc.html"] = {"x": 0, "y": y, "w": W, "h": H, "title": "로고 · 시안 8종"}
    if "Logo.dc.html" not in idx["order"]:
        idx["order"].append("Logo.dc.html")
    idx["notes"]["t12"] = {"x": 0, "y": y - 340, "text": "로고 — 시안 8종", "kind": "title1", "maxW": W}
    idx["notes"]["g12"] = {"x": W + 80, "y": y, "w": 360, "size": "m", "fill": "orange",
                           "text": "칸마다 보는 법\n· 위 = 큰 앱 아이콘\n· 가운데 = 홈 화면 크기(흰·빨강·검정 바탕), 오른쪽 끝은 브라우저 탭 크기 32·16px\n· 아래 = 헤더 안 크기(라이트·시야 화면)\n· 빨간 부분은 '내 자리'예요"}
    json.dump(idx, open(idx_path, "w"), ensure_ascii=False, indent=1)
    print("ok")
