"""로고 E-2 + 벨벳 버건디: 기본 칸 + 실제로 놓일 자리 3곳. usage: python3 gen_logo_e2.py <canvas root>"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_logo_e import shape_e2, mark_svg, tile, header, page, INK, WHITE, HAIR, STAGE

BRAND = "#A3192E"
STUB_ON_BRAND = "#DAA3AB"  # 흰색 60% + 버건디 40%: 버건디 바탕에서 검은 꼭지는 대비가 약하다
SUB = "#6E6E73"

PAL = {
    "white": (WHITE, BRAND, INK),
    "brand": (BRAND, WHITE, STUB_ON_BRAND),
    "black": (INK, BRAND, WHITE),
    "stage": (STAGE, BRAND, WHITE),
}
fn = shape_e2


def section(title, body):
    return f'''<section style="width: 440px; height: 460px; box-sizing: border-box; padding: 32px 40px; display: flex; flex-direction: column; gap: 20px; border-right: 1px solid {HAIR}; border-bottom: 1px solid {HAIR}">
<h2 style="margin: 0; font-size: 16px; font-weight: 700; color: {INK}">{title}</h2>
{body}
</section>'''


def basic():
    w = PAL["white"]
    return section("E-2 · 벨벳 버건디", f'''<div style="display: flex; justify-content: center">{tile(fn, 180, w, "movie mate 로고")}</div>
<div style="display: flex; align-items: center; gap: 12px">{"".join(tile(fn, 60, PAL[k]) for k in ("white", "brand", "black"))}<div style="flex: 1"></div>{mark_svg(fn, 32, w)}{mark_svg(fn, 16, w)}</div>
<div style="display: flex; gap: 8px">{header(fn, w)}{header(fn, PAL["stage"])}</div>''')


def tab(bar, active, ink, pal):
    return f'''<div style="height: 44px; background: {bar}; border-radius: 10px; display: flex; align-items: flex-end; padding: 0 10px; box-sizing: border-box">
<div style="width: 220px; height: 34px; background: {active}; border-radius: 8px 8px 0 0; display: flex; align-items: center; gap: 8px; padding: 0 12px; box-sizing: border-box">{mark_svg(fn, 16, pal)}<span style="font-size: 13px; color: {ink}">movie mate</span></div>
</div>'''


def browser():
    light = tab("#E8E8EA", WHITE, INK, PAL["white"])
    dark = tab("#202124", "#35363A", "#E8EAED", ("#35363A", BRAND, WHITE))
    return section("브라우저 탭", f'''<div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 24px">{light}{dark}</div>''')


def home():
    rows = "".join(
        f'<div style="height: 52px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid {HAIR}; font-size: 15px; color: {INK}">{n}<span style="color: {SUB}">›</span></div>'
        for n in ("CGV 용산아이파크몰", "메가박스 코엑스", "롯데시네마 월드타워"))
    return section("1번 화면 맨 위", f'''<div style="flex: 1; box-shadow: inset 0 0 0 1px {HAIR}; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column">
<div style="height: 72px; display: flex; align-items: center; padding: 0 24px; flex: none">{mark_svg(fn, 30, PAL["white"])}</div>
<div style="padding: 8px 24px 0; display: flex; flex-direction: column; gap: 16px">
<div style="font-size: 24px; font-weight: 700; color: {INK}; letter-spacing: -0.02em">시야를 볼 수 있는 극장</div>
<div style="border-top: 1px solid {INK}">{rows}</div>
</div>
</div>''')


def view():
    return section("시야 화면", f'''<div style="flex: 1; background: {STAGE}; border-radius: 12px; position: relative; overflow: hidden">
<div style="position: absolute; left: 24px; top: 22px">{mark_svg(fn, 26, PAL["stage"])}</div>
<a href="#" style="position: absolute; right: 20px; top: 16px; height: 38px; padding: 0 14px; border-radius: 8px; background: #F2F2F3; color: {INK}; font-size: 13px; font-weight: 700; display: flex; align-items: center; text-decoration: none">CGV에서 예매하기</a>
</div>''')


W, H = 1840, 540

if __name__ == "__main__":
    root = sys.argv[1]
    proj = os.path.join(root, "project")
    cells = "\n".join([basic(), browser(), home(), view()])
    open(os.path.join(proj, "LogoE2Burgundy.dc.html"), "w").write(page("로고 E-2 버건디", W, H, cells))
    idx_path = os.path.join(proj, "canvas.json")
    idx = json.load(open(idx_path))
    y = 42940
    idx["boards"]["LogoE2Burgundy.dc.html"] = {"x": 0, "y": y, "w": W, "h": H, "title": "E-2 + 벨벳 버건디 · 실제 자리에 놓기"}
    if "LogoE2Burgundy.dc.html" not in idx["order"]:
        idx["order"].append("LogoE2Burgundy.dc.html")
    idx["notes"]["t14"] = {"x": 0, "y": y - 340, "text": "로고 E-2 + 벨벳 버건디", "kind": "title1", "maxW": W}
    idx["notes"]["g14"] = {"x": W + 80, "y": y, "w": 360, "size": "m", "fill": "orange",
                           "text": "보는 법\n· 왼쪽 = 앱 아이콘(흰·버건디·검정 바탕), 탭 크기 32·16px, 헤더 크기\n· 나머지 = 실제로 놓일 자리: 브라우저 탭, 1번 화면 맨 위, 시야 화면 왼쪽 위\n· 버건디 바탕에서는 꼭지를 연분홍으로 바꿨어요(검정은 잘 안 보여서)"}
    json.dump(idx, open(idx_path, "w"), ensure_ascii=False, indent=1)
    print("ok")
