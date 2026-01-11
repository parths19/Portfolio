"use client";

// R3F v2
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function MetallicSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#ffffff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
          />
        </Sphere>
        <Sphere args={[1.52, 32, 32]}>
          <meshPhongMaterial
            color="#00f3ff"
            wireframe
            transparent
            opacity={0.1}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

export function ThreeHero() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={2} />
          <pointLight position={[10, 10, 10]} color="#00f3ff" intensity={2} />
          <MetallicSphere />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
