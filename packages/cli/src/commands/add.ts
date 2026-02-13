import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { execa } from "execa";
import prompts from "prompts";
import pc from "picocolors";
import ora from "ora";
import { getConfig, resolveConfigPaths } from "../utils/get-config.js";
import { registry } from "@component-labs/registry";

export async function add(components: string[], options: { cwd?: string; yes?: boolean }) {
  const cwd = options.cwd || process.cwd();

  // Check for components.json
  const config = getConfig(cwd);
  if (!config) {
    console.log(pc.red("✗ components.json not found"));
    console.log(pc.dim("  Run: npx @component-labs/cli init"));
    return;
  }

  const paths = resolveConfigPaths(cwd, config);

  // Resolve component names
  const componentsToAdd = components.length === 0 ? [] : components;

  if (componentsToAdd.length === 0) {
    const { selected } = await prompts({
      type: "multiselect",
      name: "selected",
      message: "Which components would you like to add?",
      choices: Object.keys(registry).map((name) => ({
        title: name,
        value: name,
        description: registry[name].description,
      })),
    });

    if (!selected || selected.length === 0) {
      console.log(pc.dim("Cancelled"));
      return;
    }

    componentsToAdd.push(...selected);
  }

  // Validate components exist
  const invalidComponents = componentsToAdd.filter((name) => !registry[name]);
  if (invalidComponents.length > 0) {
    console.log(pc.red(`✗ Unknown components: ${invalidComponents.join(", ")}`));
    return;
  }

  console.log("");
  const spinner = ora("Installing components...").start();

  try {
    // Collect all dependencies and files
    const allDependencies = new Set<string>();
    const allFiles: Array<{ path: string; content: string }> = [];

    for (const componentName of componentsToAdd) {
      const component = registry[componentName];

      // Add dependencies
      component.dependencies?.forEach((dep) => allDependencies.add(dep));

      // Add files
      for (const file of component.files) {
        const targetPath = resolve(cwd, paths.components.replace("@/", ""), file.target || file.path);
        allFiles.push({
          path: targetPath,
          content: file.content,
        });
      }

      // Add registry dependencies recursively
      if (component.registryDependencies) {
        for (const dep of component.registryDependencies) {
          if (!componentsToAdd.includes(dep)) {
            componentsToAdd.push(dep);
          }
        }
      }
    }

    // Install dependencies
    if (allDependencies.size > 0) {
      spinner.text = "Installing dependencies...";
      const deps = Array.from(allDependencies);

      // Detect package manager
      const packageManager = existsSync(resolve(cwd, "pnpm-lock.yaml"))
        ? "pnpm"
        : existsSync(resolve(cwd, "yarn.lock"))
        ? "yarn"
        : "npm";

      await execa(packageManager, ["install", ...deps], { cwd });
    }

    // Write files
    spinner.text = "Writing component files...";
    for (const file of allFiles) {
      const dir = dirname(file.path);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(file.path, file.content, "utf-8");
    }

    spinner.succeed(pc.green(`Added ${componentsToAdd.length} component(s)`));

    console.log("");
    console.log(pc.dim("Components added:"));
    componentsToAdd.forEach((name) => {
      console.log(pc.dim(`  • ${name}`));
    });
    console.log("");
  } catch (error) {
    spinner.fail(pc.red("Failed to add components"));
    console.error(error);
    process.exit(1);
  }
}
