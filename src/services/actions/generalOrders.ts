import { getOrderInfo } from "../../utils/api";
import { AppThunk, IGeneralOrdersState, IOrder } from "../types/types";


export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';

export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export const WS_USER_ORDERS_CONNECTION_START: 'WS_USER_ORDERS_CONNECTION_START' = 'WS_USER_ORDERS_CONNECTION_START';
export const WS_USER_ORDERS_CONNECTION_SUCCESS: 'WS_USER_ORDERS_CONNECTION_SUCCESS' = 'WS_USER_ORDERS_CONNECTION_SUCCESS';
export const WS_USER_ORDERS_CONNECTION_ERROR: 'WS_USER_ORDERS_CONNECTION_ERROR' = 'WS_USER_ORDERS_CONNECTION_ERROR';
export const WS_USER_ORDERS_CONNECTION_CLOSED: 'WS_USER_ORDERS_CONNECTION_CLOSED' = 'WS_USER_ORDERS_CONNECTION_CLOSED';

export const WS_GET_USER_ORDERS: 'WS_GET_USER_ORDERS' = 'WS_GET_USER_ORDERS';

export const GET_ORDER_DATA: 'GET_ORDER_DATA' = 'GET_ORDER_DATA';
export const GET_ORDER_DATA_SUCCESS: 'GET_ORDER_DATA_SUCCESS' = 'GET_ORDER_DATA_SUCCESS';
export const GET_ORDER_DATA_FAILED: 'GET_ORDER_DATA_FAILED' = 'GET_ORDER_DATA_FAILED';
export const WIPE_ORDER_DATA: 'WIPE_ORDER_DATA' = 'WIPE_ORDER_DATA';


export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSUserOrdersConnectionSuccess {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
}

export interface IWSUserOrdersConnectionError {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
    readonly payload: Event;
}
export interface IWSUserOrdersConnectionClosed {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}

export interface IWSOrdersConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
};

export interface IWSUserOrdersConnectionStart {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
};

export interface IWSGetOrders {
    readonly type: typeof WS_GET_ORDERS;
    readonly payload: IGeneralOrdersState;
}

export interface IWSGetUserOrders {
    readonly type: typeof WS_GET_USER_ORDERS;
    readonly payload: IGeneralOrdersState;
}

export interface IWSWipeOrderData {
    readonly type: typeof WIPE_ORDER_DATA;
}

export const wsOrdersConnectionStart = () => {
    return {
        type: WS_CONNECTION_START
    };
};

export const wsOrdersConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export const wsUserOrdersConnectionStart = () => {
    return {
        type: WS_USER_ORDERS_CONNECTION_START
    };
};

export const wsUserOrdersConnectionClosed = () => {
    return {
        type: WS_USER_ORDERS_CONNECTION_CLOSED
    };
};


export const setOrderDataLoading = () => ({ type: GET_ORDER_DATA });
export const setOrderDataSuccessLoading = (data: IOrder) => ({ type: GET_ORDER_DATA_SUCCESS, payload: data });
export const setOrderDataFailedLoading = () => ({ type: GET_ORDER_DATA_FAILED });
export const setWipeOrderData = () => ({ type: WIPE_ORDER_DATA });

export const getOrderData: AppThunk = (orderNum: number) => {
    return function (dispatch) {
        dispatch(setOrderDataLoading());

        getOrderInfo(orderNum)
            .then(data => {
                if (data) {
                    // @ts-ignore
                    dispatch(setOrderDataSuccessLoading(data.orders[0]));
                }
            })
            .catch(() => dispatch(setOrderDataFailedLoading()))
    };
};