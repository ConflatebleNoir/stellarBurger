import { orderReducer } from "./order";
import {
    GET_ORDER_DATA,
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_FAILED,
    REMOVE_ORDER_DATA,
} from '../actions/order';
import { defaultState } from './order'

describe('order_reducer', () => {
    it('have to return default state', () => {
        //@ts-ignore
        expect(orderReducer(undefined, {})).toEqual(defaultState)
    })

    it('have to handle GET_ORDER_DATA', () => {
        const action = {
            type: GET_ORDER_DATA,
        }

        expect(orderReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                orderRequestSuccess: true,
            })
    })

    it('have to handle GET_ORDER_DATA_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            orderRequestSuccess: true,
        }

        const action = {
            type: GET_ORDER_DATA_SUCCESS,
            payload: [],
        }

        expect(orderReducer(prevState, action))
            .toEqual({
                ...prevState,
                orderRequestSuccess: false,
                orderDetails: action.payload,
            })
    })

    it('have to handle GET_ORDER_DATA_FAILED', () => {
        const prevState = {
            ...defaultState,
            orderRequestSuccess: true,
        }

        const action = {
            type: GET_ORDER_DATA_FAILED,
        }

        expect(orderReducer(prevState, action))
            .toEqual({
                ...prevState,
                orderRequestSuccess: false,
                orderRequestFailed: true,
            })
    })

    it('have to handle REMOVE_ORDER_DATA', () => {
        const prevState = {
            ...defaultState,
            orderDetails: [],
        }

        const action = {
            type: REMOVE_ORDER_DATA,
        }

        expect(orderReducer(prevState, action))
            .toEqual({
                ...prevState,
                orderDetails: null,
            })
    })
})