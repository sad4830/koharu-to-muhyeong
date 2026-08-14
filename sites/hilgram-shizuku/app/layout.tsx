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
    { media: "(prefers-color-scheme: light)", color: "#f3f0ec" },
    { media: "(prefers-color-scheme: dark)", color: "#100c12" },
  ],
};

const directionContract = `<!--
THESIS: A finished promise turns wrong-side-out, exposing the seam that was always control. The page refuses dossiers, transit maps, card grids, and interrogation dashboards.
OWN-WORLD: Cold couture paper, near-black lining, one carmine thread, asymmetric pattern-cutting spreads, exposed seam allowance, oversized edition type, and a portrait cut like fabric.
STORY: Meet the polished outside, turn the garment, unpick three false seams, follow seven deliberate cuts, then reach the knot she refuses to release.
FIRST VIEWPORT: A full-height fashion cover layers one irregular Picrew cutout, restrained MIKAGE/SHIZUKU edition type, testimony and measurements at left, source captions at right, and the outside/lining switch at the lower edge.
FORM: Promise, Wrong Side Out — couture cover into unpicked lining, grounded direction 5 of 7, seed f1671878.
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
