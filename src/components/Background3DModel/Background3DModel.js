"use client";
import React, { useEffect, useRef, useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { LineBasicMaterial, MeshBasicMaterial, TorusGeometry } from "three";
import { DepthOfField, EffectComposer, Glitch, Pixelation } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

import styles from "./Background3DModel.module.css";

import { createSquareWithHole, createXShape } from "@/helpers";

const material = new MeshBasicMaterial({ color: "rgb(235, 235, 235)" });
const edgesMaterial = new LineBasicMaterial({ color: "rgb(0, 0, 0)", transparent: true, opacity: 0.3 });

const squareGeometry = createSquareWithHole();
const xGeometry = createXShape(material);

const shapes = {
  x: xGeometry.children.map((child, index) => (
    <group key={index} scale={[1.7, 1.7, 1.7]} rotation={[0, 0, Math.PI / 4]}>
      <mesh>
        <primitive attach='geometry' object={child.geometry} />
        <primitive attach='material' object={material} />
      </mesh>
      {/* <lineSegments>
        <edgesGeometry attach='geometry' args={[child.geometry]} />
        <primitive attach='material' object={edgesMaterial} />
      </lineSegments> */}
    </group>
  )),
  square: (
    <>
      <primitive attach='geometry' object={squareGeometry} />
      {/* <lineSegments>
        <edgesGeometry attach='geometry' args={[squareGeometry]} />
        <primitive attach='material' object={edgesMaterial} />
      </lineSegments> */}
    </>
  ),
  torus: (
    <>
      <torusGeometry attach='geometry' args={[3, 0.5, 7, 15]} />
      {/* <lineSegments>
        <edgesGeometry attach='geometry' args={[new TorusGeometry(3, 0.5, 3, 20)]} />
        <primitive attach='material' object={edgesMaterial} />
      </lineSegments> */}
    </>
  ),
};

const Effects = ({ children }) => {
  return (
    <EffectComposer>
      {/* <Pixelation granularity={12} /> */}
      {/* <DepthOfField focusDistance={2} focalLength={0} bokehScale={10} height={200} /> */}
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
    <LazyMotion features={domAnimation}>
      <m.div
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: isModelReady ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Canvas linear flat camera={{ position: [0, 0, 7] }} gl={{ alpha: true }}>
          <Effects>
            <Model shape={shape} setIsModelReady={setIsModelReady} />
          </Effects>
        </Canvas>
      </m.div>
    </LazyMotion>
  );
}

export default Background3DModel;