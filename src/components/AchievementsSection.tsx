"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Trophy, Code2, CircuitBoard, Terminal } from "lucide-react";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

function Counter({ from, to, duration = 2, suffix = "", className = "" }: CounterProps) {
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from.toString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(count, to, { 
        duration, 
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest).toString());
        }
      });
    }
  }, [isInView, count, to, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  delay?: number;
}

function AchievementCard({ title, description, icon, badge, delay = 0 }: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-[#0a0a0a]/40 border border-white/5 backdrop-blur-[24px] transition-all duration-700 hover:border-neon-cyan/50 hover:shadow-[0_0_60px_rgba(0,243,255,0.1)] overflow-hidden"
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
      
      {/* Icon Container */}
      <div className="relative mb-10 group-hover:scale-110 transition-transform duration-700">
        <div className="relative z-10 p-6 rounded-2xl bg-white/5 border border-white/10 text-neon-cyan group-hover:text-white group-hover:bg-neon-cyan/20 group-hover:border-neon-cyan transition-all duration-500 shadow-[0_0_30px_rgba(0,243,255,0)] group-hover:shadow-[0_0_30px_rgba(0,243,255,0.3)]">
          <motion.div
            animate={{ 
              rotateY: [0, 0, 360, 360],
              rotateZ: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className="relative z-10 perspective-[1000px]"
          >
            {icon}
          </motion.div>
        </div>
        
        {/* Animated Rings */}
        <div className="absolute inset-0 border border-neon-cyan/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-2 border border-neon-cyan/10 rounded-2xl rotate-45 scale-75 group-hover:scale-100 group-hover:rotate-0 transition-all duration-700" />
      </div>

      <h3 className="text-xl font-mono font-black mb-4 text-white uppercase tracking-tighter group-hover:text-neon-cyan transition-colors">
        {title}
      </h3>
      
      <p className="text-white/40 text-sm leading-relaxed max-w-[280px] font-sans">
        {description}
      </p>

      {badge && (
        <div className="mt-8 pt-6 border-t border-white/5 w-full">
          {badge}
        </div>
      )}

      {/* Cyber Accents */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-2 w-1 h-1 bg-neon-cyan rounded-full animate-pulse" />
        <div className="absolute top-2 right-4 w-4 h-px bg-neon-cyan/30" />
      </div>
      
      <div className="absolute bottom-4 left-4 flex gap-1">
        <div className="w-1 h-1 bg-white/10 rounded-full" />
        <div className="w-1 h-1 bg-white/10 rounded-full" />
        <div className="w-4 h-1 bg-neon-cyan/20 rounded-full" />
      </div>
    </motion.div>
  );
}

function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2
      });
    }

    const characters = "01";
    const fontSize = 12;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(0);

    const draw = () => {
      // Clear with slight fade
      ctx.fillStyle = "rgba(5, 5, 5, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // Matrix Effect
      ctx.fillStyle = "rgba(0, 243, 255, 0.05)";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.99) drops[i] = 0;
        drops[i]++;
      }

      // Neural Particles
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 243, 255, 0.03)";
      ctx.lineWidth = 0.5;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fillRect(p.x, p.y, p.size, p.size);

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      });
      ctx.stroke();
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-40 pointer-events-none" />;
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="snap-section relative w-full min-h-screen overflow-hidden bg-[#050505] py-24 flex flex-col justify-center">
      {/* Light Beam Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute left-2/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent shadow-[0_0_15px_rgba(0,243,255,0.2)]" />
        <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <CyberBackground />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <Trophy className="w-3 h-3 text-neon-cyan" />
            <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase font-bold">
              Hall of Excellence
            </span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-mono font-black tracking-tighter uppercase leading-none text-white flex flex-col items-center">
            <span className="text-white/20">ACHIEVEMENTS</span>
            <span className="relative">
              TROPHY<span className="text-neon-cyan">.</span>ROOM
              <div className="absolute -bottom-4 left-0 w-full h-1 bg-neon-cyan/20 blur-sm" />
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Card 1: GFG Hackathon */}
          <AchievementCard
            title="GFG Hackathon"
            description="Participated in the GeeksforGeeks Hackathon in Noida. Engaged in competitive coding and rapid prototyping of software solutions."
            icon={<CircuitBoard className="w-12 h-12" />}
            delay={0}
          />

          {/* Card 2: GFG 160 */}
          <AchievementCard
            title="GfG 160 Challenge"
            description="Completed a rigorous 160-day intensive track focused on advanced Data Structures and Algorithms."
            icon={<Terminal className="w-12 h-12" />}
            badge={
              <div className="flex flex-col items-center gap-1">
                <div className="text-4xl font-mono font-black text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                  <Counter from={0} to={160} suffix="" />
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold">
                  Day Streak Completed
                </span>
              </div>
            }
            delay={0.1}
          />

          {/* Card 3: LeetCode */}
          <AchievementCard
            title="Mastering Logic"
            description="Demonstrated consistent problem-solving skills on LeetCode with over 200 questions resolved across diverse algorithmic categories."
            icon={<Code2 className="w-12 h-12" />}
            badge={
              <div className="flex flex-col items-center gap-1">
                <div className="text-4xl font-mono font-black text-white">
                  <Counter from={0} to={200} suffix="+" />
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-neon-cyan font-bold">
                  Problems Solved
                </span>
              </div>
            }
            delay={0.2}
          />
        </div>

        {/* Bottom Decorative Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-24 flex flex-col items-center opacity-20"
        >
          <div className="flex gap-4 mb-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <p className="mt-4 font-mono text-[8px] tracking-[0.8em] uppercase text-white/40">
            System.Status: Excellence_Verified
          </p>
        </motion.div>
      </div>
    </section>
  );
}
