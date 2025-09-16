"use client";
import { useEffect, useRef, useState } from "react";
import { m, LazyMotion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, MeshBasicMaterial, Vector2 } from "three";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

import styles from "./Background3DModel.module.css";

import { createXShape } from "@/helpers";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface EffectsProps {
  children: React.ReactElement<typeof Model>;
}

interface ModelProps {
  shape: string;
  setIsModelReady: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Background3DModelProps {
  shape: string;
}

const material = new MeshBasicMaterial({ color: "rgb(235, 235, 235)" });
const xGeometry = createXShape(material);

const shapes = {
  x: xGeometry.children.map((child, index) => (
    <group key={index} scale={[1.7, 1.7, 1.7]} rotation={[0, 0, Math.PI / 4]}>
      <mesh>
        <primitive attach='geometry' object={(child as Mesh).geometry} />
        <primitive attach='material' object={material} />
      </mesh>
    </group>
  )),
  triangle: <torusGeometry attach='geometry' args={[3, 0.5, 7, 3]} />,
  torus: <torusGeometry attach='geometry' args={[3, 0.5, 7, 25]} />,
};

function Effects({ children }: EffectsProps) {
  return (
    <EffectComposer>
      <Glitch
        delay={new Vector2(3, 7)}
        duration={new Vector2(0.1, 0.2)}
        strength={new Vector2(0.1, 0.5)}
        columns={0.02}
        mode={GlitchMode.SPORADIC}
        active
        ratio={0.8}
      />
      {children}
    </EffectComposer>
  );
}

function Model({ shape, setIsModelReady }: ModelProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(1);
  const [animationProgress, setAnimationProgress] = useState(0);

  const meshRef = useRef<Mesh | null>(null);

  const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

  useEffect(() => {
    setRotationDirection(Math.random() > 0.5 ? 1 : -1);

    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      setIsScrolling(true);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    setIsModelReady(true);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const speedMultiplier = isScrolling ? 1.5 : 0.3;
      meshRef.current.rotation.y += rotationDirection * delta * speedMultiplier;
      meshRef.current.rotation.x += rotationDirection * 0.3 * delta * speedMultiplier;

      if (animationProgress < 1) {
        const newProgress = Math.min(animationProgress + delta * 0.7, 1);
        setAnimationProgress(newProgress);

        const easedProgress = easeOutQuart(newProgress);
        const scale = 0.7 + 0.3 * easedProgress;
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      {shapes[shape]}
    </mesh>
  );
}

function Background3DModel({ shape }: Background3DModelProps) {
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
