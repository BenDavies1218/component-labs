"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Meteors } from "@/components/ui/meteors";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const installCommand = "npm install @component-labs/ui";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Animated particles background */}
      <Particles
        className="absolute inset-0 yellow"
        quantity={100}
        ease={80}
        color="#fff085"
        refresh={false}
      />
      {/* Animated meteors background */}
      <Meteors number={10} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" />
          50+ Components
        </div>

        <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Beautiful React
          <br />
          <span className="text-accent">UI Components</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          A collection of accessible, customizable, and production-ready React
          components. Built with TypeScript, styled with Tailwind CSS.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ShimmerButton
            shimmerColor="gold"
            className="shadow-2xl"
            onClick={() => {
              window.location.href = "#docs";
            }}
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
              Get Started
            </span>
          </ShimmerButton>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com/BenDavies1218/component-labs">
              View on GitHub
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={copyToClipboard}
            className="group inline-flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-3 font-mono text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
          >
            <span className="text-accent">$</span>
            <span>{installCommand}</span>
            {copied ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
