import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { compose, applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux'
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

const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

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

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(config.ordersDataUrl, unitedWSOrdersActions), socketMiddleware(config.userOrdersDataUrl, unitedWSUserActions)));

export const store = createStore(rootReducer, enhancer);