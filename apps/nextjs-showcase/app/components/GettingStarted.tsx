"use client";

import {
  BookOpen,
  Package,
  Settings,
  Terminal,
  FileCode,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

export function GettingStarted() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--SC-foreground)" }}
          >
            Getting Started
          </h1>
          <p
            className="text-lg"
            style={{ color: "var(--SC-foreground-secondary)" }}
          >
            Learn how to use Component Labs to showcase and test your React
            components
          </p>
        </div>

        {/* Quick Start */}
        <Section icon={<Zap size={20} />} title="Quick Start" id="quick-start">
          <Step number={1} title="Install the Package">
            <p style={{ color: "var(--SC-foreground-secondary)" }}>
              Add Component Labs to your project using your preferred package
              manager:
            </p>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--SC-foreground-muted)" }}
            >
              npm:
            </p>
            <CodeBlock
              code="npm install @component-labs/react-showcase"
              language="bash"
              onCopy={() =>
                copyToClipboard("npm install @component-labs/react-showcase", 1)
              }
              copied={copiedIndex === 1}
            />
            <p
              className="text-sm mt-2"
              style={{ color: "var(--SC-foreground-muted)" }}
            >
              pnpm:
            </p>
            <CodeBlock
              code="pnpm add @component-labs/react-showcase"
              language="bash"
              onCopy={() =>
                copyToClipboard("pnpm add @component-labs/react-showcase", 2)
              }
              copied={copiedIndex === 2}
            />
            <p
              className="text-sm mt-2"
              style={{ color: "var(--SC-foreground-muted)" }}
            >
              yarn:
            </p>
            <CodeBlock
              code="yarn add @component-labs/react-showcase"
              language="bash"
              onCopy={() =>
                copyToClipboard("yarn add @component-labs/react-showcase", 3)
              }
              copied={copiedIndex === 3}
            />
          </Step>

          <Step number={2} title="Initialize Configuration">
            <p style={{ color: "var(--SC-foreground-secondary)" }}>
              Create a showcase configuration file:
            </p>
            <CodeBlock
              code="npx showcase init"
              language="bash"
              onCopy={() => copyToClipboard("npx showcase init", 4)}
              copied={copiedIndex === 4}
            />
            <p
              className="text-sm mt-3"
              style={{ color: "var(--SC-foreground-secondary)" }}
            >
              This creates a{" "}
              <code
                className="px-1.5 py-0.5 rounded text-sm"
                style={{
                  backgroundColor: "var(--SC-background-tertiary)",
                  color: "var(--SC-primary)",
                }}
              >
                showcase.config.ts
              </code>{" "}
              file in your project root.
            </p>
          </Step>

          <Step number={3} title="Run the Showcase">
            <p style={{ color: "var(--SC-foreground-secondary)" }}>
              Start the development server:
            </p>
            <CodeBlock
              code="npx showcase dev"
              language="bash"
              onCopy={() => copyToClipboard("npx showcase dev", 5)}
              copied={copiedIndex === 5}
            />
            <p
              className="text-sm mt-3"
              style={{ color: "var(--SC-foreground-secondary)" }}
            >
              By Default your showcase will open at{" "}
              <code
                className="px-1.5 py-0.5 rounded text-sm"
                style={{
                  backgroundColor: "var(--SC-background-tertiary)",
                  color: "var(--SC-primary)",
                }}
              >
                http://localhost:6060
              </code>
            </p>
          </Step>
        </Section>

        {/* Configuration */}
        <Section
          icon={<Settings size={20} />}
          title="Configuration"
          id="configuration"
        >
          <p
            className="mb-4"
            style={{ color: "var(--SC-foreground-secondary)" }}
          >
            Edit{" "}
            <code
              className="px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: "var(--SC-background-tertiary)",
                color: "var(--SC-primary)",
              }}
            >
              showcase.config.ts
            </code>{" "}
            to customize your showcase:
          </p>
          <CodeBlock
            code={`import { defineConfig } from '@component-labs/react-showcase/config';

export default defineConfig({
  // Pattern to match your showcase files
  include: ['src/**/*.showcase.{tsx,jsx}'],

  // Optional: Exclude certain paths
  exclude: ['node_modules/**', 'dist/**'],

  // Optional: Custom title
  title: 'My Component Library',

  // Optional: Port for dev server (default: 6060)
  port: 6060,
});`}
            language="typescript"
            onCopy={() =>
              copyToClipboard(
                `import { defineConfig } from '@component-labs/react-showcase/config';\n\nexport default defineConfig({\n  include: ['src/**/*.showcase.{tsx,jsx}'],\n  exclude: ['node_modules/**', 'dist/**'],\n  title: 'My Component Library',\n  port: 3000,\n});`,
                6,
              )
            }
            copied={copiedIndex === 6}
          />
        </Section>

        {/* Creating Showcases */}
        <Section
          icon={<FileCode size={20} />}
          title="Creating Showcases"
          id="creating-showcases"
        >
          <div className="mb-6">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--SC-foreground)" }}
            >
              Basic Showcase
            </h3>
            <p
              className="mb-3"
              style={{ color: "var(--SC-foreground-secondary)" }}
            >
              Create a file with the{" "}
              <code
                className="px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--SC-background-tertiary)",
                  color: "var(--SC-primary)",
                }}
              >
                *.showcase.tsx
              </code>{" "}
              extension:
            </p>
            <CodeBlock
              code={`import { YourComponent } from './YourComponent';

// Define metadata
export default {
  title: 'YourComponent',
};

// Create showcase variants
export function Basic() {
  return <YourComponent />;
}

export function WithProps() {
  return <YourComponent text="Hello World" />;
}`}
              language="typescript"
              onCopy={() =>
                copyToClipboard(
                  `import { YourComponent } from './YourComponent';\n\nexport default {\n  title: 'YourComponent',\n};\n\nexport function Basic() {\n  return <YourComponent />;\n}\n\nexport function WithProps() {\n  return <YourComponent text="Hello World" />;\n}`,
                  7,
                )
              }
              copied={copiedIndex === 7}
            />
          </div>

          <div className="mb-6">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--SC-foreground)" }}
            >
              Interactive Controls
            </h3>
            <p
              className="mb-3"
              style={{ color: "var(--SC-foreground-secondary)" }}
            >
              Add interactive props to let users experiment with your
              components:
            </p>
            <CodeBlock
              code={`import { Button } from './Button';
import type { Props } from '@component-labs/react-showcase';

export default {
  title: 'Button',
};

export function Interactive() {
  return <Button variant="primary" size="medium">Click Me</Button>;
}

// Define interactive controls
Interactive.props = {
  variant: {
    type: 'select',
    label: 'Variant',
    default: 'primary',
    options: ['primary', 'secondary', 'outline'],
  },
  size: {
    type: 'select',
    label: 'Size',
    default: 'medium',
    options: ['small', 'medium', 'large'],
  },
  disabled: {
    type: 'boolean',
    label: 'Disabled',
    default: false,
  },
  children: {
    type: 'string',
    label: 'Text',
    default: 'Click Me',
  },
} satisfies Props;`}
              language="typescript"
              onCopy={() =>
                copyToClipboard(
                  `import { Button } from './Button';\nimport type { Props } from '@component-labs/react-showcase';\n\nexport default {\n  title: 'Button',\n};\n\nexport function Interactive() {\n  return <Button variant="primary" size="medium">Click Me</Button>;\n}\n\nInteractive.props = {\n  variant: {\n    type: 'select',\n    label: 'Variant',\n    default: 'primary',\n    options: ['primary', 'secondary', 'outline'],\n  },\n  size: {\n    type: 'select',\n    label: 'Size',\n    default: 'medium',\n    options: ['small', 'medium', 'large'],\n  },\n  disabled: {\n    type: 'boolean',\n    label: 'Disabled',\n    default: false,\n  },\n  children: {\n    type: 'string',\n    label: 'Text',\n    default: 'Click Me',\n  },\n} satisfies Props;`,
                  8,
                )
              }
              copied={copiedIndex === 8}
            />
          </div>

          <div>
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--SC-foreground)" }}
            >
              Available Prop Types
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <PropTypeCard type="string" description="Text input field" />
              <PropTypeCard type="boolean" description="Checkbox toggle" />
              <PropTypeCard type="number" description="Number input field" />
              <PropTypeCard type="select" description="Dropdown with options" />
              <PropTypeCard type="object" description="JSON object editor" />
              <PropTypeCard type="array" description="Array editor" />
            </div>
          </div>
        </Section>

        {/* CLI Commands */}
        <Section
          icon={<Terminal size={20} />}
          title="CLI Commands"
          id="cli-commands"
        >
          <div className="space-y-4">
            <CommandCard
              command="npx showcase dev"
              description="Start the development server with hot reload"
            />
            <CommandCard
              command="npx showcase build"
              description="Build the showcase for production deployment"
            />
            <CommandCard
              command="npx showcase init"
              description="Create a new showcase.config.ts file"
            />
          </div>
        </Section>

        {/* Best Practices */}
        <Section
          icon={<BookOpen size={20} />}
          title="Best Practices"
          id="best-practices"
        >
          <ul className="space-y-3">
            <BestPracticeItem>
              <strong>Naming Convention:</strong> Use{" "}
              <code
                className="px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--SC-background-tertiary)",
                  color: "var(--SC-primary)",
                }}
              >
                *.showcase.tsx
              </code>{" "}
              for all showcase files
            </BestPracticeItem>
            <BestPracticeItem>
              <strong>Organization:</strong> Keep showcase files next to your
              components for easier maintenance
            </BestPracticeItem>
            <BestPracticeItem>
              <strong>Multiple Variants:</strong> Create multiple exports to
              demonstrate different states and configurations
            </BestPracticeItem>
            <BestPracticeItem>
              <strong>Interactive Props:</strong> Use prop controls to let users
              experiment with component behavior
            </BestPracticeItem>
            <BestPracticeItem>
              <strong>Real Use Cases:</strong> Show practical examples of how
              components should be used in production
            </BestPracticeItem>
            <BestPracticeItem>
              <strong>Documentation:</strong> Use descriptive names for showcase
              exports (e.g.,{" "}
              <code
                className="px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--SC-background-tertiary)",
                  color: "var(--SC-primary)",
                }}
              >
                DisabledState
              </code>
              ,{" "}
              <code
                className="px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--SC-background-tertiary)",
                  color: "var(--SC-primary)",
                }}
              >
                WithIcon
              </code>
              )
            </BestPracticeItem>
          </ul>
        </Section>

        {/* Example Files */}
        <Section icon={<Package size={20} />} title="Examples" id="examples">
          <p
            className="mb-4"
            style={{ color: "var(--SC-foreground-secondary)" }}
          >
            Here are the complete example files you can copy and use in your
            project:
          </p>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <FileCode size={18} style={{ color: "var(--SC-primary)" }} />
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--SC-foreground)" }}
              >
                Button.tsx
              </h3>
            </div>
            <p
              className="mb-3 text-sm"
              style={{ color: "var(--SC-foreground-muted)" }}
            >
              A fully functional Button component with variants, sizes, and
              states
            </p>
            <CodeBlock
              code={`import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  disabled = false,
  onClick,
}) => {
  const baseStyles = 'rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:border-blue-300 disabled:text-blue-300',
  };

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={\`\${baseStyles} \${variantStyles[variant]} \${sizeStyles[size]}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`}
              language="typescript"
              onCopy={() =>
                copyToClipboard(
                  `import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  disabled = false,
  onClick,
}) => {
  const baseStyles = 'rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:border-blue-300 disabled:text-blue-300',
  };

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={\`\${baseStyles} \${variantStyles[variant]} \${sizeStyles[size]}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`,
                  100,
                )
              }
              copied={copiedIndex === 100}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileCode size={18} style={{ color: "var(--SC-primary)" }} />
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--SC-foreground)" }}
              >
                Button.showcase.tsx
              </h3>
            </div>
            <p
              className="mb-3 text-sm"
              style={{ color: "var(--SC-foreground-muted)" }}
            >
              Comprehensive showcase demonstrating 6 different use cases with
              interactive controls
            </p>
            <CodeBlock
              code={`import { Button } from './Button';
import type { Props } from '@component-labs/react-showcase';

// Define metadata for this showcase
export default {
  title: 'Button',
};

// Basic Button showcase
export function Primary() {
  return <Button variant="primary">Click me</Button>;
}

// Button with interactive props
export function Interactive() {
  return (
    <Button variant="primary" size="medium">
      Interactive Button
    </Button>
  );
}

// Define interactive props for the Interactive showcase
Interactive.props = {
  variant: {
    type: 'select',
    label: 'Variant',
    default: 'primary',
    options: ['primary', 'secondary', 'outline'],
  },
  size: {
    type: 'select',
    label: 'Size',
    default: 'medium',
    options: ['small', 'medium', 'large'],
  },
  disabled: {
    type: 'boolean',
    label: 'Disabled',
    default: false,
  },
  children: {
    type: 'string',
    label: 'Button Text',
    default: 'Interactive Button',
  },
} satisfies Props;

// All variants showcase
export function AllVariants() {
  return (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}

// All sizes showcase
export function AllSizes() {
  return (
    <div className="flex gap-4 items-center">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
}

// Disabled state
export function Disabled() {
  return (
    <div className="flex gap-4">
      <Button variant="primary" disabled>
        Disabled Primary
      </Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  );
}

// With onClick handler
export function WithClickHandler() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Click Me
    </Button>
  );
}`}
              language="typescript"
              onCopy={() =>
                copyToClipboard(
                  `import { Button } from './Button';
import type { Props } from '@component-labs/react-showcase';

// Define metadata for this showcase
export default {
  title: 'Button',
};

// Basic Button showcase
export function Primary() {
  return <Button variant="primary">Click me</Button>;
}

// Button with interactive props
export function Interactive() {
  return (
    <Button variant="primary" size="medium">
      Interactive Button
    </Button>
  );
}

// Define interactive props for the Interactive showcase
Interactive.props = {
  variant: {
    type: 'select',
    label: 'Variant',
    default: 'primary',
    options: ['primary', 'secondary', 'outline'],
  },
  size: {
    type: 'select',
    label: 'Size',
    default: 'medium',
    options: ['small', 'medium', 'large'],
  },
  disabled: {
    type: 'boolean',
    label: 'Disabled',
    default: false,
  },
  children: {
    type: 'string',
    label: 'Button Text',
    default: 'Interactive Button',
  },
} satisfies Props;

// All variants showcase
export function AllVariants() {
  return (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}

// All sizes showcase
export function AllSizes() {
  return (
    <div className="flex gap-4 items-center">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
}

// Disabled state
export function Disabled() {
  return (
    <div className="flex gap-4">
      <Button variant="primary" disabled>
        Disabled Primary
      </Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  );
}

// With onClick handler
export function WithClickHandler() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Click Me
    </Button>
  );
}`,
                  101,
                )
              }
              copied={copiedIndex === 101}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}

// Helper Components

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  id: string;
  children: React.ReactNode;
}

function Section({ icon, title, id, children }: SectionProps) {
  return (
    <section className="mb-12" id={id}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="p-2 rounded-lg"
          style={{
            backgroundColor: "var(--SC-background-secondary)",
            color: "var(--SC-primary)",
          }}
        >
          {icon}
        </div>
        <h2
          className="text-2xl font-bold"
          style={{ color: "var(--SC-foreground)" }}
        >
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

function Step({ number, title, children }: StepProps) {
  return (
    <div className="mb-8 flex gap-4">
      <div
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
        style={{
          backgroundColor: "var(--SC-sidebar-primary)",
          color: "white",
        }}
      >
        {number}
      </div>
      <div className="flex-1">
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: "var(--SC-foreground)" }}
        >
          {title}
        </h3>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language: string;
  onCopy: () => void;
  copied: boolean;
}

function CodeBlock({ code, onCopy, copied }: CodeBlockProps) {
  return (
    <div className="relative group">
      <pre
        className="p-4 rounded-lg overflow-x-auto text-sm"
        style={{
          backgroundColor: "var(--SC-background-tertiary)",
          border: "1px solid var(--SC-border)",
        }}
      >
        <code style={{ color: "var(--SC-foreground)" }}>{code}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-3 right-3 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          backgroundColor: "var(--SC-background)",
          border: "1px solid var(--SC-border)",
        }}
        title="Copy to clipboard"
      >
        {copied ? (
          <Check size={16} style={{ color: "var(--color-success, #10b981)" }} />
        ) : (
          <Copy size={16} style={{ color: "var(--SC-foreground-muted)" }} />
        )}
      </button>
    </div>
  );
}

interface PropTypeCardProps {
  type: string;
  description: string;
}

function PropTypeCard({ type, description }: PropTypeCardProps) {
  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: "var(--SC-background-secondary)",
        borderColor: "var(--SC-border)",
      }}
    >
      <code
        className="text-sm font-semibold"
        style={{ color: "var(--SC-primary)" }}
      >
        {type}
      </code>
      <p
        className="text-sm mt-1"
        style={{ color: "var(--SC-foreground-muted)" }}
      >
        {description}
      </p>
    </div>
  );
}

interface CommandCardProps {
  command: string;
  description: string;
}

function CommandCard({ command, description }: CommandCardProps) {
  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: "var(--SC-background-secondary)",
        borderColor: "var(--SC-border)",
      }}
    >
      <code
        className="text-sm font-mono px-2 py-1 rounded"
        style={{
          backgroundColor: "var(--SC-background-tertiary)",
          color: "var(--SC-primary)",
        }}
      >
        {command}
      </code>
      <p
        className="text-sm mt-2"
        style={{ color: "var(--SC-foreground-secondary)" }}
      >
        {description}
      </p>
    </div>
  );
}

function BestPracticeItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="flex gap-3"
      style={{ color: "var(--SC-foreground-secondary)" }}
    >
      <span
        className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
        style={{ backgroundColor: "var(--SC-primary)" }}
      />
      <span>{children}</span>
    </li>
  );
}
