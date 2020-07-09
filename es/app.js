import BzAxios from './index';
const config = {
    api1: {
        url: 'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
        type: ['POST', 'PUT', 'DELETE'],
    },
    api2: {
        key: {
            url: 'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
        },
        key2: {
            key3: {
                url: 'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
            },
        },
    },
};
const api = new BzAxios(config, {}, {});
api['_defaultError'] = (data) => { };
const result = api['api1'].POST();
result.then((res) => { }).catch((err) => { });
