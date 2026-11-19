"""movie mate 로고 E 다듬기: 모양 4종(흑백) + 색 8종. usage: python3 gen_logo_e.py <canvas root>"""
import sys, os, json

INK, WHITE, HAIR, STAGE, CREAM = "#141414", "#FFFFFF", "#D9D9DC", "#0C0C0D", "#E9E1D3"

_uid = [0]


def uid():
    _uid[0] += 1
    return f"e{_uid[0]}"


# ── 모양 ─────────────────────────────────────────────
# t = 본권 색, s = 꼭지 색, bg = 바탕(절취선 틈)
E1 = ("M20 25 H80 A10 10 0 0 1 90 35 V41 A9 9 0 0 0 90 59 V65 A10 10 0 0 1 80 75 "
      "H20 A10 10 0 0 1 10 65 V59 A9 9 0 0 0 10 41 V35 A10 10 0 0 1 20 25 Z")
E2 = ("M18 26 H57 A7 7 0 0 0 71 26 H82 A8 8 0 0 1 90 34 V66 A8 8 0 0 1 82 74 "
      "H71 A7 7 0 0 0 57 74 H18 A8 8 0 0 1 10 66 V34 A8 8 0 0 1 18 26 Z")
E4 = ("M36 8 H64 A8 8 0 0 0 72 16 V60 A6 6 0 0 0 72 72 V84 A8 8 0 0 0 64 92 "
      "H36 A8 8 0 0 0 28 84 V72 A6 6 0 0 0 28 60 V16 A8 8 0 0 0 36 8 Z")


def split_h(path, cut, t, s, bg, gap=4, stub_tf=""):
    """세로 절취선(x=cut)으로 나눈 가로 티켓. 왼쪽 본권 t, 오른쪽 꼭지 s."""
    a, b = uid(), uid()
    return (f'<defs><clipPath id="{a}"><rect x="0" y="0" width="{cut - gap / 2}" height="100"/></clipPath>'
            f'<clipPath id="{b}"><rect x="{cut + gap / 2}" y="0" width="100" height="100"/></clipPath></defs>'
            f'<path d="{path}" fill="{t}" clip-path="url(#{a})"/>'
            f'<g transform="{stub_tf}"><path d="{path}" fill="{s}" clip-path="url(#{b})"/></g>')


def shape_e1(t, s, bg):  # 원래 E를 다듬음: 옆 홈, 비율 8:5
    return split_h(E1, 64, t, s, bg)


def shape_e2(t, s, bg):  # 절취선 위아래에 홈 (실제 티켓 구조)
    return split_h(E2, 64, t, s, bg)


def shape_e3(t, s, bg):  # 꼭지를 뜯어낸 순간
    return f'<g transform="translate(-4 2)">{split_h(E2, 64, t, s, bg, gap=0, stub_tf="translate(5 -3) rotate(14 66 26)")}</g>'


def shape_e4(t, s, bg):  # 세로 오리지널 티켓: 오목한 모서리, 아래가 꼭지
    a, b = uid(), uid()
    return (f'<defs><clipPath id="{a}"><rect x="0" y="0" width="100" height="64"/></clipPath>'
            f'<clipPath id="{b}"><rect x="0" y="68" width="100" height="40"/></clipPath></defs>'
            f'<path d="{E4}" fill="{t}" clip-path="url(#{a})"/>'
            f'<path d="{E4}" fill="{s}" clip-path="url(#{b})"/>')


SHAPES = [
    ("E-1", "옆 홈 다듬기", shape_e1),
    ("E-2", "절취선 홈", shape_e2),
    ("E-3", "꼭지 뜯기", shape_e3),
    ("E-4", "세로 오리지널", shape_e4),
]

# 모양 비교용 흑백 바탕: (바탕, 본권, 꼭지)
MONO = {
    "white": (WHITE, INK, "#A1A1A6"),
    "black": (INK, WHITE, "#6E6E73"),
    "cream": (CREAM, INK, "#857A6A"),
    "stage": (STAGE, WHITE, "#6E6E73"),
}


def lum(hexc):
    r, g, b = (int(hexc[i:i + 2], 16) / 255 for i in (1, 3, 5))
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def color_pal(brand):
    light = lum(brand) > 0.35  # 밝은 색(노랑) 위에는 흰 티켓이 안 보인다
    on_brand = (brand, INK, WHITE) if light else (brand, WHITE, INK)
    if brand == INK:  # 검정 하나
        return {"white": (WHITE, INK, "#A1A1A6"), "brand": (INK, WHITE, "#6E6E73"),
                "black": (CREAM, INK, "#857A6A"), "stage": (STAGE, WHITE, "#6E6E73")}
    return {"white": (WHITE, brand, INK), "brand": on_brand,
            "black": (INK, brand, WHITE), "stage": (STAGE, brand, WHITE)}


def mark_svg(fn, size, tri, label=None):
    bg, t, s = tri
    aria = f'role="img" aria-label="{label}"' if label else 'aria-hidden="true"'
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 100 100" {aria} style="display: block">'
            f'{fn(t, s, bg)}</svg>')


def tile(fn, size, tri, label=None):
    bg = tri[0]
    bd = f"box-shadow: inset 0 0 0 1px {HAIR}; " if bg == WHITE else ""
    return (f'<div style="{bd}width: {size}px; height: {size}px; border-radius: {size * 0.225:.1f}px; '
            f'background: {bg}; display: flex; align-items: center; justify-content: center; flex: none">'
            f'{mark_svg(fn, round(size * 0.64), tri, label)}</div>')


def header(fn, tri):
    bg = tri[0]
    bd = f"box-shadow: inset 0 0 0 1px {HAIR}; " if bg == WHITE else ""
    return (f'<div style="{bd}flex: 1; height: 56px; border-radius: 8px; background: {bg}; '
            f'display: flex; align-items: center; padding: 0 16px; box-sizing: border-box">'
            f'{mark_svg(fn, 28, tri)}</div>')


def cell(title, fn, pal):
    w, b3, k = pal["white"], pal.get("brand", pal.get("black")), pal.get("third", pal.get("black"))
    tiles = [pal["white"], pal["brand"], pal["black"]] if "brand" in pal else [pal["white"], pal["black"], pal["cream"]]
    return f'''<section style="width: 440px; height: 460px; box-sizing: border-box; padding: 32px 40px; display: flex; flex-direction: column; gap: 20px; border-right: 1px solid {HAIR}; border-bottom: 1px solid {HAIR}">
<h2 style="margin: 0; font-size: 16px; font-weight: 700; color: {INK}; font-variant-numeric: tabular-nums">{title}</h2>
<div style="display: flex; justify-content: center">{tile(fn, 180, w, title + " 로고")}</div>
<div style="display: flex; align-items: center; gap: 12px">{"".join(tile(fn, 60, t) for t in tiles)}<div style="flex: 1"></div>{mark_svg(fn, 32, w)}{mark_svg(fn, 16, w)}</div>
<div style="display: flex; gap: 8px">{header(fn, w)}{header(fn, pal["stage"])}</div>
</section>'''


def page(title, w, h, cells, cols=4):
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>{title}</title>
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
<div style="width: {w}px; height: {h}px; box-sizing: border-box; padding: 40px; background: {WHITE}; font-family: 'Noto Sans KR', sans-serif; color: {INK}">
<div style="display: grid; grid-template-columns: repeat({cols}, minmax(0, 1fr)); border-top: 1px solid {HAIR}; border-left: 1px solid {HAIR}">
{cells}
</div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{w},"height":{h}}}}}'>
class Component extends DCLogic {{
renderVals() {{
return {{}};
}}
}}
</script>
</body>
</html>
'''


COLORS = [
    ("벨벳 버건디", "#A3192E"),
    ("코랄", "#FF6B57"),
    ("통로등 앰버", "#FF8A00"),
    ("팝콘 노랑", "#FFC21A"),
    ("비상구 초록", "#00A05A"),
    ("상영관 남색", "#2B3A9E"),
    ("네온 간판 핑크", "#F2357A"),
    ("검정 하나", "#141414"),
]

SW, SH = 1840, 540
CW, CH = 1840, 1000

if __name__ == "__main__":
    root = sys.argv[1]
    proj = os.path.join(root, "project")
    shapes = "\n".join(cell(f"{n} · {name}", fn, MONO) for n, name, fn in SHAPES)
    open(os.path.join(proj, "LogoE1.dc.html"), "w").write(page("로고 E 모양 4종", SW, SH, shapes))
    colors = "\n".join(cell(f"{name} {hx}", shape_e1, color_pal(hx)) for name, hx in COLORS)
    open(os.path.join(proj, "LogoEColor.dc.html"), "w").write(page("로고 E 색 8종", CW, CH, colors))

    idx_path = os.path.join(proj, "canvas.json")
    idx = json.load(open(idx_path))
    y = 41500
    idx["boards"]["LogoE1.dc.html"] = {"x": 0, "y": y, "w": SW, "h": SH, "title": "E 다듬기 · 모양 4종 (흑백)"}
    idx["boards"]["LogoEColor.dc.html"] = {"x": SW + 80, "y": y, "w": CW, "h": CH, "title": "E 다듬기 · 대표색 8종"}
    for k in ("LogoE1.dc.html", "LogoEColor.dc.html"):
        if k not in idx["order"]:
            idx["order"].append(k)
    idx["notes"]["t13"] = {"x": 0, "y": y - 340, "text": "로고 E 다듬기 — 모양 4종 + 대표색 8종",
                           "kind": "title1", "maxW": SW * 2 + 80}
    idx["notes"]["g13"] = {"x": SW * 2 + 160, "y": y, "w": 360, "size": "m", "fill": "orange",
                           "text": "보는 법\n· 왼쪽 = 모양만 비교하려고 흑백으로 그렸어요\n· 오른쪽 = 대표색 8종, 모두 E-1 모양\n· 칸마다 가운데 줄 = 흰 바탕, 대표색 바탕, 검정 바탕(모양 쪽은 흰·검정·티켓 종이색)\n· 고른 색은 어느 모양에도 그대로 옮길 수 있어요"}
    json.dump(idx, open(idx_path, "w"), ensure_ascii=False, indent=1)
    print("ok")
