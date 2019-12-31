/*
 * axios请求相关
 */
/* eslint no-underscore-dangle: ["error", { "allow": ["_setUrlParam", "_res", "_networkError"] }] */
// import 'es6-promise/auto';
import qs from 'qs';
import axios from 'axios';
import Handler from './handler';

export default class Request extends Handler {
  constructor(withCredentials = true) {
    super();
    axios.defaults.withCredentials = withCredentials;
  }

  _axiosProxy(type = 'get', url, config = {}, axiosConfig = {}) {
    if (!url) return false;
    const requestType = (config.type || type).toLowerCase();
    const apiType = requestType === 'form' ? 'post' : requestType;

    const isParamsOption = !/post|put|delete/gi.test(apiType);
    const apiDataKey = isParamsOption ? 'params' : 'data';

    const urlParams = this._getUrlParams(url);
    const requestParams = isParamsOption ?
      Object.assign(urlParams, this.params, config.data) : this.params;

    const paramsIndex = url.indexOf('?');
    const href = paramsIndex > -1 ? url.substring(0, paramsIndex) : url;
    const apiData = /post|put|delete/gi.test(apiType) ?
      qs.stringify(config.data) : config.data;

    const apiParams = {
      method: apiType,
      url: href,
      [apiDataKey]: isParamsOption ? requestParams : apiData,
      headers: {}
    }
    // 处理请求头
    if (/put|delete/gi.test(requestType)) {
      apiParams.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else if (/form/gi.test(requestType)) {
      apiParams.headers['Content-Type'] = 'multipart/form-data';
      apiParams.onUploadProgress = process => {
        if (config.progress) config.progress(process);
      }
    }
    // 若外部传入axios配置，以外部传入为主
    if (this.ajaxHeaders) Object.assign(apiParams.headers, this.ajaxHeaders);
    for (let key in axiosConfig) {
      if (Object.prototype.hasOwnProperty.call(axiosConfig, key)) {
        apiParams[key] = axiosConfig[key];
      }
    }

    const result = axios(apiParams);
    result.then(res => {
      this._res(res.data, config.success, config.error, config.complete, config.requestComplete);
    }).catch(this._networkError(config.networkError, config.requestComplete));

    return new Promise((resolve, reject) => {
      result.then(res => resolve(res.data)).catch(err => reject(err));
    })
  }
}