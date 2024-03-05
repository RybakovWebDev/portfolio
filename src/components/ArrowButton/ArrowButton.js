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
        whileTap={{ scale: 0.8 }}
        whileHover={{
          background: "rgb(0, 0, 0, 0.1)",
        }}
        animate={{
          opacity: 1,
          background: "rgb(0, 0, 0, 0)",
        }}
        initial={{ opacity: 0, background: "rgb(0, 0, 0, 0)" }}
      >
        <m.div
          className={styles.iconWrapper}
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