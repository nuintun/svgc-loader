/**
 * @module interface
 */

import { Config } from 'svgo';
import { Target } from './plugins/target';

export interface SvgcTemplateOptions {
  jsx: string;
  path: string;
  propsName: string;
  target: `${Target}`;
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
