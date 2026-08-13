import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>WACA RECORD NOT FOUND</p>
      <h1>기록을 찾을 수 없습니다.</h1>
      <Link href="/">류채린 프로필로 돌아가기</Link>
    </main>
  );
}
