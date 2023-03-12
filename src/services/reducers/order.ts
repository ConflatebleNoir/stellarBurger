import {
    GET_ORDER_DATA,
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_FAILED,
    REMOVE_ORDER_DATA,
} from '../actions/order';

interface IOrder {
    orderRequestSuccess: boolean,
    orderRequestFailed: boolean,
    orderDetails: Array<object> | null,
}

const defaultState: IOrder = {
    orderRequestSuccess: false,
    orderRequestFailed: false,
    orderDetails: null,
};

export const orderReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case GET_ORDER_DATA_SUCCESS: {
            return {
                ...state,
                orderRequestSuccess: false,
                orderDetails: action.payload,
            };
        }
        case GET_ORDER_DATA_FAILED: {
            return {
                ...state,
                orderRequestSuccess: false,
                orderRequestFailed: true,
            };
        }
        case GET_ORDER_DATA: {
            return {
                ...state,
                orderRequestSuccess: true,
                orderRequestFailed: false,
            };
        }
        case REMOVE_ORDER_DATA: {
            return {
                ...state,
                orderDetails: null,
            };
        }
        default: {
            return state;
        };
    };
};