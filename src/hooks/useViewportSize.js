"use client";
import { useState, useEffect } from "react";

function useViewportSize() {
  const [viewportSize, setViewportSize] = useState({ width: undefined, height: undefined });

  useEffect(() => {
    setViewportSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewportSize;
}

export default useViewportSize;
