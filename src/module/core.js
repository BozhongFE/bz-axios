class RequestCore  {
  constructor(apiConf, Request, params, ajaxHeaders, debug = false, withCredentials) {
    this.Request = new Request(params, ajaxHeaders, debug, withCredentials);
    this._createMethods(apiConf, this);
  }

  // 为避免命名重复问题，内部方法设为静态方法
  // 生成实例的方法
  _createMethods(apiConf, object = this) {
    if (!apiConf) return false;
    // 多层数据遍历生成
    // object 配置 parent 上级属性
    const scoop = (config, parent = this) => {
      if (!config || !parent) return false;
      for (const key in config) {
        if (Object.prototype.hasOwnProperty.call(config, key)) {
          const value = config[key];
          // 字符串判断为url，请求方法为get
          if (typeof value === 'string') {
            this._createRequest(parent, key, value);
          }
          if (Object.prototype.toString.call(value) === '[object Object]') {
            // conf为对象且不存在url属性，判断为模块，进行下一层遍历
            if (!Object.prototype.hasOwnProperty.call(value, 'url')) {
              if (!parent[key]) parent[key] = {};
              scoop(value, parent[key]);
            } else {
              this._createRequest(parent, key, value.url, value.type);
            }
          }
        }
      }
      return false;
    };
    return scoop(apiConf, object);
  }

  // 绑定请求
  _createRequest(obj, key, url, type = 'get') {
    const requestMethod = method => {
      return (config, requestConf) => {
        return this.Request._requestProxy(method, url, config, requestConf, this);
      }
    }
    const types = [];
    if (Object.prototype.toString.call(type) === '[object Array]') {
      types.push(...type);
    } else {
      types.push(type);
    }
    const isHadGetMethod = types.some(method => /get/gi.test(method));
    if (isHadGetMethod) obj[key] = requestMethod('get');
    if (!isHadGetMethod && !obj[key]) obj[key] = {};

    types.forEach(method => {
      obj[key][method.toUpperCase()] = requestMethod(method);
    })
  }
}


export default RequestCore;