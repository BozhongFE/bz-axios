export class Request {
    constructor(params = {}, ajaxHeaders = {}, debug = false) {
        this.params = params;
        this.ajaxHeaders = ajaxHeaders;
    }
    _requestProxy(url, type = 'get', config = {}, requestorConfig = {}) { }
}
