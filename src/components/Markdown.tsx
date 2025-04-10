import ReactMarkdown from "react-markdown";
import remarkYoutube from "remark-youtube";

import styles from "./Markdown.module.css";

type Props = {
  content: string;
};

const PLUGINS = [remarkYoutube];

export default function Markdown(props: Props) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown remarkPlugins={PLUGINS}>{props.content}</ReactMarkdown>
    </div>
  );
}
