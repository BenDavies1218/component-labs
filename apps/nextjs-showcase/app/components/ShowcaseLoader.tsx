"use client";

import { useState, useEffect } from "react";
import type { Showcase } from "@component-labs/showcase-ui";
import { ShowcaseApp } from "./ShowcaseApp";

interface ShowcaseLoaderProps {
  title: string;
  hasShowcases: boolean;
}

export function ShowcaseLoader({ title, hasShowcases }: ShowcaseLoaderProps) {
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasShowcases) {
      setLoading(false);
      return;
    }

    // Dynamically import the showcases client-side
    import("../.generated-showcases")
      .then(({ showcaseModules, showcasePaths }) => {
        const result: Showcase[] = [];

        for (let i = 0; i < showcaseModules.length; i++) {
          const module = showcaseModules[i];
          const filePath = showcasePaths[i]?.path || `showcase-${i}`;

          // Get metadata from default export
          const defaultExport = module.default || {};
          const title = defaultExport.title || "Untitled";
          const baseComponent = defaultExport.component;

          // Process each named export as a showcase variant
          Object.keys(module).forEach((key) => {
            if (key === "default" || key === "__esModule") return;

            const exportValue = module[key];

            // Check if this is a component function
            if (typeof exportValue === "function") {
              const showcase: Showcase = {
                id: `${filePath}-${key}`,
                name: key,
                title: title,
                component: exportValue,
                props: (exportValue as any).props || {},
                metadata: {
                  title: title,
                  description: defaultExport.description,
                },
              };

              result.push(showcase);
            }
          });

          // If no named exports, create a showcase from the default component
          if (result.length === 0 && baseComponent) {
            result.push({
              id: filePath,
              name: "Default",
              title: title,
              component: baseComponent,
              props: {},
              metadata: {
                title: title,
                description: defaultExport.description,
              },
            });
          }
        }

        setShowcases(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load showcases:", error);
        setLoading(false);
      });
  }, [hasShowcases]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--SC-background)" }}>
        <div className="text-center">
          <p style={{ color: "var(--SC-foreground)" }}>Loading showcases...</p>
        </div>
      </div>
    );
  }

  if (showcases.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--SC-background)" }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--SC-foreground)" }}>
            Next.js Component Showcase
          </h1>
          <p className="mb-8" style={{ color: "var(--SC-foreground-muted)" }}>
            No showcase files found. Run the dev server using the CLI.
          </p>
          <code
            className="px-4 py-2 rounded text-sm"
            style={{
              backgroundColor: "var(--SC-background-tertiary)",
              color: "var(--SC-foreground)"
            }}
          >
            npx nextjs-showcase dev
          </code>
        </div>
      </div>
    );
  }

  return <ShowcaseApp showcases={showcases} title={title} />;
}
