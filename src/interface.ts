/**
 * @module interface
 */

import { LoaderContext } from 'webpack';
import { Options as ConvertOptions } from '@svgo/jsx';

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

export interface Options extends Omit<ConvertOptions, 'svg' | 'file' | 'target'> {
  target?: `${Target}`;
  template?: SvgrTemplate;
}

export type Schema = Parameters<LoaderContext<Options>['getOptions']>[0];
