import styles from "./Markdown.module.css";

type Props = {
  content: string;
};

export default function Markdown(props: Props) {
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
}
