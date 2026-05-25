"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ContactFieldErrors } from "@/lib/validation/contact";

type FormState = "idle" | "loading" | "success" | "error";

const initial = { name: "", phone: "", email: "", comment: "" };

export function ContactForm() {
  const [values, setValues] = React.useState(initial);
  const [state, setState] = React.useState<FormState>("idle");
  const [message, setMessage] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<ContactFieldErrors>({});

  const setField = (key: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setFieldErrors((fe) => ({ ...fe, [key]: undefined }));
    if (state === "error") setState("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setMessage(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
        fieldErrors?: ContactFieldErrors;
      };

      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Не удалось отправить сообщение");
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        return;
      }

      setState("success");
      setMessage(data.message ?? "Сообщение отправлено");
      setValues(initial);
    } catch {
      setState("error");
      setMessage("Сеть недоступна. Проверьте подключение и попробуйте снова.");
    }
  };

  const disabled = state === "loading" || state === "success";

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Имя
          </label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={setField("name")}
            invalid={Boolean(fieldErrors.name)}
            disabled={disabled}
            placeholder="Как к вам обращаться"
          />
          {fieldErrors.name ? <p className="text-xs text-red-500">{fieldErrors.name}</p> : null}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-phone" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Телефон
          </label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={setField("phone")}
            invalid={Boolean(fieldErrors.phone)}
            disabled={disabled}
            placeholder="+7 …"
          />
          {fieldErrors.phone ? <p className="text-xs text-red-500">{fieldErrors.phone}</p> : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Email
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={setField("email")}
          invalid={Boolean(fieldErrors.email)}
          disabled={disabled}
          placeholder="you@example.com"
        />
        {fieldErrors.email ? <p className="text-xs text-red-500">{fieldErrors.email}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-comment" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Комментарий
        </label>
        <Textarea
          id="contact-comment"
          name="comment"
          required
          value={values.comment}
          onChange={setField("comment")}
          invalid={Boolean(fieldErrors.comment)}
          disabled={disabled}
          placeholder="Кратко о задаче или вопросе"
        />
        {fieldErrors.comment ? <p className="text-xs text-red-500">{fieldErrors.comment}</p> : null}
      </div>

      {state === "success" && message ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-foreground"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
          <span>{message}</span>
        </div>
      ) : null}

      {state === "error" && message ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm text-foreground"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
          <span>{message}</span>
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={disabled}
        className={cn(
          "h-11 w-full rounded-full sm:w-auto",
          state === "loading" && "pointer-events-none opacity-80",
        )}
      >
        {state === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Отправка…
          </>
        ) : state === "success" ? (
          <>
            <CheckCircle2 className="size-4" />
            Отправлено
          </>
        ) : (
          <>
            <Send className="size-4" />
            Отправить
          </>
        )}
      </Button>
    </form>
  );
}
