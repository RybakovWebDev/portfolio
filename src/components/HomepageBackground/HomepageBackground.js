"use client";
import { useState, useEffect } from "react";
import { useInView } from "framer-motion";

import styles from "./HomepageBackground.module.css";

import Background3DModel from "../Background3DModel";

import { useRefsContext } from "@/contexts/RefsContext";

function HomepageBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  const { projectSelectorRef, contactRef } = useRefsContext();

  const projectsInView = useInView(projectSelectorRef);
  const contactInView = useInView(contactRef, { amount: 0.3 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded || (window.innerWidth < 1430 && projectsInView && !contactInView)) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.modelRight}>
        <Background3DModel shape={"x"} />
      </div>
      <div className={styles.modelLeft}>{window.innerWidth > 1430 && <Background3DModel shape={"square"} />}</div>
      <div className={styles.modelRight}>
        <Background3DModel shape={"torus"} />
      </div>
    </section>
  );
}

export default HomepageBackground;
