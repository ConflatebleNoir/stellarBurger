import { config } from "./config.js";

const checkResponse = (res: {
    body: any,
    bodyUsed: boolean,
    headers: object,
    ok: boolean,
    redirected: boolean,
    status: number,
    statusText: string,
    type: string,
    url: string,
    json?: any
}) => {
    console.log(res)
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

const checkSuccess = (res: {
    body: any,
    bodyUsed: boolean,
    headers: object,
    ok: boolean,
    redirected: boolean,
    status: number,
    statusText: string,
    type: string,
    url: string,
    json?: any,
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
} | undefined) => {
    return fetch(`${config.url}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}