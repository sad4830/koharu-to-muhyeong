import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "@fontsource-variable/noto-sans-kr";
import "./globals.css";

export const metadata: Metadata = {
  title: "베라 말라스피나 | ERRATA",
  description: "칠죄교단 색욕의 죄인, II등급 베라 말라스피나의 텍스트 전용 캐릭터 프로필.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const contract = `
THESIS: 통제 가능한 정보 구조 안에서만 폭주하는 생체실험실 기록.
OWN-WORLD: 투명 미세유체 분석 카트리지, 연기빛 흑연, 수술실 회색, 형광 연두 한 색.
STORY: 기록, 능력 조건, 실패의 진실, 두 번째 문, 열린 관계 순으로 시약처럼 흐른다.
FIRST VIEWPORT: 이름, 교단, 등급, 체격과 증명실의 파열음이 한 화면에 들어온다.
FORM: seed 3628e6ba, 이미지 없는 텍스트 프로필, 고정 수치는 안정된 관로, 인물의 광기는 넘치는 시약.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <body>
        <span
          hidden
          data-design-contract="3628e6ba"
          dangerouslySetInnerHTML={{ __html: `<!--${contract}-->` }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{const s=localStorage.getItem('vera-theme');const p=matchMedia('(prefers-color-scheme: light)').matches;document.documentElement.dataset.theme=s==='dark'||s==='light'?s:(p?'light':'dark')}catch{}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
