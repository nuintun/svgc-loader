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

export interface SvgoxTemplateOptions {
  jsx: string;
  sourceFile: string;
  targetFile: string;
  components: string[];
  componentName: string;
}

export interface SvgoxTemplate {
  (options: SvgoxTemplateOptions): string;
}

export interface Options extends Pick<Config, 'plugins'> {
  svg: string;
  file: string;
  target?: `${Target}`;
  template?: SvgoxTemplate;
  svgProps: Record<string, string | boolean>;
}

export type Schema = Parameters<LoaderContext<Options>['getOptions']>[0];
