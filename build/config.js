const json = require('@rollup/plugin-json');
const autoprefixer = require('autoprefixer');
const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript');
const buble = require('@rollup/plugin-buble');

const { name } = require('../package.json');

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env', 'babel-preset-es2015'],
            plugins: [
              'babel-plugin-transform-runtime',
              'babel-polyfill'
            ],
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env', 'babel-preset-es2015'],
              plugins: [
                'babel-plugin-transform-runtime',
                'babel-polyfill'
              ],
            },
          },
          'ts-loader'
        ]
      },
    ],
  },
  external: [
    'object-assign',
    'promise-polyfill',
    'axios',
    'qs',
    '@tarojs/taro',
  ],
  plugins: [
    resolve({ jsnext: true, preferBuiltins: true, browser: true }),
    commonjs({
      browser: true,
      namedExports: {
        'node_modules/axios/index.js': ['axios'],
      },
    }),
    json(),
    postcss({
      plugins: [
        autoprefixer({
          browsers: ['iOS >= 8', 'Android >= 4.4', 'not ie <= 8'],
        }),
        cssnano(),
      ],
    }),
    typescript(),
    buble(),
  ],
};
const getConfig = (config) => {
  const { input, output } = config;
  const baseOutput = {
    format: 'es',
    name,
    globals: {
      'object-assign': 'ObjectAssign',
      'promise-polyfill': 'Promise',
    },
  };
  return Object.assign({}, baseConfig, {
    ...config,
    input,
    output: Object.assign({}, baseOutput, output),
    plugins: [...baseConfig.plugins, ...config.plugins],
  });
};

exports.baseConfig = baseConfig;
module.exports = getConfig;
