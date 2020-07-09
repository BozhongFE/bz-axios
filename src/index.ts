import RequestCore from './module/core';
import AxiosRequest from './request/axios';

import { ApiConfig, ApiParams, ApiRequestHeaders } from './types';

class Api {
  constructor(
    apiConfig: ApiConfig,
    params: ApiParams = {},
    ajaxHeaders: ApiRequestHeaders = {},
    debug = false,
    withCredentials = true
  ) {
    return new RequestCore(
      apiConfig,
      params,
      ajaxHeaders,
      AxiosRequest,
      debug,
      withCredentials
    );
  }
}

export default Api;
