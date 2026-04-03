import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProgressRing from "@/components/ProgressRing";
import BadgeDisplay from "@/components/BadgeDisplay";
import { useProgress } from "@/hooks/useProgress";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Cpu, Sparkles } from "lucide-react";
import logoImg from "@/assets/logo.png";

const classInfo = [
  { level: "6", label: "Class 6", desc: "Light sensors, buzzers & tilt detection", count: 0 },
  { level: "7", label: "Class 7", desc: "Timers, LEDs & servo motors", count: 0 },
  { level: "8", label: "Class 8", desc: "Temperature, ultrasonic & smart systems", count: 0 },
];

// Count projects per class
classInfo.forEach((cls) => {
  cls.count = projects.filter((p) => p.classLevel === cls.level).length;
});

export default function Index() {
  const { xp, completedCount, totalProjects, getClassProgress } = useProgress();
  const additionalProgress = getClassProgress("additional");
  const additionalCount = projects.filter((p) => p.classLevel === "additional").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — Editorial, clean */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              {totalProjects} Curated Arduino Projects
            </div>
            <div className="mb-6">
              <img src={logoImg} alt="Heyro Logo" className="h-24 w-auto object-contain animate-fade-in-scale" referrerPolicy="no-referrer" />
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Build the future,{" "}
              <span className="text-primary">one circuit at a time.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              A curated collection of Arduino projects for Classes 6–8. Step-by-step schematics, annotated code, and real-world context.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2 rounded-lg">
                <Link to="/projects">
                  <BookOpen className="h-4 w-4" /> Explore Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 rounded-lg">
                <Link to="/getting-started">
                  <Cpu className="h-4 w-4" /> Getting Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Subtle gradient accent */}
        <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>

      {/* Stats — Minimal, typographic */}
      <section className="border-b border-border/50">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-12 px-4 py-10">
          <div className="text-center">
            <div className="font-display text-3xl font-extrabold tracking-tight text-foreground">{completedCount}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">Completed</div>
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div className="text-center">
            <div className="font-display text-3xl font-extrabold tracking-tight text-primary">{xp}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">Total XP</div>
          </div>
          <div className="h-8 w-px bg-border/50" />
          <div className="text-center">
            <div className="font-display text-3xl font-extrabold tracking-tight text-foreground">{totalProjects}</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">Projects</div>
          </div>
        </div>
      </section>

      {/* Class Cards — Asymmetric gallery */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Curriculum
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Structured progression across three academic levels</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {classInfo.map((cls, i) => {
            const prog = getClassProgress(cls.level);
            return (
              <Link key={cls.level} to={`/projects?class=${cls.level}`}>
                <div className={`group relative rounded-lg border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-sm ${i === 1 ? "md:-translate-y-2" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        {cls.label}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cls.desc}</p>
                      <p className="mt-3 font-mono text-xs text-muted-foreground">
                        {cls.count} projects
                      </p>
                    </div>
                    <ProgressRing completed={prog.completed} total={prog.total} size={56} strokeWidth={3} />
                  </div>
                  <div className="mt-4 h-px bg-gradient-to-r from-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional projects */}
        <Link to="/projects?class=additional">
          <div className="group mt-6 flex items-center justify-between rounded-lg border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Additional Collection
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {additionalCount} projects — Smart home, safety, agriculture & assistive tech
              </p>
            </div>
            <ProgressRing completed={additionalProgress.completed} total={additionalProgress.total} size={48} strokeWidth={3} />
          </div>
        </Link>
      </section>

      {/* Badges — Clean section */}
      <section className="border-t border-border/50">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Achievements
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">Milestones earned through project completion</p>
          </div>
          <BadgeDisplay />
        </div>
      </section>

      {/* Footer — Minimal */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Heyro — Learn, Build, Innovate
          </p>
        </div>
      </footer>
    </div>
  );
}
