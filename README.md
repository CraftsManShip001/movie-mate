# movie mate

영화관 상영관과 좌석을 고르면 그 좌석에서 보이는 시야를 3D로 보여 주는 웹앱.

흐름: 극장 목록 `/` → 상영관 `/theaters/[theaterId]` → 좌석 선택 `/theaters/[theaterId]/[auditoriumId]` → 3D 시야 `/.../seats/[seatId]`

## 실행

```bash
npm install
npm run dev        # http://localhost:3000, 좌석 에디터는 /editor (개발 모드 전용)
npm test           # vitest
npm run typecheck
npm run lint
npm run build
```

## 구조

```
data/theaters/<theaterId>/theater.json              극장
data/theaters/<theaterId>/auditoriums/<id>.json     상영관 (치수 mm, 값마다 measured/estimated)
src/lib/domain/        스키마 타입, 좌석 좌표·시야 지표 계산(순수 함수), 검증
src/lib/data/registry.ts   JSON 등록부 (새 파일은 여기에 import 추가)
src/features/seat-map/ 좌석 배치도
src/features/viewer/   3D 시야 (React Three Fiber), 키 저장, 스크린 영상
src/features/editor/   좌석 배치 에디터 (/editor)
src/styles/tokens.css  디자인 토큰 자리 (디자인 확정 후 교체)
```

## 데이터 규칙

- 평면 치수는 건축 도면 실측값(`source: "measured"`), 단차·스크린 하단 높이 등 도면에 없는 값은 표준값(`source: "estimated"`).
- 상영관에 estimated 값이 하나라도 있으면 `estimated: true`. 실측 도면이 없는 가상 데이터는 `sample: true`.
- 좌석 행렬은 열마다 문자열 한 줄: `s` 일반, `w` 휠체어, `x` 판매 안 함, `.` 빈 칸. 모든 열의 칸 수가 같아야 한다.

## 스크린 영상

`src/features/viewer/video-source.ts`의 URL 상수 하나로 관리한다. 기본값은 Big Buck Bunny(CC BY 3.0, Blender Foundation)를 Wikimedia Commons에서 스트리밍한다. 재생할 수 없으면 캔버스 테스트 패턴으로 대체된다.
