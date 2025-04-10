import Image from "next/image";
import { notFound } from "next/navigation";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";

import EventDate from "../../../../components/EventDate";
import Link from "../../../../components/Link";
import Markdown from "../../../../components/Markdown";
import Notice from "../../../../components/Notice";

import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EventPage(props: Props) {
  const { slug } = await props.params;
  const event = await getData(slug);

  if (event === null) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>{event.title}</h1>
      <div className={styles.metadata}>
        {event.date && <EventDate date={event.date} />}{" "}
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
      <div className={styles.footer}>
        <Link href="/">⇽ back</Link>
      </div>
    </div>
  );
}

async function getData(slug: string) {
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
    date: event.date as string, // FIXME
    notice: event.notice as string | undefined, // FIXME
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const data = await getData(slug);

  if (data === null) {
    throw `Could not find data for slug "${slug}"`;
  }

  return {
    title: `Elzara Oiseau - ${data.title}`,
  };
}

// https://github.com/avitorio/outstatic/issues/217#issuecomment-2027827626
export async function generateStaticParams() {
  const posts = getDocumentSlugs("events");
  return posts.map((slug) => ({ slug }));
}
