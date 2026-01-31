// Export components
export { Button } from "./components/button/Button";
export { Checkbox } from "./components/checkbox/Checkbox";
export { Combobox } from "./components/combobox/Combobox";
export { DataTable } from "./components/data-table/DataTable";
export { Dialog } from "./components/dialog/Dialog";
export { Input } from "./components/input/Input";
export { Menu } from "./components/menu/Menu";
export { Switch } from "./components/switch/Switch";

// Export types
export type { ButtonProps } from "./components/button/Button";
export type { CheckboxProps } from "./components/checkbox/Checkbox";
export type { ComboboxProps, ComboboxOption } from "./components/combobox/Combobox";
export type { TableProps as DataTableProps } from "./components/data-table/DataTable";
export type { InputProps } from "./components/input/Input";
export type { SwitchProps } from "./components/switch/Switch";

// Export Menu sub-components and types
export type {
  MenuRootProps,
  MenuTriggerProps,
  MenuContentProps,
  MenuItemComponentProps as MenuItemProps,
  MenuItemCheckboxComponentProps as MenuItemCheckboxProps,
  MenuSeparatorComponentProps as MenuSeparatorProps,
} from "./components/menu/Menu";

// Export Dialog sub-components and types
export type {
  DialogRootProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from "./components/dialog/Dialog";

// Export utilities
export { cn } from "./lib/utils";

// Export documentation
export { buttonDocs } from "./components/button/Button.docs";
export { checkboxDocs } from "./components/checkbox/Checkbox.docs";
export { comboboxDocs } from "./components/combobox/Combobox.docs";
export { dataTableDocs } from "./components/data-table/DataTable.docs";
export { dialogDocs } from "./components/dialog/Dialog.docs";
export { inputDocs } from "./components/input/Input.docs";
export { menuDocs } from "./components/menu/Menu.docs";
export { switchDocs } from "./components/switch/Switch.docs";

// Export doc types
export type { ComponentDoc, PropDoc, ExampleDoc } from "./types/docs";
