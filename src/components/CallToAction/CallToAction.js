"use client";
import { AnimatePresence, m, LazyMotion } from "framer-motion";

import styles from "./CallToAction.module.css";

import FileLink from "../FileLink";

import { RESUME, opacity0 } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function CallToAction() {
  return (
    <LazyMotion features={loadFeatures}>
      <m.section className={styles.wrapper} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className={styles.build}>Let&apos;s build something together!</h3>
        <p className={styles.viewResume}>View my resume in:</p>
        <div className={styles.resumeWrapper}>
          {RESUME.map((r) => (
            <FileLink
              key={r.title}
              src={r.icon}
              aria-label={`View my resume in ${r.title}`}
              alt={`${r.title} file format logo`}
              link={r.link}
            >
              {r.title}
            </FileLink>
          ))}
        </div>
      </m.section>
    </LazyMotion>
  );
}

export default CallToAction;