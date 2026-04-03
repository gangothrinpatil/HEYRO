import { Link, useLocation } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { Cpu, BookOpen, Rocket, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { to: "/", label: "Home", icon: Rocket },
  { to: "/projects", label: "Projects", icon: BookOpen },
  { to: "/getting-started", label: "Getting Started", icon: Cpu },
];

export default function Navbar() {
  const { xp, completedCount, totalProjects } = useProgress();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-border/50">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-12 items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Heyro Logo" className="h-full w-auto object-contain" referrerPolicy="no-referrer" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Heyro
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-foreground/5 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* XP — minimal pill */}
          <div className="flex items-center gap-1 rounded-full border border-border/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <span className="font-mono">{xp}</span>
            <span className="text-primary">XP</span>
          </div>
          {/* Progress pill */}
          <div className="hidden items-center gap-1 rounded-full border border-border/50 px-2.5 py-1 text-xs font-medium text-muted-foreground sm:flex">
            <span className="font-mono">{completedCount}</span>
            <span>/</span>
            <span className="font-mono">{totalProjects}</span>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 glass-panel">
              <SheetTitle className="font-display text-sm font-semibold tracking-tight">Navigation</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-foreground/5 text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
