"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, m, useInView, LazyMotion, domAnimation } from "framer-motion";
import { ExternalLink, GitHub } from "react-feather";

import styles from "./ProjectSelector.module.css";

import ExternalLinkIcon from "../ExternalLinkIcon";
import GradientBorders from "../GradientBorders";
import ArrowButton from "../ArrowButton";

import { PROJECTS } from "@/constants";
import { useRefsContext } from "@/contexts/RefsContext";
import useViewportWidth from "@/hooks/useViewportWidth";

function Projects({ ...props }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(0);
  const isSmallScreen = useViewportWidth() < 1430;

  const { projectSelectorRef } = useRefsContext();

  const isInView = useInView(projectSelectorRef, { once: true });
  const selectedProject = PROJECTS[currentIndex];

  const prevProject = () => {
    setCurrentIndex((oldIndex) => (oldIndex > 0 ? oldIndex - 1 : PROJECTS.length - 1));
    setAnimationDirection(-50);
  };

  const nextProject = () => {
    setCurrentIndex((oldIndex) => (oldIndex + 1) % PROJECTS.length);
    setAnimationDirection(50);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={projectSelectorRef}
        className={styles.wrapper}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 400, damping: 80, restDelta: 0.01 }}
        {...props}
      >
        <ArrowButton direction='previous' action={prevProject} isVisible={currentIndex > 0} />
        <AnimatePresence mode={isSmallScreen ? "popLayout" : "wait"}>
          <m.div
            key={selectedProject.slug}
            className={styles.project}
            initial={{ opacity: 0, x: animationDirection }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: animationDirection }}
            transition={{ type: "spring", damping: 50, stiffness: 700 }}
          >
            <div className={styles.imageWrapper}>
              <GradientBorders topBorder={50} rightBorder={50} bottomBorder={50} leftBorder={50}>
                <Image className={styles.image} src={selectedProject.media} alt='Project preview' fill sizes='600px' />
              </GradientBorders>
            </div>

            <div className={styles.infoWrapper}>
              <h2 className={styles.title}>{selectedProject.title}</h2>
              <p className={styles.year}>{selectedProject.year}</p>
              <p className={styles.description}>{selectedProject.description}</p>
              <p className={styles.stack}>Stack: {selectedProject.stack}</p>
              <Link
                href={`/${selectedProject.slug}`}
                aria-label='Open detailed project information'
                className={styles.detailsBtn}
              >
                <m.span
                  initial={{ borderBottom: "2px solid rgb(0, 0, 0, 0.3)" }}
                  whileHover={{ borderBottom: "6px solid rgb(0, 0, 0, 0.8)" }}
                  transition={{ duration: 0.1 }}
                >
                  Details
                </m.span>
              </Link>
            </div>

            <div className={styles.linksWrapper}>
              <ExternalLinkIcon aria-label='Open project on GitHub' link={selectedProject.github}>
                <GitHub size={40} strokeWidth={1} />
              </ExternalLinkIcon>

              <ExternalLinkIcon aria-label='Open deployed project' link={selectedProject.live}>
                <ExternalLink size={40} strokeWidth={1} />
              </ExternalLinkIcon>
            </div>
          </m.div>
        </AnimatePresence>
        <ArrowButton direction='next' action={nextProject} isVisible={currentIndex < PROJECTS.length - 1} />
      </m.section>
    </LazyMotion>
  );
}

export default Projects;
