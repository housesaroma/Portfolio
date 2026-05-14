"use client";

import { motion } from "framer-motion";

import { projects } from "@/data/projects";

export function WorkSectionIntro() {
  const featured = projects.filter((project) => project.featured);

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-3 sm:space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Избранные работы</p>
        <h2 className="text-balance font-[family-name:var(--font-onest)] text-3xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Не «для галочки», а то, чем реально занимался.
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {featured.length} направления: коммерческий продукт на Vue и учебные сервисы совместно с компаниями-партнёрами.
        </p>
      </motion.div>
    </div>
  );
}
