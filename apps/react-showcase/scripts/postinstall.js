#!/usr/bin/env node

import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pc from 'picocolors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cliPath = join(__dirname, '..', 'dist', 'cli', 'index.js');

// Check if CLI is already built
if (!existsSync(cliPath)) {
  console.log(pc.cyan('📦 Building Component Showcase CLI...'));
  try {
    execSync('npm run build:cli', {
      stdio: 'inherit',
      cwd: join(__dirname, '..')
    });
    console.log(pc.green('✅ CLI built successfully!'));
  } catch (error) {
    console.error(pc.red('❌ Failed to build CLI'));
    console.error(error.message);
    process.exit(1);
  }
}
