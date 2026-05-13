"use client";

import Link from "next/link";
import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

interface GradientButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function GradientButton({ href, children, className, external }: GradientButtonProps) {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(220px circle at ${x}% ${y}%, color-mix(in oklch, var(--primary) 55%, transparent), transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const reset = () => {
    x.set(50);
    y.set(50);
  };

  const classNames = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-stone-500/25 bg-stone-950/40 px-5 py-2.5 text-sm font-medium text-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.2)] backdrop-blur-md transition-transform hover:-translate-y-0.5",
    className,
  );

  const inner = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const isMailto = href.startsWith("mailto:");
  const isTel = href.startsWith("tel:");
  const shouldOpenNewTab = external && !isMailto && !isTel;

  if (external) {
    return (
      <motion.a
        href={href}
        target={shouldOpenNewTab ? "_blank" : undefined}
        rel={shouldOpenNewTab ? "noreferrer" : undefined}
        className={classNames}
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <Link href={href} className={classNames} onMouseMove={handleMove} onMouseLeave={reset}>
      {inner}
    </Link>
  );
}
