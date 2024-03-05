"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./TechIcons.module.css";

import { TECHICONS } from "@/constants";

function TechIcons({ ...props }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOnLeftSide, setIsOnLeftSide] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1 >= TECHICONS.length ? 0 : prevIndex + 1));
      setIsOnLeftSide((prevIsLeft) => !prevIsLeft);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const AnimatedImage = ({ index }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30, height: 200, width: 200 }}
      animate={{ opacity: 1, y: 0, position: "absolute" }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", damping: 100, stiffness: 400, restDelta: 0.01 }}
      {...props}
    >
      <Image className={styles.icon} src={TECHICONS[index]} alt='Technology icon' fill sizes='200px' />
    </motion.div>
  );

  return (
    <section className={styles.wrapper}>
      <div className={styles.leftSide}>
        <AnimatePresence mode='wait'>{isOnLeftSide && <AnimatedImage index={currentIndex} />}</AnimatePresence>
      </div>
      <div className={styles.rightSide}>
        <AnimatePresence mode='wait'>{!isOnLeftSide && <AnimatedImage index={currentIndex} />}</AnimatePresence>
      </div>
    </section>
  );
}

export default TechIcons;
