import { checkResponse } from "./utils";

export const getIngredientsData = (config) => {
    return fetch(`${config.url}/ingredients`)
        .then(checkResponse)
}

export const postOrder = (config, ingredientsId) => {
    const orderData = {
        'ingredients': ingredientsId,
    };

    return fetch(`${config.url}/orders/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(orderData)
    })
        .then(checkResponse)
}

export const postLogin = (email, password, config) => {
    return fetch(`${config.url}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    }).then(checkResponse);
}

export const postRegister = (email, password, name, config) => {
    return fetch(`${config.url}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    }).then(checkResponse);
}

export const findEmail = (email, config) => {
    return fetch(`${config.url}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
        }),
    }).then(checkResponse);
}

export const postNewPassword = (passValue, codeValue, config) => {
    return fetch(`${config.url}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: passValue,
            token: codeValue,
        }),
    }).then(checkResponse);
}

export const postLogout = (refreshToken, config) => {
    return fetch(`${config.url}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "token": refreshToken
        }),
    }).then(checkResponse);
}

export const postRefreshToken = (refreshToken, config) => {
    return fetch(`${config.url}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "token": refreshToken
        }),
    }).then(checkResponse);
}