import styles from "./Spinner.module.css";

interface SpinnerProps {
  timeout: number;
}

function Spinner({ timeout }: SpinnerProps) {
  return <span className={styles.loader} style={{ "--timeout": `${timeout}ms` } as React.CSSProperties}></span>;
}

export default Spinner;
