import styles from "./GradientBorders.module.css";

function GradientBorders({ topBorder, rightBorder, bottomBorder, leftBorder, children }) {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.borderTop} style={{ height: topBorder ? topBorder : "" }} />
      <div className={styles.borderRight} style={{ width: rightBorder ? rightBorder : "" }} />
      <div className={styles.borderBottom} style={{ height: bottomBorder ? bottomBorder : "" }} />
      <div className={styles.borderLeft} style={{ width: leftBorder ? leftBorder : "" }} />
      {children}
    </div>
  );
}

export default GradientBorders;
