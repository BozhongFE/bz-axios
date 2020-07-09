import Taro from '@tarojs/taro';
import Handler from '../module/handler';
class TaroRequest extends Handler {
    constructor(params, ajaxHeaders, debug = false) {
        super(debug);
        this.params = params;
        this.ajaxHeaders = ajaxHeaders;
    }
    _requestProxy(url, type = 'get', config = {}, requestorConfig = {}) {
        const apiData = Object.assign({}, this.params, config.data);
        const requestHeader = {
            'content-type': /form/gi.test(type)
                ? 'application/x-www-form-urlencoded'
                : 'application/json',
        };
        const requestType = config.type || type;
        const apiParams = {
            url,
            method: (/form/gi.test(requestType)
                ? 'POST'
                : requestType.toUpperCase()),
            header: requestHeader,
            data: apiData,
            dataType: 'json',
        };
        if (this.ajaxHeaders)
            Object.assign(apiParams.header, this.ajaxHeaders);
        for (let key in requestorConfig) {
            if (Object.prototype.hasOwnProperty.call(requestorConfig, key)) {
                apiParams[key] = requestorConfig[key];
            }
        }
        return new Promise((resolve, reject) => {
            Taro.request(apiParams)
                .then((res) => {
                const { success, error, complete, requestComplete } = config;
                this._res(res.data, success, error, complete, requestComplete);
                resolve(res);
            })
                .catch((error) => {
                const { networkError, requestComplete } = config;
                reject(error);
                return this._networkError(networkError, requestComplete);
            });
        });
    }
}
export default TaroRequest;
