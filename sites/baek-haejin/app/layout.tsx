import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "백해진 | WACA 구조판독 기록",
  description: "WACA II등급 현장 분석관 백해진의 인물 및 능력 기록.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
