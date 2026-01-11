"use client";

import { useRef, useMemo, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const STAR_POSITIONS = (() => {
  const p = new Float32Array(3000 * 3);
  for (let i = 0; i < 3000; i++) {
    p[i * 3] = (Math.random() - 0.5) * 50;
    p[i * 3 + 1] = (Math.random() - 0.5) * 50;
    p[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }
  return p;
})();

function Starfield() {

  const points = useMemo(() => STAR_POSITIONS, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.position.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 2;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

const educationData = [
  {
    year: "2026",
    title: "Bachelor of Technology CSE",
    institution: "NIET",
    detail: "CGPA: 8.0",
    side: "left",
  },
  {
    year: "2022",
    title: "CBSE Class 12th",
    institution: "JP International School",
    detail: "86%",
    side: "right",
  },
  {
    year: "2020",
    title: "CBSE Class 10th",
    institution: "JP International School",
    detail: "87%",
    side: "left",
  },
];

export function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Apply spring to the progress first (0 to 1), then transform to percentage
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(springProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="education"
      ref={containerRef}
      className="snap-section relative min-h-screen py-32 bg-[#020202] overflow-hidden"
    >
      {/* Background Starfield */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Suspense fallback={null}>
            <Starfield />
          </Suspense>
        </Canvas>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-neon-cyan text-sm tracking-[0.6em] uppercase font-black mb-4 block">
            Academic Path
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase text-white">
            EDUCATION<span className="text-neon-cyan">.</span>JOURNEY
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Pulse Line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-neon-cyan via-neon-cyan to-transparent shadow-[0_0_15px_rgba(0,243,255,0.5)]"
            />
          </div>

          <div className="space-y-32">
            {educationData.map((item, index) => (
              <div key={index} className="relative flex items-center justify-center">
                {/* Sphere Node */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    whileHover={{ scale: 1.5 }}
                    className="w-4 h-4 rounded-full bg-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.8)] border-2 border-white"
                  />
                  {/* Sphere Glow */}
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-neon-cyan animate-ping opacity-50" />
                </div>

                {/* Milestone Card */}
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    x: item.side === "left" ? -100 : 100 
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className={`w-full md:w-[40%] ${
                    item.side === "left" ? "md:mr-auto text-right pr-12" : "md:ml-auto text-left pl-12"
                  }`}
                >
                  <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-[20px] border border-white/10 hover:border-neon-cyan/50 transition-all duration-500 group overflow-hidden">
                    {/* Year Badge */}
                    <div className={`text-3xl font-black mb-2 font-mono tracking-tighter ${
                      item.side === "left" ? "text-neon-cyan" : "text-white"
                    }`}>
                      {item.year}
                    </div>
                    
                    <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-mono text-sm mb-4">
                      {item.institution}
                    </p>
                    
                    <div className="inline-block px-4 py-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
                      <span className="text-lg font-black text-neon-cyan font-mono tracking-widest">
                        {item.detail}
                      </span>
                    </div>

                    {/* Subtle Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
