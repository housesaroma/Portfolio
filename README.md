# Портфолио · Яков Куликов

Лендинг-презентация frontend-разработчика: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion. Контент в `data/*.ts`, API-маршруты в `app/api/`.

**Деплой:** добавьте ссылку на Netlify/Vercel после публикации репозитория.

## Запуск

```bash
npm install
cp .env.example .env.local   # заполните SMTP и OPENAI_API_KEY
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

### Проверки

```bash
npm run lint
npm run build
npm start
```

## Стек

| Слой | Технологии |
|------|------------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Radix UI |
| API | Next.js Route Handlers (`app/api/contact`, `app/api/ai/hr-assistant`) |
| Почта | Nodemailer + SMTP (владелец + копия пользователю) |
| AI | OpenAI Chat Completions API, контекст из `data/profile.ts` и `data/projects.ts` |

## Структура проекта

```
app/              — страницы и API
  api/contact/    — форма обратной связи
  api/ai/         — AI-помощник для HR
components/       — UI и секции лендинга
data/             — профиль, проекты, соцсети (контент)
lib/              — валидация, отправка почты, контекст для AI
public/           — статика (cv.pdf, медиа проектов)
```

## Что есть на сайте (тестовое задание)

1. **О себе** — стек, опыт, направления (`#about`, `#experience`, `#stack`).
2. **Как работаю** — подход, AI, организация кода (`#workflow`).
3. **Кейсы** — учебные и коммерческие проекты (`#work`).
4. **AI для HR** — вопросы об опыте/стеке/проектах, ответ по данным портфолио (`#ai-hr`).
5. **Контакты + форма** — имя, телефон, email, комментарий; loading / success / error (`#contact`).

## Форма обратной связи

**Frontend:** `components/contact/contact-form.tsx` — состояния `idle | loading | success | error`, подсветка полей при ошибках валидации.

**API:** `POST /api/contact` — тело JSON `{ name, phone, email, comment }`.

**Backend:**

1. Валидация в `lib/validation/contact.ts`.
2. Отправка в `lib/email/send-contact-mails.ts`:
   - письмо на `CONTACT_OWNER_EMAIL`;
   - копия на email пользователя из формы.

**Переменные окружения:** см. `.env.example`. Для локальной отладки без SMTP: `CONTACT_MOCK=true` (письма только в лог сервера).

## AI-интеграция

**Сценарий:** HR задаёт вопрос («Какой опыт?», «Какой стек?») — модель отвечает кратко, **только** по тексту из `buildProfileContext()` (профиль + проекты).

**API:** `POST /api/ai/hr-assistant` — `{ "question": "..." }` → `{ "answer": "..." }`.

**UI:** `components/sections/hr-ai-assistant.tsx` — пресеты + своё поле, loading / error / ответ.

Нужен `OPENAI_API_KEY` на сервере (не в клиенте).

## AI-инструменты при разработке

| Инструмент | Как использовал |
|------------|-----------------|
| **Cursor / LLM** | Черновики компонентов, API-маршрутов, README; идеи по структуре |
| **Ручная правка** | Вёрстка отступов проектов, светлая тема, типы TypeScript, тексты под реальный опыт, проверка SMTP и ошибок формы |

**Что делалось с помощью ИИ:** каркас формы, route handlers, секции «Как работаю» и HR-помощник, черновик README.

**Что правил вручную:** данные в `data/profile.ts` и `projects.ts`, медиа в `public/`, стили под дизайн портфолио, `layout` отступов секций, финальные формулировки для HR, настройка `.env` под Яндекс SMTP.

## Редактирование контента

- `data/profile.ts` — имя, опыт, навыки, контакты.
- `data/projects.ts` — проекты; опционально `layout` для отступов секции.
- `data/socials.ts` — ссылки.
- `public/cv.pdf` — резюме PDF.

## Деплой (Netlify)

`netlify.toml` уже настроен. В панели Netlify добавьте **Environment variables** из `.env.example` (SMTP, `OPENAI_API_KEY`). Без них форма и AI вернут понятные ошибки 503, а не «тихий» провал.

## Лицензия

Частный проект для портфолио и тестового задания.
