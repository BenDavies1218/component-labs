import type { RegistryEntry } from "../schema";

const componentContent = "import {\n  Checkbox,\n  type CheckboxProps as AriaCheckboxProps,\n} from \"@ariakit/react\";\nimport { cva, type VariantProps } from \"class-variance-authority\";\nimport { forwardRef, type ReactNode } from \"react\";\nimport { cn } from \"../../lib/utils\";\n\nconst switchVariants = cva(\n  [\n    \"relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent\",\n    \"transition-all duration-200\",\n    \"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2\",\n    \"disabled:cursor-not-allowed disabled:opacity-50\",\n  ],\n  {\n    variants: {\n      variant: {\n        default: [\n          \"bg-gray-300 dark:bg-gray-700\",\n          \"aria-checked:bg-primary-600 dark:aria-checked:bg-primary-500\",\n        ],\n        success: [\n          \"bg-gray-300 dark:bg-gray-700\",\n          \"aria-checked:bg-green-600 dark:aria-checked:bg-green-500\",\n        ],\n      },\n      size: {\n        sm: \"h-5 w-9\",\n        md: \"h-6 w-11\",\n        lg: \"h-7 w-14\",\n      },\n    },\n    defaultVariants: {\n      variant: \"default\",\n      size: \"md\",\n    },\n  },\n);\n\nconst switchThumbVariants = cva(\n  [\n    \"pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0\",\n    \"transition-transform duration-200\",\n  ],\n  {\n    variants: {\n      size: {\n        sm: \"h-4 w-4 group-aria-checked:translate-x-4\",\n        md: \"h-5 w-5 group-aria-checked:translate-x-5\",\n        lg: \"h-6 w-6 group-aria-checked:translate-x-7\",\n      },\n    },\n    defaultVariants: {\n      size: \"md\",\n    },\n  },\n);\n\nexport interface SwitchProps\n  extends Omit<AriaCheckboxProps, \"size\">,\n    VariantProps<typeof switchVariants> {\n  /** Label text to display next to the switch */\n  label?: ReactNode;\n  /** Description text to display below the label */\n  description?: ReactNode;\n}\n\nexport const Switch = forwardRef<HTMLInputElement, SwitchProps>(\n  (\n    { variant, size, label, description, className, children, ...props },\n    ref,\n  ) => {\n    const switchElement = (\n      <Checkbox\n        ref={ref}\n        render={<button type=\"button\" />}\n        className={cn(\"group\", switchVariants({ variant, size, className }))}\n        {...props}\n      >\n        <span\n          aria-hidden=\"true\"\n          className={switchThumbVariants({ size })}\n        />\n      </Checkbox>\n    );\n\n    // If there's a label or description, wrap in a label element\n    if (label || description || children) {\n      return (\n        <label className=\"flex items-start gap-3 cursor-pointer group\">\n          {switchElement}\n          <div className=\"flex flex-col gap-1\">\n            {(label || children) && (\n              <span className=\"text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300\">\n                {label || children}\n              </span>\n            )}\n            {description && (\n              <span className=\"text-xs text-gray-500 dark:text-gray-400\">\n                {description}\n              </span>\n            )}\n          </div>\n        </label>\n      );\n    }\n\n    return switchElement;\n  },\n);\n\nSwitch.displayName = \"Switch\";\n";

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const switchComponent: RegistryEntry = {
  name: "switch",
  type: "components:ui",
  description: "Switch component",
  dependencies: ["@ariakit/react","class-variance-authority","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/switch.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/switch.tsx"
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
    importSpecifier: "Switch",
    moduleSpecifier: "@/components/ui/switch"
  }
};
