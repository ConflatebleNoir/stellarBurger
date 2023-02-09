export const getIngredientsData = (config) => {
    return fetch(`${config.url}/ingredients`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        });
}

export const postOrder = (config, ingredientsId) => {
    const orderData = {
        id: ingredientsId,
    };

    return fetch(`${config.url}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(orderData.id)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        });
}