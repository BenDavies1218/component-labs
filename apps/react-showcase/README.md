# @component-labs/react-showcase

A lightweight, fast, and developer-friendly alternative to Storybook for showcasing React components. Built with Vite for instant HMR and minimal configuration.

## Features

- 🚀 **Lightning fast** - Powered by Vite
- 📦 **Zero config** - Works out of the box with auto-detection
- 🔥 **Hot reload** - Instant updates as you code
- 🎛️ **Interactive props** - Control component props in real-time
- 🎯 **Type-safe** - Full TypeScript support
- 🎨 **Dark mode** - Built-in theme switching

## Quick Start

### 1. Install the Package

Add Component Labs to your project using your preferred package manager:

```bash
npm install @component-labs/react-showcase
```

```bash
pnpm add @component-labs/react-showcase
```

```bash
yarn add @component-labs/react-showcase
```

**That's it!** The package will automatically build the CLI during installation via the `postinstall` hook.

### 2. Initialize Configuration

Create a showcase configuration file:

```bash
npx showcase init
```

This creates a `showcase.config.ts` file in your project root.

### 3. Run the Showcase

Start the development server:

```bash
npx showcase dev
```

The CLI will automatically build itself before starting if needed. Your showcase will open at `http://localhost:6060`

### Alternative: Package Scripts

You can also add these to your `package.json` for easier access:

```json
{
  "scripts": {
    "showcase": "showcase dev",
    "showcase:build": "showcase build"
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
import { defineConfig } from "@component-labs/react-showcase/config";

export default defineConfig({
  // Pattern to match your showcase files
  include: ["src/**/*.showcase.{tsx,jsx}"],

  // Optional: Exclude certain paths
  exclude: ["node_modules/**", "dist/**"],

  // Optional: Custom title
  title: "My Component Library",

  // Optional: Port for dev server (default: 6060)
  port: 6060,
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

### Available Prop Types

The showcase tool supports various control types:

- `string` - Text input field
- `boolean` - Checkbox toggle
- `number` - Number input field
- `select` - Dropdown with predefined options
- `object` - JSON object editor (advanced)
- `array` - Array editor (advanced)

## CLI Commands

### `dev`

Start the development server with hot reload:

```bash
npx showcase dev

Options:
  -p, --port <port>      Port to run the dev server on
  -c, --config <path>    Path to config file
```

### `build`

Build the showcase for production deployment:

```bash
npx showcase build

Options:
  -c, --config <path>    Path to config file
  -o, --out-dir <path>   Output directory
```

### `init`

Create a new showcase.config.ts file:

```bash
npx showcase init

Options:
  -f, --force    Overwrite existing config file
```

## Example Files

The package includes complete example files that demonstrate best practices. You can find them in the `examples/basic` directory:

### Button.tsx

A fully functional Button component with variants, sizes, and states:

```tsx
import React from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  disabled = false,
  onClick,
}) => {
  const baseStyles =
    "rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:border-blue-300 disabled:text-blue-300",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Button.showcase.tsx

Comprehensive showcase demonstrating 6 different use cases with interactive controls:

```tsx
import { Button } from "./Button";
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
  children: {
    type: "string",
    label: "Button Text",
    default: "Interactive Button",
  },
} satisfies Props;

export function AllVariants() {
  return (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}

export function AllSizes() {
  return (
    <div className="flex gap-4 items-center">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
}

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

export function WithClickHandler() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Click Me
    </Button>
  );
}
```

## Best Practices

- **Naming Convention**: Use `*.showcase.tsx` for all showcase files
- **Organization**: Keep showcase files next to your components for easier maintenance
- **Multiple Variants**: Create multiple exports to demonstrate different states and configurations
- **Interactive Props**: Use prop controls to let users experiment with component behavior
- **Real Use Cases**: Show practical examples of how components should be used in production
- **Documentation**: Use descriptive names for showcase exports (e.g., `DisabledState`, `WithIcon`)

## Deployment

Build and deploy to any static host:

```bash
npx showcase build
cd showcase-dist
```

Then deploy using your preferred platform:

### Vercel

```bash
vercel
```

### Netlify

```bash
netlify deploy --dir=showcase-dist --prod
```

### GitHub Pages

```bash
# Add to .github/workflows/deploy.yml
- run: npx showcase build
- uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./showcase-dist
```

Compatible with:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## License

AGPL-3.0 © [Benjamin Davies](https://github.com/BenDavies1218)

## Links

- **GitHub**: [component-labs](https://github.com/BenDavies1218/component-labs)
- **NPM**: [@component-labs/react-showcase](https://www.npmjs.com/package/@component-labs/react-showcase)
- **Issues**: [GitHub Issues](https://github.com/BenDavies1218/component-labs/issues)
- **Documentation**: Run `npx showcase dev` and click "Getting Started"
