import Link from "next/link";
import { Frame, FrameHeader, frameStyles } from "@/features/flow/Frame";

/** 없는 극장·상영관·좌석 주소. 처음 화면으로 돌아갈 길을 둔다. */
export default function NotFound() {
  return (
    <Frame header={<FrameHeader title="movie mate" logo />}>
      <div className={frameStyles.empty}>
        <p className={frameStyles.emptyTitle}>찾는 화면이 없어요</p>
        <p className={frameStyles.emptyBody}>주소가 바뀌었거나 없는 극장·좌석이에요</p>
        <div className={frameStyles.emptyActions}>
          <Link href="/" className={frameStyles.cta}>
            영화관 고르러 가기
          </Link>
        </div>
      </div>
    </Frame>
  );
}
