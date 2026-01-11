"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
  title: string;
  category: string;
  image: string;
  index: number;
  subtitle?: string;
  link?: string;
}

export function ProjectSection({ title, category, image, index, subtitle, link }: ProjectProps) {
  const ButtonWrapper = link ? Link : "button";
  const buttonProps = link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <section className="snap-section relative w-full h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="container relative z-10 px-6 flex flex-col items-start gap-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-2"
        >
          <span className="text-neon-cyan text-sm tracking-[0.3em] uppercase font-medium">
            Project {String(index + 1).padStart(2, "0")} / {category}
          </span>
          <h2 className="text-6xl md:text-8xl font-display font-bold leading-none tracking-tighter">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl font-medium tracking-wide text-white/60 mt-2">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* @ts-expect-error: ButtonWrapper types are incompatible with custom buttonProps in React 19 */}
          <ButtonWrapper
            {...buttonProps}
            className="btn-neon mt-8 px-8 py-4 bg-white text-black font-bold flex items-center gap-2 group cursor-pointer"
          >
            VIEW CASE STUDY
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </ButtonWrapper>
        </motion.div>
      </div>
    </section>
  );
}
