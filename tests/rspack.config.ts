/**
 * @module webpack
 */

import path from 'node:path';
import swcrc from './.swcrc.ts';
import rspack from '@rspack/core';
import svgorc from './.svgorc.ts';

const mode = 'production';

const svgoOptions = {
  ...(await svgorc(mode)),
  configFile: false
};
const swcOptions = await swcrc(mode);

const compiler = rspack({
  mode,
  name: 'react',
  target: ['web', 'es5'],
  context: path.resolve('tests/src'),
  entry: path.resolve('tests/src/index.ts'),
  output: {
    clean: true,
    publicPath: '/dist/',
    filename: `[name].js`,
    chunkFilename: `[name].js`,
    path: path.resolve('tests/dist'),
    assetModuleFilename: `[path][name][ext]`
  },
  resolve: {
    fallback: { url: false }
  },
  stats: {
    all: false,
    assets: true,
    colors: true,
    errors: true,
    timings: true,
    version: true,
    warnings: true,
    errorsCount: true,
    warningsCount: true,
    groupAssetsByPath: true
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.[jt]sx?$/i,
            exclude: /[\\/]node_modules[\\/]/,
            use: [
              {
                loader: 'builtin:swc-loader',
                options: swcOptions
              }
            ]
          },
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/i,
            use: [
              {
                loader: 'builtin:swc-loader',
                options: swcOptions
              },
              {
                loader: 'svgc-loader/rspack',
                options: svgoOptions
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new rspack.ProgressPlugin({
      progressChars: '█▒',
      prefix: 'svgc-loader',
      template: '<i> {prefix:.cyan.bold} {bar:25.green/white.dim} ({percent}%) {wide_msg:.dim}'
    })
  ]
});

compiler.run((error, stats) => {
  compiler.close(() => {
    if (error) {
      console.error(error);
    } else {
      console.log(stats?.toString(compiler.options.stats));
    }
  });
});
