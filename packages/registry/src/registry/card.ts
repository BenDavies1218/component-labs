import type { RegistryEntry } from "../schema";

const primitiveContent = `import { forwardRef } from "react";

export interface CardPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardPrimitive
 *
 * Base card container element
 */
export const CardPrimitive = forwardRef<HTMLDivElement, CardPrimitiveProps>(
  (props, ref) => {
    return <div ref={ref} {...props} />;
  },
);

CardPrimitive.displayName = "CardPrimitive";
`;

const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { CardPrimitive, type CardPrimitiveProps } from "./Card.primitive";

// ============================================================================
// Card Variants
// ============================================================================

export const cardVariants = cva(
  [
    "rounded-lg border bg-white dark:bg-black",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: "border-black/10 dark:border-white/10",
        elevated: "border-black/10 dark:border-white/10 shadow-lg",
        outline: "border-black/20 dark:border-white/20",
      },
      hoverable: {
        true: "hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800 cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      hoverable: false,
    },
  },
);

// ============================================================================
// Card Root
// ============================================================================

export interface CardProps
  extends CardPrimitiveProps,
    VariantProps<typeof cardVariants> {
  /** Whether the card is interactive */
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant, hoverable, className, ...props }, ref) => {
    return (
      <CardPrimitive
        ref={ref}
        className={cn(cardVariants({ variant, hoverable, className }))}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

// ============================================================================
// Card Header
// ============================================================================

export interface CardHeaderProps extends CardPrimitiveProps {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <CardPrimitive
        ref={ref}
        className={cn("flex flex-col gap-1.5 p-6", className)}
        {...props}
      />
    );
  },
);

CardHeader.displayName = "CardHeader";

// ============================================================================
// Card Title
// ============================================================================

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = "h3", className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "text-lg font-semibold leading-none tracking-tight text-black dark:text-white",
          className,
        )}
        {...props}
      />
    );
  },
);

CardTitle.displayName = "CardTitle";

// ============================================================================
// Card Description
// ============================================================================

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-black/60 dark:text-white/60", className)}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

// ============================================================================
// Card Content
// ============================================================================

export interface CardContentProps extends CardPrimitiveProps {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <CardPrimitive
        ref={ref}
        className={cn("p-6 pt-0", className)}
        {...props}
      />
    );
  },
);

CardContent.displayName = "CardContent";

// ============================================================================
// Card Footer
// ============================================================================

export interface CardFooterProps extends CardPrimitiveProps {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <CardPrimitive
        ref={ref}
        className={cn(
          "flex items-center gap-2 p-6 pt-0",
          className,
        )}
        {...props}
      />
    );
  },
);

CardFooter.displayName = "CardFooter";
`;

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const card: RegistryEntry = {
  name: "card",
  type: "components:ui",
  description: "Card component",
  dependencies: ["class-variance-authority","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/card.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/card.primitive.tsx"
    },
    {
      path: "components/ui/card.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/card.tsx"
    },
    {
      path: "lib/utils.ts",
      content: utilsContent,
      type: "registry:lib",
      target: "lib/utils.ts"
    }
  ],
  tailwind: {
    config: {
      theme: {
        extend: {}
      }
    }
  },
  meta: {
    importSpecifier: "Card",
    moduleSpecifier: "@/components/ui/card"
  }
};
