/**
 * @package svgox-loader
 * @license MIT
 * @version 0.0.0
 * @author nuintun <nuintun@qq.com>
 * @description SVGO jsx loader.
 * @see https://github.com/nuintun/svgox-loader#readme
 */

'use strict';

const schema = require('./schema.cjs');
const jsx = require('@svgo/jsx');
const template = require('./template.cjs');
const utils = require('./utils.cjs');

/**
 * @module index
 */
const loader = function loader(content, sourceMap, additionalData) {
  const callback = this.async();
  const sourceFile = this.resourcePath;
  const options = this.getOptions(schema);
  const componentName = utils.getComponentName(sourceFile);
  const targetFile = utils.getTargetFile(sourceFile, componentName);
  const { target, template: template$1 = template.defaultTemplate(target) } = options;
  const { jsx: jsx$1, components } = jsx.convertSvgToJsx({
    svg: content,
    file: sourceFile,
    plugins: options.plugins,
    target: utils.getTarget(target),
    svgProps: options.svgProps
  });
  try {
    content = template$1({
      jsx: jsx$1,
      components,
      sourceFile,
      targetFile,
      componentName
    });
  } catch (error) {
    return callback(error);
  }
  return callback(null, content, sourceMap, additionalData);
};

module.exports = loader;
