import { rootReducer } from './reducers/rootReducer';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_GET_USER_ORDERS,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_START,
    WS_USER_ORDERS_CONNECTION_SUCCESS
} from './actions/generalOrders';
import { socketMiddleware } from './customMiddleware/socketMiddleware';
import { config } from '../utils/config';
import { configureStore } from '@reduxjs/toolkit';

const unitedWSOrdersActions = {
    wsInitial: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_ORDERS,
};

const unitedWSUserActions = {
    wsInitial: WS_USER_ORDERS_CONNECTION_START,
    onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
    onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
    onError: WS_USER_ORDERS_CONNECTION_ERROR,
    onMessage: WS_GET_USER_ORDERS,
}

const orderMiddleware = socketMiddleware(config.ordersDataUrl, unitedWSOrdersActions);
const userOrderMiddleware = socketMiddleware(config.userOrdersDataUrl, unitedWSUserActions);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(orderMiddleware, userOrderMiddleware),
});