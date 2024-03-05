"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MeshBasicMaterial, TextureLoader } from "three";
import { m, LazyMotion, domAnimation } from "framer-motion";

import styles from "./AwsIconAnimation.module.css";

import { AWSICONS } from "@/constants";

function Cube({ onLoad }) {
  const [isRotating, setIsRotating] = useState(false);

  const meshRef = useRef();
  const rotationRef = useRef({ x: 0, y: 0 });

  const timerIdRef = useRef(null);
  const targetScaleRef = useRef(1);

  const textures = useLoader(
    TextureLoader,
    AWSICONS.map((el) => el.icon.src),
    onLoad
  );
  const materials = textures.map((texture) => new MeshBasicMaterial({ map: texture }));

  useFrame((state, delta) => {
    if (!isRotating) {
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.x += 0.3 * delta;
    }
    if (meshRef.current) {
      meshRef.current.scale.lerp(
        { x: targetScaleRef.current, y: targetScaleRef.current, z: targetScaleRef.current },
        0.1
      );
    }
  });

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        rotateSpeed={0.2}
        onStart={() => {
          timerIdRef.current = setTimeout(() => {
            setIsRotating(true);
            targetScaleRef.current = 1.2;
          }, 100);
        }}
        onEnd={() => {
          if (timerIdRef.current) {
            clearTimeout(timerIdRef.current);
          }
          setIsRotating(false);
          targetScaleRef.current = 1;
        }}
      />
      <ambientLight />
      <mesh
        ref={meshRef}
        onPointerDown={(e) => (rotationRef.current = { x: meshRef.current.rotation.x, y: meshRef.current.rotation.y })}
        material={materials}
      >
        <boxGeometry args={[4, 4, 4]} />
      </mesh>
    </>
  );
}

function AwsIconAnimation() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <Canvas linear flat camera={{ position: [0, 0, 7] }} gl={{ alpha: true }}>
          <Cube onLoad={handleLoad} />
        </Canvas>
      </m.div>
    </LazyMotion>
  );
}

export default AwsIconAnimation;
