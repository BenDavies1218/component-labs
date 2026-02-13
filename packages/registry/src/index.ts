import type { Registry } from "./schema";
import { button } from "./registry/button";
import { checkbox } from "./registry/checkbox";
import { input } from "./registry/input";
import { dialog } from "./registry/dialog";
import { switchComponent } from "./registry/switch";
import { menu } from "./registry/menu";
import { combobox } from "./registry/combobox";
import { dataTable } from "./registry/data-table";
import { textarea } from "./registry/textarea";
import { radio } from "./registry/radio";
import { select } from "./registry/select";
import { label } from "./registry/label";
import { toast } from "./registry/toast";
import { alert } from "./registry/alert";
import { badge } from "./registry/badge";
import { card } from "./registry/card";
import { tabs } from "./registry/tabs";
import { tooltip } from "./registry/tooltip";

export const registry: Registry = {
  button,
  checkbox,
  input,
  dialog,
  switch: switchComponent,
  menu,
  combobox,
  "data-table": dataTable,
  textarea,
  radio,
  select,
  label,
  toast,
  alert,
  badge,
  card,
  tabs,
  tooltip,
};

export * from "./schema";
