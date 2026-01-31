"use client";

import Link from "next/link";
import { useState } from "react";
import { Coffee, Menu, Star, X } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <span className="font-mono text-sm font-bold text-background">
              CL
            </span>
          </div>
          <span className="font-semibold text-foreground">Component Labs</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#components"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <Link
            href="/react-showcase"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            React Showcase
          </Link>
          <Link
            href="#docs"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/BenDavies1218/component-labs"
            target="_blank"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <RainbowButton size="sm" asChild variant="default">
            <Link
              href="https://github.com/BenDavies1218/component-labs"
              target="_blank"
              className="flex items-center gap-2 group"
            >
              <Star className="h-4 w-4 transition-all group-hover:text-yellow-400 group-hover:fill-yellow-400" />
              <span className="transition-colors group-hover:text-yellow-400">
                Star on GitHub
              </span>
            </Link>
          </RainbowButton>

          <RainbowButton size="sm" asChild variant="default">
            <Link
              href="https://buymeacoffee.com/bendavies"
              target="_blank"
              className="flex items-center gap-2 group"
            >
              <Coffee className="h-4 w-4 transition-all group-hover:text-yellow-400 group-hover:fill-yellow-400" />
              <span className="transition-colors group-hover:text-yellow-400">
                Buy me a coffee
              </span>
            </Link>
          </RainbowButton>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#components"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Components
            </Link>
            <Link
              href="/react-showcase"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              React Showcase
            </Link>
            <Link
              href="#docs"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="https://github.com/BenDavies1218/component-labs"
              target="_blank"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              GitHub
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <RainbowButton size="sm" asChild variant="default">
                <Link
                  href="https://github.com/BenDavies1218/component-labs"
                  target="_blank"
                  className="flex items-center gap-2 group"
                >
                  <Star className="h-4 w-4 transition-all group-hover:text-yellow-400 group-hover:fill-yellow-400" />
                  <span className="transition-colors group-hover:text-yellow-400">
                    Star on GitHub
                  </span>
                </Link>
              </RainbowButton>

              <RainbowButton size="sm" asChild variant="default">
                <Link
                  href="https://buymeacoffee.com/bendavies"
                  target="_blank"
                  className="flex items-center gap-2 group"
                >
                  <Coffee className="h-4 w-4 transition-all group-hover:text-yellow-400 group-hover:fill-yellow-400" />
                  <span className="transition-colors group-hover:text-yellow-400">
                    Buy me a coffee
                  </span>
                </Link>
              </RainbowButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
