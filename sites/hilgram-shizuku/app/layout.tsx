import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hilgram-shizuku.vercel.app"),
  title: "御影 雫 / 22 / 女性",
  description:
    "힐그램 수용자 미카게 시즈쿠의 공개 프로필과 비밀 프로필.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const directionContract = `<!-- impeccable-direction-contract 00f18842
THESIS: 친절한 기억과 폭력적인 보존이 같은 습관에서 갈라지는 인물 기록. 흔한 피 묻은 범죄 서류 연출을 거부한다.
OWN-WORLD: 흐린 흰색과 먹회색, 절제된 라일락 한 색, 사진 복원용 여백, 둥근 14px 표면과 가는 평행선.
STORY: 방문자는 공개된 배려를 먼저 읽고, 스스로 비밀 기록을 열어 그 배려가 통제로 변한 원인과 책임을 이해한다.
FIRST VIEWPORT: 왼쪽 42% 초상, 오른쪽 이름과 한 문장, 상단에 공개와 비밀 상태 전환. 주 동작은 비밀 프로필 열기다.
FORM: 모던 사진 보존 기록, 사용자 고정 방향, seed 00f18842.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <template
          data-impeccable-contract="00f18842"
          dangerouslySetInnerHTML={{ __html: directionContract }}
        />
        {children}
      </body>
    </html>
  );
}
