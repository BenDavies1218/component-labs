"use client";

import type React from "react";
import { useState } from "react";

const tabs = [
  { id: "usage", label: "usage.tsx" },
  { id: "button", label: "button.tsx" },
];

const usageCode = `import { Button } from "@component-labs/ui";
import { Input } from "@component-labs/ui";
import { Checkbox } from "@component-labs/ui";

export function LoginForm() {
  return (
    <form className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        type="password"
      />
      <Checkbox label="Remember me" />
      <Button variant="primary" size="lg" fullWidth>
        Sign In
      </Button>
    </form>
  );
}`;

const buttonCode = `import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-transparent",
        ghost: "hover:bg-accent",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);`;

function highlightSyntax(line: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  const keywords = [
    "import",
    "export",
    "from",
    "const",
    "return",
    "default",
    "function",
    "type",
    "interface",
    "extends",
  ];
  const types = ["React", "ButtonProps", "VariantProps"];

  remaining = remaining.replace(/"([^"]*)"/g, (match) => {
    return `__STRING__${match}__ENDSTRING__`;
  });

  const tokens = remaining.split(
    /(\s+|[{}();,=<>:]|__STRING__.*?__ENDSTRING__)/,
  );

  for (const token of tokens) {
    if (token.startsWith("__STRING__")) {
      const str = token.replace("__STRING__", "").replace("__ENDSTRING__", "");
      parts.push(
        <span key={key++} className="text-accent">
          {str}
        </span>,
      );
    } else if (keywords.includes(token)) {
      parts.push(
        <span key={key++} className="text-pink-400">
          {token}
        </span>,
      );
    } else if (types.includes(token)) {
      parts.push(
        <span key={key++} className="text-yellow-400">
          {token}
        </span>,
      );
    } else {
      parts.push(<span key={key++}>{token}</span>);
    }
  }

  return parts;
}

export function CodePreview() {
  const [activeTab, setActiveTab] = useState("usage");

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Developer-friendly API
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Import, compose, and customize. Our components are designed for
            seamless integration.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex border-b border-border bg-secondary">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-mono text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-accent bg-card text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto p-6">
            <pre className="font-mono text-sm leading-relaxed">
              <code className="text-muted-foreground">
                {(activeTab === "usage" ? usageCode : buttonCode)
                  .split("\n")
                  .map((line, i) => (
                    <div key={i} className="flex">
                      <span className="mr-6 inline-block w-6 select-none text-right opacity-40">
                        {i + 1}
                      </span>
                      <span>{highlightSyntax(line)}</span>
                    </div>
                  ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
