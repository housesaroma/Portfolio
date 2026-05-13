import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/portfolio";

export function ProjectTechStack({ technologies }: Pick<Project, "technologies">) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <Badge key={tech} variant="secondary" className="rounded-full border border-stone-500/20 bg-stone-950/40 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur">
          {tech}
        </Badge>
      ))}
    </div>
  );
}
