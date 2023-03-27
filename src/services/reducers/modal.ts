import { AnyAction } from 'redux';
import {
    SWITCH_ORDER_MODAL_STATE,
    SWITCH_INGREDIENTS_MODAL_STATE,
    SWITCH_ORDER_FEED_MODAL_STATE,
} from '../actions/modal';
import { IModal } from '../types/types';

export const defaultState: IModal = {
    isOrderModalOpen: false,
    isIngredientModalOpen: false,
    isOrderFeedModalOpen: false,
}

export const modalReducer = (state = defaultState, action: AnyAction): IModal => {
    switch (action.type) {
        case SWITCH_ORDER_MODAL_STATE: {
            return {
                ...state,
                isOrderModalOpen: action.payload,
            };
        }
        case SWITCH_INGREDIENTS_MODAL_STATE: {
            return {
                ...state,
                isIngredientModalOpen: action.payload,
            };
        }
        case SWITCH_ORDER_FEED_MODAL_STATE: {
            return {
                ...state,
                isOrderFeedModalOpen: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}