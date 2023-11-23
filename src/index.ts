/**
 * @module index
 */

import { schema } from './schema';
import { Options } from './interface';
import { Config, loadConfig } from 'svgo';
import { LoaderDefinition } from 'webpack';
import { convert, SvgcTemplate, SvgcTemplateOptions } from './svgc';

// 导出接口定义
export { Options, SvgcTemplate, SvgcTemplateOptions };

async function resolveConfig(
  configFile?: string | false,
  context?: string
): Promise<Config | null> {
  if (configFile === false) {
    return null;
  }

  return await loadConfig(configFile as string, context);
}

/**
 * @function loader
 */
export default (function loader(content, sourceMap, additionalData) {
  const callback = this.async();
  const path = this.resourcePath;
  const { configFile, ...options } = this.getOptions(schema);

  resolveConfig(configFile, this.context).then(
    config => {
      convert({ ...config, ...options, path, svg: content }).then(
        content => {
          callback(null, content, sourceMap, additionalData);
        },
        error => {
          callback(error as Error);
        }
      );
    },
    error => {
      callback(error as Error);
    }
  );
} as LoaderDefinition<Options>);
