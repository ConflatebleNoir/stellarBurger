import { IIngredient, IOrder, IUser } from "../services/types/types";
import { config } from "./config";

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

const checkSuccess = (res: {
    data: IIngredient[] & IOrder & IUser;
    success: boolean,
}) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ошибка: ${res}`);
}

export const request = (endpoint: string, options?: {
    method?: string,
    headers: HeadersInit,
    body?: BodyInit,
}) => {
    return fetch(`${config.url}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}