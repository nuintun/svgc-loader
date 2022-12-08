/**
 * @package svgox-loader
 * @license MIT
 * @version 0.0.0
 * @author nuintun <nuintun@qq.com>
 * @description SVGO jsx loader.
 * @see https://github.com/nuintun/svgox-loader#readme
 */

/**
 * @module schema
 */
const schema = {
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
};

export { schema as default };
