import RequestCore from './module/core';
import TaroRequest from './request/taro';
class Api {
    constructor(apiConfig, params = {}, ajaxHeaders = {}, debug = false) {
        return new RequestCore(apiConfig, params, ajaxHeaders, TaroRequest, debug);
    }
}
export default Api;
