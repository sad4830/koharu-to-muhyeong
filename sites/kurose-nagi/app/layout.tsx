import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "쿠로세 나기 | WACA 교단 기록",
  description:
    "칠죄교단 분노의 죄인, II등급 능력자 쿠로세 나기의 프로필과 전투 기록.",
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
      <body>{children}</body>
    </html>
  );
}
