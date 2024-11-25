import styles from "./Date.module.css";

type Props = {
  date: string;
};

export default function Date(props: Props) {
  return <time className={styles.date}>{props.date}</time>;
}
