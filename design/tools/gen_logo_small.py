"""로고 E-2 작은 판(16·32px용). usage: python3 gen_logo_small.py <canvas root>"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_logo_e import shape_e2, mark_svg, page, INK, WHITE, HAIR, STAGE
from gen_logo_e2 import BRAND, section

SUB = "#6E6E73"
LIGHT = (WHITE, BRAND, INK)
DARK = ("#35363A", BRAND, WHITE)


# 32px용: 100칸 안에서 꽉 차게, 절취선 홈을 크게(r16)
SMALL = ("M14 20 H48 A16 16 0 0 0 80 20 H86 A10 10 0 0 1 96 30 V70 A10 10 0 0 1 86 80 "
         "H80 A16 16 0 0 0 48 80 H14 A10 10 0 0 1 4 70 V30 A10 10 0 0 1 14 20 Z")


def small32(size, tri, label=None):
    bg, t, s = tri
    aria = f'role="img" aria-label="{label}"' if label else 'aria-hidden="true"'
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 100 100" {aria} style="display: block">'
            f'<defs><clipPath id="sa{size}{bg[1:]}"><rect x="0" y="0" width="61.5" height="100"/></clipPath>'
            f'<clipPath id="sb{size}{bg[1:]}"><rect x="66.5" y="0" width="40" height="100"/></clipPath></defs>'
            f'<path d="{SMALL}" fill="{t}" clip-path="url(#sa{size}{bg[1:]})"/>'
            f'<path d="{SMALL}" fill="{s}" clip-path="url(#sb{size}{bg[1:]})"/></svg>')


def small16(size, tri, label=None, grid=False):
    """16px 격자에 맞춘 판: 꼭지까지 한 색(검은 꼭지를 따로 두면 비디오 카메라처럼 보였다), 1칸 절취선 + 위아래 반지름 2 홈."""
    bg, t, s = tri
    aria = f'role="img" aria-label="{label}"' if label else 'aria-hidden="true"'
    lines = ""
    if grid:
        lines = "".join(f'<line x1="{i}" y1="0" x2="{i}" y2="16" stroke="{HAIR}" stroke-width="0.04"/>'
                        f'<line x1="0" y1="{i}" x2="16" y2="{i}" stroke="{HAIR}" stroke-width="0.04"/>' for i in range(17))
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 16 16" {aria} style="display: block" shape-rendering="geometricPrecision">'
            f'{lines}'
            f'<rect x="1" y="3" width="14" height="10" rx="1.5" fill="{t}"/>'
            f'<rect x="9.5" y="3" width="1" height="10" fill="{bg}"/>'
            f'<circle cx="10" cy="3" r="2" fill="{bg}"/><circle cx="10" cy="13" r="2" fill="{bg}"/></svg>')


def compare(tri, title):
    bg = tri[0]
    box = f"box-shadow: inset 0 0 0 1px {HAIR}; " if bg == WHITE else ""
    def col(label, a, b, c):
        return (f'<div style="display: flex; flex-direction: column; gap: 14px">'
                f'<div style="font-size: 13px; color: {SUB if bg == WHITE else "#9A9AA0"}">{label}</div>'
                f'<div style="display: flex; align-items: center; gap: 20px">{a}{b}{c}</div></div>')
    big = col("큰 판", mark_svg(shape_e2, 48, tri), mark_svg(shape_e2, 32, tri), mark_svg(shape_e2, 16, tri))
    sm = col("작은 판", small32(48, tri), small32(32, tri), small16(16, tri))
    return section(title, f'''<div style="{box}flex: 1; background: {bg}; border-radius: 12px; padding: 28px; display: flex; flex-direction: column; gap: 28px; box-sizing: border-box">{big}{sm}</div>''')


def zoom():
    return section("16px 판 확대", f'''<div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 24px">
{small16(176, LIGHT, "16px 작은 판 확대", grid=True)}
<div style="display: flex; flex-direction: column; gap: 16px; align-items: center">{small16(16, LIGHT)}<div style="background: {INK}; border-radius: 6px; padding: 8px">{small16(16, (INK, BRAND, WHITE))}</div></div>
</div>''')


def tab(bar, active, ink, tri, mark):
    return f'''<div style="height: 44px; background: {bar}; border-radius: 10px; display: flex; align-items: flex-end; padding: 0 10px; box-sizing: border-box">
<div style="width: 200px; height: 34px; background: {active}; border-radius: 8px 8px 0 0; display: flex; align-items: center; gap: 8px; padding: 0 12px; box-sizing: border-box">{mark}<span style="font-size: 13px; color: {ink}">movie mate</span></div>
</div>'''


def tabs():
    rows = []
    for name, m_l, m_d in (("큰 판", mark_svg(shape_e2, 16, LIGHT), mark_svg(shape_e2, 16, DARK)),
                           ("작은 판", small16(16, LIGHT), small16(16, DARK))):
        rows.append(f'<div style="display: flex; flex-direction: column; gap: 10px"><div style="font-size: 13px; color: {SUB}">{name}</div>'
                    f'{tab("#E8E8EA", WHITE, INK, LIGHT, m_l)}{tab("#202124", "#35363A", "#E8EAED", DARK, m_d)}</div>')
    return section("브라우저 탭", f'<div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 28px">{"".join(rows)}</div>')


W, H = 1840, 540

if __name__ == "__main__":
    root = sys.argv[1]
    proj = os.path.join(root, "project")
    cells = "\n".join([compare(LIGHT, "큰 판 vs 작은 판 · 라이트"), compare((STAGE, BRAND, WHITE), "큰 판 vs 작은 판 · 다크"), zoom(), tabs()])
    open(os.path.join(proj, "LogoE2Small.dc.html"), "w").write(page("로고 E-2 작은 판", W, H, cells))
    idx_path = os.path.join(proj, "canvas.json")
    idx = json.load(open(idx_path))
    y = 42940 + 540 + 120
    idx["boards"]["LogoE2Small.dc.html"] = {"x": 0, "y": y, "w": W, "h": H, "title": "E-2 작은 판 · 16·32px용"}
    if "LogoE2Small.dc.html" not in idx["order"]:
        idx["order"].append("LogoE2Small.dc.html")
    idx["notes"]["g15"] = {"x": W + 80, "y": y, "w": 360, "size": "m", "fill": "orange",
                           "text": "작은 판\n· 32px 이하에서만 써요. 48px부터는 큰 판\n· 32px 판: 절취선 홈을 크게 키웠어요\n· 16px 판: 16칸 격자에 맞춰 따로 그렸어요. 꼭지까지 버건디 한 색, 1칸 절취선 + 위아래 홈"}
    json.dump(idx, open(idx_path, "w"), ensure_ascii=False, indent=1)
    print("ok")
