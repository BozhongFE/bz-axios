
import Request from './module/request';

class API extends Request {
  // apiConf需要生成的接口请求， debug是否开启debug模式
  constructor(apiConf, withCredentials = true, debug = false, params) {
    super(withCredentials);
    this._createMethods(apiConf, this);
    // 开启debug
    this._debug = debug;
    if (params) this.params = params;
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
        const value = config[key];
        if (value) {
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
    if (!obj || !key || !url || typeof url !== 'string') return false;
    // 若type为数组 生成多个方法
    if (Object.prototype.toString.call(type) === '[object Array]' && type.length) {
      const l = type.length;
      if (!obj[key]) obj[key] = {};
      for (let i = 0; i < l; i += 1) {
        obj[key][type[i]] = (config, axiosConfig) => {
          this._axiosProxy(type[i], url, config, axiosConfig);
        };
      }
      return false;
    }
    return obj[key] = (config, axiosConfig) => {
      this._axiosProxy(type, url, config, axiosConfig);
    };
  }
}

export default API;
