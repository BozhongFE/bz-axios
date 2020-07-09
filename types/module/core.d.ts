import { ApiConfig, ApiConfigType, ApiParams, ApiRequestHeaders, Requestor } from '../types';
declare class RequestCore {
    protected params: ApiParams;
    protected ajaxHeaders: ApiRequestHeaders;
    protected debug: boolean;
    protected withCredentials: boolean;
    constructor(apiConfig: ApiConfig, params: ApiParams, ajaxHeaders: ApiRequestHeaders, requestor: Requestor, debug?: boolean, withCredentials?: boolean);
    protected createMethods(config: ApiConfig, _this: this): this;
    protected createRequest(_this: this, obj: RequestCore, key: string, url: string, type?: ApiConfigType): void;
    protected handleRequestor(requestor: Requestor, _this: this): this;
}
export default RequestCore;
