import AxiosRequest from '../request/axios';
import TaroRequest from '../request/taro';
import { isArray } from '../check-type';

import {
  ApiConfig,
  ApiType,
  ApiConfigType,
  ApiConfigItem,
  ApiConfigValue,
  ApiMethodConfig,
  ApiRequestorConfig,
  ApiParams,
  ApiRequestHeaders,
  Request,
  AxiosRequestType,
  Requestor,
} from '../types';

function CheckUrlProperty(
  config: ApiConfigItem | ApiConfigValue
): config is ApiConfigItem {
  return (<ApiConfigItem>config).url !== undefined;
}

class RequestCore {
  // protected request: this;
  protected params: ApiParams = {};
  protected ajaxHeaders: ApiRequestHeaders = {};
  protected debug: boolean = false;
  protected withCredentials: boolean = true;
  constructor(
    apiConfig: ApiConfig,
    params: ApiParams = {},
    ajaxHeaders: ApiRequestHeaders = {},
    requestor: Requestor,
    debug = false,
    withCredentials?: boolean
  ) {
    const _this = Object.create(RequestCore.prototype);

    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
    this.debug = debug;
    this.withCredentials = withCredentials;
    // this.request = this.handleRequestor(requestor, _this);
    this.handleRequestor(requestor, _this);

    return this.createMethods(apiConfig, _this);
  }
  protected createMethods(config: ApiConfig, _this: this): this {
    const scoop = (config: ApiConfig, parent: RequestCore) => {
      for (let key in config) {
        const value = config[key];
        if (typeof value === 'string') {
          this.createRequest(_this, parent, key, value);
        } else {
          if (!CheckUrlProperty(value)) {
            if (!parent[key]) parent[key] = {};
            scoop(value, parent[key]);
          } else {
            this.createRequest(_this, parent, key, value.url, value.type);
          }
        }
      }
    };
    scoop(config, _this);
    return _this;
  }
  protected createRequest(
    _this: this,
    obj: RequestCore,
    key: string,
    url: string,
    type: ApiConfigType = 'get'
  ) {
    const requestMethod = (method: ApiType) => {
      return (config: ApiMethodConfig, requestorConfig: ApiRequestorConfig) => {
        return _this['_requestProxy'](url, method, config, requestorConfig);
      };
    };
    const types: ApiType[] = [];
    if (isArray(type)) {
      types.push(...type);
    } else {
      types.push(type);
    }
    const isHadGetMethod = types.some((method) => /get/gi.test(method));
    if (isHadGetMethod) obj[key] = requestMethod('get');
    if (!isHadGetMethod && !obj[key]) obj[key] = {};

    types.forEach((method) => {
      obj[key][method.toUpperCase()] = requestMethod(method);
    });
  }

  protected handleRequestor(requestor: Requestor, _this: this) {
    const methodKeys = [
      '_requestProxy',
      '_res',
      '_defaultError',
      '_networkError',
    ];
    const { params, ajaxHeaders, debug, withCredentials } = this;

    let request: AxiosRequest | TaroRequest | Request;

    switch (requestor.name) {
      case 'AxiosRequest':
        request = new (<AxiosRequestType>requestor)(
          params,
          ajaxHeaders,
          debug,
          withCredentials
        );
        break;
      case 'TaroRequest':
        request = new requestor(params, ajaxHeaders, debug);
        break;
      default:
        request = new requestor(params, ajaxHeaders, debug);
    }
    methodKeys.forEach((method) => {
      Object.defineProperty(request, method, {
        get: () => requestor.prototype[method],
        enumerable: true,
      });
    });

    for (let key in request) {
      if (key !== 'constructor') {
        _this[key] = request[key];
      }
    }

    return _this;
  }
}

export default RequestCore;
