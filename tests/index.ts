/**
 * @module index
 */

import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { convert } from 'svgc-loader/convert';

const path = import.meta.resolve('./logo.svg');
const svg = await readFile(fileURLToPath(path), 'utf-8');

console.log(await convert({ path, svg }));
