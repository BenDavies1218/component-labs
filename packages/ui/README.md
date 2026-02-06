# @component-labs/ui

A modern, accessible React component library built with Tailwind CSS v4 and Ariakit.

## Features

- 🎨 **Tailwind CSS v4** - Utility-first styling with CSS custom properties
- ♿ **Fully Accessible** - Built on Ariakit for WCAG compliance
- 🎭 **Themeable** - Easy customization with CSS variables
- 📦 **Two Installation Methods** - CLI (like shadcn/ui) or NPM package
- 🎯 **TypeScript** - Full type safety
- 🌙 **Dark Mode** - Built-in dark mode support
- 🔧 **Customizable** - Modify components directly or override styles

## Installation

### Method 1: CLI (Recommended)

Install components directly into your project for maximum flexibility:

```bash
# Initialize Component Labs
npx @component-labs/cli init

# Add components
npx @component-labs/cli add button input dialog
```

This copies the source code into your project at `components/ui/` where you can modify it as needed.

### Method 2: NPM Package

Install as a traditional npm package:

```bash
npm install @component-labs/ui
# or
yarn add @component-labs/ui
# or
pnpm add @component-labs/ui
```

## Setup

### CSS Configuration

Add the Component Labs base styles to your global CSS file (e.g., `app/globals.css` or `src/index.css`):

```css
@import "tailwindcss";
@import "@component-labs/ui/base";
```

The base import includes:
- Design tokens (color scales, spacing, etc.)
- CSS custom properties for theming
- Dark mode support
- Base component styles

### TypeScript Configuration

If using path aliases (recommended for CLI installation), configure `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Usage

### CLI Installation

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function MyForm() {
  return (
    <form>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### NPM Package Installation

```tsx
import { Button } from "@component-labs/ui/button";
import { Input } from "@component-labs/ui/input";

function MyForm() {
  return (
    <form>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Available Components

- **Button** - Interactive buttons with multiple variants and sizes
- **Checkbox** - Accessible checkbox inputs with labels
- **Input** - Text inputs with labels, icons, and error states
- **Dialog** - Modal dialogs with backdrop
- **Switch** - Toggle switches
- **Menu** - Dropdown menus with keyboard navigation
- **Combobox** - Searchable select inputs
- **Data Table** - Tables with sorting, filtering, and infinite scroll

## Customization

### Theming with CSS Variables

Override design tokens in your global CSS:

```css
@import "tailwindcss";
@import "@component-labs/ui/base";

@theme {
  /* Primary color customization */
  --color-primary-600: oklch(50% 0.2 250);
  --color-primary-700: oklch(45% 0.2 250);

  /* Border radius */
  --radius-md: 0.5rem;

  /* Custom colors */
  --color-brand: oklch(60% 0.15 180);
}
```

### Available CSS Variables

```css
/* Colors */
--color-primary-50 through --color-primary-950
--color-secondary-50 through --color-secondary-950
--color-error-50 through --color-error-950

/* Base colors */
--color-background
--color-foreground
--color-white
--color-black

/* Border radius */
--radius-md
```

### Dark Mode

Components automatically support dark mode through the `.dark` class:

```tsx
// Add to your root element
<html className="dark">
  <body>
    <App />
  </body>
</html>

// Or use a theme provider
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return <YourApp />;
}
```

### Modifying Components (CLI Only)

When using the CLI, components are copied to your project, allowing direct modification:

```tsx
// components/ui/button.tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "...",
        // Add your custom variant
        brand: "bg-brand text-white hover:bg-brand/90"
      }
    }
  }
);

// Now use your custom variant
<Button variant="brand">Click me</Button>
```

## Component Examples

### Button

```tsx
import { Button } from "@component-labs/ui/button";
import { ChevronRight } from "lucide-react";

<Button variant="default" size="md">
  Default Button
</Button>

<Button variant="outline" size="lg">
  Outline Button
</Button>

<Button variant="ghost" loading>
  Loading...
</Button>

<Button
  startIcon={<ChevronRight />}
  endIcon={<ChevronRight />}
>
  With Icons
</Button>
```

### Input

```tsx
import { Input } from "@component-labs/ui/input";
import { Mail, Search } from "lucide-react";

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>

<Input
  label="Search"
  startIcon={<Search />}
  placeholder="Search..."
/>

<Input
  label="Username"
  error="Username is already taken"
/>
```

### Dialog

```tsx
import { Dialog } from "@component-labs/ui/dialog";
import { Button } from "@component-labs/ui/button";

function MyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Dialog
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
      >
        <div>
          <p>This action cannot be undone.</p>
          <Button onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </>
  );
}
```

## Requirements

- React 19.0.0 or higher
- Tailwind CSS 4.0.0 or higher
- TypeScript 5.0.0 or higher (recommended)

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

See the main [Component Labs repository](https://github.com/component-labs/ui) for contribution guidelines.

## License

MIT © Component Labs
