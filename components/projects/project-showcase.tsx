"use client";

import type { ReactNode } from "react";
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

function ShowcaseDetails({
  project,
  betweenDescriptionAndCards,
}: {
  project: Project;
  betweenDescriptionAndCards?: ReactNode;
}) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55 }}
        className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed md:text-lg"
      >
        {project.description}
      </motion.p>

      {betweenDescriptionAndCards}

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="rounded-2xl border border-stone-300/70 bg-white/90 p-4 shadow-sm backdrop-blur-md dark:border-stone-500/20 dark:bg-stone-950/30 dark:shadow-none sm:p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Задача</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90 sm:mt-3">{project.problem}</p>
        </div>
        <div className="rounded-2xl border border-stone-300/70 bg-white/90 p-4 shadow-sm backdrop-blur-md dark:border-stone-500/20 dark:bg-stone-950/30 dark:shadow-none sm:p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Что сделано</p>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground/90 sm:mt-3 sm:space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-1 size-1.5 rounded-full bg-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Стек</p>
        <ProjectTechStack technologies={project.technologies} />
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
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
  );
}

function defaultSectionMarginTop(index: number): string {
  if (index === 0) return "mt-8 sm:mt-14";
  return "mt-28 sm:mt-36 lg:mt-44";
}

export function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const title = (
    <div className="space-y-2 sm:space-y-4">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-xs uppercase tracking-[0.28em] text-muted-foreground"
      >
        Проект {String(index + 1).padStart(2, "0")}
      </motion.p>
      <div className="space-y-1.5 sm:space-y-3">
        <h2 className="text-balance font-[family-name:var(--font-onest)] text-3xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {project.title}
        </h2>
        <p className="text-pretty text-base text-muted-foreground sm:text-lg md:text-xl">{project.subtitle}</p>
      </div>
    </div>
  );

  const sectionMarginTop = project.layout?.sectionMarginTop ?? defaultSectionMarginTop(index);

  return (
    <section
      id={project.id}
      className={cn("relative scroll-mt-28", sectionMarginTop, project.layout?.sectionClassName)}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[min(420px,85vw)] opacity-70 blur-3xl sm:h-[520px]",
          "bg-gradient-to-b",
          project.accent ?? "from-primary/25 via-transparent to-transparent",
        )}
      />
      <ContainerScroll
        titleComponent={title}
        scrollMultiplier={index % 2 === 0 ? 1.55 : 1.7}
        parallaxStrength={0.85}
        tintClassName={cn("bg-gradient-to-br", project.accent)}
        className={project.layout?.containerScrollClassName}
        titleWrapperClassName={project.layout?.titleWrapperClassName}
      >
        {project.media.type === "text" ? (
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-8 sm:py-10">
            <ShowcaseDetails
              project={project}
              betweenDescriptionAndCards={<ProjectMedia media={project.media} />}
            />
          </div>
        ) : (
          <div className="grid gap-8 p-4 sm:gap-10 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-10">
            <ShowcaseDetails project={project} />
            <ProjectMedia media={project.media} />
          </div>
        )}
      </ContainerScroll>
    </section>
  );
}
