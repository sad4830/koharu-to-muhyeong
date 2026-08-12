import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WACA 인물 기록 — 시노하라 레이지",
  description: "WACA 일본 지부 II등급 현장 책임 요원 시노하라 레이지의 인물·능력 운용 기록.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
