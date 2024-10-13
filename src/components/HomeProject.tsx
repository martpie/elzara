import Image from "next/image";
import React from "react";

import styles from "./HomeProject.module.css";

type Props = {
  name: string;
  content: string;
  date: string;
  image?: string;
  notice?: string;
};

export default function HomeProject(props: Props) {
  return (
    <div className={styles.homeProject}>
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
        <span className={styles.notice}>{props.notice}</span>
      </div>
      <time className={styles.date}>{props.date}</time>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  );
}
