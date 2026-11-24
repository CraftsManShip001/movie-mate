/**
 * 영화관마다 영화 id가 달라서(메가박스 "26070000", 롯데시네마 "25121") 극장을 넘나들 때는 제목으로 같은 영화를 찾는다.
 * 띄어쓰기·기호를 뺀 제목을 열쇠로 쓴다. 예: "헥스: 마녀왕국" == "헥스 마녀왕국"
 */
export function titleKey(title: string): string {
  return title.replace(/[\s:·,.!?'"()\-–—]/g, "").toLowerCase();
}

/** 시간표의 영화 중 제목이 같은 것. 없으면 undefined. */
export function findMovieByTitle<T extends { title: string }>(movies: readonly T[] | undefined, title: string | null): T | undefined {
  if (!movies || !title) return undefined;
  const key = titleKey(title);
  return key ? movies.find((m) => titleKey(m.title) === key) : undefined;
}
