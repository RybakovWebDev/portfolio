import styles from "./Spinner.module.css";

function Spinner({ timeout }) {
  return <span className={styles.loader} style={{ "--timeout": `${timeout}ms` }}></span>;
}

export default Spinner;
