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
    description: "공개 진술과 봉인된 사건 기록을 한 심문 파일에서 읽는 힐그램 캐릭터 프로필.",
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
    { media: "(prefers-color-scheme: light)", color: "#0d0b12" },
    { media: "(prefers-color-scheme: dark)", color: "#100c14" },
  ],
};

const directionContract = `<!--
THESIS: The same dark interrogation file changes under ultraviolet evidence light, exposing the planned murder beneath a gentle statement.
OWN-WORLD: Near-black plum room, muted violet dossier surfaces, restrained scanlines, one vertical UV evidence film, an EVIDENCE 01 intake portrait, and a single pale verdict sheet.
STORY: Identify the subject, compare the open statement with the sealed record, break three contradictions, follow seven deliberate choices, read the full deposition, and face the final question.
FIRST VIEWPORT: A full-height two-column intake record places testimony and controls at left, the framed Picrew evidence portrait at right, exact source captions below, and the public or sealed state visible without scrolling.
FORM: UV Cross-Examination — a restoration of the first dark-purple interrogation dossier, rebuilt around the complete canonical record; historical seed 6b3f0fe.
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
