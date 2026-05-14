import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/portfolio";

export function ProjectTechStack({ technologies }: Pick<Project, "technologies">) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <Badge key={tech} variant="secondary" className="rounded-full border border-stone-300/70 bg-white/90 px-3 py-1 text-xs font-medium text-foreground/90 shadow-sm backdrop-blur dark:border-stone-500/20 dark:bg-stone-950/40 dark:shadow-none">
          {tech}
        </Badge>
      ))}
    </div>
  );
}
