import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 바이브 코딩 마스터클래스 | 신청 페이지",
  description:
    "코딩 없이 AI로 업무 도구를 만드는 법 — 2026년 4월 2일 오후 1시~5시, 본사 대회의실.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
