import Handler from '../module/handler';
import { ApiType, ApiMethodConfig, ApiRequestorConfig, ApiParams, ApiRequestHeaders } from '../types';
declare class AxiosRequest extends Handler {
    protected params: ApiParams;
    protected ajaxHeaders: ApiRequestHeaders;
    constructor(params?: ApiParams, ajaxHeaders?: ApiRequestHeaders, debug?: boolean, withCredentials?: boolean);
    protected _requestProxy(url: string, type?: ApiType, config?: ApiMethodConfig, requestorConfig?: ApiRequestorConfig): Promise<unknown>;
}
export default AxiosRequest;
