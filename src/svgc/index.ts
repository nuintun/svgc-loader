/**
 * @module index
 */

import { optimize } from 'svgo';
import { Options } from './interface';
import { XastNode } from 'svgo/lib/types';
import pluginTarget from './plugins/target';
import { defaultTemplate } from './template';
import { convertXast, getComponentName, propsName } from './utils';

export default function convert({
  svg,
  path,
  target,
  svgProps,
  plugins = ['preset-default'],
  template = defaultTemplate(target)
}: Options): string {
  let xast!: XastNode;

  optimize(svg, {
    path,
    plugins: [
      ...plugins,
      pluginTarget(target),
      {
        name: 'svgc-xast',
        fn(root) {
          xast = root;

          return null;
        }
      }
    ]
  });

  const components = new Set<string>();
  const componentName = getComponentName(path);
  const jsx = convertXast(xast, components, svgProps);

  return template({
    jsx,
    path,
    propsName,
    componentName,
    components: Array.from(components)
  });
}
