import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";

import "./globals.css";
import styles from "./layout.module.css";
import Link from "../../components/Link";
import NavigationProgress from "../../components/NavigationProgress";

const nanum = Nanum_Myeongjo({
  weight: ["400", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elzara Oiseau",
  icons: [
    {
      url: "/favicon.png",
      type: "image/png",
      sizes: "96x96",
    },
  ],
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nanum.className} ${styles.layout}`}>
        <NavigationProgress />
        <header className={styles.header}>
          <div className={styles.headerSection}>
            <Link href="/">Home</Link>
            <br />
            <Link href="/portfolio.pdf" target="_blank" rel="noreferrer">
              Portfolio
            </Link>
          </div>
          <div className={styles.headerSection}>
            <Link
              href="https://www.instagram.com/elzara_oiseau/"
              target="_blank"
              rel="noreferrer"
            >
              @elzara_oiseau
            </Link>
            <br />
            {/* obfuscated-kinda email, not sure it has any value */}
            &#101;&#108;&#122;&#097;&#114;&#097;&#111;&#105;&#115;&#101;&#097;&#117;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;
          </div>
        </header>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
