/// <reference types="vite/client" />

declare module 'virtual:showcase-files' {
  export const showcaseModules: Array<{
    default: {
      title: string;
      component?: React.ComponentType<any>;
    };
    [key: string]: any;
  }>;
}

declare module 'virtual:global-provider' {
  import { ReactNode } from 'react';

  export const GlobalProvider: React.ComponentType<{ children: ReactNode }>;
  export const hasGlobalProvider: boolean;
}
