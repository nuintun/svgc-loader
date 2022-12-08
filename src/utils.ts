/**
 * @module utils
 */

import camelcase from 'camelcase';
import { Target } from './interface';
import { Target as ConvertTarget } from '@svgo/jsx';
import { basename, extname, dirname, resolve } from 'path';

export function getTarget(target: `${Target}` = 'react-dom'): ConvertTarget {
  if (target === Target.ReactNative) {
    return 'react-native-svg';
  }

  return target;
}

export function getComponentName(filename: string): string {
  return camelcase(basename(filename, extname(filename)), { pascalCase: true });
}

export function getTargetFile(filename: string, componentName: string): string {
  return resolve(dirname(filename), `${componentName}.jsx`);
}
