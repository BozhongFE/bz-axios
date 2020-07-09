import { ApiConfig, ApiParams, ApiRequestHeaders } from './types';
declare class Api {
    constructor(apiConfig: ApiConfig, params?: ApiParams, ajaxHeaders?: ApiRequestHeaders, debug?: boolean);
}
export default Api;
