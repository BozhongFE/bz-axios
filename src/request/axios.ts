import qs from 'qs';
import axios from 'axios';
import Handler from '../module/handler';

import {
  ApiType,
  ApiMethodConfig,
  ApiRequestorConfig,
  ApiParams,
  ApiRequestHeaders,
} from '../types';

class AxiosRequest extends Handler {
  protected params: ApiParams;
  protected ajaxHeaders: ApiRequestHeaders;
  constructor(
    params: ApiParams = {},
    ajaxHeaders: ApiRequestHeaders = {},
    debug = false,
    withCredentials = true
  ) {
    super(debug);
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
    axios.defaults.withCredentials = withCredentials;
  }
  protected _requestProxy(
    url: string,
    type: ApiType = 'get',
    config: ApiMethodConfig = {},
    requestorConfig: ApiRequestorConfig = {}
  ) {
    const requestType = (config.type || type).toLowerCase();
    const apiType = requestType === 'form' ? 'post' : requestType;

    const isParamsOption = !/post|put|delete/gi.test(apiType);
    const apiDataKey = isParamsOption ? 'params' : 'data';
    // 处理params参数
    const requestParams = Object.assign({}, this.params, config.data);

    const apiParams = {
      method: apiType,
      url,
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
      apiParams.onUploadProgress = (process: any) => {
        if (config.progress) config.progress(process);
      };
    }
    // 若外部传入axios配置，以外部传入为主
    if (this.ajaxHeaders) Object.assign(apiParams.headers, this.ajaxHeaders);
    for (let key in requestorConfig) {
      if (Object.prototype.hasOwnProperty.call(requestorConfig, key)) {
        apiParams[key] = requestorConfig[key];
      }
    }
    return new Promise((resolve, reject) => {
      axios(apiParams)
        .then((res: any) => {
          const { success, error, complete, requestComplete } = config;
          this._res(res.data, success, error, complete, requestComplete);
          resolve(res);
        })
        .catch((error: any) => {
          const { networkError, requestComplete } = config;
          reject(error);
          return this._networkError(networkError, requestComplete)(error);
        });
    });
  }
}

export default AxiosRequest;
