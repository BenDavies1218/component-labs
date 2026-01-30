import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Settings,
  RefreshCw,
  SlidersHorizontal,
  Shield,
  Moon,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Powered by Vite for instant startup and hot module replacement.",
  },
  {
    icon: Settings,
    title: "Zero Config",
    description: "Works out of the box with automatic component detection.",
  },
  {
    icon: RefreshCw,
    title: "Hot Reload",
    description: "See changes instantly as you code without page refresh.",
  },
  {
    icon: SlidersHorizontal,
    title: "Interactive Props",
    description:
      "Control component props in real-time with auto-generated controls.",
  },
  {
    icon: Shield,
    title: "Type-Safe",
    description: "Full TypeScript support with intelligent prop inference.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Built-in theme switching for testing both appearances.",
  },
];

export function ShowcaseSection() {
  return (
    <section
      id="showcase"
      className="border-t border-border bg-card px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            <Zap className="h-4 w-4" />
            Storybook Alternative
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            React Showcase
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            A lightweight, fast, and developer-friendly alternative to Storybook
            for showcasing React components. Built with Vite for instant HMR.
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Code example */}
        <div className="mb-12 overflow-hidden rounded-xl border border-border bg-background">
          <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              Button.showcase.tsx
            </span>
          </div>
          <div className="overflow-x-auto p-6">
            <pre className="font-mono text-sm leading-relaxed text-muted-foreground">
              <code>{`import { Button } from "./Button";
import type { Props } from "@component-labs/react-showcase";

export default {
  title: "Button",
};

export function Interactive() {
  return (
    <Button variant="primary" size="medium">
      Click Me
    </Button>
  );
}

Interactive.props = {
  variant: {
    type: "select",
    options: ["primary", "secondary", "outline"],
  },
  size: {
    type: "select", 
    options: ["small", "medium", "large"],
  },
  disabled: {
    type: "boolean",
    default: false,
  },
} satisfies Props;`}</code>
            </pre>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/react-showcase">Learn More</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://www.npmjs.com/package/@component-labs/react-showcase"
              target="_blank"
            >
              View on NPM
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
