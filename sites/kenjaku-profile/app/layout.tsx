import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "@fontsource-variable/noto-sans-kr";
import "./globals.css";

export const metadata: Metadata = {
  title: "켄자쿠 인물 기록",
  description:
    "주술회전 켄자쿠의 정체, 육체 계보, 술식과 계획을 출처와 함께 정리한 한국어 프로필.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const directionContract = `
THESIS: 켄자쿠의 정체를 봉합선으로 이어진 육체 교체 기록으로 읽는다. 평범한 캐릭터 카드 배열을 거부한다.
OWN-WORLD: 먹흑, 산화 녹색, 오래된 금색, 뼈색. 한지 위 해부 병리도감과 결계 도면의 날카로운 모서리 언어다.
STORY: 독자는 정체와 육체 계보를 파악하고, 술식과 사멸회유 계획을 검증하며, 원할 때만 완결 스포일러를 해제한다.
FIRST VIEWPORT: 좌측 거대 이름과 핵심 문장, 중앙 봉합선, 우측 공식 전신 증거물이 한 화면을 점유한다. 읽기 시작은 좌측 하단에 둔다.
FORM: 해부 병리도감 × 육체 교체 장부. 수동 배정 1순위. 콘셉트 시드 도구는 네트워크 제한으로 실행 불가.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

const installDirectionContract = `document.body.prepend(document.createComment(${JSON.stringify(directionContract)}));`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <script
          id="direction-contract"
          dangerouslySetInnerHTML={{ __html: installDirectionContract }}
        />
        {children}
      </body>
    </html>
  );
}
