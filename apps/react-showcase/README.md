# @component-labs/react-showcase

A lightweight, fast, and developer-friendly alternative to Storybook for showcasing React components. Built with Vite for instant HMR and minimal configuration.

## Features

- 🚀 **Lightning fast** - Powered by Vite
- 📦 **Zero config** - Works out of the box with auto-detection
- 🔥 **Hot reload** - Instant updates as you code
- 🎛️ **Interactive props** - Control component props in real-time
- 🎯 **Type-safe** - Full TypeScript support
- 🎨 **Dark mode** - Built-in theme switching

## Installation

```bash
# npm
npm install --save-dev @component-labs/react-showcase

# pnpm
pnpm add -D @component-labs/react-showcase

# yarn
yarn add -D @component-labs/react-showcase
```

## Quick Start

Just run the dev server - it will automatically create a config file for you:

```bash
npx showcase dev
```

That's it! The showcase will:

1. Auto-detect your project structure (`src/`, `components/`, `lib/`)
2. Find your global CSS file automatically
3. Create a `showcase.config.ts` with sensible defaults
4. Start the dev server at `http://localhost:6060`

### Configuration Options

```typescript
interface ShowcaseConfig {
  // Required: Glob patterns to find showcase files
  showcasePaths: string[];

  // Optional: Global CSS to include
  globalCss?: string;

  // Optional: Global provider component wrapper
  globalProvider?: string;

  // Optional: Dev server port (default: 6060)
  port?: number;

  // Optional: Build output directory (default: './showcase-dist')
  outDir?: string;

  // Optional: Exclude patterns
  exclude?: string[];
}
```

## CLI Commands

### `dev`

Start the development server with auto-initialization:

```bash
npx showcase dev [options]

Options:
  -p, --port <port>      Port to run the dev server on
  -c, --config <path>    Path to config file
```

### `build`

Build static site for production:

```bash
npx showcase build [options]

Options:
  -c, --config <path>    Path to config file
  -o, --out-dir <path>   Output directory
```

### `init`

Manually initialize configuration (runs automatically on first dev/build):

```bash
npx showcase init [options]

Options:
  -f, --force    Overwrite existing config file
```

## Creating Showcase Files

Create a `.showcase.tsx` file next to your component:

```tsx
// Button.showcase.tsx
import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
};

export function Primary() {
  return <Button variant="primary">Primary Button</Button>;
}

export function Secondary() {
  return <Button variant="secondary">Secondary Button</Button>;
}
```

### With Interactive Props

```tsx
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

Playground.props = {
  variant: {
    type: "select",
    options: ["default", "primary", "secondary"],
    default: "primary",
  },
  disabled: {
    type: "boolean",
    default: false,
  },
  children: {
    type: "string",
    default: "Click me",
  },
};
```

## Deployment

Build and deploy to any static host:

```bash
npx showcase build
cd showcase-dist
vercel
```

Compatible with:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

### Additional Information

Go to [@component-labs.com](https://component-labs.com/) for examples and documentation.

## License

AGPL-3.0 © [Benjamin Davies](https://github.com/BenDavies1218)

## Links

- **GitHub**: [component-labs](https://github.com/BenDavies1218/component-labs)
- **Issues**: [GitHub Issues](https://github.com/BenDavies1218/component-labs/issues)
