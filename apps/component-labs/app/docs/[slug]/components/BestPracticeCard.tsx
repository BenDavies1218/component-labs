import { CheckCircle2, XCircle } from "lucide-react";
import type { BestPracticeDoc } from "@component-labs/ui/types/docs";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface BestPracticeCardProps {
  practice: BestPracticeDoc;
}

function CodeExample({
  code,
  label,
  type,
}: {
  code: string;
  label: string;
  type: "do" | "dont";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1">
      <div
        className={`flex items-center gap-2 mb-2 text-sm font-medium ${
          type === "do"
            ? "text-green-700 dark:text-green-400"
            : "text-red-700 dark:text-red-400"
        }`}
      >
        {type === "do" ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}
        {label}
      </div>
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 p-1.5 rounded-md bg-secondary/50 hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </button>
        <pre
          className={`p-3 rounded-lg overflow-x-auto text-xs border ${
            type === "do"
              ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900"
              : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"
          }`}
        >
          <code className="font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function BestPracticeCard({ practice }: BestPracticeCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {practice.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {practice.description}
      </p>

      {practice.example && !practice.doExample && !practice.dontExample && (
        <pre className="p-3 rounded-lg overflow-x-auto text-xs bg-secondary/50">
          <code className="font-mono">{practice.example}</code>
        </pre>
      )}

      {(practice.doExample || practice.dontExample) && (
        <div className="grid gap-4 md:grid-cols-2">
          {practice.doExample && (
            <CodeExample
              code={practice.doExample}
              label="Do"
              type="do"
            />
          )}
          {practice.dontExample && (
            <CodeExample
              code={practice.dontExample}
              label="Don't"
              type="dont"
            />
          )}
        </div>
      )}
    </div>
  );
}
