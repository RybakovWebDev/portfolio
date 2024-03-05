"use client";
import { useState, useEffect } from "react";
import { useInView } from "framer-motion";

import styles from "./HomepageBackground.module.css";

import Background3DModel from "../Background3DModel";

import { useRefsContext } from "@/contexts/RefsContext";

function HomepageBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const initialScrollPosition =
    typeof window !== "undefined"
      ? (window.scrollY / parseFloat(getComputedStyle(document.documentElement).fontSize)) * 0.1
      : 0;
  const [scrollPosition, setScrollPosition] = useState(initialScrollPosition);

  const { heroRef, aboutRef, contactRef } = useRefsContext();

  const heroInView = useInView(heroRef);
  const aboutInView = useInView(aboutRef);
  const contactInView = useInView(contactRef);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let frameId = null;
    let isScrolling = false;

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const position = window.scrollY;
        const remPosition = position / parseFloat(getComputedStyle(document.documentElement).fontSize);
        setScrollPosition(remPosition * 0.1);
        isScrolling = false;
      }
    };

    const loop = () => {
      if (isScrolling) {
        handleScroll();
        frameId = window.requestAnimationFrame(loop);
      } else {
        frameId = null;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        isScrolling = true;
        if (frameId === null) {
          loop();
        }
      });

      return () => {
        window.removeEventListener("scroll", loop);
        if (frameId) {
          window.cancelAnimationFrame(frameId);
        }
      };
    }
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.modelRight} style={{ transform: `translateY(${scrollPosition}rem)` }}>
        {heroInView && <Background3DModel shape={"x"} />}
      </div>
      <div className={styles.modelLeft} style={{ transform: `translateY(${scrollPosition}rem)` }}>
        {aboutInView && <Background3DModel shape={"square"} />}
      </div>
      <div className={styles.modelRight} style={{ transform: `translateY(${scrollPosition}rem)` }}>
        {contactInView && <Background3DModel shape={"torus"} />}
      </div>
    </section>
  );
}

export default HomepageBackground;
