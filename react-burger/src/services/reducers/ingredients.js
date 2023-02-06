import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

const defaultState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsList: [],
    selectedIngredient: null,
    currentIngredients: [],
}

export const ingredientsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsList: action.payload,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            }
        }
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            }
        }
        default: {
            return state;
        }
    }
}