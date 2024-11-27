import NextLink, { LinkProps } from "next/link";

import styles from "./Link.module.css";

type Props = LinkProps & {
  children: string;
  target?: string;
  rel?: string;
};

export default function Link(props: Props) {
  const { children, ...rest } = props;

  return (
    <NextLink {...rest} className={styles.link}>
      {children}
    </NextLink>
  );
}
