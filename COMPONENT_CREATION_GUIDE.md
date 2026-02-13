# Component Labs - Component Creation Guide

This guide walks you through creating a new component in Component Labs from start to finish.

## Table of Contents

1. [Component Structure Overview](#component-structure-overview)
2. [Step-by-Step Guide](#step-by-step-guide)
3. [File Templates](#file-templates)
4. [Registry Configuration](#registry-configuration)
5. [Best Practices](#best-practices)
6. [Testing Your Component](#testing-your-component)

---

## Component Structure Overview

Each component in Component Labs follows a consistent structure:

```
packages/ui/src/components/[component-name]/
├── [ComponentName].primitive.tsx  (optional - for wrapping external libraries)
├── [ComponentName].tsx            (main component with variants)
├── [ComponentName].docs.tsx       (documentation)
├── [ComponentName].showcase.tsx   (showcase examples)
```

### When to Use `.primitive.tsx`

Use a primitive file when:

- You're wrapping an external library (like Ariakit, Radix, etc.)
- You want to hide implementation details from consumers
- You want developers to customize only the styling/variants, not the core functionality

**Example:** Button uses `Button.primitive.tsx` to wrap Ariakit's Button, hiding the dependency.

---

## Step-by-Step Guide

### Step 1: Create Component Directory

```bash
cd packages/ui/src/components
mkdir [component-name]
cd [component-name]
```

### Step 2: Create Primitive File (Optional)

If wrapping an external library, create `[ComponentName].primitive.tsx`:

```tsx
import {
  Component as ExternalComponent,
  ComponentProps as ExternalComponentProps,
} from "external-library";
import { forwardRef } from "react";

/**
 * Primitive component that wraps [ExternalLibrary]'s component.
 * This is used internally - consumers should use the main component instead.
 * @internal
 */
export const ComponentNamePrimitive = forwardRef<
  HTMLElement,
  ExternalComponentProps
>((props, ref) => {
  return <ExternalComponent ref={ref} {...props} />;
});

ComponentNamePrimitive.displayName = "ComponentNamePrimitive";

export type { ExternalComponentProps as ComponentNamePrimitiveProps };
```

### Step 3: Create Main Component File

Create `[ComponentName].tsx`:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";
// If using primitive:
import {
  ComponentNamePrimitive,
  type ComponentNamePrimitiveProps,
} from "./ComponentName.primitive";

// Define your variants
const componentNameVariants = cva(
  [
    // Base styles - always applied
    "base-class-1",
    "base-class-2",
  ],
  {
    variants: {
      variant: {
        default: ["variant-specific-classes"],
        secondary: ["variant-specific-classes"],
        // Add more variants
      },
      size: {
        sm: "size-classes",
        md: "size-classes",
        lg: "size-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// Define props interface
export interface ComponentNameProps
  extends
    Omit<ComponentNamePrimitiveProps, "disabled">, // or React.HTMLAttributes<HTMLElement>
    VariantProps<typeof componentNameVariants> {
  /** Prop description */
  customProp?: string;
  /** Another prop */
  anotherProp?: boolean;
}

// Create the component
export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  ({ variant, size, customProp, className, children, ...props }, ref) => {
    return (
      <ComponentNamePrimitive
        ref={ref}
        className={cn(
          componentNameVariants({
            variant,
            size,
            className,
          }),
        )}
        {...props}
      >
        {children}
      </ComponentNamePrimitive>
    );
  },
);

ComponentName.displayName = "ComponentName";
```

### Step 4: Create Documentation File

Create `[ComponentName].docs.tsx`:

```tsx
import type { ComponentDoc } from "../../types/docs";
import { ComponentName } from "./ComponentName";

export const componentNameDocs: ComponentDoc = {
  name: "ComponentName",
  description: "Brief description of what the component does",
  category: "Inputs", // or "Layout", "Display", "Navigation", etc.
  installation: `npx @component-labs/cli add component-name

This will:
- Install required dependencies
- Copy the ComponentName component to your project
- Add utility functions (cn helper)

Make sure you've initialized Component Labs first:
\`\`\`bash
npx @component-labs/cli init
\`\`\``,
  usage: `import { ComponentName } from "@component-labs/ui";

<ComponentName>Example</ComponentName>`,
  props: [
    {
      name: "variant",
      type: "'default' | 'secondary'",
      description: "Visual style variant",
      default: "'default'",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size of the component",
      default: "'md'",
    },
    // Add all your props here
  ],
  examples: [
    {
      title: "Basic Usage",
      code: `<ComponentName>Hello World</ComponentName>`,
      description: "Simple example",
    },
    // Add more examples
  ],
  accessibility: [
    "Keyboard navigation support",
    "Proper ARIA attributes",
    "Focus management",
  ],
  status: "stable", // or "beta", "experimental"
  version: "1.0.0",
  preview: () => (
    <div className="space-y-4">
      <ComponentName variant="default">Default</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
    </div>
  ),
};
```

### Step 5: Create Showcase File

Create `[ComponentName].showcase.tsx`:

```tsx
import { ComponentName } from "./ComponentName";

export function ComponentNameShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="flex gap-4">
          <ComponentName variant="default">Default</ComponentName>
          <ComponentName variant="secondary">Secondary</ComponentName>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="flex items-center gap-4">
          <ComponentName size="sm">Small</ComponentName>
          <ComponentName size="md">Medium</ComponentName>
          <ComponentName size="lg">Large</ComponentName>
        </div>
      </section>
    </div>
  );
}
```

### Step 6: Create Barrel Export

Create `index.ts`:

```tsx
export { ComponentName, componentNameVariants } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

### Step 7: Register in Registry

Create `packages/registry/src/registry/component-name.ts`:

```typescript
import type { RegistryEntry } from "../schema";

// If you have a primitive file
const primitiveContent = `import {
  Component as ExternalComponent,
  ComponentProps as ExternalComponentProps,
} from "external-library";
import { forwardRef } from "react";

/**
 * Primitive component that wraps [Library]'s component.
 * @internal
 */
export const ComponentNamePrimitive = forwardRef<HTMLElement, ExternalComponentProps>(
  (props, ref) => {
    return <ExternalComponent ref={ref} {...props} />;
  },
);

ComponentNamePrimitive.displayName = "ComponentNamePrimitive";

export type { ExternalComponentProps as ComponentNamePrimitiveProps };
`;

// Main component content (paste your component code as a template string)
const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
// ... rest of your component code
`;

const utilsContent = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

export const componentName: RegistryEntry = {
  name: "component-name",
  type: "components:ui",
  description: "ComponentName component",
  dependencies: [
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    // Add any other dependencies (e.g., "@ariakit/react", "lucide-react")
  ],
  registryDependencies: [], // Add if depends on other components
  files: [
    // Include primitive file if it exists
    {
      path: "components/ui/component-name.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/component-name.primitive.tsx",
    },
    // Main component file
    {
      path: "components/ui/component-name.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/component-name.tsx",
    },
    // Utils file
    {
      path: "lib/utils.ts",
      content: utilsContent,
      type: "registry:lib",
      target: "lib/utils.ts",
    },
  ],
  tailwind: {
    config: {
      theme: {
        extend: {},
      },
    },
  },
  meta: {
    importSpecifier: "ComponentName",
    moduleSpecifier: "@/components/ui/component-name",
  },
};
```

### Step 8: Export Registry Entry

Add to `packages/registry/src/index.ts`:

```typescript
export { componentName } from "./registry/component-name";
```

And update the registry object:

```typescript
export const registry: Registry = {
  button,
  checkbox,
  componentName, // Add your component here
  // ... other components
};
```

### Step 9: Build the Registry

```bash
cd packages/registry
pnpm run build
```

### Step 10: Update CLI (if needed)

The CLI should automatically pick up your new component from the registry.

Test it works:

```bash
cd packages/cli
pnpm run build

# Test in a separate project
npx @component-labs/cli add component-name
```

---

## File Templates

### Template: Simple Component (No Primitive)

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const componentVariants = cva(["base-classes"], {
  variants: {
    variant: {
      default: ["classes"],
    },
    size: {
      md: "classes",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface ComponentProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Component.displayName = "Component";
```

---

## Registry Configuration

### Understanding Registry Schema

```typescript
export interface RegistryEntry {
  name: string; // kebab-case component name
  type: "components:ui"; // Component type
  description?: string; // Brief description
  dependencies?: string[]; // NPM dependencies
  registryDependencies?: string[]; // Other components from registry
  files: Array<{
    path: string; // Source path in registry
    content: string; // File content as string
    type: "registry:ui" | "registry:lib" | "registry:hook";
    target?: string; // Target path when installed
  }>;
  tailwind?: {
    config?: Record<string, any>; // Tailwind config additions
  };
  meta?: {
    importSpecifier?: string; // Component name for imports
    moduleSpecifier?: string; // Import path
  };
}
```

### Common Dependencies

```typescript
// For styled components with variants
dependencies: ["class-variance-authority", "clsx", "tailwind-merge"];

// For Ariakit-based components
dependencies: [
  "@ariakit/react",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
];

// For components with icons
dependencies: [
  "lucide-react",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
];
```

---

## Best Practices

### 1. Naming Conventions

- **Files**: PascalCase - `Button.tsx`, `Button.primitive.tsx`
- **Registry**: kebab-case - `button`, `data-table`
- **Components**: PascalCase - `Button`, `DataTable`
- **Variants**: camelCase - `buttonVariants`

### 2. Props Design

- Extend appropriate base props (`HTMLAttributes`, primitive props, etc.)
- Use `Omit` to remove conflicting props when necessary
- Always include JSDoc comments for props
- Use TypeScript's type utilities for clarity

```tsx
export interface ButtonProps
  extends
    Omit<ButtonPrimitiveProps, "disabled">,
    VariantProps<typeof buttonVariants> {
  /** Whether the button is disabled */
  disabled?: boolean;
}
```

### 3. Variants Best Practices

- Keep base styles in the first array
- Use meaningful variant names
- Provide sensible defaults
- Consider dark mode for all variants

```tsx
const componentVariants = cva(
  [
    // Base styles
    "base-class",
  ],
  {
    variants: {
      variant: {
        default: ["bg-primary-600 dark:bg-primary-700"],
        secondary: ["bg-secondary-600 dark:bg-secondary-700"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
```

### 4. Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Ensure focus states are visible
- Test with screen readers

### 5. Performance

- Use `forwardRef` for proper ref handling
- Memoize complex calculations if needed
- Avoid unnecessary re-renders
- Keep bundle size small

### 6. Documentation

- Write clear prop descriptions
- Provide multiple examples
- Document accessibility features
- Include usage examples
- Note any gotchas or limitations

---

## Testing Your Component

### 1. Visual Testing

Create comprehensive showcase examples:

```tsx
export function ComponentShowcase() {
  return (
    <div className="space-y-8">
      {/* Test all variants */}
      {/* Test all sizes */}
      {/* Test edge cases */}
      {/* Test with long content */}
      {/* Test disabled states */}
    </div>
  );
}
```

### 2. Registry Testing

```bash
# Build the registry
cd packages/registry
pnpm run build

# Verify the output
node -e "import('./dist/index.js').then(m => console.log(m.registry.yourComponent))"
```

### 3. CLI Testing

```bash
# Build CLI
cd packages/cli
pnpm run build

# Test in a temporary project
mkdir /tmp/test-component
cd /tmp/test-component
npm init -y
npx @component-labs/cli init
npx @component-labs/cli add your-component

# Verify files were copied
ls -la components/ui/
```

### 4. Integration Testing

- Import and use the component in a real project
- Test with different Tailwind configurations
- Verify dark mode works correctly
- Check TypeScript types are correct
- Test with different React versions

---

## Checklist

Before submitting your component:

- [ ] Component files created in `/packages/ui/src/components/[name]/`
- [ ] Primitive file (if needed) wraps external library
- [ ] Main component includes variants using CVA
- [ ] Props interface properly documented with JSDoc
- [ ] Barrel export (`index.ts`) created
- [ ] Documentation file created with examples
- [ ] Showcase file created with all variants
- [ ] Registry entry created in `/packages/registry/src/registry/[name].ts`
- [ ] Registry index updated to export new component
- [ ] Registry builds successfully
- [ ] Component can be added via CLI
- [ ] Accessibility features documented and tested
- [ ] Dark mode support verified
- [ ] TypeScript types work correctly
- [ ] No console errors or warnings

---

## Common Pitfalls

### 1. Import Path Issues in Registry

❌ Wrong:

```typescript
import { ButtonPrimitive } from "./Button.primitive";
```

✅ Correct (use relative path as it will be in user's project):

```typescript
import { ButtonPrimitive } from "./button.primitive";
```

### 2. Missing Utils File

Always include the utils file in registry, even if other components use it:

```typescript
files: [
  // ... component files
  {
    path: "lib/utils.ts",
    content: utilsContent,
    type: "registry:lib",
    target: "lib/utils.ts",
  },
];
```

### 3. Incorrect Export Variants

If developers need to customize variants, export them:

```tsx
export const buttonVariants = cva(/* ... */);
export const Button = forwardRef(/* ... */);
```

### 4. Forgetting to Build Registry

Always rebuild after changes:

```bash
pnpm --filter @component-labs/registry run build
```

---

## Examples

See these components for reference:

- **Simple component**: [Checkbox](../packages/ui/src/components/checkbox/)
- **Component with primitive**: [Button](../packages/ui/src/components/button/)
- **Complex component**: [DataTable](../packages/ui/src/components/data-table/)

---

## Need Help?

- Check existing components for patterns
- Review the registry schema
- Test thoroughly before publishing
- Ask for code review

Happy component building! 🎉
