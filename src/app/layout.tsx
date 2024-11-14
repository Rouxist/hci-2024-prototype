import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RecordsProvider } from "../context/RecordsContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "실감 신기능 테스트",
  description: "실감의 신기능을 테스트하기 위한 페이지입니다.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecordsProvider>{children}</RecordsProvider>
      </body>
    </html>
  );
}
