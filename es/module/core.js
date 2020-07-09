import { isArray } from '../check-type';
function CheckUrlProperty(config) {
    return config.url !== undefined;
}
class RequestCore {
    constructor(apiConfig, params = {}, ajaxHeaders = {}, requestor, debug = false, withCredentials) {
        this.params = {};
        this.ajaxHeaders = {};
        this.debug = false;
        this.withCredentials = true;
        const _this = Object.create(RequestCore.prototype);
        this.params = params;
        this.ajaxHeaders = ajaxHeaders;
        this.debug = debug;
        this.withCredentials = withCredentials;
        this.handleRequestor(requestor, _this);
        return this.createMethods(apiConfig, _this);
    }
    createMethods(config, _this) {
        const scoop = (config, parent) => {
            for (let key in config) {
                const value = config[key];
                if (typeof value === 'string') {
                    this.createRequest(_this, parent, key, value);
                }
                else {
                    if (!CheckUrlProperty(value)) {
                        if (!parent[key])
                            parent[key] = {};
                        scoop(value, parent[key]);
                    }
                    else {
                        this.createRequest(_this, parent, key, value.url, value.type);
                    }
                }
            }
        };
        scoop(config, _this);
        return _this;
    }
    createRequest(_this, obj, key, url, type = 'get') {
        const requestMethod = (method) => {
            return (config, requestorConfig) => {
                return _this['_requestProxy'](url, method, config, requestorConfig);
            };
        };
        const types = [];
        if (isArray(type)) {
            types.push(...type);
        }
        else {
            types.push(type);
        }
        const isHadGetMethod = types.some((method) => /get/gi.test(method));
        if (isHadGetMethod)
            obj[key] = requestMethod('get');
        if (!isHadGetMethod && !obj[key])
            obj[key] = {};
        types.forEach((method) => {
            obj[key][method.toUpperCase()] = requestMethod(method);
        });
    }
    handleRequestor(requestor, _this) {
        const methodKeys = [
            '_requestProxy',
            '_res',
            '_defaultError',
            '_networkError',
        ];
        const { params, ajaxHeaders, debug, withCredentials } = this;
        let request;
        switch (requestor.name) {
            case 'AxiosRequest':
                request = new requestor(params, ajaxHeaders, debug, withCredentials);
                break;
            case 'TaroRequest':
                request = new requestor(params, ajaxHeaders, debug);
                break;
            default:
                request = new requestor(params, ajaxHeaders, debug);
        }
        methodKeys.forEach((method) => {
            Object.defineProperty(request, method, {
                get: () => requestor.prototype[method],
                enumerable: true,
            });
        });
        for (let key in request) {
            if (key !== 'constructor') {
                _this[key] = request[key];
            }
        }
        return _this;
    }
}
export default RequestCore;
