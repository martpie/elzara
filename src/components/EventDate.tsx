import styles from "./EventDate.module.css";

type Props = {
  date: string;
};

export default function EventDate(props: Props) {
  return <time className={styles.date}>{props.date}</time>;
}
