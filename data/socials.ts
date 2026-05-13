import type { SocialLink } from "@/types/portfolio";

import { profile } from "./profile";

const phoneHref = profile.phone ? `tel:${profile.phone.replace(/\s/g, "")}` : "#contact";

/**
 * Замените ссылку HeadHunter на прямую ссылку на резюме с hh.ru.
 * Файл `public/cv.pdf` — для кнопки «Скачать резюме» (можно скопировать PDF в проект).
 */
export const socials: SocialLink[] = [
  {
    id: "phone",
    platform: "phone",
    label: "Телефон",
    href: phoneHref,
    icon: "phone",
  },
  {
    id: "email",
    platform: "email",
    label: "Почта",
    href: `mailto:${profile.email}`,
    icon: "mail",
  },
  {
    id: "hh",
    platform: "website",
    label: "HeadHunter",
    href: "https://hh.ru",
    icon: "website",
  },
];
