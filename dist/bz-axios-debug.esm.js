import qs from 'qs';
import axios from 'axios';

function checkType(data, type) {
    return Object.prototype.toString.call(data).indexOf(type) >= 0;
}
function isArray(data) {
    return checkType(data, 'Array');
}

function CheckUrlProperty(config) {
    return config.url !== undefined;
}
var RequestCore = function RequestCore(apiConfig, params, ajaxHeaders, requestor, debug, withCredentials) {
    if ( params === void 0 ) params = {};
    if ( ajaxHeaders === void 0 ) ajaxHeaders = {};
    if ( debug === void 0 ) debug = false;

    this.params = {};
    this.ajaxHeaders = {};
    this.debug = false;
    this.withCredentials = true;
    var _this = Object.create(RequestCore.prototype);
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
    this.debug = debug;
    this.withCredentials = withCredentials;
    this.handleRequestor(requestor, _this);
    return this.createMethods(apiConfig, _this);
};
RequestCore.prototype.createMethods = function createMethods (config, _this) {
        var this$1 = this;

    var scoop = function (config, parent) {
        for (var key in config) {
            var value = config[key];
            if (typeof value === 'string') {
                this$1.createRequest(_this, parent, key, value);
            }
            else {
                if (!CheckUrlProperty(value)) {
                    if (!parent[key])
                        { parent[key] = {}; }
                    scoop(value, parent[key]);
                }
                else {
                    this$1.createRequest(_this, parent, key, value.url, value.type);
                }
            }
        }
    };
    scoop(config, _this);
    return _this;
};
RequestCore.prototype.createRequest = function createRequest (_this, obj, key, url, type) {
        if ( type === void 0 ) type = 'get';

    var requestMethod = function (method) {
        return function (config, requestorConfig) {
            return _this['_requestProxy'](url, method, config, requestorConfig);
        };
    };
    var types = [];
    if (isArray(type)) {
        types.push.apply(types, type);
    }
    else {
        types.push(type);
    }
    var isHadGetMethod = types.some(function (method) { return /get/gi.test(method); });
    if (isHadGetMethod)
        { obj[key] = requestMethod('get'); }
    if (!isHadGetMethod && !obj[key])
        { obj[key] = {}; }
    types.forEach(function (method) {
        obj[key][method.toUpperCase()] = requestMethod(method);
    });
};
RequestCore.prototype.handleRequestor = function handleRequestor (requestor, _this) {
    var methodKeys = [
        '_requestProxy',
        '_res',
        '_defaultError',
        '_networkError' ];
    var ref = this;
        var params = ref.params;
        var ajaxHeaders = ref.ajaxHeaders;
        var debug = ref.debug;
        var withCredentials = ref.withCredentials;
    var request;
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
    methodKeys.forEach(function (method) {
        Object.defineProperty(request, method, {
            get: function () { return requestor.prototype[method]; },
            enumerable: true,
        });
    });
    for (var key in request) {
        if (key !== 'constructor') {
            _this[key] = request[key];
        }
    }
    return _this;
};

function checkResponsecode(res) {
    return res.error_code === 0;
}
var Handler = function Handler(debug) {
    if ( debug === void 0 ) debug = false;

    this.debug = debug;
};
Handler.prototype._getUrlParams = function _getUrlParams (url) {
    var href = url;
    var pos = href.indexOf('?');
    var params = {};
    if (pos !== -1) {
        href = href.substr(pos + 1);
        href.split('&').forEach(function (item) {
            var data = item.split('=');
            params[data[0]] = data[1];
        });
        return params;
    }
    return params;
};
Handler.prototype._setUrlParam = function _setUrlParam (url, obj) {
        if ( obj === void 0 ) obj = {};

    if (!url)
        { return url; }
    var params = Object.assign(this._getUrlParams(url), obj);
    var pos = url.indexOf('?');
    var isHadParams = pos !== -1;
    var href = isHadParams ? url.substring(0, pos) : url;
    return (href +
        '?' +
        Object.keys(params)
            .map(function (key) { return (key + "=" + (obj[key])); })
            .join('&'));
};
Handler.prototype._shunt = function _shunt () {
        var this$1 = this;
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

    return function () {
            var resArgs = [], len = arguments.length;
            while ( len-- ) resArgs[ len ] = arguments[ len ];

        args.forEach(function (fn) {
            if (Object.prototype.toString.call(fn) === '[object Function]') {
                fn.apply(this$1, resArgs);
            }
        });
    };
};
Handler.prototype._shuntAsync = function _shuntAsync () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

    return function () {
            var resArgs = [], len = arguments.length;
            while ( len-- ) resArgs[ len ] = arguments[ len ];

        var index = 0;
        var loop = function () {
            if (Object.prototype.toString.call(args[index]) === '[object Function]') {
                args[index].apply(args, resArgs.concat(function () {
                    index += 1;
                    if (index < args.length) {
                        loop();
                    }
                }));
            }
        };
        loop();
    };
};
Handler.prototype._res = function _res (data, success, error, complete, requestComplete) {
    if (this.debug) {
        console.log(data);
        this.debug = false;
    }
    if (checkResponsecode(data)) {
        success && success(data);
    }
    else if (error) {
        error(data);
    }
    else {
        this._defaultError(data, 'data');
    }
    complete && complete(data);
    requestComplete && requestComplete(data);
};
Handler.prototype._defaultError = function _defaultError (data, type) {
        if ( type === void 0 ) type = 'networkError';

    if (type === 'data') {
        return console.log(("格式异常：" + (data && typeof data === 'string' ? data : data.error_message)));
    }
    return console.error(data);
};
Handler.prototype._networkError = function _networkError (networkError, requestComplete) {
        var this$1 = this;

    return function (err) {
        this$1._defaultError(err);
        requestComplete && requestComplete(err);
        networkError && networkError(err);
        throw new Error(err);
    };
};

var AxiosRequest = /*@__PURE__*/(function (Handler) {
    function AxiosRequest(params, ajaxHeaders, debug, withCredentials) {
        if ( params === void 0 ) params = {};
        if ( ajaxHeaders === void 0 ) ajaxHeaders = {};
        if ( debug === void 0 ) debug = false;
        if ( withCredentials === void 0 ) withCredentials = true;

        Handler.call(this, debug);
        this.params = params;
        this.ajaxHeaders = ajaxHeaders;
        axios.defaults.withCredentials = withCredentials;
    }

    if ( Handler ) AxiosRequest.__proto__ = Handler;
    AxiosRequest.prototype = Object.create( Handler && Handler.prototype );
    AxiosRequest.prototype.constructor = AxiosRequest;
    AxiosRequest.prototype._requestProxy = function _requestProxy (url, type, config, requestorConfig) {
        var this$1 = this;
        if ( type === void 0 ) type = 'get';
        if ( config === void 0 ) config = {};
        if ( requestorConfig === void 0 ) requestorConfig = {};

        var requestType = (config.type || type).toLowerCase();
        var apiType = requestType === 'form' ? 'post' : requestType;
        var isParamsOption = !/post|put|delete/gi.test(apiType);
        var apiDataKey = isParamsOption ? 'params' : 'data';
        var requestParams = Object.assign({}, this.params, config.data);
        var apiParams = {
            method: apiType,
            url: url
        };
        apiParams[apiDataKey] = isParamsOption
                ? requestParams
                : qs.stringify(requestParams);
        apiParams.headers = {};
        if (/put|delete/gi.test(requestType)) {
            apiParams.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        else if (/form/gi.test(requestType)) {
            apiParams.headers['Content-Type'] = 'multipart/form-data';
            apiParams.onUploadProgress = function (process) {
                if (config.progress)
                    { config.progress(process); }
            };
        }
        if (this.ajaxHeaders)
            { Object.assign(apiParams.headers, this.ajaxHeaders); }
        for (var key in requestorConfig) {
            if (Object.prototype.hasOwnProperty.call(requestorConfig, key)) {
                apiParams[key] = requestorConfig[key];
            }
        }
        return new Promise(function (resolve, reject) {
            axios(apiParams)
                .then(function (res) {
                var success = config.success;
                var error = config.error;
                var complete = config.complete;
                var requestComplete = config.requestComplete;
                this$1._res(res.data, success, error, complete, requestComplete);
                resolve(res);
            })
                .catch(function (error) {
                var networkError = config.networkError;
                var requestComplete = config.requestComplete;
                reject(error);
                return this$1._networkError(networkError, requestComplete)(error);
            });
        });
    };

    return AxiosRequest;
}(Handler));

var Api = function Api(apiConfig, params, ajaxHeaders, debug, withCredentials) {
    if ( params === void 0 ) params = {};
    if ( ajaxHeaders === void 0 ) ajaxHeaders = {};
    if ( debug === void 0 ) debug = false;
    if ( withCredentials === void 0 ) withCredentials = true;

    return new RequestCore(apiConfig, params, ajaxHeaders, AxiosRequest, debug, withCredentials);
};

export default Api;
