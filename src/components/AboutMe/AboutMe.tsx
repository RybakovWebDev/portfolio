"use client";
import { m, LazyMotion, useInView, AnimatePresence } from "framer-motion";

import styles from "./AboutMe.module.css";

import { useRefsContext } from "@/contexts/RefsContext";
import useViewportSize from "@/hooks/useViewportSize";
import { finalVerticalOffset, initialVerticalOffset } from "@/constants";

const loadFeatures = () => import("../../featuresMax").then((res) => res.default);

function AboutMe() {
  const { headerRef, aboutRef } = useRefsContext();
  const viewportSize = useViewportSize();

  const headerIsInView = useInView(headerRef);
  const aboutIsInView = useInView(aboutRef, { once: true, amount: 0.5 });

  const showAbout = viewportSize.width > 1080 ? aboutIsInView : !headerIsInView;

  const container = {
    hidden: initialVerticalOffset,
    show: {
      opacity: 1,
      y: 0,

      transition: {
        staggerChildren: showAbout ? 0.5 : 0,
      },
    },
  };

  const item = {
    hidden: initialVerticalOffset,
    show: showAbout ? finalVerticalOffset : initialVerticalOffset,
  };

  return (
    <LazyMotion features={loadFeatures}>
      <section className={styles.wrapper} ref={aboutRef}>
        <AnimatePresence mode='popLayout'>
          {showAbout && (
            <m.div className={styles.innerWrapper} variants={container} initial='hidden' animate='show' exit='hidden'>
              <m.p className={styles.text} variants={item}>
                I am a former video editor turned web developer. Since embarking on this journey in 2020, I have
                developed multiple commercial and personal projects, as well as completed various courses on
                technologies like JavaScript, TypeScript, React, Next.js and the MERN stack.
              </m.p>

              <m.p className={styles.text} variants={item}>
                Currently, I work as a full-stack developer (React/Python) at Vennie Tech, a startup developing an
                AI-powered customer support automation platform for German e&#8209;commerce businesses.
              </m.p>

              <m.p className={styles.text} variants={item}>
                Technology holds a special place in my heart, and my passion for it fuels my constant self-improvement.
                I&apos;m very meticulous about my work process, constantly researching and implementing best practices
                to keep my code clean and maintainable.
              </m.p>

              <m.p className={styles.text} variants={item}>
                Below you&apos;ll find some of my projects which can demonstrate how I turn ideas into interactive
                experiences 😊
                <span className={styles.caret}>|</span>
              </m.p>
            </m.div>
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
}

export default AboutMe;
