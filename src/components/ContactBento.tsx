"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Code2,
  ArrowUp
} from "lucide-react";
import createGlobe from "cobe";
import { toast } from "sonner";

// --- Wireframe Globe Component ---
function WireframeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200 * 2,
      height: 1200 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.05],
      markerColor: [0, 0.95, 1],
      glowColor: [0, 0.95, 1],
      markers: [
        { location: [28.6139, 77.2090], size: 0.05 }, // Noida/Delhi area
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.001; // Slower rotation
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 1200, height: 1200, maxWidth: "100%", aspectRatio: 1 }}
      className="opacity-20 mix-blend-screen"
    />
  );
}

// --- Magnetic Component ---
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.5);
    y.set((clientY - centerY) * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

export function ContactBento() {
  const [copied, setCopied] = useState(false);
  const email = "parthshrivastavaop1904@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    const container = document.querySelector(".snap-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const socials = [
    {
      icon: <Linkedin className="w-6 h-6 md:w-8 md:h-8" />,
      href: "https://linkedin.com/in/parthshrivastava19",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: <Github className="w-6 h-6 md:w-8 md:h-8" />,
      href: "https://github.com/parths19",
      label: "GitHub",
      color: "hover:text-white"
    },
    {
      icon: <Twitter className="w-6 h-6 md:w-8 md:h-8" />,
      href: "https://x.com/19sParth",
      label: "Twitter (X)",
      color: "hover:text-white"
    },
    {
      icon: <Code2 className="w-6 h-6 md:w-8 md:h-8" />,
      href: "https://leetcode.com/u/parths19/",
      label: "LeetCode",
      color: "hover:text-orange-400"
    },
  ];

  return (
    <section id="contact" className="snap-section relative w-full min-h-screen bg-[#020202] flex flex-col items-center justify-center overflow-hidden py-24">
      {/* 3D Wireframe Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative scale-110 md:scale-150">
          <WireframeGlobe />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
        {/* Centered Glassmorphism Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl w-full p-12 md:p-24 rounded-[48px] bg-white/[0.02] border border-white/10 backdrop-blur-[60px] shadow-[0_0_80px_rgba(0,0,0,0.8)] text-center group overflow-hidden"
        >
          {/* Neon Accent Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-neon-cyan/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-neon-cyan/10 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="text-5xl md:text-8xl font-mono font-black tracking-tighter text-white mb-16 leading-tight uppercase">
            Let’s Build<br />
            <span className="text-neon-cyan drop-shadow-[0_0_30px_rgba(0,243,255,0.5)]">the Future.</span>
          </h2>

          {/* Email Copy Button */}
          <div className="relative inline-block mb-20">
            <motion.button
              onClick={copyEmail}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-1 pl-6 rounded-full bg-white/5 border border-white/10 hover:border-neon-cyan/50 hover:bg-white/10 transition-all duration-500 group/btn"
            >
              <span className="text-white/60 font-mono text-sm md:text-xl tracking-tight">
                {email}
              </span>
              <div className="p-4 rounded-full bg-neon-cyan text-black group-hover/btn:bg-white transition-colors">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 45 }}
                    >
                      <Check className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>

          {/* Social Icon Grid */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {socials.map((social, i) => (
              <Magnetic key={i}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-4 group/social transition-colors ${social.color}`}
                >
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-white/40 group-hover/social:border-neon-cyan group-hover/social:bg-neon-cyan/5 transition-all duration-500 shadow-[0_0_0px_rgba(0,243,255,0)] group-hover/social:shadow-[0_0_40px_rgba(0,243,255,0.25)]">
                    {social.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/20 group-hover/social:text-white transition-colors">
                    {social.label}
                  </span>
                </motion.a>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        {/* Final Footer Credits */}
        <div className="mt-40 w-full flex flex-col items-center">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -8, scale: 1.1 }}
            className="group relative flex flex-col items-center gap-4 mb-24"
          >
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all shadow-[0_0_20px_rgba(0,243,255,0)] hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]">
              <ArrowUp className="w-8 h-8 text-white/40 group-hover:text-neon-cyan transition-colors" />
            </div>
            <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white/20 group-hover:text-white transition-colors">
              Return to Peak
            </span>
          </motion.button>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 py-12 border-t border-white/5">
            <p className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase">
              Engineered by Parth Shrivastava
            </p>
            <div className="flex gap-12">
              <a href="#" className="font-mono text-[10px] tracking-[0.4em] text-white/10 hover:text-neon-cyan uppercase transition-colors">Privacy_Protocol</a>
              <a href="#" className="font-mono text-[10px] tracking-[0.4em] text-white/10 hover:text-neon-cyan uppercase transition-colors">System_Logs</a>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Shadow Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon-cyan/[0.03] to-transparent pointer-events-none" />
    </section>
  );
}
