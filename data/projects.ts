import type { Project } from "@/types/portfolio";

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
        technologies: [
            "Vue 3",
            "Composition API",
            "Pinia",
            "Vite",
            "PrimeVue",
            "TypeScript",
            "REST API",
        ],
        links: [{ label: "Связаться", href: "#contact", type: "other" }],
        featured: true,
        accent: "from-amber-500/30 via-orange-500/15 to-rose-500/25",
        media: {
            type: "text",
            items: [],
            textSections: [
                {
                    title: "Роль и зона ответственности",
                    body: "Участие в развитии корпоративного веб-приложения: сложные таблицы и формы, диалоги, уведомления, выравнивание с внутренними гайдлайнами. Фокус на устойчивом UI, мобильной адаптации и аккуратном рефакторинге без «большого взрыва» для команды.",
                },
                {
                    title: "Технический контекст",
                    body: "Клиент на Vue 3 (Composition API), Pinia, Vite, PrimeVue и TypeScript; интеграция с REST API. Работа велась в связке с бэкендом и аналитикой требований заказчика.",
                },
            ],
        },
    },
    {
        id: "brusnika-flat-valuation",
        title: "Оценка стоимости квартир",
        subtitle: "Учебный проект · Брусника · React",
        description:
            "Веб-сервис для оценки рыночной стоимости жилья и сравнения с аналогами: карта домов и объявлений, прогноз ML, подбор похожих квартир, фильтры и сохранённые полигоны, тепловая карта и таблица аналитики.",
        problem:
            "Без карты и понятных сценариев пользователь не видит контекст рынка: где аналоги, насколько объявление близко к модельной оценке и как сузить выборку по району или параметрам квартиры.",
        features: [
            "Дома на карте, список квартир в доме, оценка и аналоги по выбранному объекту.",
            "Оценка по параметрам, поиск по фильтрам и полигону, избранные полигоны и фильтры.",
            "Тепловая карта с переключением режимов отображения.",
            "Раздел аналитики: сортировки и исключение столбцов из расчёта.",
        ],
        technologies: [
            "React 18 + TypeScript",
            "UnoCSS · кастомная тема",
            "PrimeReact",
            "Redux Toolkit",
            "React Router DOM",
            "Vite",
        ],
        links: [
            {
                label: "Код на GitHub",
                href: "https://github.com/housesaroma/brusnika-map",
                type: "github",
            },
        ],
        featured: true,
        accent: "from-sky-500/20 via-stone-400/18 to-amber-400/22",
        media: {
            type: "carousel",
            videoSrc: "/brusnikamap.mp4",
            items: [
            ],
        },
    },
    {
        id: "udv-org",
        title: "Дерево сотрудников",
        subtitle: "Учебный проект · UDV · React",
        description:
            "Визуализация организационной структуры компании: узлы, связи, масштабирование информации. Упор на то, чтобы дерево оставалось читаемым при росте данных.",
        problem:
            "Оргструктура быстро превращается в «кашу», если не продумать отступы, схлопывание веток и поведение на мобильных устройствах.",
        features: [
            "Навигация по уровням и крупным веткам без потери контекста.",
            "Визуальное разделение ролей и подразделений.",
            "Адаптив: удобный просмотр и на десктопе, и в дороге.",
        ],
        technologies: [
            "React 18 + TypeScript",
            "UnoCSS · кастомная тема",
            "PrimeReact",
            "Redux Toolkit",
            "React Router DOM",
            "Vite",
        ],
        links: [
            {
                label: "Код на GitHub",
                href: "https://github.com/housesaroma/udv-team-map",
                type: "github",
            },
        ],
        featured: true,
        accent: "from-emerald-600/25 via-teal-500/15 to-amber-300/20",
        media: {
            type: "carousel",
            videoSrc: "/udvteammap.mp4",
            items: [
                {
                    id: "map",
                    src: "/udvteammap1.png",
                    alt: "Карта",
                    aspectRatio: "wide",
                },
            ],
        },
    },
    {
        id: "alfa-tracker",
        title: "Таск-трекер",
        subtitle: "Учебный проект · Альфа-Банк · React",
        description:
            "Учебный сервис для постановки и ведения задач: списки, статусы, понятная навигация. Тренировка продуктового мышления в формате, близком к реальным внутренним тулзам банка.",
        problem:
            "В таск-трекерах пользователь теряется между «создал», «в работе» и «готово», если состояния и фильтры не продуманы с первого экрана.",
        features: [
            "Сценарии создания и смены статуса задачи без лишних кликов.",
            "Читаемая типографика и иерархия на плотных списках.",
            "Подготовка интерфейса к разным ширинам экрана.",
        ],
        technologies: [
            "React 18 + TypeScript",
            "UnoCSS · кастомная тема",
            "PrimeReact",
            "Redux Toolkit",
            "React Router DOM",
            "Vite",
        ],
        links: [
            {
                label: "Код на GitHub",
                href: "https://github.com/housesaroma/TaskTrackerAlpha",
                type: "github",
            },
        ],
        featured: true,
        accent: "from-rose-500/25 via-amber-400/20 to-stone-500/20",
        media: {
            type: "carousel",
            videoSrc: "/tasktracker.mp4",
            items: [
                {
                    id: "mytasks",
                    src: "/tasktracker1.png",
                    alt: "Мои задачи",
                    aspectRatio: "wide",
                },
                {
                    id: "diagram1",
                    src: "/tasktracker2.jpg",
                    alt: "Контрольная диаграмма",
                    aspectRatio: "wide",
                },
                {
                    id: "diagram2",
                    src: "/tasktracker3.jpg",
                    alt: "Накопительная диаграмма",
                    aspectRatio: "wide",
                },
            ],
        },
    },
    {
        id: "brusnika-cowork",
        title: "Бронирование коворкингов",
        subtitle: "Учебный проект · Брусника · УрФУ · React",
        description:
            "Сервис онлайн-бронирования коворкингов университета: выбор слота, подтверждение, сценарии отмены. Важно было не перегрузить форму и оставить спокойный визуальный ритм.",
        problem:
            "Бронирование ломается, когда пользователь не понимает занятость, часовой пояс слота и что уже «занято» другим студентом.",
        features: [
            "Ясная сетка доступности и выбранного слота.",
            "Состояния загрузки, успеха и ошибки без паники в копирайте.",
            "Мобильный сценарий «забронировал по дороге в универ».",
        ],
        technologies: [
            "React 18 + TypeScript",
            "UnoCSS · кастомная тема",
            "PrimeReact",
            "Redux Toolkit",
            "React Router DOM",
            "Vite",
        ],
        links: [
            {
                label: "Код на GitHub",
                href: "https://github.com/housesaroma/coworking",
                type: "github",
            },
        ],
        featured: true,
        accent: "from-stone-400/25 via-amber-200/15 to-orange-400/25",
        media: {
            type: "carousel",
            videoSrc: "/coworking.mp4",
            items: [],
        },
    },
];
