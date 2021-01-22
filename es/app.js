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
            key4: 'https://huodong.office.bzdev.net/restful/activity/crazy/home.json?story_type=0',
        },
    },
};
const api = new BzAxios(config, {}, {});
api['_defaultError'] = (data) => {
    console.log('error', data);
};
const result = api['api2']['key2']['key4'].GET();
result.then((res) => { }).catch((err) => { });
