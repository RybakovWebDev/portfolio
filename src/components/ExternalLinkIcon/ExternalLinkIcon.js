import { m, LazyMotion, domAnimation } from "framer-motion";

import styles from "./ExternalLinkIcon.module.css";

import { smoothSpring } from "@/constants";

function ExternalLinkIcon({ link, children, ...props }) {
  return (
    <LazyMotion features={domAnimation}>
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
