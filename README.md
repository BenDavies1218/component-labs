# Component Labs

A modern React UI component library built with TypeScript, Tailwind CSS, and Ariakit.

## Features

- **Accessible** - Built on Ariakit for WAI-ARIA compliant components
- **Type-safe** - Full TypeScript support with type definitions
- **Customizable** - Styled with Tailwind CSS for easy customization
- **Modern tooling** - Vite for fast builds, Vitest for testing, Storybook for documentation
- **Monorepo architecture** - Clean separation of concerns with pnpm workspaces

## Project Structure

```
component-labs/
├── packages/
│   ├── ui/              # React component library
│   └── testing/         # Test suite with Vitest
├── apps/
│   └── storybook/       # Component documentation
└── .claude/             # Claude Code configuration
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
# Install dependencies
pnpm install

# Start Storybook development server
pnpm dev

# Run tests
pnpm test

# Build the UI library
pnpm build
```

## Development

### Adding a New Component

1. Create your component in `packages/ui/src/components/YourComponent.tsx`
2. Export it from `packages/ui/src/index.ts`
3. Add a story file `packages/ui/src/components/YourComponent.stories.tsx`
4. Add tests in `packages/testing/src/__tests__/YourComponent.test.tsx`

### Available Scripts

- `pnpm dev` - Start Storybook development server
- `pnpm build` - Build the UI package
- `pnpm build:all` - Build all packages
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm storybook` - Start Storybook
- `pnpm build-storybook` - Build Storybook for production

## Using the Library

```bash
# Install the package
pnpm add @component-labs/ui
```

```tsx
import { Button } from "@component-labs/ui";
import "@component-labs/ui/styles.css";

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling v4
- **Ariakit** - Accessible primitives
- **Vite** - Build tool
- **Vitest** - Testing framework
- **Storybook** - Component documentation
- **pnpm** - Package manager

## License

MIT
