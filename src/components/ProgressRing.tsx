interface Props {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

export default function ProgressRing({
  completed,
  total,
  size = 80,
  strokeWidth = 4,
  className = "",
  label,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = total > 0 ? completed / total : 0;
  const offset = circumference * (1 - percent);

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="text-center">
        <span className="font-mono text-sm font-medium text-foreground">
          {completed}/{total}
        </span>
        {label && (
          <p className="text-[10px] text-muted-foreground">{label}</p>
        )}
      </div>
    </div>
  );
}
