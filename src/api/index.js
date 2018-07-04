
// import 'es6-promise';
import Request from './module/request';

class API extends Request {
  // apiConf需要生成的接口请求， debug是否开启debug模式
  constructor(apiConf, withCredentials = true, debug = false) {
    super(withCredentials);
    API.createMethods(apiConf, this);
    // 开启debug
    if (debug) API.debug = true;
  }
  // 为避免命名重复问题，内部方法设为静态方法
  // 生成实例的方法
  static createMethods(apiConf, object = this) {
    if (!apiConf) return false;
    // 多层数据遍历生成
    // object 配置 parent 上级属性
    const scoop = (config, parent = this) => {
      if (!config || !parent) return false;
      const keys = Reflect.ownKeys(config);
      const keysLength = keys.length;
      for (let i = 0; i < keysLength; i += 1) {
        const key = keys[i];
        const value = config[key];
        if (value) {
          // 字符串判断为url，请求方法为get
          if (typeof value === 'string') {
            this.createRequest(parent, key, value);
          }
          if (Object.prototype.toString.call(value) === '[object Object]') {
            // conf为对象且不存在url属性，判断为模块，进行下一层遍历
            if (!Reflect.has(value, 'url')) {
              if (!parent[key]) parent[key] = {};
              scoop(value, parent[key]);
            } else {
              this.createRequest(parent, key, value.url, value.type);
            }
          }
        }
      }
      return false;
    };
    return scoop(apiConf, object);
  }
  // 绑定请求
  static createRequest(obj, key, url, type = 'get') {
    if (!obj || !key || !url || typeof url !== 'string') return false;
    return obj[key] = (config, axiosConfig) => {
      this.axiosProxy(type, url, config, axiosConfig);
    };
    // if (Object.prototype.toString.call(url) === '[object Array]') return obj[key] = (...args) => {
    //   this.axiosProxyAll(type, url, ...args);
    // };
  }
};

export default API;
