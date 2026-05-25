"use client";

import { motion } from "framer-motion";
import { Bot, GitBranch, Layers, Sparkles } from "lucide-react";

import { AnimatedSection } from "@/components/motion/animated-section";
import { GlowCard } from "@/components/surfaces/glow-card";

const cards = [
  {
    icon: Layers,
    title: "Подход к задачам",
    body: "Сначала уточняю сценарий и ограничения, затем верстаю состояния (loading / empty / error), после — интеграция с API и рефакторинг без «большого взрыва».",
  },
  {
    icon: Bot,
    title: "AI в работе",
    body: "Использую Cursor и LLM для черновиков, ревью типов и поиска краевых случаев. Финальную логику, API-контракты и UX-поведение проверяю и правлю вручную.",
  },
  {
    icon: GitBranch,
    title: "Организация проекта",
    body: "Контент в data/, UI в components/, API в app/api/. Типы в types/, переиспользуемые утилиты в lib/. Так проще сопровождать и показывать полный цикл frontend → backend.",
  },
  {
    icon: Sparkles,
    title: "Для HR на этом сайте",
    body: "Ниже — AI-помощник: задайте вопрос об опыте, стеке или проектах — ответ строится только по данным из портфолио, без выдумок.",
  },
];

export function WorkflowSection() {
  return (
    <AnimatedSection id="workflow" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Как я работаю</p>
        <h2 className="mt-4 text-balance font-[family-name:var(--font-onest)] text-4xl font-semibold tracking-tight sm:text-5xl">
          От задачи до результата — с понятной структурой и AI как ускорителем.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <GlowCard className="h-full">
                <Icon className="size-5 text-primary" />
                <p className="mt-4 text-sm font-semibold tracking-tight">{card.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
