"use client";
import { AnimatePresence, LazyMotion, m, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useCallback, useEffect } from "react";

import styles from "./ArrowButton.module.css";

import useViewportSize from "@/hooks/useViewportSize";
import { shevronAnimation, smoothSpring } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface ArrowButtonProps {
  direction: string;
  action: () => void;
  isVisible: boolean;
}

function ArrowButton({ direction, action, isVisible }: ArrowButtonProps) {
  const smallScreen = useViewportSize().width < 1100;
  const xDirection = direction === "next" ? 10 : -10;
  const controls = useAnimation();

  const handleClick = useCallback(async () => {
    action();
    await controls.start({
      x: [0, xDirection, 0],
      transition: {
        duration: 0.3,
        times: [0, 0.5, 1],
        ease: "easeInOut",
      },
    });
  }, [action, controls, xDirection]);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (direction === "next" && event.key === "ArrowRight") ||
        (direction === "previous" && event.key === "ArrowLeft")
      ) {
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isVisible, direction, handleClick]);

  return isVisible ? (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence>
        <m.button
          aria-label={`${direction} project`}
          className={styles.switchProjectButton}
          onClick={handleClick}
          onTouchEnd={handleClick}
          whileHover={
            smallScreen
              ? {}
              : {
                  background: "var(--color-background-secondary)",
                  opacity: 0.8,
                }
          }
          animate={{
            opacity: 1,
            background: "rgb(0, 0, 0, 0)",
          }}
          initial={{ opacity: 0, background: "rgb(0, 0, 0, 0)" }}
        >
          <m.div
            className={styles.iconWrapper}
            animate={controls}
            initial={{ x: 0 }}
            whileHover={
              smallScreen
                ? {}
                : {
                    x: [0, xDirection, 0],
                    transition: shevronAnimation,
                  }
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
      </AnimatePresence>
    </LazyMotion>
  ) : (
    <div className={styles.switchProjectButton}></div>
  );
}

export default ArrowButton;
