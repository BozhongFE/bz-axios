const path = require('path');
const serve = require('rollup-plugin-serve');
const template = require('rollup-plugin-generate-html-template');
const livereload = require('rollup-plugin-livereload');
const typescript = require('rollup-plugin-typescript');

const getConfig = require('./config');
const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};
const PORT = 3003;
const config = getConfig({
  input: resolveFile('src/app.ts'),
  output: {
    // extend: true,
    file: resolveFile(`dist/demo/index.js`),
    format: 'umd',
    globals: {
      axios: 'axios',
      qs: 'qs',
      'object-assign': 'ObjectAssign',
      'promise-polyfill': 'Promise',
    },
  },
  watch: {
    include: 'src/**',
  },
  plugins: [
    typescript(),
    serve({
      port: PORT,
      contentBase: [resolveFile('dist/demo')],
    }),
    livereload('dist/demo'),
    template({
      template: resolveFile('src/index.html'),
      target: resolveFile('dist/demo/index.html'),
    }),
  ],
});

module.exports = config;
