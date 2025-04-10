import ReactMarkdown, { type Components } from "react-markdown";
import remarkYoutube from "remark-youtube";

import styles from "./Markdown.module.css";

type Props = {
  content: string;
};

/**
 * Custom <img /> to see the image in full screen
 */
const MarkdownImage: Components["img"] = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node,
  ...props
}) => {
  return (
    <a
      href={props.src}
      target="_blank"
      rel="noreferrer"
      className={styles.img}
      data-unstyled
    >
      <img {...props} />
    </a>
  );
};

/**
 * Custom paragraph, unwrapping <p> with a single <img /> in them
 */
const MarkdownParagraph: Components["p"] = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node,
  children,
  ...props
}) => {
  if (!children) {
    return null;
  }

  // If the paragraph only contains an image, unwrap it
  if (
    typeof children === "object" &&
    "type" in children &&
    children.type === "img"
  ) {
    return children;
  }

  return <p {...props}>{children}</p>;
};

const PLUGINS = [remarkYoutube];
const COMPONENTS: Components = {
  img: MarkdownImage,
  p: MarkdownParagraph,
};

/**
 * Markdown, but spicy
 */
export default function Markdown(props: Props) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown remarkPlugins={PLUGINS} components={COMPONENTS}>
        {props.content}
      </ReactMarkdown>
    </div>
  );
}
