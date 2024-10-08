"use client";
import { useCallback, useEffect, useState } from "react";
import { m, LazyMotion, useAnimation } from "framer-motion";
import { adjectives, animals, uniqueNamesGenerator } from "unique-names-generator";

import styles from "./NameGeneratorDemo.module.css";

import GradientBorders from "@/components/GradientBorders";

import { smoothSpring } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function NameGeneratorDemo() {
  const [name, setName] = useState("");
  const controls = useAnimation();

  const generateName = useCallback(async () => {
    await controls.start({
      x: ["0rem", "25rem"],
      opacity: [1, 0],
      transition: { duration: 0.2 },
    });

    const newName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      length: 2,
      separator: " ",
      style: "capital",
    });
    setName(newName);

    await controls.start({
      x: ["-25rem", "0rem"],
      opacity: [0, 1],
      transition: { duration: 0.3 },
    });
  }, [controls]);

  useEffect(() => {
    generateName();
  }, [generateName]);

  return (
    <div className={styles.wrapper}>
      <GradientBorders topBorder={"0px"} bottomBorder={"0px"}>
        <div className={styles.nameWrapper}>
          <LazyMotion features={loadFeatures}>
            <m.p className={styles.name} animate={controls} transition={smoothSpring}>
              {name}
            </m.p>
          </LazyMotion>
        </div>
      </GradientBorders>
      <button onClick={generateName} className={styles.pushable}>
        <span className={styles.shadow}></span>
        <span className={styles.edge}></span>
        <span className={styles.front}>Generate new name</span>
      </button>
    </div>
  );
}

export default NameGeneratorDemo;
