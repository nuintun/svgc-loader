# svgc-loader

<!-- prettier-ignore -->
> SVG component loader.
>
> [![NPM Version][npm-image]][npm-url]
> [![Download Status][download-image]][npm-url]
> [![Languages Status][languages-image]][github-url]
> [![Tree Shakeable][tree-shakeable-image]][bundle-phobia-url]
> [![Side Effect][side-effect-image]][bundle-phobia-url]
> [![License][license-image]][license-url]

## Install

```bash
npm i -D svgc-loader svgo
# or
pnpm add -D svgc-loader svgo
# or
yarn add -D svgc-loader svgo
```

> `svgc-loader` requires Node.js `>=16`.

## Usage

### Webpack

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/i,
        use: [
          {
            loader: 'svgc-loader',
            options: {
              target: 'react-dom',
              plugins: ['preset-default']
            }
          }
        ]
      }
    ]
  }
};
```

### Rspack

```js
// rspack.config.js
export default {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/i,
        use: [
          {
            loader: 'svgc-loader/rspack',
            options: {
              target: 'react-dom',
              plugins: ['preset-default']
            }
          }
        ]
      }
    ]
  }
};
```

### Import SVG as Component

```tsx
import Logo from './logo.svg';

export function App() {
  return <Logo width={120} height={120} aria-label="logo" />;
}
```

## Loader Options

All options are compatible with SVGO v4 and support extra component-conversion options:

- `configFile?: string | false` - path to SVGO config file, or `false` to disable config-file loading.
- `target?: 'preact' | 'react-dom' | 'react-native'` - output runtime target.
- `svgProps?: Record<string, unknown>` - extra props merged into the generated `<svg />`.
- `template?: (options) => string` - custom code template for component generation.
- `multipass?: boolean` - run SVGO in multipass mode.
- `floatPrecision?: number` - precision for SVGO plugins that support it.
- `plugins?: Array<string | { name: string; params?: object } | { name: string; fn: Function }>` - SVGO plugins.
- `js2svg?: object` - SVGO js2svg output formatting options.

## Notes

- Default `target` is `react-dom`.
- Default SVGO plugin list is `['preset-default']`.
- You can provide your own `template` to fully control emitted component code.

[npm-image]: https://img.shields.io/npm/v/svgc-loader?style=flat-square
[npm-url]: https://www.npmjs.org/package/svgc-loader
[download-image]: https://img.shields.io/npm/dm/svgc-loader?style=flat-square
[languages-image]: https://img.shields.io/github/languages/top/nuintun/svgc-loader?style=flat-square
[github-url]: https://github.com/nuintun/svgc-loader
[tree-shakeable-image]: https://img.shields.io/badge/tree--shakeable-true-brightgreen?style=flat-square
[side-effect-image]: https://img.shields.io/badge/side--effect-free-brightgreen?style=flat-square
[bundle-phobia-url]: https://bundlephobia.com/result?p=svgc-loader
[license-image]: https://img.shields.io/github/license/nuintun/svgc-loader?style=flat-square
[license-url]: https://github.com/nuintun/svgc-loader/blob/main/LICENSE
