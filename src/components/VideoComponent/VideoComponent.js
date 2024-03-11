import React, { useRef, useEffect } from "react";

function VideoComponent({ src, srcVP9, width, height, handleLoadedData, playing }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      playsInline
      autoPlay
      loop
      muted
      preload='auto'
      onCanPlay={handleLoadedData}
    >
      {srcVP9 && <source src={srcVP9} type='video/webm' />}
      <source src={src} type='video/mp4' />
    </video>
  );
}

export default VideoComponent;
