/**
 * @module utils
 */

import { Target } from './interface';
import { Target as ConvertTarget } from '@svgo/jsx';
import { basename, dirname, extname, resolve } from 'path';

export function getTarget(target: `${Target}` = 'react-dom'): ConvertTarget {
  if (target === Target.ReactNative) {
    return 'react-native-svg';
  }

  return target;
}

export function pascalcase(string: string): string {
  return string
    .replace(/^[a-z]/, match => {
      return match.toUpperCase();
    })
    .replace(/[^A-Z0-9]+([A-Z0-9])?/gi, (_match, char: string | null) => {
      return char == null ? '' : char.toUpperCase();
    });
}

export function getTargetFile(filename: string, componentName: string): string {
  return resolve(dirname(filename), `${componentName}.jsx`);
}

export function getComponentName(filename: string): string {
  return pascalcase(basename(filename, extname(filename))).replace(/^[0-9]/, char => {
    return `_${char}`;
  });
}
