"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Copy, Check, Github } from "lucide-react";
import { useState, use } from "react";
import { getComponentDocs } from "@/lib/component-docs";
import { StatusBadge } from "./components/StatusBadge";
import { PerformanceCard } from "./components/PerformanceCard";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <pre className="bg-secondary/50 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
}

export default function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const component = getComponentDocs(slug);

  if (!component) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link
            href="/#components"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to components
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          {/* Content */}
          <div className="space-y-12">
            {/* Title Section */}
            <div>
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
                      {component.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {component.category}
                    </p>
                  </div>
                  {component.status && (
                    <StatusBadge
                      status={component.status}
                      version={component.version}
                    />
                  )}
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                {component.description}
              </p>
            </div>

            {/* Live Preview */}
            {component.preview && (
              <section id="preview">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                  Preview
                </h2>
                <div className="rounded-lg border border-border bg-card p-8">
                  {component.preview()}
                </div>
              </section>
            )}

            {/* Installation */}
            <section id="installation">
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                Installation
              </h2>
              <CodeBlock code={component.installation} />
            </section>

            {/* Usage */}
            <section id="usage">
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                Usage
              </h2>
              <CodeBlock code={component.usage} />
            </section>

            {/* Props (if available) */}
            {component.props && component.props.length > 0 && (
              <section id="props">
                <h2 className="mb-6 text-2xl font-semibold text-foreground">
                  Props
                </h2>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Default
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {component.props.map((prop, index) => (
                        <tr
                          key={index}
                          className="hover:bg-secondary/30 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <code className="text-sm font-mono text-foreground">
                              {prop.name}
                              {prop.required && (
                                <span className="text-error-600 ml-1">*</span>
                              )}
                            </code>
                          </td>
                          <td className="px-4 py-3">
                            <code className="text-sm font-mono text-muted-foreground break-all">
                              {prop.type}
                            </code>
                          </td>
                          <td className="px-4 py-3">
                            <code className="text-sm font-mono text-muted-foreground">
                              {prop.default || "-"}
                            </code>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {prop.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Examples */}
            <section id="examples">
              <h2 className="mb-6 text-2xl font-semibold text-foreground">
                Examples
              </h2>
              <div className="space-y-8">
                {component.examples.map((example, index) => (
                  <div key={index}>
                    <h3 className="mb-3 text-lg font-medium text-foreground">
                      {example.title}
                    </h3>
                    {example.description && (
                      <p className="mb-4 text-sm text-muted-foreground">
                        {example.description}
                      </p>
                    )}
                    <CodeBlock code={example.code} />
                  </div>
                ))}
              </div>
            </section>

            {/* Performance (if available) */}
            {component.performance && (
              <section id="performance">
                <h2 className="mb-6 text-2xl font-semibold text-foreground">
                  Performance
                </h2>
                <PerformanceCard performance={component.performance} />

                {component.performance.rerenderOptimization &&
                  component.performance.rerenderOptimization.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-foreground mb-3">
                        Optimization Techniques
                      </h3>
                      <ul className="space-y-2">
                        {component.performance.rerenderOptimization.map(
                          (item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-green-600 dark:text-green-400 mt-1">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {component.performance.dependencies &&
                  component.performance.dependencies.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-foreground mb-3">
                        Dependencies
                      </h3>
                      <ul className="space-y-2">
                        {component.performance.dependencies.map(
                          (item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </section>
            )}

            {/* Accessibility (if available) */}
            {component.accessibility && component.accessibility.length > 0 && (
              <section id="accessibility">
                <h2 className="mb-6 text-2xl font-semibold text-foreground">
                  Accessibility
                </h2>
                <ul className="space-y-2">
                  {component.accessibility.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-accent mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related Components (if available) */}
            {component.relatedComponents &&
              component.relatedComponents.length > 0 && (
                <section id="related">
                  <h2 className="mb-6 text-2xl font-semibold text-foreground">
                    Related Components
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {component.relatedComponents.map((relatedName) => {
                      const relatedSlug = relatedName
                        .toLowerCase()
                        .replace(/\s+/g, "-");
                      return (
                        <Link
                          key={relatedName}
                          href={`/docs/${relatedSlug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground hover:bg-secondary/50 transition-colors"
                        >
                          {relatedName}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="sticky top-24">
              {/* Quick Links */}
              <nav className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  On This Page
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#preview"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Preview
                    </a>
                  </li>
                  <li>
                    <a
                      href="#installation"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Installation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#usage"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Usage
                    </a>
                  </li>
                  <li>
                    <a
                      href="#examples"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Examples
                    </a>
                  </li>
                  {component.props && component.props.length > 0 && (
                    <li>
                      <a
                        href="#props"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Props
                      </a>
                    </li>
                  )}
                  {component.performance && (
                    <li>
                      <a
                        href="#performance"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Performance
                      </a>
                    </li>
                  )}
                  {component.accessibility &&
                    component.accessibility.length > 0 && (
                      <li>
                        <a
                          href="#accessibility"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Accessibility
                        </a>
                      </li>
                    )}
                  {component.relatedComponents &&
                    component.relatedComponents.length > 0 && (
                      <li>
                        <a
                          href="#related"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Related
                        </a>
                      </li>
                    )}
                </ul>
              </nav>

              {/* Community Links */}
              <div className="mt-6 rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Community
                </h3>
                <a
                  href="https://github.com/component-labs/ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
