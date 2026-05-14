"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, MonitorPlay } from "lucide-react";

import type { ProjectMedia as ProjectMediaType, ProjectMediaItem, ProjectMedia } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProjectMediaProps {
  media: ProjectMediaType;
  className?: string;
}

type CarouselSlide =
  | { kind: "video"; id: string; src: string; poster?: string }
  | { kind: "image"; item: ProjectMediaItem };

function buildCarouselSlides(media: ProjectMedia & { type: "carousel" }): CarouselSlide[] {
  const slides: CarouselSlide[] = [];
  if (media.videoSrc) {
    slides.push({
      kind: "video",
      id: "carousel-lead-video",
      src: media.videoSrc,
      poster: media.posterSrc,
    });
  }
  for (const item of media.items) {
    slides.push({ kind: "image", item });
  }
  return slides;
}

const PLAYBACK_RATES = [0.75, 1, 1.25, 1.5, 2] as const;

export function ProjectMedia({ media, className }: ProjectMediaProps) {
  if (media.type === "text") {
    const sections = media.textSections ?? [];
    if (sections.length === 0) return null;
    return (
      <div className={cn("grid gap-3 sm:grid-cols-2 sm:gap-4", className)}>
        {sections.map((section, i) => (
          <motion.div
            key={`${section.title}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-24px" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="rounded-xl border border-stone-500/20 bg-stone-950/35 p-3.5 backdrop-blur-md sm:rounded-2xl sm:p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.22em]">
              {section.title}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground/90 sm:mt-2 sm:text-sm sm:leading-relaxed">{section.body}</p>
          </motion.div>
        ))}
      </div>
    );
  }

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

function CarouselNavButton({
  direction,
  onClick,
  label,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  className?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <Button
      type="button"
      size="icon"
      variant="secondary"
      className={cn(
        "rounded-full border border-white/10 bg-background/70 shadow-lg backdrop-blur-md hover:bg-background/90",
        className,
      )}
      onClick={onClick}
      aria-label={label}
    >
      <Icon className="size-5" />
    </Button>
  );
}

function ProjectCarousel({
  media,
  className,
}: {
  media: ProjectMedia & { type: "carousel" };
  className?: string;
}) {
  const slides = React.useMemo(() => buildCarouselSlides(media), [media]);
  const [index, setIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const previewVideoRef = React.useRef<HTMLVideoElement>(null);
  const lightboxVideoRef = React.useRef<HTMLVideoElement>(null);

  const active = slides[index];

  const next = React.useCallback(() => {
    setIndex((i) => (slides.length ? (i + 1) % slides.length : 0));
  }, [slides.length]);

  const prev = React.useCallback(() => {
    setIndex((i) => (slides.length ? (i - 1 + slides.length) % slides.length : 0));
  }, [slides.length]);

  React.useEffect(() => {
    if (lightboxOpen) {
      previewVideoRef.current?.pause();
      const lv = lightboxVideoRef.current;
      if (lv && active?.kind === "video") {
        lv.playbackRate = playbackRate;
      }
    } else {
      const pv = previewVideoRef.current;
      if (pv && index === 0 && slides[0]?.kind === "video") {
        void pv.play().catch(() => {});
      }
    }
  }, [lightboxOpen, index, active?.kind, playbackRate, slides]);

  React.useEffect(() => {
    if (index !== 0) previewVideoRef.current?.pause();
    else if (!lightboxOpen && slides[0]?.kind === "video") {
      void previewVideoRef.current?.play().catch(() => {});
    }
  }, [index, lightboxOpen, slides]);

  React.useEffect(() => {
    const v = lightboxVideoRef.current;
    if (v && active?.kind === "video") v.playbackRate = playbackRate;
  }, [playbackRate, active?.kind, index, lightboxOpen]);

  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, next, prev]);

  if (!active || slides.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-muted/20 shadow-inner ring-1 ring-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.kind === "video" ? active.id : active.item.id}
            initial={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {active.kind === "video" ? (
              <video
                ref={previewVideoRef}
                className="h-full w-full object-cover"
                src={active.src}
                poster={active.poster}
                muted
                playsInline
                loop
                autoPlay
                controls={false}
              />
            ) : (
              <Image
                src={active.item.src}
                alt={active.item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority={index === 0 && !media.videoSrc}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center bg-gradient-to-r from-background/50 to-transparent pl-1 sm:w-16 sm:pl-2">
          <CarouselNavButton direction="prev" onClick={prev} label="Предыдущий слайд" className="pointer-events-auto size-9 sm:size-10" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-14 items-center justify-end bg-gradient-to-l from-background/50 to-transparent pr-1 sm:w-16 sm:pr-2">
          <CarouselNavButton direction="next" onClick={next} label="Следующий слайд" className="pointer-events-auto size-9 sm:size-10" />
        </div>

        <div className="absolute bottom-3 left-1/2 z-[1] flex max-w-[85%] -translate-x-1/2 gap-1.5 px-10 sm:bottom-4 sm:max-w-none sm:px-12">
          {slides.map((slide, i) => (
            <button
              key={slide.kind === "video" ? slide.id : slide.item.id}
              type="button"
              aria-label={slide.kind === "video" ? "Видео" : `Слайд ${slide.item.alt}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50",
              )}
            />
          ))}
        </div>

        <div className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="size-9 rounded-full border border-white/10 bg-background/70 backdrop-blur-md hover:bg-background/90 sm:size-10"
            aria-label="На весь экран"
            onClick={() => setLightboxOpen(true)}
          >
            <Maximize2 className="size-4" />
          </Button>
        </div>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent fullscreen className="pt-14 sm:pt-16">
          <DialogTitle className="sr-only">Галерея проекта — полноэкранный просмотр</DialogTitle>

          <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-14 sm:px-20">
            <CarouselNavButton
              direction="prev"
              onClick={prev}
              label="Предыдущий"
              className="absolute left-2 top-1/2 z-20 size-11 -translate-y-1/2 sm:left-4 sm:size-12"
            />
            <CarouselNavButton
              direction="next"
              onClick={next}
              label="Следующий"
              className="absolute right-2 top-1/2 z-20 size-11 -translate-y-1/2 sm:right-4 sm:size-12"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.kind === "video" ? `lb-${active.id}` : `lb-${active.item.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex max-h-[calc(100dvh-8rem)] w-full max-w-6xl flex-col items-center justify-center gap-4"
              >
                {active.kind === "video" ? (
                  <>
                    <video
                      ref={lightboxVideoRef}
                      key={active.src}
                      className="max-h-[calc(100dvh-10rem)] w-full rounded-lg object-contain"
                      src={active.src}
                      poster={active.poster}
                      controls
                      playsInline
                      autoPlay
                      onLoadedMetadata={(e) => {
                        e.currentTarget.playbackRate = playbackRate;
                      }}
                    />
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="text-xs text-zinc-500">Скорость:</span>
                      {PLAYBACK_RATES.map((rate) => (
                        <Button
                          key={rate}
                          type="button"
                          size="sm"
                          variant={playbackRate === rate ? "default" : "secondary"}
                          className="h-8 min-w-[3rem] rounded-full text-xs"
                          onClick={() => setPlaybackRate(rate)}
                        >
                          ×{rate}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="relative h-full max-h-[calc(100dvh-8rem)] w-full">
                    <Image
                      src={active.item.src}
                      alt={active.item.alt}
                      width={1920}
                      height={1200}
                      className="mx-auto max-h-[calc(100dvh-8rem)] w-auto max-w-full object-contain"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 justify-center gap-1.5 border-t border-white/10 py-3">
            {slides.map((slide, i) => (
              <button
                key={`dot-${slide.kind === "video" ? slide.id : slide.item.id}`}
                type="button"
                aria-label={slide.kind === "video" ? "Видео" : `Слайд ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50",
                )}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
