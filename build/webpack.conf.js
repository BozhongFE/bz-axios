
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const htmlWebpackPlugin = require('html-webpack-plugin');

const version = process.env.npm_package_version;

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules'),
        options: {
          presets: ['babel-polyfill', 'env'],
          cacheDirectory: true,
        }
      }
    ]
  },
  plugins: [
  ],
};

// 所有非开发模式
if (process.argv.indexOf('development') === -1) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new BundleAnalyzerPlugin(),
  ])
}

// 开发模式
if (process.argv.indexOf('development') !== -1) {
  module.exports.entry = {
    main: './src/app.js',
  };
  module.exports.plugins = (module.exports.plugins || []).concat([
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/demo.html',
      chunks: ['main'],
      version,
    }),
  ]);
}

// 生产模式
if (process.argv.indexOf('production') !== -1) {
  module.exports.externals = ['axios', 'qs', 'es6-promise'];
  Object.assign(module.exports, {
    entry: {
      'bz-axios': './src/api/index.js',
    },
    output: {
      filename: '[name].umd.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
  });
}

