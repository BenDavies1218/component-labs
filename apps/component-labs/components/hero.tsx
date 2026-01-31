"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Meteors } from "@/components/ui/meteors";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MorphingText } from "./MorphingText";
import Logo from "./Logo";

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
              const element = document.getElementById("content-tabs");
              if (element) {
                const offset = 80; // Adjust this value to show more space above tabs
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
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

        <div className="relative z-50 mt-10 h-24">
          <MorphingText
            texts={[
              "Build. Test. Ship. Repeat.",
              "Production-Ready React Components",
              "Test Components in Isolation",
              "Accessibility by Default",
              "TypeScript & Tailwind Powered",
              "Developer Experience First",
              "Build. Test. Ship. Repeat.",
              "Built for Modern React",
              "Customizable & Composable",
              "Zero Configuration Required",
              "Test Driven Component Design",
              "Ship with Confidence",
              "Components You Can Trust",
            ]}
            className="text-lg md:text-2xl [&_span]:bg-linear-to-r! [&_span]:from-yellow-400! [&_span]:via-accent! [&_span]:to-cyan-300! [&_span]:bg-clip-text! [&_span]:text-transparent!"
          />
        </div>
      </div>
    </section>
  );
}
