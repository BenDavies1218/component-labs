# @component-labs/nextjs-showcase

A lightweight, fast, and developer-friendly component showcase tool for Next.js with server-side rendering (SSR) support. Built with Next.js 15+ and the App Router.

## Features

- 🚀 **Server-side rendering** - Components render on the server for better SEO and performance
- 📦 **Zero config** - Works out of the box with auto-detection
- 🔥 **Hot reload** - Instant updates as you code with Next.js Fast Refresh
- 🎛️ **Interactive props** - Control component props in real-time
- 🎯 **Type-safe** - Full TypeScript support
- 🎨 **Dark mode** - Built-in theme switching
- 📱 **Static export** - Deploy anywhere as a static site

## Quick Start

### 1. Install the Package

Add Component Labs Next.js Showcase to your project:

```bash
npm install @component-labs/nextjs-showcase
```

```bash
pnpm add @component-labs/nextjs-showcase
```

```bash
yarn add @component-labs/nextjs-showcase
```

**That's it!** The package will automatically build the CLI during installation via the `postinstall` hook.

### 2. Initialize Configuration

Create a showcase configuration file:

```bash
npx nextjs-showcase init
```

This creates a `showcase.config.ts` file in your project root.

### 3. Run the Showcase

Start the development server:

```bash
npx nextjs-showcase dev
```

The CLI will automatically build itself before starting if needed. Your showcase will open at `http://localhost:3060`

### Alternative: Package Scripts

You can also add these to your `package.json` for easier access:

```json
{
  "scripts": {
    "showcase": "nextjs-showcase dev",
    "showcase:build": "nextjs-showcase build"
  }
}
```

Then run with:

```bash
npm run showcase
```

## Configuration

Edit `showcase.config.ts` to customize your showcase:

```typescript
import { defineConfig } from "@component-labs/nextjs-showcase/config";

export default defineConfig({
  // Pattern to match your showcase files
  showcasePaths: ["src/**/*.showcase.{tsx,jsx}"],

  // Optional: Exclude certain paths
  exclude: ["node_modules/**", "dist/**"],

  // Optional: Custom title
  title: "My Component Library",

  // Optional: Port for dev server (default: 3060)
  port: 3060,

  // Optional: Path to global CSS file
  globalCss: "./src/styles/globals.css",

  // Optional: Path to global provider component
  globalProvider: "./src/GlobalProvider.tsx",
});
```

## Creating Showcases

### Basic Showcase

Create a file with the `*.showcase.tsx` extension:

```tsx
import { YourComponent } from "./YourComponent";

// Define metadata
export default {
  title: "YourComponent",
};

// Create showcase variants
export function Basic() {
  return <YourComponent />;
}

export function WithProps() {
  return <YourComponent text="Hello World" />;
}
```

### Interactive Controls

Add interactive props to let users experiment with your components:

```tsx
import { Button } from "./Button";
import type { Props } from "@component-labs/nextjs-showcase";

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

// Define interactive controls
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
  children: {
    type: "string",
    label: "Text",
    default: "Click Me",
  },
} satisfies Props;
```

## CLI Commands

### `init`

Create a new showcase.config.ts file:

```bash
npx nextjs-showcase init

Options:
  -f, --force    Overwrite existing config file
```

### `dev`

Start the Next.js development server:

```bash
npx nextjs-showcase dev

Options:
  -p, --port <port>      Port to run the dev server on
  -c, --config <path>    Path to config file
```

### `build`

Build the showcase for production deployment:

```bash
npx nextjs-showcase build

Options:
  -c, --config <path>    Path to config file
  -o, --out-dir <path>   Output directory
```

## Deployment

Build and deploy to any static host:

```bash
npx nextjs-showcase build
```

The static files will be generated in the `out` directory (configurable).

Compatible with:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

## Differences from @component-labs/react-showcase

- **SSR Support**: Components render on the server by default
- **Next.js App Router**: Uses Next.js 15+ with App Router instead of Vite
- **Better SEO**: Server-rendered pages are SEO-friendly
- **Static Export**: Easy static site generation for deployment

## License

AGPL-3.0 © [Benjamin Davies](https://github.com/BenDavies1218)

## Links

- **GitHub**: [component-labs](https://github.com/BenDavies1218/component-labs)
- **NPM**: [@component-labs/nextjs-showcase](https://www.npmjs.com/package/@component-labs/nextjs-showcase)
- **Issues**: [GitHub Issues](https://github.com/BenDavies1218/component-labs/issues)
