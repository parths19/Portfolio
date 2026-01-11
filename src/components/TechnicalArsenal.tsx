"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Float, Text, Environment, Center } from "@react-three/drei";
import { 
  Code2, 
  Globe, 
  Terminal,
  Cpu,
} from "lucide-react";
import * as THREE from "three";

function WireframeBackground() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = -Math.PI / 2 + Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
      gridRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={gridRef} position={[0, -2, 0]}>
      <Grid
        infiniteGrid
        fadeDistance={30}
        fadeStrength={5}
        sectionSize={2}
        sectionColor="#00f3ff"
        sectionThickness={0.5}
        cellSize={1}
        cellColor="#1a1a1a"
        cellThickness={0.2}
      />
    </group>
  );
}

function SpinningJavaLogo() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime();
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Center ref={meshRef}>
        <Text
          fontSize={1.2}
          color="#00f3ff"
          maxWidth={2}
          textAlign="center"
        >
          JAVA
        </Text>
        {/* Simple 3D representation of a cup or steam */}
        <mesh position={[0.7, 0.5, 0]}>
          <torusGeometry args={[0.2, 0.05, 16, 32]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} />
        </mesh>
      </Center>
    </Float>
  );
}

interface ArsenalCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  className?: string;
  delay?: number;
  badge?: string;
  specialElement?: React.ReactNode;
}

function ArsenalCard({ title, items, icon, className, delay = 0, badge, specialElement }: ArsenalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`relative group rounded-2xl bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-xl p-8 flex flex-col transition-all duration-500 hover:border-neon-cyan/50 overflow-hidden ${className}`}
    >
      {/* Pulsing Border Effect */}
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute inset-0 border border-neon-cyan/20 rounded-2xl pointer-events-none"
      />

      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        {badge && (
          <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:text-neon-cyan transition-colors">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2 mt-auto">
        {items.map((item) => (
          <span 
            key={item} 
            className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 group-hover:bg-neon-cyan/5 group-hover:border-neon-cyan/20 transition-all duration-300"
          >
            {item}
          </span>
        ))}
      </div>

      {specialElement && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
          {specialElement}
        </div>
      )}

      {/* Tech Stack Glow on Hover */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-cyan/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export function TechnicalArsenal() {
  return (
    <section id="arsenal" className="snap-section relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
          <WireframeBackground />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="container relative z-10 h-full mx-auto px-6 py-20 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-neon-cyan text-sm tracking-[0.4em] uppercase font-bold mb-4 block">
            TECHNICAL ARSENAL
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none">
            Tech Stack & Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[60%]">
          {/* Card 1: Core Languages */}
          <ArsenalCard
            title="Core Languages"
            items={["Java", "Python", "JavaScript"]}
            icon={<Code2 className="w-6 h-6" />}
            className="md:col-span-2 md:row-span-1"
            specialElement={
              <div className="w-40 h-40">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={1} />
                  <pointLight position={[10, 10, 10]} />
                  <SpinningJavaLogo />
                </Canvas>
              </div>
            }
          />

          {/* Card 2: Web Development */}
          <ArsenalCard
            title="Web Development"
            items={["HTML5", "CSS3", "React.js", "Tailwind CSS"]}
            icon={<Globe className="w-6 h-6" />}
            className="md:col-span-2"
            delay={0.1}
          />

          {/* Card 3: Data & Logic */}
          <ArsenalCard
            title="Data & Logic"
            items={["DSA", "OOP", "REST APIs"]}
            icon={<Cpu className="w-6 h-6" />}
            badge="GFG 160-DAY STREAK"
            className="md:col-span-2"
            delay={0.2}
          />

          {/* Card 4: Tools & Platforms */}
          <ArsenalCard
            title="Tools & Platforms"
            items={["Git", "Linux", "VS Code", "MySQL", "MongoDB"]}
            icon={<Terminal className="w-6 h-6" />}
            className="md:col-span-2"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
