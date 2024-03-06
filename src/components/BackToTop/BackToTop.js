"use client";
import { AnimatePresence, LazyMotion, domAnimation, m, useInView } from "framer-motion";

import { ChevronUp } from "react-feather";

import styles from "./BackToTop.module.css";

import { useRefsContext } from "@/contexts/RefsContext";
import { shevronAnimation, smoothSpring } from "@/constants";

function BackToTop() {
  const { headerRef } = useRefsContext();
  const handleLinkClick = (e) => {
    e.preventDefault();
    headerRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const showButton = !useInView(headerRef);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {showButton && (
          <m.button
            aria-label='Back to top of the page'
            className={styles.backBtn}
            onClick={(e) => handleLinkClick(e)}
            onTap={(e) => handleLinkClick(e)}
            whileTap={{ scale: 0.8 }}
            whileHover={{
              opacity: 1,
              background: "var(--color-background-secondary)",
            }}
            animate={{
              opacity: 0.3,
              background: "var(--color-background-secondary)",
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={smoothSpring}
          >
            <m.div
              whileHover={{
                y: [0, -10, 0],
                transition: shevronAnimation,
              }}
              initial={{ y: 0 }}
              transition={smoothSpring}
            >
              <ChevronUp size={52} strokeWidth={1} />
            </m.div>
          </m.button>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

export default BackToTop;
