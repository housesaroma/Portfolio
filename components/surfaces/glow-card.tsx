"use client";

import * as React from "react";
import { motion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  const rotateX = useSpring(0, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -6);
    rotateY.set(px * 8);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-stone-500/20 bg-gradient-to-br from-stone-400/8 via-stone-900/25 to-transparent p-[1px] shadow-[0_28px_100px_-52px_rgba(40,25,15,0.55)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--primary)_35%,transparent),transparent_65%)]" />
      <div className="relative h-full rounded-[22px] border border-stone-500/15 bg-card/55 p-6 sm:p-8">{children}</div>
    </motion.div>
  );
}
