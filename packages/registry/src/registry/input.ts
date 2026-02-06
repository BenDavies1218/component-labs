import type { RegistryEntry } from "../schema";

const componentContent = "import { cva, type VariantProps } from \"class-variance-authority\";\nimport { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from \"react\";\nimport { cn } from \"../../lib/utils\";\n\nconst inputVariants = cva(\n  [\n    \"w-full rounded-lg border px-3 py-2\",\n    \"text-sm font-medium\",\n    \"transition-all duration-200\",\n    \"focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2\",\n    \"disabled:cursor-not-allowed disabled:opacity-50\",\n    \"placeholder:text-gray-400 dark:placeholder:text-gray-500\",\n  ],\n  {\n    variants: {\n      variant: {\n        default: [\n          \"bg-white dark:bg-gray-900\",\n          \"border-gray-300 dark:border-gray-700\",\n          \"text-gray-900 dark:text-gray-100\",\n          \"hover:border-gray-400 dark:hover:border-gray-600\",\n        ],\n        outline: [\n          \"bg-transparent\",\n          \"border-primary-600 dark:border-primary-500\",\n          \"text-gray-900 dark:text-gray-100\",\n          \"hover:bg-primary-50 dark:hover:bg-primary-950\",\n        ],\n        error: [\n          \"bg-white dark:bg-gray-900\",\n          \"border-error-600 dark:border-error-500\",\n          \"text-gray-900 dark:text-gray-100\",\n          \"focus:ring-error-600\",\n        ],\n      },\n      size: {\n        sm: \"h-9 text-sm\",\n        md: \"h-10 text-base\",\n        lg: \"h-11 text-lg\",\n      },\n    },\n    defaultVariants: {\n      variant: \"default\",\n      size: \"md\",\n    },\n  },\n);\n\nexport interface InputProps\n  extends Omit<InputHTMLAttributes<HTMLInputElement>, \"size\">,\n    VariantProps<typeof inputVariants> {\n  /** Label text above the input */\n  label?: ReactNode;\n  /** Helper text below the input */\n  helperText?: ReactNode;\n  /** Error message (sets variant to error automatically) */\n  error?: string;\n  /** Icon to display before the input text */\n  startIcon?: ReactNode;\n  /** Icon to display after the input text */\n  endIcon?: ReactNode;\n}\n\nexport const Input = forwardRef<HTMLInputElement, InputProps>(\n  (\n    {\n      variant,\n      size,\n      label,\n      helperText,\n      error,\n      startIcon,\n      endIcon,\n      className,\n      ...props\n    },\n    ref,\n  ) => {\n    const hasError = Boolean(error);\n    const displayVariant = hasError ? \"error\" : variant;\n    const generatedId = useId();\n    const inputId = props.id || generatedId;\n    const labelId = `${inputId}-label`;\n    const helperTextId = `${inputId}-helper-text`;\n    const errorId = `${inputId}-error`;\n\n    // Build aria-describedby from available helper text or error\n    const describedBy = error ? errorId : helperText ? helperTextId : undefined;\n\n    return (\n      <div className=\"w-full space-y-1.5\">\n        {label && (\n          <label\n            id={labelId}\n            htmlFor={inputId}\n            className=\"text-sm font-medium text-gray-900 dark:text-gray-100\"\n          >\n            {label}\n          </label>\n        )}\n        <div className=\"relative\">\n          {startIcon && (\n            <div className=\"pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500\">\n              {startIcon}\n            </div>\n          )}\n          <input\n            ref={ref}\n            id={inputId}\n            className={cn(\n              inputVariants({ variant: displayVariant, size }),\n              startIcon && \"pl-10\",\n              endIcon && \"pr-10\",\n              className,\n            )}\n            aria-labelledby={label ? labelId : undefined}\n            aria-describedby={describedBy}\n            aria-invalid={hasError ? true : undefined}\n            {...props}\n          />\n          {endIcon && (\n            <div className=\"pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500\">\n              {endIcon}\n            </div>\n          )}\n        </div>\n        {error && (\n          <p\n            id={errorId}\n            role=\"alert\"\n            aria-live=\"polite\"\n            className=\"text-xs text-error-600 dark:text-error-400\"\n          >\n            {error}\n          </p>\n        )}\n        {helperText && !error && (\n          <p\n            id={helperTextId}\n            className=\"text-xs text-gray-500 dark:text-gray-400\"\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  },\n);\n\nInput.displayName = \"Input\";\n";

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const input: RegistryEntry = {
  name: "input",
  type: "components:ui",
  description: "Input component",
  dependencies: ["class-variance-authority","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/input.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/input.tsx"
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
    importSpecifier: "Input",
    moduleSpecifier: "@/components/ui/input"
  }
};
