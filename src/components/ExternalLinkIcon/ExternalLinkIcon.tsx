import { ReactNode } from "react";
import { m, LazyMotion } from "framer-motion";

import styles from "./ExternalLinkIcon.module.css";

import { smoothSpring } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface ExternalLinkIconProps {
  link: string;
  children: ReactNode;
}

function ExternalLinkIcon({ link, children, ...props }: ExternalLinkIconProps) {
  return (
    <LazyMotion features={loadFeatures}>
      <a className={styles.link} target='_blank' rel='noopener noreferrer' href={link} {...props}>
        <m.div
          whileHover={{
            y: -10,
            opacity: 1,
          }}
          animate={{ opacity: 0.5 }}
          initial={{ opacity: 0.5 }}
          transition={smoothSpring}
        >
          {children}
        </m.div>
      </a>
    </LazyMotion>
  );
}

export default ExternalLinkIcon;
