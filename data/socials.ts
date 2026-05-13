import type { SocialLink } from "@/types/portfolio";

import { profile } from "./profile";

const phoneHref = profile.phone ? `tel:${profile.phone.replace(/\s/g, "")}` : "#contact";

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
    label: "Резюме на hh.ru",
    href: "https://ekaterinburg.hh.ru/resume/5e57c187ff1056d9ee0039ed1f457032794545",
    icon: "website",
  },
];
