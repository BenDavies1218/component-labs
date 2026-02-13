import React from "react";
import { readFileSync } from "fs";
import { resolve } from "path";
import { notFound } from "next/navigation";

interface ShowcaseManifest {
  config: {
    title: string;
  };
  files: Array<{
    path: string;
    relativePath: string;
  }>;
  cwd: string;
}

function getShowcaseManifest(): ShowcaseManifest | null {
  try {
    const manifestPath =
      process.env.SHOWCASE_MANIFEST_PATH ||
      resolve(process.cwd(), ".showcase-manifest.json");
    const content = readFileSync(manifestPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  const manifest = getShowcaseManifest();
  if (!manifest) return [];

  const components = new Set<string>();
  manifest.files.forEach((file) => {
    const fileName = file.relativePath.split("/").pop() || "";
    const componentName = fileName
      .replace(".showcase.tsx", "")
      .replace(".showcase.jsx", "");
    components.add(componentName);
  });

  return Array.from(components).map((component) => ({
    component,
  }));
}

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  const manifest = getShowcaseManifest();

  if (!manifest) {
    notFound();
  }

  // Find showcase files for this component
  const showcaseFiles = manifest.files.filter((file) => {
    const fileName = file.relativePath.split("/").pop() || "";
    const componentName = fileName
      .replace(".showcase.tsx", "")
      .replace(".showcase.jsx", "");
    return componentName === component;
  });

  if (showcaseFiles.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="mb-4">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to all components
            </a>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{component}</h1>
          <p className="mt-2 text-sm text-gray-600">
            {showcaseFiles.length} showcase file(s)
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {showcaseFiles.map((file) => (
            <div
              key={file.path}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {file.relativePath}
              </h2>
              <div className="bg-gray-50 rounded-lg p-8 min-h-50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">
                  Component preview will be rendered here with SSR
                </p>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Path: {file.relativePath}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
