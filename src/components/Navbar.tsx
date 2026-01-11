"use client";

import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail, GraduationCap, Cpu, Trophy } from "lucide-react";

export function Navbar() {
  const navItems = [
    { icon: Home, label: "HOME", href: "#home" },
    { icon: User, label: "ABOUT", href: "#about" },
    { icon: GraduationCap, label: "EDUCATION", href: "#education" },
    { icon: Briefcase, label: "WORK", href: "#projects" },
    { icon: Cpu, label: "SKILLS", href: "#skills" },
    { icon: Trophy, label: "ACHIEVEMENTS", href: "#achievements" },
    { icon: Mail, label: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    const container = document.querySelector(".snap-container");
    
    if (element && container) {
      const offsetTop = element.offsetTop;
      container.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-1 p-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]"
    >
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 group relative"
        >
          <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
          <span className="text-[10px] font-bold tracking-[0.2em] hidden xl:block text-white/60 group-hover:text-white transition-colors">
            {item.label}
          </span>
          
          {/* Tooltip for mobile/smaller screens */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black border border-white/10 rounded-md text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none xl:hidden whitespace-nowrap">
            {item.label}
          </span>
        </a>
      ))}
    </motion.nav>
  );
}
