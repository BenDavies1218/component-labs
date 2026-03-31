# Wire Up Component Docs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add missing `index.ts` files to 3 incomplete components and register all 10 missing component docs in the apps/component-labs docs routing.

**Architecture:** The packages/ui package exports all component docs from `src/index.ts`. The apps/component-labs `lib/component-docs.ts` maps slugs to docs objects. Currently only 8 of 18 components are wired up. No new logic is needed — just plumbing.

**Tech Stack:** TypeScript, Next.js (App Router), React

---

### Task 1: Create `checkbox/index.ts`

**Files:**
- Create: `packages/ui/src/components/checkbox/index.ts`

**Step 1: Create the file**

```ts
export { Checkbox, checkboxVariants } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";
export { checkboxDocs } from "./Checkbox.docs";
```

Note: Checkbox has no `.primitive.tsx` file — only export what exists.

**Step 2: Verify build still passes**

Run: `pnpm --filter @component-labs/ui build` (or `tsc --noEmit` if no build script)

**Step 3: Commit**

```bash
git add packages/ui/src/components/checkbox/index.ts
git commit -m "feat: add index.ts for checkbox component"
```

---

### Task 2: Create `dialog/index.ts`

**Files:**
- Create: `packages/ui/src/components/dialog/index.ts`

**Step 1: Create the file**

```ts
export {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./Dialog";
export type {
  DialogRootProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from "./Dialog";
export { dialogDocs } from "./Dialog.docs";
```

**Step 2: Commit**

```bash
git add packages/ui/src/components/dialog/index.ts
git commit -m "feat: add index.ts for dialog component"
```

---

### Task 3: Create `switch/index.ts`

**Files:**
- Create: `packages/ui/src/components/switch/index.ts`

**Step 1: Create the file**

```ts
export { Switch, switchVariants } from "./Switch";
export type { SwitchProps } from "./Switch";
export { switchDocs } from "./Switch.docs";
```

Note: Switch has no `.primitive.tsx` — only export what exists. Also check whether `switchVariants` is actually exported from `Switch.tsx` — if not, omit it.

**Step 2: Commit**

```bash
git add packages/ui/src/components/switch/index.ts
git commit -m "feat: add index.ts for switch component"
```

---

### Task 4: Register all missing docs in component-docs.ts

**Files:**
- Modify: `apps/component-labs/lib/component-docs.ts`

Currently registered: button, checkbox, combobox, data-table, dialog, input, menu, switch

Missing (all already exported from `packages/ui/src/index.ts`):
- alertDocs → slug: "alert"
- badgeDocs → slug: "badge"
- cardDocs → slug: "card"
- labelDocs → slug: "label"
- radioDocs → slug: "radio"
- selectDocs → slug: "select"
- tabsDocs → slug: "tabs"
- textareaDocs → slug: "textarea"
- toastDocs → slug: "toast"
- tooltipDocs → slug: "tooltip"

**Step 1: Update the import line at the top of `component-docs.ts`**

Replace the existing import block:

```ts
import {
  alertDocs,
  badgeDocs,
  buttonDocs,
  cardDocs,
  checkboxDocs,
  comboboxDocs,
  dataTableDocs,
  dialogDocs,
  inputDocs,
  labelDocs,
  menuDocs,
  radioDocs,
  selectDocs,
  switchDocs,
  tabsDocs,
  textareaDocs,
  toastDocs,
  tooltipDocs,
  type ComponentDoc,
} from "../../../packages/ui/src/index";
```

**Step 2: Update the `componentDocsMap` to include all components**

```ts
export const componentDocsMap: Record<string, ComponentDoc> = {
  alert: alertDocs,
  badge: badgeDocs,
  button: buttonDocs,
  card: cardDocs,
  checkbox: checkboxDocs,
  combobox: comboboxDocs,
  "data-table": dataTableDocs,
  dialog: dialogDocs,
  input: inputDocs,
  label: labelDocs,
  menu: menuDocs,
  radio: radioDocs,
  select: selectDocs,
  switch: switchDocs,
  tabs: tabsDocs,
  textarea: textareaDocs,
  toast: toastDocs,
  tooltip: tooltipDocs,
};
```

**Step 3: Verify the app builds / TypeScript is happy**

Run: `pnpm --filter component-labs build` or `pnpm --filter component-labs typecheck`

**Step 4: Commit**

```bash
git add apps/component-labs/lib/component-docs.ts
git commit -m "feat: register all 18 component docs in component-docs.ts"
```

---

### Task 5: Verify all docs pages resolve

**Step 1: Start the dev server**

```bash
pnpm --filter component-labs dev
```

**Step 2: Check each new docs route in the browser**

Visit these URLs and confirm each renders without a 404 or error:
- `/docs/alert`
- `/docs/badge`
- `/docs/card`
- `/docs/label`
- `/docs/radio`
- `/docs/select`
- `/docs/tabs`
- `/docs/textarea`
- `/docs/toast`
- `/docs/tooltip`

**Step 3: Confirm previously working routes still work**

- `/docs/button`
- `/docs/checkbox`
- `/docs/input`
- `/docs/switch`

---

## Components Missing (Future Work)

| Component | Location | What's needed |
|-----------|----------|---------------|
| **Carousel** | `packages/ui/src/components/coursel/` | Rewrite imports (currently uses `@/components/ui/carousel` app paths), add `.docs.tsx`, add `index.ts`, export from `src/index.ts` |
| **Date Picker** | `packages/ui/src/components/date-picker/` | Add `.docs.tsx`, add `index.ts`, export from `src/index.ts`, register in `component-docs.ts` |
| **Slider** | `packages/ui/src/components/slider/` | Currently empty file (misnamed `date-picker.tsx`) — needs full component implementation from scratch |
| **Sub-menu** | `packages/ui/src/components/sub-menu/` | Contains misnamed `date-picker.tsx` — unclear intent, clarify before implementing |
