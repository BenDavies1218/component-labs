"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Install the package",
    description:
      "Add Component Labs UI to your project using npm, pnpm, or yarn.",
    code: "npm install @component-labs/ui",
  },
  {
    number: "02",
    title: "Configure Tailwind",
    description:
      "Add the Component Labs preset to your Tailwind configuration.",
    code: "npx component-labs init",
  },
  {
    number: "03",
    title: "Import and use",
    description:
      "Start building beautiful interfaces with our production-ready components.",
    code: 'import { Button } from "@component-labs/ui"',
  },
];

export function Quickstart() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="docs" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Quick Installation
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Get up and running in under a minute with our simple setup process.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative flex gap-6 rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary font-mono text-lg font-bold text-accent">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {step.description}
                </p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(step.code, index)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-secondary px-4 py-3 font-mono text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                >
                  <span>
                    <span className="mr-2 text-accent">$</span>
                    {step.code}
                  </span>
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4 opacity-50" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
