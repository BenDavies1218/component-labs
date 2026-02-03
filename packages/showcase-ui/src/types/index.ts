// Shared types for showcase tools

export interface PropConfig {
  type: 'string' | 'boolean' | 'number' | 'select' | 'object' | 'array';
  label: string;
  default: any;
  options?: string[];
}

export type Props = Record<string, PropConfig>;

export interface ShowcaseMetadata {
  title: string;
  description?: string;
}

export interface Showcase {
  id: string;
  name: string;
  title: string;
  component: (props?: any) => React.ReactElement;
  props?: Props;
  metadata?: ShowcaseMetadata;
}

export type ShowcaseGroups = Record<string, Showcase[]>;

export type Theme = 'light' | 'dark' | 'system';
export type ControlsPosition = 'bottom' | 'right';
export type ViewportSize = 'responsive' | 'mobile' | 'tablet' | 'desktop';
