import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import type { Project } from "@/data/projects";
import projectThumbnails from "@/data/projectThumbnails";

const difficultyColors: Record<string, string> = {
  easy: "bg-easy/10 text-easy border-easy/20",
  medium: "bg-medium/10 text-medium border-medium/20",
  hard: "bg-hard/10 text-hard border-hard/20",
};

interface Props {
  project: Project;
  completed: boolean;
}

export default function ProjectCard({ project, completed }: Props) {
  const thumbnail = projectThumbnails[project.id];
  console.log(`Thumbnail for ${project.id}:`, thumbnail);

  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
        {completed && (
          <div className="absolute right-3 top-3 z-10">
            <CheckCircle className="h-4 w-4 text-success" />
          </div>
        )}

        {/* Thumbnail */}
        {thumbnail && (
          <div className="relative h-40 w-full overflow-hidden bg-muted">
            <img
              src={thumbnail}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}

        <CardContent className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="outline" className={`text-[10px] font-medium uppercase tracking-wider border ${difficultyColors[project.difficulty]}`}>
              {project.difficulty}
            </Badge>
            <Badge variant="outline" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {project.classLevel === "additional" ? "Extra" : `Class ${project.classLevel}`}
            </Badge>
          </div>
          <h3 className="font-display text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {project.components.slice(0, 3).map((c) => (
              <span
                key={c.name}
                className="rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {c.name}
              </span>
            ))}
            {project.components.length > 3 && (
              <span className="rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{project.components.length - 3}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
