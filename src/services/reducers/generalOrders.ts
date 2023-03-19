import { AnyAction } from 'redux';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS,
    GET_ORDER_DATA,
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_FAILED,
    WIPE_ORDER_DATA,
} from '../actions/generalOrders'
import { IGeneralOrdersState } from '../types/types'

const defaultState: IGeneralOrdersState = {
    wsGeneralOrders: false,
    wsUserOrders: false,
    orders: [],
    userOrders: [],
    total: 0,
    totalToday: 0,
    orderDataRequestSuccess: false,
    orderDataRequestFailed: false,
    orderData: null,
};

export const generalOrdersReducer = (state = defaultState, action: AnyAction): IGeneralOrdersState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                generalOrdersError: undefined,
                wsGeneralOrders: true,
            };
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                generalOrdersError: action.payload,
                wsGeneralOrders: false,
            };
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                generalOrdersError: undefined,
                wsGeneralOrders: false,
                orders: [],
                total: 0,
                totalToday: 0,
            };
        }
        case WS_USER_ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
                userOrdersError: undefined,
                wsUserOrders: true,
            };
        }
        case WS_USER_ORDERS_CONNECTION_ERROR: {
            return {
                ...state,
                userOrdersError: action.payload,
                wsUserOrders: false,
            };
        }
        case WS_USER_ORDERS_CONNECTION_CLOSED: {
            return {
                ...state,
                userOrdersError: undefined,
                wsUserOrders: false,
                userOrders: [],
                total: 0,
                totalToday: 0,
            };
        }
        case WS_GET_ORDERS: {
            return {
                ...state,
                generalOrdersError: undefined,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };
        }
        case WS_GET_USER_ORDERS: {
            return {
                ...state,
                generalOrdersError: undefined,
                userOrders: action.payload.orders,
            };
        }
        case GET_ORDER_DATA: {
            return {
                ...state,
                orderDataRequestSuccess: true,
                orderDataRequestFailed: false,
            };
        }
        case GET_ORDER_DATA_SUCCESS: {
            return {
                ...state,
                orderDataRequestSuccess: true,
                orderData: action.payload,
            };
        }
        case GET_ORDER_DATA_FAILED: {
            return {
                ...state,
                orderDataRequestSuccess: false,
                orderDataRequestFailed: true,
            };
        }
        case WIPE_ORDER_DATA: {
            return {
                ...state,
                orderDataRequestSuccess: false,
                orderDataRequestFailed: false,
                orderData: null,
            };
        }
        default: {
            return state;
        };
    };
};