"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends React.ComponentProps<typeof motion.section> {
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedSection({ children, className, delay = 0, ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedStat({ value, label, hint }: { value: string; label: string; hint?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-stone-500/20 bg-stone-950/35 p-6 backdrop-blur-xl"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{value}</p>
      {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}
    </motion.div>
  );
}
