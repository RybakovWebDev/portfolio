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
          Welcome to my portfolio page! Here you can get to know me a little better, and check out the stuff I&apos;ve
          been working on.
        </p>
        <p className={styles.text}>
          I am a former video editor who has been learning web development starting in 2021. Since then I have taken
          multiple courses with a focus on frontend, and more specifically, React. Other than that I currenly use HTML,
          CSS, JS, Node.js, MongoDB and Next.js in my projects, along with various AWS products for deployment and
          hosting.
        </p>
        <p className={styles.text}>
          I&apos;m really passionate about technology in general and am very meticulous about my work process. I strive
          to keep my code clean and maintanable, and constantly research and implement relevant best practices.
          <span className={styles.caret}>|</span>
        </p>
      </m.section>
    </LazyMotion>
  );
}

export default AboutMe;
