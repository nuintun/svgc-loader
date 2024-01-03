/**
 * @module index
 */

import { createRequire } from 'module';
import { readFile } from 'fs/promises';
import { convert } from '../esm/svgc/index.js';

const { resolve } = createRequire(import.meta.url);

const path = resolve('./logo.svg');
const svg = await readFile(path);

console.log(await convert({ path, svg }));
