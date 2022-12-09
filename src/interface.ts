/**
 * @module interface
 */

import { Options } from './svgc/interface';
import { LoaderContext, LoaderDefinitionFunction } from 'webpack';

export type Loader = LoaderDefinitionFunction<Options>;

export type Schema = Parameters<LoaderContext<Options>['getOptions']>[0];
