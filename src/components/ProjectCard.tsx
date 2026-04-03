import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          <div className="relative h-56 w-full overflow-hidden bg-muted">
            <img
              src={thumbnail}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}

      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`text-xs font-medium uppercase tracking-wider border ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {project.classLevel === "additional" ? "Extra" : `Class ${project.classLevel}`}
          </Badge>
        </div>
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.components.slice(0, 3).map((c) => (
            <span
              key={c.name}
              className="rounded-md border border-border/50 bg-muted/50 px-2 py-1 font-mono text-xs text-muted-foreground"
            >
              {c.name}
            </span>
          ))}
          {project.components.length > 3 && (
            <span className="rounded-md border border-border/50 bg-muted/50 px-2 py-1 font-mono text-xs text-muted-foreground">
              +{project.components.length - 3}
            </span>
          )}
        </div>
        
        {/* Ask Heyro Button */}
        <div className="pt-4 border-t border-border/50">
          <Button
            variant="ghost"
            size="lg"
            className="w-full gap-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/5"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('open-heyro-chat', { detail: { projectId: project.id, projectTitle: project.title } }));
            }}
          >
            <img src="/logo.png" alt="Heyro" className="h-8 w-8 object-contain" referrerPolicy="no-referrer" />
            Ask Heyro
          </Button>
        </div>
      </CardContent>
      </Card>
    </Link>
  );
}
