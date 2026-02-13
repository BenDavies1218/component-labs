import type { RegistryEntry } from "../schema";

const primitiveContent = `import { forwardRef } from "react";

export interface TextareaPrimitiveProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Whether the textarea is disabled */
  disabled?: boolean;
}

/**
 * TextareaPrimitive
 *
 * Base textarea element with proper accessibility attributes
 */
export const TextareaPrimitive = forwardRef<
  HTMLTextAreaElement,
  TextareaPrimitiveProps
>(({ disabled, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    />
  );
});

TextareaPrimitive.displayName = "TextareaPrimitive";
`;

const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import {
  TextareaPrimitive,
  type TextareaPrimitiveProps,
} from "./Textarea.primitive";

export const textareaVariants = cva(
  [
    "w-full rounded-lg border transition-all duration-200",
    "px-3 py-2 text-sm text-black",
    "placeholder:text-black/40 dark:placeholder:text-white/40",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "resize-vertical",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-black/20 dark:border-white/20",
          "bg-white dark:bg-black/20",
          "text-black",
          "focus:border-primary-500 dark:focus:border-primary-400",
          "focus:ring-primary-500 dark:focus:ring-primary-400",
        ],
        error: [
          "border-error-500 dark:border-error-400",
          "bg-white dark:bg-black/20",
          "text-black",
          "focus:border-error-600 dark:focus:border-error-300",
          "focus:ring-error-500 dark:focus:ring-error-400",
        ],
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      resize: "vertical",
    },
  },
);

export interface TextareaProps
  extends
    Omit<TextareaPrimitiveProps, "children">,
    VariantProps<typeof textareaVariants> {
  /** Error message to display */
  error?: string;
  /** Whether the textarea should auto-resize based on content */
  autoResize?: boolean;
  /** Minimum rows for auto-resize */
  minRows?: number;
  /** Maximum rows for auto-resize */
  maxRows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant,
      resize,
      error,
      autoResize = false,
      minRows = 3,
      maxRows,
      className,
      rows = 3,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const setRefs = (element: HTMLTextAreaElement | null) => {
      internalRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    useEffect(() => {
      if (autoResize && internalRef.current) {
        const textarea = internalRef.current;
        const updateHeight = () => {
          // Reset height to recalculate
          textarea.style.height = "auto";

          // Calculate new height
          const lineHeight = parseInt(
            window.getComputedStyle(textarea).lineHeight,
          );
          const minHeight = lineHeight * minRows;
          const maxHeight = maxRows ? lineHeight * maxRows : Infinity;

          const newHeight = Math.min(
            Math.max(textarea.scrollHeight, minHeight),
            maxHeight,
          );

          textarea.style.height = \`\${newHeight}px\`;
        };

        updateHeight();
        textarea.addEventListener("input", updateHeight);

        return () => {
          textarea.removeEventListener("input", updateHeight);
        };
      }
    }, [autoResize, minRows, maxRows, props.value]);

    return (
      <TextareaPrimitive
        ref={setRefs}
        rows={autoResize ? minRows : rows}
        className={cn(
          textareaVariants({
            variant: error ? "error" : variant,
            resize: autoResize ? "none" : resize,
            className,
          }),
        )}
        aria-invalid={!!error}
        aria-errormessage={error ? \`\${props.id}-error\` : undefined}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
`;

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const textarea: RegistryEntry = {
  name: "textarea",
  type: "components:ui",
  description: "Textarea component",
  dependencies: ["class-variance-authority","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/textarea.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/textarea.primitive.tsx"
    },
    {
      path: "components/ui/textarea.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/textarea.tsx"
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
    importSpecifier: "Textarea",
    moduleSpecifier: "@/components/ui/textarea"
  }
};
