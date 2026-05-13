"use client";

import { motion } from "framer-motion";

import { profile } from "@/data/profile";
import { AnimatedSection } from "@/components/motion/animated-section";
import { GlowCard } from "@/components/surfaces/glow-card";

export function AboutSection() {
  return (
    <AnimatedSection id="about" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Обо мне</p>
          <h2 className="text-balance font-[family-name:var(--font-onest)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Инженерный подход — без сухого «корпоратива» в копирайте.
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{profile.bio}</p>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {profile.about.map((paragraph, index) => (
              <p key={`about-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {profile.skills.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <GlowCard>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{group.title}</p>
                <ul className="mt-4 space-y-3 text-sm text-foreground/90">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 size-2 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 shadow-[0_0_12px_rgba(251,146,60,0.35)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
