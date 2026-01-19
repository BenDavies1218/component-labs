# component-labs-showcase

A lightweight, fast, and developer-friendly alternative to Storybook for showcasing React components. Built with Vite for instant HMR and minimal configuration.

## Features

- 🚀 **Lightning fast** - Powered by Vite
- 📦 **Zero config** - Works out of the box
- 🎨 **Simple API** - Just export React components
- 🔥 **Hot reload** - Instant updates as you code
- 🎛️ **Interactive props** - Control component props in real-time
- 📱 **Responsive preview** - Test components at any viewport size
- 🎯 **Type-safe** - Full TypeScript support
- 🎨 **Dark mode** - Built-in theme switching
- 🔍 **Component search** - Quickly find what you need

## Installation

```bash
# npm
npm install --save-dev component-labs-showcase

# pnpm
pnpm add -D component-labs-showcase

# yarn
yarn add -D component-labs-showcase

# bun
bun add -D component-labs-showcase
```

## Quick Start

### 1. Initialize configuration

```bash
npx showcase init
```

This creates a `showcase.config.ts` file:

```typescript
import type { ShowcaseConfig } from "component-labs-showcase";

const config: ShowcaseConfig = {
  // Glob patterns to find showcase files
  showcasePaths: [
    "./src/**/*.showcase.{ts,tsx}",
    "./components/**/*.showcase.{ts,tsx}",
  ],

  // Optional: Path to global CSS file
  globalCss: "./src/styles/global.css",

  // Optional: Custom app title
  title: "My Component Library",

  // Optional: Dev server port
  port: 3000,
};

export default config;
```

### 2. Create showcase files

Create a `.showcase.tsx` file next to your component:

```tsx
// Button.showcase.tsx
import { Button } from "./Button";

// Showcase Configuration
export default {
  title: "Button",
  component: Button,
};

// Showcase Variants
export function Primary() {
  return <Button variant="primary">Primary Button</Button>;
}

export function Secondary() {
  return <Button variant="secondary">Secondary Button</Button>;
}

export function WithIcon() {
  return (
    <Button variant="primary">
      <span>🚀</span> Launch
    </Button>
  );
}
```

### 3. Run the development server

```bash
npx showcase dev
```

Your component showcase will open at `http://localhost:3000`!

## Interactive Props

Add interactive props to your showcases to control component behavior in real-time:

```tsx
// Button.showcase.tsx
import { Button } from "./Button";

export default {
  title: "Button",
};

export function Playground(props: {
  variant: string;
  disabled: boolean;
  children: string;
}) {
  return (
    <Button variant={props.variant} disabled={props.disabled}>
      {props.children}
    </Button>
  );
}

// Define props with controls
Playground.props = {
  variant: {
    type: "select",
    options: ["default", "primary", "secondary", "outline", "ghost"],
    default: "primary",
  },
  disabled: {
    type: "boolean",
    default: false,
  },
  children: {
    label: "Text",
    type: "string",
    default: "Click me",
  },
};
```

## Advanced Example: Data Table

Showcase complex components with mock data and internal state:

```tsx
// DataTable.showcase.tsx
import { useState } from "react";
import { DataTable } from "./DataTable";

export default {
  title: "Table",
  component: DataTable,
};

const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "User" },
];

export function BasicTable(props: {
  data: User[];
  label: string;
  description: string;
}) {
  // Manage internal state within the showcase
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  return (
    <DataTable
      data={props.data}
      label={props.label}
      description={props.description}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
    />
  );
}

// Control data and configuration via props
BasicTable.props = {
  label: {
    type: "string",
    default: "User Information Table",
  },
  description: {
    type: "string",
    default: "A simple data table displaying user information.",
  },
  data: {
    type: "array",
    default: mockUsers,
  },
};
```

### Key Patterns:

- **Props for configuration**: Use `props` for data and settings you want to control via the UI
- **State for interaction**: Use `useState` inside your showcase for interactive behavior
- **Mock data**: Include mock data as defaults for realistic previews

## Showcase File Format

A showcase file consists of:

1. **Default export**: Component metadata
2. **Named function exports**: Each showcase variant

```tsx
// Component.showcase.tsx

// 1. Required: Default export with component info
export default {
  title: "Button", // Required - shown in sidebar
  component: Button, // Optional - reference to actual component
};

export function Default(props: { variant?: ButtonProps["variant"] }) {
  return <Button variant={props.variant}>Primary</Button>;
}

Primary.props = {
  variant: {
    type: "select",
    options: [
      "default",
      "primary",
      "secondary",
      "outline",
      "ghost",
      "destructive",
      "link",
    ],
    default: "primary",
  },
};
```

## Prop Types

Available prop control types:

```typescript
type PropConfig = {
  type: "string" | "boolean" | "number" | "select" | "array" | "object";
  label?: string; // Optional display label
  default?: any; // Default value
  options?: string[]; // For 'select' type only
};
```

### Examples:

```tsx
// String input
{
  type: 'string',
  default: 'Hello World',
}

// Boolean checkbox
{
  type: 'boolean',
  default: false,
}

// Number input
{
  type: 'number',
  default: 42,
}

// Select dropdown
{
  type: 'select',
  options: ['small', 'medium', 'large'],
  default: 'medium',
}

// Array/Object data
{
  type: 'array',
  default: [{ id: 1, name: 'Item 1' }],
}
```

## CLI Commands

### `init`

Initialize a showcase configuration file.

```bash
npx showcase init [options]

Options:
  -f, --force    Overwrite existing config file
```

### `dev`

Start the development server.

```bash
npx showcase dev [options]

Options:
  -p, --port <port>      Port to run the dev server on
  -c, --config <path>    Path to config file
```

### `build`

Build static site for production.

```bash
npx showcase build [options]

Options:
  -c, --config <path>    Path to config file
  -o, --out-dir <path>   Output directory
```

## Configuration Options

Full `showcase.config.ts` reference:

```typescript
import type { ShowcaseConfig } from 'component-labs-showcase';

const config: ShowcaseConfig = {
  // Required: Where to find showcase files
  showcasePaths: string[];

  // Optional: Global CSS to include
  globalCss?: string;

  // Optional: App title (default: 'Component Labs')
  title?: string;

  // Optional: Dev server port (default: 3000)
  port?: number;

  // Optional: Build output directory (default: './showcase-dist')
  outDir?: string;

  // Optional: Base path for deployment (default: '/')
  base?: string;
};

export default config;
```

## Deployment

Build your showcase for production:

```bash
npx showcase build
```

Deploy the `showcase-dist` directory to any static hosting:

- **Vercel** - Zero config deployments
- **Netlify** - Drag and drop or CLI
- **GitHub Pages** - Free hosting for open source
- **Cloudflare Pages** - Fast global CDN
- **AWS S3 + CloudFront** - Scalable hosting

### Example: Deploying to Vercel

```bash
npx showcase build
cd showcase-dist
vercel
```

## Migration from Storybook

Component Labs Showcase is simpler and more intuitive than Storybook:

**Storybook:**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};
```

**Component Labs Showcase:**

```tsx
import { Button } from "./Button";

export default {
  title: "Button",
};

export function Primary(props: { variant: string; children: string }) {
  return <Button variant={props.variant}>{props.children}</Button>;
}

Primary.props = {
  variant: {
    type: "select",
    options: ["primary", "secondary"],
    default: "primary",
  },
  children: {
    type: "string",
    default: "Button",
  },
};
```

### Why Switch?

- ✅ **Simpler API** - Just functions, no special types
- ✅ **Faster builds** - Vite vs Webpack
- ✅ **Better DX** - Write components naturally
- ✅ **Smaller bundle** - Minimal dependencies
- ✅ **Type-safe** - Native TypeScript support

## TypeScript Support

Full TypeScript support included:

```typescript
import type {
  ShowcaseConfig,
  Showcase,
  PropConfig,
} from "component-labs-showcase";
```

## Features

### Built-in UI Features

- **Responsive Preview** - Test components at mobile, tablet, and desktop sizes
- **Zoom Controls** - Adjust preview zoom from 50% to 150%
- **Dark Mode** - Toggle between light and dark themes
- **Backdrop Toggle** - View components with or without background
- **Search** - Quickly filter components (press `/` to focus)
- **Error Boundaries** - Gracefully handle component errors

## License

MIT © [Benjamin Davies](https://github.com/benjamindavies)

## Contributing

Contributions welcome! Please open an issue or PR at:

**GitHub**: [component-labs](https://github.com/benjamindavies/component-labs)

## Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/benjamindavies/component-labs/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/benjamindavies/component-labs/discussions)
- 📖 **Documentation**: [GitHub README](https://github.com/benjamindavies/component-labs)

---

Made with ❤️ by developers, for developers.
