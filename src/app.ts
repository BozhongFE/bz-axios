import BzAxios from './index';
import { ApiConfig } from './types';
/*
import axios from 'axios';
import {
  ApiType,
  ApiConfig,
  ApiMethodConfig,
  ApiRequestorConfig,
  ApiParams,
  ApiRequestHeaders,
  Request,
} from './types';
*/
const config: ApiConfig = {
  api1: {
    url:
      'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
    type: ['POST', 'PUT', 'DELETE'],
  },
  api2: {
    key: {
      url:
        'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
    },
    key2: {
      key3: {
        url:
          'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
      },
      key4:
        'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
    },
  },
};
/*
 * 自定义请求器
class Requestor extends Request {
  protected params: ApiParams;
  protected ajaxHeaders: ApiRequestHeaders;
  constructor(
    params: ApiParams = {},
    ajaxHeaders: ApiRequestHeaders = {},
    debug = false
  ) {
    super();
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
  }
  _requestProxy(
    url: string,
    type: ApiType = 'get',
    config: ApiMethodConfig = {},
    requestorConfig: ApiRequestorConfig = {}
  ) {
    const res = axios({
      url,
      method: type,
    });
    return res;
  }
}
*/
const api = new BzAxios(config, {}, {});
api['_defaultError'] = (data: any) => {};

const result = api['api2']['key2']['key4'].GET();
result.then((res: any) => {}).catch((err: any) => {});
