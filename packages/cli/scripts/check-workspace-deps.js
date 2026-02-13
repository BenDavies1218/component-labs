#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

// Check for workspace: protocol in dependencies
const checkDeps = (deps, type) => {
  if (!deps) return [];

  return Object.entries(deps)
    .filter(([_, version]) => version.includes('workspace:'))
    .map(([name, version]) => ({ name, version, type }));
};

const workspaceDeps = [
  ...checkDeps(packageJson.dependencies, 'dependencies'),
  ...checkDeps(packageJson.devDependencies, 'devDependencies'),
  ...checkDeps(packageJson.peerDependencies, 'peerDependencies'),
  ...checkDeps(packageJson.optionalDependencies, 'optionalDependencies'),
];

if (workspaceDeps.length > 0) {
  console.error('\n❌ ERROR: Found workspace protocol dependencies in package.json:\n');
  workspaceDeps.forEach(({ name, version, type }) => {
    console.error(`  ${type}: ${name}@${version}`);
  });
  console.error('\n⚠️  Workspace dependencies must be replaced with actual versions before publishing.');
  console.error('   Example: "workspace:*" → "^0.0.2"\n');
  process.exit(1);
}

console.log('✅ No workspace dependencies found. Ready to publish!');
