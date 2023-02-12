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