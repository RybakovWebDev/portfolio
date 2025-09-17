"use client";
import { m, LazyMotion } from "motion/react";

import styles from "./CallToAction.module.css";

import FileLink from "@/components/FileLink";
import ContactForm from "../ContactForm";

import { RESUME } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function CallToAction() {
  return (
    <LazyMotion features={loadFeatures}>
      <m.section className={styles.wrapper} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className={styles.build}>Let&apos;s build something together!</h3>
        <p className={styles.viewResume}>Download my resume in:</p>
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
        <ContactForm />
      </m.section>
    </LazyMotion>
  );
}

export default CallToAction;
