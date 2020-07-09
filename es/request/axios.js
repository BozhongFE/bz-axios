import qs from 'qs';
import axios from 'axios';
import Handler from '../module/handler';
class AxiosRequest extends Handler {
    constructor(params = {}, ajaxHeaders = {}, debug = false, withCredentials = true) {
        super(debug);
        this.params = params;
        this.ajaxHeaders = ajaxHeaders;
        axios.defaults.withCredentials = withCredentials;
    }
    _requestProxy(url, type = 'get', config = {}, requestorConfig = {}) {
        const requestType = (config.type || type).toLowerCase();
        const apiType = requestType === 'form' ? 'post' : requestType;
        const isParamsOption = !/post|put|delete/gi.test(apiType);
        const apiDataKey = isParamsOption ? 'params' : 'data';
        const requestParams = Object.assign({}, this.params, config.data);
        const apiParams = {
            method: apiType,
            url,
            [apiDataKey]: isParamsOption
                ? requestParams
                : qs.stringify(requestParams),
            headers: {},
        };
        if (/put|delete/gi.test(requestType)) {
            apiParams.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        else if (/form/gi.test(requestType)) {
            apiParams.headers['Content-Type'] = 'multipart/form-data';
            apiParams.onUploadProgress = (process) => {
                if (config.progress)
                    config.progress(process);
            };
        }
        if (this.ajaxHeaders)
            Object.assign(apiParams.headers, this.ajaxHeaders);
        for (let key in requestorConfig) {
            if (Object.prototype.hasOwnProperty.call(requestorConfig, key)) {
                apiParams[key] = requestorConfig[key];
            }
        }
        return new Promise((resolve, reject) => {
            axios(apiParams)
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
export default AxiosRequest;
