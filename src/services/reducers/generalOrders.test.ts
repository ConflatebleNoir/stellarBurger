import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS,
    GET_ORDER_INFO,
    GET_ORDER_INFO_SUCCESS,
    GET_ORDER_INFO_FAILED,
    WIPE_ORDER_INFO,
} from '../actions/generalOrders'
import { generalOrdersReducer } from "./generalOrders";
import { defaultState } from './generalOrders';

describe('general_orders_reducer', () => {

    it('have to return default state', () => {
        //@ts-ignore
        expect(generalOrdersReducer(undefined, {}))
            .toEqual(defaultState)
    })

    it('have to handle WS_CONNECTION_SUCCESS', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS,
        }

        expect(generalOrdersReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                generalOrdersError: undefined,
                wsGeneralOrders: true,
            })
    })

    it('have to handle WS_USER_ORDERS_CONNECTION_SUCCESS', () => {
        const action = {
            type: WS_USER_ORDERS_CONNECTION_SUCCESS,
        }

        expect(generalOrdersReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                userOrdersError: undefined,
                wsUserOrders: true,
            })
    })

    it('have to handle WS_CONNECTION_ERROR', () => {
        const prevState = {
            ...defaultState,
            wsGeneralOrders: true,
        }

        const action = {
            type: WS_CONNECTION_ERROR,
            payload: 'Error',
        }

        //@ts-ignore
        expect(generalOrdersReducer(prevState, action))
            .toEqual({
                ...prevState,
                generalOrdersError: action.payload,
                wsGeneralOrders: false,
            })
    })

    it('have to handle WS_USER_ORDERS_CONNECTION_ERROR', () => {
        const prevState = {
            ...defaultState,
            wsUserOrders: true,
        }

        const action = {
            type: WS_USER_ORDERS_CONNECTION_ERROR,
            payload: 'Error'
        }

        //@ts-ignore
        expect(generalOrdersReducer(prevState, action))
            .toEqual({
                ...prevState,
                userOrdersError: action.payload,
                wsUserOrders: false,
            })
    })

    it('have to handle WS_CONNECTION_CLOSED', () => {
        const prevState = {
            ...defaultState,
            wsGeneralOrders: true,
            orders: [{}, {}],
            total: 1,
            totalToday: 1,
        }

        const action = {
            type: WS_CONNECTION_CLOSED,
        }
        //@ts-ignore
        expect(generalOrdersReducer(prevState, action))
            .toEqual({
                ...prevState,
                generalOrdersError: undefined,
                wsGeneralOrders: false,
                orders: [],
                total: 0,
                totalToday: 0,
            })
    })

    it('have to handle WS_USER_ORDERS_CONNECTION_CLOSED', () => {
        const prevState = {
            ...defaultState,
            wsUserOrders: true,
            userOrders: [{}, {}],
            total: 1,
            totalToday: 1,
        }

        const action = {
            type: WS_USER_ORDERS_CONNECTION_CLOSED,
        }
        //@ts-ignore
        expect(generalOrdersReducer(prevState, action))
            .toEqual({
                ...prevState,
                wsUserOrders: false,
                userOrders: [],
                total: 0,
                totalToday: 0,
            })
    })

    it('have to handle WS_GET_ORDERS', () => {
        const action = {
            type: WS_GET_ORDERS,
            payload: {
                orders: [],
                total: 1,
                totalToday: 1,
            }
        }

        //@ts-ignore
        expect(generalOrdersReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                generalOrdersError: undefined,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            })
    })

    it('have to handle WS_GET_USER_ORDERS', () => {
        const action = {
            type: WS_GET_USER_ORDERS,
            payload: {
                orders: [],
                total: 1,
                totalToday: 1,
            }
        }

        //@ts-ignore
        expect(generalOrdersReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                generalOrdersError: undefined,
                userOrders: action.payload.orders,
            })
    })

    it('have to handle GET_ORDER_DATA', () => {
        const action = {
            type: GET_ORDER_INFO,
        }

        expect(generalOrdersReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                orderDataRequestSuccess: true,
                orderDataRequestFailed: false,
            })
    })

    it('have to handle GET_ORDER_DATA_SUCCESS', () => {
        const prevState = {
            ...defaultState,
            orderDataRequestSuccess: true,
        }

        const action = {
            type: GET_ORDER_INFO_SUCCESS,
            payload: [{}],
        }

        //@ts-ignore
        expect(generalOrdersReducer(prevState, action))
            .toEqual({
                ...prevState,
                orderDataRequestSuccess: false,
                orderData: action.payload,
            })
    })

    it('have to handle GET_ORDER_DATA_FAILED', () => {
        const prevState = {
            ...defaultState,
            orderDataRequestSuccess: true,
        }

        const action = {
            type: GET_ORDER_INFO_FAILED,
        }

        expect(generalOrdersReducer(prevState, action))
            .toEqual({
                ...prevState,
                orderDataRequestSuccess: false,
                orderDataRequestFailed: true,
            })
    })

    it('have to handle WIPE_ORDER_DATA', () => {
        const prevState = {
            ...defaultState,
            orderData: {},
        }

        const action = {
            type: WIPE_ORDER_INFO,
        }
        //@ts-ignore
        expect(generalOrdersReducer(prevState, action))
            .toEqual({
                ...prevState,
                orderDataRequestSuccess: false,
                orderDataRequestFailed: false,
                orderData: null,
            })
    })
})