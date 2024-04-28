"use client";
import { LazyMotion, m } from "framer-motion";

import { ChevronLeft, ChevronRight } from "react-feather";

import styles from "./ArrowButton.module.css";

import useViewportSize from "@/hooks/useViewportSize";
import { shevronAnimation, smoothSpring } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface ArrowButtonProps {
  direction: string;
  action: () => void;
  isNearEdge: boolean;
  isVisible: boolean;
}

function ArrowButton({ direction, action, isNearEdge, isVisible }: ArrowButtonProps) {
  const smallScreen = useViewportSize().width < 1100;
  const xDirection = direction === "next" ? 10 : -10;

  return isVisible ? (
    <LazyMotion features={loadFeatures}>
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
          whileTap={{ scale: 0.8 }}
          whileHover={{
            x: [0, xDirection, 0],
            transition: shevronAnimation,
          }}
          initial={{ x: 0 }}
          animate={
            smallScreen && isNearEdge
              ? {
                  x: [0, xDirection, 0],
                  transition: { repeat: Infinity, delay: 3, repeatDelay: 3, duration: 1 },
                }
              : {}
          }
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
