"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/lib/hooks/use-mounted";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="rounded-full border border-stone-300/70 bg-white/90 dark:border-stone-500/20 dark:bg-stone-950/35"
        aria-label="Переключить тему"
        disabled
      >
        <Sun className="size-4 opacity-40" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className="rounded-full border border-stone-300/70 bg-white/90 dark:border-stone-500/20 dark:bg-stone-950/35"
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-4 text-amber-300" /> : <Moon className="size-4 text-orange-300/90" />}
    </Button>
  );
}
