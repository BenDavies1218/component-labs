import React from "react";

export interface PropDoc {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export interface ExampleDoc {
  title: string;
  code: string;
  description?: string;
}

export interface PerformanceDoc {
  bundleSize?: string;
  renderTime?: string;
  rerenderOptimization?: string[];
  dependencies?: string[];
}

export interface MethodDoc {
  name: string;
  signature: string;
  description: string;
  parameters?: {
    name: string;
    type: string;
    description: string;
  }[];
  returns?: {
    type: string;
    description: string;
  };
}

export interface ComponentDoc {
  name: string;
  description: string;
  category:
    | "Inputs"
    | "Data Display"
    | "Navigation"
    | "Feedback"
    | "Layout"
    | "Overlay";
  installation: string;
  usage: string;
  props?: PropDoc[];
  examples: ExampleDoc[];
  accessibility?: string[];
  relatedComponents?: string[];
  performance: PerformanceDoc;
  methods?: MethodDoc[];
  dependencies?: string[];
  version?: string;
  status?: "stable" | "beta" | "experimental" | "deprecated";
  preview?: () => React.JSX.Element;
}
