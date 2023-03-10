import { config } from "./config.js";

const checkResponse = (res: Response) => {
    console.log(res)
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

const checkSuccess = (res: {
    success: boolean,
}) => {
    console.log(res)
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ошибка: ${res}`);
}

export const request = (endpoint: string, options?: {
    method?: string,
    headers: HeadersInit,
    body: any,
}) => {
    return fetch(`${config.url}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}