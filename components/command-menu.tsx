"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Code2,
  Layers,
  Mail,
  Moon,
  Phone,
  Share2,
  Sparkles,
  Sun,
  TerminalSquare,
} from "lucide-react";

import { projects } from "@/data/projects";
import { socials } from "@/data/socials";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Старт", href: "#hero" },
  { id: "about", label: "Обо мне", href: "#about" },
  { id: "work", label: "Проекты", href: "#work" },
  { id: "experience", label: "Опыт", href: "#experience" },
  { id: "stack", label: "Стек и цифры", href: "#stack" },
  { id: "contact", label: "Контакты", href: "#contact" },
];

function goTo(href: string) {
  document.querySelector<HTMLElement>(href)?.scrollIntoView({ behavior: "smooth" });
}

function openSocial(href: string) {
  if (href.startsWith("http")) {
    window.open(href, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = href;
  }
}

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl overflow-hidden border border-stone-300/70 bg-card/98 p-0 shadow-xl backdrop-blur-2xl dark:border-stone-500/20 dark:bg-background/95 dark:shadow-[0_40px_120px_-40px_rgba(0,0,0,0.75)]">
        <DialogTitle className="sr-only">Командное меню</DialogTitle>
        <Command
          className={cn(
            "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
            "[&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0",
            "[&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input-wrapper]_svg]:shrink-0",
            "[&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-4",
          )}
        >
          <div className="flex items-center border-b border-stone-300/60 px-4 dark:border-stone-500/15">
            <TerminalSquare className="mr-3 text-primary" />
            <Command.Input
              placeholder="Раздел, проект или тема оформления…"
              className="flex h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto py-3">
            <Command.Empty className="px-4 py-8 text-center text-sm text-muted-foreground">
              Ничего не нашлось — попробуйте другой запрос.
            </Command.Empty>

            <Command.Group heading="Навигация">
              {sections.map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.label} ${item.id}`}
                  onSelect={() => runCommand(() => goTo(item.href))}
                  className="flex cursor-pointer items-center gap-3 rounded-xl text-sm aria-selected:bg-stone-200/90 dark:aria-selected:bg-stone-500/15"
                >
                  <ArrowRight className="text-primary" />
                  <span>{item.label}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Проекты">
              {projects.map((project) => (
                <Command.Item
                  key={project.id}
                  value={`${project.title} ${project.subtitle}`}
                  onSelect={() => runCommand(() => goTo(`#${project.id}`))}
                  className="flex cursor-pointer items-center gap-3 rounded-xl text-sm aria-selected:bg-stone-200/90 dark:aria-selected:bg-stone-500/15"
                >
                  <Layers className="text-primary" />
                  <div className="flex flex-col">
                    <span>{project.title}</span>
                    <span className="text-xs text-muted-foreground">{project.subtitle}</span>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Связь">
              {socials.map((social) => (
                <Command.Item
                  key={social.id}
                  value={`${social.label} ${social.platform}`}
                  onSelect={() => runCommand(() => openSocial(social.href))}
                  className="flex cursor-pointer items-center gap-3 rounded-xl text-sm aria-selected:bg-stone-200/90 dark:aria-selected:bg-stone-500/15"
                >
                  <SocialGlyph platform={social.platform} />
                  <span>{social.label}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Тема">
              <Command.Item
                value="светлая тема"
                onSelect={() => runCommand(() => setTheme("light"))}
                className="flex cursor-pointer items-center gap-3 rounded-xl text-sm aria-selected:bg-stone-200/90 dark:aria-selected:bg-stone-500/15"
              >
                <Sun className="text-amber-300" />
                <span>Светлая</span>
                {theme === "light" && <Sparkles className="ml-auto size-4 text-primary" />}
              </Command.Item>
              <Command.Item
                value="тёмная тема"
                onSelect={() => runCommand(() => setTheme("dark"))}
                className="flex cursor-pointer items-center gap-3 rounded-xl text-sm aria-selected:bg-stone-200/90 dark:aria-selected:bg-stone-500/15"
              >
                <Moon className="text-orange-200/90" />
                <span>Тёмная</span>
                {theme === "dark" && <Sparkles className="ml-auto size-4 text-primary" />}
              </Command.Item>
              <Command.Item
                value="системная тема"
                onSelect={() => runCommand(() => setTheme("system"))}
                className="flex cursor-pointer items-center gap-3 rounded-xl text-sm aria-selected:bg-stone-200/90 dark:aria-selected:bg-stone-500/15"
              >
                <Layers className="text-muted-foreground" />
                <span>Как в системе</span>
                {theme === "system" && <Sparkles className="ml-auto size-4 text-primary" />}
              </Command.Item>
            </Command.Group>
          </Command.List>
          <div className="flex items-center justify-between border-t border-stone-300/60 px-4 py-3 text-xs text-muted-foreground dark:border-stone-500/15">
            <span>Стрелки · Enter — перейти</span>
            <span className="rounded-full border border-stone-300/70 bg-stone-100/95 px-2 py-1 font-mono text-[10px] dark:border-stone-500/20 dark:bg-stone-950/40">⌘K</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function SocialGlyph({ platform }: { platform: string }) {
  const className = "size-4";
  switch (platform) {
    case "github":
      return <Code2 className={className} />;
    case "linkedin":
      return <Share2 className={className} />;
    case "email":
      return <Mail className={className} />;
    case "phone":
      return <Phone className={className} />;
    default:
      return <ArrowRight className={className} />;
  }
}
