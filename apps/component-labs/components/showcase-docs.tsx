import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileCode, Terminal, Rocket, Book } from "lucide-react";

const docs = [
  {
    icon: FileCode,
    title: "Creating Showcases",
    description:
      "Learn how to create showcase files with the *.showcase.tsx naming convention and define multiple component variants.",
    href: "#",
  },
  {
    icon: Terminal,
    title: "CLI Commands",
    description:
      "Explore all available CLI commands including dev, build, and init with their options and flags.",
    href: "#",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description:
      "Deploy your component showcase to Vercel, Netlify, GitHub Pages, or any static hosting provider.",
    href: "#",
  },
  {
    icon: Book,
    title: "Configuration",
    description:
      "Customize your showcase with advanced configuration options including custom patterns, ports, and themes.",
    href: "#",
  },
];

const configExample = `import { defineConfig } from "@component-labs/react-showcase/config";

export default defineConfig({
  // Pattern to match your showcase files
  include: ["src/**/*.showcase.{tsx,jsx}"],

  // Optional: Exclude certain paths
  exclude: ["node_modules/**", "dist/**"],

  // Optional: Custom title
  title: "My Component Library",

  // Optional: Port for dev server
  port: 6060,
});`;

const showcaseExample = `import { Button } from "./Button";
import type { Props } from "@component-labs/react-showcase";

export default {
  title: "Button",
};

export function Primary() {
  return <Button variant="primary">Click me</Button>;
}

export function Interactive() {
  return (
    <Button variant="primary" size="medium">
      Interactive Button
    </Button>
  );
}

Interactive.props = {
  variant: {
    type: "select",
    label: "Variant",
    default: "primary",
    options: ["primary", "secondary", "outline"],
  },
  size: {
    type: "select",
    label: "Size",
    default: "medium",
    options: ["small", "medium", "large"],
  },
  disabled: {
    type: "boolean",
    label: "Disabled",
    default: false,
  },
} satisfies Props;`;

export function ShowcaseDocs() {
  return (
    <section id="docs" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Documentation
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Everything you need to know to get the most out of React Showcase.
          </p>
        </div>

        {/* Quick links */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {docs.map((doc) => (
            <Link
              key={doc.title}
              href={doc.href}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/50"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <doc.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mb-1 font-semibold text-foreground group-hover:text-accent">
                {doc.title}
              </h3>
              <p className="text-sm text-muted-foreground">{doc.description}</p>
            </Link>
          ))}
        </div>

        {/* Code examples */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Configuration
            </h3>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  showcase.config.ts
                </span>
              </div>
              <div className="overflow-x-auto p-4">
                <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
                  <code>{configExample}</code>
                </pre>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Showcase File
            </h3>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
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
              <div className="max-h-80 overflow-y-auto overflow-x-auto p-4">
                <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
                  <code>{showcaseExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground">
              Install React Showcase and start building your component library
              today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link
                href="https://github.com/BenDavies1218/component-labs"
                target="_blank"
              >
                View on GitHub
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="https://www.npmjs.com/package/@component-labs/react-showcase"
                target="_blank"
              >
                NPM Package
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
