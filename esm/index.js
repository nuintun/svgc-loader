/**
 * @package svgox-loader
 * @license MIT
 * @version 0.0.0
 * @author nuintun <nuintun@qq.com>
 * @description SVGO jsx loader.
 * @see https://github.com/nuintun/svgox-loader#readme
 */

import schema from './schema.js';
import { convertSvgToJsx } from '@svgo/jsx';
import { defaultTemplate } from './template.js';
import { getComponentName, getTargetFile, getTarget } from './utils.js';

/**
 * @module index
 */
const loader = function loader(content, sourceMap, additionalData) {
  const callback = this.async();
  const sourceFile = this.resourcePath;
  const options = this.getOptions(schema);
  const componentName = getComponentName(sourceFile);
  const targetFile = getTargetFile(sourceFile, componentName);
  const { target, template = defaultTemplate(target) } = options;
  const { jsx, components } = convertSvgToJsx({
    svg: content,
    file: sourceFile,
    plugins: options.plugins,
    target: getTarget(target),
    svgProps: options.svgProps
  });
  try {
    content = template({
      jsx,
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

export { loader as default };
