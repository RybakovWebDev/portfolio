import { Metadata } from "next";

import ProjectPage from "@/components/ProjectPage";

import { PROJECTS } from "@/constants";

export async function generateMetadata({ params }: { params: { projectSlug: string } }): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.projectSlug);
  return {
    title: project ? `${project.title} | Andrey Rybakov` : "Project Not Found",
    description: `Detailed information about the ${project?.title} project` || "Project not found",
  };
}

export default function Page({ params }: { params: { projectSlug: string } }) {
  return <ProjectPage params={params} />;
}
