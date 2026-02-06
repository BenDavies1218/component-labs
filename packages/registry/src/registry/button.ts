import type { RegistryEntry } from "../schema";

const componentContent = "import {\n  Button as AccessibleButton,\n  ButtonProps as AccessibleButtonProps,\n} from \"@ariakit/react\";\nimport { cva, type VariantProps } from \"class-variance-authority\";\nimport { Loader2 } from \"lucide-react\";\nimport { forwardRef, type ReactNode } from \"react\";\nimport { cn } from \"../../lib/utils\";\n\nconst buttonVariants = cva(\n  [\n    \"inline-flex items-center justify-center gap-2 cursor-pointer\",\n    \"font-medium transition-all duration-200\",\n    \"rounded-lg\",\n    \"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2\",\n    \"disabled:opacity-50 disabled:cursor-not-allowed\",\n    \"active:scale-95\",\n  ],\n  {\n    variants: {\n      variant: {\n        default: [\n          \"bg-primary-600 dark:bg-primary-700 text-white border border-transparent\",\n          \"hover:bg-primary-700 dark:hover:bg-primary-600\",\n          \"focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400\",\n          \"shadow-sm hover:shadow\",\n        ],\n        secondary: [\n          \"bg-secondary-100 dark:bg-secondary-700 text-black dark:text-white border border-transparent\",\n          \"hover:bg-secondary-200 dark:hover:bg-secondary-600\",\n          \"focus-visible:ring-secondary-500 dark:focus-visible:ring-secondary-400\",\n          \"shadow-sm hover:shadow\",\n        ],\n        outline: [\n          \"border-2 border-primary-600 text-foreground/70 dark:text-primary-400 bg-transparent\",\n          \"hover:bg-primary-900 dark:hover:bg-primary-950\",\n          \"focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400\",\n        ],\n        ghost: [\n          \"text-foreground/70 dark:text-foreground/80 bg-transparent border-transparent\",\n          \"hover:bg-primary-900 dark:hover:bg-primary-950\",\n          \"focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400\",\n        ],\n        destructive: [\n          \"bg-error-500 dark:bg-error-600 text-white border border-transparent\",\n          \"hover:bg-error-600 dark:hover:bg-error-500\",\n          \"focus-visible:ring-error-500 dark:focus-visible:ring-error-400\",\n          \"shadow-sm hover:shadow\",\n        ],\n        link: [\n          \"text-primary-600 dark:text-primary-400 underline-offset-4 bg-transparent border-transparent\",\n          \"hover:underline\",\n          \"focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400\",\n        ],\n      },\n      size: {\n        sm: \"h-9 px-3 text-sm\",\n        md: \"h-10 px-4 text-base\",\n        lg: \"h-11 px-6 text-lg\",\n        icon: \"h-10 w-10 p-0\",\n      },\n      fullWidth: {\n        true: \"w-full\",\n        false: \"\",\n      },\n    },\n    defaultVariants: {\n      variant: \"default\",\n      size: \"md\",\n      fullWidth: false,\n    },\n  },\n);\n\nexport interface ButtonProps\n  extends\n    Omit<AccessibleButtonProps, \"disabled\">,\n    VariantProps<typeof buttonVariants> {\n  /** Whether the button is disabled */\n  disabled?: boolean;\n  /** Whether the button should take full width of its container */\n  fullWidth?: boolean;\n  /** Loading state - shows loading indicator and disables the button */\n  loading?: boolean;\n  /** Custom loading indicator element */\n  loadingIndicator?: ReactNode;\n  /** Icon to display before the button text */\n  startIcon?: ReactNode;\n  /** Icon to display after the button text */\n  endIcon?: ReactNode;\n}\n\nexport const Button = forwardRef<HTMLButtonElement, ButtonProps>(\n  (\n    {\n      variant,\n      size,\n      disabled,\n      fullWidth,\n      loading,\n      loadingIndicator,\n      startIcon,\n      endIcon,\n      className,\n      children,\n      ...props\n    },\n    ref,\n  ) => {\n    const isDisabled = disabled || loading;\n\n    return (\n      <AccessibleButton\n        ref={ref}\n        disabled={isDisabled}\n        className={cn(\n          buttonVariants({\n            variant,\n            size,\n            fullWidth,\n            className,\n          }),\n        )}\n        {...props}\n      >\n        {loading &&\n          (loadingIndicator || <Loader2 className=\"h-4 w-4 animate-spin\" />)}\n        {!loading && startIcon && <span className=\"shrink-0\">{startIcon}</span>}\n        {children}\n        {!loading && endIcon && <span className=\"shrink-0\">{endIcon}</span>}\n      </AccessibleButton>\n    );\n  },\n);\n\nButton.displayName = \"Button\";\n";

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const button: RegistryEntry = {
  name: "button",
  type: "components:ui",
  description: "Button component",
  dependencies: ["@ariakit/react","class-variance-authority","lucide-react","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/button.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/button.tsx"
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
    importSpecifier: "Button",
    moduleSpecifier: "@/components/ui/button"
  }
};
