/**
 * @module index
 */

import { optimize } from 'svgo';
import { Options } from './interface';
import { getTemplate } from './template';
import { svgcXast } from './plugins/xast';
import { svgcTarget, Target } from './plugins/target';
import { convertXast, getComponentName, propsName } from './utils';

// 导出接口定义
export * from './interface';

/**
 * @function convert
 * @description 将 SVG 转换为 SVG 组件
 * @param options 配置参数
 */
export function convert({
  svg,
  path,
  svgProps,
  target = Target.ReactDOM,
  plugins = ['preset-default'],
  template = getTemplate(target)
}: Options): Promise<string> {
  return new Promise(resolve => {
    optimize(svg, {
      path,
      plugins: [
        ...plugins,
        svgcTarget(target),
        svgcXast(xast => {
          const components = new Set<string>();
          const componentName = getComponentName(path);
          const jsx = convertXast(xast, components, svgProps);

          resolve(
            template({
              jsx,
              path,
              target,
              propsName,
              componentName,
              components: Array.from(components)
            })
          );
        })
      ]
    });
  });
}
