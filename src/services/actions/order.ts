import { postOrder } from '../../utils/api';
import { AppThunk, IOrder, TIngredientID } from '../types/types';
import { removeOrderList } from './ingredients';

export const GET_ORDER_DATA: 'GET_ORDER_DATA' = 'GET_ORDER_DATA';
export const GET_ORDER_DATA_SUCCESS: 'GET_ORDER_DATA_SUCCESS' = 'GET_ORDER_DATA_SUCCESS';
export const GET_ORDER_DATA_FAILED: 'GET_ORDER_DATA_FAILED' = 'GET_ORDER_DATA_FAILED';

export const REMOVE_ORDER_DATA: 'REMOVE_ORDER_DATA' = 'REMOVE_ORDER_DATA';

export interface IGetOrderData {
    readonly type: typeof GET_ORDER_DATA;
};

export interface IGetOrderDataSuccess {
    readonly type: typeof GET_ORDER_DATA_SUCCESS;
    readonly payload: IOrder;
};

export interface IGetOrderDataFailed {
    readonly type: typeof GET_ORDER_DATA_FAILED;
};

export interface IRemoveOrderData {
    readonly type: typeof REMOVE_ORDER_DATA;
};

export const getOrderData = () => ({
    type: GET_ORDER_DATA,
});

export const getOrderDataSuccess = (data: IOrder) => ({
    type: GET_ORDER_DATA_SUCCESS,
    payload: data,
});

export const getOrderDataFailed = () => ({
    type: GET_ORDER_DATA_FAILED,
});

export const removeOrder = () => ({
    type: REMOVE_ORDER_DATA,
})

export const getOrder: AppThunk = (itemId: TIngredientID[], token: string) => {
    return function (dispatch) {
        dispatch(getOrderData());
        postOrder(itemId, token)
            .then((data) => {
                // @ts-ignore
                dispatch(getOrderDataSuccess(data));
            })
            .then(() => {
                dispatch(removeOrderList())
            })
            .catch(() => dispatch(getOrderDataFailed()))
    }
}