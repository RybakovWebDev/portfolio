import { LazyMotion, domAnimation, m } from "framer-motion";
import { smoothSpring } from "@/constants";

function SectionNameLine({ fromRight }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate={{
          width: "100%",
          backgroundColor: "rgb(0, 0, 0, 0.3)",
          x: 0,
        }}
        initial={{ height: "5px", x: fromRight ? 300 : -300 }}
        transition={smoothSpring}
      />
    </LazyMotion>
  );
}

export default SectionNameLine;
