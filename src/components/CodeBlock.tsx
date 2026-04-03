import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface Props {
  code: string;
  explanations?: string[];
}

export default function CodeBlock({ code, explanations }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg border border-border/50 bg-foreground/[0.03]">
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Arduino (.ino)</span>
          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground">
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className="font-mono text-foreground">{code}</code>
        </pre>
      </div>
      {explanations && explanations.length > 0 && (
        <div className="rounded-lg border border-primary/10 bg-primary/[0.03] p-4">
          <h4 className="mb-2 font-display text-xs font-semibold uppercase tracking-widest text-primary">Code Breakdown</h4>
          <ul className="space-y-1.5">
            {explanations.map((e, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 text-primary/50">—</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
