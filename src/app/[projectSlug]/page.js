"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./projectSlug.module.css";

import { useRefsContext } from "@/contexts/RefsContext";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { PROJECTS } from "@/constants";

const ProjectPage = ({ params }) => {
  const router = useRouter();
  const { headerRef } = useRefsContext();

  const project = PROJECTS.filter((p) => p.slug === params.projectSlug)[0];
  const ProjectWrapper = project.component;

  useEffect(() => {
    if (!project) {
      router.push("/");
    }
  }, [project, router]);

  if (!project) {
    return null;
  }

  return (
    <article className={styles.wrapper}>
      <Header />
      <ProjectWrapper topRef={headerRef} />
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </article>
  );
};

export default ProjectPage;
