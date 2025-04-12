import type { Metadata } from "next";

import HomeProject from "../../components/HomeProject";
import styles from "./page.module.css";
import { getProjects } from "../../lib/content";

export default async function Home() {
  const [highlightedProject, ...otherProjects] = await getData();

  return (
    <>
      <div className={styles.projects}>
        <HomeProject
          slug={highlightedProject.slug}
          name={highlightedProject.title}
          date={highlightedProject.project_date}
          image={highlightedProject.thumbnail}
          excerpt={highlightedProject.description}
          notice={highlightedProject.highlight}
        />

        <div className={styles.pastProjects}>
          {otherProjects.map((project) => (
            <HomeProject
              key={project.slug}
              slug={project.slug}
              name={project.title}
              date={project.project_date}
              image={project.thumbnail}
              excerpt={project.description}
              notice={project.highlight}
            />
          ))}
        </div>
      </div>
    </>
  );
}

async function getData() {
  return getProjects();
}

export const metadata: Metadata = {
  title: "Elzara Oiseau - Visual Artist",
  description:
    "Elzara Oiseau is a Ukrainian Crimean Tatar artist, based in Zurich, Switzerland",
};
