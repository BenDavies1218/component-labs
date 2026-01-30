"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Install the package",
    description:
      "Add React Showcase to your project using your preferred package manager.",
    code: "npm install @component-labs/react-showcase",
  },
  {
    number: "02",
    title: "Initialize configuration",
    description: "Create a showcase configuration file with a single command.",
    code: "npx showcase init",
  },
  {
    number: "03",
    title: "Start showcasing",
    description:
      "Run the development server and start building your component library.",
    code: "npx showcase dev",
  },
];

export function ShowcaseQuickstart() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section
      id="quickstart"
      className="border-t border-border bg-card px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Get Started in 3 Steps
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From install to running showcase in under a minute.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6 sm:flex-row sm:items-start sm:gap-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-lg font-bold text-accent">
                {step.number}
              </div>

              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mb-4 text-muted-foreground">{step.description}</p>

                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-4 py-3">
                  <code className="font-mono text-sm text-foreground">
                    $ {step.code}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(step.code, index)}
                    className="ml-4 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
