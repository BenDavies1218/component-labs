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
