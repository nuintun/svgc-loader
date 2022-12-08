/**
 * @module interface
 */

import { Config } from 'svgo';
import { LoaderContext } from 'webpack';

export const enum Target {
  PReact = 'preact',
  ReactDOM = 'react-dom',
  ReactNative = 'react-native'
}

export interface SvgrTemplateOptions {
  jsx: string;
  sourceFile: string;
  targetFile: string;
  components: string[];
  componentName: string;
}

export interface SvgrTemplate {
  (options: SvgrTemplateOptions): string;
}

export interface Options extends Pick<Config, 'plugins'> {
  svg: string;
  file: string;
  target?: `${Target}`;
  template?: SvgrTemplate;
  svgProps: Record<string, string | boolean>;
}

export type Schema = Parameters<LoaderContext<Options>['getOptions']>[0];
