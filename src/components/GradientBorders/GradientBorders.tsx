import { ReactNode } from "react";

import styles from "./GradientBorders.module.css";

interface GradientBordersProps {
  topBorder?: string;
  rightBorder?: string;
  bottomBorder?: string;
  leftBorder?: string;
  children: ReactNode;
}

function GradientBorders({ topBorder, rightBorder, bottomBorder, leftBorder, children }: GradientBordersProps) {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.borderTop} style={{ height: topBorder }} />
      <div className={styles.borderRight} style={{ width: rightBorder }} />
      <div className={styles.borderBottom} style={{ height: bottomBorder }} />
      <div className={styles.borderLeft} style={{ width: leftBorder }} />
      {children}
    </div>
  );
}

export default GradientBorders;
