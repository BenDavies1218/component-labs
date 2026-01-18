# component-labs-showcase

A lightweight, fast, and developer-friendly alternative to Storybook for showcasing React components. Built with Vite for instant HMR and minimal configuration.

## Features

- 🚀 **Lightning fast** - Powered by Vite
- 📦 **Zero config** - Works out of the box
- 🎨 **Simple API** - Just export React components
- 🔥 **Hot reload** - Instant updates
- 🎛️ **Interactive controls** - Built-in control system
- 📱 **Responsive** - Test components at any viewport
- 🎯 **Type-safe** - Full TypeScript support

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
npx component-labs-showcase init
```

This creates a `showcase.config.ts` file:

```typescript
import type { ShowcaseConfig } from 'component-labs-showcase';

const config: ShowcaseConfig = {
  // Glob patterns to find showcase files
  showcasePaths: [
    './src/**/*.showcase.{ts,tsx}',
    './components/**/*.showcase.{ts,tsx}',
  ],

  // Optional: Path to global CSS file
  globalCss: './src/styles/global.css',

  // Optional: Custom app title
  title: 'My Component Library',

  // Optional: Dev server port
  port: 3000,
};

export default config;
```

### 2. Create showcase files

Create a `.showcase.tsx` file next to your component:

```tsx
// Button.showcase.tsx
import { Button } from './Button';

export default {
  title: 'Button',
};

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
npx component-labs-showcase dev
```

Your component showcase will open at `http://localhost:3000`!

## Advanced Usage

### Interactive Controls

Add interactive controls to your showcases:

```tsx
// Button.showcase.tsx
import { Button } from './Button';

export default {
  title: 'Button',
};

export function Interactive() {
  return <Button>Click me</Button>;
}

// Define controls for this showcase
Interactive.controls = {
  variant: {
    type: 'select',
    options: ['primary', 'secondary', 'outline'],
    default: 'primary',
  },
  disabled: {
    type: 'boolean',
    default: false,
  },
  text: {
    type: 'text',
    default: 'Click me',
  },
};
```

### Configuration Options

Full configuration reference (`showcase.config.ts`):

```typescript
import type { ShowcaseConfig } from 'component-labs-showcase';

const config: ShowcaseConfig = {
  // Required: Glob patterns to find showcase files
  showcasePaths: string[];

  // Optional: Path to global CSS file
  globalCss?: string;

  // Optional: Custom app title (default: 'Component Labs')
  title?: string;

  // Optional: Dev server port (default: 3000)
  port?: number;

  // Optional: Output directory for build (default: './showcase-dist')
  outDir?: string;

  // Optional: Base path for deployment (default: '/')
  base?: string;

  // Optional: Path to Tailwind config
  tailwindConfig?: string;

  // Optional: Exclude patterns
  exclude?: string[];

  // Optional: Custom theme colors
  theme?: {
    primary?: string;
    secondary?: string;
    background?: string;
  };
};

export default config;
```

## CLI Commands

### `init`

Initialize a showcase configuration file.

```bash
npx component-labs-showcase init [options]

Options:
  -f, --force    Overwrite existing config file
```

### `dev`

Start the development server.

```bash
npx component-labs-showcase dev [options]

Options:
  -p, --port <port>      Port to run the dev server on
  -c, --config <path>    Path to config file
```

### `build`

Build static site for production.

```bash
npx component-labs-showcase build [options]

Options:
  -c, --config <path>    Path to config file
  -o, --out-dir <path>   Output directory
```

## Showcase File Format

A showcase file is a TypeScript/JSX file with:

1. **Default export**: Metadata about the component
2. **Named exports**: Each showcase variant

```tsx
// MyComponent.showcase.tsx

// 1. Default export with metadata
export default {
  title: 'MyComponent', // Required
  component: MyComponent, // Optional
};

// 2. Named exports are showcase variants
export function Default() {
  return <MyComponent />;
}

export function WithProps() {
  return <MyComponent color="blue" size="large" />;
}

// 3. Optional: Add interactive controls
WithProps.controls = {
  color: {
    type: 'select',
    options: ['blue', 'red', 'green'],
    default: 'blue',
  },
};
```

## Control Types

Available control types:

```typescript
type ControlConfig =
  | { type: 'text'; default?: string }
  | { type: 'boolean'; default?: boolean }
  | { type: 'number'; default?: number }
  | { type: 'select'; options: string[]; default?: string };
```

## Deployment

Build your showcase for production:

```bash
npx component-labs-showcase build
```

Deploy the `showcase-dist` directory to any static hosting:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Cloudflare Pages

### Example: Deploying to Vercel

```bash
npx component-labs-showcase build
cd showcase-dist
vercel
```

## Migration from Storybook

Showcase files are much simpler than Storybook stories:

**Storybook:**
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
```

**Showcase:**
```tsx
import { Button } from './Button';

export default {
  title: 'Button',
};

export function Primary() {
  return <Button variant="primary">Button</Button>;
}
```

## TypeScript Support

Full TypeScript support is included. Import types:

```typescript
import type { ShowcaseConfig, Showcase, ControlConfig } from 'component-labs-showcase';
```

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.

## Support

- GitHub Issues: [Report bugs or request features](https://github.com/yourusername/component-labs/issues)
- Documentation: [Full docs](https://github.com/yourusername/component-labs)
