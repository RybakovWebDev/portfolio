"use client";

import styles from "./Hero.module.css";

import { useRefsContext } from "@/contexts/RefsContext";

function Hero() {
  const { heroRef } = useRefsContext();
  return (
    <section className={styles.hero}>
      <h2>Hey there! I&apos;m</h2>
      <h1 ref={heroRef} className={styles.name}>
        Andrey
      </h1>
      <h2 className={styles.introductionEnd}>{"an aspiring web <developer />."}</h2>
    </section>
  );
}

export default Hero;
