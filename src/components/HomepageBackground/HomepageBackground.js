"use client";
import styles from "./HomepageBackground.module.css";

import useViewportSize from "@/hooks/useViewportSize";

import Background3DModel from "../Background3DModel";

function HomepageBackground() {
  const largeScreen = useViewportSize().width > 1090;

  return (
    <section className={styles.wrapper}>
      <div className={styles.modelRight}>
        <Background3DModel shape={"x"} />
      </div>
      <div className={styles.modelLeft}>{largeScreen && <Background3DModel shape={"triangle"} />}</div>
      <div className={styles.modelRight}>
        <Background3DModel shape={"torus"} />
      </div>
    </section>
  );
}

export default HomepageBackground;
