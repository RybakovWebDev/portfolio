"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { m, LazyMotion, useInView, AnimatePresence } from "framer-motion";
import { Pause } from "react-feather";

import styles from "./EmbedVideo.module.css";

import Spinner from "@/components/Spinner";
import VideoComponent from "@/components/VideoComponent";

import useViewportSize from "@/hooks/useViewportSize";
import { smoothSpring } from "@/constants";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface EmbedVideoProps {
  src?: string;
  srcVP9?: string;
  width?: number;
  height: number;
  showSpinner?: boolean;
}

function EmbedVideo({ src, srcVP9, width, height, showSpinner }: EmbedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [playing, setPlaying] = useState(true);

  const smallScreen = useViewportSize().width < 1100;

  const videoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoRef, { once: true });

  const handleLoadedData = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  const handleClick = () => {
    setPlaying(!playing);
  };

  return (
    <div ref={videoRef} className={styles.videoWrapper} style={{ height: height }}>
      {!isLoaded && showSpinner && (
        <div className={styles.spinnerWrapper}>
          <Spinner timeout={1500} />
        </div>
      )}
      {isInView && (
        <LazyMotion features={loadFeatures}>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView && isLoaded ? [0, 1] : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.3, ...smoothSpring }}
          >
            <m.div
              className={styles.controlIconWrapper}
              initial={{ opacity: 0 }}
              animate={playing ? { opacity: 0 } : { opacity: 0.5 }}
              whileHover={!smallScreen && { opacity: 0.5 }}
              onClick={handleClick}
            >
              <AnimatePresence mode='popLayout'>
                {playing ? (
                  !smallScreen && (
                    <m.div
                      key='pauseIcon'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Pause size={52} strokeWidth={1} color='white' />
                    </m.div>
                  )
                ) : (
                  <m.div
                    key='playIcon'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Image src={`/images/icons/play.svg`} alt='Start playback' width={52} height={52} />
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
            <VideoComponent
              src={src}
              srcVP9={srcVP9}
              width={width}
              height={height}
              handleLoadedData={handleLoadedData}
              playing={playing}
            />
          </m.div>
        </LazyMotion>
      )}
    </div>
  );
}

export default EmbedVideo;
