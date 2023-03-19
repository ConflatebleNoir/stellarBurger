import { TIngredientID } from "../services/types/types";
import { request } from "./utils";

export const getIngredientsData = () => request('ingredients');

export const postOrder = (ingredientsId: TIngredientID[], token: string) => {
    const orderData = {
        'ingredients': ingredientsId
    }
    return request('orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': token,
        },
        body: JSON.stringify(orderData),
    })
};

export const postLogin = (email: string, password: string) => request('auth/login', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email,
        password,
    }),
});

export const postRegister = (email: string, password: string, name: string) => request('auth/register', {
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

export const findEmail = (email: string) => request('password-reset', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email,
    }),
});

export const postNewPassword = (passValue: string, codeValue: string) => request('password-reset/reset', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        password: passValue,
        token: codeValue,
    }),
});

export const postLogout = (refreshToken: string) => request('auth/logout', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "token": refreshToken
    }),
});

export const postRefreshToken = (refreshToken: string) => request('auth/token', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "token": refreshToken
    }),
});

export const getUserData = (token: string) => request('auth/user', {
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "authorization": token,
    },
    body: undefined,
});

export const patchUserInfo = (name: string, email: string, password: string, token: string) => request('auth/user', {
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
});

export const getOrderInfo = (order_number: number) => request(`orders/${order_number}`);