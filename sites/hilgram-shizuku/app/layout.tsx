import type { Metadata, Viewport } from "next";
import "@fontsource-variable/noto-sans-kr/wght.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "미카게 시즈쿠 / 21 / 여성",
  description: "한 번 맺은 약속을 끝내지 못한 힐그램 수용자 미카게 시즈쿠의 공개 및 비밀 프로필.",
  metadataBase: new URL("https://hilgram-shizuku.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "미카게 시즈쿠 / 21 / 여성",
    description: "공개 진술과 봉인된 사건 기록을 한 노선 위에서 읽는 힐그램 캐릭터 프로필.",
    url: "/",
    siteName: "HILGRAM",
    locale: "ko_KR",
    type: "profile",
    images: [{
      url: "/mikage-shizuku.webp",
      width: 1280,
      height: 1280,
      alt: "미카게 시즈쿠 외관 참고 이미지",
    }],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "codex-preview": "development",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f1f6" },
    { media: "(prefers-color-scheme: dark)", color: "#111219" },
  ],
};

const directionContract = `<!--
THESIS: A one-way night transit map turns every promise into a stop and refuses the usual dossier or profile-card arrangement.
OWN-WORLD: Cool station surfaces, ultraviolet route lines, sharp information boards, circular stop nodes, condensed route labels, and one decisive portrait crop.
STORY: Identify Shizuku, read the public statement, switch lines to expose three contradictions, trace seven choices, then inspect the full history and ideology.
FIRST VIEWPORT: Portrait poster left, route board right, character name at platform scale, and the public-secret line switch visible without scrolling.
FORM: After-hours transfer map, grounded direction 3 of 7, seed c12c8752.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <template id="impeccable-direction-contract" dangerouslySetInnerHTML={{ __html: directionContract }} />
        {children}
      </body>
    </html>
  );
}
