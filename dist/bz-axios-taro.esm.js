import Taro from '@tarojs/taro';

/*
 * api预处理器/后处理器
 */
/* eslint no-underscore-dangle: ["error", { "allow": ["_defaultError", "_debug"] }] */

var Handler = function Handler(_debug) {
  if ( _debug === void 0 ) _debug = false;

  this._debug = _debug;
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
// 拼接url
// eslint-disable-next-line class-methods-use-this
Handler.prototype._setUrlParam = function _setUrlParam (url, obj) {
    if ( obj === void 0 ) obj = {};

  if (!url) { return url; }

  var params = Object.assign(this._getUrlParams(url), obj);
  var pos = url.indexOf('?');
  var isHadParams = pos !== -1;
  var href = isHadParams ? url.substring(0, pos) : url;

  return (
    href +
    '?' +
    Object.keys(params)
      .map(function (key) { return (key + "=" + (obj[key])); })
      .join('&')
  );
};

// 同步处理事件分流器，一般用于actions
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

// 异步分流器
// eslint-disable-next-line class-methods-use-this
Handler.prototype._shuntAsync = function _shuntAsync () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

  return function () {
      var resArgs = [], len = arguments.length;
      while ( len-- ) resArgs[ len ] = arguments[ len ];

    var index = 0;
    var loop = function () {
      if (
        Object.prototype.toString.call(args[index]) === '[object Function]'
      ) {
        args[index].apply(
          args, resArgs.concat(function () {
            index += 1;
            if (index < args.length) {
              loop();
            }
          })
        );
      }
    };
    loop();
  };
};

// 请求成功后处理接口数据
Handler.prototype._res = function _res (data, successCB, errorCB, completeCB, requestComplete) {
  if (this._debug) {
    console.log(data);
    this._debug = false;
  }
  if (data.error_code === 0) {
    if (successCB) { successCB(data); }
  } else if (errorCB) {
    errorCB(data);
  } else {
    this._defaultError(data, 'data');
  }
  if (completeCB) { completeCB(data); }
  if (requestComplete) { requestComplete(data); }
};

// 默认网络异常处理方法
// eslint-disable-next-line class-methods-use-this
Handler.prototype._defaultError = function _defaultError (err, type) {
    if ( type === void 0 ) type = 'networkError';

  if (type === 'data')
    { return console.log(
      ("格式异常：" + (err && typeof err === 'string' ? err : err.error_message))
    ); }
  return console.error(err);
};

// 网络异常处理
Handler.prototype._networkError = function _networkError (networkErrorCB, requestCompleteCB) {
    var this$1 = this;

  if (this._debug && (networkErrorCB || requestCompleteCB)) {
    this._debug = false;
    return function (err) {
      this$1._defaultError(err);
      if (networkErrorCB) { networkErrorCB(err); }
      if (requestCompleteCB) { requestCompleteCB(err); }
    };
  }
  return function (err) {
    if (requestCompleteCB) { requestCompleteCB(err); }
    if (networkErrorCB) { return networkErrorCB(err); }
    return this$1._defaultError(err);
  };
};

var Request = /*@__PURE__*/(function (Handler$$1) {
  function Request(params, ajaxHeaders, _debug) {
    if ( _debug === void 0 ) _debug = false;

    Handler$$1.call(this, _debug);
    this.params = params;
    this.ajaxHeaders = ajaxHeaders;
  }

  if ( Handler$$1 ) Request.__proto__ = Handler$$1;
  Request.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
  Request.prototype.constructor = Request;
  Request.prototype._requestProxy = function _requestProxy (type, url, config, requestConf) {
    var this$1 = this;
    if ( type === void 0 ) type = 'get';
    if ( config === void 0 ) config = {};
    if ( requestConf === void 0 ) requestConf = {};

    if (!url) { return false; }

    // 处理params参数
    var urlParams = this._getUrlParams(url);
    var apiData = Object.assign({}, this.params, urlParams, config.data);
    var requestHeader = {
      'content-type': /form/gi.test(type)
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
    };
    var paramsIndex = url.indexOf('?');
    var href = paramsIndex > -1 ? url.substring(0, paramsIndex) : url;
    var requestType = config.type || type;
    var apiParams = {
      url: href,
      method: /form/gi.test(requestType) ? 'POST' : requestType.toUpperCase(),
      header: requestHeader,
      data: apiData,
      dataType: config.dataType || 'json',
    };

    // 若外部传入axios配置，以外部传入为主
    if (this.ajaxHeaders) { Object.assign(apiParams.header, this.ajaxHeaders); }
    for (var key in requestConf) {
      if (Object.prototype.hasOwnProperty.call(requestConf, key)) {
        apiParams[key] = requestConf[key];
      }
    }

    var result = Taro.request(apiParams);
    result
      .then(function (res) {
        this$1._res(
          res.data,
          config.success,
          config.error,
          config.complete,
          config.requestComplete
        );
      })
      .catch(this._networkError(config.networkError, config.requestComplete));

    return new Promise(function (resolve, reject) {
      result.then(function (res) { return resolve(res.data); }).catch(function (err) { return reject(err); });
    });
  };

  return Request;
}(Handler));

var RequestCore = function RequestCore(
  apiConf,
  Request,
  params,
  ajaxHeaders,
  debug,
  withCredentials
) {
  if ( params === void 0 ) params = {};
  if ( ajaxHeaders === void 0 ) ajaxHeaders = {};
  if ( debug === void 0 ) debug = false;

  this.Request = new Request(params, ajaxHeaders, debug, withCredentials);
  this._createMethods(apiConf, this);
};

// 为避免命名重复问题，内部方法设为静态方法
// 生成实例的方法
RequestCore.prototype._createMethods = function _createMethods (apiConf, object) {
    var this$1 = this;
    if ( object === void 0 ) object = this;

  if (!apiConf) { return false; }
  // 多层数据遍历生成
  // object 配置 parent 上级属性
  var scoop = function (config, parent) {
      if ( parent === void 0 ) parent = this$1;

    if (!config || !parent) { return false; }
    for (var key in config) {
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        var value = config[key];
        // 字符串判断为url，请求方法为get
        if (typeof value === 'string') {
          this$1._createRequest(parent, key, value);
        }
        if (Object.prototype.toString.call(value) === '[object Object]') {
          // conf为对象且不存在url属性，判断为模块，进行下一层遍历
          if (!Object.prototype.hasOwnProperty.call(value, 'url')) {
            if (!parent[key]) { parent[key] = {}; }
            scoop(value, parent[key]);
          } else {
            this$1._createRequest(parent, key, value.url, value.type);
          }
        }
      }
    }
    return false;
  };
  return scoop(apiConf, object);
};

// 绑定请求
RequestCore.prototype._createRequest = function _createRequest (obj, key, url, type) {
    var this$1 = this;
    if ( type === void 0 ) type = 'get';

  var requestMethod = function (method) {
    return function (config, requestConf) {
      return this$1.Request._requestProxy(
        method,
        url,
        config,
        requestConf,
        this$1
      );
    };
  };
  var types = [];
  if (Object.prototype.toString.call(type) === '[object Array]') {
    types.push.apply(types, type);
  } else {
    types.push(type);
  }
  var isHadGetMethod = types.some(function (method) { return /get/gi.test(method); });
  if (isHadGetMethod) { obj[key] = requestMethod('get'); }
  if (!isHadGetMethod && !obj[key]) { obj[key] = {}; }

  types.forEach(function (method) {
    obj[key][method.toUpperCase()] = requestMethod(method);
  });
};

var API = /*@__PURE__*/(function (RequestCore$$1) {
  function API(apiConf, Request$$1, params, ajaxHeaders, debug) {
    if ( debug === void 0 ) debug = false;

    if (typeof Request$$1 !== 'function') {
      Request$$1 = Request;
    }
    RequestCore$$1.call(this, apiConf, Request$$1, params, ajaxHeaders, debug);
  }

  if ( RequestCore$$1 ) API.__proto__ = RequestCore$$1;
  API.prototype = Object.create( RequestCore$$1 && RequestCore$$1.prototype );
  API.prototype.constructor = API;

  return API;
}(RequestCore));

export default API;
