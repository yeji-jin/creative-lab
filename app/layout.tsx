import type { Metadata } from "next";
import "./styles/globals.css";
import AppNav from "@/components/AppNav";

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
    <html lang="ko">
      <body>
        <AppNav>{children}</AppNav>
      </body>
    </html>
  );
}
