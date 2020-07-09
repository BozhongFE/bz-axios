import AxiosRequest from './request/axios';
import TaroRequest from './request/taro';
export declare type LowerRequestType = 'get' | 'post' | 'put' | 'delete';
export declare type UpRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare type ApiType = LowerRequestType | UpRequestType | 'form' | 'FORM';
export declare type ApiConfigType = ApiType | ApiType[];
export declare type ApiConfigItem = {
    type?: ApiConfigType;
    url: string;
};
export declare type ApiConfigValue = {
    [key: string]: ApiConfigOptions;
};
export declare type ApiConfigOptions = ApiConfigItem | ApiConfigValue;
export declare type ApiConfig = {
    [key: string]: string | ApiConfigOptions;
};
export declare type ApiMethodConfig = Partial<{
    type: ApiType;
    data: AnyObject;
    success: (res?: SuccessResponse) => void;
    error: (err?: ErrorResponse) => void;
    complete: (data?: Response) => void;
    networkError: (err?: any) => void;
    requestComplete: (data?: Response) => void;
    progress: (process?: any) => void;
}>;
export declare type ApiRequestorConfig = AnyObject;
export declare type ApiParams = AnyObject;
export declare type ApiRequestHeaders = AnyObject;
export declare type AnyObject = {
    [key: string]: any;
};
export declare type Response = SuccessResponse | ErrorResponse;
export declare type SuccessResponse = {
    error_code: 0;
    data: AnyObject | any;
};
export declare type ErrorResponse = {
    error_code: number;
    error_message: string;
};
export declare type CatchFunction = (err: any) => never;
export declare class Request {
    protected params: ApiParams;
    protected ajaxHeaders: ApiRequestHeaders;
    constructor(params?: ApiParams, ajaxHeaders?: ApiRequestHeaders, debug?: boolean);
    _requestProxy(url: string, type?: ApiType, config?: ApiMethodConfig, requestorConfig?: ApiRequestorConfig): void;
}
export declare type AxiosRequestType = typeof AxiosRequest;
export declare type TaroRequestType = typeof TaroRequest;
export declare type Requestor = AxiosRequestType | typeof Request | TaroRequestType;
