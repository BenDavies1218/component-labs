#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { devCommand } from './commands/dev.js';
import { buildCommand } from './commands/build.js';

const program = new Command();

program
  .name('component-showcase')
  .description('A lightweight component showcase tool for React')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize a showcase configuration file')
  .option('-f, --force', 'Overwrite existing config file')
  .action(initCommand);

program
  .command('dev')
  .description('Start the development server')
  .option('-p, --port <port>', 'Port to run the dev server on')
  .option('-c, --config <path>', 'Path to config file')
  .action(devCommand);

program
  .command('build')
  .description('Build static site for production')
  .option('-c, --config <path>', 'Path to config file')
  .option('-o, --out-dir <path>', 'Output directory')
  .action(buildCommand);

program.parse();
