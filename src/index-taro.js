import taroRequest from './request/taro';
import RequestCore from './module/core';

class API extends RequestCore {
  constructor(apiConf, request, params, ajaxHeaders, debug = false) {
    if (typeof request !== 'function') {
      request = taroRequest;
    }
    super(apiConf, request, params, ajaxHeaders, debug);
  }
}

export default API;