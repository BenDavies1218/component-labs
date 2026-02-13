import type { RegistryEntry } from "../schema";

const primitiveContent = `import {
  Combobox as AriaCombobox,
  ComboboxCancel,
  ComboboxItem,
  ComboboxPopover,
  ComboboxProvider,
  type ComboboxProps as AriaComboboxProps,
  type ComboboxItemProps,
  type ComboboxPopoverProps,
  type ComboboxProviderProps,
} from "@ariakit/react";
import { forwardRef } from "react";

/**
 * Primitive combobox components that wrap Ariakit's combobox.
 * These are used internally - consumers should use the Combobox component instead.
 * @internal
 */

export const ComboboxProviderPrimitive = ComboboxProvider;

export const ComboboxPrimitive = forwardRef<HTMLInputElement, AriaComboboxProps>(
  (props, ref) => <AriaCombobox ref={ref} {...props} />
);
ComboboxPrimitive.displayName = "ComboboxPrimitive";

export const ComboboxCancelPrimitive = ComboboxCancel;

export const ComboboxItemPrimitive = forwardRef<HTMLDivElement, ComboboxItemProps>(
  (props, ref) => <ComboboxItem ref={ref} {...props} />
);
ComboboxItemPrimitive.displayName = "ComboboxItemPrimitive";

export const ComboboxPopoverPrimitive = forwardRef<HTMLDivElement, ComboboxPopoverProps>(
  (props, ref) => <ComboboxPopover ref={ref} {...props} />
);
ComboboxPopoverPrimitive.displayName = "ComboboxPopoverPrimitive";

export type {
  ComboboxProviderProps,
  AriaComboboxProps as ComboboxPrimitiveProps,
  ComboboxItemProps,
  ComboboxPopoverProps,
};
`;

const componentContent = `import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  startTransition,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";
import {
  ComboboxProviderPrimitive,
  ComboboxPrimitive,
  ComboboxCancelPrimitive,
  ComboboxItemPrimitive,
  ComboboxPopoverPrimitive,
  type ComboboxPrimitiveProps,
} from "./Combobox.primitive";

export const comboboxVariants = cva(
  [
    "w-full max-w-md rounded-lg border px-3 py-2",
    "text-sm font-medium",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-gray-900",
          "border-gray-300 dark:border-gray-700",
          "text-gray-900 dark:text-gray-100",
          "hover:border-gray-400 dark:hover:border-gray-600",
        ],
        outline: [
          "bg-transparent",
          "border-primary-600 dark:border-primary-500",
          "text-gray-900 dark:text-gray-100",
          "hover:bg-primary-50 dark:hover:bg-primary-950",
        ],
      },
      size: {
        sm: "h-9 text-sm",
        md: "h-10 text-base",
        lg: "h-11 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const comboboxItemVariants = cva(
  [
    "flex items-center gap-2 px-3 py-2 rounded-md",
    "text-sm cursor-pointer",
    "transition-colors duration-150",
    "outline-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-gray-900 dark:text-gray-100",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "data-[active-item]:bg-primary-100 dark:data-[active-item]:bg-primary-900",
          "data-[active-item]:text-primary-900 dark:data-[active-item]:text-primary-100",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ComboboxOption {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps
  extends
    Omit<ComboboxPrimitiveProps, "size" | "onSelect">,
    VariantProps<typeof comboboxVariants> {
  /** Combobox label */
  label?: string;
  /** Options to display in the dropdown */
  options?: ComboboxOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Show clear button when value is not empty */
  showClear?: boolean;
  /** Filter function for options */
  filterFn?: (
    options: ComboboxOption[],
    searchValue: string,
  ) => ComboboxOption[];
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Callback when an option is selected */
  onSelectOption?: (value: string) => void;
  /** Empty state message */
  emptyMessage?: string;
  /** Custom render for items */
  renderItem?: (option: ComboboxOption) => ReactNode;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      label,
      options = [],
      placeholder,
      showClear = true,
      filterFn,
      onValueChange,
      onSelectOption,
      emptyMessage = "No results found",
      renderItem,
      variant,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    const [searchValue, setSearchValue] = useState("");

    // Default filter function using simple includes
    const defaultFilterFn = (
      opts: ComboboxOption[],
      search: string,
    ): ComboboxOption[] => {
      if (!search) return opts;
      return opts.filter((opt) =>
        opt.value.toLowerCase().includes(search.toLowerCase()),
      );
    };

    const filteredOptions = useMemo(() => {
      const filterFunc = filterFn || defaultFilterFn;
      return filterFunc(options, searchValue);
    }, [options, searchValue, filterFn]);

    return (
      <ComboboxProviderPrimitive
        setValue={(value) => {
          startTransition(() => {
            setSearchValue(value);
            onValueChange?.(value);
          });
        }}
      >
        <div className="w-full space-y-2">
          {label && (
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {label}
            </label>
          )}
          <div className="relative">
            <ComboboxPrimitive
              ref={ref}
              placeholder={placeholder}
              className={cn(comboboxVariants({ variant, size, className }))}
              {...props}
            />
            {showClear && searchValue && (
              <ComboboxCancelPrimitive className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </ComboboxCancelPrimitive>
            )}
          </div>
          <ComboboxPopoverPrimitive
            gutter={8}
            sameWidth
            className={cn(
              "z-50 max-h-80 overflow-auto rounded-lg border bg-white p-1 shadow-lg dark:bg-gray-900 dark:border-gray-700",
              "opacity-0 transition-all duration-200 ease-out",
              "data-enter:opacity-100 data-enter:translate-y-0",
              "data-leave:opacity-0 data-leave:-translate-y-1",
            )}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <ComboboxItemPrimitive
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  onClick={() => onSelectOption?.(option.value)}
                  className={comboboxItemVariants()}
                >
                  {renderItem
                    ? renderItem(option)
                    : option.label || option.value}
                </ComboboxItemPrimitive>
              ))
            ) : (
              <div className="px-3 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </div>
            )}
          </ComboboxPopoverPrimitive>
        </div>
      </ComboboxProviderPrimitive>
    );
  },
);

Combobox.displayName = "Combobox";
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

export const combobox: RegistryEntry = {
  name: "combobox",
  type: "components:ui",
  description: "Combobox component",
  dependencies: ["@ariakit/react","class-variance-authority","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/combobox.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/combobox.primitive.tsx"
    },
    {
      path: "components/ui/combobox.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/combobox.tsx"
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
    importSpecifier: "Combobox",
    moduleSpecifier: "@/components/ui/combobox"
  }
};
