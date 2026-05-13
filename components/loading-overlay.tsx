"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useMounted } from "@/lib/hooks/use-mounted";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { profile } from "@/data/profile";
import { getInitials } from "@/lib/get-initials";

export function LoadingOverlay() {
  const mounted = useMounted();
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = React.useState(true);
  const initials = getInitials(profile.name, profile.monogram);
  const avatar = profile.avatarSrc;

  React.useEffect(() => {
    if (!mounted || reduced) {
      queueMicrotask(() => {
        setVisible(false);
      });
      return;
    }
    const hasLoaded = window.sessionStorage.getItem("portfolio:loaded");
    if (hasLoaded) {
      queueMicrotask(() => {
        setVisible(false);
      });
      return;
    }
    const timeout = window.setTimeout(() => {
      window.sessionStorage.setItem("portfolio:loaded", "1");
      setVisible(false);
    }, 900);
    return () => window.clearTimeout(timeout);
  }, [mounted, reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.92, opacity: 0.35 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
              className="relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-stone-500/25 bg-stone-900 shadow-[0_22px_70px_-28px_rgba(234,88,12,0.45)]"
            >
              {avatar ? (
                <Image src={avatar} alt="" width={64} height={64} className="size-full object-cover object-[center_22%]" />
              ) : (
                <span className="text-lg font-semibold tracking-tight text-primary-foreground">{initials}</span>
              )}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Грузим портфолио…</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
