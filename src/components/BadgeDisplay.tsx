import { useProgress } from "@/hooks/useProgress";

export default function BadgeDisplay() {
  const { getUnlockedBadges, getLockedBadges } = useProgress();
  const unlocked = getUnlockedBadges();
  const locked = getLockedBadges();

  return (
    <div className="space-y-8">
      {unlocked.length > 0 && (
        <div>
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Earned
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {unlocked.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-2 rounded-lg border border-primary/10 bg-primary/[0.03] p-4 text-center"
                style={{ animation: "badge-unlock 0.5s ease-out" }}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="font-display text-xs font-semibold tracking-tight text-foreground">{badge.title}</span>
                <span className="text-[10px] leading-relaxed text-muted-foreground">{badge.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {locked.length > 0 && (
        <div>
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Locked
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {locked.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border/50 p-4 text-center opacity-40"
              >
                <span className="text-2xl grayscale">🔒</span>
                <span className="font-display text-xs font-semibold tracking-tight text-muted-foreground">{badge.title}</span>
                <span className="text-[10px] leading-relaxed text-muted-foreground">{badge.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
