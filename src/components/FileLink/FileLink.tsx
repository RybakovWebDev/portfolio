"use client";
import { ReactNode } from "react";
import { m, LazyMotion, useAnimation } from "framer-motion";
import Image from "next/image";

import styles from "./FileLink.module.css";

import { smoothSpring } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface FileLinkProps {
  src: string;
  link: string;
  alt: string;
  children: ReactNode;
}

function FileLink({ src, link, alt, children, ...props }: FileLinkProps) {
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start({
      y: -10,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      y: 0,
      opacity: 0.8,
    });
  };

  return (
    <a
      className={styles.link}
      target='_blank'
      rel='noopener noreferrer'
      href={link}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <LazyMotion features={loadFeatures}>
        <m.div animate={controls} initial={{ opacity: 0.8, y: 0 }} transition={smoothSpring}>
          <Image className={styles.image} src={src} alt={alt} fill sizes='100px' />
        </m.div>
      </LazyMotion>
      <p>{children}</p>
    </a>
  );
}

export default FileLink;
