import { postOrder } from '../../utils/api.ts';
import { removeOrderList } from './ingredients';

export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const GET_ORDER_DATA_SUCCESS = 'GET_ORDER_DATA_SUCCESS';
export const GET_ORDER_DATA_FAILED = 'GET_ORDER_DATA_FAILED';

export const REMOVE_ORDER_DATA = 'REMOVE_ORDER_DATA';

export const getOrderData = () => ({
    type: GET_ORDER_DATA,
});

export const getOrderDataSuccess = (data) => ({
    type: GET_ORDER_DATA_SUCCESS,
    payload: data,
});

export const getOrderDataFailed = () => ({
    type: GET_ORDER_DATA_FAILED,
});

export const removeOrder = () => ({
    type: REMOVE_ORDER_DATA,
})

export function getOrder(itemId) {
    return function (dispatch) {
        dispatch(getOrderData());
        postOrder(itemId)
            .then(data => {
                dispatch(getOrderDataSuccess(data))
            })
            .then(() => {
                dispatch(removeOrderList())
            })
            .catch(() => dispatch(getOrderDataFailed()))
    }
}