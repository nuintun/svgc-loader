/**
 * @module interface
 */

import { Options as SvgcOptions } from './svgc';
import { LoaderContext, LoaderDefinitionFunction } from 'webpack';

export type Options = Omit<SvgcOptions, 'svg' | 'path'>;

export type Loader = LoaderDefinitionFunction<Options>;

export type Schema = Parameters<LoaderContext<Options>['getOptions']>[0];
