/**
 * @module index
 */

import { optimize } from 'svgo';
import { Options } from './interface';
import { getTemplate } from './template';
import svgcTarget from './plugins/target';
import { XastNode } from 'svgo/lib/types';
import { convertXast, getComponentName, propsName } from './utils';

export default function convert({
  svg,
  path,
  target,
  svgProps,
  plugins = ['preset-default'],
  template = getTemplate(target)
}: Options): string {
  let xast!: XastNode;

  optimize(svg, {
    path,
    plugins: [
      ...plugins,
      svgcTarget(target),
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
