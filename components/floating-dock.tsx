"use client";

import Link from "next/link";
import { Home, Layers, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { socials } from "@/data/socials";
import { socialIcon } from "@/components/visual/social-icons";
import { cn } from "@/lib/utils";

const dockItems = [
  { href: "#hero", label: "Старт", icon: Home },
  { href: "#work", label: "Проекты", icon: Layers },
  { href: "#stack", label: "Стек", icon: Sparkles },
  { href: "#contact", label: "Связь", icon: MessageCircle },
];

export function FloatingDock() {
  const quickSocials = socials.filter((s) => s.platform === "email" || s.platform === "phone");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-stone-500/20 bg-background/75 px-3 py-2 shadow-[0_22px_70px_-32px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "group relative flex size-11 items-center justify-center rounded-2xl border border-transparent text-muted-foreground transition",
                "hover:-translate-y-1 hover:border-stone-500/25 hover:bg-stone-950/40 hover:text-foreground",
              )}
            >
              <Icon className="size-5" />
              <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 rounded-full border border-stone-500/20 bg-background/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground opacity-0 transition group-hover:opacity-100 md:block">
                {item.label}
              </span>
            </Link>
          );
        })}
        <div className="mx-1 h-8 w-px bg-stone-500/25" />
        {quickSocials.map((social) => {
          const Icon = socialIcon(social.icon);
          const isMailOrTel = social.href.startsWith("mailto:") || social.href.startsWith("tel:");
          return (
            <Link
              key={social.id}
              href={social.href}
              {...(isMailOrTel ? {} : { target: "_blank", rel: "noreferrer" })}
              aria-label={social.label}
              className="flex size-11 items-center justify-center rounded-2xl border border-transparent text-muted-foreground transition hover:-translate-y-1 hover:border-stone-500/25 hover:bg-stone-950/40 hover:text-foreground"
            >
              <Icon className="size-5" />
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
