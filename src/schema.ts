/**
 * @module schema
 */

import { Schema } from './interface';

export const schema: Schema = {
  type: 'object',
  properties: {
    configFile: {
      anyOf: [
        {
          type: 'string'
        },
        {
          type: 'boolean',
          enum: [false]
        }
      ],
      description: 'Config file path for svgo.'
    },
    target: {
      description: 'Target for svgc convert.',
      enum: ['preact', 'react-dom', 'react-native']
    },
    svgProps: {
      type: 'object',
      additionalProperties: true,
      description: 'Props for svg component.'
    },
    template: {
      instanceof: 'Function',
      description: 'Template for svgc convert.'
    },
    multipass: {
      type: 'boolean',
      description: 'Apply multiple optimizations to SVGs.'
    },
    floatPrecision: {
      type: 'number',
      description: 'Floating point precision for plugins that support this parameter.'
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
    js2svg: {
      type: 'object',
      properties: {
        doctypeStart: {
          type: 'string',
          description: 'Start of doctype declaration.'
        },
        doctypeEnd: {
          type: 'string',
          description: 'End of doctype declaration.'
        },
        procInstStart: {
          type: 'string',
          description: 'Start of processing instruction.'
        },
        procInstEnd: {
          type: 'string',
          description: 'End of processing instruction.'
        },
        tagOpenStart: {
          type: 'string',
          description: 'Start of opening tag.'
        },
        tagOpenEnd: {
          type: 'string',
          description: 'End of opening tag.'
        },
        tagCloseStart: {
          type: 'string',
          description: 'Start of closing tag.'
        },
        tagCloseEnd: {
          type: 'string',
          description: 'End of closing tag.'
        },
        tagShortStart: {
          type: 'string',
          description: 'Start of self-closing tag.'
        },
        tagShortEnd: {
          type: 'string',
          description: 'End of self-closing tag.'
        },
        attrStart: {
          type: 'string',
          description: 'Start of attribute.'
        },
        attrEnd: {
          type: 'string',
          description: 'End of attribute.'
        },
        commentStart: {
          type: 'string',
          description: 'Start of comment.'
        },
        commentEnd: {
          type: 'string',
          description: 'End of comment.'
        },
        cdataStart: {
          type: 'string',
          description: 'Start of CDATA section.'
        },
        cdataEnd: {
          type: 'string',
          description: 'End of CDATA section.'
        },
        textStart: {
          type: 'string',
          description: 'Start of text content.'
        },
        textEnd: {
          type: 'string',
          description: 'End of text content.'
        },
        indent: {
          oneOf: [
            {
              type: 'number'
            },
            {
              type: 'string'
            }
          ],
          description: 'Indentation level or string.'
        },
        regEntities: {
          instanceof: 'RegExp',
          description: 'Regular expression for matching entities.'
        },
        regValEntities: {
          instanceof: 'RegExp',
          description: 'Regular expression for matching entity values.'
        },
        encodeEntity: {
          instanceof: 'Function',
          description: 'Function for encoding entities.'
        },
        pretty: {
          type: 'boolean',
          description: 'Whether to format the output prettily.'
        },
        useShortTags: {
          type: 'boolean',
          description: 'Whether to use short tags.'
        },
        eol: {
          enum: ['lf', 'crlf'],
          description: 'End of line character(s).'
        },
        finalNewline: {
          type: 'boolean',
          description: 'Whether to add a final newline character.'
        }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};
