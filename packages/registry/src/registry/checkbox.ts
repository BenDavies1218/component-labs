import type { RegistryEntry } from "../schema";

const componentContent = "import {\n  Checkbox as AriaCheckbox,\n  CheckboxCheck,\n  type CheckboxProps as AriaCheckboxProps,\n} from \"@ariakit/react\";\nimport { cva, type VariantProps } from \"class-variance-authority\";\nimport { forwardRef, type ReactNode } from \"react\";\nimport { cn } from \"../../lib/utils\";\n\nconst checkboxVariants = cva(\n  [\n    \"flex items-center justify-center rounded border-2\",\n    \"transition-all duration-200\",\n    \"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2\",\n    \"disabled:cursor-not-allowed disabled:opacity-50\",\n    \"cursor-pointer\",\n  ],\n  {\n    variants: {\n      variant: {\n        default: [\n          \"border-gray-300 dark:border-gray-700\",\n          \"bg-white dark:bg-gray-900\",\n          \"aria-checked:bg-primary-600 aria-checked:border-primary-600\",\n          \"hover:border-gray-400 dark:hover:border-gray-600\",\n        ],\n        outline: [\n          \"border-primary-600 dark:border-primary-500\",\n          \"bg-transparent\",\n          \"aria-checked:bg-primary-600 aria-checked:border-primary-600\",\n          \"hover:border-primary-700 dark:hover:border-primary-400\",\n        ],\n      },\n      size: {\n        sm: \"h-4 w-4\",\n        md: \"h-5 w-5\",\n        lg: \"h-6 w-6\",\n      },\n    },\n    defaultVariants: {\n      variant: \"default\",\n      size: \"md\",\n    },\n  },\n);\n\nexport interface CheckboxProps\n  extends Omit<AriaCheckboxProps, \"size\">,\n    VariantProps<typeof checkboxVariants> {\n  /** Label text to display next to the checkbox */\n  label?: ReactNode;\n  /** Description text to display below the label */\n  description?: ReactNode;\n  /** Custom check icon */\n  checkIcon?: ReactNode;\n}\n\nexport const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(\n  (\n    {\n      variant,\n      size,\n      label,\n      description,\n      checkIcon,\n      className,\n      children,\n      ...props\n    },\n    ref,\n  ) => {\n    const checkbox = (\n      <AriaCheckbox\n        ref={ref}\n        render={<div />}\n        className={cn(checkboxVariants({ variant, size, className }))}\n        {...props}\n      >\n        <CheckboxCheck>\n          {checkIcon || <CheckIcon />}\n        </CheckboxCheck>\n      </AriaCheckbox>\n    );\n\n    // If there's a label or description, wrap in a label element\n    if (label || description || children) {\n      return (\n        <label className=\"flex items-start gap-2 cursor-pointer group\">\n          {checkbox}\n          <div className=\"flex flex-col gap-1\">\n            {(label || children) && (\n              <span className=\"text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300\">\n                {label || children}\n              </span>\n            )}\n            {description && (\n              <span className=\"text-xs text-gray-500 dark:text-gray-400\">\n                {description}\n              </span>\n            )}\n          </div>\n        </label>\n      );\n    }\n\n    return checkbox;\n  },\n);\n\nCheckbox.displayName = \"Checkbox\";\n\n// Default check icon\nfunction CheckIcon() {\n  return (\n    <svg\n      width=\"100%\"\n      height=\"100%\"\n      viewBox=\"0 0 16 16\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      className=\"text-white\"\n      aria-hidden=\"true\"\n    >\n      <path\n        d=\"M13 4L6 11L3 8\"\n        stroke=\"currentColor\"\n        strokeWidth=\"2\"\n        strokeLinecap=\"round\"\n        strokeLinejoin=\"round\"\n      />\n    </svg>\n  );\n}\n";

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const checkbox: RegistryEntry = {
  name: "checkbox",
  type: "components:ui",
  description: "Checkbox component",
  dependencies: ["@ariakit/react","class-variance-authority","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/checkbox.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/checkbox.tsx"
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
    importSpecifier: "Checkbox",
    moduleSpecifier: "@/components/ui/checkbox"
  }
};
