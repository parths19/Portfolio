"use client";

import { useRef, useMemo, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Center, Text, Environment, Cylinder } from "@react-three/drei";
import * as THREE from "three";
import { 
  Code2, 
  Globe, 
  Database as DbIcon, 
  Cpu,
  Terminal,
} from "lucide-react";

const PARTICLE_POSITIONS = (() => {
  const p = new Float32Array(2000 * 3);
  for (let i = 0; i < 2000; i++) {
    p[i * 3] = (Math.random() - 0.5) * 50;
    p[i * 3 + 1] = (Math.random() - 0.5) * 50;
    p[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }
  return p;
})();

// --- 3D Particle Field ---
function ParticleField() {
  const points = useMemo(() => PARTICLE_POSITIONS, []);

  const pointsRef = useRef<THREE.Points>(null);
  const { scrollYProgress } = useScroll();
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const springRotationY = useSpring(rotationY, { stiffness: 50, damping: 20 });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = springRotationY.get() + state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00f3ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- 3D Java Icon ---
function JavaIcon3D() {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
      <Center ref={meshRef}>
        <Text
          fontSize={0.8}
          color="#00f3ff"
          anchorX="center"
          anchorY="middle"
        >
          JAVA
        </Text>
        <mesh position={[0, 0.6, 0]}>
          <torusKnotGeometry args={[0.3, 0.08, 128, 16]} />
          <meshStandardMaterial 
            color="#00f3ff" 
            emissive="#00f3ff" 
            emissiveIntensity={2} 
            toneMapped={false}
          />
        </mesh>
      </Center>
    </Float>
  );
}

// --- 3D Database Cylinder ---
function DatabaseIcon3D() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {[0, 0.4, -0.4].map((y, i) => (
          <Cylinder key={i} args={[0.6, 0.6, 0.3, 32]} position={[0, y, 0]}>
            <meshPhysicalMaterial 
              color="#00f3ff" 
              transparent 
              opacity={0.3} 
              transmission={0.8} 
              roughness={0.1}
              thickness={0.5}
              emissive="#00f3ff"
              emissiveIntensity={0.5}
            />
          </Cylinder>
        ))}
      </group>
    </Float>
  );
}

// --- Skill Card Component ---
interface SkillCardProps {
  title: string;
  skills: string[];
  icon?: React.ReactNode;
  threeIcon?: React.ReactNode;
  className?: string;
  isHighImpact?: boolean;
  delay?: number;
}

function SkillCard({ title, skills, icon, threeIcon, className, isHighImpact, delay = 0 }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.05 }}
      className={`relative group rounded-3xl overflow-hidden backdrop-blur-[15px] p-8 flex flex-col transition-all duration-500 
        bg-black/40 border-[1px] ${isHighImpact ? "border-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.2)]" : "border-[#70d1ff]/30"}
        hover:border-neon-cyan/80 hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] ${className}`}
    >
      {/* Inner Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-neon-cyan group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        </div>

        <h3 className="text-2xl font-display font-black mb-6 text-white tracking-tight group-hover:text-neon-cyan transition-colors">
          {title}
        </h3>

        <div className="flex flex-wrap gap-3 mt-auto mb-4">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              animate={title === "Web Technologies" ? {
                y: [0, -5, 0],
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="text-xs font-mono px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 
                group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/30 group-hover:text-white transition-all duration-300"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {threeIcon && (
          <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity flex items-center justify-center">
            <div className="w-full h-full max-h-[200px]">
              <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" />
                  {threeIcon}
                </Suspense>
              </Canvas>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function SkillsShowcase() {
  return (
    <section id="skills" className="snap-section relative w-full min-h-screen overflow-hidden bg-[#020202] py-24">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Suspense fallback={null}>
            <ParticleField />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-neon-cyan text-sm tracking-[0.6em] uppercase font-black mb-4 block">
            Technical Arsenal
          </span>
          <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none text-white">
            SKILLS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[300px]">
          {/* Card 1: Programming Languages */}
          <SkillCard
            title="Programming Languages"
            skills={["Java", "Python", "JavaScript"]}
            icon={<Code2 className="w-6 h-6" />}
            threeIcon={<JavaIcon3D />}
            className="md:col-span-3 md:row-span-1"
            delay={0}
          />

          {/* Card 2: Web Technologies */}
          <SkillCard
            title="Web Technologies"
            skills={["HTML5", "CSS3", "React.js", "Express.js", "TailwindCSS"]}
            icon={<Globe className="w-6 h-6" />}
            className="md:col-span-3 md:row-span-1"
            delay={0.1}
          />

          {/* Card 3: Databases */}
          <SkillCard
            title="Databases"
            skills={["MySQL", "MongoDB"]}
            icon={<DbIcon className="w-6 h-6" />}
            threeIcon={<DatabaseIcon3D />}
            className="md:col-span-2 md:row-span-1"
            delay={0.2}
          />

          {/* Card 4: Tools & Platforms */}
          <SkillCard
            title="Tools & Platforms"
            skills={["Git", "Github", "VS Code"]}
            icon={<Terminal className="w-6 h-6" />}
            className="md:col-span-2 md:row-span-1"
            delay={0.3}
          />

          {/* Card 5: Core Concepts (High Impact) */}
          <SkillCard
            title="Core Concepts"
            skills={["OOP", "DSA", "REST APIs"]}
            icon={<Cpu className="w-6 h-6" />}
            isHighImpact
            className="md:col-span-2 md:row-span-1"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
