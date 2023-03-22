import { IModal } from "../types/types"
import { modalReducer } from "./modal"
import {
    SWITCH_ORDER_MODAL_STATE,
    SWITCH_INGREDIENTS_MODAL_STATE,
    SWITCH_ORDER_FEED_MODAL_STATE,
} from '../actions/modal';


describe('modal_reducer', () => {
    const defaultState: IModal = {
        isOrderModalOpen: false,
        isIngredientModalOpen: false,
        isOrderFeedModalOpen: false,
    }

    it('have to return default state', () => {
        //@ts-ignore
        expect(modalReducer(undefined, {})).toEqual(defaultState)
    })

    it('have to handle SWITCH_ORDER_MODAL_STATE', () => {
        const action = {
            type: SWITCH_ORDER_MODAL_STATE,
            payload: true,
        }

        expect(modalReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                isOrderModalOpen: action.payload,
            })
    })

    it('have to handle SWITCH_INGREDIENTS_MODAL_STATE', () => {
        const action = {
            type: SWITCH_INGREDIENTS_MODAL_STATE,
            payload: true,
        }

        expect(modalReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                isIngredientModalOpen: action.payload,
            })
    })

    it('have to handle SWITCH_ORDER_FEED_MODAL_STATE', () => {
        const action = {
            type: SWITCH_ORDER_FEED_MODAL_STATE,
            payload: true,
        }

        expect(modalReducer(defaultState, action))
            .toEqual({
                ...defaultState,
                isIngredientModalOpen: action.payload,
            })
    })
})