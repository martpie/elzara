import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";

import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";

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
      <body className={`${nanum.className} ${styles.layout}`}>
        <header>
          <div className={styles.header}>
            <p>
              <span>elzaraoiseau [at] gmail [dot] com</span>
              <br />
              <Link
                href="https://www.instagram.com/elzara_oiseau/"
                target="_blank"
                rel="noreferrer"
              >
                @elzara_oiseau
              </Link>
            </p>
            <p>
              <Link href="/portfolio.pdf" target="_blank" rel="noreferrer">
                Portfolio
              </Link>
            </p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
