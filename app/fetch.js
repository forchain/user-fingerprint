import axios from 'axios'
import appConfig from '../config';

const requestUrl = `${appConfig.host}`;
const requestPort = `${appConfig.port}`;

let config = {
    baseURL: `http://${requestUrl}:${requestPort}/api`,
    transformRequest: [
        (data) => {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret;
        }
    ],
    transformResponse: [
        (data) => {
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 10000,
    responseType: 'json'
};

axios.interceptors.response.use((res) => {
    return res.data;
});

export const get = (url, extra) => {
    extra = extra || {};
    extra.headers = {...config.headers, ...extra.headers || {}};

    let c = {...config, ...extra};
    return axios.get(url, c)
};

export const post = (url, data, extra) => {
    extra = extra || {};
    extra.headers = {...config.headers, ...extra.headers || {}};

    let c = {...config, ...extra};
    return axios.post(url, data, c)
};

export const update = (url, data, extra) => {
    extra = extra || {};
    extra.headers = {...config.headers, ...extra.headers || {}};

    let c = {...config, ...extra};
    return axios.put(url, data, c)
};
export const remove = (url, extra) => {
    extra = extra || {};
    extra.headers = {...config.headers, ...extra.headers || {}};

    let c = {...config, ...extra};
    return axios.delete(url, c)
};
