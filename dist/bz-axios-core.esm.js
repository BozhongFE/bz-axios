/*
  * request function params
  * @param type 请求类型
  * @param url 请求地址
  * @param config 请求的配置
  * @param requestConfig 请求器配置
  * @param obj Request 类实例
*/

var Request = function Request(apiConf, request, params, ajaxHeaders, debug, withCredentials) {
  if ( debug === void 0 ) debug = false;

  this._debug = debug;
  this.withCredentials = withCredentials;
  this.params = params;
  this.ajaxHeaders = ajaxHeaders;
  this.request = request;
  this._createMethods(apiConf, this);
};

// 为避免命名重复问题，内部方法设为静态方法
// 生成实例的方法
Request.prototype._createMethods = function _createMethods (apiConf, object) {
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
Request.prototype._createRequest = function _createRequest (obj, key, url, type) {
    var this$1 = this;
    if ( type === void 0 ) type = 'get';

  var requestMethod = function (method) {
    return function (config, requestConf) {
      return this$1.request(method, url, config, requestConf, this$1);
    }
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
    obj[key][method] = requestMethod(method);
  });
};

export default Request;
