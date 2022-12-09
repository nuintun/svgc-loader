/**
 * @module index
 */

import { Plugin } from '../../interface';
import { Mappings, preactAttributes, reactAttributes, reactNativeSvgTags } from './mappings';

export const enum Target {
  PReact = 'preact',
  ReactDOM = 'react-dom',
  ReactNative = 'react-native'
}

type Attributes = Record<string, string>;

/**
 * @function mappingAttributes
 * @description 映射属性
 * @param attributes 原始属性
 * @param mappings 映射属性
 */
function mappingAttributes(attributes: Attributes, mappings: Mappings): Attributes {
  const attrs = Object.entries(attributes);
  const newAttributes: Record<string, string> = {};

  for (const [name, value] of attrs) {
    newAttributes[mappings[name] ?? name] = value;
  }

  return newAttributes;
}

/**
 * @function svgcTarget
 * @description 目标转换插件
 * @param target 编译目标
 */
export function svgcTarget(target: `${Target}` = Target.ReactDOM): Plugin {
  return {
    name: 'svgc-target',
    fn() {
      if (target === Target.ReactNative) {
        return {
          element: {
            enter: (node, parentNode) => {
              const { name } = node;

              if (reactNativeSvgTags[name] == null) {
                // 移除未知元素
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
  };
}
