"use client";
import React, { useEffect, useState } from "react";
import { adjectives, animals, uniqueNamesGenerator } from "unique-names-generator";
import { motion, useAnimation } from "framer-motion";

import { smoothSpring } from "@/constants";
import GradientBorders from "../GradientBorders";

import styles from "./NameGeneratorDemo.module.css";

function NameGeneratorDemo() {
  const [name, setName] = useState("");
  const controls = useAnimation();

  const generateName = async () => {
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
  };

  useEffect(() => {
    generateName();
  }, []);

  return (
    <div className={styles.wrapper}>
      <GradientBorders topBorder={"0"} bottomBorder={"0"}>
        <div className={styles.nameWrapper}>
          <motion.p className={styles.name} animate={controls} transition={smoothSpring}>
            {name}
          </motion.p>
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
