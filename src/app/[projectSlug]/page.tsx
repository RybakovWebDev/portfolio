import { Metadata } from "next";

import ProjectPage from "@/components/ProjectPage";

import { PROJECTS } from "@/constants";

export async function generateMetadata({ params }: { params: Promise<{ projectSlug: string } >}): Promise<Metadata> {
  const {projectSlug} = await params;
  const project = PROJECTS.find((p) => p.slug === projectSlug);
  return {
    title: project ? `${project.title} | Andrey Rybakov` : "Project Not Found",
    description: `Detailed information about the ${project?.title} project` || "Project not found",
  };
}

export default async function Page({ params }: { params: Promise<{ projectSlug: string }> }) {
  const resolvedParams = await params;
  return <ProjectPage params={resolvedParams} />;
}
