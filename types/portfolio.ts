export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "email"
  | "website"
  | "discord"
  | "phone";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  href: string;
  /** Имя иконки из lucide: github, mail, website, phone, … */
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  metric?: string;
}

export interface StatHighlight {
  id: string;
  label: string;
  value: string;
  hint?: string;
}

export interface Profile {
  name: string;
  /** Инициалы для логотипа (например «ЯК»), если не заданы — берутся из имени */
  monogram?: string;
  /** Short tagline under name */
  role: string;
  /** Hero rotating / emphasized words */
  headlineWords: string[];
  /** One-liner for meta + hero */
  tagline: string;
  bio: string;
  /** Longer narrative for About */
  about: string[];
  location: string;
  availability: string;
  resumeUrl?: string;
  /** Международный формат, например +79193919049 */
  phone?: string;
  email: string;
  skills: SkillCategory[];
  experience: ExperienceEntry[];
  achievements: Achievement[];
  stats: StatHighlight[];
  techStack: string[];
}

export type ProjectMediaType = "carousel" | "video" | "single" | "browser";

export interface ProjectMediaItem {
  id: string;
  /** Unsplash or remote URL — must be allowed in next.config */
  src: string;
  alt: string;
  /** Optional width hint for layout */
  aspectRatio?: "video" | "square" | "wide";
}

export interface ProjectMedia {
  type: ProjectMediaType;
  items: ProjectMediaItem[];
  /** For video type — mp4 URL or leave empty to use first item as poster only */
  videoSrc?: string;
  posterSrc?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  type: "github" | "demo" | "case-study" | "other";
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  features: string[];
  technologies: string[];
  links: ProjectLink[];
  media: ProjectMedia;
  featured: boolean;
  accent?: string;
}
