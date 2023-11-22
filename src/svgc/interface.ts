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

export type ArrayItem<T> = T extends Array<infer I> ? I : never;

export interface Options extends Omit<Config, 'path' | 'datauri'> {
  svg: string;
  target?: `${Target}`;
  template?: SvgcTemplate;
  configFile?: string | false;
  svgProps: Record<string, unknown>;
}
