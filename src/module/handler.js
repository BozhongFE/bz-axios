/*
 * api预处理器/后处理器
 */
/* eslint no-underscore-dangle: ["error", { "allow": ["_defaultError", "_debug"] }] */

class Handler {
  constructor(_debug = false) {
    this._debug = _debug;
  }
  _getUrlParams(url) {
    let href = url;
    const pos = href.indexOf('?');
    const params = {};

    if (pos !== -1) {
      href = href.substr(pos + 1);
      href.split('&').forEach((item) => {
        const data = item.split('=');
        params[data[0]] = data[1];
      });

      return params;
    }

    return params;
  }
  // 拼接url
  // eslint-disable-next-line class-methods-use-this
  _setUrlParam(url, obj = {}) {
    if (!url) return url;

    const params = Object.assign(this._getUrlParams(url), obj);
    const pos = url.indexOf('?');
    const isHadParams = pos !== -1;
    const href = isHadParams ? url.substring(0, pos) : url;

    return (
      href +
      '?' +
      Object.keys(params)
        .map((key) => `${key}=${obj[key]}`)
        .join('&')
    );
  }

  // 同步处理事件分流器，一般用于actions
  _shunt(...args) {
    return (...resArgs) => {
      args.forEach((fn) => {
        if (Object.prototype.toString.call(fn) === '[object Function]') {
          fn.apply(this, resArgs);
        }
      });
    };
  }

  // 异步分流器
  // eslint-disable-next-line class-methods-use-this
  _shuntAsync(...args) {
    return (...resArgs) => {
      let index = 0;
      const loop = () => {
        if (
          Object.prototype.toString.call(args[index]) === '[object Function]'
        ) {
          args[index](
            ...resArgs.concat(() => {
              index += 1;
              if (index < args.length) {
                loop();
              }
            })
          );
        }
      };
      loop();
    };
  }

  // 请求成功后处理接口数据
  _res(data, successCB, errorCB, completeCB, requestComplete) {
    if (this._debug) {
      console.log(data);
      this._debug = false;
    }
    if (data.error_code === 0) {
      if (successCB) successCB(data);
    } else if (errorCB) {
      errorCB(data);
    } else {
      this._defaultError(data, 'data');
    }
    if (completeCB) completeCB(data);
    if (requestComplete) requestComplete(data);
  }

  // 默认网络异常处理方法
  // eslint-disable-next-line class-methods-use-this
  _defaultError(err, type = 'networkError') {
    if (type === 'data')
      return console.log(
        `格式异常：${err && typeof err === 'string' ? err : err.error_message}`
      );
    return console.error(err);
  }

  // 网络异常处理
  _networkError(networkErrorCB, requestCompleteCB) {
    if (this._debug && (networkErrorCB || requestCompleteCB)) {
      this._debug = false;
      return (err) => {
        this._defaultError(err);
        if (networkErrorCB) networkErrorCB(err);
        if (requestCompleteCB) requestCompleteCB(err);
      };
    }
    return (err) => {
      if (requestCompleteCB) requestCompleteCB(err);
      if (networkErrorCB) return networkErrorCB(err);
      return this._defaultError(err);
    };
  }
}

export default Handler;
