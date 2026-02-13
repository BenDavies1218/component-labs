import type { RegistryEntry } from "../schema";

const primitiveContent = `import {
  Select as AriakitSelect,
  SelectArrow as AriakitSelectArrow,
  SelectItem as AriakitSelectItem,
  SelectPopover as AriakitSelectPopover,
  useSelectStore,
  type SelectProps as AriakitSelectProps,
  type SelectArrowProps as AriakitSelectArrowProps,
  type SelectItemProps as AriakitSelectItemProps,
  type SelectPopoverProps as AriakitSelectPopoverProps,
  type SelectStore,
} from "@ariakit/react";

export type SelectStorePrimitive = SelectStore;
export type SelectPrimitiveProps = AriakitSelectProps;
export type SelectArrowPrimitiveProps = AriakitSelectArrowProps;
export type SelectItemPrimitiveProps = AriakitSelectItemProps;
export type SelectPopoverPrimitiveProps = AriakitSelectPopoverProps;

export const SelectPrimitive = AriakitSelect;
export const SelectArrowPrimitive = AriakitSelectArrow;
export const SelectItemPrimitive = AriakitSelectItem;
export const SelectPopoverPrimitive = AriakitSelectPopover;
export const useSelectStorePrimitive = useSelectStore;
`;

const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
  SelectItemPrimitive,
  SelectPopoverPrimitive,
  SelectPrimitive,
  useSelectStorePrimitive,
  type SelectItemPrimitiveProps,
  type SelectPrimitiveProps,
} from "./Select.primitive";

// ============================================================================
// Select Trigger Variants
// ============================================================================

export const selectTriggerVariants = cva(
  [
    "inline-flex items-center justify-between gap-2",
    "w-full rounded-lg border px-3 py-2 text-sm",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-black/20 dark:border-white/20",
          "bg-white dark:bg-black/20",
          "text-black dark:text-white",
          "focus:border-primary-500 dark:focus:border-primary-400",
          "focus:ring-primary-500 dark:focus:ring-primary-400",
          "data-[active-item]:border-primary-500 dark:data-[active-item]:border-primary-400",
        ],
        error: [
          "border-error-500 dark:border-error-400",
          "bg-white dark:bg-black/20",
          "text-black dark:text-white",
          "focus:border-error-600 dark:focus:border-error-300",
          "focus:ring-error-500 dark:focus:ring-error-400",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const selectPopoverVariants = cva([
  "z-50 max-h-96 overflow-auto rounded-lg",
  "border border-black/10 dark:border-white/10",
  "bg-white dark:bg-black",
  "shadow-lg",
  "p-1",
]);

export const selectItemVariants = cva(
  [
    "relative flex cursor-pointer items-center justify-between gap-2",
    "rounded-md px-3 py-2 text-sm",
    "outline-none transition-colors duration-150",
    "data-[active-item]:bg-primary-100 dark:data-[active-item]:bg-primary-900",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "text-black dark:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// ============================================================================
// Select Option Type
// ============================================================================

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

// ============================================================================
// Select Root Component
// ============================================================================

export interface SelectRootProps {
  /** Array of options to display */
  options: SelectOption[];
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Label for the select */
  label?: ReactNode;
  /** Error message to display */
  error?: string;
  /** Additional CSS classes */
  className?: string;
}

export interface SelectProps
  extends Omit<SelectPrimitiveProps, "store" | "value" | "defaultValue">,
    Omit<SelectRootProps, "options">,
    VariantProps<typeof selectTriggerVariants> {}

export interface SelectItemProps
  extends Omit<SelectItemPrimitiveProps, "store">,
    VariantProps<typeof selectItemVariants> {
  /** Whether this item is currently selected */
  selected?: boolean;
}

// ============================================================================
// Select Component (Compound Component)
// ============================================================================

export const Select = forwardRef<HTMLButtonElement, SelectRootProps>(
  (
    {
      options,
      defaultValue,
      value,
      onChange,
      placeholder = "Select an option...",
      disabled,
      label,
      error,
      className,
    },
    ref,
  ) => {
    const select = useSelectStorePrimitive({
      defaultValue,
      value,
      setValue: onChange,
    });

    const selectedOption = options.find(
      (opt) => opt.value === select.useState("value"),
    );

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label className="text-sm font-medium text-black dark:text-white">
            {label}
          </label>
        )}

        <SelectPrimitive
          ref={ref}
          store={select}
          disabled={disabled}
          className={cn(
            selectTriggerVariants({
              variant: error ? "error" : "default",
            }),
          )}
        >
          <span className={cn(!selectedOption && "text-black/40 dark:text-white/40")}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive>

        <SelectPopoverPrimitive
          store={select}
          gutter={8}
          sameWidth
          className={cn(selectPopoverVariants())}
        >
          {options.map((option) => {
            const isSelected = option.value === select.useState("value");
            return (
              <SelectItemPrimitive
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cn(selectItemVariants())}
                store={select}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                )}
              </SelectItemPrimitive>
            );
          })}
        </SelectPopoverPrimitive>

        {error && (
          <p className="text-sm text-error-500 dark:text-error-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
`;

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const select: RegistryEntry = {
  name: "select",
  type: "components:ui",
  description: "Select component",
  dependencies: ["@ariakit/react","class-variance-authority","lucide-react","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/select.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/select.primitive.tsx"
    },
    {
      path: "components/ui/select.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/select.tsx"
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
    importSpecifier: "Select",
    moduleSpecifier: "@/components/ui/select"
  }
};
