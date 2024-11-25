import { notFound } from "next/navigation";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";
import { remark } from "remark";
import html from "remark-html";
import Image from "next/image";

import Notice from "../../../../components/Notice";
import Markdown from "../../../../components/Markdown";

import styles from "./page.module.css";
import Date from "../../../../components/Date";

type Props = {
  params: { slug: string };
};

export default async function EventPage(props: Props) {
  const event = await getData(props.params.slug);

  if (event === null) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>{event.title}</h1>
      <div className={styles.metadata}>
        {event.date && <Date date={event.date} />}{" "}
        {event.notice && <Notice label={event.notice} />}{" "}
      </div>
      {event.coverImage && (
        <Image
          className={styles.cover}
          priority
          src={event.coverImage}
          alt=""
          width="500" // FIXME
          height="500"
        />
      )}
      <Markdown content={event.content} />
    </div>
  );
}

async function getData(slug: string) {
  const remarkInstance = remark().use(html);

  const event = getDocumentBySlug("events", slug, [
    "title",
    "content",
    "date",
    "coverImage",
    "notice",
  ]);

  if (event === null) {
    return null;
  }

  return {
    ...event,
    content: remarkInstance.processSync(event.content).toString(),
    date: event.date as string, // FIXME
    notice: event.notice as string | undefined, // FIXME
  };
}

// https://github.com/avitorio/outstatic/issues/217#issuecomment-2027827626
export async function generateStaticParams() {
  const posts = getDocumentSlugs("posts");
  return posts.map((slug) => ({ slug }));
}
