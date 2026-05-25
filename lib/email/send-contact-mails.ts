import nodemailer from "nodemailer";

import type { ContactFormPayload } from "@/lib/validation/contact";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function buildOwnerHtml(data: ContactFormPayload) {
  return `
    <h2>Новое сообщение с портфолио</h2>
    <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Комментарий:</strong></p>
    <p>${escapeHtml(data.comment).replace(/\n/g, "<br>")}</p>
  `;
}

function buildUserCopyHtml(data: ContactFormPayload) {
  return `
    <h2>Копия вашего сообщения</h2>
    <p>Спасибо за обращение! Ниже — текст, который мы получили на сайте.</p>
    <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Комментарий:</strong></p>
    <p>${escapeHtml(data.comment).replace(/\n/g, "<br>")}</p>
    <hr>
    <p style="color:#666;font-size:14px;">Яков Куликов · портфолио</p>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmails(data: ContactFormPayload): Promise<{ ok: true } | { ok: false; message: string }> {
  const ownerEmail = process.env.CONTACT_OWNER_EMAIL ?? process.env.SMTP_USER;
  const fromEmail = process.env.SMTP_FROM ?? process.env.SMTP_USER;

  if (process.env.CONTACT_MOCK === "true") {
    console.info("[contact:mock] owner:", ownerEmail, data);
    return { ok: true };
  }

  const transport = getTransport();
  if (!transport || !ownerEmail || !fromEmail) {
    return {
      ok: false,
      message: "Почта не настроена на сервере. Укажите SMTP_* и CONTACT_OWNER_EMAIL в переменных окружения.",
    };
  }

  try {
    await transport.sendMail({
      from: `"Портфолио" <${fromEmail}>`,
      to: ownerEmail,
      replyTo: data.email,
      subject: `Сообщение с сайта · ${data.name}`,
      html: buildOwnerHtml(data),
      text: `Имя: ${data.name}\nТелефон: ${data.phone}\nEmail: ${data.email}\n\n${data.comment}`,
    });

    await transport.sendMail({
      from: `"Яков Куликов" <${fromEmail}>`,
      to: data.email,
      subject: "Копия вашего сообщения с портфолио",
      html: buildUserCopyHtml(data),
      text: `Копия сообщения:\n\nИмя: ${data.name}\nТелефон: ${data.phone}\nEmail: ${data.email}\n\n${data.comment}`,
    });

    return { ok: true };
  } catch (error) {
    console.error("[contact] send failed", error);
    return { ok: false, message: "Не удалось отправить письмо. Попробуйте позже или напишите на почту напрямую." };
  }
}
