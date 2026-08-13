import type { Metadata, Viewport } from "next";
import "@fontsource/black-han-sans/400.css";
import "@fontsource-variable/noto-sans-kr";
import "./globals.css";

export const metadata: Metadata = {
  title: "WACA 연합 기록 | 류채린",
  description:
    "대한민국 지부 II등급 연합원 류채린의 공개 프로필과 서포트 능력 운용 기록.",
  keywords: ["WACA", "류채린", "연합 캐릭터", "치어리더", "서포트 능력"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "WACA 연합 기록 | 류채린",
    description:
      "프로 치어리더이자 대한민국 지부 II등급 현장지원 요원 류채린의 공개 기록.",
    siteName: "WACA 연합 기록",
  },
  twitter: {
    card: "summary",
    title: "WACA 연합 기록 | 류채린",
    description:
      "프로 치어리더이자 대한민국 지부 II등급 현장지원 요원 류채린의 공개 기록.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0ea" },
    { media: "(prefers-color-scheme: dark)", color: "#17191f" },
  ],
};

const directionContract = `<!--
THESIS: 치어 안무의 8카운트 시트와 WACA 작전 기록을 하나의 읽기 경험으로 만든다. 흔한 카드형 캐릭터 프로필을 거부한다.
OWN-WORLD: 먹색 경기장 표면, 아이보리 기록지, 코랄 레드 작전 신호, 각진 점수판과 포메이션 선으로 구성한다.
STORY: 독자는 류채린의 정체와 역할을 즉시 파악하고, 두 서포트 능력의 운용 규칙과 한계를 차례로 확인한다.
FIRST VIEWPORT: 왼쪽에는 이름과 직책, 오른쪽에는 조작 가능한 8카운트 보드가 크게 놓이며 능력 기록으로 바로 이동한다.
FORM: 안무 카운트 시트, grounded direction 4, seed 3d283f5f.
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
        <span
          className="direction-contract"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: directionContract }}
        />
        {children}
      </body>
    </html>
  );
}
