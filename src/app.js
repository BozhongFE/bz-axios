// import BzAxios from '../dist/bz-axios.umd.js';
import BzAxios from './index';

const api = new BzAxios(
  {
    personal: {
      type: 'GET',
      url:
        'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
    },
    cash: {
      type: 'POST',
      url:
        'https://huodong.office.bzdev.net/restful/activity/crazy/cash.json?money=5',
    },
    detail:
      'https://huodong.office.bzdev.net/restful/yunji/product/goods/detail.json?id=2',
    app: {
      methodName: {
        type: ['get', 'post'],
        url: 'https://api.office.bzdev.net/yunji/restful/pedometer/list.json',
      },
    },
  },
  undefined,
  { a: 1 }
);

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
