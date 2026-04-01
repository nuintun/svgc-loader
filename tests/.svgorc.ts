/**
 * @module .svgorc
 * @description Svgo 配置
 */

import type { Config } from 'svgo';
import { createHash } from 'node:crypto';

/**
 * @function svgorc
 * @param mode 构建模式
 */
export default async (mode: string): Promise<Config> => {
  return {
    multipass: mode === 'production',
    plugins: [
      'preset-default',
      'removeTitle',
      {
        name: 'prefixIds',
        params: {
          delim: '-',
          prefix(_xast, { path = '' }) {
            const hash = createHash('sha1');

            return hash.update(path).digest('hex').slice(0, 8);
          }
        }
      }
    ]
  };
};
