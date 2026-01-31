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

export interface ComponentDoc {
  name: string;
  description: string;
  category: "Inputs" | "Data Display" | "Navigation" | "Feedback" | "Layout" | "Overlay";
  installation: string;
  usage: string;
  props?: PropDoc[];
  examples: ExampleDoc[];
  accessibility?: string[];
  relatedComponents?: string[];
}
