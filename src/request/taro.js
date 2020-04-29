import Taro from '@tarojs/taro';
import Handler from '../module/handler';

class Request extends Handler {
  constructor(params, ajaxHeaders, _debug = false) {
    super(_debug);
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
  }
  _requestProxy(type = 'get', url, config = {}, requestConf = {}) {
    if (!url) return false;

    // 处理params参数
    const urlParams = this._getUrlParams(url);
    const apiData = Object.assign(this.params, urlParams, config.data);
    const requestHeader = {
      'content-type': /form/gi.test(type)
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
    };
    const paramsIndex = url.indexOf('?');
    const href = paramsIndex > -1 ? url.substring(0, paramsIndex) : url;
    const requestType = config.type || type;
    const apiParams = {
      url: href,
      method: /form/gi.test(requestType) ? 'POST' : requestType.toUpperCase(),
      header: requestHeader,
      data: apiData,
      dataType: config.dataType || 'json',
    };

    // 若外部传入axios配置，以外部传入为主
    if (this.ajaxHeaders) Object.assign(apiParams.header, this.ajaxHeaders);
    for (let key in requestConf) {
      if (Object.prototype.hasOwnProperty.call(requestConf, key)) {
        apiParams[key] = requestConf[key];
      }
    }

    const result = Taro.request(apiParams);
    result
      .then((res) => {
        this._res(
          res.data,
          config.success,
          config.error,
          config.complete,
          config.requestComplete
        );
      })
      .catch(this._networkError(config.networkError, config.requestComplete));

    return new Promise((resolve, reject) => {
      result.then((res) => resolve(res.data)).catch((err) => reject(err));
    });
  }
}

export default Request;
