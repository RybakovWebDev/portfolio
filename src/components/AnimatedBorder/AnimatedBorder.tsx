import React, { ReactNode } from "react";

import styles from "./AnimatedBorder.module.css";

interface AnimatedBorderProps {
  children: ReactNode;
}

const AnimatedBorder = ({ children }: AnimatedBorderProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.mediaObject}>{children}</div>
    </article>
  );
};

export default AnimatedBorder;
