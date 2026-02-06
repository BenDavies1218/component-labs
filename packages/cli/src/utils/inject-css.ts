import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import pc from "picocolors";

const BASE_IMPORT = '@import "@component-labs/ui/base";';
const TAILWIND_IMPORT = '@import "tailwindcss";';

export interface InjectCSSOptions {
  cssFilePath: string;
  cwd?: string;
  dryRun?: boolean;
}

export async function injectBaseCSS(options: InjectCSSOptions): Promise<boolean> {
  const { cssFilePath, cwd = process.cwd(), dryRun = false } = options;
  const fullPath = resolve(cwd, cssFilePath);

  // Check if file exists
  if (!existsSync(fullPath)) {
    console.log(pc.yellow(`⚠ CSS file not found: ${cssFilePath}`));
    console.log(pc.dim(`  Creating ${cssFilePath} with default imports...`));

    if (!dryRun) {
      const defaultContent = `${TAILWIND_IMPORT}\n${BASE_IMPORT}\n`;
      writeFileSync(fullPath, defaultContent, "utf-8");
      console.log(pc.green(`✓ Created ${cssFilePath}`));
    }
    return true;
  }

  // Read existing content
  const content = readFileSync(fullPath, "utf-8");

  // Check if already imported
  if (content.includes(BASE_IMPORT)) {
    console.log(pc.dim(`  ${BASE_IMPORT} already present in ${cssFilePath}`));
    return true;
  }

  // Find the best place to inject
  let updatedContent: string;

  // If file has @import "tailwindcss", add our import right after
  if (content.includes(TAILWIND_IMPORT)) {
    updatedContent = content.replace(
      TAILWIND_IMPORT,
      `${TAILWIND_IMPORT}\n${BASE_IMPORT}`
    );
  }
  // Otherwise, prepend to the file
  else {
    updatedContent = `${TAILWIND_IMPORT}\n${BASE_IMPORT}\n\n${content}`;
  }

  if (dryRun) {
    console.log(pc.dim("  Would add:"), pc.cyan(BASE_IMPORT));
    return true;
  }

  // Write back
  writeFileSync(fullPath, updatedContent, "utf-8");
  console.log(pc.green(`✓ Added ${BASE_IMPORT} to ${cssFilePath}`));
  return true;
}

export function checkTailwindImport(cssFilePath: string, cwd?: string): boolean {
  const fullPath = resolve(cwd || process.cwd(), cssFilePath);

  if (!existsSync(fullPath)) {
    return false;
  }

  const content = readFileSync(fullPath, "utf-8");
  return content.includes(TAILWIND_IMPORT) || content.includes('@import "tailwindcss"');
}
