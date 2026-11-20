import { notFound } from "next/navigation";

/** proxy.ts 가 없는 주소를 보내는 곳. 404 상태와 not-found 화면을 낸다. */
export default function Missing() {
  notFound();
}
