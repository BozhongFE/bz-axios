
import BzAxios from '../dist/bz-axios.umd.js';
// import BzAxios from './api';

const api = new BzAxios({
  personal: {
    type: 'GET', 
    url: 'http://account.office.bzdev.net/restful/personal.json',
  },
  detail: 'http://huodong.office.bzdev.net/restful/yunji/product/goods/detail.json?id=2',
  app: {
    methodName: {
      type: ['get', 'post'],
      url: 'http://api.office.bzdev.net/yunji/restful/pedometer/list.json',
    },
  },
});
// 挂到全局方便html调用
window.api = api;

document.querySelector('.btn-box').addEventListener('click', (e) => {
  const target = e.target;
  if (target.className === 'btn-box__a') {
    const key = target.dataset.code;
    if (!key) return false;
    const Dom = document.getElementById(key);
    const code = Dom.innerHTML;
    document.getElementById('code').innerHTML = code;
    return eval(code.replace(/<span class="tips">[^<>]*<\/span>/g, ''));
  }
});