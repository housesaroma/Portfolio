"use client";

import * as React from "react";
import { Check, Copy, Phone } from "lucide-react";

import { profile } from "@/data/profile";
import { AnimatedSection } from "@/components/motion/animated-section";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";

export function ContactSection() {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const telHref = profile.phone ? `tel:${profile.phone.replace(/\s/g, "")}` : undefined;

  return (
    <AnimatedSection id="contact" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[32px] border border-stone-300/70 bg-gradient-to-br from-amber-400/20 via-card/95 to-background p-[1px] shadow-md dark:border-stone-500/20 dark:from-amber-500/15 dark:via-card/85 dark:shadow-[0_40px_100px_-48px_rgba(234,88,12,0.35)]">
        <div className="relative rounded-[30px] border border-stone-300/60 bg-background/92 px-6 py-12 backdrop-blur-2xl dark:border-stone-500/15 dark:bg-background/85 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_58%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Контакты</p>
              <h2 className="text-balance font-[family-name:var(--font-onest)] text-4xl font-semibold tracking-tight sm:text-5xl">
                Давайте познакомимся и обсудим задачу.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Пишите на почту или звоните — отвечу по возможности в тот же день. Формат работы: полная занятость, гибрид или удалёнка, без переезда из Екатеринбурга.
              </p>
            </div>
            <div className="space-y-5 rounded-3xl border border-stone-300/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl dark:border-stone-500/20 dark:bg-stone-950/35 dark:shadow-none">
              <div>
                <p className="text-sm text-muted-foreground">Почта</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{profile.email}</p>
              </div>
              {profile.phone ? (
                <div>
                  <p className="text-sm text-muted-foreground">Телефон (предпочитаемый способ связи)</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight">{profile.phone}</p>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <GradientButton href={`mailto:${profile.email}`} external>
                  Написать письмо
                </GradientButton>
                {telHref ? (
                  <GradientButton href={telHref} external>
                    <Phone className="size-4" />
                    Позвонить
                  </GradientButton>
                ) : null}
                <Button type="button" variant="secondary" className="rounded-full border border-stone-300/80 bg-white/90 shadow-sm dark:border-stone-500/25 dark:bg-stone-950/40 dark:shadow-none" onClick={copy}>
                  {copied ? (
                    <>
                      <Check className="size-4 text-emerald-400" />
                      Скопировано
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Скопировать e-mail
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
