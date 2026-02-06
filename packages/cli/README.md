# @component-labs/cli

Command-line tool for installing Component Labs components into your project.

## Installation

You don't need to install the CLI globally. Use `npx` to run it directly:

```bash
npx @component-labs/cli init
```

## Commands

### `init`

Initialize Component Labs in your project.

```bash
npx @component-labs/cli init
```

**What it does:**
1. Creates `components.json` configuration file
2. Detects your project structure (Next.js, Vite, etc.)
3. Optionally injects CSS imports into your global stylesheet
4. Sets up TypeScript path aliases

**Interactive prompts:**
- TypeScript support (required)
- Style preference
- Tailwind config location
- Global CSS file location
- CSS variables for theming
- Component import alias
- Utils import alias

**Example configuration created:**
```json
{
  "$schema": "https://componentlabs.dev/schema.json",
  "style": "default",
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

### `add`

Add components to your project.

```bash
# Add specific components
npx @component-labs/cli add button input dialog

# Interactive selection
npx @component-labs/cli add

# Skip confirmation prompts
npx @component-labs/cli add button --yes

# Specify working directory
npx @component-labs/cli add button --cwd ./my-project
```

**What it does:**
1. Validates `components.json` exists
2. Checks component availability in registry
3. Installs npm dependencies
4. Copies component files to your project
5. Includes required utilities (e.g., `lib/utils.ts`)
6. Handles registry dependencies automatically

**Options:**
- `--yes, -y` - Skip confirmation prompts
- `--cwd <path>` - Specify working directory (default: `process.cwd()`)

## Workflow

### First Time Setup

```bash
# 1. Initialize in your project
npx @component-labs/cli init

# 2. Add your first components
npx @component-labs/cli add button input

# 3. Start using them
```

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function MyForm() {
  return (
    <form>
      <Input label="Email" type="email" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Adding More Components

```bash
# Add specific components
npx @component-labs/cli add dialog checkbox switch

# Or select interactively
npx @component-labs/cli add
```

## Configuration

### components.json

The `components.json` file stores your project configuration:

| Field | Description | Example |
|-------|-------------|---------|
| `style` | Component style variant | `"default"` |
| `tsx` | TypeScript usage (required) | `true` |
| `tailwind.config` | Tailwind config path | `"tailwind.config.ts"` |
| `tailwind.css` | Global CSS file path | `"app/globals.css"` |
| `tailwind.cssVariables` | Use CSS variables | `true` |
| `aliases.components` | Component import alias | `"@/components"` |
| `aliases.utils` | Utils import alias | `"@/lib/utils"` |
| `aliases.ui` | UI component alias | `"@/components/ui"` |

### CSS Setup

After running `init`, your global CSS should contain:

```css
@import "tailwindcss";
@import "@component-labs/ui/base";

/* Your custom styles */
```

If you skipped automatic injection, add these imports manually.

### TypeScript Setup

Update `tsconfig.json` to support path aliases:

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

## Available Components

Run `npx @component-labs/cli add` to see the full list:

- `button` - Interactive buttons with variants
- `checkbox` - Accessible checkboxes
- `input` - Text inputs with labels
- `dialog` - Modal dialogs
- `switch` - Toggle switches
- `menu` - Dropdown menus
- `combobox` - Searchable selects
- `data-table` - Data tables with features

## How It Works

### Component Installation

When you run `add button`, the CLI:

1. **Validates** - Checks `components.json` exists
2. **Resolves** - Looks up component in registry
3. **Collects** - Gathers dependencies and registry deps
4. **Installs** - Runs `npm/yarn/pnpm install` for dependencies
5. **Copies** - Writes component files to your project
6. **Includes** - Adds required utilities (like `cn()`)

### File Structure Created

```
your-project/
├── components.json
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── ...
│   └── lib/
│       └── utils.ts
└── app/
    └── globals.css  (updated with imports)
```

## Customization

Since components are copied to your project, you can:

### Modify Components

```tsx
// components/ui/button.tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, ...props }, ref) => {
    // Add your custom logic
    const customVariant = variant === 'custom' ? 'my-custom-class' : variant;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant: customVariant, size }))}
        {...props}
      />
    );
  }
);
```

### Extend Variants

```tsx
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "...",
        // Add your variant
        brand: "bg-brand-600 hover:bg-brand-700"
      }
    }
  }
);
```

### Override Styles

```css
/* In your globals.css */
@import "tailwindcss";
@import "@component-labs/ui/base";

@theme {
  /* Override Component Labs colors */
  --color-primary-600: oklch(50% 0.2 250);
}
```

## Troubleshooting

### "components.json not found"

Run `npx @component-labs/cli init` first to create the configuration.

### "Unknown component: xyz"

The component doesn't exist in the registry. Run `npx @component-labs/cli add` to see available components.

### "Could not find package.json"

Make sure you're running the CLI from your project root, or use `--cwd` to specify the path.

### Import errors

Ensure your `tsconfig.json` has the correct path aliases:

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

### Styling not applied

Make sure your global CSS has:

```css
@import "tailwindcss";
@import "@component-labs/ui/base";
```

## Examples

### Next.js Project

```bash
# In your Next.js project root
npx @component-labs/cli init
# Select: app/globals.css, @/components, @/lib/utils

npx @component-labs/cli add button input dialog
```

### Vite Project

```bash
# In your Vite project root
npx @component-labs/cli init
# Select: src/index.css, @/components, @/lib/utils

npx @component-labs/cli add button input
```

## Comparison to NPM Installation

| Feature | CLI Installation | NPM Package |
|---------|-----------------|-------------|
| Setup | `npx @component-labs/cli init` | `npm install @component-labs/ui` |
| Updates | Manual re-add | `npm update` |
| Customization | Edit source directly | Override CSS vars |
| Import | `@/components/ui/button` | `@component-labs/ui/button` |
| Size | Only what you add | Tree-shaken |
| Best for | Full control | Quick setup |

## License

MIT
