import type { RegistryEntry } from "../schema";

const componentContent = "import {\n  Menu as AriaMenu,\n  MenuButton,\n  MenuButtonArrow,\n  MenuItem,\n  MenuItemCheckbox,\n  MenuItemCheck,\n  MenuProvider,\n  MenuSeparator,\n  type MenuButtonProps,\n  type MenuItemCheckboxProps,\n  type MenuItemProps,\n  type MenuProps as AriaMenuProps,\n  type MenuProviderProps,\n  type MenuSeparatorProps,\n} from \"@ariakit/react\";\nimport { cva, type VariantProps } from \"class-variance-authority\";\nimport { forwardRef, type ReactNode } from \"react\";\nimport { cn } from \"../../lib/utils\";\n\nconst menuButtonVariants = cva(\n  [\n    \"inline-flex items-center justify-center gap-2\",\n    \"font-medium transition-all duration-200\",\n    \"rounded-lg\",\n    \"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2\",\n    \"disabled:opacity-50 disabled:cursor-not-allowed\",\n  ],\n  {\n    variants: {\n      variant: {\n        default: [\n          \"bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700\",\n          \"hover:bg-gray-50 dark:hover:bg-gray-800\",\n          \"focus-visible:ring-primary-600\",\n          \"shadow-sm hover:shadow\",\n        ],\n        primary: [\n          \"bg-primary-600 text-white border border-transparent\",\n          \"hover:bg-primary-700\",\n          \"focus-visible:ring-primary-600\",\n          \"shadow-sm hover:shadow\",\n        ],\n        ghost: [\n          \"text-gray-900 dark:text-gray-100 bg-transparent border-transparent\",\n          \"hover:bg-gray-100 dark:hover:bg-gray-800\",\n          \"focus-visible:ring-primary-600\",\n        ],\n      },\n      size: {\n        sm: \"h-9 px-3 text-sm\",\n        md: \"h-10 px-4 text-base\",\n        lg: \"h-11 px-6 text-lg\",\n      },\n    },\n    defaultVariants: {\n      variant: \"default\",\n      size: \"md\",\n    },\n  },\n);\n\nconst menuVariants = cva([\n  \"z-50 min-w-[200px] rounded-lg border bg-white p-1 shadow-lg\",\n  \"dark:bg-gray-900 dark:border-gray-700\",\n  \"opacity-0 transition-all duration-200 ease-out\",\n  \"data-enter:opacity-100 data-enter:translate-y-0\",\n  \"data-leave:opacity-0 data-leave:-translate-y-1\",\n]);\n\nconst menuItemVariants = cva(\n  [\n    \"flex items-center gap-2 px-3 py-2 rounded-md\",\n    \"text-sm cursor-pointer\",\n    \"transition-colors duration-150\",\n    \"outline-none\",\n    \"text-gray-900 dark:text-gray-100\",\n    \"data-active-item:bg-primary-100 dark:data-active-item:bg-primary-900\",\n    \"data-active-item:text-primary-900 dark:data-active-item:text-primary-100\",\n    \"disabled:opacity-50 disabled:cursor-not-allowed\",\n  ],\n);\n\nconst menuSeparatorVariants = cva([\n  \"my-1 h-px bg-gray-200 dark:bg-gray-700\",\n]);\n\n// Menu Provider wrapper\nexport interface MenuRootProps extends MenuProviderProps {\n  children: ReactNode;\n}\n\nexport function MenuRoot({ children, ...props }: MenuRootProps) {\n  return <MenuProvider {...props}>{children}</MenuProvider>;\n}\n\n// Menu Button\nexport interface MenuTriggerProps\n  extends MenuButtonProps,\n    VariantProps<typeof menuButtonVariants> {\n  /** Show arrow icon */\n  showArrow?: boolean;\n}\n\nexport const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(\n  ({ variant, size, showArrow = true, className, children, ...props }, ref) => {\n    return (\n      <MenuButton\n        ref={ref}\n        className={cn(menuButtonVariants({ variant, size, className }))}\n        {...props}\n      >\n        {children}\n        {showArrow && (\n          <MenuButtonArrow className=\"transition-transform duration-200 group-data-[open]:rotate-180\" />\n        )}\n      </MenuButton>\n    );\n  },\n);\n\nMenuTrigger.displayName = \"MenuTrigger\";\n\n// Menu Content\nexport interface MenuContentProps extends AriaMenuProps {\n  /** Gutter space between trigger and menu */\n  gutter?: number;\n}\n\nexport const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(\n  ({ gutter = 8, className, children, ...props }, ref) => {\n    return (\n      <AriaMenu\n        ref={ref}\n        gutter={gutter}\n        className={cn(menuVariants(), className)}\n        {...props}\n      >\n        {children}\n      </AriaMenu>\n    );\n  },\n);\n\nMenuContent.displayName = \"MenuContent\";\n\n// Menu Item\nexport interface MenuItemComponentProps extends MenuItemProps {}\n\nexport const MenuItemComponent = forwardRef<\n  HTMLDivElement,\n  MenuItemComponentProps\n>(({ className, children, ...props }, ref) => {\n  return (\n    <MenuItem\n      ref={ref}\n      className={cn(menuItemVariants(), className)}\n      {...props}\n    >\n      {children}\n    </MenuItem>\n  );\n});\n\nMenuItemComponent.displayName = \"MenuItem\";\n\n// Menu Item Checkbox\nexport interface MenuItemCheckboxComponentProps\n  extends MenuItemCheckboxProps {}\n\nexport const MenuItemCheckboxComponent = forwardRef<\n  HTMLDivElement,\n  MenuItemCheckboxComponentProps\n>(({ className, children, ...props }, ref) => {\n  return (\n    <MenuItemCheckbox\n      ref={ref}\n      className={cn(menuItemVariants(), \"pl-8 relative\", className)}\n      {...props}\n    >\n      <MenuItemCheck className=\"absolute left-2 flex items-center justify-center\">\n        <svg\n          width=\"16\"\n          height=\"16\"\n          viewBox=\"0 0 16 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          className=\"text-primary-600 dark:text-primary-400\"\n        >\n          <path\n            d=\"M13 4L6 11L3 8\"\n            stroke=\"currentColor\"\n            strokeWidth=\"2\"\n            strokeLinecap=\"round\"\n            strokeLinejoin=\"round\"\n          />\n        </svg>\n      </MenuItemCheck>\n      {children}\n    </MenuItemCheckbox>\n  );\n});\n\nMenuItemCheckboxComponent.displayName = \"MenuItemCheckbox\";\n\n// Menu Separator\nexport interface MenuSeparatorComponentProps extends MenuSeparatorProps {}\n\nexport const MenuSeparatorComponent = forwardRef<\n  HTMLHRElement,\n  MenuSeparatorComponentProps\n>(({ className, ...props }, ref) => {\n  return (\n    <MenuSeparator\n      ref={ref}\n      className={cn(menuSeparatorVariants(), className)}\n      {...props}\n    />\n  );\n});\n\nMenuSeparatorComponent.displayName = \"MenuSeparator\";\n\n// Compound component export\nexport const Menu = {\n  Root: MenuRoot,\n  Trigger: MenuTrigger,\n  Content: MenuContent,\n  Item: MenuItemComponent,\n  ItemCheckbox: MenuItemCheckboxComponent,\n  Separator: MenuSeparatorComponent,\n};\n";

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const menu: RegistryEntry = {
  name: "menu",
  type: "components:ui",
  description: "Menu component",
  dependencies: ["@ariakit/react","class-variance-authority","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/menu.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/menu.tsx"
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
    importSpecifier: "Menu",
    moduleSpecifier: "@/components/ui/menu"
  }
};
