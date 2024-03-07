import { LazyMotion, domMax, m } from "framer-motion";

import { ChevronLeft, ChevronRight } from "react-feather";

import styles from "./ArrowButton.module.css";

import { shevronAnimation, smoothSpring } from "@/constants";

function ArrowButton({ direction, action, isVisible }) {
  return isVisible ? (
    <LazyMotion features={domMax}>
      <m.button
        aria-label={`${direction} project`}
        className={styles.switchProjectButton}
        onClick={action}
        onTouchEnd={action}
        whileHover={{
          background: "var(--color-background-secondary)",
          opacity: 0.8,
        }}
        animate={{
          opacity: 1,
          background: "rgb(0, 0, 0, 0)",
        }}
        initial={{ opacity: 0, background: "rgb(0, 0, 0, 0)" }}
      >
        <m.div
          className={styles.iconWrapper}
          whileTap={{ x: direction === "next" ? 15 : -15 }}
          whileHover={{
            x: [0, direction === "next" ? 15 : -15, 0],
            transition: shevronAnimation,
          }}
          initial={{ x: 0 }}
          transition={smoothSpring}
        >
          {direction === "next" ? (
            <ChevronRight size={72} strokeWidth={1} />
          ) : (
            <ChevronLeft size={72} strokeWidth={1} />
          )}
        </m.div>
      </m.button>
    </LazyMotion>
  ) : (
    <div className={styles.switchProjectButton}></div>
  );
}

export default ArrowButton;
