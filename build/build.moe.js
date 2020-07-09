const fs = require('fs');
const path = require('path');
const { terser } = require('rollup-plugin-terser');

const exists = fs.existsSync;
const name = process.env.npm_package_name;
const version = process.env.npm_package_version;
let modulePath = process.env.npm_config_bz_mod;

if (typeof modulePath === 'undefined') {
  console.log('请先配置模块存放目录');
  console.log('Example: npm config set bz-mod "D:\\source"');
  throw new Error('没有配置模块存放目录');
} else if (!exists(modulePath)) {
  throw new Error('模块目录不存在，请检查配置的模块目录是否正确');
} else {
  modulePath = path.join(modulePath, name);
  if (!exists(modulePath)) fs.mkdirSync(modulePath);
  modulePath = path.join(modulePath, version);
  if (!exists(modulePath)) fs.mkdirSync(modulePath);
}

const getConfig = require('./config');
const resolveFile = function (filePath) {
  return path.join(filePath);
};

const buildConfigInfo = {
  'axios-debug': {
    input: resolveFile('src/index.ts'),
    output: {
      file: resolveFile(`${modulePath}/${name}-debug.js`),
      format: 'es',
    },
  },
  'taro-debug': {
    input: resolveFile('src/index-taro.ts'),
    output: {
      file: resolveFile(`${modulePath}/${name}-taro-debug.js`),
      format: 'es',
    },
  },
  core: {
    input: resolveFile('src/module/core.ts'),
    output: {
      file: resolveFile(`${modulePath}/${name}-core.js`),
      format: 'es',
    },
    plugins: [terser()],
  },
  handler: {
    input: resolveFile('src/module/handler.ts'),
    output: {
      file: resolveFile(`${modulePath}/${name}-handler.js`),
      format: 'es',
    },
    plugins: [terser()],
  },
  axios: {
    input: resolveFile('src/index.ts'),
    output: {
      file: resolveFile(`${modulePath}/${name}.js`),
      format: 'es',
    },
    plugins: [terser()],
  },
  taro: {
    input: resolveFile('src/index-taro.ts'),
    output: {
      file: resolveFile(`${modulePath}/${name}-taro.js`),
      format: 'es',
    },
    plugins: [terser()],
  },
};

const buildConfig = Object.keys(buildConfigInfo).map((name) =>
  getConfig(
    Object.assign({}, buildConfigInfo[name], {
      plugins: [...(buildConfigInfo[name].plugins || [])],
    })
  )
);
module.exports = buildConfig;
