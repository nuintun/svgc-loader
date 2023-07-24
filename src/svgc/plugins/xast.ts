/**
 * @module xast
 */

import { Plugin } from '/svgc/interface';
import { XastNode } from 'svgo/lib/types';

/**
 * @function svgcXast
 * @description 获取 SVG AST 对象
 * @param callback 回调函数
 */
export function svgcXast(callback: (xast: XastNode) => void): Plugin {
  return {
    name: 'svgc-xast',
    fn(xast) {
      callback(xast);

      return null;
    }
  };
}
