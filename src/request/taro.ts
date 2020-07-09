import Taro from '@tarojs/taro';
import Handler from '../module/handler';

import {
  ApiType,
  UpRequestType,
  ApiMethodConfig,
  ApiRequestorConfig,
  ApiParams,
  ApiRequestHeaders,
} from '../types';

class TaroRequest extends Handler {
  protected params: ApiParams;
  protected ajaxHeaders: ApiRequestHeaders;
  constructor(
    params: ApiParams,
    ajaxHeaders: ApiRequestHeaders,
    debug = false
  ) {
    super(debug);
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
  }
  _requestProxy(
    url: string,
    type: ApiType = 'get',
    config: ApiMethodConfig = {},
    requestorConfig: ApiRequestorConfig = {}
  ) {
    // 处理params参数
    const apiData = Object.assign({}, this.params, config.data);
    const requestHeader = {
      'content-type': /form/gi.test(type)
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
    };

    const requestType = config.type || type;
    const apiParams = {
      url,
      method: (/form/gi.test(requestType)
        ? 'POST'
        : requestType.toUpperCase()) as UpRequestType,
      header: requestHeader,
      data: apiData,
      dataType: 'json',
    };

    // 若外部传入axios配置，以外部传入为主
    if (this.ajaxHeaders) Object.assign(apiParams.header, this.ajaxHeaders);
    for (let key in requestorConfig) {
      if (Object.prototype.hasOwnProperty.call(requestorConfig, key)) {
        apiParams[key] = requestorConfig[key];
      }
    }
    return new Promise((resolve, reject) => {
      Taro.request(apiParams)
        .then((res: any) => {
          const { success, error, complete, requestComplete } = config;
          this._res(res.data, success, error, complete, requestComplete);
          resolve(res);
        })
        .catch((error: any) => {
          const { networkError, requestComplete } = config;
          reject(error);

          return this._networkError(networkError, requestComplete);
        });
    });
  }
}

export default TaroRequest;
