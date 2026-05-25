export type ContactFormPayload = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFormPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+()-]{10,20}$/;

export function validateContactForm(body: unknown): {
  ok: true;
  data: ContactFormPayload;
} | {
  ok: false;
  message: string;
  fieldErrors: ContactFieldErrors;
} {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Некорректное тело запроса", fieldErrors: {} };
  }

  const raw = body as Record<string, unknown>;
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const comment = typeof raw.comment === "string" ? raw.comment.trim() : "";

  const fieldErrors: ContactFieldErrors = {};

  if (name.length < 2) fieldErrors.name = "Укажите имя (минимум 2 символа)";
  if (!PHONE_RE.test(phone)) fieldErrors.phone = "Укажите корректный телефон";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Укажите корректный email";
  if (comment.length < 5) fieldErrors.comment = "Комментарий слишком короткий (минимум 5 символов)";
  if (comment.length > 4000) fieldErrors.comment = "Комментарий не длиннее 4000 символов";

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: "Проверьте поля формы", fieldErrors };
  }

  return { ok: true, data: { name, phone, email, comment } };
}
