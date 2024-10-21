import styles from "./Notice.module.css";

type Props = {
  label: string;
};

export default function Notice(props: Props) {
  return <span className={styles.notice}>{props.label}</span>;
}
