"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./ProjectPage.module.css";

import { useRefsContext } from "@/contexts/RefsContext";

import Footer from "@/components/Footer";
import MDS from "@/components/Projects/MDS";
import Todolist from "@/components/Projects/Todolist";
import Handsome from "@/components/Projects/Handsome";
import PairLearner from "@/components/Projects/PairLearner";
import Insightour from "@/components/Projects/Insightour";

import { PROJECTS } from "@/constants";

const projectComponents = {
  Insightour: Insightour,
  PairLearner: PairLearner,
  Handsome: Handsome,
  MDS: MDS,
  Todolist: Todolist,
};

function ProjectPage({ params }) {
  const router = useRouter();
  const { headerRef } = useRefsContext();

  const project = PROJECTS.filter((p) => p.slug === params.projectSlug)[0];

  useEffect(() => {
    if (!project) {
      router.push("/");
    }
  }, [project, router]);

  if (!project) {
    return null;
  }

  const ProjectWrapper = projectComponents[project.slug];

  return (
    <article className={styles.wrapper}>
      <ProjectWrapper topRef={headerRef} />
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </article>
  );
}

export default ProjectPage;
