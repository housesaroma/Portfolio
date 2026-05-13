import type { Project } from "@/types/portfolio";

/**
 * Замените ссылки на живые демо и репозитории, когда они будут готовы.
 * Картинки — стабильные фото с Unsplash (офис, команда, коворкинг).
 */
export const projects: Project[] = [
  {
    id: "sapfir-engineering",
    title: "Корпоративный продукт",
    subtitle: "ООО «САПФИР-ИНЖИНИРИНГ» · Vue 3 + PrimeVue",
    description:
      "Участвовал в развитии внутреннего/корпоративного веб-приложения: сложные таблицы, диалоги, уведомления, единая визуальная тема. Зона ответственности — устойчивый UI, мобильная адаптация и аккуратный рефакторинг наследованного кода.",
    problem:
      "Корпоративные интерфейсы часто разрастаются быстрее дизайн-системы: разъезжаются отступы на малых экранах, дублируется логика, таблицы становятся тяжёлыми для глаз и для поддержки.",
    features: [
      "Мобильная версия с осмысленными брейкпоинтами, а не «узкий десктоп».",
      "PrimeVue: DataTable, Dialog, Toast, кастомизация темы под гайдлайны заказчика.",
      "Рефакторинг отдельных модулей без «большого взрыва» для команды.",
      "Согласованные паттерны форм и обратной связи при ошибках.",
    ],
    technologies: ["Vue 3", "Composition API", "Pinia", "Vite", "PrimeVue", "TypeScript", "REST API"],
    links: [{ label: "Связаться", href: "#contact", type: "other" }],
    featured: true,
    accent: "from-amber-500/30 via-orange-500/15 to-rose-500/25",
    media: {
      type: "browser",
      items: [
        {
          id: "main",
          src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=80",
          alt: "Команда разработчиков за работой в офисе",
          aspectRatio: "wide",
        },
        {
          id: "desk",
          src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80",
          alt: "Рабочее место с ноутбуком и кодом на экране",
          aspectRatio: "wide",
        },
        {
          id: "phone",
          src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
          alt: "Мобильный телефон в руках пользователя",
          aspectRatio: "video",
        },
      ],
    },
  },
  {
    id: "alfa-tracker",
    title: "Таск-трекер",
    subtitle: "Учебный проект · Альфа-Банк",
    description:
      "Учебный сервис для постановки и ведения задач: списки, статусы, понятная навигация. Тренировка продуктового мышления в формате, близком к реальным внутренним тулзам банка.",
    problem:
      "В таск-трекерах пользователь теряется между «создал», «в работе» и «готово», если состояния и фильтры не продуманы с первого экрана.",
    features: [
      "Сценарии создания и смены статуса задачи без лишних кликов.",
      "Читаемая типографика и иерархия на плотных списках.",
      "Подготовка интерфейса к разным ширинам экрана.",
    ],
    technologies: ["Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "REST API"],
    links: [{ label: "Подробности в резюме", href: "#contact", type: "other" }],
    featured: true,
    accent: "from-rose-500/25 via-amber-400/20 to-stone-500/20",
    media: {
      type: "carousel",
      items: [
        {
          id: "board",
          src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80",
          alt: "Доска со стикерами и задачами",
          aspectRatio: "wide",
        },
        {
          id: "desk2",
          src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
          alt: "Документы и ноутбук на столе",
          aspectRatio: "wide",
        },
        {
          id: "focus",
          src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2000&q=80",
          alt: "Фокус на работе за компьютером",
          aspectRatio: "square",
        },
      ],
    },
  },
  {
    id: "udv-org",
    title: "Дерево сотрудников",
    subtitle: "Учебный проект · UDV",
    description:
      "Визуализация организационной структуры компании: узлы, связи, масштабирование информации. Упор на то, чтобы дерево оставалось читаемым при росте данных.",
    problem:
      "Оргструктура быстро превращается в «кашу», если не продумать отступы, схлопывание веток и поведение на мобильных устройствах.",
    features: [
      "Навигация по уровням и крупным веткам без потери контекста.",
      "Визуальное разделение ролей и подразделений.",
      "Адаптив: удобный просмотр и на десктопе, и в дороге.",
    ],
    technologies: ["Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
    links: [{ label: "Связаться", href: "#contact", type: "other" }],
    featured: true,
    accent: "from-emerald-600/25 via-teal-500/15 to-amber-300/20",
    media: {
      type: "browser",
      items: [
        {
          id: "team",
          src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80",
          alt: "Команда на совещании",
          aspectRatio: "wide",
        },
        {
          id: "handshake",
          src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80",
          alt: "Деловое общение в офисе",
          aspectRatio: "wide",
        },
      ],
    },
  },
  {
    id: "brusnika-cowork",
    title: "Бронирование коворкингов",
    subtitle: "Учебный проект · Брусника · УрФУ",
    description:
      "Сервис онлайн-бронирования коворкингов университета: выбор слота, подтверждение, сценарии отмены. Важно было не перегрузить форму и оставить спокойный визуальный ритм.",
    problem:
      "Бронирование ломается, когда пользователь не понимает занятость, часовой пояс слота и что уже «занято» другим студентом.",
    features: [
      "Ясная сетка доступности и выбранного слота.",
      "Состояния загрузки, успеха и ошибки без паники в копирайте.",
      "Мобильный сценарий «забронировал по дороге в универ».",
    ],
    technologies: ["Vue.js", "JavaScript", "HTML5", "CSS3", "REST API"],
    links: [{ label: "Связаться", href: "#contact", type: "other" }],
    featured: true,
    accent: "from-stone-400/25 via-amber-200/15 to-orange-400/25",
    media: {
      type: "carousel",
      items: [
        {
          id: "cowork",
          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
          alt: "Современное офисное пространство коворкинга",
          aspectRatio: "wide",
        },
        {
          id: "lounge",
          src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=80",
          alt: "Зона отдыха в офисе с мягкой мебелью",
          aspectRatio: "wide",
        },
        {
          id: "window",
          src: "https://images.unsplash.com/photo-1487014679447-9f8336841d4b?auto=format&fit=crop&w=2000&q=80",
          alt: "Рабочее место у окна",
          aspectRatio: "square",
        },
      ],
    },
  },
];
