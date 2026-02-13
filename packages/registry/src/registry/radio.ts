import type { RegistryEntry } from "../schema";

const primitiveContent = `import {
  Radio as AriakitRadio,
  RadioGroup as AriakitRadioGroup,
  useRadioStore,
  type RadioProps as AriakitRadioProps,
  type RadioGroupProps as AriakitRadioGroupProps,
  type RadioStore,
} from "@ariakit/react";

export type RadioStorePrimitive = RadioStore;
export type RadioPrimitiveProps = AriakitRadioProps;
export type RadioGroupPrimitiveProps = AriakitRadioGroupProps;

export const RadioPrimitive = AriakitRadio;
export const RadioGroupPrimitive = AriakitRadioGroup;
export const useRadioStorePrimitive = useRadioStore;
`;

const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
import { Circle } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
  RadioGroupPrimitive,
  RadioPrimitive,
  useRadioStorePrimitive,
  type RadioGroupPrimitiveProps,
  type RadioPrimitiveProps,
  type RadioStorePrimitive,
} from "./Radio.primitive";

// ============================================================================
// Radio Item Variants
// ============================================================================

export const radioVariants = cva(
  [
    "peer relative inline-flex h-5 w-5 shrink-0 items-center justify-center",
    "rounded-full border-2 transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-black/30 dark:border-white/30",
          "data-[active-item]:border-primary-600 dark:data-[active-item]:border-primary-400",
          "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        ],
        error: [
          "border-error-500 dark:border-error-400",
          "focus-visible:ring-error-500 dark:focus-visible:ring-error-400",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const radioIndicatorVariants = cva(
  [
    "absolute inset-0 flex items-center justify-center",
    "scale-0 transition-transform duration-200",
    "data-[active-item]:scale-100",
  ],
  {
    variants: {
      variant: {
        default: "text-primary-600 dark:text-primary-400",
        error: "text-error-500 dark:text-error-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// ============================================================================
// Radio Item Component
// ============================================================================

export interface RadioProps
  extends Omit<RadioPrimitiveProps, "store" | "render">,
    VariantProps<typeof radioVariants> {
  /** Label text for the radio button */
  label?: ReactNode;
  /** Description text shown below the label */
  description?: ReactNode;
  /** Whether this radio is in an error state */
  error?: boolean;
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  (
    { variant, label, description, error, className, children, ...props },
    ref,
  ) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <RadioPrimitive
          ref={ref}
          className={cn(
            radioVariants({
              variant: error ? "error" : variant,
              className,
            }),
          )}
          {...props}
        >
          <span
            className={cn(
              radioIndicatorVariants({
                variant: error ? "error" : variant,
              }),
            )}
          >
            <Circle className="h-2.5 w-2.5 fill-current" />
          </span>
        </RadioPrimitive>

        {(label || description) && (
          <div className="flex flex-col gap-1">
            {label && (
              <span className="text-sm font-medium text-black dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-black/60 dark:text-white/60">
                {description}
              </span>
            )}
          </div>
        )}
        {children}
      </label>
    );
  },
);

Radio.displayName = "Radio";

// ============================================================================
// Radio Group Component
// ============================================================================

export interface RadioGroupProps extends Omit<RadioGroupPrimitiveProps, "store"> {
  /** Default selected value */
  defaultValue?: string;
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Label for the radio group */
  label?: ReactNode;
  /** Error message to display */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Radio items as children */
  children: ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      defaultValue,
      value,
      onChange,
      label,
      error,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const store = useRadioStorePrimitive({
      defaultValue,
      value,
      setValue: onChange,
    });

    return (
      <div className={cn("space-y-3", className)}>
        {label && (
          <div className="text-sm font-medium text-black dark:text-white">
            {label}
          </div>
        )}

        <RadioGroupPrimitive
          ref={ref}
          store={store}
          className="flex flex-col gap-3"
          {...props}
        >
          {children}
        </RadioGroupPrimitive>

        {error && (
          <p className="text-sm text-error-500 dark:text-error-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
`;

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const radio: RegistryEntry = {
  name: "radio",
  type: "components:ui",
  description: "Radio component",
  dependencies: ["@ariakit/react","class-variance-authority","lucide-react","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/radio.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/radio.primitive.tsx"
    },
    {
      path: "components/ui/radio.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/radio.tsx"
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
    importSpecifier: "Radio",
    moduleSpecifier: "@/components/ui/radio"
  }
};
