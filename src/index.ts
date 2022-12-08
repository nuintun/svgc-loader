/**
 * @module index
 */

import schema from './schema';
import { Options } from './interface';
import { convertSvgToJsx } from '@svgo/jsx';
import { defaultTemplate } from './template';
import { LoaderDefinitionFunction } from 'webpack';
import { getComponentName, getTarget, getTargetFile } from './utils';

export default (function loader(content, sourceMap, additionalData) {
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
    return callback(error as Error);
  }

  return callback(null, content, sourceMap, additionalData);
} as LoaderDefinitionFunction<Options>);
