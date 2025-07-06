import localFont from "next/font/local";
import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QueryProvider from "./query-provider";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Nuto | 누구나 토닥이는 소비",
  description: "누구나 토닥이는 소비",
  icons: {
    icon: "/nuto.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.variable} antialiased relative flex flex-col gap-4`}
      >
        <Header />
        <QueryProvider>{children}</QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
