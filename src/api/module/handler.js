/*
* api预处理器/后处理器
*/

export default class Handler {
  constructor() {
  }
  // 同步处理事件分流器，一般用于actions
  static shunt(...args) {
    return (...resArgs) => {
      args.forEach((fn) => {
        if (Object.prototype.toString.call(fn) === '[object Function]') {
          fn(resArgs);
        }
      });
    };
  }
  // 异步分流器
  static shuntAsync(...args) {
    return (...resArgs) => {
      let index = 0;
      const loop = () => {
        if (Object.prototype.toString.call(args[index]) === '[object Function]') {
          args[index](...resArgs.concat(() => {
            index += 1;
            if (index < args.length) {
              loop();
            }
          }));
        }
      };
      loop();
    };
  }
  // 请求成功后处理接口数据
  static res(data, successCB, errorCB, completeCB, requestComplete) {
    if (this.debug) {
      console.log(data);
      this.debug = false;
    }
    if (data.error_code === 0) {
      if (successCB) successCB(data);
    } else if (errorCB) {
      errorCB(data);
    } else {
      this.defaultError(data, 'data');
    }
    if (completeCB) completeCB(data);
    if (requestComplete) requestComplete(data);
  }
  // 默认网络异常处理方法
  static defaultError(err, type = 'networkError') {
    if (type === 'data') return console.log(`格式异常：${err && typeof err === 'string' ? err : err.error_message}`);
    return console.error(err);
  }
  // 网络异常处理
  static networkError(networkErrorCB, requestCompleteCB) {
    const self = this;
    if (self.debug && (networkErrorCB || requestCompleteCB)) {
      self.debug = false;
      return err => {
        self.defaultError(err);
        if (networkErrorCB) networkErrorCB(err);
        if (requestCompleteCB) requestCompleteCB(err);
      };
    }
    return (err) => {
      if (requestCompleteCB) requestCompleteCB(err);
      if (networkErrorCB) return networkErrorCB(err)
      return self.defaultError(err);
    }
  }
}

