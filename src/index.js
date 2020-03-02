import AxiosRequest from './request/axios';
import RequestCore from './module/core';

class API extends RequestCore {
  constructor(apiConf, Request, params, ajaxHeaders, debug = false, withCredentials = true) {
    if (typeof Request !== 'function') {
      Request = AxiosRequest;
    }
    super(apiConf, Request, params, ajaxHeaders, debug, withCredentials);
  }
}

export default API;