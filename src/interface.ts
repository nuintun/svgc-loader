/**
 * @module interface
 */

import { LoaderContext } from 'webpack';
import { Options as SvgcOptions } from './svgc';

export type Options = Omit<SvgcOptions, 'svg' | 'path'>;

export type Schema = Parameters<LoaderContext<Options>['getOptions']>[0];
