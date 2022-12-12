/**
 * @module index
 */

import { schema } from './schema';
import { Options } from './interface';
import { LoaderDefinition } from 'webpack';
import { convert, SvgcTemplate, SvgcTemplateOptions } from './svgc';

// 导出接口定义
export { Options, SvgcTemplate, SvgcTemplateOptions };

/**
 * @function loader
 */
export default (function loader(content, sourceMap, additionalData) {
  const callback = this.async();
  const path = this.resourcePath;
  const options = this.getOptions(schema);

  convert({ ...options, path, svg: content }).then(
    content => {
      callback(null, content, sourceMap, additionalData);
    },
    error => {
      callback(error as Error);
    }
  );
} as LoaderDefinition<Options>);
