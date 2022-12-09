/**
 * @module index
 */

import { readFileSync } from 'fs';
import { createRequire } from 'module';
import convert from '../esm/svgc/index.js';

const { resolve } = createRequire(import.meta.url);

const path = resolve('./logo.svg');
const svg = readFileSync(path);

console.log(convert({ path, svg }));
