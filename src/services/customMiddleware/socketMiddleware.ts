import type { Middleware, MiddlewareAPI, } from "redux"
import { AppDispatch, RootState, IWSActions } from "../types/types"

export const socketMiddleware = (wsUrl: string, wsAction: IWSActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { userData } = getState();
            const { wsInitial, onOpen, onClose, onError, onMessage } = wsAction;

            if (type === wsInitial && userData) {
                socket = new WebSocket(`${wsUrl}?token=${userData?.accessToken?.replace('Bearer ', '')}`);
                console.log(socket)
            };

            if (type === onClose) {
                socket && socket.close(1000, 'CLOSE_NORMAL');
                console.log('закрытие')
            };

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                    console.log('Подключился успешно')
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                    console.log('Ошибка подключения')
                };

                socket.onmessage = event => {
                    console.log(event)
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restData } = parsedData;

                    dispatch({ type: onMessage, payload: restData });
                    console.log('изменение')
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                    console.log('соединение закрыто')
                };
            };

            next(action);
        };
    }) as Middleware;
};