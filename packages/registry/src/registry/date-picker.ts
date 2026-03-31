import type { RegistryEntry } from "../schema";

const primitiveContent = `import {
  Popover as AriakitPopover,
  PopoverDisclosure as AriakitPopoverDisclosure,
  usePopoverStore,
  type PopoverProps as AriakitPopoverProps,
  type PopoverDisclosureProps as AriakitPopoverDisclosureProps,
  type PopoverStore,
} from "@ariakit/react";

export type DatePickerStorePrimitive = PopoverStore;
export type DatePickerPopoverPrimitiveProps = AriakitPopoverProps;
export type DatePickerTriggerPrimitiveProps = AriakitPopoverDisclosureProps;

export const DatePickerPopoverPrimitive = AriakitPopover;
export const DatePickerTriggerPrimitive = AriakitPopoverDisclosure;
export const useDatePickerStorePrimitive = usePopoverStore;
`;

const componentContent = `import { cva } from "class-variance-authority";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { forwardRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
  DatePickerPopoverPrimitive,
  DatePickerTriggerPrimitive,
  useDatePickerStorePrimitive,
} from "./DatePicker.primitive";

// ============================================================================
// Variants
// ============================================================================

export const datePickerTriggerVariants = cva(
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
          "focus:ring-primary-500 dark:focus:ring-primary-400",
        ],
        error: [
          "border-error-500 dark:border-error-400",
          "bg-white dark:bg-black/20",
          "text-black dark:text-white",
          "focus:ring-error-500 dark:focus:ring-error-400",
        ],
      },
    },
    defaultVariants: { variant: "default" },
  },
);

// ============================================================================
// Calendar helpers
// ============================================================================

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

// ============================================================================
// Props
// ============================================================================

export interface DatePickerProps {
  /** Controlled selected date */
  value?: Date;
  /** Default selected date (uncontrolled) */
  defaultValue?: Date;
  /** Called when a date is selected */
  onChange?: (date: Date) => void;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Label displayed above the trigger */
  label?: ReactNode;
  /** Error message — switches trigger to error variant */
  error?: string;
  /** Additional CSS classes for the wrapper */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder = "Pick a date…",
      disabled,
      label,
      error,
      className,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<Date | undefined>(
      defaultValue,
    );
    const selectedDate = value ?? internalValue;

    const today = new Date();
    const [viewMonth, setViewMonth] = useState(
      selectedDate?.getMonth() ?? today.getMonth(),
    );
    const [viewYear, setViewYear] = useState(
      selectedDate?.getFullYear() ?? today.getFullYear(),
    );

    const popover = useDatePickerStorePrimitive();

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const cells: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    function prevMonth() {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    }

    function nextMonth() {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    }

    function selectDay(day: number) {
      const date = new Date(viewYear, viewMonth, day);
      setInternalValue(date);
      onChange?.(date);
      popover.hide();
    }

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label className="text-sm font-medium text-black dark:text-white">
            {label}
          </label>
        )}

        <DatePickerTriggerPrimitive
          ref={ref}
          store={popover}
          disabled={disabled}
          className={cn(
            datePickerTriggerVariants({ variant: error ? "error" : "default" }),
          )}
        >
          <span className={cn(!selectedDate && "text-black/40 dark:text-white/40")}>
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </span>
          <CalendarIcon className="h-4 w-4 opacity-50 shrink-0" />
        </DatePickerTriggerPrimitive>

        <DatePickerPopoverPrimitive
          store={popover}
          gutter={8}
          className={cn(
            "z-50 rounded-lg border border-black/10 dark:border-white/10",
            "bg-white dark:bg-black shadow-lg p-3 w-[280px]",
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4 text-black dark:text-white" />
            </button>

            <span className="text-sm font-semibold text-black dark:text-white">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4 text-black dark:text-white" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {DAYS_OF_WEEK.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium text-black/40 dark:text-white/40 py-1"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, idx) => {
              if (!day) {
                return <div key={\`empty-\${idx}\`} />;
              }

              const cellDate = new Date(viewYear, viewMonth, day);
              const isSelected = selectedDate ? isSameDay(cellDate, selectedDate) : false;
              const isTodayCell = isToday(cellDate);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={cn(
                    "h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm",
                    "transition-colors duration-150",
                    isSelected
                      ? "bg-primary-600 dark:bg-primary-500 text-white font-semibold"
                      : isTodayCell
                        ? "text-primary-600 dark:text-primary-400 font-semibold hover:bg-black/5 dark:hover:bg-white/5"
                        : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </DatePickerPopoverPrimitive>

        {error && (
          <p className="text-sm text-error-500 dark:text-error-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
`;

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const datePicker: RegistryEntry = {
  name: "date-picker",
  type: "components:ui",
  description: "Accessible date picker with a popover calendar for selecting a single date.",
  dependencies: [
    "@ariakit/react",
    "class-variance-authority",
    "lucide-react",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/date-picker.primitive.tsx",
      content: primitiveContent,
      type: "registry:ui",
      target: "components/ui/date-picker.primitive.tsx",
    },
    {
      path: "components/ui/date-picker.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/date-picker.tsx",
    },
    {
      path: "lib/utils.ts",
      content: utilsContent,
      type: "registry:lib",
      target: "lib/utils.ts",
    },
  ],
  tailwind: { config: { theme: { extend: {} } } },
  meta: {
    importSpecifier: "DatePicker",
    moduleSpecifier: "@/components/ui/date-picker",
  },
};
