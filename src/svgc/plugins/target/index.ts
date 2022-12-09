/**
 * @module index
 */

import { Plugin, Target } from '../../interface';
import { Mappings, preactAttributes, reactAttributes, reactNativeSvgTags } from './mappings';

type Attributes = Record<string, string>;

function mappingAttributes(attributes: Attributes, mappings: Mappings): Attributes {
  const newAttributes: Record<string, string> = {};

  // Preserve an order of attributes
  for (const [name, value] of Object.entries(attributes)) {
    newAttributes[mappings[name] ?? name] = value;
  }

  return newAttributes;
}

export default (target: `${Target}` = Target.ReactDOM): Plugin => ({
  name: 'svgc-target',
  fn() {
    if (target === Target.ReactNative) {
      return {
        element: {
          enter: (node, parentNode) => {
            const { name } = node;

            if (reactNativeSvgTags[name] == null) {
              // Remove unknown elements
              parentNode.children = parentNode.children.filter(item => {
                return item !== node;
              });
            } else {
              node.name = reactNativeSvgTags[name];

              node.attributes = mappingAttributes(node.attributes, reactNativeSvgTags);
            }
          }
        }
      };
    }

    const mappings = target === Target.PReact ? preactAttributes : reactAttributes;

    return {
      element: {
        enter: node => {
          node.attributes = mappingAttributes(node.attributes, mappings);
        }
      }
    };
  }
});
