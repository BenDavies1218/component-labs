#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";

const program = new Command();

program
  .name("@component-labs/cli")
  .description("Add components from Component Labs to your project")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize your project for Component Labs")
  .action(async () => {
    await init();
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "components to add")
  .option("-y, --yes", "skip confirmation prompts", false)
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .action(async (components, options) => {
    await add(components, options);
  });

program.parse();
