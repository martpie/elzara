import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";

import "./globals.css";

const nanum = Nanum_Myeongjo({
  weight: ["400", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elzara Oiseau",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nanum.className}>{children}</body>
    </html>
  );
}
