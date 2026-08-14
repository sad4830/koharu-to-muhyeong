import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "한해원 | WACA II등급 캐릭터 기록",
  description:
    "인간과 흡혈박쥐 DNA 융합 실험에서 살아남은 WACA 성 소 야고보 소속 II등급 제자, 한해원의 비공식 캐릭터 기록.",
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
    <html lang="ko">
      <body>
        <div
          aria-hidden="true"
          className="design-contract"
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: 동의서의 파형이 곧 전투 기록이다. 고딕 뱀파이어 영웅 페이지와 카드형 게임 프로필을 거부한다.
OWN-WORLD: 냉백색 감열지, 먹빛 격리실, 동맥색 적색 하나. 체인 오브 커스터디 규정선과 혈액백 라벨이 모든 구성 요소를 만든다.
STORY: 방문자는 인간 판정을 먼저 확인하고, 두 능력의 동의-배치-회수 규칙을 이해한 뒤, NEST 기록과 현재의 윤리적 선택을 열람한다.
FIRST VIEWPORT: 좌측 세로 등록축, 중앙의 큰 이름과 인용문, 우측 검은 파형실. 하단에는 네 개의 생물학 판정, 중앙에는 전투 기록 링크가 있다.
FORM: grounded direction 4, 동의 파형 원장. seed 5e087983. signature interaction은 붉은 신호가 세 단계 기록을 순환하는 파형이다.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
