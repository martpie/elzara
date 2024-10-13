import { getDocuments } from "outstatic/server";
import { remark } from 'remark';
import html from 'remark-html';

import HomeProject from "../components/HomeProject";
import styles from "./page.module.css";

const remarkInstance = remark().use(html);

export default async function Home() {
  const [highlightedProject, ...otherProjects] = await getData();

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <p>
          <span>elzaraoiseau [at] gmail [dot] com</span>
          <br />
          <a
            href="https://www.instagram.com/elzara_oiseau/"
            target="_blank"
            rel="noreferrer"
          >
            @elzara_oiseau
          </a>
        </p>
      </div>

      <div className={styles.projects}>
        <div className={styles.projectHighlight}>
          <HomeProject
            name={highlightedProject.title}
            date={highlightedProject.date}
            image={highlightedProject.coverImage}
            content={highlightedProject.content}
            notice={highlightedProject.notice}
          />
        </div>

        <div className={styles.pastProjects}>
          {...otherProjects.map(project => (
            <HomeProject
            key={project.slug}
            name={project.title}
            date={project.date}
            image={project.coverImage}
            content={project.content}
            notice={project.notice}
          />
          ))}
        </div>
      </div>
    </main>
  );
}

async function getData() {
  const events = getDocuments("events", [
    "slug",
    "title",
    "content",
    "date",
    "coverImage",
    "notice"
  ]);

  return events.map(event => ({
    ...event,
    content: remarkInstance.processSync(event.content).toString(),
    date: event.date as string, // FIXME
    notice: event.notice as string | undefined, // FIXME
  }));
}
