"use client";

import * as React from "react";
import { AlertCircle, Loader2, MessageSquareText, Sparkles } from "lucide-react";

import { AnimatedSection } from "@/components/motion/animated-section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const PRESETS = [
  "Какой у кандидата опыт работы во frontend?",
  "Какой основной стек и с чем работал в коммерции?",
  "Какие учебные и коммерческие проекты можно показать?",
  "Чем кандидат занимался лично на последнем месте работы?",
  "Как кандидат использует AI в разработке?",
];

type AiState = "idle" | "loading" | "success" | "error";

export function HrAiAssistant() {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState<string | null>(null);
  const [state, setState] = React.useState<AiState>("idle");
  const [error, setError] = React.useState<string | null>(null);

  const ask = async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 3) return;

    setQuestion(trimmed);
    setState("loading");
    setError(null);
    setAnswer(null);

    try {
      const res = await fetch("/api/ai/hr-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = (await res.json()) as { answer?: string; error?: string };

      if (!res.ok) {
        setState("error");
        setError(data.error ?? "Не удалось получить ответ");
        return;
      }

      setAnswer(data.answer ?? null);
      setState("success");
    } catch {
      setState("error");
      setError("Сеть недоступна. Попробуйте позже.");
    }
  };

  return (
    <AnimatedSection id="ai-hr" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[32px] border border-stone-300/70 bg-gradient-to-br from-violet-500/10 via-card/95 to-background p-[1px] shadow-md dark:border-stone-500/20 dark:from-violet-500/15 dark:shadow-none">
        <div className="rounded-[30px] border border-stone-300/60 bg-background/92 p-6 dark:border-stone-500/15 dark:bg-background/85 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">AI для HR</p>
              <h2 className="text-balance font-[family-name:var(--font-onest)] text-3xl font-semibold tracking-tight sm:text-4xl">
                Спросите об опыте, стеке или проектах — краткий ответ по данным портфолио.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Помощник использует OpenAI API и контекст из резюме на сайте. Не заменяет живое общение, но экономит время на первичный скрининг.
              </p>
            </div>
            <Sparkles className="size-8 shrink-0 text-primary opacity-80" aria-hidden />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                disabled={state === "loading"}
                onClick={() => ask(preset)}
                className="rounded-full border border-stone-300/70 bg-white/90 px-3 py-1.5 text-left text-xs text-foreground/90 transition hover:border-primary/40 hover:text-primary dark:border-stone-500/25 dark:bg-stone-950/40 sm:text-sm"
              >
                {preset}
              </button>
            ))}
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void ask(question);
            }}
          >
            <label htmlFor="hr-question" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Свой вопрос
            </label>
            <Textarea
              id="hr-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={state === "loading"}
              placeholder="Например: Сколько лет опыта и есть ли Vue в продакшене?"
              className="min-h-[88px]"
            />
            <Button type="submit" disabled={state === "loading" || question.trim().length < 3} className="rounded-full">
              {state === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Думаю…
                </>
              ) : (
                <>
                  <MessageSquareText className="size-4" />
                  Получить ответ
                </>
              )}
            </Button>
          </form>

          {state === "error" && error ? (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm"
            >
              <AlertCircle className="size-5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          ) : null}

          {answer ? (
            <div
              className={cn(
                "mt-6 rounded-2xl border border-stone-300/60 bg-white/90 p-5 text-sm leading-relaxed text-foreground/95 dark:border-stone-500/20 dark:bg-stone-950/35",
                state === "loading" && "opacity-60",
              )}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ответ</p>
              <p className="mt-3 whitespace-pre-wrap">{answer}</p>
            </div>
          ) : null}
        </div>
      </div>
    </AnimatedSection>
  );
}
