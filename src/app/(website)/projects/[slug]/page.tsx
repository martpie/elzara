import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import EventDate from "../../../../components/EventDate";
import Link from "../../../../components/Link";
import Markdown from "../../../../components/Markdown";
import Notice from "../../../../components/Notice";
import { getProjects, getSingleProject } from "../../../../lib/content";

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
        {event.project_date && <EventDate date={event.project_date} />}{" "}
        {event.highlight && <Notice label={event.highlight} />}{" "}
      </div>
      {event.thumbnail && (
        <Image
          className={styles.cover}
          priority
          src={event.thumbnail}
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
  const project = getSingleProject(slug);

  return project;
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

export async function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug,
  }));
}
