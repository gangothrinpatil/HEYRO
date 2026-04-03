import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { projects } from "@/data/projects";
import { getComponentImage } from "@/data/componentImages";
import Navbar from "@/components/Navbar";
import ConnectionDiagram from "@/components/ConnectionDiagram";
import CodeBlock from "@/components/CodeBlock";
import UploadSteps from "@/components/UploadSteps";
import CompetitionTab from "@/components/CompetitionTab";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import ProjectAssistantPanel from "@/components/ProjectAssistantPanel";
import { useProgress } from "@/hooks/useProgress";
import { useAssistantStore } from "@/hooks/useAssistant";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Lightbulb, Cable, Code, Upload, Trophy, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const difficultyColors: Record<string, string> = {
  easy: "bg-easy/10 text-easy border-easy/20",
  medium: "bg-medium/10 text-medium border-medium/20",
  hard: "bg-hard/10 text-hard border-hard/20",
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const { isComplete, markComplete } = useProgress();
  const { toast } = useToast();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-sm text-muted-foreground">Project not found</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const completed = isComplete(project.id);

  const handleComplete = () => {
    if (completed) return;
    const { xpGained, newBadges } = markComplete(project.id);
    toast({
      title: `+${xpGained} XP earned`,
      description: `You completed "${project.title}"`,
    });
    newBadges.forEach((badge) => {
      setTimeout(() => {
        toast({
          title: `${badge.icon} ${badge.title} Unlocked`,
          description: badge.description,
        });
      }, 500);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/projects"
          className="mb-6 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Projects
        </Link>

        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={`text-[10px] font-medium uppercase tracking-wider border ${difficultyColors[project.difficulty]}`}>
                {project.difficulty}
              </Badge>
              <Badge variant="outline" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {project.classLevel === "additional" ? "Additional" : `Class ${project.classLevel}`}
              </Badge>
              {completed && (
                <Badge variant="outline" className="gap-1 text-[10px] font-medium uppercase tracking-wider text-success border-success/20">
                  <CheckCircle className="h-2.5 w-2.5" /> Completed
                </Badge>
              )}
            </div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              {project.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group rounded-full p-[2px] overflow-hidden">
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,theme(colors.emerald.400),theme(colors.blue.500),theme(colors.purple.500),theme(colors.emerald.400))] animate-[rotate-gradient_4s_linear_infinite] blur-sm opacity-80"></div>
              <Button
                onClick={() => setIsAssistantOpen(true)}
                variant="outline"
                size="lg"
                className="relative rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border-none gap-2 h-11 px-5"
              >
                <img src="/logo.png" alt="Heyro" className="h-5 w-5 object-contain" referrerPolicy="no-referrer" />
                Ask Heyro
              </Button>
            </div>
            <Button
              onClick={handleComplete}
              disabled={completed}
              size="lg"
              variant={completed ? "outline" : "default"}
              className="rounded-lg"
            >
              {completed ? (
                <>
                  <CheckCircle className="h-4 w-4" /> Completed
                </>
              ) : (
                <>Mark as Complete</>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="h-9 w-full justify-start overflow-x-auto border-b border-border/50 bg-transparent p-0">
            <TabsTrigger value="overview" className="gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Lightbulb className="h-3 w-3" /> Overview
            </TabsTrigger>
            <TabsTrigger value="connection" className="gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Cable className="h-3 w-3" /> Connection
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Code className="h-3 w-3" /> Code
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Upload className="h-3 w-3" /> Upload
            </TabsTrigger>
            {project.videoUrl && (
              <TabsTrigger value="video" className="gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                <Play className="h-3 w-3" /> Video
              </TabsTrigger>
            )}
            <TabsTrigger value="competition" className="gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Trophy className="h-3 w-3" /> Competition
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8 space-y-8">
            <div>
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">What You'll Learn</h3>
              <ul className="space-y-2">
                {project.whatYouLearn.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Components</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.components.map((comp) => {
                  const compImage = getComponentImage(comp.name);
                  return (
                    <div key={comp.name} className="flex items-start gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:border-primary/20">
                      {compImage ? (
                        <img
                          src={compImage}
                          alt={comp.name}
                          className="h-10 w-10 rounded object-cover flex-shrink-0"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground">IC</div>
                      )}
                      <div>
                        <p className="text-sm font-medium tracking-tight text-foreground">{comp.name}</p>
                        <p className="text-xs text-muted-foreground">{comp.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="connection" className="mt-8">
            <ConnectionDiagram
              projectId={project.id}
              steps={project.connectionSteps}
              signalExplanation={project.signalExplanation}
            />
          </TabsContent>

          <TabsContent value="code" className="mt-8">
            <CodeBlock code={project.code} explanations={project.codeExplanation} />
          </TabsContent>

          <TabsContent value="upload" className="mt-8">
            <UploadSteps />
          </TabsContent>

          {project.videoUrl && (
            <TabsContent value="video" className="mt-8 space-y-4">
              <div>
                <h3 className="mb-1 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">Video Tutorial</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Step-by-step guide for building the {project.title}.
                </p>
              </div>
              <YouTubeEmbed videoUrl={project.videoUrl} title={project.title} />
            </TabsContent>
          )}

          <TabsContent value="competition" className="mt-8">
            <CompetitionTab projectId={project.id} />
          </TabsContent>
        </Tabs>
      </div>
      
      <ProjectAssistantPanel 
        isOpen={isAssistantOpen} 
        onOpenChange={setIsAssistantOpen} 
        projectTitle={project.title} 
      />
    </div>
  );
}
