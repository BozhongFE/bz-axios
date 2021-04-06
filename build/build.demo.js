const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./dev.js');
const htmlWebpackPlugin = require('html-webpack-plugin');

const version = process.env.npm_package_version;

webpack(
  Object.assign({
    mode: 'development',
    entry: {
      main: ['babel-polyfill', './es/app.js'],
    },
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
    output: {
      path: path.resolve(__dirname, '../dist/demo'),
    },
    plugins: (webpackBaseConfig.plugins || []).concat([
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['main'],
        version,
      }),
    ]),
  }),
  (err, stats) => {
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n'
    );
  }
);
