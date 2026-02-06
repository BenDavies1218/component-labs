import type { Registry } from "./schema";
import { button } from "./registry/button";
import { checkbox } from "./registry/checkbox";
import { input } from "./registry/input";
import { dialog } from "./registry/dialog";
import { switchComponent } from "./registry/switch";
import { menu } from "./registry/menu";
import { combobox } from "./registry/combobox";
import { dataTable } from "./registry/data-table";

export const registry: Registry = {
  button,
  checkbox,
  input,
  dialog,
  switch: switchComponent,
  menu,
  combobox,
  "data-table": dataTable,
};

export * from "./schema";
