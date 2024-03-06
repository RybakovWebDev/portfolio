"use client";
import React, { useRef, useState } from "react";
import { m, LazyMotion, useInView, domAnimation } from "framer-motion";

import styles from "./EmbedVideo.module.css";

import Spinner from "../Spinner";
import VideoComponent from "../VideoComponent";
import { smoothSpring } from "@/constants";

function EmbedVideo({ src, srcVP9, width, height, showSpinner }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { once: true });

  const handleLoadedData = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  return (
    <div ref={videoRef} className={styles.videoWrapper} style={{ height: height }}>
      {!isLoaded && showSpinner && (
        <div className={styles.spinnerWrapper}>
          <Spinner timeout={1500} />
        </div>
      )}
      {isInView && (
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView && isLoaded ? [0, 1] : 0, y: isInView ? 0 : 20 }}
            transition={({ duration: 0.3 }, smoothSpring)}
          >
            <VideoComponent
              src={src}
              srcVP9={srcVP9}
              width={width}
              height={height}
              handleLoadedData={handleLoadedData}
            />
          </m.div>
        </LazyMotion>
      )}
    </div>
  );
}

export default EmbedVideo;
