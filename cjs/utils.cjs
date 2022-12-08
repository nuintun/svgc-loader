/**
 * @package svgox-loader
 * @license MIT
 * @version 0.0.0
 * @author nuintun <nuintun@qq.com>
 * @description SVGO jsx loader.
 * @see https://github.com/nuintun/svgox-loader#readme
 */

'use strict';

const camelcase = require('camelcase');
const path = require('path');

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e };
}

const camelcase__default = /*#__PURE__*/ _interopDefault(camelcase);

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
  return camelcase__default.default(path.basename(filename, path.extname(filename)), { pascalCase: true });
}
function getTargetFile(filename, componentName) {
  return path.resolve(path.dirname(filename), `${componentName}.jsx`);
}

exports.getComponentName = getComponentName;
exports.getTarget = getTarget;
exports.getTargetFile = getTargetFile;
