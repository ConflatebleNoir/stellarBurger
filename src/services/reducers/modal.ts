import {
    SWITCH_ORDER_MODAL_STATE,
    SWITCH_INGREDIENTS_MODAL_STATE,
} from '../actions/modal';

interface IModal {
    isOrderModalOpen: boolean,
    isIngredientModalOpen: boolean,
}

const defaultState: IModal = {
    isOrderModalOpen: false,
    isIngredientModalOpen: false,
}

export const modalReducer = (state = defaultState, action: any) => {
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
        default: {
            return state;
        }
    }
}