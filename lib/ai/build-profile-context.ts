import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

/** Текстовый контекст о кандидате для AI-ответов HR. */
export function buildProfileContext(): string {
  const skills = profile.skills.map((g) => `${g.title}: ${g.items.join("; ")}`).join("\n");
  const experience = profile.experience
    .map(
      (e) =>
        `${e.role} · ${e.company} (${e.period}, ${e.location}). ${e.summary} ${e.highlights.join(" ")}`,
    )
    .join("\n");
  const projectLines = projects
    .filter((p) => p.featured)
    .map(
      (p) =>
        `${p.title} (${p.subtitle}): ${p.description} Задача: ${p.problem}. Сделано: ${p.features.join("; ")}. Стек: ${p.technologies.join(", ")}`,
    )
    .join("\n");

  return `
Имя: ${profile.name}
Роль: ${profile.role}
Локация: ${profile.location}
Доступность: ${profile.availability}
Кратко: ${profile.bio}
Теглайн: ${profile.tagline}
О себе: ${profile.about.join(" ")}
Навыки:
${skills}
Опыт:
${experience}
Проекты:
${projectLines}
Стек (теги): ${profile.techStack.join(", ")}
Контакты: ${profile.email}, ${profile.phone ?? "—"}
`.trim();
}
