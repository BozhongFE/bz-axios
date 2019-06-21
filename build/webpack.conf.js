
const path = require('path');
const address = require('os').networkInterfaces();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const htmlWebpackPlugin = require('html-webpack-plugin');

const version = process.env.npm_package_version;

// 获取ip
const getAddressIP = () => {
  let ip = '';
  for (const key in address) {
    for (const item of address[key]) {
      if (!ip && item.address && /192(\.[0-9]{1,3}){3}/.test(item.address)) {
        ip = item.address;
      }
    }
  }
  return ip;
};

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
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: getAddressIP() || '0.0.0.0',
    port: 8000,
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

