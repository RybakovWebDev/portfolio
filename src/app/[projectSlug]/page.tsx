"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./projectSlug.module.css";

import { useRefsContext } from "@/contexts/RefsContext";

import Footer from "@/components/Footer";
import MDS from "@/components/Projects/MDS";
import Todolist from "@/components/Projects/Todolist";
import Handsome from "@/components/Projects/Handsome";

import { PROJECTS } from "@/constants";

const projectComponents = {
  Handsome: Handsome,
  MDS: MDS,
  Todolist: Todolist,
};

const ProjectPage = ({ params }) => {
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
};

export default ProjectPage;
