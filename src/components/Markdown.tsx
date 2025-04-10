import ReactMarkdown from "react-markdown";
import styles from "./Markdown.module.css";

type Props = {
  content: string;
};

export default function Markdown(props: Props) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown>{props.content}</ReactMarkdown>
    </div>
  );
}
