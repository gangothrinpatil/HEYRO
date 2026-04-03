import { getCompetitionIdea } from "@/data/competitions";
import { Badge } from "@/components/ui/badge";
import { Trophy, Sparkles, Target, Presentation } from "lucide-react";

const levelColors: Record<string, string> = {
  school: "bg-[hsl(var(--easy))] text-white",
  district: "bg-[hsl(var(--info))] text-white",
  state: "bg-[hsl(var(--medium))] text-white",
  national: "bg-[hsl(var(--hard))] text-white",
};

const levelLabels: Record<string, string> = {
  school: "🏫 School Level",
  district: "🏛️ District Level",
  state: "🗺️ State Level",
  national: "🇮🇳 National Level",
};

interface Props {
  projectId: string;
}

export default function CompetitionTab({ projectId }: Props) {
  const idea = getCompetitionIdea(projectId);

  if (!idea) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
        <Trophy className="mx-auto h-10 w-10 opacity-40" />
        <p className="mt-3">Competition ideas for this project are coming soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Competition Title & Level */}
      <div className="rounded-xl border bg-gradient-to-r from-primary/5 to-secondary/5 p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge className={levelColors[idea.level]}>{levelLabels[idea.level]}</Badge>
        </div>
        <h3 className="font-display text-xl font-bold text-foreground">🏆 {idea.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{idea.description}</p>
      </div>

      {/* Suitable Competitions */}
      <div className="rounded-xl border p-5">
        <h4 className="flex items-center gap-2 font-display text-base font-semibold text-foreground mb-3">
          <Target className="h-4 w-4 text-primary" />
          Suitable Competitions
        </h4>
        <div className="flex flex-wrap gap-2">
          {idea.competitionNames.map((name) => (
            <Badge key={name} variant="outline" className="text-xs py-1">
              {name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Enhancements */}
      <div className="rounded-xl border p-5">
        <h4 className="flex items-center gap-2 font-display text-base font-semibold text-foreground mb-3">
          <Sparkles className="h-4 w-4 text-warning" />
          How to Upgrade for Competition
        </h4>
        <ul className="space-y-2">
          {idea.enhancements.map((e, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-warning/15 text-xs font-bold text-warning">
                {i + 1}
              </span>
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Presentation Tips */}
      <div className="rounded-xl border bg-accent/5 p-5">
        <h4 className="flex items-center gap-2 font-display text-base font-semibold text-foreground mb-3">
          <Presentation className="h-4 w-4 text-accent" />
          Presentation Tips for Judges
        </h4>
        <ul className="space-y-2">
          {idea.presentationTips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 text-accent">💡</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
