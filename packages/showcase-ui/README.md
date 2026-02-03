# @component-labs/showcase-ui

Shared UI components for Component Labs showcase tools (react-showcase and nextjs-showcase).

## Installation

```bash
npm install @component-labs/showcase-ui
pnpm add @component-labs/showcase-ui
yarn add @component-labs/showcase-ui
```

## Usage

```tsx
import { Sidebar, Header, Controls, Preview } from "@component-labs/showcase-ui";
import "@component-labs/showcase-ui/styles";

// Use the components in your showcase app
```

## Components

- **Sidebar** - Component navigation sidebar with search
- **Header** - Top bar with theme switcher
- **Controls** - Interactive prop controls panel
- **Preview** - Component preview with viewport controls
- **ErrorBoundary** - Error handling wrapper
- **DeviceContainers** - iPhone, iPad, and Desktop frames
- **DotPattern** - Background dot pattern
- **AnimatedGradientText** - Animated gradient text
- **GettingStarted** - Getting started documentation component

## Styles

The package includes a shared CSS file with all the necessary styles and CSS variables:

```tsx
import "@component-labs/showcase-ui/styles";
```

## License

AGPL-3.0 © [Benjamin Davies](https://github.com/BenDavies1218)
