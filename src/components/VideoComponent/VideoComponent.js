function VideoComponent({ src, srcVP9, width, height, handleLoadedData }) {
  return (
    <video width={width} height={height} playsInline autoPlay loop muted preload='auto' onPlay={handleLoadedData}>
      {srcVP9 && <source src={srcVP9} type='video/webm' />}
      <source src={src} type='video/mp4' />
    </video>
  );
}

export default VideoComponent;
