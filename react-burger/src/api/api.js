export const getData = (config) => {
    return fetch(`${config.url}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        });
}