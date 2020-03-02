import taroRequest from './request/taro';
import RequestCore from './module/core';

class API extends RequestCore {
  constructor(apiConf, Request, params, ajaxHeaders, debug = false) {
    if (typeof Request !== 'function') {
      Request = taroRequest;
    }
    super(apiConf, Request, params, ajaxHeaders, debug);
  }
}

export default API;