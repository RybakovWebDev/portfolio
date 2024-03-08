"use client";
import { LazyMotion, m } from "framer-motion";

import { smoothSpring } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

function SectionNameLine({ fromRight }) {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        animate={{
          width: "100%",
          backgroundColor: "var(--color-text)",
          opacity: 0.3,
          x: 0,
        }}
        initial={{ height: "5px", x: fromRight ? 300 : -300 }}
        transition={smoothSpring}
      />
    </LazyMotion>
  );
}

export default SectionNameLine;
