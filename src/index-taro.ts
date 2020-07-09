import RequestCore from './module/core';
import TaroRequest from './request/taro';

import { ApiConfig, ApiParams, ApiRequestHeaders } from './types';

class Api {
  constructor(
    apiConfig: ApiConfig,
    params: ApiParams = {},
    ajaxHeaders: ApiRequestHeaders = {},
    debug = false
  ) {
    return new RequestCore(apiConfig, params, ajaxHeaders, TaroRequest, debug);
  }
}

export default Api;
