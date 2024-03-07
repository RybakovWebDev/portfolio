"use client";
import { m, LazyMotion, domAnimation, useInView, AnimatePresence } from "framer-motion";

import styles from "./AboutMe.module.css";

import { useRefsContext } from "@/contexts/RefsContext";
import useViewportSize from "@/hooks/useViewportSize";

import { finalVerticalOffset, initialVerticalOffset } from "@/constants";

function AboutMe() {
  const { headerRef, aboutRef } = useRefsContext();
  const headerIsInView = useInView(headerRef);
  const viewportSize = useViewportSize();

  const showAbout = !headerIsInView || viewportSize.width > 1430;

  return (
    <LazyMotion features={domAnimation}>
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
                I am a former video editor turned web developer. Embarking on this journey in late 2020, I focused on
                React to learn building dynamic user-friendly interfaces. Since then I have taken multiple courses on
                different technologies like HTML, CSS, JS, Node.js, MongoDB and Next.js, as well as utilized various AWS
                products for deployment and hosting.
              </p>
              <p className={styles.text}>
                Technology holds a special place in my heart, and my passion for it fuels my constant learning, ensuring
                I implement best practices and keep my code clean and maintainable.
              </p>
              <p className={styles.text}>
                Below you&apos;ll find some of my projects to see how I turn ideas into interactive experiences!
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
