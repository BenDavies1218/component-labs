# Component Labs

A modern, accessible React component library and development toolkit.

[![npm version](https://img.shields.io/npm/v/@component-labs/ui.svg)](https://www.npmjs.com/package/@component-labs/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start

```bash
# Install components via CLI (recommended)
npx @component-labs/cli init
npx @component-labs/cli add button input dialog

# Or install as npm package
npm install @component-labs/ui
```

## 📦 Packages

This monorepo contains multiple packages:

### UI Components

- **[@component-labs/ui](./packages/ui)** - React UI component library with Tailwind CSS v4 and Ariakit
  - 8 accessible components
  - Dark mode support
  - Fully themeable with CSS variables
  - Tree-shakeable exports

### Developer Tools

- **[@component-labs/cli](./packages/cli)** - CLI for installing components (shadcn/ui style)
  - Copy components directly to your project
  - Automatic CSS setup
  - TypeScript path alias configuration

- **[@component-labs/registry](./packages/registry)** - Component metadata registry
  - Component source storage
  - Dependency tracking
  - Used by CLI for installations

### Showcase Tools

- **[@component-labs/react-showcase](./apps/react-showcase)** - Component showcase tool for React
  - Live component preview
  - Vite-based
  - CLI included

- **[@component-labs/nextjs-showcase](./apps/nextjs-showcase)** - Component showcase tool for Next.js
  - SSR support
  - Next.js App Router compatible
  - CLI included

## 🏗️ Project Structure

```text
component-labs/
├── apps/
│   ├── component-labs/      # Main website
│   ├── react-showcase/      # React showcase tool (v0.5.1)
│   └── nextjs-showcase/     # Next.js showcase tool (v0.1.1)
│
└── packages/
    ├── ui/                  # Component library (v0.0.2)
    ├── cli/                 # CLI installer (v0.0.2)
    └── registry/            # Component registry (v0.0.2)
```

## ✨ Features

### Accessible by Default

Built on [Ariakit](https://ariakit.org/) for WCAG 2.1 Level AA compliance out of the box.

### Tailwind CSS v4

Modern utility-first styling with the latest Tailwind CSS features:

- CSS `@import` syntax
- CSS custom properties
- `@theme` directive
- Dark mode support

### Two Installation Methods

#### CLI Installation (like shadcn/ui)

- Components copied to your project
- Full source code control
- Modify components as needed
- Import: `@/components/ui/button`

#### NPM Installation (traditional)

- Install as a package
- Easy updates via npm
- Tree-shakeable
- Import: `@component-labs/ui/button`

### Themeable

Easy customization with CSS variables:

```css
@theme {
  --color-primary-600: oklch(50% 0.2 250);
  --radius-md: 0.5rem;
}
```

## 🎯 For End Users

See the [Usage](#using-the-library) section below for installation and usage instructions.

## 👨‍💻 For Contributors

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Development Setup

```bash
# Clone the repository
git clone https://github.com/BenDavies1218/component-labs.git
cd component-labs

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

### Repository Scripts

#### Build Commands

- `pnpm build` - Build all packages
- `pnpm --filter @component-labs/ui build` - Build UI package only
- `pnpm --filter @component-labs/cli build` - Build CLI only

#### Development

- `pnpm dev` - Start the main website
- `pnpm showcase` - Start React Showcase dev server
- `pnpm nextjs-showcase` - Start Next.js Showcase dev server

#### Testing

- `pnpm test` - Run all tests
- `pnpm test:watch` - Watch mode

#### Publishing

- See [PUBLISHING.md](./PUBLISHING.md) for detailed publishing instructions
- Or run `./scripts/publish-all.sh` to publish all packages

### Adding a New Component

1. **Create component file:**

   ```bash
   packages/ui/src/components/your-component/YourComponent.tsx
   ```

2. **Add showcase file:**

   ```bash
   packages/ui/src/components/your-component/YourComponent.showcase.tsx
   ```

3. **Add docs file:**

   ```bash
   packages/ui/src/components/your-component/YourComponent.docs.tsx
   ```

4. **Export from UI package:**

   ```typescript
   // packages/ui/src/your-component.ts
   export { YourComponent } from "./components/your-component/YourComponent";
   ```

5. **Add to registry:**

   ```bash
   # Add component metadata to packages/registry/src/registry/
   packages/registry/src/registry/your-component.ts
   ```

6. **Update registry index:**

   ```typescript
   // packages/registry/src/index.ts
   import { yourComponent } from "./registry/your-component";

   export const registry: Registry = {
     // ... existing components
     "your-component": yourComponent,
   };
   ```

7. **Update vite config:**

   ```typescript
   // packages/ui/vite.config.ts
   entry: {
     // ... existing entries
     "your-component": resolve(__dirname, "src/your-component.ts"),
   }
   ```

## Using the Library

Component Labs provides two ways to use components in your project:

### Option 1: CLI Installation (Recommended - shadcn/ui style)

The CLI installs component source code directly into your project, allowing full customization:

```bash
# Initialize Component Labs in your project
npx @component-labs/cli init

# Add components to your project
npx @component-labs/cli add button input dialog

# Or add all components
npx @component-labs/cli add
```

This will:
1. Create a `components.json` configuration file
2. Set up CSS imports in your global stylesheet
3. Copy component source files to your project
4. Install required dependencies

**Your global CSS file should contain:**
```css
@import "tailwindcss";
@import "@component-labs/ui/base";

/* Your custom styles here */
```

**Usage:**
```tsx
import { Button } from "@/components/ui/button";

function App() {
  return (
    <Button variant="default" size="md">
      Click me
    </Button>
  );
}
```

### Option 2: NPM Package Installation

Install components as a traditional npm package:

```bash
pnpm add @component-labs/ui
```

**Setup your global CSS:**
```css
@import "tailwindcss";
@import "@component-labs/ui/base";
```

**Usage:**
```tsx
import { Button } from "@component-labs/ui/button";
import { Input } from "@component-labs/ui/input";
import { Dialog } from "@component-labs/ui/dialog";

function App() {
  return (
    <div>
      <Button variant="default" size="md">Click me</Button>
      <Input label="Email" type="email" />
    </div>
  );
}
```

### Customizing Styles

Component Labs uses CSS custom properties for theming. Override them in your global CSS:

```css
@import "tailwindcss";
@import "@component-labs/ui/base";

@theme {
  /* Override primary colors */
  --color-primary-600: oklch(50% 0.2 250);
  --color-primary-700: oklch(45% 0.2 250);

  /* Override border radius */
  --radius-md: 0.5rem;
}
```

### Available Components

- `button` - Interactive buttons with multiple variants
- `checkbox` - Accessible checkbox inputs
- `input` - Text inputs with labels and icons
- `dialog` - Modal dialogs
- `switch` - Toggle switches
- `menu` - Dropdown menus
- `combobox` - Searchable select inputs
- `data-table` - Data tables with sorting and infinite scroll

## 🔧 Component Showcase Tools

Component Labs includes two showcase tools for documenting and testing your components:

### React Showcase

A lightweight component showcase tool for Vite-based React projects.

```bash
# Install
npm install @component-labs/react-showcase

# Use CLI
npx component-showcase dev
```

**Features:**

- Live component preview
- Hot module replacement
- Automatic component discovery
- Customizable showcase configurations

[Learn more →](./apps/react-showcase/README.md)

### Next.js Showcase

A showcase tool built for Next.js with SSR support.

```bash
# Install
npm install @component-labs/nextjs-showcase

# Use CLI
npx nextjs-showcase dev
```

**Features:**

- Server-side rendering support
- Next.js App Router compatible
- Automatic route generation
- SEO-friendly component documentation

[Learn more →](./apps/nextjs-showcase/README.md)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Modern utility-first CSS
- **Ariakit** - Accessible component primitives
- **Vite** - Build tool and dev server
- **Next.js 16** - React framework (for Next.js Showcase)
- **Vitest** - Testing framework
- **pnpm** - Monorepo package manager

## 📚 Documentation

- **[UI Components README](./packages/ui/README.md)** - Detailed component documentation
- **[CLI README](./packages/cli/README.md)** - CLI usage and configuration
- **[Publishing Guide](./PUBLISHING.md)** - Package publishing instructions
- **[Implementation Summary](./IMPLEMENTATION_SUMMARY.md)** - Technical implementation details

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

- **UI Library, CLI, Registry**: MIT License
- **Showcase Tools**: AGPL-3.0 License

See individual package directories for detailed license information.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Inspiration for the CLI installation pattern
- [Ariakit](https://ariakit.org/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/BenDavies1218/component-labs/issues)
- **Discussions**: [GitHub Discussions](https://github.com/BenDavies1218/component-labs/discussions)

---

**Built with ❤️ by [Benjamin Davies](https://github.com/BenDavies1218)**
