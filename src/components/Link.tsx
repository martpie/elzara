"use client";

import NextLink, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Link.module.css";

type Props = LinkProps & {
  children: string;
  target?: string;
  rel?: string;
};

export default function Link(props: Props) {
  const { children, ...rest } = props;
  const pathname = usePathname();

  return (
    <NextLink
      {...rest}
      className={`${styles.link} ${pathname === props.href ? styles.active : ""}`}
    >
      {children}
    </NextLink>
  );
}
