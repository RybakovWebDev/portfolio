import { m, LazyMotion } from "framer-motion";

import styles from "./ExternalLinkIcon.module.css";

import { smoothSpring } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function ExternalLinkIcon({ link, children, ...props }) {
  return (
    <LazyMotion features={loadFeatures}>
      <m.a
        className={styles.link}
        target='_blank'
        rel='noopener noreferrer'
        href={link}
        whileHover={{
          y: -10,
          opacity: 1,
        }}
        animate={{ opacity: 0.5 }}
        initial={{ opacity: 0.5 }}
        transition={smoothSpring}
        {...props}
      >
        {children}
      </m.a>
    </LazyMotion>
  );
}

export default ExternalLinkIcon;
