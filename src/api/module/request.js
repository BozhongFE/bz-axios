/*
* axios请求相关
*/
import qs from 'qs';
import axios from 'axios';
import Handler from './handler';
export default class Request extends Handler {
  constructor(withCredentials = true) {
    super();
    axios.defaults.withCredentials = withCredentials;
    if (new.target === Request) {
      throw new Error('Request类不能实例化');
    }
  }
  static axiosProxy(type = 'get', url, config = {}, axiosConfig = {}) {
    if (!url) return false;
    // 请求方法处理
    let apiType = 'get';
    // 优先config
    if (config && config.type) {
      apiType = config.type.toLowerCase();
    } else if (type && typeof type === 'string') {
      apiType = type.toLowerCase();
    }
    // 请求数据处理
    const apiData = /post|put|delete/gi.test(apiType) ? qs.stringify(config.data) : config.data;
    // 根据请求方法，处理不同默认配置
    const apiArgs = [url];
    switch (apiType) {
      case 'post':
        apiArgs.push(apiData);
        break;
      case 'put':
        apiArgs.push(apiData);
        apiArgs.push({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        break;
      case 'delete':
        apiArgs.push({
          data: apiData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        break;
      // 特殊值，用于上传
      case 'form':
        apiArgs.push({
          data: apiData,
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress(process) {
            if (config.progress) config.progress(process);
          },
        });
        apiType = 'post';
        break;
      default:
        apiArgs.push({
          params: apiData,
        });
    }
    // 若外部传入axios配置，以外部传入为主
    if (axiosConfig) {
      let originalConfig = /post|put/.test(apiType) ? apiArgs[2] : apiArgs[1];
      if (!originalConfig) originalConfig = {};
      for (const key in axiosConfig) {
        originalConfig[key] = axiosConfig[key];
      }
    }
    return axios[apiType](...apiArgs).then((res) => {
      this.res(res.data, config.success, config.error, config.complete, config.requestComplete);
    }).catch(this.networkError(config.networkError, config.requestComplete));
  }
}