# Publishing Guide for Component Labs Packages

This guide will help you publish all Component Labs packages to npm.

## Prerequisites

1. **npm Account**: You need an npm account with publish access
2. **npm Login**: Must be logged in via CLI
3. **2FA**: Recommended to have 2FA enabled on npm

## Pre-Publishing Checklist

- [ ] All tests pass
- [ ] All packages build successfully
- [ ] Documentation is up to date
- [ ] CHANGELOG updated (if applicable)
- [ ] Version numbers are correct
- [ ] You're logged into npm (`npm whoami`)

## Step 1: Login to npm

```bash
npm login
```

Enter your:

- Username
- Password
- Email
- 2FA code (if enabled)

Verify with:

```bash
npm whoami
```

## Step 2: Build All Packages

```bash
# Build UI package (ignore TypeScript doc errors - they're non-blocking)
pnpm --filter @component-labs/ui run build

# Build CLI
pnpm --filter @component-labs/cli run build

# Build Registry (no build needed - publishes source)
pnpm --filter @component-labs/registry run build

# Build React Showcase CLI
pnpm --filter @component-labs/react-showcase run build:cli

# Build Next.js Showcase CLI
pnpm --filter @component-labs/nextjs-showcase run build:cli
```

## Step 3: Publish Packages

**IMPORTANT**: Packages must be published in this order due to dependencies:

### 1. Registry (no dependencies)

```bash
cd packages/registry
npm publish --access public
cd ../..
```

### 2. CLI (depends on registry)

First, update `package.json` to use the published registry version:

```bash
pnpm --filter @component-labs/cli run build
# Edit package.json: Change "@component-labs/registry": "workspace:*" to "@component-labs/registry": "^0.0.1"
npm publish --access public
cd ../..
```

### 3. UI Package (no dependencies on other Component Labs packages)

```bash
cd packages/ui
npm publish --access public
cd ../..
```

### 4. React Showcase

```bash
cd apps/react-showcase
npm publish --access public
cd ../..
```

### 5. Next.js Showcase

```bash
cd apps/nextjs-showcase
npm publish --access public
cd ../..
```

## Quick Publish Script

For convenience, here's a script that publishes everything:

```bash
#!/bin/bash
set -e

echo "🚀 Publishing Component Labs packages..."

# Check npm login
if ! npm whoami > /dev/null 2>&1; then
  echo "❌ Not logged in to npm. Please run: npm login"
  exit 1
fi

echo "✓ Logged in as: $(npm whoami)"

# Build packages
echo "\n📦 Building packages..."
pnpm --filter @component-labs/cli run build
pnpm --filter @component-labs/react-showcase run build:cli
pnpm --filter @component-labs/nextjs-showcase run build:cli

# Publish in order
echo "\n📤 Publishing @component-labs/registry..."
cd packages/registry && npm publish --access public && cd ../..

echo "\n📤 Publishing @component-labs/cli..."
cd packages/cli && npm publish --access public && cd ../..

echo "\n📤 Publishing @component-labs/ui..."
cd packages/ui && npm publish --access public && cd ../..

echo "\n📤 Publishing @component-labs/react-showcase..."
cd apps/react-showcase && npm publish --access public && cd ../..

echo "\n📤 Publishing @component-labs/nextjs-showcase..."
cd apps/nextjs-showcase && npm publish --access public && cd ../..

echo "\n✅ All packages published successfully!"
echo "\nNext steps:"
echo "1. Test installations: npx @component-labs/cli init"
echo "2. Update documentation if needed"
echo "3. Create GitHub release tags"
```

Save this as `scripts/publish-all.sh` and run:

```bash
chmod +x scripts/publish-all.sh
./scripts/publish-all.sh
```

## Dry Run (Test Publishing)

Before actually publishing, you can do a dry run:

```bash
cd packages/registry
npm publish --dry-run
```

This shows what will be published without actually publishing.

## Post-Publishing

### 1. Verify Installations

```bash
# Test CLI installation
npx @component-labs/cli@latest init

# Test UI package
npm view @component-labs/ui

# Test showcases
npm view @component-labs/react-showcase
npm view @component-labs/nextjs-showcase
```

### 2. Create Git Tags

```bash
git tag v0.0.1
git push origin v0.0.1
```

### 3. Create GitHub Release

Go to GitHub > Releases > Create new release

## Package Details

### @component-labs/registry

- **Version**: 0.0.1
- **License**: MIT
- **Description**: Component registry for Component Labs
- **Files**: src/

### @component-labs/cli

- **Version**: 0.0.1
- **License**: MIT
- **Description**: CLI for installing Component Labs components
- **Files**: dist/, README.md
- **Bin**: componentlabs

### @component-labs/ui

- **Version**: 0.0.1
- **License**: MIT
- **Description**: React UI component library with Ariakit and Tailwind CSS
- **Files**: dist/, src/styles/

### @component-labs/react-showcase

- **Version**: 0.5.0
- **License**: AGPL-3.0
- **Description**: A lightweight component showcase tool for React components
- **Files**: dist/, src/, index.html, templates/, scripts/, README.md
- **Bin**: component-showcase, showcase

### @component-labs/nextjs-showcase

- **Version**: 0.1.0
- **License**: AGPL-3.0
- **Description**: A lightweight component showcase tool for Next.js with SSR support
- **Files**: dist/, src/, app/, templates/, scripts/, README.md
- **Bin**: nextjs-showcase, showcase-next

## Troubleshooting

### "You do not have permission to publish"

You need to be logged in and have publish access to the `@component-labs` scope.

```bash
npm login
```

### "Package name too similar to existing package"

The package name might conflict. Check on npmjs.com.

### "Version already exists"

You need to bump the version in package.json:

```bash
npm version patch  # 0.0.1 -> 0.0.2
npm version minor  # 0.0.1 -> 0.1.0
npm version major  # 0.0.1 -> 1.0.0
```

### Build errors

Make sure all packages build:

```bash
pnpm run build  # From root
```

## Version Strategy

- **Patch** (0.0.x): Bug fixes
- **Minor** (0.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes

## Important Notes

1. **CLI Dependency**: After publishing registry, update CLI's package.json to use the published version instead of `workspace:*`

2. **UI Package**: The build may show TypeScript errors for doc files, but the build completes successfully. These can be fixed later.

3. **Testing**: Always test the published packages by installing them in a fresh project before announcing the release.

4. **Licenses**: Note that showcase packages use AGPL-3.0, while ui/cli/registry use MIT.

## Next Release

When preparing for the next release:

1. Update version in all package.json files
2. Update CHANGELOG.md
3. Update documentation
4. Run tests
5. Build packages
6. Follow publishing steps above
