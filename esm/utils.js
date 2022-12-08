/**
 * @package svgox-loader
 * @license MIT
 * @version 0.0.0
 * @author nuintun <nuintun@qq.com>
 * @description SVGO jsx loader.
 * @see https://github.com/nuintun/svgox-loader#readme
 */

import camelcase from 'camelcase';
import { basename, extname, resolve, dirname } from 'path';

/**
 * @module utils
 */
function getTarget(target = 'react-dom') {
  if (target === 'react-native' /* Target.ReactNative */) {
    return 'react-native-svg';
  }
  return target;
}
function getComponentName(filename) {
  return camelcase(basename(filename, extname(filename)), { pascalCase: true });
}
function getTargetFile(filename, componentName) {
  return resolve(dirname(filename), `${componentName}.jsx`);
}

export { getComponentName, getTarget, getTargetFile };
