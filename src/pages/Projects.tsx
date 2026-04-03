import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useProgress } from "@/hooks/useProgress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const filters = [
  { value: "all", label: "All" },
  { value: "6", label: "Class 6" },
  { value: "7", label: "Class 7" },
  { value: "8", label: "Class 8" },
  { value: "additional", label: "Additional" },
];

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialClass = searchParams.get("class") || "all";
  const [filter, setFilter] = useState(initialClass);
  const [search, setSearch] = useState("");
  const { isComplete } = useProgress();

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesClass = filter === "all" || p.classLevel === filter;
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesClass && matchesSearch;
    });
  }, [filter, search]);

  const handleFilterChange = (val: string) => {
    setFilter(val);
    if (val === "all") {
      searchParams.delete("class");
    } else {
      searchParams.set("class", val);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Projects
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {projects.length} hands-on Arduino projects to explore
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={filter} onValueChange={handleFilterChange}>
            <TabsList className="h-9">
              {filters.map((f) => (
                <TabsTrigger key={f.value} value={f.value} className="text-xs">
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-sm"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              completed={isComplete(project.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">
            <p className="text-sm">No projects found. Try a different search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
