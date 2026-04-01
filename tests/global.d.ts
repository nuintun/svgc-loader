/**
 * @module global
 */

/// <reference types="@rspack/core/module" />

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  export = content;
}
