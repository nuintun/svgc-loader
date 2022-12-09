/**
 * @module schema
 */

import { Schema } from './interface';

export const schema: Schema = {
  type: 'object',
  properties: {
    target: {
      description: 'Target for svgc convert.',
      enum: ['preact', 'react-dom', 'react-native']
    },
    svgProps: {
      type: 'object',
      additionalProperties: true,
      description: 'Props for svg component.'
    },
    plugins: {
      type: 'array',
      description: 'Plugins for svgc convert.',
      items: [
        {
          type: 'string',
          description: 'Name of svgo plugin.'
        },
        {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of svgo plugin.'
            },
            params: {
              type: 'object',
              additionalProperties: true,
              description: 'Params of svgo plugin.'
            }
          },
          required: ['name'],
          additionalProperties: false
        },
        {
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
      ]
    },
    template: {
      instanceof: 'Function',
      description: 'Template for svgc convert.'
    }
  },
  additionalProperties: false
};
