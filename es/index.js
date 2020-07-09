import RequestCore from './module/core';
import AxiosRequest from './request/axios';
class Api {
    constructor(apiConfig, params = {}, ajaxHeaders = {}, debug = false, withCredentials = true) {
        return new RequestCore(apiConfig, params, ajaxHeaders, AxiosRequest, debug, withCredentials);
    }
}
export default Api;
