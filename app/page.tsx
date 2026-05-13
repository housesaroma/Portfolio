import dynamic from "next/dynamic";

import { AboutSection } from "@/components/sections/about-section";
import { BentoGrid } from "@/components/sections/bento-grid";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { HeroSection } from "@/components/sections/hero-section";
import { WorkSectionIntro } from "@/components/sections/work-section-intro";
import { CommandMenu } from "@/components/command-menu";
import { FloatingDock } from "@/components/floating-dock";
import { LoadingOverlay } from "@/components/loading-overlay";
import { MouseGlow } from "@/components/mouse-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/data/projects";

const ProjectShowcase = dynamic(
  () => import("@/components/projects/project-showcase").then((mod) => mod.ProjectShowcase),
  { ssr: true, loading: () => null },
);

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <LoadingOverlay />
      <ScrollProgress />
      <MouseGlow />
      <SiteHeader />
      <main className="relative pb-28">
        <HeroSection />
        <AboutSection />
        <section id="work" className="relative scroll-mt-28">
          <WorkSectionIntro />
          {featuredProjects.map((project, index) => (
            <ProjectShowcase key={project.id} project={project} index={index} />
          ))}
        </section>
        <ExperienceTimeline />
        <BentoGrid />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingDock />
      <CommandMenu />
    </>
  );
}
