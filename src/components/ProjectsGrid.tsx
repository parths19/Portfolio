"use client";

import { useRef, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as Drei from "@react-three/drei";
import { 
  Github, 
  ExternalLink, 
  Brain, 
  Keyboard, 
  Heart,
  LucideIcon
} from "lucide-react";
import * as THREE from "three";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  icon: LucideIcon;
}

const PROJECTS: Project[] = [
  {
    title: "AI Document Assistant",
    description: "A full-stack system using FastAPI and React for intelligent document analysis and contextual Q/A via LangChain.",
    tags: ["Python", "FastAPI", "React", "NLP"],
    github: "https://github.com/parths19/AI_BOT.git",
    demo: "#",
    icon: Brain,
  },
  {
    title: "Typing Speed Tester",
    description: "A web application to measure typing speed and accuracy in real-time with WPM calculation.",
    tags: ["React.js", "JavaScript", "CSS"],
    github: "https://github.com/parths19/speed_tester.git",
    demo: "#",
    icon: Keyboard,
  },
  {
    title: "Mental Wellness ChatBot",
    description: "A rule-based chatbot built with Python and NLTK to simulate supportive conversations using tokenization.",
    tags: ["Python", "NLTK", "NLP"],
    github: "https://github.com/parths19/Mental_Wellness_ChatBot.git",
    demo: "#",
    icon: Heart,
  },
];

function WireframeBackground() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = -Math.PI / 2 + Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
      gridRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={gridRef} position={[0, -2, 0]}>
      <Drei.Grid
        infiniteGrid
        fadeDistance={20}
        fadeStrength={5}
        sectionSize={1.5}
        sectionColor="#00f3ff"
        sectionThickness={1}
        cellSize={0.5}
        cellColor="#333333"
        cellThickness={0.5}
      />
    </group>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = project.icon;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group w-full h-[420px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-colors duration-500 hover:border-neon-cyan/50 p-8 flex flex-col justify-between overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-magenta to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-neon-cyan to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-neon-magenta to-transparent" />
      </div>

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-neon-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6 font-medium">
          {project.description}
        </p>
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="flex gap-4 relative z-10">
        <a 
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
        >
          <Github className="w-4 h-4" />
          Github
        </a>
        <a 
          href={project.demo}
          className="flex-1 py-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 hover:bg-neon-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
        >
          <ExternalLink className="w-4 h-4" />
          Live Demo
        </a>
      </div>

      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neon-cyan/10 rounded-full blur-[80px] group-hover:bg-neon-cyan/20 transition-all duration-500" />
    </motion.div>
  );
}

export function ProjectsGrid() {
  return (
    <section id="projects" className="snap-section relative w-full h-screen overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
            <pointLight position={[-10, 5, -5]} intensity={1} color="#ff00ff" />
            <WireframeBackground />
            <Drei.Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <div className="container relative z-10 h-full mx-auto px-6 py-20 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-neon-cyan text-sm tracking-[0.4em] uppercase font-bold mb-4 block">
            SELECTED WORKS
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
