/**
 * @module index
 */

import { optimize } from 'svgo';
import { Options } from './interface';
import { getTemplate } from './template';
import { XastNode } from 'svgo/lib/types';
import svgcTarget, { Target } from './plugins/target';
import { convertXast, getComponentName, propsName } from './utils';

export default function convert({
  svg,
  path,
  svgProps,
  target = Target.ReactDOM,
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
    target,
    propsName,
    componentName,
    components: Array.from(components)
  });
}
