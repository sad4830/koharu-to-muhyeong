import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hilgram-shizuku.vercel.app"),
  title: "御影 雫 / 22 / 女性",
  description: "힐그램 수용자 미카게 시즈쿠의 공개 프로필.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const directionContract = `<!-- impeccable-direction-contract 00f18842-public
THESIS: 세심하게 복원된 한 사람의 공개 기록. 흔한 캐릭터 카드 묶음과 불필요한 부가 동선을 거부한다.
OWN-WORLD: 흐린 흰색, 절제된 라일락 한 색, 사진 복원용 여백, 둥근 14px 표면과 가는 평행선.
STORY: 방문자는 초상과 한 문장으로 시즈쿠를 만나고, 공개 양식과 오너 정보를 방해 없이 확인한다.
FIRST VIEWPORT: 왼쪽 42% 초상, 오른쪽 이름과 한 문장, 상단에 공개와 오너 상태 전환.
FORM: 모던 사진 보존 기록의 공개본, 사용자 고정 방향, seed 00f18842-public.
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
          data-impeccable-contract="00f18842-public"
          dangerouslySetInnerHTML={{ __html: directionContract }}
        />
        {children}
      </body>
    </html>
  );
}
