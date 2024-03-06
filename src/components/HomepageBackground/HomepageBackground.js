"use client";
import { useState, useEffect } from "react";

import styles from "./HomepageBackground.module.css";

import Background3DModel from "../Background3DModel";
import useViewportWidth from "@/hooks/useViewportWidth";

function HomepageBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const largeScreen = useViewportWidth() > 1090;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return null;
  }

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
