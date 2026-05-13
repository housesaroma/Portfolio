"use client";

import { motion } from "framer-motion";

import { profile } from "@/data/profile";
import { AnimatedSection } from "@/components/motion/animated-section";

export function ExperienceTimeline() {
  return (
    <AnimatedSection id="experience" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Опыт</p>
        <h2 className="mt-4 text-balance font-[family-name:var(--font-onest)] text-4xl font-semibold tracking-tight sm:text-5xl">
          От мобильного Flutter до Vue в продакшене.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Сначала мобильная разработка и бэкенд-стажировка — чтобы понимать продукт целиком. Сейчас основной фокус на фронтенде: коммерция и сильные учебные кейсы с партнёрами.
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-4xl space-y-12">
        <div className="pointer-events-none absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-amber-500/50 via-stone-500/25 to-transparent md:left-[15px]" />
        {profile.experience.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
            className="relative pl-10 md:pl-14"
          >
            <div className="absolute left-0 top-2 flex size-6 items-center justify-center rounded-full border border-amber-500/35 bg-gradient-to-br from-amber-500/25 to-rose-600/20 shadow-[0_0_28px_rgba(251,146,60,0.28)] md:left-1">
              <span className="size-2 rounded-full bg-primary" />
            </div>

            <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{item.role}</h3>
                <p className="text-sm text-primary">
                  {item.company} · {item.location}
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-stone-500/20 bg-stone-950/30 p-6 backdrop-blur-xl">
                <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                <ul className="space-y-3 text-sm text-foreground/90">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-400/90" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </AnimatedSection>
  );
}
