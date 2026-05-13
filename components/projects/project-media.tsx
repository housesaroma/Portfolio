"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MonitorPlay } from "lucide-react";

import type { ProjectMedia as ProjectMediaType } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProjectMediaProps {
  media: ProjectMediaType;
  className?: string;
}

export function ProjectMedia({ media, className }: ProjectMediaProps) {
  if (media.type === "video") {
    const poster = media.posterSrc ?? media.items[0]?.src;
    return (
      <div className={cn("relative aspect-video w-full overflow-hidden rounded-2xl", className)}>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        {media.videoSrc ? (
          <video
            className="h-full w-full object-cover"
            src={media.videoSrc}
            poster={poster}
            muted
            playsInline
            loop
            autoPlay
            controls={false}
          />
        ) : (
          poster && (
            <Image src={poster} alt={media.items[0]?.alt ?? "Превью проекта"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" priority />
          )
        )}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      </div>
    );
  }

  if (media.type === "browser") {
    const primary = media.items[0];
    if (!primary) return null;
    return (
      <div className={cn("relative w-full", className)}>
        <BrowserChrome>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/30">
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            {media.items.length > 1 && (
              <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {media.items.slice(1, 4).map((item) => (
                  <div
                    key={item.id}
                    className="h-16 w-28 overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-lg shadow-black/40 ring-1 ring-white/10"
                  >
                    <Image src={item.src} alt={item.alt} width={224} height={128} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </BrowserChrome>
      </div>
    );
  }

  if (media.type === "carousel") {
    return <ProjectCarousel media={media} className={className} />;
  }

  const item = media.items[0];
  if (!item) return null;
  return (
    <div className={cn("relative aspect-[16/10] w-full overflow-hidden rounded-2xl", className)}>
      <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" priority />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
    </div>
  );
}

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-stone-500/20 bg-gradient-to-b from-stone-400/10 to-stone-950/40 shadow-[0_28px_90px_-40px_rgba(40,25,15,0.65)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-stone-500/15 bg-stone-950/50 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/90" />
          <span className="size-2.5 rounded-full bg-amber-300/90" />
          <span className="size-2.5 rounded-full bg-emerald-400/90" />
        </div>
        <div className="mx-auto flex min-w-0 flex-1 items-center gap-2 rounded-full border border-stone-500/20 bg-stone-900/60 px-3 py-1 text-xs text-muted-foreground">
          <MonitorPlay className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">localhost · черновик интерфейса</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function ProjectCarousel({
  media,
  className,
}: {
  media: ProjectMediaType;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const items = media.items;
  const active = items[index];

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  if (!active) return null;

  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-muted/20 shadow-inner ring-1 ring-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src={active.src} alt={active.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" priority={index === 0} />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
          <Button type="button" size="icon" variant="secondary" className="pointer-events-auto rounded-full bg-background/60" onClick={prev} aria-label="Предыдущий слайд">
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex gap-1.5">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Слайд ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50",
                )}
              />
            ))}
          </div>
          <Button type="button" size="icon" variant="secondary" className="pointer-events-auto rounded-full bg-background/60" onClick={next} aria-label="Следующий слайд">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
