"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { GradientButton } from "@/components/ui/gradient-button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Button } from "@/components/ui/button";
import { SpotlightBackground } from "@/components/visual/spotlight-background";
import { AnimatedGrid } from "@/components/visual/animated-grid";
import { socialIcon } from "@/components/visual/social-icons";

export function HeroSection() {
  const [index, setIndex] = React.useState(0);
  const words = profile.headlineWords;

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % words.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <section id="hero" className="relative isolate overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <SpotlightBackground />
      <AnimatedGrid />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 via-background/85 to-background" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-fit max-w-full items-center gap-2 rounded-2xl border border-stone-500/25 bg-stone-950/40 px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md sm:rounded-full sm:tracking-[0.28em]"
        >
          <Sparkles className="size-3.5 shrink-0 text-primary" />
          <span className="leading-snug">{profile.availability}</span>
        </motion.div>

        <div className="space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl text-balance font-[family-name:var(--font-onest)] text-5xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            {profile.name}
            <span className="mt-2 block text-3xl font-medium text-muted-foreground sm:text-4xl md:text-5xl">{profile.role}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="flex flex-wrap items-end gap-3 text-2xl font-semibold sm:text-3xl md:text-4xl"
          >
            <span className="text-muted-foreground">Сейчас в фокусе:</span>
            <span className="relative inline-grid min-h-[1.35em] min-w-[10ch] sm:min-w-[14ch] place-items-start">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(3px)" }}
                  transition={{ duration: 0.42, ease: [0.33, 1, 0.68, 1] }}
                  className="col-start-1 row-start-1 bg-gradient-to-r from-amber-200 via-orange-300 to-rose-400 bg-clip-text text-transparent"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <MagneticButton>
              <GradientButton href="#work" external={false}>
                Смотреть проекты
                <ArrowRight className="size-4" />
              </GradientButton>
            </MagneticButton>
            {profile.resumeUrl ? (
              <Button asChild variant="secondary" size="lg" className="rounded-full border border-stone-500/25 bg-stone-950/35 backdrop-blur">
                <a href={profile.resumeUrl} download>
                  Скачать резюме (PDF)
                </a>
              </Button>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-primary" />
              {profile.location}
            </span>
            <div className="hidden h-4 w-px bg-stone-500/30 sm:block" />
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = socialIcon(social.icon);
                const isMailOrTel = social.href.startsWith("mailto:") || social.href.startsWith("tel:");
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    {...(isMailOrTel ? {} : { target: "_blank", rel: "noreferrer" })}
                    className="inline-flex size-11 items-center justify-center rounded-2xl border border-stone-500/25 bg-stone-950/35 text-foreground transition hover:border-primary/45 hover:text-primary"
                    aria-label={social.label}
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
