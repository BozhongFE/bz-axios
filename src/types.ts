import AxiosRequest from './request/axios';
import TaroRequest from './request/taro';

export type LowerRequestType = 'get' | 'post' | 'put' | 'delete';
export type UpRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ApiType = LowerRequestType | UpRequestType | 'form' | 'FORM';

export type ApiConfigType = ApiType | ApiType[];

export type ApiConfigItem = {
  type?: ApiConfigType;
  url: string;
};
export type ApiConfigValue = {
  [key: string]: ApiConfigOptions;
};
export type ApiConfigOptions = ApiConfigItem | ApiConfigValue;
export type ApiConfig = {
  [key: string]: string | ApiConfigOptions;
};

export type ApiMethodConfig = Partial<{
  type: ApiType;
  data: AnyObject;
  success: (res?: SuccessResponse) => void;
  error: (err?: ErrorResponse) => void;
  complete: (data?: Response) => void;
  networkError: (err?: any) => void;
  requestComplete: (data?: Response) => void;
  progress: (process?: any) => void;
}>;
export type ApiRequestorConfig = AnyObject;
export type ApiParams = AnyObject;
export type ApiRequestHeaders = AnyObject;

export type AnyObject = { [key: string]: any };
export type Response = SuccessResponse | ErrorResponse;
export type SuccessResponse = {
  error_code: 0;
  data: AnyObject | any;
};
export type ErrorResponse = {
  error_code: number;
  error_message: string;
};
export type CatchFunction = (err: any) => never;

export class Request {
  protected params: ApiParams;
  protected ajaxHeaders: ApiRequestHeaders;
  constructor(
    params: ApiParams = {},
    ajaxHeaders: ApiRequestHeaders = {},
    debug = false
  ) {
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
  }
  _requestProxy(
    url: string,
    type: ApiType = 'get',
    config: ApiMethodConfig = {},
    requestorConfig: ApiRequestorConfig = {}
  ) {}
}
export type AxiosRequestType = typeof AxiosRequest;
export type TaroRequestType = typeof TaroRequest;
export type Requestor = AxiosRequestType | typeof Request | TaroRequestType;
