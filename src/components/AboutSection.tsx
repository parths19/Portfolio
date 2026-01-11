"use client";

import { useRef, useMemo, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const INITIAL_POSITIONS = (() => {
  const count = 1500;
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.5 + Math.random() * 0.8;
    p[i * 3] = Math.cos(angle) * radius;
    p[i * 3 + 1] = (Math.random() - 0.5) * 8;
    p[i * 3 + 2] = Math.sin(angle) * radius;
  }
  return p;
})();

function DataStreamSculpture() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1500;
  const positions = useMemo(() => INITIAL_POSITIONS, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        // Vertical movement
        positions[i * 3 + 1] += 0.015;
        // Spiral effect
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        const angle = 0.005;
        positions[i * 3] = x * Math.cos(angle) - z * Math.sin(angle);
        positions[i * 3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);

        if (positions[i * 3 + 1] > 4) positions[i * 3 + 1] = -4;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#00f3ff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
      {/* Central Core */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 8, 32]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.1} wireframe />
      </mesh>
    </group>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sculptureY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] py-20"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: 3D Sculpture */}
        <motion.div style={{ y: sculptureY }} className="relative h-[600px] w-full">
          <div className="absolute inset-0 bg-radial-gradient from-neon-cyan/10 to-transparent blur-3xl" />
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} color="#00f3ff" intensity={1} />
              <DataStreamSculpture />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div style={{ y: textY }} className="flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white">
              Engineering with <span className="text-neon-cyan">Intent.</span>
            </h2>
            <div className="relative">
              <p className="text-xl text-muted-foreground font-mono leading-relaxed max-w-xl">
                Currently a Computer Science student at NIET with a CGPA of 8.0.
                My path into engineering started with a childhood fascination for how devices work,
                which evolved into a career building robust, data-driven applications.
              </p>
              {/* Masking effect */}
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Experience", value: "Front-End Intern @ MNC Solutions" },
              { label: "Achievement", value: "4th Place GFG Hackathon Winner" },
              { label: "Dedication", value: "160 Days of DSA Problem Solving" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md hover:border-neon-cyan/50 transition-colors group"
              >
                <p className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest mb-2">
                  {stat.label}
                </p>
                <p className="text-sm font-mono text-white/80 group-hover:text-white transition-colors">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Download Resume Button */}
          <div className="mt-4">
            <a href="/Resume.pdf"
            download="Resume.pdf"
            className="inline-block">
              <button className="relative group px-8 py-4 bg-white text-black font-bold font-mono overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 uppercase tracking-tighter">Download Resume</span>
                {/* Metallic Shimmer */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
