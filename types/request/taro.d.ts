import Handler from '../module/handler';
import { ApiType, ApiMethodConfig, ApiRequestorConfig, ApiParams, ApiRequestHeaders } from '../types';
declare class TaroRequest extends Handler {
    protected params: ApiParams;
    protected ajaxHeaders: ApiRequestHeaders;
    constructor(params: ApiParams, ajaxHeaders: ApiRequestHeaders, debug?: boolean);
    _requestProxy(url: string, type?: ApiType, config?: ApiMethodConfig, requestorConfig?: ApiRequestorConfig): Promise<unknown>;
}
export default TaroRequest;
