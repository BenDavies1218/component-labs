import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <span className="font-mono text-sm font-bold text-background">CL</span>
            </div>
            <span className="font-semibold text-foreground">Component Labs</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <Link
              href="https://github.com/BenDavies1218/component-labs"
              target="_blank"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
            <Link
              href="https://www.npmjs.com/package/@component-labs/react-showcase"
              target="_blank"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              NPM
            </Link>
            <Link
              href="https://github.com/BenDavies1218/component-labs/issues"
              target="_blank"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Issues
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            AGPL-3.0 &copy; {new Date().getFullYear()}{" "}
            <Link
              href="https://github.com/BenDavies1218"
              target="_blank"
              className="text-foreground hover:text-accent"
            >
              Benjamin Davies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
