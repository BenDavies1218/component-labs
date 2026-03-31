import { cva, type VariantProps } from "class-variance-authority";
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
    "placeholder:text-black/40 dark:placeholder:text-white/40",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-black/20",
          "border-black/20 dark:border-white/20",
          "text-black dark:text-white",
          "hover:border-black/40 dark:hover:border-white/40",
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
          "text-black dark:text-white",
          "hover:bg-black/5 dark:hover:bg-white/5",
          "data-[active-item]:bg-primary-100 dark:data-[active-item]:bg-primary-900/30",
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
            <label className="text-sm font-medium text-black dark:text-white">
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
              <ComboboxCancelPrimitive className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-md p-1 text-black/40 hover:text-black/70 dark:text-white/40 dark:hover:text-white/70 transition-colors">
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
              "z-50 max-h-80 overflow-auto rounded-lg border bg-white p-1 shadow-lg dark:bg-black dark:border-white/10",
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
              <div className="px-3 py-2 text-center text-sm text-black/50 dark:text-white/50">
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
