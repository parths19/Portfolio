import { ThreeHero } from "@/components/ThreeHero";
import { AboutSection } from "@/components/AboutSection";
import { EducationSection } from "@/components/EducationSection";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SkillsShowcase } from "@/components/SkillsShowcase";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ContactBento } from "@/components/ContactBento";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <div className="grain" />
      <div className="gradient-glow" />
      <CustomCursor />
      <Navbar />

      <div className="snap-container">
        {/* Hero Section */}
        <section id="home" className="snap-section relative flex flex-col items-center justify-center overflow-hidden">
          <ThreeHero />

          <div className="container relative z-10 text-center flex flex-col items-center justify-center h-full pointer-events-none px-4">
            <h1 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] font-display font-black leading-[0.85] tracking-tighter mix-blend-difference mb-4 break-words">
              PARTH<br />SHRIVASTAVA
            </h1>
            <p className="text-lg md:text-2xl font-medium tracking-[0.2em] text-neon-cyan mix-blend-difference uppercase">
              Software Developer
            </p>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.4em] font-bold text-muted-foreground uppercase">SCROLL TO EXPLORE</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Education Section */}
        <EducationSection />

        {/* Projects Section */}
        <ProjectsGrid />

        {/* Skills Showcase Section */}
        <SkillsShowcase />

        {/* Achievements Section */}
        <AchievementsSection />

        {/* Contact Section */}
        <div id="contact">
          <ContactBento />
        </div>
      </div>
    </main>
  );
}
