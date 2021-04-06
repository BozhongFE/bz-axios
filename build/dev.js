const htmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const address = require('os').networkInterfaces();
const version = process.env.npm_package_version;
const {baseConfig} = require('./config');
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
const host = getAddressIP() || '0.0.0.0';
const port = 8000;
module.exports = {
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host,
    port,
    disableHostCheck: true,
  },
  plugins: [],
};

// 开发模式
if (process.argv.indexOf('development') !== -1) {
  module.exports.entry = {
    main: ['babel-polyfill', './src/app.ts'],
  };
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running at http://${host}:${port}`],
        },
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main'],
      version,
    }),
  ]);
}
