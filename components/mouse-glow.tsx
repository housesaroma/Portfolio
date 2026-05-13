"use client";

import * as React from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

import { useMounted } from "@/lib/hooks/use-mounted";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function MouseGlow() {
  const mounted = useMounted();
  const reduced = usePrefersReducedMotion();
  const { x, y } = useMousePosition();
  const glowX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.45 });
  const glowY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.45 });

  React.useEffect(() => {
    glowX.set(x);
    glowY.set(y);
  }, [glowX, glowY, x, y]);

  const background = useMotionTemplate`radial-gradient(520px circle at ${glowX}px ${glowY}px, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)`;

  if (!mounted || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-screen opacity-70"
      style={{ background }}
    />
  );
}
