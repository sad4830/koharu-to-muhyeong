import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "서유화 | WACA II등급 봉인 기록",
  description:
    "달의하루 염라의 상실, 자기심판, 가면과 개화를 담은 WACA II등급 잠입요원 서유화의 공개·비밀 프로필.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <div
          className="direction-contract"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html:
              "<!-- THESIS: 죽은 타인을 애도하는 프로필이 자신이 버린 가장 진실한 얼굴의 심판 기록으로 뒤집힌다. OWN-WORLD: 먹색, 응고된 적색, 상아색 활자, 청록 ARK 신호와 절단된 원. STORY: 요원, 능력, 사건, 봉인 증언, 현재 선택으로 이어진다. FIRST VIEWPORT: 06:66과 결손 원 사이에서 공식곡을 0:00부터 재생하며 기록을 연다. FORM: 생일 기록처럼 위장한 사망 심사 파일, grounded candidate 4, seed 4180525d. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->",
          }}
        />
        {children}
      </body>
    </html>
  );
}
