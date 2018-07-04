
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.conf.js');
const htmlWebpackPlugin = require('html-webpack-plugin');

// // 判断目标目录路径等
// const exists = fs.existsSync;
// const name = process.env.npm_package_name;
const version = process.env.npm_package_version;
// let modulePath = process.env.npm_config_bz_mod;

// if (typeof modulePath === 'undefined') {
//   console.log('请先配置模块存放目录');
//   console.log('Example: npm config set bz-mod "D:\\source"');
//   throw new Error('没有配置模块存放目录');
// } else if (!exists(modulePath)) {
//   throw new Error('模块目录不存在，请检查配置的模块目录是否正确');
// } else {
//   modulePath = path.join(modulePath, name);
//   if (!exists(modulePath)) fs.mkdirSync(modulePath);
//   modulePath = path.join(modulePath, version);
//   if (!exists(modulePath)) fs.mkdirSync(modulePath);
// }
webpack(Object.assign(webpackBaseConfig, {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    // path: path.resolve(modulePath, './demo'),
    path: path.resolve(__dirname, '../dist/demo'),
  },
  plugins: (webpackBaseConfig.plugins || []).concat([
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/demo.html',
      chunks: ['main'],
      version,
    }),
  ])
}), (err, stats) => {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n\n');
});