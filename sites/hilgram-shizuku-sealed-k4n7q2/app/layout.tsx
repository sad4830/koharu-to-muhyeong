import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hilgram-shizuku-sealed-k4n7q2.vercel.app"),
  title: "御影 雫 / 22 / 女性",
  description: "힐그램 운영진 확인용 비공개 프로필.",
  referrer: "no-referrer",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      noarchive: true,
    },
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const directionContract = `<!-- impeccable-direction-contract 00f18842-sealed
THESIS: 사랑을 보존한다는 명목으로 선택권을 지운 사람의 봉인 기록. 피와 범죄 현장 장식의 상투성을 거부한다.
OWN-WORLD: 먹회색 보관실, 어두운 라일락, 흐린 흰 기록문, 14px 표면과 정밀한 평행선.
STORY: 운영진은 진짜 신상에서 시작해 성격의 왜곡, 사건의 인과, 심문의 핵심 사상을 순서대로 검토한다.
FIRST VIEWPORT: 왼쪽 42%의 어두워진 초상, 오른쪽 이름과 결정적 진술, 상단의 운영진 열람용 표식.
FORM: 모던 사진 보존 기록의 봉인본, 기존 시각 세계 확장, seed 00f18842-sealed.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <template
          data-impeccable-contract="00f18842-sealed"
          dangerouslySetInnerHTML={{ __html: directionContract }}
        />
        {children}
      </body>
    </html>
  );
}
