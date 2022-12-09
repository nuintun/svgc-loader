/**
 * @module index
 */

import convert from './svgc';
import schema from './schema';
import { Loader, Options } from './interface';

export { Options };

/**
 * @function loader
 */
export default (function loader(content, sourceMap, additionalData) {
  const callback = this.async();
  const path = this.resourcePath;
  const options = this.getOptions(schema);

  try {
    content = convert({ ...options, path, svg: content });
  } catch (error) {
    return callback(error as Error);
  }

  return callback(null, content, sourceMap, additionalData);
} as Loader);
