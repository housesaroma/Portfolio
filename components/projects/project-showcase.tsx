"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Link2 } from "lucide-react";

import { ContainerScroll } from "@/components/motion/container-scroll";
import { ProjectMedia } from "@/components/projects/project-media";
import { ProjectTechStack } from "@/components/projects/project-tech-stack";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

const linkIcon = (type: Project["links"][number]["type"]) => {
  switch (type) {
    case "github":
      return Code2;
    default:
      return Link2;
  }
};

export function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const title = (
    <div className="space-y-4">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-sm uppercase tracking-[0.28em] text-muted-foreground"
      >
        Проект {String(index + 1).padStart(2, "0")}
      </motion.p>
      <div className="space-y-3">
        <h2 className="text-balance font-[family-name:var(--font-onest)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {project.title}
        </h2>
        <p className="text-lg text-muted-foreground sm:text-xl">{project.subtitle}</p>
      </div>
    </div>
  );

  return (
    <section id={project.id} className="relative scroll-mt-28">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-70 blur-3xl",
          "bg-gradient-to-b",
          project.accent ?? "from-primary/25 via-transparent to-transparent",
        )}
      />
      <ContainerScroll
        titleComponent={title}
        scrollMultiplier={index % 2 === 0 ? 1.55 : 1.7}
        parallaxStrength={0.85}
        tintClassName={cn("bg-gradient-to-br", project.accent)}
      >
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {project.description}
            </motion.p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-500/20 bg-stone-950/30 p-5 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Задача</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{project.problem}</p>
              </div>
              <div className="rounded-2xl border border-stone-500/20 bg-stone-950/30 p-5 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Что сделано</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Стек</p>
              <ProjectTechStack technologies={project.technologies} />
            </div>

            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => {
                const Icon = linkIcon(link.type);
                const isExternal = link.href.startsWith("http");
                return (
                  <GradientButton key={link.label} href={link.href} external={isExternal}>
                    <Icon className="size-4" />
                    {link.label}
                    {isExternal ? <ArrowUpRight className="size-4 opacity-80" /> : null}
                  </GradientButton>
                );
              })}
            </div>
          </div>

          <ProjectMedia media={project.media} />
        </div>
      </ContainerScroll>
    </section>
  );
}
