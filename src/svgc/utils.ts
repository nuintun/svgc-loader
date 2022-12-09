/**
 * @module utils
 */

import { Options } from './interface';
import { basename, extname } from 'path';
import { generate, parse, walk } from 'css-tree';
import { XastElement, XastNode, XastParent } from 'svgo/lib/types';

export const propsName = 'props';

const { toString } = Object.prototype;

/**
 * @function typeOf
 * @description 获取目标元素类型
 * @param value 目标元素
 */
export function typeOf(value: unknown): string {
  return toString.call(value).slice(8, -1).toLowerCase();
}

/**
 * @function pascalcase
 * @description 帕斯卡命名
 * @param string 目标字符串
 */
export function pascalcase(string: string): string {
  return string
    .replace(/^[a-z]/, match => {
      return match.toUpperCase();
    })
    .replace(/[^A-Z0-9]+([A-Z0-9])?/gi, (_match, char: string | null) => {
      return char == null ? '' : char.toUpperCase();
    });
}

/**
 * @function getComponentName
 * @description 根据文件路径获取组件名称
 * @param path 文件路径
 */
export function getComponentName(path: string): string {
  return `Svgc_${pascalcase(basename(path, extname(path)))}`;
}

/**
 * @function convertStyleProperty
 * @description 标准化属性名
 * @param property 属性名
 */
export function convertStyleProperty(property: string): string {
  if (property.startsWith('--')) {
    return property;
  }

  // Microsoft vendor-prefixes are uniquely cased
  if (property.startsWith('-ms-')) {
    property = property.slice(1);
  }

  return property.toLowerCase().replace(/-(\w|$)/g, (_match, char) => {
    return char.toUpperCase();
  });
}

/**
 * @function convertStyleToObject
 * @description 样式字符串解析为样式对象
 * @param style 样式字符串
 */
export function convertStyleToObject(style: string): Record<string, string> {
  const styleObject: Record<string, string> = {};

  const ast = parse(style, {
    parseValue: false,
    context: 'declarationList'
  });

  walk(ast, node => {
    if (node.type === 'Declaration') {
      styleObject[convertStyleProperty(node.property)] = generate(node.value);
    }
  });

  return styleObject;
}

/**
 * @function convertXastAttributes
 * @description 转换属性
 * @param node 当前节点
 * @param svgProps 属性列表
 * @param parentNode 父节点
 */
export function convertXastAttributes(
  node: XastElement,
  svgProps?: Options['svgProps'],
  parentNode?: XastParent | null
): string {
  // Use map to override existing attributes with passed props
  const props = new Map();

  const attributes = Object.entries(node.attributes);

  for (const [name, value] of attributes) {
    if (/style/i.test(name)) {
      const styleObject = convertStyleToObject(value);

      props.set(name, `{${JSON.stringify(styleObject)}}`);
    } else if (name.includes(':') === false) {
      // Skip attributes with namespaces which are invalid jsx syntax
      props.set(name, JSON.stringify(value));
    }
  }

  const canSetProps = parentNode?.type === 'root';

  if (canSetProps && svgProps) {
    const customProps = Object.entries(svgProps);

    for (const [name, value] of customProps) {
      // Delete previous prop before setting to reset order
      switch (typeOf(value)) {
        case 'string':
          props.set(name, JSON.stringify(value));
          break;
        default:
          props.set(name, `{${JSON.stringify(value)}}`);
      }
    }
  }

  let attrs = '';

  for (const [name, value] of props) {
    attrs += `${name}=${value}`;
  }

  return canSetProps ? `${attrs} {...${propsName}}` : attrs;
}

/**
 * @function convertXast
 * @description 从 AST 转换 SVG 到组件
 * @param node 当前节点
 * @param components 引用组件名列表
 * @param svgProps 属性列表
 * @param parentNode 父节点
 */
export const convertXast = (
  node: XastNode,
  components: Set<string>,
  svgProps?: Options['svgProps'],
  parentNode?: XastParent | null
): string | never => {
  switch (node.type) {
    case 'root': {
      const { children } = node;

      let renderedChildren = '';
      let renderedChildrenCount = 0;

      for (const child of children) {
        const renderedChild = convertXast(child, components, svgProps, node);

        if (renderedChild.length !== 0) {
          renderedChildrenCount += 1;
          renderedChildren += renderedChild;
        }
      }

      if (renderedChildrenCount === 1) {
        return renderedChildren;
      } else {
        return `<>${renderedChildren}</>`;
      }
    }
    case 'element': {
      const { name } = node;

      // collect all components names
      if (name.startsWith(name[0].toUpperCase())) {
        components.add(name);
      }

      const attributes = convertXastAttributes(node, svgProps, parentNode);

      if (node.children.length === 0) {
        return `<${name} ${attributes} />`;
      }

      const { children } = node;

      let renderedChildren = '';

      for (const child of children) {
        renderedChildren += convertXast(child, components, svgProps, node);
      }

      return `<${name} ${attributes}>${renderedChildren}</${name}>`;
    }
    case 'text':
      return `{${JSON.stringify(node.value)}}`;
    case 'cdata':
      return `{${JSON.stringify(node.value)}}`;
    case 'comment':
      return `{/* ${node.value} */}`;
    case 'doctype':
      return '';
    case 'instruction':
      return '';
    default:
      throw new SyntaxError(`Unexpected node type: "${(node as XastNode).type}"`);
  }
};
