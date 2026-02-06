#!/bin/bash
set -e

echo "🚀 Publishing Component Labs packages..."
echo ""

# Check npm login
if ! npm whoami > /dev/null 2>&1; then
  echo "❌ Not logged in to npm. Please run: npm login"
  exit 1
fi

echo "✓ Logged in as: $(npm whoami)"
echo ""

# Build packages
echo "📦 Building packages..."
echo "→ Building CLI..."
pnpm --filter @component-labs/cli run build

echo "→ Building React Showcase CLI..."
pnpm --filter @component-labs/react-showcase run build:cli

echo "→ Building Next.js Showcase CLI..."
pnpm --filter @component-labs/nextjs-showcase run build:cli

echo ""
echo "✓ All packages built successfully"
echo ""

# Confirm before publishing
read -p "Ready to publish all packages? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Publishing cancelled."
    exit 1
fi

echo ""

# Publish in order
echo "📤 Publishing @component-labs/registry..."
cd packages/registry
npm publish --access public
cd ../..
echo "✓ Registry published"
echo ""

echo "📤 Publishing @component-labs/cli..."
cd packages/cli
npm publish --access public
cd ../..
echo "✓ CLI published"
echo ""

echo "📤 Publishing @component-labs/ui..."
cd packages/ui
npm publish --access public
cd ../..
echo "✓ UI published"
echo ""

echo "📤 Publishing @component-labs/react-showcase..."
cd apps/react-showcase
npm publish --access public
cd ../..
echo "✓ React Showcase published"
echo ""

echo "📤 Publishing @component-labs/nextjs-showcase..."
cd apps/nextjs-showcase
npm publish --access public
cd ../..
echo "✓ Next.js Showcase published"
echo ""

echo "✅ All packages published successfully!"
echo ""
echo "Next steps:"
echo "  1. Test installation: npx @component-labs/cli@latest init"
echo "  2. Verify on npm: npm view @component-labs/ui"
echo "  3. Create git tags: git tag v0.0.1 && git push origin v0.0.1"
echo "  4. Create GitHub release"
echo ""
