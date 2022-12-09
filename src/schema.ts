/**
 * @module schema
 */

import { Schema } from './interface';

export default {
  type: 'object',
  properties: {
    target: {
      description: 'Target for svgo jsx convert.',
      enum: ['preact', 'react-dom', 'react-native']
    },
    svgProps: {
      type: 'object',
      additionalProperties: true,
      description: 'Props for svg component.'
    },
    plugins: {
      type: 'array',
      description: 'Plugins for svgo jsx convert.',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name of svgo plugin.'
          },
          fn: {
            instanceof: 'Function',
            description: 'Processor of svgo plugin.'
          }
        },
        required: ['name', 'fn'],
        additionalProperties: false
      }
    },
    template: {
      instanceof: 'Function',
      description: 'Template for svgo jsx convert.'
    }
  },
  additionalProperties: false
} as Schema;
