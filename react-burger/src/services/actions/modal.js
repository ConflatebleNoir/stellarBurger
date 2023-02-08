export const SWITCH_ORDER_MODAL_STATE = 'SWITCH_ORDER_MODAL_STATE';
export const SWITCH_INGREDIENTS_MODAL_STATE = 'SWITCH_INGREDIENTS_MODAL_STATE';

export const switchOrderModalState = (status) => ({
    type: SWITCH_ORDER_MODAL_STATE,
    payload: status,
});

export const switchIngredientsModalState = (status) => ({
    type: SWITCH_INGREDIENTS_MODAL_STATE,
    payload: status,
})