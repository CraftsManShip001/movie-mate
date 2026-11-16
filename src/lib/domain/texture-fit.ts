/**
 * 영상을 스크린 비율에 꽉 채우기(cover) 위한 텍스처 repeat/offset 계산.
 * 남는 쪽을 가운데 기준으로 잘라 낸다. 레터박스(검은 띠)는 만들지 않는다.
 */
export interface UvFit {
  repeatX: number;
  repeatY: number;
  offsetX: number;
  offsetY: number;
}

export function coverUv(sourceAspect: number, targetAspect: number): UvFit {
  if (!(sourceAspect > 0) || !(targetAspect > 0)) {
    return { repeatX: 1, repeatY: 1, offsetX: 0, offsetY: 0 };
  }
  if (sourceAspect > targetAspect) {
    // 영상이 더 넓다: 좌우를 자른다
    const repeatX = targetAspect / sourceAspect;
    return { repeatX, repeatY: 1, offsetX: (1 - repeatX) / 2, offsetY: 0 };
  }
  // 영상이 더 좁거나 같다: 위아래를 자른다
  const repeatY = sourceAspect / targetAspect;
  return { repeatX: 1, repeatY, offsetX: 0, offsetY: (1 - repeatY) / 2 };
}
