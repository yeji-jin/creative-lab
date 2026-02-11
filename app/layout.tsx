import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./styles/globals.css";
import AppNav from "@/components/AppNav";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: { default: "Creative Lab", template: "%s | Creative Lab" },
  description: "Creative Lab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans">
        <AppNav>{children}</AppNav>
      </body>
    </html>
  );
}
