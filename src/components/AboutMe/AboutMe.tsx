"use client";
import { m, LazyMotion, useInView, AnimatePresence } from "framer-motion";

import styles from "./AboutMe.module.css";

import { useRefsContext } from "@/contexts/RefsContext";
import useViewportSize from "@/hooks/useViewportSize";
import { finalVerticalOffset, initialVerticalOffset } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function AboutMe() {
  const { headerRef, aboutRef } = useRefsContext();
  const headerIsInView = useInView(headerRef);
  const viewportSize = useViewportSize();

  const showAbout = !headerIsInView || viewportSize.width > 1430;

  return (
    <LazyMotion features={loadFeatures}>
      <section ref={aboutRef} className={styles.wrapper}>
        <AnimatePresence mode='popLayout'>
          {showAbout && (
            <m.div
              initial={initialVerticalOffset}
              animate={finalVerticalOffset}
              exit={initialVerticalOffset}
              transition={{ duration: 0.3 }}
            >
              <p className={styles.text}>
                I am a former video editor turned web developer. Since embarking on this journey in 2020, I have
                developed multiple commercial and personal projects, as well as completed various courses on
                technologies like JavaScript, TypeScript, React, Next.js and the MERN stack. Currently, I work as a
                full-stack developer (React/Python) at Vennie Tech UG, a startup developing an AI-powered customer
                support automation platform for German e-commerce businesses.
              </p>
              <p className={styles.text}>
                Technology holds a special place in my heart, and my passion for it fuels my constant self-improvement.
                I&apos;m very meticulous about my work process, constantly researching and implementing best practices
                to keep my code clean and maintainable.
              </p>
              <p className={styles.text}>
                Below you&apos;ll find some of my projects which can demonstrate how I turn ideas into interactive
                experiences 😊
                <span className={styles.caret}>|</span>
              </p>
            </m.div>
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
}

export default AboutMe;
