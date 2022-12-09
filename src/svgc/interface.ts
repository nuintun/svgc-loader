/**
 * @module interface
 */

import { Config } from 'svgo';

export const enum Target {
  PReact = 'preact',
  ReactDOM = 'react-dom',
  ReactNative = 'react-native'
}

export interface SvgcTemplateOptions {
  jsx: string;
  path: string;
  propsName: string;
  components: string[];
  componentName: string;
}

export interface SvgcTemplate {
  (options: SvgcTemplateOptions): string;
}

export type Plugin = ArrayItem<Options['plugins']>;

export interface Options extends Pick<Config, 'plugins'> {
  svg: string;
  path: string;
  target?: `${Target}`;
  template?: SvgcTemplate;
  svgProps: Record<string, unknown>;
}

export type ArrayItem<T> = T extends Array<infer I> ? I : never;
