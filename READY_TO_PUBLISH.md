# Component Labs - Ready to Publish! 🚀

All packages are built and ready to be published to npm!

## Quick Start

**1. Login to npm:**
```bash
npm login
```

**2. Run the publish script:**
```bash
./scripts/publish-all.sh
```

That's it! The script will:
- ✅ Check you're logged in
- ✅ Build all packages
- ✅ Publish in the correct order
- ✅ Handle dependencies

## Packages That Will Be Published

| Package | Version | Description | License |
|---------|---------|-------------|---------|
| @component-labs/registry | 0.0.1 | Component registry | MIT |
| @component-labs/cli | 0.0.1 | CLI installer (like shadcn) | MIT |
| @component-labs/ui | 0.0.1 | React UI component library | MIT |
| @component-labs/react-showcase | 0.5.0 | React component showcase tool | AGPL-3.0 |
| @component-labs/nextjs-showcase | 0.1.0 | Next.js component showcase tool | AGPL-3.0 |

## What's Included

### @component-labs/ui
✅ 8 accessible components (button, input, checkbox, dialog, switch, menu, combobox, data-table)
✅ Tailwind CSS v4 with design tokens
✅ Dark mode support
✅ Full TypeScript support
✅ CSS custom properties for easy theming

### @component-labs/cli
✅ shadcn/ui-style installation
✅ Automatic CSS setup
✅ Component registry integration
✅ Interactive component selection

### @component-labs/react-showcase
✅ Component documentation tool
✅ Live preview
✅ Vite-based
✅ CLI for easy setup

### @component-labs/nextjs-showcase
✅ Next.js App Router support
✅ SSR component showcases
✅ CLI for easy setup

## Pre-Publishing Checklist

- [x] All package.json files have correct metadata
- [x] Packages build successfully
- [x] README files are complete
- [x] CSS structure is properly set up
- [x] Registry has all component entries
- [x] CLI can inject CSS imports
- [x] Publishing script is ready
- [ ] You are logged into npm
- [ ] You have 2FA set up (recommended)

## Manual Publishing (if script fails)

See [PUBLISHING.md](./PUBLISHING.md) for detailed manual steps.

## After Publishing

### 1. Test the Installation

```bash
# Create a new test project
mkdir test-component-labs
cd test-component-labs
npm init -y

# Test CLI
npx @component-labs/cli@latest init

# Follow prompts and add a component
npx @component-labs/cli@latest add button
```

### 2. Verify on npm

```bash
npm view @component-labs/ui
npm view @component-labs/cli
npm view @component-labs/react-showcase
npm view @component-labs/nextjs-showcase
npm view @component-labs/registry
```

### 3. Create Git Tags

```bash
git tag ui-v0.0.1
git tag cli-v0.0.1
git tag registry-v0.0.1
git tag react-showcase-v0.5.0
git tag nextjs-showcase-v0.1.0

git push origin --tags
```

### 4. Create GitHub Release

Go to https://github.com/BenDavies1218/component-labs/releases/new

## Next Steps After Publishing

1. **Update Documentation Site** (if you have one)
2. **Announce on Social Media**:
   - Twitter/X
   - Reddit (r/reactjs, r/webdev)
   - Dev.to
   - Hacker News

3. **Create Example Projects**:
   - Next.js starter with Component Labs
   - Vite React starter with Component Labs

4. **Write Blog Post**:
   - How it works
   - Why you built it
   - Comparison to shadcn/ui

## Troubleshooting

### Not logged in?
```bash
npm login
# Enter credentials
npm whoami  # Verify
```

### Build errors?
```bash
pnpm install  # Reinstall dependencies
pnpm --filter @component-labs/cli run build
pnpm --filter @component-labs/react-showcase run build:cli
pnpm --filter @component-labs/nextjs-showcase run build:cli
```

### Publishing errors?
- Check you have access to `@component-labs` scope on npm
- Verify version numbers aren't already published
- Make sure all files are included in package.json `files` field

## Important Notes

⚠️ **One-Time Setup**: After publishing registry, you may need to update CLI's package.json to reference the published version instead of `workspace:*` for future publishes.

⚠️ **TypeScript Warnings**: The UI package build shows some TypeScript doc errors - these are non-blocking and can be fixed in a future release.

⚠️ **License Differences**: UI/CLI/Registry use MIT, while Showcases use AGPL-3.0. This is intentional.

## Support

If you encounter any issues:
1. Check [PUBLISHING.md](./PUBLISHING.md) for detailed instructions
2. Review package.json files for correctness
3. Ensure you're on the latest npm version: `npm install -g npm@latest`

---

**You're ready to publish! Good luck! 🎉**
