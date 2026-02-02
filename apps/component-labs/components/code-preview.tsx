"use client";

import type React from "react";
import { useState } from "react";

const tabs = [
  { id: "usage", label: "usage.tsx" },
  { id: "button", label: "button.tsx" },
];

const usageCode = `import { Button } from "@component-labs/ui/button";
import { Input } from "@component-labs/ui/input";
import { Checkbox } from "@component-labs/ui/checkbox";

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

const buttonCode = `const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 cursor-pointer",
    "font-medium transition-all duration-200",
    "rounded-lg",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary-600 dark:bg-primary-700 text-white border border-transparent",
          "hover:bg-primary-700 dark:hover:bg-primary-600",
          "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
          "shadow-sm hover:shadow",
        ],
        secondary: [
          "bg-secondary-100 dark:bg-secondary-700 text-black dark:text-white border border-transparent",
          "hover:bg-secondary-200 dark:hover:bg-secondary-600",
          "focus-visible:ring-secondary-500 dark:focus-visible:ring-secondary-400",
          "shadow-sm hover:shadow",
        ],
        outline: [
          "border-2 border-primary-600 text-foreground/70 dark:text-primary-400 bg-transparent",
          "hover:bg-primary-900 dark:hover:bg-primary-950",
          "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        ],
        ghost: [
          "text-foreground/70 dark:text-foreground/80 bg-transparent border-transparent",
          "hover:bg-primary-900 dark:hover:bg-primary-950",
          "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        ],
        destructive: [
          "bg-error-500 dark:bg-error-600 text-white border border-transparent",
          "hover:bg-error-600 dark:hover:bg-error-500",
          "focus-visible:ring-error-500 dark:focus-visible:ring-error-400",
          "shadow-sm hover:shadow",
        ],
        link: [
          "text-primary-600 dark:text-primary-400 underline-offset-4 bg-transparent border-transparent",
          "hover:underline",
          "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        ],
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-11 px-6 text-lg",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    Omit<AccessibleButtonProps, "disabled">,
    VariantProps<typeof buttonVariants> {
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
  /** Loading state - shows loading indicator and disables the button */
  loading?: boolean;
  /** Custom loading indicator element */
  loadingIndicator?: ReactNode;
  /** Icon to display before the button text */
  startIcon?: ReactNode;
  /** Icon to display after the button text */
  endIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      disabled,
      fullWidth,
      loading,
      loadingIndicator,
      startIcon,
      endIcon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <AccessibleButton
        ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
            className,
          }),
        )}
        {...props}
      >
        {loading &&
          (loadingIndicator || <Loader2 className="h-4 w-4 animate-spin" />)}
        {!loading && startIcon && <span className="shrink-0">{startIcon}</span>}
        {children}
        {!loading && endIcon && <span className="shrink-0">{endIcon}</span>}
      </AccessibleButton>
    );
  },
);

Button.displayName = "Button";
`;

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
    "function",
    "type",
    "buttonVariants",
    "interface",
    "extends",
  ];
  const types = [
    "React",
    "ButtonProps",
    "VariantProps",
    "cva",
    "boolean",
    "ReactNode",
    "HTMLButtonElement",
    "typeof",
    ">",
    "<",
    "Omit",
    "AccessibleButtonProps",
    "forwardRef",
  ];

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
        <span key={key++} className="text-yellow-500">
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
        <span key={key++} className="text-green-500">
          {token}
        </span>,
      );
    } else {
      parts.push(
        <span className="text-foreground" key={key++}>
          {token}
        </span>,
      );
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
