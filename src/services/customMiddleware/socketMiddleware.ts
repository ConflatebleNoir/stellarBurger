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
                socket = new WebSocket(`${wsUrl}?token=${userData?.accessToken?.replace('Bearer', '')}`);
            };

            if (type === onClose) {
                socket && socket.close(1000, 'CLOSE_NORMAL')
            };

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restData } = parsedData;

                    dispatch({ type: onMessage, payload: restData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
            };

            next(action);
        };
    }) as Middleware;
};