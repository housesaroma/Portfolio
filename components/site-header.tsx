"use client";

import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";
import { Command as CommandIcon, Menu, X } from "lucide-react";

import { profile } from "@/data/profile";
import { getInitials } from "@/lib/get-initials";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "Обо мне" },
  { href: "#work", label: "Проекты" },
  { href: "#experience", label: "Опыт" },
  { href: "#stack", label: "Стек" },
  { href: "#contact", label: "Контакты" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const initials = getInitials(profile.name, profile.monogram);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-500/15 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#hero" className="group inline-flex items-center gap-2">
          <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-2xl border border-stone-500/30 bg-gradient-to-br from-amber-500/35 via-orange-500/25 to-rose-600/25 shadow-[0_12px_40px_-14px_rgba(234,88,12,0.45)]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_55%)] opacity-50 mix-blend-overlay" />
            <span className="relative text-xs font-semibold tracking-tight text-primary-foreground">{initials}</span>
          </span>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
            <span className="text-xs text-muted-foreground">{profile.role}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-stone-500/10 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-stone-500/20 bg-stone-950/35 px-3 py-1 text-[11px] text-muted-foreground lg:inline-flex">
            <CommandIcon className="size-3.5 text-primary" />
            <span>Поиск</span>
            <kbd className="rounded-md border border-stone-500/25 bg-stone-900/80 px-1.5 py-0.5 font-mono text-[10px] text-foreground/85">⌘K</kbd>
          </span>
          <ThemeToggle />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full border border-stone-500/20 bg-stone-950/35 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="border-t border-stone-500/15 bg-background/95 md:hidden"
      >
        <div className={cn("flex flex-col gap-1 px-4 py-3", !open && "pointer-events-none")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-3 py-3 text-sm text-foreground/90"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
