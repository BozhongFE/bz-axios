import {
  Response,
  SuccessResponse,
  ApiMethodConfig,
  CatchFunction,
} from '../types';

type SuccessCb = ApiMethodConfig['success'];
type ErrorCb = ApiMethodConfig['error'];
type CompleteCb = ApiMethodConfig['complete'];
type RequestCompleteCb = ApiMethodConfig['requestComplete'];
type networkErrorCb = ApiMethodConfig['networkError'];

function checkResponsecode(res: Response): res is SuccessResponse {
  return (<SuccessResponse>res).error_code === 0;
}

class Handler {
  protected debug: boolean;
  constructor(debug = false) {
    this.debug = debug;
  }
  _getUrlParams(url: string) {
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
  _setUrlParam(url: string, obj = {}) {
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
  _shunt(...args: any[]) {
    return (...resArgs: any[]) => {
      args.forEach((fn) => {
        if (Object.prototype.toString.call(fn) === '[object Function]') {
          fn.apply(this, resArgs);
        }
      });
    };
  }

  // 异步分流器
  // eslint-disable-next-line class-methods-use-this
  _shuntAsync(...args: any[]) {
    return (...resArgs: any[]) => {
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

  _res(
    data: Response,
    success?: SuccessCb,
    error?: ErrorCb,
    complete?: CompleteCb,
    requestComplete?: RequestCompleteCb
  ) {
    if (this.debug) {
      console.log(data);
      this.debug = false;
    }
    if (checkResponsecode(data)) {
      success && success(data);
    } else if (error) {
      error(data);
    } else {
      this._defaultError(data, 'data');
    }
    complete && complete(data);
    requestComplete && requestComplete(data);
  }
  _defaultError(data: any, type: 'networkError' | 'data' = 'networkError') {
    if (type === 'data') {
      return console.log(
        `格式异常：${
          data && typeof data === 'string' ? data : data.error_message
        }`
      );
    }
    return console.error(data);
  }

  // 网络异常处理
  _networkError(
    networkError?: networkErrorCb,
    requestComplete?: RequestCompleteCb
  ): CatchFunction {
    return (err) => {
      this._defaultError(err);
      requestComplete && requestComplete(err);
      networkError && networkError(err);
      throw new Error(err);
    };
  }
}

export default Handler;
