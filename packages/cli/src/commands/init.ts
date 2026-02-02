import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import prompts from "prompts";
import pc from "picocolors";
import ora from "ora";

export async function init(cwd: string = process.cwd()) {
  const configPath = resolve(cwd, "components.json");

  // Check if config already exists
  if (existsSync(configPath)) {
    console.log(pc.yellow("⚠ components.json already exists"));
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Do you want to overwrite the existing configuration?",
      initial: false,
    });

    if (!overwrite) {
      console.log(pc.dim("Cancelled"));
      return;
    }
  }

  console.log("");
  console.log(pc.bold("Welcome to Component Labs!"));
  console.log("");

  // Detect project structure
  const hasSrc = existsSync(resolve(cwd, "src"));
  const hasApp = existsSync(resolve(cwd, "app"));
  const isNextJs = existsSync(resolve(cwd, "next.config.js")) || existsSync(resolve(cwd, "next.config.ts"));

  // Prompt for configuration
  const options = await prompts([
    {
      type: "toggle",
      name: "tsx",
      message: "Would you like to use TypeScript?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "select",
      name: "style",
      message: "Which style would you like to use?",
      choices: [
        { title: "Default", value: "default", description: "Component Labs default style" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "tailwindConfig",
      message: "Where is your tailwind.config located?",
      initial: "tailwind.config.ts",
    },
    {
      type: "text",
      name: "tailwindCss",
      message: "Where is your global CSS file?",
      initial: isNextJs && hasApp ? "app/globals.css" : hasSrc ? "src/index.css" : "index.css",
    },
    {
      type: "toggle",
      name: "cssVariables",
      message: "Would you like to use CSS variables for theming?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "text",
      name: "components",
      message: "Configure the import alias for components:",
      initial: "@/components",
    },
    {
      type: "text",
      name: "utils",
      message: "Configure the import alias for utils:",
      initial: "@/lib/utils",
    },
  ]);

  if (!options.tsx) {
    console.log("");
    console.log(pc.red("✗ TypeScript is required"));
    return;
  }

  const spinner = ora("Creating components.json...").start();

  const config = {
    $schema: "https://componentlabs.dev/schema.json",
    style: options.style,
    tsx: options.tsx,
    tailwind: {
      config: options.tailwindConfig,
      css: options.tailwindCss,
      cssVariables: options.cssVariables,
    },
    aliases: {
      components: options.components,
      utils: options.utils,
      ui: options.components + "/ui",
    },
  };

  try {
    writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
    spinner.succeed(pc.green("Created components.json"));

    console.log("");
    console.log(pc.dim("Next steps:"));
    console.log(pc.dim(`  1. Add ${pc.bold("@import '@component-labs/ui/base';")} to your ${options.tailwindCss}`));
    console.log(pc.dim(`  2. Run ${pc.bold("npx @component-labs/cli add button")} to add your first component`));
    console.log("");
  } catch (error) {
    spinner.fail(pc.red("Failed to create components.json"));
    console.error(error);
    process.exit(1);
  }
}
