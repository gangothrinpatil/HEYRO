import type { ConnectionStep } from "@/data/projects";

// Diagram images
const diagramModules = import.meta.glob<{ default: string }>('../assets/ASSETS/*.png', { eager: true });

const wireColorMap: Record<string, string> = {
  red: "bg-destructive",
  black: "bg-foreground",
  yellow: "bg-warning",
  blue: "bg-primary",
  green: "bg-success",
  orange: "bg-warning",
  white: "bg-background border border-border",
  purple: "bg-secondary",
};

const wireLabels: Record<string, string> = {
  red: "5V (Power)",
  black: "GND (Ground)",
  yellow: "Signal",
  blue: "Signal",
  green: "Signal",
  orange: "Signal",
  white: "Signal",
  purple: "Signal",
};

interface Props {
  projectId?: string;
  steps: ConnectionStep[];
  signalExplanation?: string[];
}

export default function ConnectionDiagram({ projectId, steps, signalExplanation }: Props) {
  const pathKey = projectId ? Object.keys(diagramModules).find(p => p.endsWith(`${projectId}.png`)) : undefined;
  const diagramImage = pathKey ? diagramModules[pathKey].default : undefined;

  return (
    <div className="space-y-6">
      {/* Wiring Diagram Image */}
      {diagramImage && (
        <div className="rounded-lg border border-border/50 bg-card p-4">
          <h4 className="mb-3 font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Wiring Diagram</h4>
          <img
            src={diagramImage}
            alt={`Wiring diagram for ${projectId}`}
            className="w-full max-w-lg mx-auto rounded"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Wire color legend */}
      <div className="rounded-lg border border-border/50 p-4">
        <h4 className="mb-3 font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Wire Color Guide</h4>
        <div className="flex flex-wrap gap-3">
          {["red", "black", "yellow", "blue", "green", "orange"].map((color) => (
            <div key={color} className="flex items-center gap-1.5">
              <div className={`h-2 w-5 rounded-full ${wireColorMap[color]}`} />
              <span className="font-mono text-[10px] text-muted-foreground">{wireLabels[color]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step) => (
          <div
            key={step.step}
            className="flex items-start gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:border-primary/20"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-foreground text-[10px] font-bold text-background">
              {step.step}
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground">{step.instruction}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <div className={`h-2 w-4 rounded-full ${wireColorMap[step.wireColor]}`} />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {step.pin}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Signal explanation */}
      {signalExplanation && signalExplanation.length > 0 && (
        <div className="rounded-lg border border-warning/10 bg-warning/[0.03] p-4">
          <h4 className="mb-2 font-mono text-[10px] font-medium uppercase tracking-widest text-warning">How Signals Work</h4>
          <ul className="space-y-1.5">
            {signalExplanation.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 text-warning/50">—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
