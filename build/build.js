const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const rollup = require('rollup');
const uglify = require('uglify-js');
const builds = require('./config').getAllBuilds();

build(builds);

function build (builds) {
  let built = 0;
  const total = builds.length;
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++;
      if (built < total) {
        next();
      }
    }).catch(logError);
  };

  next();
}

function buildEntry (config) {
  const isProd = !/debug\.js$/.test(config.output.file) && !/(\w+\.){2}js$/.test(config.output.file);
  return rollup.rollup(config)
    .then(bundle => bundle.generate(config.output))
    .then(({ code }) => {
      if (isProd) {
        var minified = uglify.minify(code, {
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code;
        return write(config.output.file, minified, true);
      } else {
        return write(config.output.file, code, true);
      }
    });
}

// 输出文件并显示文件大小
function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''));
      resolve();
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err);
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
          report(' (gzipped: ' + getSize(zipped) + ')');
        });
      } else {
        report();
      }
    });
  });
}

// 获取生成的文件大小
function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function logError (e) {
  console.log(e);
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
