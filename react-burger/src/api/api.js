export const getData = (config) => {
    return fetch(`${config.url}`)
        .then(res => res.json())
}