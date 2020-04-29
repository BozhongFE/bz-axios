import qs from 'qs';
import axios from 'axios';
import Handler from '../module/handler';

class Request extends Handler {
  constructor(params, ajaxHeaders, _debug = false, withCredentials = true) {
    super(_debug);
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
    axios.defaults.withCredentials = withCredentials;
  }
  _requestProxy(type = 'get', url, config = {}, requestConf = {}) {
    if (!url) return false;
    const requestType = (config.type || type).toLowerCase();
    const apiType = requestType === 'form' ? 'post' : requestType;

    const isParamsOption = !/post|put|delete/gi.test(apiType);
    const apiDataKey = isParamsOption ? 'params' : 'data';
    // 处理params参数
    const urlParams = this._getUrlParams(url);
    const requestParams = Object.assign(this.params, urlParams, config.data);
    const paramsIndex = url.indexOf('?');
    const href = paramsIndex > -1 ? url.substring(0, paramsIndex) : url;

    const apiParams = {
      method: apiType,
      url: href,
      // [apiDataKey]: isParamsOption ? requestParams : apiData,
      [apiDataKey]: isParamsOption
        ? requestParams
        : qs.stringify(requestParams),
      headers: {},
    };
    // 处理请求头
    if (/put|delete/gi.test(requestType)) {
      apiParams.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else if (/form/gi.test(requestType)) {
      apiParams.headers['Content-Type'] = 'multipart/form-data';
      apiParams.onUploadProgress = (process) => {
        if (config.progress) config.progress(process);
      };
    }
    // 若外部传入axios配置，以外部传入为主
    if (this.ajaxHeaders) Object.assign(apiParams.headers, this.ajaxHeaders);
    for (let key in requestConf) {
      if (Object.prototype.hasOwnProperty.call(requestConf, key)) {
        apiParams[key] = requestConf[key];
      }
    }

    const result = axios(apiParams);
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
