import { request } from "./utils";

export const getIngredientsData = () => request('ingredients');

export const postOrder = (ingredientsId) => {
    const orderData = {
        'ingredients': ingredientsId
    }
    request('orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(orderData)
    })
};

export const postLogin = (email, password) => request('auth/login', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email,
        password,
    }),
});

export const postRegister = (email, password, name) => request('auth/register', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email,
        password,
        name,
    }),
});

export const findEmail = (email) => request('password-reset', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email,
    }),
});

export const postNewPassword = (passValue, codeValue) => request('password-reset/reset', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        password: passValue,
        token: codeValue,
    }),
});

export const postLogout = (refreshToken) => request('auth/logout', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "token": refreshToken
    }),
});

export const postRefreshToken = (refreshToken) => request('auth/token', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "token": refreshToken
    }),
});

export const getUserData = (token) => request('auth/user', {
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "authorization": token,
    },
});

export const patchUserInfo = (name, email, password, token) => request('auth/user', {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "authorization": token,
    },
    body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
    }),
})