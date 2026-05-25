import { NextResponse } from "next/server";

import { sendContactEmails } from "@/lib/email/send-contact-mails";
import { validateContactForm } from "@/lib/validation/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ожидается JSON" }, { status: 400 });
  }

  const validated = validateContactForm(body);
  if (!validated.ok) {
    return NextResponse.json(
      { error: validated.message, fieldErrors: validated.fieldErrors },
      { status: 422 },
    );
  }

  const sent = await sendContactEmails(validated.data);
  if (!sent.ok) {
    return NextResponse.json({ error: sent.message }, { status: 503 });
  }

  return NextResponse.json({
    success: true,
    message: "Сообщение отправлено. Копия придёт на указанный email.",
  });
}
