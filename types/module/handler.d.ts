import { Response, ApiMethodConfig, CatchFunction } from '../types';
declare type SuccessCb = ApiMethodConfig['success'];
declare type ErrorCb = ApiMethodConfig['error'];
declare type CompleteCb = ApiMethodConfig['complete'];
declare type RequestCompleteCb = ApiMethodConfig['requestComplete'];
declare type networkErrorCb = ApiMethodConfig['networkError'];
declare class Handler {
    protected debug: boolean;
    constructor(debug?: boolean);
    _getUrlParams(url: string): {};
    _setUrlParam(url: string, obj?: {}): string;
    _shunt(...args: any[]): (...resArgs: any[]) => void;
    _shuntAsync(...args: any[]): (...resArgs: any[]) => void;
    _res(data: Response, success?: SuccessCb, error?: ErrorCb, complete?: CompleteCb, requestComplete?: RequestCompleteCb): void;
    _defaultError(data: any, type?: 'networkError' | 'data'): void;
    _networkError(networkError?: networkErrorCb, requestComplete?: RequestCompleteCb): CatchFunction;
}
export default Handler;
