import React from "react";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { ShowcaseLoader } from "./components/ShowcaseLoader";

interface ShowcaseManifest {
  config: {
    title: string;
    showcasePaths: string[];
  };
  files: Array<{
    path: string;
    relativePath: string;
  }>;
  cwd: string;
}

function getShowcaseManifest(): ShowcaseManifest | null {
  try {
    const manifestPath = process.env.SHOWCASE_MANIFEST_PATH ||
      resolve(process.cwd(), ".showcase-manifest.json");
    const content = readFileSync(manifestPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const manifest = getShowcaseManifest();

  const title = manifest?.config.title || "Component Showcase";
  const hasShowcases = existsSync(resolve(process.cwd(), "app/.generated-showcases.ts"));

  return <ShowcaseLoader title={title} hasShowcases={hasShowcases} />;
}
