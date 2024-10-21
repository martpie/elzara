import Image from "next/image";
import React from "react";
import Link from "next/link";

import styles from "./HomeProject.module.css";
import Notice from "./Notice";
import Date from "./Date";

type Props = {
  slug: string;
  name: string;
  excerpt: string;
  date: string;
  image?: string;
  notice?: string;
};

export default function HomeProject(props: Props) {
  return (
    <div className={styles.homeProject}>
      <Link href={`/events/${props.slug}`} className={styles.homeProjectLink}>
        <div className={styles.images}>
          {props.image !== undefined && (
            <Image
              priority
              className={styles.image}
              src={props.image}
              alt=""
              width="500" // FIXME
              height="500"
            />
          )}
        </div>

        <div className={styles.headline}>
          <h3 className={styles.title}>{props.name}</h3>
          {props.notice != null && <Notice label={props.notice} />}
        </div>
        <Date date={props.date} />
        <p className={styles.excerpt}>{props.excerpt}</p>
      </Link>
    </div>
  );
}
