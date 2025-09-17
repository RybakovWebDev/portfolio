"use client";
import { useRef } from "react";
import { m, LazyMotion, useInView } from "motion/react";

import styles from "./Experience.module.css";

import { timeline } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function Experience() {
  const wrapperRef = useRef(null);
  const isInView = useInView(wrapperRef, { once: true, amount: 0.5 });

  return (
    <LazyMotion features={loadFeatures}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {timeline.map((item, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.timelineMarker}>
              <m.div
                className={styles.dot}
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 1,
                }}
              ></m.div>
              <m.div
                className={styles.line}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{
                  type: "spring",
                  duration: 2,
                  bounce: 0,
                  delay: index * 1,
                }}
                style={{ transformOrigin: "top" }}
              />
            </div>
            <m.div
              className={styles.timelineContent}
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{
                duration: 0.3,
                delay: index * 1,
              }}
            >
              <div className={styles.date}>{item.date}</div>
              <h3 className={styles.company}>{item.name}</h3>
              <h4 className={styles.position}>{item.position}</h4>
              <ul className={styles.bullets}>
                {item.bullets.map((bullet: string, bulletIndex: number) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
            </m.div>
          </div>
        ))}
      </div>
    </LazyMotion>
  );
}

export default Experience;
