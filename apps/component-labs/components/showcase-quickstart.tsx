"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const frameworkSteps = {
  react: [
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
      description:
        "Create a showcase configuration file with a single command.",
      code: "npx showcase init",
    },
    {
      number: "03",
      title: "Start showcasing",
      description:
        "Run the development server and start building your component library.",
      code: "npx showcase dev",
    },
  ],
  nextjs: [
    {
      number: "01",
      title: "Install the package",
      description:
        "Add Next.js Showcase to your project using your preferred package manager.",
      code: "npm install @component-labs/nextjs-showcase",
    },
    {
      number: "02",
      title: "Initialize configuration",
      description:
        "Create a showcase configuration file optimized for Next.js.",
      code: "npx showcase-next init",
    },
    {
      number: "03",
      title: "Start showcasing",
      description:
        "Run the Next.js development server with showcase integration.",
      code: "npx showcase-next dev",
    },
  ],
  tanstack: [
    {
      number: "01",
      title: "Coming Soon",
      description: "TanStack Start support is currently in development.",
      code: "npm install @component-labs/tanstack-showcase",
    },
    {
      number: "02",
      title: "Stay Tuned",
      description: "Follow our progress on GitHub for updates.",
      code: "npx showcase-tanstack init",
    },
    {
      number: "03",
      title: "Launch Soon",
      description: "Full TanStack Start integration coming soon.",
      code: "npx showcase-tanstack dev",
    },
  ],
};

export function ShowcaseQuickstart() {
  const [selectedFramework, setSelectedFramework] = useState("react");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const steps =
    frameworkSteps[selectedFramework as keyof typeof frameworkSteps] ??
    frameworkSteps.react;
  const isComingSoon = selectedFramework === "tanstack";

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

        {/* Framework Tabs */}
        <div className="mb-12 flex justify-center">
          <Tabs value={selectedFramework} onValueChange={setSelectedFramework}>
            <TabsList>
              <TabsTrigger value="react">React</TabsTrigger>
              <TabsTrigger value="nextjs">Next.js</TabsTrigger>
              <TabsTrigger value="tanstack" disabled>
                TanStack Start
                <span className="ml-1 text-xs opacity-60">(Soon)</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
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
                    disabled={isComingSoon}
                    className="ml-4 shrink-0 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
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
