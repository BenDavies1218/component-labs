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

// Map of component slugs to their documentation
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

// Get all component slugs
export function getAllComponentSlugs(): string[] {
  return Object.keys(componentDocsMap);
}

// Get documentation for a specific component
export function getComponentDocs(slug: string): ComponentDoc | undefined {
  return componentDocsMap[slug];
}

// Get all components grouped by category
export function getComponentsByCategory() {
  const categories: Record<
    string,
    Array<{ slug: string; doc: ComponentDoc }>
  > = {};

  Object.entries(componentDocsMap).forEach(([slug, doc]) => {
    if (!categories[doc.category]) {
      categories[doc.category] = [];
    }
    categories[doc.category].push({ slug, doc });
  });

  return categories;
}

// Search components by name or description
export function searchComponents(
  query: string,
): Array<{ slug: string; doc: ComponentDoc }> {
  const lowercaseQuery = query.toLowerCase();
  return Object.entries(componentDocsMap)
    .filter(
      ([_, doc]) =>
        doc.name.toLowerCase().includes(lowercaseQuery) ||
        doc.description.toLowerCase().includes(lowercaseQuery),
    )
    .map(([slug, doc]) => ({ slug, doc }));
}
