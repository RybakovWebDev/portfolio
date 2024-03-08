"use client";
import React, { useEffect, useRef, useState } from "react";
import { m, LazyMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshBasicMaterial } from "three";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

import styles from "./Background3DModel.module.css";

import { createXShape } from "@/helpers";

const loadFeatures = () => import("../../features").then((res) => res.default);

const material = new MeshBasicMaterial({ color: "rgb(235, 235, 235)" });
const xGeometry = createXShape(material);

const shapes = {
  x: xGeometry.children.map((child, index) => (
    <group key={index} scale={[1.7, 1.7, 1.7]} rotation={[0, 0, Math.PI / 4]}>
      <mesh>
        <primitive attach='geometry' object={child.geometry} />
        <primitive attach='material' object={material} />
      </mesh>
    </group>
  )),
  triangle: <torusGeometry attach='geometry' args={[3, 0.5, 7, 3]} />,
  torus: <torusGeometry attach='geometry' args={[3, 0.5, 7, 25]} />,
};

const Effects = ({ children }) => {
  return (
    <EffectComposer>
      <Glitch
        delay={[3, 7]}
        duration={[0.1, 0.2]}
        strength={[0.1, 0.5]}
        columns={0.02}
        mode={GlitchMode.SPORADIC}
        active
        ratio={0.8}
      />
      {children}
    </EffectComposer>
  );
};

const Model = ({ shape, setIsModelReady }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(1);

  const meshRef = useRef();

  useEffect(() => {
    setRotationDirection(Math.random() > 0.5 ? 1 : -1);

    let scrollTimeout = null;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      setIsScrolling(true);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const speedMultiplier = isScrolling ? 1.5 : 0.3; // Increase speed when scrolling
    meshRef.current.rotation.y += rotationDirection * delta * speedMultiplier;
    meshRef.current.rotation.x += rotationDirection * 0.3 * delta * speedMultiplier;
  });

  useEffect(() => {
    setIsModelReady(true);
  });

  return (
    <mesh ref={meshRef} material={material}>
      {shapes[shape]}
    </mesh>
  );
};

function Background3DModel({ shape }) {
  const [isModelReady, setIsModelReady] = useState(false);
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: isModelReady ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Canvas
          linear
          flat
          camera={{ position: [0, 0, 7] }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
          }}
        >
          <Effects>
            <Model shape={shape} setIsModelReady={setIsModelReady} />
          </Effects>
        </Canvas>
      </m.div>
    </LazyMotion>
  );
}

export default Background3DModel;
