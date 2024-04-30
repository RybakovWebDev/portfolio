"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, m, useInView, LazyMotion, PanInfo } from "framer-motion";

import styles from "./ProjectSelector.module.css";

import GradientBorders from "../GradientBorders";
import ArrowButton from "../ArrowButton";

import { useRefsContext } from "@/contexts/RefsContext";
import useViewportSize from "@/hooks/useViewportSize";

import { PROJECTS } from "@/constants";
import ProjectLinks from "../ProjectLinks";

const loadFeatures = () => import("../../features").then((res) => res.default);

function ProjectSelector() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<number | null>(null);
  const viewportSize = useViewportSize();

  const { projectSelectorRef } = useRefsContext();
  const isInView = useInView(projectSelectorRef, { once: true, amount: 0.4 });

  const isSmallScreen = viewportSize.width < 1100;
  const selectedProject = PROJECTS[currentIndex];
  const firstProject = currentIndex === 0;
  const lastProject = currentIndex === PROJECTS.length - 1;

  const prevProject = () => {
    setAnimationDirection(-1);
    setCurrentIndex((oldIndex) => (oldIndex > 0 ? oldIndex - 1 : PROJECTS.length - 1));
  };

  const nextProject = () => {
    setAnimationDirection(1);
    setCurrentIndex((oldIndex) => (oldIndex + 1) % PROJECTS.length);
  };

  const variants = {
    enter: {
      x: animationDirection ? (animationDirection > 0 ? 50 : -50) : 0,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (animationDirection: number) => {
      return {
        x: animationDirection < 0 ? 50 : -50,
        opacity: 0,
      };
    },
  };

  const handleGesture = (e: PointerEvent, info: PanInfo) => {
    if (e.pointerType !== "touch") return;

    if (info.offset.x < -50 && !lastProject) {
      nextProject();
    } else if (info.offset.x > 50 && !firstProject) {
      prevProject();
    }
  };

  return (
    <LazyMotion features={loadFeatures}>
      <m.section
        ref={projectSelectorRef}
        className={styles.wrapper}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 400, damping: 80, restDelta: 0.01 }}
      >
        <ArrowButton direction='previous' action={prevProject} isNearEdge={lastProject} isVisible={!firstProject} />
        <AnimatePresence mode={isSmallScreen ? "popLayout" : "wait"} custom={animationDirection}>
          <m.div
            key={selectedProject.slug}
            className={styles.project}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{ type: "spring", damping: 50, stiffness: 700 }}
          >
            <m.div className={styles.imageWrapper}>
              <Link
                href={`/${selectedProject.slug}`}
                aria-label={`Open detailed project information for ${selectedProject.title}`}
              >
                <GradientBorders topBorder={"50px"} rightBorder={"50px"} bottomBorder={"50px"} leftBorder={"50px"}>
                  <Image
                    className={styles.image}
                    src={selectedProject.media}
                    alt='Project preview'
                    fill
                    sizes={viewportSize.height > 1000 ? "600px" : "400px"}
                  />
                </GradientBorders>
              </Link>
            </m.div>

            <m.div className={styles.infoWrapper} onPanEnd={(e, info) => handleGesture(e, info)}>
              <h2 className={styles.title}>{selectedProject.title}</h2>
              <p className={styles.year}>{selectedProject.year}</p>
              <p className={styles.description}>{selectedProject.description}</p>
              <p className={styles.stack}>Stack: {selectedProject.stack}</p>
              <Link
                href={`/${selectedProject.slug}`}
                aria-label={`Open detailed project information for ${selectedProject.title}`}
                className={styles.detailsBtn}
              >
                <m.span
                  initial={{ borderBottom: "2px solid rgba(var(--color-underline), 0.3)" }}
                  whileHover={{ borderBottom: "6px solid rgba(var(--color-underline), 0.8)" }}
                  transition={{ duration: 0.1 }}
                >
                  View project details
                </m.span>
              </Link>
            </m.div>

            <ProjectLinks live={selectedProject.live} github={selectedProject.github} />
          </m.div>
        </AnimatePresence>
        <ArrowButton direction='next' action={nextProject} isNearEdge={firstProject} isVisible={!lastProject} />
      </m.section>
    </LazyMotion>
  );
}

export default ProjectSelector;
