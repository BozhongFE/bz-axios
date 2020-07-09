function checkResponsecode(res) {
    return res.error_code === 0;
}
class Handler {
    constructor(debug = false) {
        this.debug = debug;
    }
    _getUrlParams(url) {
        let href = url;
        const pos = href.indexOf('?');
        const params = {};
        if (pos !== -1) {
            href = href.substr(pos + 1);
            href.split('&').forEach((item) => {
                const data = item.split('=');
                params[data[0]] = data[1];
            });
            return params;
        }
        return params;
    }
    _setUrlParam(url, obj = {}) {
        if (!url)
            return url;
        const params = Object.assign(this._getUrlParams(url), obj);
        const pos = url.indexOf('?');
        const isHadParams = pos !== -1;
        const href = isHadParams ? url.substring(0, pos) : url;
        return (href +
            '?' +
            Object.keys(params)
                .map((key) => `${key}=${obj[key]}`)
                .join('&'));
    }
    _shunt(...args) {
        return (...resArgs) => {
            args.forEach((fn) => {
                if (Object.prototype.toString.call(fn) === '[object Function]') {
                    fn.apply(this, resArgs);
                }
            });
        };
    }
    _shuntAsync(...args) {
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
    _res(data, success, error, complete, requestComplete) {
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
    }
    _defaultError(data, type = 'networkError') {
        if (type === 'data') {
            return console.log(`格式异常：${data && typeof data === 'string' ? data : data.error_message}`);
        }
        return console.error(data);
    }
    _networkError(networkError, requestComplete) {
        return (err) => {
            this._defaultError(err);
            requestComplete && requestComplete(err);
            networkError && networkError(err);
            throw new Error(err);
        };
    }
}
export default Handler;
