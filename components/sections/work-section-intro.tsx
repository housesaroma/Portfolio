"use client";

import { motion } from "framer-motion";

import { projects } from "@/data/projects";

export function WorkSectionIntro() {
  const featured = projects.filter((project) => project.featured);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Избранные работы</p>
        <h2 className="text-balance font-[family-name:var(--font-onest)] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Не «для галочки», а то, чем реально занимался.
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Здесь {featured.length} блока: коммерческий Vue-продукт и учебные сервисы с партнёрами. Тексты, медиа и ссылки меняются в{" "}
          <code className="rounded-md bg-stone-950/50 px-2 py-1 text-xs">data/projects.ts</code>.
        </p>
      </motion.div>
    </div>
  );
}
