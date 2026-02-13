"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { TabsCompound } from "@component-labs/ui/tabs";

const frameworks = [
  {
    id: "react",
    name: "React",
    installCommand: "npm install @component-labs/react-showcase",
    description:
      "A lightweight, fast alternative to Storybook for showcasing React components. Built with Vite for instant HMR.",
  },
  {
    id: "nextjs",
    name: "Next.js",
    installCommand: "npm install @component-labs/nextjs-showcase",
    description:
      "Showcase your Next.js components with full SSR support. Perfect for server components and client components alike.",
  },
  {
    id: "tanstack",
    name: "TanStack Start",
    installCommand: "npm install @component-labs/tanstack-showcase",
    description:
      "Coming soon: Full-stack React framework support with TanStack Start integration.",
    comingSoon: true,
  },
];

export function ShowcaseHero() {
  const [selectedFramework, setSelectedFramework] = useState("react");
  const [copied, setCopied] = useState(false);

  const currentFramework =
    frameworks.find((f) => f.id === selectedFramework) ?? frameworks[0];

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(currentFramework.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.22_0_0)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.22_0_0)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Storybook Alternative
        </div>

        <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Component
          <br />
          <span className="text-accent">Showcase</span>
        </h1>

        {/* Framework Tabs */}
        <div className="mb-10 flex justify-center">
          <TabsCompound
            defaultSelectedId="react"
            selectedId={selectedFramework}
            onSelectIdChange={(id) => setSelectedFramework(id ?? "react")}
            variant="default"
          >
            <TabsCompound.List>
              {frameworks.map((framework) => (
                <TabsCompound.Tab key={framework.id} id={framework.id}>
                  {framework.name}
                  {framework.comingSoon && (
                    <span className="ml-1 text-xs opacity-60">(Soon)</span>
                  )}
                </TabsCompound.Tab>
              ))}
            </TabsCompound.List>
          </TabsCompound>
        </div>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          {currentFramework.description}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={copyToClipboard}
            disabled={currentFramework.comingSoon}
            className="group flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-3 font-mono text-sm transition-colors hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="text-muted-foreground">$</span>
            <span className="text-foreground">
              {currentFramework.installCommand}
            </span>
            {copied ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            )}
          </button>

          <Button
            size="lg"
            asChild
            disabled={currentFramework.comingSoon}
          >
            <a href="#quickstart">Get Started</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-border pt-8 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">10x</div>
            <div className="text-sm text-muted-foreground">
              Faster than Storybook
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="text-2xl font-bold text-foreground">Zero</div>
            <div className="text-sm text-muted-foreground">
              Configuration needed
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="text-2xl font-bold text-foreground">100%</div>
            <div className="text-sm text-muted-foreground">
              TypeScript support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
