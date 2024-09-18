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
  // 如果禁用配置文件，返回 null
  if (configFile === false) {
    return null;
  }

  // 如果没有指定配置文件，使用默认配置
  if (configFile == null) {
    return await loadConfig(null, context);
  }

  // 否则使用指定的配置文件
  return await loadConfig(configFile, context);
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
          callback(error);
        }
      );
    },
    error => {
      callback(error);
    }
  );
} satisfies LoaderDefinition<Options>);
