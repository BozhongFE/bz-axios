import qs from 'qs';
import axios from 'axios';
import Handler from '../module/handler';

function request(type = 'get', url, config = {}, requestConf = {}, obj = {}) {
  if (!url) return false;
  axios.defaults.withCredentials =
    typeof obj.withCredentials === 'boolean' ?
    obj.withCredentials : true;
  const handler = new Handler(obj._debug || false);
  const requestType = (config.type || type).toLowerCase();
  const apiType = requestType === 'form' ? 'post' : requestType;

  const isParamsOption = !/post|put|delete/gi.test(apiType);
  const apiDataKey = isParamsOption ? 'params' : 'data';
  // 处理params参数
  const urlParams = handler._getUrlParams(url);
  const requestParams = isParamsOption ?
    Object.assign(urlParams, obj.params, config.data) : obj.params;

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
  if (obj.ajaxHeaders) Object.assign(apiParams.headers, obj.ajaxHeaders);
  for (let key in requestConf) {
    if (Object.prototype.hasOwnProperty.call(requestConf, key)) {
      apiParams[key] = requestConf[key];
    }
  }

  const result = axios(apiParams);
  result.then(res => {
    handler._res(res.data, config.success, config.error, config.complete, config.requestComplete);
  }).catch(handler._networkError(config.networkError, config.requestComplete));

  return new Promise((resolve, reject) => {
    result.then(res => resolve(res.data)).catch(err => reject(err));
  })
}

export default request;