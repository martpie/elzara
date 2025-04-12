import path from "node:path";
import fs from "node:fs";

import matter from "gray-matter";

const PROJECTS_PATH = path.join(process.cwd(), "content", "projects");

type Project = {
  slug: string;
  content: string;
  title: string;
  thumbnail: string;
  publish_date: Date;
  project_date: string;
  description: string;
  highlight?: string;
};

export function getProjects(): Array<Project> {
  const files = fs
    .readdirSync(PROJECTS_PATH)
    .filter((file) => file.endsWith(".md"));

  return files
    .map(getProjectContent)
    .filter(nonNullable)
    .sort((a, b) => b.publish_date.getTime() - a.publish_date.getTime());
}

export function getSingleProject(slug: string) {
  return getProjectContent(`${slug}.md`);
}

function getProjectContent(filepath: string): Project | null {
  try {
    const slug = filepath.replace(/\.md$/, "");
    const fullPath = path.join(PROJECTS_PATH, filepath);

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data, // assuming everything needed is there
      publish_date: new Date(data.publish_date),
    } as Project;
  } catch {
    return null;
  }
}

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
