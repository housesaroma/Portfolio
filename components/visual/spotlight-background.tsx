"use client";

import * as React from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

import { useMousePosition } from "@/lib/hooks/use-mouse-position";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function SpotlightBackground() {
  const reduced = usePrefersReducedMotion();
  const { x, y } = useMousePosition();
  const spotlightX = useSpring(x, { stiffness: 60, damping: 22, mass: 0.8 });
  const spotlightY = useSpring(y, { stiffness: 60, damping: 22, mass: 0.8 });

  React.useEffect(() => {
    if (reduced) return;
    spotlightX.set(x);
    spotlightY.set(y);
  }, [reduced, spotlightX, spotlightY, x, y]);

  const background = useMotionTemplate`radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%)`;

  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_55%)]" />
    );
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-75 mix-blend-soft-light"
      style={{ background }}
    />
  );
}
