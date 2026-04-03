import type { ConnectionStep } from "@/data/projects";

// Diagram images

const diagramImages: Record<string, string> = {
  "automatic-street-light": "/diagrams/automatic-street-light.png",
  "alcohol-detector-buzzer": "/diagrams/alcohol-detector-buzzer.png",
  "tilt-alert-system": "/diagrams/tilt-alert-system.png",
  "mini-timer": "/diagrams/mini-timer.png",
  "disco-robots": "/diagrams/disco-robots.png",
  "automatic-door-gate": "/diagrams/automatic-door-gate.png",
  "automatic-smart-fan": "/diagrams/automatic-smart-fan.png",
  "parking-light-system": "/diagrams/parking-light-system.png",
  "smart-scale": "/diagrams/smart-scale.png",
  "night-lamp": "/diagrams/night-lamp.png",
  "smart-fan": "/diagrams/smart-fan.png",
  "gas-leakage-alarm": "/diagrams/gas-leakage-alarm.png",
  "smart-dustbin": "/diagrams/smart-dustbin.png",
  "smart-home-model": "/diagrams/smart-home-model.png",
  "smart-agriculture": "/diagrams/smart-agriculture.png",
  "temperature-display-alarm": "/diagrams/temperature-display-alarm.png",
  "obstacle-alert": "/diagrams/obstacle-alert.png",
  "anti-theft-alarm": "/diagrams/anti-theft-alarm.png",
  "automatic-parking-gate": "/diagrams/automatic-parking-gate.png",
  "weather-monitoring": "/diagrams/weather-monitoring.png",
  "smart-energy-saver": "/diagrams/smart-energy-saver.png",
  "gas-safety-countdown": "/diagrams/gas-safety-countdown.png",
  "touch-free-attendance": "/diagrams/touch-free-attendance.png",
  "smart-air-quality": "/diagrams/smart-air-quality.png",
  "automatic-gate-counter": "/diagrams/automatic-gate-counter.png",
  "safety-helmet-alert": "/diagrams/safety-helmet-alert.png",
  "room-occupancy": "/diagrams/room-occupancy.png",
  "smart-bus-door": "/diagrams/smart-bus-door.png",
  "smart-glasses-blind": "/diagrams/smart-glasses-blind.png",
  "smart-cane-blind": "/diagrams/smart-cane-blind.png",
  "smart-shoes-blind": "/diagrams/smart-shoes-blind.png",
};

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
  const diagramImage = projectId ? diagramImages[projectId] : undefined;

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
