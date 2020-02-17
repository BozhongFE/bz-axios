import axiosRequest from './request/axios';
import RequestCore from './module/core';

class API extends RequestCore {
  constructor(apiConf, request, params, ajaxHeaders, debug = false, withCredentials = true) {
    if (typeof request !== 'function') {
      request = axiosRequest;
    }
    super(apiConf, request, params, ajaxHeaders, debug, withCredentials);
  }
}

export default API;