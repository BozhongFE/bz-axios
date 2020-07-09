const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const address = require('os').networkInterfaces();
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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    host: getAddressIP() || '0.0.0.0',
    port: 8000,
    disableHostCheck: true,
  },
  plugins: [],
};

// 开发模式
if (process.argv.indexOf('development') !== -1) {
  module.exports.entry = {
    main: './src/app.ts',
  };
  module.exports.plugins = (module.exports.plugins || []).concat([
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main'],
      version,
    }),
  ]);
}
