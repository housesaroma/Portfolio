"use client";

import { motion } from "framer-motion";

import { profile } from "@/data/profile";
import { AnimatedSection, AnimatedStat } from "@/components/motion/animated-section";
import { GlowCard } from "@/components/surfaces/glow-card";

export function BentoGrid() {
  return (
    <AnimatedSection id="stack" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Стек и акценты</p>
          <h2 className="mt-3 max-w-2xl text-balance font-[family-name:var(--font-onest)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Цифры без выдумки — всё из резюме и реальных задач.
          </h2>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Навыки и метрики правятся в <code className="rounded-md bg-stone-950/50 px-2 py-1 text-xs">data/profile.ts</code> — можно обновлять без правок вёрстки.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {profile.stats.map((stat) => (
          <AnimatedStat key={stat.id} value={stat.value} label={stat.label} hint={stat.hint} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {profile.achievements.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
          >
            <GlowCard className="h-full">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">В фокусе</p>
                {item.metric ? (
                  <span className="rounded-full border border-stone-500/25 bg-stone-950/40 px-3 py-1 text-xs text-primary">{item.metric}</span>
                ) : null}
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-stone-500/20 bg-gradient-to-br from-stone-400/8 via-transparent to-rose-950/20 p-[1px] shadow-[0_28px_100px_-55px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <div className="rounded-[28px] border border-stone-500/15 bg-card/55 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Технологии из резюме</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.015 }}
                whileHover={{ y: -2, rotate: index % 5 === 0 ? -0.6 : 0.4 }}
                className="rounded-2xl border border-stone-500/20 bg-stone-950/35 px-4 py-2 text-xs font-medium text-foreground/90 shadow-inner shadow-black/25 backdrop-blur-md"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
