/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack:///./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\nvar btoa = typeof window !== 'undefined' && window.btoa && window.btoa.bind(window) || __webpack_require__(/*! ./../helpers/btoa */ \"./node_modules/axios/lib/helpers/btoa.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n    var loadEvent = 'onreadystatechange';\n    var xDomain = false;\n\n    // For IE 8/9 CORS support\n    // Only supports POST and GET calls and doesn't returns the response headers.\n    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.\n    if (\"development\" !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {\n      request = new window.XDomainRequest();\n      loadEvent = 'onload';\n      xDomain = true;\n      request.onprogress = function handleProgress() {};\n      request.ontimeout = function handleTimeout() {};\n    }\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request[loadEvent] = function handleLoad() {\n      if (!request || request.readyState !== 4 && !xDomain) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)\n        status: request.status === 1223 ? 204 : request.status,\n        statusText: request.status === 1223 ? 'No Content' : request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (config.withCredentials) {\n      request.withCredentials = true;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(utils.merge(defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n//# sourceURL=webpack:///./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\n\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar defaults = __webpack_require__(/*! ./../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = utils.merge({\n      url: arguments[0]\n    }, arguments[1]);\n  }\n\n  config = utils.merge(defaults, { method: 'get' }, this.defaults, config);\n  config.method = config.method.toLowerCase();\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function (url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function (url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Support baseURL config\n  if (config.baseURL && !isAbsoluteURL(config.url)) {\n    config.url = combineURLs(config.baseURL, config.url);\n  }\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(config.data, config.headers, config.transformRequest);\n\n  // Flatten headers\n  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});\n\n  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {\n    delete config.headers[method];\n  });\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(response.data, response.headers, config.transformResponse);\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\n\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n  error.request = request;\n  error.response = response;\n  return error;\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  // Note: status is not exposed by XDomainRequest\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) {/* Ignore */}\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js\n\nvar chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\nfunction E() {\n  this.message = 'String contains an invalid character';\n}\nE.prototype = new Error();\nE.prototype.code = 5;\nE.prototype.name = 'InvalidCharacterError';\n\nfunction btoa(input) {\n  var str = String(input);\n  var output = '';\n  for (\n  // initialize result and counter\n  var block, charCode, idx = 0, map = chars;\n  // if the next str index does not exist:\n  //   change the mapping table to \"=\"\n  //   check if d has no fractional digits\n  str.charAt(idx | 0) || (map = '=', idx % 1);\n  // \"8 - idx % 1 * 8\" generates the sequence 2, 4, 6, 8\n  output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {\n    charCode = str.charCodeAt(idx += 3 / 4);\n    if (charCode > 0xFF) {\n      throw new E();\n    }\n    block = block << 8 | charCode;\n  }\n  return output;\n}\n\nmodule.exports = btoa;\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/btoa.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\n\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '') : baseURL;\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = utils.isStandardBrowserEnv() ?\n\n// Standard browser envs support document.cookie\nfunction standardBrowserEnv() {\n  return {\n    write: function write(name, value, expires, path, domain, secure) {\n      var cookie = [];\n      cookie.push(name + '=' + encodeURIComponent(value));\n\n      if (utils.isNumber(expires)) {\n        cookie.push('expires=' + new Date(expires).toGMTString());\n      }\n\n      if (utils.isString(path)) {\n        cookie.push('path=' + path);\n      }\n\n      if (utils.isString(domain)) {\n        cookie.push('domain=' + domain);\n      }\n\n      if (secure === true) {\n        cookie.push('secure');\n      }\n\n      document.cookie = cookie.join('; ');\n    },\n\n    read: function read(name) {\n      var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n      return match ? decodeURIComponent(match[3]) : null;\n    },\n\n    remove: function remove(name) {\n      this.write(name, '', Date.now() - 86400000);\n    }\n  };\n}() :\n\n// Non standard browser env (web workers, react-native) lack needed support.\nfunction nonStandardBrowserEnv() {\n  return {\n    write: function write() {},\n    read: function read() {\n      return null;\n    },\n    remove: function remove() {}\n  };\n}();\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\n\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return (/^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url)\n  );\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = utils.isStandardBrowserEnv() ?\n\n// Standard browser envs have full support of the APIs needed to test\n// whether the request URL is of the same origin as current location.\nfunction standardBrowserEnv() {\n  var msie = /(msie|trident)/i.test(navigator.userAgent);\n  var urlParsingNode = document.createElement('a');\n  var originURL;\n\n  /**\n  * Parse a URL to discover it's components\n  *\n  * @param {String} url The URL to be parsed\n  * @returns {Object}\n  */\n  function resolveURL(url) {\n    var href = url;\n\n    if (msie) {\n      // IE needs attribute set twice to normalize properties\n      urlParsingNode.setAttribute('href', href);\n      href = urlParsingNode.href;\n    }\n\n    urlParsingNode.setAttribute('href', href);\n\n    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n    return {\n      href: urlParsingNode.href,\n      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n      host: urlParsingNode.host,\n      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n      hostname: urlParsingNode.hostname,\n      port: urlParsingNode.port,\n      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname\n    };\n  }\n\n  originURL = resolveURL(window.location.href);\n\n  /**\n  * Determine if a URL shares the same origin as the current location\n  *\n  * @param {String} requestURL The URL to test\n  * @returns {boolean} True if URL shares the same origin, otherwise false\n  */\n  return function isURLSameOrigin(requestURL) {\n    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;\n    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;\n  };\n}() :\n\n// Non standard browser envs (web workers, react-native) lack needed support.\nfunction nonStandardBrowserEnv() {\n  return function isURLSameOrigin() {\n    return true;\n  };\n}();\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) {\n    return parsed;\n  }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\n\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return typeof FormData !== 'undefined' && val instanceof FormData;\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = val && val.buffer && val.buffer instanceof ArrayBuffer;\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {\n    return false;\n  }\n  return typeof window !== 'undefined' && typeof document !== 'undefined';\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge() /* obj1, obj2, obj3, ... */{\n  var result = {};\n  function assignValue(val, key) {\n    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim\n};\n\n//# sourceURL=webpack:///./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);\n};\n\nfunction isBuffer(obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);\n}\n\n// For Node v0.10 support. Remove this eventually.\nfunction isSlowBuffer(obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));\n}\n\n//# sourceURL=webpack:///./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout() {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n})();\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch (e) {\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch (e) {\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e) {\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e) {\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while (len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) {\n    return [];\n};\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () {\n    return '/';\n};\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function () {\n    return 0;\n};\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar replace = String.prototype.replace;\nvar percentTwenties = /%20/g;\n\nmodule.exports = {\n    'default': 'RFC3986',\n    formatters: {\n        RFC1738: function RFC1738(value) {\n            return replace.call(value, percentTwenties, '+');\n        },\n        RFC3986: function RFC3986(value) {\n            return value;\n        }\n    },\n    RFC1738: 'RFC1738',\n    RFC3986: 'RFC3986'\n};\n\n//# sourceURL=webpack:///./node_modules/qs/lib/formats.js?");

/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stringify = __webpack_require__(/*! ./stringify */ \"./node_modules/qs/lib/stringify.js\");\nvar parse = __webpack_require__(/*! ./parse */ \"./node_modules/qs/lib/parse.js\");\nvar formats = __webpack_require__(/*! ./formats */ \"./node_modules/qs/lib/formats.js\");\n\nmodule.exports = {\n    formats: formats,\n    parse: parse,\n    stringify: stringify\n};\n\n//# sourceURL=webpack:///./node_modules/qs/lib/index.js?");

/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/qs/lib/utils.js\");\n\nvar has = Object.prototype.hasOwnProperty;\n\nvar defaults = {\n    allowDots: false,\n    allowPrototypes: false,\n    arrayLimit: 20,\n    decoder: utils.decode,\n    delimiter: '&',\n    depth: 5,\n    parameterLimit: 1000,\n    plainObjects: false,\n    strictNullHandling: false\n};\n\nvar parseValues = function parseQueryStringValues(str, options) {\n    var obj = {};\n    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\\?/, '') : str;\n    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;\n    var parts = cleanStr.split(options.delimiter, limit);\n\n    for (var i = 0; i < parts.length; ++i) {\n        var part = parts[i];\n\n        var bracketEqualsPos = part.indexOf(']=');\n        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;\n\n        var key, val;\n        if (pos === -1) {\n            key = options.decoder(part, defaults.decoder);\n            val = options.strictNullHandling ? null : '';\n        } else {\n            key = options.decoder(part.slice(0, pos), defaults.decoder);\n            val = options.decoder(part.slice(pos + 1), defaults.decoder);\n        }\n        if (has.call(obj, key)) {\n            obj[key] = [].concat(obj[key]).concat(val);\n        } else {\n            obj[key] = val;\n        }\n    }\n\n    return obj;\n};\n\nvar parseObject = function parseObject(chain, val, options) {\n    var leaf = val;\n\n    for (var i = chain.length - 1; i >= 0; --i) {\n        var obj;\n        var root = chain[i];\n\n        if (root === '[]') {\n            obj = [];\n            obj = obj.concat(leaf);\n        } else {\n            obj = options.plainObjects ? Object.create(null) : {};\n            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;\n            var index = parseInt(cleanRoot, 10);\n            if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {\n                obj = [];\n                obj[index] = leaf;\n            } else {\n                obj[cleanRoot] = leaf;\n            }\n        }\n\n        leaf = obj;\n    }\n\n    return leaf;\n};\n\nvar parseKeys = function parseQueryStringKeys(givenKey, val, options) {\n    if (!givenKey) {\n        return;\n    }\n\n    // Transform dot notation to bracket notation\n    var key = options.allowDots ? givenKey.replace(/\\.([^.[]+)/g, '[$1]') : givenKey;\n\n    // The regex chunks\n\n    var brackets = /(\\[[^[\\]]*])/;\n    var child = /(\\[[^[\\]]*])/g;\n\n    // Get the parent\n\n    var segment = brackets.exec(key);\n    var parent = segment ? key.slice(0, segment.index) : key;\n\n    // Stash the parent if it exists\n\n    var keys = [];\n    if (parent) {\n        // If we aren't using plain objects, optionally prefix keys\n        // that would overwrite object prototype properties\n        if (!options.plainObjects && has.call(Object.prototype, parent)) {\n            if (!options.allowPrototypes) {\n                return;\n            }\n        }\n\n        keys.push(parent);\n    }\n\n    // Loop through children appending to the array until we hit depth\n\n    var i = 0;\n    while ((segment = child.exec(key)) !== null && i < options.depth) {\n        i += 1;\n        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {\n            if (!options.allowPrototypes) {\n                return;\n            }\n        }\n        keys.push(segment[1]);\n    }\n\n    // If there's a remainder, just add whatever is left\n\n    if (segment) {\n        keys.push('[' + key.slice(segment.index) + ']');\n    }\n\n    return parseObject(keys, val, options);\n};\n\nmodule.exports = function (str, opts) {\n    var options = opts ? utils.assign({}, opts) : {};\n\n    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {\n        throw new TypeError('Decoder has to be a function.');\n    }\n\n    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;\n    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;\n    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;\n    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;\n    options.parseArrays = options.parseArrays !== false;\n    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;\n    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;\n    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;\n    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;\n    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;\n    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;\n\n    if (str === '' || str === null || typeof str === 'undefined') {\n        return options.plainObjects ? Object.create(null) : {};\n    }\n\n    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;\n    var obj = options.plainObjects ? Object.create(null) : {};\n\n    // Iterate over the keys and setup the new object\n\n    var keys = Object.keys(tempObj);\n    for (var i = 0; i < keys.length; ++i) {\n        var key = keys[i];\n        var newObj = parseKeys(key, tempObj[key], options);\n        obj = utils.merge(obj, newObj, options);\n    }\n\n    return utils.compact(obj);\n};\n\n//# sourceURL=webpack:///./node_modules/qs/lib/parse.js?");

/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/qs/lib/utils.js\");\nvar formats = __webpack_require__(/*! ./formats */ \"./node_modules/qs/lib/formats.js\");\n\nvar arrayPrefixGenerators = {\n    brackets: function brackets(prefix) {\n        // eslint-disable-line func-name-matching\n        return prefix + '[]';\n    },\n    indices: function indices(prefix, key) {\n        // eslint-disable-line func-name-matching\n        return prefix + '[' + key + ']';\n    },\n    repeat: function repeat(prefix) {\n        // eslint-disable-line func-name-matching\n        return prefix;\n    }\n};\n\nvar toISO = Date.prototype.toISOString;\n\nvar defaults = {\n    delimiter: '&',\n    encode: true,\n    encoder: utils.encode,\n    encodeValuesOnly: false,\n    serializeDate: function serializeDate(date) {\n        // eslint-disable-line func-name-matching\n        return toISO.call(date);\n    },\n    skipNulls: false,\n    strictNullHandling: false\n};\n\nvar stringify = function stringify( // eslint-disable-line func-name-matching\nobject, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly) {\n    var obj = object;\n    if (typeof filter === 'function') {\n        obj = filter(prefix, obj);\n    } else if (obj instanceof Date) {\n        obj = serializeDate(obj);\n    } else if (obj === null) {\n        if (strictNullHandling) {\n            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;\n        }\n\n        obj = '';\n    }\n\n    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {\n        if (encoder) {\n            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);\n            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];\n        }\n        return [formatter(prefix) + '=' + formatter(String(obj))];\n    }\n\n    var values = [];\n\n    if (typeof obj === 'undefined') {\n        return values;\n    }\n\n    var objKeys;\n    if (Array.isArray(filter)) {\n        objKeys = filter;\n    } else {\n        var keys = Object.keys(obj);\n        objKeys = sort ? keys.sort(sort) : keys;\n    }\n\n    for (var i = 0; i < objKeys.length; ++i) {\n        var key = objKeys[i];\n\n        if (skipNulls && obj[key] === null) {\n            continue;\n        }\n\n        if (Array.isArray(obj)) {\n            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));\n        } else {\n            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));\n        }\n    }\n\n    return values;\n};\n\nmodule.exports = function (object, opts) {\n    var obj = object;\n    var options = opts ? utils.assign({}, opts) : {};\n\n    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {\n        throw new TypeError('Encoder has to be a function.');\n    }\n\n    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;\n    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;\n    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;\n    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;\n    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;\n    var sort = typeof options.sort === 'function' ? options.sort : null;\n    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;\n    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;\n    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;\n    if (typeof options.format === 'undefined') {\n        options.format = formats['default'];\n    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {\n        throw new TypeError('Unknown format option provided.');\n    }\n    var formatter = formats.formatters[options.format];\n    var objKeys;\n    var filter;\n\n    if (typeof options.filter === 'function') {\n        filter = options.filter;\n        obj = filter('', obj);\n    } else if (Array.isArray(options.filter)) {\n        filter = options.filter;\n        objKeys = filter;\n    }\n\n    var keys = [];\n\n    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {\n        return '';\n    }\n\n    var arrayFormat;\n    if (options.arrayFormat in arrayPrefixGenerators) {\n        arrayFormat = options.arrayFormat;\n    } else if ('indices' in options) {\n        arrayFormat = options.indices ? 'indices' : 'repeat';\n    } else {\n        arrayFormat = 'indices';\n    }\n\n    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];\n\n    if (!objKeys) {\n        objKeys = Object.keys(obj);\n    }\n\n    if (sort) {\n        objKeys.sort(sort);\n    }\n\n    for (var i = 0; i < objKeys.length; ++i) {\n        var key = objKeys[i];\n\n        if (skipNulls && obj[key] === null) {\n            continue;\n        }\n\n        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode ? encoder : null, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));\n    }\n\n    var joined = keys.join(delimiter);\n    var prefix = options.addQueryPrefix === true ? '?' : '';\n\n    return joined.length > 0 ? prefix + joined : '';\n};\n\n//# sourceURL=webpack:///./node_modules/qs/lib/stringify.js?");

/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar has = Object.prototype.hasOwnProperty;\n\nvar hexTable = function () {\n    var array = [];\n    for (var i = 0; i < 256; ++i) {\n        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());\n    }\n\n    return array;\n}();\n\nvar compactQueue = function compactQueue(queue) {\n    var obj;\n\n    while (queue.length) {\n        var item = queue.pop();\n        obj = item.obj[item.prop];\n\n        if (Array.isArray(obj)) {\n            var compacted = [];\n\n            for (var j = 0; j < obj.length; ++j) {\n                if (typeof obj[j] !== 'undefined') {\n                    compacted.push(obj[j]);\n                }\n            }\n\n            item.obj[item.prop] = compacted;\n        }\n    }\n\n    return obj;\n};\n\nvar arrayToObject = function arrayToObject(source, options) {\n    var obj = options && options.plainObjects ? Object.create(null) : {};\n    for (var i = 0; i < source.length; ++i) {\n        if (typeof source[i] !== 'undefined') {\n            obj[i] = source[i];\n        }\n    }\n\n    return obj;\n};\n\nvar merge = function merge(target, source, options) {\n    if (!source) {\n        return target;\n    }\n\n    if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {\n        if (Array.isArray(target)) {\n            target.push(source);\n        } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {\n            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {\n                target[source] = true;\n            }\n        } else {\n            return [target, source];\n        }\n\n        return target;\n    }\n\n    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {\n        return [target].concat(source);\n    }\n\n    var mergeTarget = target;\n    if (Array.isArray(target) && !Array.isArray(source)) {\n        mergeTarget = arrayToObject(target, options);\n    }\n\n    if (Array.isArray(target) && Array.isArray(source)) {\n        source.forEach(function (item, i) {\n            if (has.call(target, i)) {\n                if (target[i] && _typeof(target[i]) === 'object') {\n                    target[i] = merge(target[i], item, options);\n                } else {\n                    target.push(item);\n                }\n            } else {\n                target[i] = item;\n            }\n        });\n        return target;\n    }\n\n    return Object.keys(source).reduce(function (acc, key) {\n        var value = source[key];\n\n        if (has.call(acc, key)) {\n            acc[key] = merge(acc[key], value, options);\n        } else {\n            acc[key] = value;\n        }\n        return acc;\n    }, mergeTarget);\n};\n\nvar assign = function assignSingleSource(target, source) {\n    return Object.keys(source).reduce(function (acc, key) {\n        acc[key] = source[key];\n        return acc;\n    }, target);\n};\n\nvar decode = function decode(str) {\n    try {\n        return decodeURIComponent(str.replace(/\\+/g, ' '));\n    } catch (e) {\n        return str;\n    }\n};\n\nvar encode = function encode(str) {\n    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.\n    // It has been adapted here for stricter adherence to RFC 3986\n    if (str.length === 0) {\n        return str;\n    }\n\n    var string = typeof str === 'string' ? str : String(str);\n\n    var out = '';\n    for (var i = 0; i < string.length; ++i) {\n        var c = string.charCodeAt(i);\n\n        if (c === 0x2D // -\n        || c === 0x2E // .\n        || c === 0x5F // _\n        || c === 0x7E // ~\n        || c >= 0x30 && c <= 0x39 // 0-9\n        || c >= 0x41 && c <= 0x5A // a-z\n        || c >= 0x61 && c <= 0x7A // A-Z\n        ) {\n                out += string.charAt(i);\n                continue;\n            }\n\n        if (c < 0x80) {\n            out = out + hexTable[c];\n            continue;\n        }\n\n        if (c < 0x800) {\n            out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);\n            continue;\n        }\n\n        if (c < 0xD800 || c >= 0xE000) {\n            out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);\n            continue;\n        }\n\n        i += 1;\n        c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);\n        out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];\n    }\n\n    return out;\n};\n\nvar compact = function compact(value) {\n    var queue = [{ obj: { o: value }, prop: 'o' }];\n    var refs = [];\n\n    for (var i = 0; i < queue.length; ++i) {\n        var item = queue[i];\n        var obj = item.obj[item.prop];\n\n        var keys = Object.keys(obj);\n        for (var j = 0; j < keys.length; ++j) {\n            var key = keys[j];\n            var val = obj[key];\n            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val !== null && refs.indexOf(val) === -1) {\n                queue.push({ obj: obj, prop: key });\n                refs.push(val);\n            }\n        }\n    }\n\n    return compactQueue(queue);\n};\n\nvar isRegExp = function isRegExp(obj) {\n    return Object.prototype.toString.call(obj) === '[object RegExp]';\n};\n\nvar isBuffer = function isBuffer(obj) {\n    if (obj === null || typeof obj === 'undefined') {\n        return false;\n    }\n\n    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));\n};\n\nmodule.exports = {\n    arrayToObject: arrayToObject,\n    assign: assign,\n    compact: compact,\n    decode: decode,\n    encode: encode,\n    isBuffer: isBuffer,\n    isRegExp: isRegExp,\n    merge: merge\n};\n\n//# sourceURL=webpack:///./node_modules/qs/lib/utils.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _index = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar apiConf = {\n  personal: {\n    type: 'GET',\n    url: 'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0'\n  },\n  cash: {\n    type: 'POST',\n    url: 'https://huodong.office.bzdev.net/restful/activity/crazy/cash.json?money=5'\n  },\n  detail: 'https://huodong.office.bzdev.net/restful/yunji/product/goods/detail.json?id=2',\n  app: {\n    methodName: {\n      type: ['get', 'post'],\n      url: 'https://api.office.bzdev.net/yunji/restful/pedometer/list.json'\n    }\n  }\n}; // import BzAxios from '../dist/bz-axios.umd.js';\n\n\nvar api = new _index2.default(apiConf);\n// 覆盖原有方法\napi.Request._defaultError = function (err) {\n  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'neworkError';\n\n  if (type === 'data') {\n    var message = err.error_message ? err.error_message : '请求失败';\n    return console.error(message);\n  }\n  return console.log('err');\n};\n\n// 挂到全局方便html调用\nwindow.api = api;\ndocument.querySelector('.btn-box').addEventListener('click', function (e) {\n  var target = e.target;\n  if (target.className === 'btn-box__a') {\n    var key = target.dataset.code;\n    if (!key) return false;\n    var Dom = document.getElementById(key);\n    var code = Dom.innerHTML;\n    document.getElementById('code').innerHTML = code;\n    return eval(code.replace(/<span class=\"tips\">[^<>]*<\\/span>/g, ''));\n  }\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _axios = __webpack_require__(/*! ./request/axios */ \"./src/request/axios.js\");\n\nvar _axios2 = _interopRequireDefault(_axios);\n\nvar _core = __webpack_require__(/*! ./module/core */ \"./src/module/core.js\");\n\nvar _core2 = _interopRequireDefault(_core);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar API = function (_RequestCore) {\n  _inherits(API, _RequestCore);\n\n  function API(apiConf, Request, params, ajaxHeaders) {\n    var debug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;\n    var withCredentials = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;\n\n    _classCallCheck(this, API);\n\n    if (typeof Request !== 'function') {\n      Request = _axios2.default;\n    }\n    return _possibleConstructorReturn(this, (API.__proto__ || Object.getPrototypeOf(API)).call(this, apiConf, Request, params, ajaxHeaders, debug, withCredentials));\n  }\n\n  return API;\n}(_core2.default);\n\nexports.default = API;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/module/core.js":
/*!****************************!*\
  !*** ./src/module/core.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar RequestCore = function () {\n  function RequestCore(apiConf, Request) {\n    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n    var ajaxHeaders = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n    var debug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;\n    var withCredentials = arguments[5];\n\n    _classCallCheck(this, RequestCore);\n\n    this.Request = new Request(params, ajaxHeaders, debug, withCredentials);\n    this._createMethods(apiConf, this);\n  }\n\n  // 为避免命名重复问题，内部方法设为静态方法\n  // 生成实例的方法\n\n\n  _createClass(RequestCore, [{\n    key: '_createMethods',\n    value: function _createMethods(apiConf) {\n      var _this = this;\n\n      var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;\n\n      if (!apiConf) return false;\n      // 多层数据遍历生成\n      // object 配置 parent 上级属性\n      var scoop = function scoop(config) {\n        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this;\n\n        if (!config || !parent) return false;\n        for (var key in config) {\n          if (Object.prototype.hasOwnProperty.call(config, key)) {\n            var value = config[key];\n            // 字符串判断为url，请求方法为get\n            if (typeof value === 'string') {\n              _this._createRequest(parent, key, value);\n            }\n            if (Object.prototype.toString.call(value) === '[object Object]') {\n              // conf为对象且不存在url属性，判断为模块，进行下一层遍历\n              if (!Object.prototype.hasOwnProperty.call(value, 'url')) {\n                if (!parent[key]) parent[key] = {};\n                scoop(value, parent[key]);\n              } else {\n                _this._createRequest(parent, key, value.url, value.type);\n              }\n            }\n          }\n        }\n        return false;\n      };\n      return scoop(apiConf, object);\n    }\n\n    // 绑定请求\n\n  }, {\n    key: '_createRequest',\n    value: function _createRequest(obj, key, url) {\n      var _this2 = this;\n\n      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'get';\n\n      var requestMethod = function requestMethod(method) {\n        return function (config, requestConf) {\n          return _this2.Request._requestProxy(method, url, config, requestConf, _this2);\n        };\n      };\n      var types = [];\n      if (Object.prototype.toString.call(type) === '[object Array]') {\n        types.push.apply(types, _toConsumableArray(type));\n      } else {\n        types.push(type);\n      }\n      var isHadGetMethod = types.some(function (method) {\n        return (/get/gi.test(method)\n        );\n      });\n      if (isHadGetMethod) obj[key] = requestMethod('get');\n      if (!isHadGetMethod && !obj[key]) obj[key] = {};\n\n      types.forEach(function (method) {\n        obj[key][method.toUpperCase()] = requestMethod(method);\n      });\n    }\n  }]);\n\n  return RequestCore;\n}();\n\nexports.default = RequestCore;\n\n//# sourceURL=webpack:///./src/module/core.js?");

/***/ }),

/***/ "./src/module/handler.js":
/*!*******************************!*\
  !*** ./src/module/handler.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/*\r\n * api预处理器/后处理器\r\n */\n/* eslint no-underscore-dangle: [\"error\", { \"allow\": [\"_defaultError\", \"_debug\"] }] */\n\nvar Handler = function () {\n  function Handler() {\n    var _debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n\n    _classCallCheck(this, Handler);\n\n    this._debug = _debug;\n  }\n\n  _createClass(Handler, [{\n    key: '_getUrlParams',\n    value: function _getUrlParams(url) {\n      var href = url;\n      var pos = href.indexOf('?');\n      var params = {};\n\n      if (pos !== -1) {\n        href = href.substr(pos + 1);\n        href.split('&').forEach(function (item) {\n          var data = item.split('=');\n          params[data[0]] = data[1];\n        });\n\n        return params;\n      }\n\n      return params;\n    }\n    // 拼接url\n    // eslint-disable-next-line class-methods-use-this\n\n  }, {\n    key: '_setUrlParam',\n    value: function _setUrlParam(url) {\n      var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n      if (!url) return url;\n\n      var params = Object.assign(this._getUrlParams(url), obj);\n      var pos = url.indexOf('?');\n      var isHadParams = pos !== -1;\n      var href = isHadParams ? url.substring(0, pos) : url;\n\n      return href + '?' + Object.keys(params).map(function (key) {\n        return key + '=' + obj[key];\n      }).join('&');\n    }\n\n    // 同步处理事件分流器，一般用于actions\n\n  }, {\n    key: '_shunt',\n    value: function _shunt() {\n      var _this = this;\n\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return function () {\n        for (var _len2 = arguments.length, resArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n          resArgs[_key2] = arguments[_key2];\n        }\n\n        args.forEach(function (fn) {\n          if (Object.prototype.toString.call(fn) === '[object Function]') {\n            fn.apply(_this, resArgs);\n          }\n        });\n      };\n    }\n\n    // 异步分流器\n    // eslint-disable-next-line class-methods-use-this\n\n  }, {\n    key: '_shuntAsync',\n    value: function _shuntAsync() {\n      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n        args[_key3] = arguments[_key3];\n      }\n\n      return function () {\n        for (var _len4 = arguments.length, resArgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n          resArgs[_key4] = arguments[_key4];\n        }\n\n        var index = 0;\n        var loop = function loop() {\n          if (Object.prototype.toString.call(args[index]) === '[object Function]') {\n            args[index].apply(args, _toConsumableArray(resArgs.concat(function () {\n              index += 1;\n              if (index < args.length) {\n                loop();\n              }\n            })));\n          }\n        };\n        loop();\n      };\n    }\n\n    // 请求成功后处理接口数据\n\n  }, {\n    key: '_res',\n    value: function _res(data, successCB, errorCB, completeCB, requestComplete) {\n      if (this._debug) {\n        console.log(data);\n        this._debug = false;\n      }\n      if (data.error_code === 0) {\n        if (successCB) successCB(data);\n      } else if (errorCB) {\n        errorCB(data);\n      } else {\n        this._defaultError(data, 'data');\n      }\n      if (completeCB) completeCB(data);\n      if (requestComplete) requestComplete(data);\n    }\n\n    // 默认网络异常处理方法\n    // eslint-disable-next-line class-methods-use-this\n\n  }, {\n    key: '_defaultError',\n    value: function _defaultError(err) {\n      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'networkError';\n\n      if (type === 'data') return console.log('\\u683C\\u5F0F\\u5F02\\u5E38\\uFF1A' + (err && typeof err === 'string' ? err : err.error_message));\n      return console.error(err);\n    }\n\n    // 网络异常处理\n\n  }, {\n    key: '_networkError',\n    value: function _networkError(networkErrorCB, requestCompleteCB) {\n      var _this2 = this;\n\n      if (this._debug && (networkErrorCB || requestCompleteCB)) {\n        this._debug = false;\n        return function (err) {\n          _this2._defaultError(err);\n          if (networkErrorCB) networkErrorCB(err);\n          if (requestCompleteCB) requestCompleteCB(err);\n        };\n      }\n      return function (err) {\n        if (requestCompleteCB) requestCompleteCB(err);\n        if (networkErrorCB) return networkErrorCB(err);\n        return _this2._defaultError(err);\n      };\n    }\n  }]);\n\n  return Handler;\n}();\n\nexports.default = Handler;\n\n//# sourceURL=webpack:///./src/module/handler.js?");

/***/ }),

/***/ "./src/request/axios.js":
/*!******************************!*\
  !*** ./src/request/axios.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _qs = __webpack_require__(/*! qs */ \"./node_modules/qs/lib/index.js\");\n\nvar _qs2 = _interopRequireDefault(_qs);\n\nvar _axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\nvar _axios2 = _interopRequireDefault(_axios);\n\nvar _handler = __webpack_require__(/*! ../module/handler */ \"./src/module/handler.js\");\n\nvar _handler2 = _interopRequireDefault(_handler);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Request = function (_Handler) {\n  _inherits(Request, _Handler);\n\n  function Request(params, ajaxHeaders) {\n    var _debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n    var withCredentials = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;\n\n    _classCallCheck(this, Request);\n\n    var _this = _possibleConstructorReturn(this, (Request.__proto__ || Object.getPrototypeOf(Request)).call(this, _debug));\n\n    _this.params = params;\n    _this.ajaxHeaders = ajaxHeaders;\n    _axios2.default.defaults.withCredentials = withCredentials;\n    return _this;\n  }\n\n  _createClass(Request, [{\n    key: '_requestProxy',\n    value: function _requestProxy() {\n      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'get';\n      var url = arguments[1];\n\n      var _apiParams,\n          _this2 = this;\n\n      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n      var requestConf = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n\n      if (!url) return false;\n      var requestType = (config.type || type).toLowerCase();\n      var apiType = requestType === 'form' ? 'post' : requestType;\n\n      var isParamsOption = !/post|put|delete/gi.test(apiType);\n      var apiDataKey = isParamsOption ? 'params' : 'data';\n      // 处理params参数\n      var requestParams = Object.assign({}, this.params, config.data);\n\n      var apiParams = (_apiParams = {\n        method: apiType,\n        url: url\n      }, _defineProperty(_apiParams, apiDataKey, isParamsOption ? requestParams : _qs2.default.stringify(requestParams)), _defineProperty(_apiParams, 'headers', {}), _apiParams);\n      // 处理请求头\n      if (/put|delete/gi.test(requestType)) {\n        apiParams.headers['Content-Type'] = 'application/x-www-form-urlencoded';\n      } else if (/form/gi.test(requestType)) {\n        apiParams.headers['Content-Type'] = 'multipart/form-data';\n        apiParams.onUploadProgress = function (process) {\n          if (config.progress) config.progress(process);\n        };\n      }\n      // 若外部传入axios配置，以外部传入为主\n      if (this.ajaxHeaders) Object.assign(apiParams.headers, this.ajaxHeaders);\n      for (var key in requestConf) {\n        if (Object.prototype.hasOwnProperty.call(requestConf, key)) {\n          apiParams[key] = requestConf[key];\n        }\n      }\n\n      var result = (0, _axios2.default)(apiParams);\n      result.then(function (res) {\n        _this2._res(res.data, config.success, config.error, config.complete, config.requestComplete);\n      }).catch(this._networkError(config.networkError, config.requestComplete));\n\n      return new Promise(function (resolve, reject) {\n        result.then(function (res) {\n          return resolve(res.data);\n        }).catch(function (err) {\n          return reject(err);\n        });\n      });\n    }\n  }]);\n\n  return Request;\n}(_handler2.default);\n\nexports.default = Request;\n\n//# sourceURL=webpack:///./src/request/axios.js?");

/***/ })

/******/ });