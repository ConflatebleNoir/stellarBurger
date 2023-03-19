import {
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MODAL_INGREDIENT,
    REMOVE_MODAL_INGREDIENT,
    SORT_INGREDIENTS,
    REMOVE_ORDER_LIST,
} from '../actions/ingredients';
import { AnyAction } from 'redux';
import { IIngredientsState } from '../types/types';

const defaultState: IIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsList: [],
    modalIngredient: null,
    currentIngredients: [],
}

export const ingredientsReducer = (state = defaultState, action: AnyAction): IIngredientsState => {
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
        case ADD_INGREDIENT: {
            return {
                ...state,
                currentIngredients: action.payload,
            };
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                currentIngredients: action.payload,
            }
        }
        case MODAL_INGREDIENT: {
            return {
                ...state,
                modalIngredient: action.payload,
            }
        }
        case REMOVE_MODAL_INGREDIENT: {
            return {
                ...state,
                modalIngredient: null,
            }
        }
        case SORT_INGREDIENTS: {
            return {
                ...state,
                currentIngredients: action.payload,
            }
        }
        case REMOVE_ORDER_LIST: {
            return {
                ...state,
                currentIngredients: [],
            }
        }
        default: {
            return state;
        }
    }
}