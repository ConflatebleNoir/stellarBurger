export const SWITCH_ORDER_MODAL_STATE: 'SWITCH_ORDER_MODAL_STATE' = 'SWITCH_ORDER_MODAL_STATE';
export const SWITCH_INGREDIENTS_MODAL_STATE: 'SWITCH_INGREDIENTS_MODAL_STATE' = 'SWITCH_INGREDIENTS_MODAL_STATE';
export const SWITCH_ORDER_FEED_MODAL_STATE: 'SWITCH_ORDER_FEED_MODAL_STATE' = 'SWITCH_ORDER_FEED_MODAL_STATE';

export interface ISwitchOrderModalState {
    readonly type: typeof SWITCH_ORDER_MODAL_STATE;
};

export interface ISwitchIngredientsModalState {
    readonly type: typeof SWITCH_INGREDIENTS_MODAL_STATE;
};

export interface ISwitchOrderFeedModalState {
    readonly type: typeof SWITCH_ORDER_FEED_MODAL_STATE;
};

export const switchOrderModalState = (status: boolean) => ({
    type: SWITCH_ORDER_MODAL_STATE,
    payload: status,
});

export const switchIngredientsModalState = (status: boolean) => ({
    type: SWITCH_INGREDIENTS_MODAL_STATE,
    payload: status,
});

export const switchOrderFeedModalState = (status: boolean) => ({
    type: SWITCH_ORDER_FEED_MODAL_STATE,
    payload: status,
})