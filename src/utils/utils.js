import { config } from "./config.ts";

const checkResponse = (res) => {
    console.log(res)
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

const checkSuccess = (res) => {
    console.log(res)
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ошибка: ${res}`);
}

export const request = (endpoint, options) => {
    return fetch(`${config.url}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}