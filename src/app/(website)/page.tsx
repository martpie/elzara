import type { Metadata } from "next";
import { getDocuments } from "outstatic/server";

import HomeProject from "../../components/HomeProject";
import styles from "./page.module.css";

export default async function Home() {
  const [highlightedProject, ...otherProjects] = await getData();

  return (
    <>
      <div className={styles.projects}>
        <div className={styles.projectHighlight}>
          <HomeProject
            slug={highlightedProject.slug}
            name={highlightedProject.title}
            date={highlightedProject.date}
            image={highlightedProject.coverImage}
            excerpt={highlightedProject.excerpt}
            notice={highlightedProject.notice}
          />
        </div>

        <div className={styles.pastProjects}>
          {otherProjects.map((project) => (
            <HomeProject
              key={project.slug}
              slug={project.slug}
              name={project.title}
              date={project.date}
              image={project.coverImage}
              excerpt={project.excerpt}
              notice={project.notice}
            />
          ))}
        </div>
      </div>
    </>
  );
}

async function getData() {
  const events = getDocuments("events", [
    "slug",
    "title",
    "content",
    "date",
    "coverImage",
    "notice",
    "excerpt",
  ]);

  return events.map((event) => ({
    ...event,
    date: event.date as string, // FIXME
    excerpt: event.excerpt as string, // FIXME
    notice: event.notice as string | undefined, // FIXME
  }));
}

export const metadata: Metadata = {
  title: "Elzara Oiseau - Visual Artist",
  description:
    "Elzara Oiseau is Ukrainian Crimean Tatar artist, based in Zurich, Switzerland",
};
