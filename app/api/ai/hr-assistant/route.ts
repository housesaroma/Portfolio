import { NextResponse } from "next/server";

import { buildProfileContext } from "@/lib/ai/build-profile-context";

const SYSTEM_PROMPT = `Ты помощник для HR и рекрутера на лендинге-портфолио frontend-разработчика.
Отвечай только на основе переданного контекста о кандидате.
Пиши по-русски, кратко и по делу (3–6 предложений, списки — если уместно).
Не выдумывай опыт, проекты и технологии, которых нет в контексте.
Если в контексте нет ответа — честно скажи, что данных недостаточно, и предложи связаться напрямую.`;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ожидается JSON" }, { status: 400 });
  }

  const question =
    body && typeof body === "object" && typeof (body as { question?: string }).question === "string"
      ? (body as { question: string }).question.trim()
      : "";

  if (question.length < 3) {
    return NextResponse.json({ error: "Сформулируйте вопрос (минимум 3 символа)" }, { status: 422 });
  }
  if (question.length > 500) {
    return NextResponse.json({ error: "Вопрос слишком длинный (максимум 500 символов)" }, { status: 422 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI не настроен на сервере. Добавьте OPENAI_API_KEY в переменные окружения (см. README).",
      },
      { status: 503 },
    );
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const context = buildProfileContext();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 600,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Контекст о кандидате:\n${context}\n\nВопрос HR: ${question}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[hr-assistant] OpenAI error", response.status, errText);
      return NextResponse.json({ error: "Сервис AI временно недоступен. Попробуйте позже." }, { status: 502 });
    }

    const json = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const answer = json.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json({ error: "Пустой ответ от AI" }, { status: 502 });
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("[hr-assistant] request failed", error);
    return NextResponse.json({ error: "Не удалось получить ответ. Попробуйте позже." }, { status: 500 });
  }
}
