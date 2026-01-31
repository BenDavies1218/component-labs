import {
  buttonDocs,
  checkboxDocs,
  comboboxDocs,
  dataTableDocs,
  dialogDocs,
  inputDocs,
  menuDocs,
  switchDocs,
  type ComponentDoc,
} from "@component-labs/ui";

// Map of component slugs to their documentation
export const componentDocsMap: Record<string, ComponentDoc> = {
  "button": buttonDocs,
  "checkbox": checkboxDocs,
  "combobox": comboboxDocs,
  "data-table": dataTableDocs,
  "dialog": dialogDocs,
  "input": inputDocs,
  "menu": menuDocs,
  "switch": switchDocs,
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
  const categories: Record<string, Array<{ slug: string; doc: ComponentDoc }>> = {};

  Object.entries(componentDocsMap).forEach(([slug, doc]) => {
    if (!categories[doc.category]) {
      categories[doc.category] = [];
    }
    categories[doc.category].push({ slug, doc });
  });

  return categories;
}

// Search components by name or description
export function searchComponents(query: string): Array<{ slug: string; doc: ComponentDoc }> {
  const lowercaseQuery = query.toLowerCase();
  return Object.entries(componentDocsMap)
    .filter(([_, doc]) =>
      doc.name.toLowerCase().includes(lowercaseQuery) ||
      doc.description.toLowerCase().includes(lowercaseQuery)
    )
    .map(([slug, doc]) => ({ slug, doc }));
}
