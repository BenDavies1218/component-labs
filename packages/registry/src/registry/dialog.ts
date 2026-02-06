import type { RegistryEntry } from "../schema";

const componentContent = "import {\n  Dialog as AriaDialog,\n  DialogDismiss,\n  DialogHeading,\n  DialogDescription as AriaDialogDescription,\n  useDialogStore,\n  type DialogProps as AriaDialogProps,\n  type DialogStore,\n} from \"@ariakit/react\";\nimport { cva } from \"class-variance-authority\";\nimport { forwardRef, type ReactNode } from \"react\";\nimport { cn } from \"../../lib/utils\";\n\nconst overlayVariants = cva([\n  \"fixed inset-0 z-50 bg-black/50\",\n  \"data-enter:animate-in data-enter:fade-in-0\",\n  \"data-leave:animate-out data-leave:fade-out-0\",\n]);\n\nconst dialogVariants = cva([\n  \"fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2\",\n  \"w-full max-w-lg\",\n  \"rounded-lg border bg-white p-6 shadow-lg\",\n  \"dark:bg-gray-900 dark:border-gray-700\",\n  \"data-enter:animate-in data-enter:fade-in-0 data-enter:zoom-in-95\",\n  \"data-leave:animate-out data-leave:fade-out-0 data-leave:zoom-out-95\",\n]);\n\n// Dialog Root with Store\nexport interface DialogRootProps {\n  children: ReactNode;\n  open?: boolean;\n  onOpenChange?: (open: boolean) => void;\n  defaultOpen?: boolean;\n}\n\nexport function DialogRoot({\n  children,\n  open,\n  onOpenChange,\n  defaultOpen,\n}: DialogRootProps) {\n  const dialog = useDialogStore({\n    open,\n    setOpen: onOpenChange,\n    defaultOpen,\n  });\n\n  return <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>;\n}\n\n// Context for dialog store\nimport { createContext, useContext } from \"react\";\n\nconst DialogContext = createContext<DialogStore | null>(null);\n\nfunction useDialog() {\n  const context = useContext(DialogContext);\n  if (!context) {\n    throw new Error(\"Dialog components must be used within DialogRoot\");\n  }\n  return context;\n}\n\n// Dialog Trigger\nexport interface DialogTriggerProps {\n  children: ReactNode;\n  className?: string;\n}\n\nexport function DialogTrigger({ children, className }: DialogTriggerProps) {\n  const dialog = useDialog();\n\n  return (\n    <button\n      onClick={() => dialog.setOpen(true)}\n      className={className}\n      type=\"button\"\n    >\n      {children}\n    </button>\n  );\n}\n\n// Dialog Content\nexport interface DialogContentProps extends Omit<AriaDialogProps, \"store\"> {\n  /** Whether to show the backdrop overlay */\n  backdrop?: boolean;\n}\n\nexport const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(\n  ({ backdrop = true, className, children, ...props }, ref) => {\n    const dialog = useDialog();\n\n    return (\n      <>\n        {backdrop && (\n          <div\n            className={overlayVariants()}\n            onClick={() => dialog.setOpen(false)}\n          />\n        )}\n        <AriaDialog\n          ref={ref}\n          store={dialog}\n          className={cn(dialogVariants(), className)}\n          {...props}\n        >\n          {children}\n        </AriaDialog>\n      </>\n    );\n  },\n);\n\nDialogContent.displayName = \"DialogContent\";\n\n// Dialog Header\nexport interface DialogHeaderProps {\n  children: ReactNode;\n  className?: string;\n}\n\nexport function DialogHeader({ children, className }: DialogHeaderProps) {\n  return (\n    <div className={cn(\"mb-4 space-y-1.5\", className)}>\n      {children}\n    </div>\n  );\n}\n\n// Dialog Title\nexport interface DialogTitleProps {\n  children: ReactNode;\n  className?: string;\n}\n\nexport const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(\n  ({ children, className }, ref) => {\n    return (\n      <DialogHeading\n        ref={ref}\n        className={cn(\n          \"text-lg font-semibold text-gray-900 dark:text-gray-100\",\n          className,\n        )}\n      >\n        {children}\n      </DialogHeading>\n    );\n  },\n);\n\nDialogTitle.displayName = \"DialogTitle\";\n\n// Dialog Description\nexport interface DialogDescriptionProps {\n  children: ReactNode;\n  className?: string;\n}\n\nexport const DialogDescription = forwardRef<\n  HTMLParagraphElement,\n  DialogDescriptionProps\n>(({ children, className }, ref) => {\n  return (\n    <AriaDialogDescription\n      ref={ref}\n      className={cn(\"text-sm text-gray-500 dark:text-gray-400\", className)}\n    >\n      {children}\n    </AriaDialogDescription>\n  );\n});\n\nDialogDescription.displayName = \"DialogDescription\";\n\n// Dialog Footer\nexport interface DialogFooterProps {\n  children: ReactNode;\n  className?: string;\n}\n\nexport function DialogFooter({ children, className }: DialogFooterProps) {\n  return (\n    <div className={cn(\"mt-6 flex justify-end gap-2\", className)}>\n      {children}\n    </div>\n  );\n}\n\n// Dialog Close\nexport interface DialogCloseProps {\n  children: ReactNode;\n  className?: string;\n}\n\nexport const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(\n  ({ children, className }, ref) => {\n    return (\n      <DialogDismiss ref={ref} className={className}>\n        {children}\n      </DialogDismiss>\n    );\n  },\n);\n\nDialogClose.displayName = \"DialogClose\";\n\n// Compound component export\nexport const Dialog = {\n  Root: DialogRoot,\n  Trigger: DialogTrigger,\n  Content: DialogContent,\n  Header: DialogHeader,\n  Title: DialogTitle,\n  Description: DialogDescription,\n  Footer: DialogFooter,\n  Close: DialogClose,\n};\n";

const utilsContent = "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\n/**\n * Merge Tailwind CSS classes with proper precedence\n */\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n";

export const dialog: RegistryEntry = {
  name: "dialog",
  type: "components:ui",
  description: "Dialog component",
  dependencies: ["@ariakit/react","class-variance-authority","lucide-react","clsx","tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "components/ui/dialog.tsx",
      content: componentContent,
      type: "registry:ui",
      target: "components/ui/dialog.tsx"
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
    importSpecifier: "Dialog",
    moduleSpecifier: "@/components/ui/dialog"
  }
};
