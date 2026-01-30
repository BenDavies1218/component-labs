import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ShowcaseDocs } from "@/components/showcase-docs";
import { ShowcaseFeatures } from "@/components/showcase-features";
import { ShowcaseHero } from "@/components/showcase-hero";
import { ShowcaseQuickstart } from "@/components/showcase-quickstart";

export const metadata = {
  title: "React Showcase - Component Labs",
  description:
    "A lightweight, fast, and developer-friendly alternative to Storybook for showcasing React components. Built with Vite for instant HMR.",
};

export default function ReactShowcasePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ShowcaseHero />
      <ShowcaseFeatures />
      <ShowcaseQuickstart />
      <ShowcaseDocs />
      <Footer />
    </main>
  );
}
