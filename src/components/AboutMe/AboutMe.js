"use client";
import { m, LazyMotion, domAnimation, useInView } from "framer-motion";

import styles from "./AboutMe.module.css";
import { finalVerticalOffset, initialVerticalOffset, smoothSpring } from "@/constants";
import { useRefsContext } from "@/contexts/RefsContext";

function AboutMe() {
  const { aboutRef } = useRefsContext();
  const aboutIsInView = useInView(aboutRef);
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={aboutRef}
        className={styles.wrapper}
        initial={initialVerticalOffset}
        animate={aboutIsInView && finalVerticalOffset}
        transition={smoothSpring}
      >
        <p className={styles.text}>
          I am a former video editor turned web developer. Embarking on this journey in late 2020, I focused on React to
          learn building dynamic and interactive user-friendly interfaces. Since then I have taken multiple courses on
          different technologies like HTML, CSS, JS, Node.js, MongoDB and Next.js, as well as utilized various AWS
          products for deployment and hosting.
        </p>
        <p className={styles.text}>
          Modern technology holds a special place in my heart, and my passion for it fuels my constant learning,
          ensuring I implement best practices and keep my code clean and maintainable.
        </p>
        <p className={styles.text}>
          Below you&apos;ll find some of my projects to see how I turn ideas into interactive experiences!
          <span className={styles.caret}>|</span>
        </p>
      </m.section>
    </LazyMotion>
  );
}

export default AboutMe;
